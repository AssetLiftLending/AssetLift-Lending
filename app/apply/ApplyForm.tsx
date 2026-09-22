'use client';

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, Phone, Mail, BadgeCheck, Clock3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { sendNotification } from "@/services/notificationService";
import { gtagReportConversion, gtagEvent } from "@/lib/gtag";
import { metaTrackLead } from "@/lib/meta-pixel";
import { pushToGHL } from "@/services/ghlService";
import {
  SMS_CONSENT_TEXT,
  SMS_CONSENT_NOT_A_CONDITION,
  buildSmsConsentRecord,
} from "@/lib/sms-consent";

interface FormData {
  name: string;
  email: string;
  phone: string;
  strategy: string;
  loanPurpose: string;
  contactMethod: string;
  purchasePrice: string;
  arv: string;
  rehabAmount: string;
  creditScore: string;
  location: string;
  dealOverview: string;
}

const ApplyForm = () => {
  const queryRef = useRef<URLSearchParams | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    strategy: "",
    loanPurpose: "",
    contactMethod: "",
    purchasePrice: "",
    arv: "",
    rehabAmount: "",
    creditScore: "",
    location: "",
    dealOverview: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  // Deliberately starts unchecked and is never required to submit: carriers reject
  // a campaign whose consent box is pre-ticked or gates the form.
  const [smsConsent, setSmsConsent] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressWrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    queryRef.current = searchParams;
    const source = searchParams.get('source') || undefined;
    const rawPurpose = searchParams.get('loanPurpose');
    const strategy = searchParams.get('strategy') || (rawPurpose === 'dscr' ? 'rental' : rawPurpose === 'fix-and-flip' ? 'fix-flip' : rawPurpose === 'ground-up-construction' ? 'ground-up' : '');
    const purpose = rawPurpose === 'refinance' || rawPurpose === 'purchase' ? rawPurpose : '';
    setFormData((prev) => ({ ...prev, strategy: strategy || prev.strategy, loanPurpose: purpose || prev.loanPurpose, purchasePrice: searchParams.get('purchasePrice') || prev.purchasePrice, arv: searchParams.get('arv') || prev.arv, rehabAmount: searchParams.get('rehabAmount') || prev.rehabAmount, location: searchParams.get('state') ? `${prev.location || ''}${prev.location ? ', ' : ''}${searchParams.get('state')}` : prev.location, dealOverview: searchParams.get('rent') ? `Calculator values - rent: $${searchParams.get('rent')}; mortgage P&I: $${searchParams.get('mortgage') || '0'}; taxes: $${searchParams.get('taxes') || '0'}; insurance: $${searchParams.get('insurance') || '0'}; HOA: $${searchParams.get('hoa') || '0'}; vacancy: ${searchParams.get('vacancy') || '0'}%.` : prev.dealOverview }));
    if (source || rawPurpose) gtagEvent('quote_started', { source, query_intent: rawPurpose });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addressWrapperRef.current && !addressWrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    const char: { [key: number]: string } = { 0: "(", 3: ") ", 6: "-" };
    let formatted = "";
    for (let i = 0; i < numbers.length && i < 10; i++) {
      formatted += (char[i] || "") + numbers[i];
    }
    return formatted;
  };

  const formatCurrency = (value: string): string => {
    const raw = value.replace(/\D/g, "");
    if (raw) {
      return Number(raw).toLocaleString("en-US");
    }
    return "";
  };

  const handleChange = (name: string, value: string) => {
    let formattedValue = value;

    if (name === "phone") {
      formattedValue = formatPhone(value);
    }

    if (["purchasePrice", "arv", "rehabAmount"].includes(name)) {
      formattedValue = formatCurrency(value);
    }

    if (name === "location") {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (value.length > 2) {
        debounceRef.current = setTimeout(async () => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=us&limit=5&addressdetails=1`
            );
            if (res.ok) {
              const data = await res.json();
              setSuggestions(data.map((item: any) => {
                const a = item.address || {};
                const parts: string[] = [];
                if (a.house_number && a.road) parts.push(`${a.house_number} ${a.road}`);
                else if (a.road) parts.push(a.road);
                const city = a.city || a.town || a.village || a.hamlet || a.suburb;
                if (city) parts.push(city);
                if (a.state) parts.push(a.state);
                if (a.postcode) parts.push(a.postcode);
                return parts.length > 0 ? parts.join(', ') : item.display_name;
              }));
              setShowSuggestions(true);
            }
          } catch (error) {
            console.error("Address lookup failed", error);
          }
        }, 300);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectAddress = (address: string) => {
    setFormData((prev) => ({ ...prev, location: address }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!formData.strategy) {
      newErrors.strategy = "Please select a strategy";
    }
    if (!formData.loanPurpose) {
      newErrors.loanPurpose = "Please select purchase or refinance";
    }
    if (!formData.purchasePrice.trim()) {
      newErrors.purchasePrice = "Purchase price is required";
    }
    if (!formData.location.trim() || formData.location.length < 2) {
      newErrors.location = "Property location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Captured once, so the timestamp and wording sent to the notification email
    // and to the CRM describe the same act of consent.
    const consent = buildSmsConsentRecord(smsConsent, "apply-form");

    try {
      const success = await sendNotification("form", {
        ...consent,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        program: formData.strategy,
        loanPurpose: formData.loanPurpose,
        contactMethod: formData.contactMethod,
        loanAmount: formData.purchasePrice,
        arv: formData.arv || "",
        rehabAmount: formData.rehabAmount || "",
        creditScore: formData.creditScore || "",
        propertyAddress: formData.location,
        message: formData.dealOverview || "",
      });

      // The CRM is an independent delivery channel from the notification email.
      // Push regardless of the email result, otherwise an SMTP outage drops the
      // lead entirely instead of just delaying the notification.
      await pushToGHL({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        loanType: formData.strategy,
        propertyAddress: formData.location,
        purchasePrice: formData.purchasePrice,
        arv: formData.arv || undefined,
        rehabAmount: formData.rehabAmount || undefined,
        creditScore: formData.creditScore || undefined,
        notes: formData.dealOverview || undefined,
        source: 'apply-form',
        smsConsent: consent.smsConsent,
        smsConsentAt: consent.smsConsentAt ?? undefined,
      });

      if (success) {
        gtagReportConversion();
        gtagEvent('quote_submitted', { source: queryRef.current?.get('source') || 'apply', query_intent: queryRef.current?.get('loanPurpose') || formData.strategy });
        gtagEvent('generate_lead', {
          currency: 'USD',
          value: Number(formData.purchasePrice.replace(/\D/g, '')),
        });
        metaTrackLead({
          currency: 'USD',
          value: Number(formData.purchasePrice.replace(/\D/g, '')),
        });

        setIsSubmitted(true);
        toast({
          title: "Application Submitted!",
          description: "We'll get back to you within 24 hours, usually within a few hours.",
        });
      } else {
        toast({
          title: "Submission Error",
          description: "Please try again or email info@assetliftlending.com directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "Please try again or email info@assetliftlending.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Application Received!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for submitting your deal. Our team will contact you within 24 hours, usually within a few hours.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container px-4 md:px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
        </div>
      </header>

      <div className="container px-4 md:px-6 pt-24 pb-20 md:pt-32">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Loan Application</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Submit your deal.</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with the application. Add the basics now and the team can ask for anything else after review.
            </p>
          </div>

          <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10">
            <div className="order-2 lg:order-1 lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary lg:inline-block"
              >
                Deal Review
              </motion.div>
              <h1 className="mt-5 hidden text-4xl font-bold tracking-tight md:text-5xl lg:block">
                Send the File.
                <br />
                <span className="gradient-text">Get a Real Answer.</span>
              </h1>
              <p className="hidden mt-5 text-lg text-muted-foreground lg:block">
                This form is for borrowers who want a clean read on the deal, the likely leverage,
                and the fastest workable path to closing.
              </p>

              <div className="mt-2 grid gap-3 lg:mt-8 lg:gap-4">
                {[
                  {
                    icon: Clock3,
                    title: "Fast response",
                    text: "You will hear back within 24 hours, usually within a few hours.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Cleaner review",
                    text: "We look at the full scenario, not just one headline number.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Straight expectations",
                    text: "If the file needs more support, we would rather say it early than waste your time.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-card p-4 lg:p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-secondary/20 p-4 lg:mt-6 lg:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Best to include</p>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <p>Purchase or current value</p>
                  <p>Property location</p>
                  <p>Rehab scope or rental plan</p>
                  <p>Any timing pressure or closing deadline</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <a
                  href="tel:+19296392284"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="w-4 h-4" />
                  +1 929-639-2284
                </a>
                <a
                  href="mailto:info@assetliftlending.com"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="w-4 h-4" />
                  info@assetliftlending.com
                </a>
              </div>
            </div>

          <motion.form
            onSubmit={onSubmit}
            className="order-1 space-y-5 lg:order-2 lg:space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-8 lg:rounded-3xl">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2 md:mb-6 md:text-lg">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">1</span>
                Contact Information
              </h3>
              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`h-11 rounded-xl bg-background ${errors.name ? "border-destructive" : ""}`}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`h-11 rounded-xl bg-background ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`h-11 rounded-xl bg-background ${errors.phone ? "border-destructive" : ""}`}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strategy">Investment Strategy *</Label>
                  <Select
                    value={formData.strategy}
                    onValueChange={(value) => handleChange("strategy", value)}
                  >
                    <SelectTrigger className={`h-11 rounded-xl bg-background ${errors.strategy ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fix-flip">Fix & Flip</SelectItem>
                      <SelectItem value="ground-up">Ground-Up Construction</SelectItem>
                      <SelectItem value="rental">Rental / DSCR</SelectItem>
                      <SelectItem value="bridge">Bridge Loan</SelectItem>
                      <SelectItem value="commercial">Commercial Lending</SelectItem>
                      <SelectItem value="portfolio">Portfolio / Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.strategy && <p className="text-sm text-destructive">{errors.strategy}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                  <Select
                    value={formData.loanPurpose}
                    onValueChange={(value) => handleChange("loanPurpose", value)}
                  >
                    <SelectTrigger className={`h-11 rounded-xl bg-background ${errors.loanPurpose ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Purchase or Refinance?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="refinance">Refinance</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.loanPurpose && <p className="text-sm text-destructive">{errors.loanPurpose}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactMethod">Preferred Contact Method *</Label>
                  <Select
                    value={formData.contactMethod}
                    onValueChange={(value) => handleChange("contactMethod", value)}
                  >
                    <SelectTrigger className={`h-11 rounded-xl bg-background ${errors.contactMethod ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="How should we reach you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="text">Text Message</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.contactMethod && <p className="text-sm text-destructive">{errors.contactMethod}</p>}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-8 lg:rounded-3xl">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2 md:mb-6 md:text-lg">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">2</span>
                Deal Details
              </h3>
              <div className="grid gap-4 mb-5 md:grid-cols-2 md:gap-6 md:mb-6">
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Purchase Price / Refi *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="purchasePrice"
                      placeholder="500,000"
                      value={formData.purchasePrice}
                      onChange={(e) => handleChange("purchasePrice", e.target.value)}
                      className={`h-11 rounded-xl bg-background pl-7 ${errors.purchasePrice ? "border-destructive" : ""}`}
                      inputMode="numeric"
                    />
                  </div>
                  {errors.purchasePrice && <p className="text-sm text-destructive">{errors.purchasePrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="arv">Projected ARV</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="arv"
                      placeholder="750,000"
                      value={formData.arv}
                      onChange={(e) => handleChange("arv", e.target.value)}
                      className="h-11 rounded-xl bg-background pl-7"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rehabAmount">Rehab Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="rehabAmount"
                      placeholder="100,000"
                      value={formData.rehabAmount}
                      onChange={(e) => handleChange("rehabAmount", e.target.value)}
                      className="h-11 rounded-xl bg-background pl-7"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creditScore">Estimated Credit Score</Label>
                  <Select
                    value={formData.creditScore}
                    onValueChange={(value) => handleChange("creditScore", value)}
                  >
                    <SelectTrigger className="h-11 rounded-xl bg-background">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="760+">Excellent (760+)</SelectItem>
                      <SelectItem value="720-759">Very Good (720-759)</SelectItem>
                      <SelectItem value="680-719">Good (680-719)</SelectItem>
                      <SelectItem value="640-679">Fair (640-679)</SelectItem>
                      <SelectItem value="620-639">Below Average (620-639)</SelectItem>
                      <SelectItem value="below-620">Poor (Below 620)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 relative" ref={addressWrapperRef}>
                <Label htmlFor="location">Asset Location *</Label>
                <Input
                  id="location"
                  placeholder="Start typing address, city, or state..."
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  autoComplete="off"
                  className={`h-11 rounded-xl bg-background ${errors.location ? "border-destructive" : ""}`}
                />
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}

                {showSuggestions && suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  >
                    {suggestions.map((addr, idx) => (
                      <li
                        key={idx}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectAddress(addr);
                        }}
                        className="px-4 py-3 hover:bg-primary/10 cursor-pointer text-sm border-b border-border last:border-0 transition-colors"
                      >
                        {addr}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-8 lg:rounded-3xl">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2 md:mb-6 md:text-lg">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">3</span>
                Additional Information
              </h3>
              <div className="space-y-2">
                <Label htmlFor="dealOverview">Deal Overview (Optional)</Label>
                <Textarea
                  id="dealOverview"
                  placeholder="Tell us about your experience, timeline, current occupancy, exit strategy..."
                  rows={4}
                  value={formData.dealOverview}
                  onChange={(e) => handleChange("dealOverview", e.target.value)}
                  className="rounded-xl bg-background resize-none"
                />
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-border bg-secondary/15 p-5 text-sm text-muted-foreground">
              <label htmlFor="smsConsent" className="flex cursor-pointer items-start gap-3">
                <input
                  id="smsConsent"
                  name="smsConsent"
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-border accent-primary"
                />
                <span className="leading-relaxed">
                  {SMS_CONSENT_TEXT}{" "}
                  <span className="font-medium text-foreground">{SMS_CONSENT_NOT_A_CONDITION}</span>{" "}
                  See our{" "}
                  <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
                  {" "}and{" "}
                  <Link href="/terms" className="underline hover:text-foreground">Terms &amp; Conditions</Link>.
                </span>
              </label>

              <p className="border-t border-border pt-4 leading-relaxed">
                By submitting, you agree to be contacted about your loan inquiry. This form is for
                business-purpose investment property financing only.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full py-7 text-lg glow-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    Submit Deal for Review
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplyForm;
