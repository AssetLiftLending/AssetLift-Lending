import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { syncDealToGHL, isGhlConfigured } from '@/lib/ghl-sync';
import { syncLeadToCrm } from '@/lib/crm-sync';
import { sendSyncFailureAlert } from '@/lib/mailer';

export const runtime = 'nodejs';

// This endpoint is intentionally public: it receives lead submissions from
// the hero form, apply form, and portal. Abuse is limited by strict payload
// validation, a same-origin check, and per-IP rate limiting.

const money = z.string().trim().max(20);

// Deal details are optional: the contact form and the chatbot produce a lead
// worth calling back without producing a deal. What cannot be optional is a way
// to reach the person, which is enforced by the refinement below.
const dealSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254).optional(),
    phone: z.string().trim().min(7).max(30).optional(),
    loanType: z.string().trim().min(1).max(60).optional(),
    propertyAddress: z.string().trim().min(1).max(250).optional(),
    purchasePrice: money.optional(),
    loanAmount: money.optional(),
    arv: money.optional(),
    rehabAmount: money.optional(),
    creditScore: z.string().trim().max(20).optional(),
    flipsCompleted: z.string().trim().max(20).optional(),
    notes: z.string().trim().max(2000).optional(),
    source: z
      .enum(['apply-form', 'hero-form', 'portal', 'contact-form', 'borrower-package', 'chatbot'])
      .optional(),
    smsConsent: z.boolean().optional(),
    smsConsentAt: z.string().trim().max(40).optional(),
  })
  .refine(d => Boolean(d.email || d.phone), {
    message: 'a lead needs at least an email address or a phone number',
  });

const RATE_LIMIT = 5; // submissions per window per IP
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    if (hits.size > 10_000) hits.clear(); // bound memory
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  // Browser requests must come from our own origin.
  const origin = req.headers.get('origin');
  if (origin) {
    const host = req.headers.get('host');
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (!host || originHost !== host) {
      return NextResponse.json({ success: false }, { status: 403 });
    }
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ success: false }, { status: 429 });
  }

  const parsed = dealSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'invalid payload' }, { status: 400 });
  }
  const deal = parsed.data;

  // The CRM is the durable record, so it is written first and independently of
  // GoHighLevel. Each destination reports its own outcome: one being down must
  // never stop the other from receiving the lead.
  const result = {
    crm: { ok: false, error: null as string | null, contactId: null as string | null },
    ghl: {
      ok: false,
      /** True when GoHighLevel is simply not configured, which is not a fault. */
      skipped: false,
      error: null as string | null,
      contactId: null as string | null,
    },
  };

  try {
    const crm = await syncLeadToCrm(deal);
    result.crm.ok = true;
    result.crm.contactId = crm.contactId;
  } catch (err) {
    const message = (err as Error).message;
    result.crm.error = message;
    console.error('[CRM] Lead sync failed:', message, { email: deal.email, source: deal.source });
  }

  // GoHighLevel is optional. When no token is configured this is a deliberate
  // setup, not a failure, and alerting on it would send an email per lead.
  if (isGhlConfigured()) {
    try {
      result.ghl.contactId = await syncDealToGHL(deal);
      result.ghl.ok = true;
    } catch (err) {
      const message = (err as Error).message;
      result.ghl.error = message;
      console.error('[GHL] Lead sync failed:', message, { email: deal.email, source: deal.source });
    }
  } else {
    result.ghl.skipped = true;
  }

  // A lead that reached no downstream system exists only in the notification
  // email, so say so loudly rather than letting it look delivered.
  const failed: string[] = [];
  if (!result.crm.ok) failed.push('CRM');
  if (!result.ghl.ok && !result.ghl.skipped) failed.push('GoHighLevel');

  if (failed.length > 0) {
    try {
      await sendSyncFailureAlert({
        subject: `${failed.join(' + ')} SYNC FAILED - lead saved by email only`,
        system: failed.join(' and '),
        error: [result.crm.error && `CRM: ${result.crm.error}`, result.ghl.error && `GHL: ${result.ghl.error}`]
          .filter(Boolean)
          .join('\n\n'),
        lead: deal,
      });
    } catch (alertErr) {
      // Nothing left to fall back to; make sure it is at least in the logs.
      console.error('[ALERT] Could not send sync-failure alert:', (alertErr as Error).message);
    }
  }

  // 207 signals "partially delivered" so a failure is visible to the caller
  // without implying the lead was lost — the email path still has it.
  const status = failed.length === 0 ? 200 : 207;
  return NextResponse.json({ success: failed.length === 0, ...result }, { status });
}
