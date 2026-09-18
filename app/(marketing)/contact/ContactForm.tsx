'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Send } from "lucide-react";
import { sendNotification } from "@/services/notificationService";
import { pushToGHL } from "@/services/ghlService";

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

  const isValid = form.name.trim().length >= 2 && form.contact.trim().length >= 5 && form.message.trim().length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    setFailed(false);
    try {
      const notified = await sendNotification("form", {
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
      await pushToGHL({
        name: form.name,
        ...splitContact(form.contact),
        notes: form.message,
        source: 'contact-form',
      });

      // Only confirm receipt if the message actually went out. Showing the
      // success panel on a failed send silently loses the enquiry.
      if (notified) {
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
          placeholder="(555) 123-4567 or john@example.com"
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
