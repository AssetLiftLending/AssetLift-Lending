'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, CheckCircle, FileText, Mail, Phone, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { sendNotification } from "@/services/notificationService";
import { pushToCRM } from "@/services/crmService";
import { gtagEvent, gtagReportConversion } from "@/lib/gtag";
import { metaTrackLead } from "@/lib/meta-pixel";
import { SMS_CONSENT_NOT_A_CONDITION, SMS_CONSENT_TEXT, buildSmsConsentRecord } from "@/lib/sms-consent";

/**
 * "Get pre-approved": the client asks for a pre-approval letter and terms. The
 * request lands in the CRM's Pre-Approvals queue, where it is approved and the
 * letter emailed to the client.
 */

interface FormState {
  name: string;
  email: string;
  phone: string;
  entityName: string;
  loanType: string;
  propertyStatus: "identified" | "shopping" | "";
  location: string;
  purchasePrice: string;
  loanAmount: string;
  rehabAmount: string;
  arv: string;
  creditScore: string;
  experience: string;
  notes: string;
}

const EMPTY: FormState = {
  name: "", email: "", phone: "", entityName: "", loanType: "", propertyStatus: "", location: "",
  purchasePrice: "", loanAmount: "", rehabAmount: "", arv: "", creditScore: "", experience: "", notes: "",
};

const MONEY_FIELDS: Array<keyof FormState> = ["purchasePrice", "loanAmount", "rehabAmount", "arv"];

