import type { GHLDealPayload } from './ghl-sync';

/**
 * The CRM is the durable record for a website lead. GoHighLevel and the
 * notification email are both best-effort on top of this: if either is down the
 * lead still exists in the CRM, which is what we reconcile against.
 *
 * The CRM owns its own Supabase credentials, so we post to its webhook rather
 * than writing to the database from here.
 */
export class CrmSyncError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CrmSyncError';
  }
}

export interface CrmSyncResult {
  contactId: string | null;
  dealId: string | null;
}

export async function syncLeadToCrm(deal: GHLDealPayload): Promise<CrmSyncResult> {
  const endpoint = process.env.CRM_LEAD_WEBHOOK_URL;
  const secret = process.env.CRM_LEAD_WEBHOOK_SECRET;

  if (!endpoint || !secret) {
    throw new CrmSyncError(
      'CRM_LEAD_WEBHOOK_URL or CRM_LEAD_WEBHOOK_SECRET is not set — cannot record the lead in the CRM.',
    );
  }

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': secret,
      },
      body: JSON.stringify(deal),
    });
  } catch (err) {
    throw new CrmSyncError(`Could not reach the CRM webhook: ${(err as Error).message}`);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new CrmSyncError(`CRM webhook returned ${res.status}: ${body.slice(0, 500)}`);
  }

  const body = (await res.json().catch(() => ({}))) as Partial<CrmSyncResult>;
  return {
    contactId: body.contactId ?? null,
    dealId: body.dealId ?? null,
  };
}
