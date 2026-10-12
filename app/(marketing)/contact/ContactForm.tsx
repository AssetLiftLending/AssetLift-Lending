'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Send } from "lucide-react";
import { sendNotification } from "@/services/notificationService";
import { pushToCRM } from "@/services/crmService";
import {
  SMS_CONSENT_TEXT,
  SMS_CONSENT_NOT_A_CONDITION,
  buildSmsConsentRecord,
} from "@/lib/sms-consent";

/**
 * This form asks for "phone or email" in one box, so work out which it is
 * rather than storing the same string in both fields. A CRM that thinks a phone
 * number is an email address cannot dedupe or contact anyone.
 */
function splitContact(value: string): { email?: string; phone?: string } {
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? { email: trimmed } : { phone: trimmed };
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  // Optional and never required to submit: carriers reject a campaign whose
  // consent box is pre-ticked or gates the form.
  const [smsConsent, setSmsConsent] = useState(false);

  const isValid = form.name.trim().length >= 2 && form.contact.trim().length >= 5 && form.message.trim().length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    setFailed(false);

    // Captured once, so the notification email and the CRM describe the same
    // act of consent.
    const consent = buildSmsConsentRecord(smsConsent, "contact-form");

    try {
      const notified = await sendNotification("form", {
        ...consent,
        name: form.name,
        phone: form.contact,
        email: form.contact,
        program: "General Inquiry",
        loanPurpose: "",
        contactMethod: "",
        loanAmount: "",
        arv: "",
        rehabAmount: "",
        creditScore: "",
        propertyAddress: "",
        message: form.message,
      });

      // Record the enquiry in the CRM independently of the email. This is a
      // general enquiry rather than a deal, so it carries no loan details.
      const sync = await pushToCRM({
        name: form.name,
        ...splitContact(form.contact),
        notes: form.message,
        source: 'contact-form',
        smsConsent: consent.smsConsent,
        smsConsentAt: consent.smsConsentAt ?? undefined,
      });

      // Confirm receipt if the enquiry reached either channel. It is only
      // lost when both the email and the CRM rejected it — reporting failure
      // on an email outage alone pushed people to resubmit an enquiry that
      // had already landed.
      if (notified || sync.success) {
        setSubmitted(true);
      } else {
        setFailed(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Message received.</h3>
        <p className="text-muted-foreground">We&apos;ll get back to you within 24 hours, usually within a few hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="c-name">Your Name</Label>
        <Input
          id="c-name"
          placeholder="John Smith"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          className="h-11 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-contact">Phone or Email</Label>
        <Input
          id="c-contact"
          placeholder="Your phone or email"
          value={form.contact}
          onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))}
          className="h-11 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-message">Message</Label>
        <Textarea
          id="c-message"
          placeholder="Tell us about your deal or question..."
          rows={4}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="rounded-xl resize-none"
        />
      </div>
      <div className="rounded-xl border border-border bg-secondary/15 p-4 text-sm text-muted-foreground">
        <label htmlFor="c-sms-consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="c-sms-consent"
            name="smsConsent"
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-border accent-primary"
          />
          <span className="leading-relaxed">
            {SMS_CONSENT_TEXT}{' '}
            <strong className="text-foreground">{SMS_CONSENT_NOT_A_CONDITION}</strong>
          </span>
        </label>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full glow-primary rounded-xl"
        disabled={submitting || !isValid}
      >
        {submitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="mr-2 w-4 h-4" />
            Send Message
          </>
        )}
      </Button>
      {failed && (
        <p className="text-sm text-destructive">
          We couldn&apos;t send that just now. Please call or text{" "}
          <a href="tel:+19296392284" className="underline font-semibold">
            (929) 639-2284
          </a>{" "}
          or email{" "}
          <a href="mailto:info@assetliftlending.com" className="underline font-semibold">
            info@assetliftlending.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
