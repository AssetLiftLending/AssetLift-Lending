import { GHLDealPayload } from '@/lib/ghl-sync';

export interface LeadSyncOutcome {
  /** True only when every downstream system accepted the lead. */
  success: boolean;
  /** Names of the systems that did not accept it, for logging. */
  failed: string[];
}

/**
 * Send the lead to the CRM and GoHighLevel, and wait for the result.
 *
 * This is deliberately awaited rather than fire-and-forget: an unawaited fetch
 * can be cancelled when the page navigates or the tab closes, which silently
 * drops the request before the serverless function ever runs.
 *
 * It never throws — a sync problem must not break the borrower's submission,
 * which is already captured by the notification email. Failures surface through
 * the server-side alert email and the returned outcome.
 */
export async function pushToGHL(deal: GHLDealPayload): Promise<LeadSyncOutcome> {
  try {
    const res = await fetch('/api/ghl-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deal),
      keepalive: true,
    });

    const body = await res.json().catch(() => null);

    if (res.ok && body?.success) {
      return { success: true, failed: [] };
    }

    const failed: string[] = [];
    if (body?.crm && !body.crm.ok) failed.push('CRM');
    if (body?.ghl && !body.ghl.ok) failed.push('GoHighLevel');
    if (failed.length === 0) failed.push(`HTTP ${res.status}`);

    console.error('[lead-sync] Downstream sync incomplete:', failed.join(', '), body);
    return { success: false, failed };
  } catch (err) {
    console.error('[lead-sync] Could not reach /api/ghl-sync:', (err as Error).message);
    return { success: false, failed: ['request-failed'] };
  }
}
