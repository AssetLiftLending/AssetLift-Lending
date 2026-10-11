import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { syncLeadToCrm } from '@/lib/crm-sync';
import { sendSyncFailureAlert } from '@/lib/mailer';

export const runtime = 'nodejs';

const money = z.string().trim().max(20);
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

const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    if (hits.size > 10_000) hits.clear();
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (origin) {
    const host = req.headers.get('host');
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (!host || originHost !== host) return NextResponse.json({ success: false }, { status: 403 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ success: false }, { status: 429 });

  const parsed = dealSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ success: false, error: 'invalid payload' }, { status: 400 });

  try {
    const result = await syncLeadToCrm(parsed.data);
    return NextResponse.json({ success: true, crm: { ok: true, contactId: result.contactId } });
  } catch (err) {
    const message = (err as Error).message;
    console.error('[CRM] Lead sync failed:', message, { email: parsed.data.email, source: parsed.data.source });
    try {
      await sendSyncFailureAlert({
        subject: 'CRM SYNC FAILED - lead saved by email only',
        system: 'CRM',
        error: message,
        lead: parsed.data,
      });
    } catch (alertErr) {
      console.error('[ALERT] Could not send CRM sync-failure alert:', (alertErr as Error).message);
    }
    return NextResponse.json({ success: false, crm: { ok: false } }, { status: 207 });
  }
}
