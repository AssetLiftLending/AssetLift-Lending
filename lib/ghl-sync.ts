const GHL_BASE = 'https://services.leadconnectorhq.com';
const LOCATION_ID = 'XaG9N2w4KrmgRLVgbWlH';
const GHL_VERSION = '2021-07-28';

export interface GHLDealPayload {
  name: string;
  email: string;
  phone: string;
  loanType: string;
  propertyAddress: string;
  purchasePrice: string;
  loanAmount?: string;
  arv?: string;
  rehabAmount?: string;
  creditScore?: string;
  flipsCompleted?: string;
  notes?: string;
  source?: 'apply-form' | 'hero-form' | 'portal';
  /**
   * Whether this person ticked the SMS consent box, and when. Without it nobody
   * downstream can tell a lead who may be texted from one who may not, and the
   * safe assumption — do not text — is the one that loses deals.
   */
  smsConsent?: boolean;
  smsConsentAt?: string;
}

/**
 * Raised for any reason a lead did not land in GoHighLevel. Every failure path
 * throws: a sync that quietly gives up is indistinguishable from a working one,
 * which is how leads were lost without anyone noticing.
 */
export class GhlSyncError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GhlSyncError';
  }
}

export async function syncDealToGHL(deal: GHLDealPayload): Promise<string> {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    throw new GhlSyncError(
      `GHL_API_KEY is not set, so nothing was sent to location ${LOCATION_ID}. ` +
        'Add a GoHighLevel private integration token (contacts read/write + opportunities) ' +
        'to the Vercel environment and redeploy.',
    );
  }

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Version': GHL_VERSION,
  };

  const nameParts = deal.name.trim().split(' ');
  const firstName = nameParts[0] || deal.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  const tags = [
    'assetlift-lead',
    deal.source === 'portal' ? 'admin-entry' : 'website-lead',
    deal.loanType,
  ].filter(Boolean);

  // Step 1: Create contact (or update if email exists)
  let contactId: string | null = null;

  const createRes = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      locationId: LOCATION_ID,
      firstName,
      lastName,
      email: deal.email,
      phone: deal.phone,
      source: 'AssetLift Lending',
      tags,
    }),
  });

  if (createRes.ok) {
    const body = await createRes.json();
    contactId = body.contact?.id ?? null;
  } else if (createRes.status === 422 || createRes.status === 400) {
    // Contact may already exist — search by email
    const searchRes = await fetch(
      `${GHL_BASE}/contacts/?locationId=${LOCATION_ID}&email=${encodeURIComponent(deal.email)}`,
      { headers }
    );
    if (searchRes.ok) {
      const searchBody = await searchRes.json();
      contactId = searchBody.contacts?.[0]?.id ?? null;
    } else {
      const detail = await searchRes.text().catch(() => '');
      throw new GhlSyncError(
        `Contact create returned ${createRes.status} and the follow-up lookup returned ` +
          `${searchRes.status}: ${detail.slice(0, 500)}`,
      );
    }
  } else {
    // 401/403 here almost always means the token lacks contacts write scope for
    // this location, or belongs to a different location entirely.
    const detail = await createRes.text().catch(() => '');
    throw new GhlSyncError(
      `Contact create failed with ${createRes.status} for location ${LOCATION_ID}: ${detail.slice(0, 500)}`,
    );
  }

  if (!contactId) {
    throw new GhlSyncError(
      `GoHighLevel accepted the request but returned no contact id for ${deal.email}.`,
    );
  }

  // Step 2: Add a structured note with all deal details
  const loanLabel = deal.loanType
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  const noteLines: string[] = [
    `DEAL SUBMISSION — ${loanLabel}`,
    `---`,
    `Property: ${deal.propertyAddress}`,
    `Purchase Price: $${deal.purchasePrice}`,
    deal.loanAmount ? `Loan Amount: $${deal.loanAmount}` : '',
    deal.arv ? `ARV: $${deal.arv}` : '',
    deal.rehabAmount ? `Rehab Budget: $${deal.rehabAmount}` : '',
    deal.creditScore ? `Credit Score: ${deal.creditScore}` : '',
    deal.flipsCompleted ? `Completed Flips: ${deal.flipsCompleted}` : '',
    deal.notes ? `\nBorrower Notes: ${deal.notes}` : '',
    `---`,
    `Source: ${deal.source ?? 'website'}`,
    `Submitted: ${new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
  ].filter(Boolean);

  const noteRes = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ body: noteLines.join('\n') }),
  });

  if (!noteRes.ok) {
    // The contact exists at this point, so the lead is not lost — but the deal
    // detail is, and that is the part a broker actually works from.
    const detail = await noteRes.text().catch(() => '');
    throw new GhlSyncError(
      `Contact ${contactId} was created but the deal note failed with ` +
        `${noteRes.status}: ${detail.slice(0, 500)}`,
    );
  }

  return contactId;
}