const formatPhone = (value: string) => {
  const n = value.replace(/\D/g, "").slice(0, 10);
  if (n.length < 4) return n;
  if (n.length < 7) return `(${n.slice(0, 3)}) ${n.slice(3)}`;
  return `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;
};
const formatMoney = (value: string) => {
  const raw = value.replace(/\D/g, "");
  return raw ? Number(raw).toLocaleString("en-US") : "";
};

export default function PreApprovalForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "businessPurpose", string>>>({});
  const [businessPurpose, setBusinessPurpose] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    let v = value;
    if (key === "phone") v = formatPhone(value);
    if (MONEY_FIELDS.includes(key)) v = formatMoney(value);
    setForm((f) => ({ ...f, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "A valid email is required — your letter is sent here";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "A valid phone number is required";
    if (!form.loanType) e.loanType = "Choose a loan type";
    if (!form.propertyStatus) e.propertyStatus = "Tell us if you have a property yet";
    if (form.location.trim().length < 2) {
      e.location = form.propertyStatus === "shopping" ? "Tell us the city or area you are buying in" : "Enter the property address";
    }
    if (!form.purchasePrice) e.purchasePrice = form.propertyStatus === "shopping" ? "Enter your maximum purchase price" : "Enter the purchase price";
    if (!businessPurpose) e.businessPurpose = "Pre-approvals are for business-purpose loans on investment property only";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast({ title: "Please check the form", description: "A few required fields are missing.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const consent = buildSmsConsentRecord(smsConsent, "pre-approval");
    const location = form.location.trim();
    const summary = [
      "Pre-approval request.",
      form.entityName ? `Entity: ${form.entityName}.` : null,
      form.propertyStatus === "shopping" ? `Still shopping in ${location}.` : `Property: ${location}.`,
      form.experience ? `Experience: ${form.experience}.` : null,
      form.notes || null,
    ].filter(Boolean).join(" ");

    try {
      const emailOk = await sendNotification("form", {
        ...consent,
        name: form.name,
        email: form.email,
        phone: form.phone,
        program: `Pre-approval request — ${form.loanType}`,
        loanAmount: form.purchasePrice,
        arv: form.arv,
        rehabAmount: form.rehabAmount,
        creditScore: form.creditScore,
        propertyAddress: location,
        message: summary,
      });

      const sync = await pushToCRM({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        loanType: form.loanType,
        propertyAddress: location,
        purchasePrice: form.purchasePrice,
        loanAmount: form.loanAmount || undefined,
        rehabAmount: form.rehabAmount || undefined,
        arv: form.arv || undefined,
        creditScore: form.creditScore || undefined,
        flipsCompleted: form.experience || undefined,
        notes: form.notes.trim() || undefined,
        entityName: form.entityName.trim() || undefined,
        propertyStatus: form.propertyStatus || undefined,
        businessPurpose: true,
        requestType: "pre_approval",
        source: "pre-approval",
        smsConsent: consent.smsConsent,
        smsConsentAt: consent.smsConsentAt ?? undefined,
      });

      if (emailOk || sync.success) {
        const value = Number(form.purchasePrice.replace(/\D/g, ""));
        gtagReportConversion();
        gtagEvent("pre_approval_requested", { loan_type: form.loanType });
        gtagEvent("generate_lead", { currency: "USD", value });
        metaTrackLead({ currency: "USD", value });
        setSubmitted(true);
      } else {
        toast({ title: "Something went wrong", description: "Please try again or email info@assetliftlending.com.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email info@assetliftlending.com.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div className="text-center max-w-md" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Request received</h1>
          <p className="text-muted-foreground mb-8">
            Thanks, {form.name.split(" ")[0]}. We are reviewing your request. Once it is approved, your pre-approval
            letter is emailed to <strong className="text-foreground">{form.email}</strong> — usually the same business day.
          </p>
          <Button asChild>
            <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" />Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const field = (key: keyof FormState) => `h-11 rounded-xl bg-background ${errors[key] ? "border-destructive" : ""}`;
  const err = (key: keyof FormState | "businessPurpose") =>
    errors[key] ? <p className="text-sm text-destructive">{errors[key]}</p> : null;
  const money = (key: keyof FormState, label: string, placeholder: string, hint?: string) => (
    <div className="space-y-2">
      <Label htmlFor={key}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
        <Input id={key} inputMode="numeric" placeholder={placeholder} value={form[key]} onChange={(e) => set(key, e.target.value)} className={`${field(key)} pl-7`} />
      </div>
      {hint && !errors[key] && <p className="text-xs text-muted-foreground">{hint}</p>}
      {err(key)}
    </div>
  );
  const shopping = form.propertyStatus === "shopping";

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container px-4 md:px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
          </Link>
        </div>
      </header>

      <div className="container px-4 md:px-6 pt-24 pb-20 md:pt-32">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10">
          <div className="lg:sticky lg:top-28">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">Pre-Approval</div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
              Get pre-approved.<br /><span className="gradient-text">Make offers with confidence.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Tell us about the deal or what you are shopping for. Once approved, your pre-approval letter and loan
              terms are emailed to you on AssetLift Lending letterhead, ready to send with your offer.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                { icon: FileText, title: "A letter you can use", text: "Show the seller or listing agent you are approved, at your purchase price." },
                { icon: BadgeCheck, title: "Your terms", text: "Program, loan amount and purchase price, based on what you tell us." },
                { icon: ShieldCheck, title: "Business-purpose only", text: "For investment property. Not for a home you will live in." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-4">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10"><item.icon className="h-5 w-5 text-primary" /></div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a href="tel:+19296392284" className="flex items-center gap-2 text-muted-foreground hover:text-primary"><Phone className="w-4 h-4" />+1 929-639-2284</a>
              <a href="mailto:info@assetliftlending.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary"><Mail className="w-4 h-4" />info@assetliftlending.com</a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 lg:space-y-8" noValidate>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-8 lg:rounded-3xl">
              <h3 className="text-base font-semibold mb-4 md:mb-6 md:text-lg">1. About you</h3>
              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" autoComplete="name" placeholder="John Smith" value={form.name} onChange={(e) => set("name", e.target.value)} className={field("name")} />
                  {err("name")}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entityName">LLC / entity name</Label>
                  <Input id="entityName" placeholder="Optional" value={form.entityName} onChange={(e) => set("entityName", e.target.value)} className={field("entityName")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" autoComplete="email" placeholder="john@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} className={field("email")} />
                  {err("email")}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={field("phone")} />
                  {err("phone")}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-8 lg:rounded-3xl">
              <h3 className="text-base font-semibold mb-4 md:mb-6 md:text-lg">2. The property</h3>
              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loanType">Loan type *</Label>
                  <Select value={form.loanType} onValueChange={(v) => set("loanType", v)}>
                    <SelectTrigger id="loanType" className={field("loanType")}><SelectValue placeholder="Select loan type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fix-flip">Fix &amp; Flip</SelectItem>
                      <SelectItem value="rental">Rental / DSCR</SelectItem>
                      <SelectItem value="bridge">Bridge Loan</SelectItem>
                      <SelectItem value="ground-up">Ground-Up Construction</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="multifamily">Multifamily</SelectItem>
                    </SelectContent>
                  </Select>
                  {err("loanType")}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyStatus">Do you have a property yet? *</Label>
                  <Select value={form.propertyStatus} onValueChange={(v) => set("propertyStatus", v)}>
                    <SelectTrigger id="propertyStatus" className={field("propertyStatus")}><SelectValue placeholder="Choose one" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="identified">Yes — I have an address</SelectItem>
                      <SelectItem value="shopping">No — I am still shopping</SelectItem>
                    </SelectContent>
                  </Select>
                  {err("propertyStatus")}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">{shopping ? "City or area you are buying in *" : "Property address *"}</Label>
                  <Input id="location" autoComplete={shopping ? "off" : "street-address"} placeholder={shopping ? "e.g. Newark, NJ" : "123 Main St, Newark, NJ 07102"}
                    value={form.location} onChange={(e) => set("location", e.target.value)} className={field("location")} />
                  {err("location")}
                </div>
                {money("purchasePrice", shopping ? "Maximum purchase price *" : "Purchase price *", "500,000")}
                {money("loanAmount", "Loan amount you need", "425,000", "Leave blank if you are not sure — we will work it out.")}
                {form.loanType !== "rental" && money("rehabAmount", "Rehab budget", "60,000")}
                {form.loanType !== "rental" && money("arv", "After-repair value (ARV)", "650,000")}
                <div className="space-y-2">
                  <Label htmlFor="creditScore">Estimated credit score</Label>
                  <Select value={form.creditScore} onValueChange={(v) => set("creditScore", v)}>
                    <SelectTrigger id="creditScore" className="h-11 rounded-xl bg-background"><SelectValue placeholder="Select range" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="760+">Excellent (760+)</SelectItem>
                      <SelectItem value="720-759">Very Good (720-759)</SelectItem>
                      <SelectItem value="680-719">Good (680-719)</SelectItem>
                      <SelectItem value="640-679">Fair (640-679)</SelectItem>
                      <SelectItem value="620-639">Below Average (620-639)</SelectItem>
                      <SelectItem value="below-620">Below 620</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Deals completed in the last 3 years</Label>
                  <Select value={form.experience} onValueChange={(v) => set("experience", v)}>
                    <SelectTrigger id="experience" className="h-11 rounded-xl bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">None yet</SelectItem>
                      <SelectItem value="1-2">1–2</SelectItem>
                      <SelectItem value="3-5">3–5</SelectItem>
                      <SelectItem value="6-10">6–10</SelectItem>
                      <SelectItem value="10+">More than 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Anything else? (optional)</Label>
                  <Textarea id="notes" rows={3} placeholder="Closing deadline, exit plan, who the letter should be addressed to…" value={form.notes}
                    onChange={(e) => set("notes", e.target.value)} className="rounded-xl bg-background resize-none" />
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-border bg-secondary/15 p-5 text-sm text-muted-foreground">
              <label htmlFor="businessPurpose" className="flex cursor-pointer items-start gap-3">
                <input id="businessPurpose" type="checkbox" checked={businessPurpose}
                  onChange={(e) => { setBusinessPurpose(e.target.checked); setErrors((x) => ({ ...x, businessPurpose: undefined })); }}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-border accent-primary" />
                <span className="leading-relaxed">
                  <span className="font-medium text-foreground">I confirm this is a business-purpose loan</span> for investment property that I will
                  not live in, and not for personal, family or household purposes. *
                </span>
              </label>
              {err("businessPurpose")}
              <label htmlFor="smsConsent" className="flex cursor-pointer items-start gap-3 border-t border-border pt-4">
                <input id="smsConsent" type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-border accent-primary" />
                <span className="leading-relaxed">
                  {SMS_CONSENT_TEXT}{" "}<span className="font-medium text-foreground">{SMS_CONSENT_NOT_A_CONDITION}</span>{" "}
                  See our <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> and{" "}
                  <Link href="/terms" className="underline hover:text-foreground">Terms &amp; Conditions</Link>.
                </span>
              </label>
              <p className="border-t border-border pt-4 leading-relaxed">
                A pre-approval is based on the information you provide and is not a commitment to lend. Final terms depend on
                the property, valuation, title, insurance and underwriting.
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full py-7 text-lg glow-primary" disabled={submitting}>
              {submitting ? "Sending…" : <>Request my pre-approval<Send className="ml-2 w-5 h-5" /></>}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
