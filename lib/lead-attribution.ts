/**
 * Remembers how a visitor first arrived (landing page + referrer, which carry
 * any utm_* / gclid / fbclid tags) and attaches it, with the page the form was
 * submitted on, to every lead sent to the CRM. The CRM uses it to count leads
 * by landing page and channel (organic search, AI search, Google Ads, Facebook).
 *
 * First touch is kept for 30 days in localStorage. Browsers that block storage
 * still send the current page and referrer.
 */

const KEY = 'al_first_touch';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface FirstTouch { landingPage: string; referrer: string; at: number }

export interface LeadAttributionFields {
  pageUrl?: string;
  landingPage?: string;
  referrer?: string;
}

function ownSite(url: string): boolean {
  try {
    return new URL(url).host.replace(/^www\./, '') === window.location.host.replace(/^www\./, '');
  } catch {
    return false;
  }
}

/** Call on every page view; only the first page of a visit (from outside the site) is stored. */
export function captureFirstTouch(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(KEY);
    const existing = raw ? (JSON.parse(raw) as FirstTouch) : null;
    const fresh = existing && Date.now() - existing.at < TTL_MS;
    const referrer = document.referrer || '';
    const hasTags = /[?&](utm_[a-z]+|gclid|fbclid)=/.test(window.location.search);
    // A new campaign click replaces the stored touch; plain internal navigation never does.
    if (fresh && !hasTags) return;
    if (fresh && referrer && ownSite(referrer)) return;
    const value: FirstTouch = { landingPage: window.location.href, referrer: ownSite(referrer) ? '' : referrer, at: Date.now() };
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage blocked: getLeadAttribution still sends the current page */
  }
}

export function getLeadAttribution(): LeadAttributionFields {
  if (typeof window === 'undefined') return {};
  const clip = (s: string) => s.slice(0, 1000);
  const out: LeadAttributionFields = { pageUrl: clip(window.location.href) };
  try {
    const raw = window.localStorage.getItem(KEY);
    const touch = raw ? (JSON.parse(raw) as FirstTouch) : null;
    if (touch && Date.now() - touch.at < TTL_MS) {
      out.landingPage = clip(touch.landingPage);
      if (touch.referrer) out.referrer = clip(touch.referrer);
      return out;
    }
  } catch {
    /* fall through */
  }
  if (document.referrer && !ownSite(document.referrer)) out.referrer = clip(document.referrer);
  return out;
}
