import type { CrmDealPayload } from '@/lib/crm-types';

export interface LeadSyncOutcome {
  /** True when the CRM accepted the lead. */
  success: boolean;
  /** The CRM is the only configured lead-record destination. */
  failed: string[];
}

/**
 * Send the lead directly to the CRM. The notification email is a separate
 * fallback channel, so a CRM outage must not break the borrower's submission.
 */
export async function pushToCRM(deal: CrmDealPayload): Promise<LeadSyncOutcome> {
  try {
    const res = await fetch('/api/crm-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deal),
      keepalive: true,
    });

    const body = await res.json().catch(() => null);
    if (res.ok && body?.success) return { success: true, failed: [] };

    console.error('[lead-sync] CRM sync incomplete:', body);
    return { success: false, failed: ['CRM'] };
  } catch (err) {
    console.error('[lead-sync] Could not reach /api/crm-sync:', (err as Error).message);
    return { success: false, failed: ['request-failed'] };
  }
}
