/**
 * Lead and deal fields accepted by the independent CRM webhook.
 * Kept vendor-neutral so the website no longer needs a GHL adapter.
 */
export interface CrmDealPayload {
  name: string;
  email?: string;
  phone?: string;
  loanType?: string;
  propertyAddress?: string;
  purchasePrice?: string;
  loanAmount?: string;
  arv?: string;
  rehabAmount?: string;
  creditScore?: string;
  flipsCompleted?: string;
  notes?: string;
  source?: 'apply-form' | 'hero-form' | 'portal' | 'contact-form' | 'borrower-package' | 'chatbot' | 'pre-approval';
  /** 'pre_approval' files the lead in the CRM's pre-approval queue for a letter. */
  requestType?: 'pre_approval';
  /** Borrowing entity (LLC), when the client has one. */
  entityName?: string;
  /** Whether the client has a property ('identified') or is still looking ('shopping'). */
  propertyStatus?: 'identified' | 'shopping';
  /** The client confirmed the loan is for a business purpose on investment property. */
  businessPurpose?: boolean;
  smsConsent?: boolean;
  smsConsentAt?: string;
  /** Page the form was submitted on. */
  pageUrl?: string;
  /** First page of the visit, with any utm_* / gclid / fbclid tags. */
  landingPage?: string;
  /** Site that sent the visitor (first touch). */
  referrer?: string;
}
