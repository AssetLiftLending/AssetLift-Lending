/**
 * The SMS consent wording, in one place.
 *
 * A carrier reviewing the A2P 10DLC campaign compares three things: the consent
 * text shown beside the phone field on /apply, the SMS Terms published at
 * /terms, and the "how consumers opt in" description given in the campaign
 * submission. If they disagree the campaign is rejected, so the form and the
 * policy pages both read their wording from here.
 *
 * The brand name is "AssetLift Lending" exactly as registered with The Campaign
 * Registry (brand BN0de63af261f3d9d1a6671c4f7ee5a442, TCR ID BJJRQJR) — one
 * word, even though messages sign off as "Asset Lift Lending".
 */

export const SMS_BRAND_NAME = 'AssetLift Lending';

/** The number texts are sent from. */
export const SMS_BUSINESS_PHONE = '+1 (516) 689-8127';

/**
 * Shown beside the consent checkbox, and quoted verbatim in the campaign
 * submission. Keep it in sync with the SMS Terms section of /terms.
 */
export const SMS_CONSENT_TEXT =
  `I agree to receive text messages from ${SMS_BRAND_NAME} about my loan inquiry, ` +
  'including application updates, document requests, and appointment reminders. ' +
  'Message frequency varies. Message and data rates may apply. Reply STOP to opt ' +
  'out or HELP for help.';

/** Carriers require this to be visible wherever consent is collected. */
export const SMS_CONSENT_NOT_A_CONDITION =
  'Consent is not a condition of any loan or service.';

/** Required verbatim on the privacy policy. Do not reword. */
export const SMS_DATA_SHARING_STATEMENT =
  'We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.';

/** Required on the terms page, in these words. */
export const MESSAGE_AND_DATA_RATES = 'Message and data rates may apply.';

/**
 * What gets stored when someone ticks the box, so we can show a reviewer or a
 * regulator exactly what was agreed to and when. Recording the wording itself
 * matters: the text on the page may change, and a bare `true` would not say
 * what the person actually saw.
 */
export interface SmsConsentRecord {
  smsConsent: boolean;
  /** ISO 8601, set at the moment the box is ticked. */
  smsConsentAt: string | null;
  /** The exact sentence displayed when consent was given. */
  smsConsentText: string | null;
  /** Where it was collected. */
  smsConsentSource: string | null;
}

export const NO_SMS_CONSENT: SmsConsentRecord = {
  smsConsent: false,
  smsConsentAt: null,
  smsConsentText: null,
  smsConsentSource: null,
};

export function buildSmsConsentRecord(agreed: boolean, source: string): SmsConsentRecord {
  if (!agreed) return { ...NO_SMS_CONSENT, smsConsentSource: source };
  return {
    smsConsent: true,
    smsConsentAt: new Date().toISOString(),
    smsConsentText: SMS_CONSENT_TEXT,
    smsConsentSource: source,
  };
}

/** One-line summary for notification emails and CRM notes. */
export function describeSmsConsent(record: SmsConsentRecord): string {
  if (!record.smsConsent) {
    return 'NOT granted — do not text this lead. Call or email only.';
  }
  return `GRANTED ${record.smsConsentAt} via ${record.smsConsentSource} — "${record.smsConsentText}"`;
}
