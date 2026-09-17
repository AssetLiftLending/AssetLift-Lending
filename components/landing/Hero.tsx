'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle, Clock3, Coins, Hammer, Home, MessageSquare, Phone, Repeat2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sendNotification } from '@/services/notificationService';
import { gtagEvent, gtagReportConversion } from '@/lib/gtag';
import { metaTrackLead } from '@/lib/meta-pixel';
import { pushToGHL } from '@/services/ghlService';
import {
  SMS_CONSENT_TEXT,
  SMS_CONSENT_NOT_A_CONDITION,
  buildSmsConsentRecord,
} from '@/lib/sms-consent';

const trustPoints = [
  { icon: Clock3, text: 'Fast initial review' },
  { icon: Coins, text: 'Purchase, refinance, and rehab capital' },
  { icon: CheckCircle, text: 'Clear terms before you spend time on a file' },
  { icon: Building2, text: 'Fix & flip, DSCR, bridge, and construction programs' },
];

const intentLinks = [
  { icon: Hammer, label: "I'm Flipping", href: '/loans/fix-and-flip' },
  { icon: Home, label: "I'm Buying Rentals", href: '/loans/dscr-rental' },
  { icon: Building2, label: "I'm Building", href: '/loans/ground-up-construction' },
  { icon: Repeat2, label: "I'm Refinancing", href: '/loans/bridge' },
];

const initialForm = {
  loanType: '',
  propertyState: '',
  purchasePrice: '',
  rehabAmount: '',
  creditRange: '',
  completedProjects: '',
  name: '',
  phone: '',
  email: '',
};

function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, '').slice(0, 10);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
}

function formatCurrency(value: string) {
  const raw = value.replace(/\D/g, '');
  return raw ? Number(raw).toLocaleString('en-US') : '';
}

export default function Hero() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  // Starts false and is deliberately absent from `isValid`: a pre-ticked box, or
  // one that blocks submission, is not valid consent for A2P purposes.
  const [smsConsent, setSmsConsent] = useState(false);
  const started = useRef(false);

  const update = (name: keyof typeof initialForm, value: string) => {
    const formatted =
      name === 'phone'
        ? formatPhone(value)
        : name === 'purchasePrice' || name === 'rehabAmount'
          ? formatCurrency(value)
          : value;

    setForm((prev) => ({ ...prev, [name]: formatted }));
    setError('');
    if (!started.current) {
      started.current = true;
      gtagEvent('form_started', { form_name: 'homepage_hero' });
    }
  };

  const isValid =
    form.loanType &&
    form.propertyState.trim().length >= 2 &&
    Number(form.purchasePrice.replace(/\D/g, '')) > 0 &&
    form.creditRange &&
    form.completedProjects &&
    form.name.trim().length >= 2 &&
    form.phone.replace(/\D/g, '').length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      setError('Please complete the required fields with a valid phone and email.');
      return;
    }

    setSubmitting(true);
    // Captured once so the email and the CRM describe the same act of consent.
    const consent = buildSmsConsentRecord(smsConsent, 'homepage-hero-form');
    try {
      const value = Number(form.purchasePrice.replace(/\D/g, ''));
      const success = await sendNotification('form', {
        ...consent,
        name: form.name,
        phone: form.phone,
        email: form.email,
        program: form.loanType,
        loanAmount: form.purchasePrice,
        rehabAmount: form.rehabAmount,
        creditScore: form.creditRange,
        propertyAddress: form.propertyState,
        loanPurpose: '',
        contactMethod: '',
        arv: '',
        message: `Homepage short form. Completed projects: ${form.completedProjects || 'Not specified'}`,
      });

      // The CRM is an independent delivery channel from the notification email,
      // so push before the email result is considered. Otherwise a failed send
      // returns early and the lead never reaches the CRM either.
      pushToGHL({
        name: form.name,
        email: form.email,
        phone: form.phone,
        loanType: form.loanType,
        propertyAddress: form.propertyState,
        purchasePrice: form.purchasePrice,
        rehabAmount: form.rehabAmount || undefined,
        creditScore: form.creditRange,
        flipsCompleted: form.completedProjects,
        source: 'hero-form',
        smsConsent: consent.smsConsent,
        smsConsentAt: consent.smsConsentAt ?? undefined,
      });

      if (!success) {
        setError('We could not send the form. Please call or text (929) 639-2284.');
        return;
      }

      gtagReportConversion();
      gtagEvent('form_submitted', { form_name: 'homepage_hero', loan_type: form.loanType });
      gtagEvent('generate_lead', { currency: 'USD', value });
      metaTrackLead({ currency: 'USD', value });

      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-house.jpg"
          alt="Finished investment property exterior representing real estate investor financing"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-zinc-950/70" />
      </div>

      <div className="container relative z-20 px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl text-white">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/45 bg-zinc-950/45 px-4 py-2 text-xs font-medium text-primary shadow-sm backdrop-blur-md sm:text-sm">
              Private lending for real estate investors
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:mb-6 sm:text-5xl md:text-6xl">
              Capital That Keeps Investor Deals Moving
            </h1>
            <p className="mb-4 max-w-2xl text-base text-white/85 sm:text-lg md:text-xl">
              Fix &amp; flip, DSCR rental, bridge, and ground-up construction financing for
              business-purpose investment properties. Send the deal and get preliminary options
              within 24 hours.
            </p>
            <p className="mb-6 max-w-2xl text-xs text-white/75 sm:text-sm md:text-base">
              Maximum leverage depends on credit, experience, liquidity, property, rent support,
              valuation, title, and deal strength. Non-owner-occupied investor loans only.
            </p>

            <div className="mb-5 flex flex-col gap-3 sm:mb-9 sm:flex-row">
              <Button asChild size="lg" className="w-full px-7 py-6 text-base sm:w-auto">
                <Link
                  href="/apply"
                  onClick={() => gtagEvent('primary_cta_click', { location: 'hero', cta: 'Get My Loan Options' })}
                >
                  Get My Loan Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full border-white/40 bg-black/25 px-7 py-6 text-base text-white hover:bg-white/12 hover:text-white sm:w-auto">
                <a href="tel:+19296392284" onClick={() => gtagEvent('phone_click', { location: 'hero' })}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call or Text (929) 639-2284
                </a>
              </Button>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-7 sm:grid-cols-4">
              {intentLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-zinc-950/42 px-3 py-3 text-sm font-semibold text-white/92 shadow-sm backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden gap-3 sm:grid sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point.text} className="flex items-start gap-3 rounded-xl border border-white/20 bg-zinc-950/42 px-4 py-3 shadow-sm backdrop-blur-md">
                  <point.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-white/90">{point.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md justify-self-end text-foreground">
            <div className="rounded-2xl border border-white/25 bg-background/94 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-7">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                    <CheckCircle className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold">We received your scenario.</h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                    AssetLift will review it and follow up with preliminary options.
                  </p>
                  <Button asChild className="w-full">
                    <a href="sms:+19296392284" onClick={() => gtagEvent('text_click', { location: 'hero_success' })}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Text the Team
                    </a>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-semibold text-primary">
                      Short quote form
                    </p>
                    <h2 className="text-xl font-bold tracking-tight">Get preliminary loan options.</h2>
                  </div>

                  <form onSubmit={submit} className="space-y-2.5" noValidate>
                    <Select value={form.loanType} onValueChange={(value) => update('loanType', value)}>
                      <SelectTrigger aria-label="Loan type" className="h-10 rounded-lg bg-background/60 text-sm">
                        <SelectValue placeholder="Loan type *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fix-and-flip">Fix &amp; Flip</SelectItem>
                        <SelectItem value="dscr-rental">DSCR Rental</SelectItem>
                        <SelectItem value="bridge">Bridge</SelectItem>
                        <SelectItem value="ground-up-construction">Ground-Up Construction</SelectItem>
                      </SelectContent>
                    </Select>

                    <label className="sr-only" htmlFor="hero-state">Property state</label>
                    <Input id="hero-state" value={form.propertyState} onChange={(event) => update('propertyState', event.target.value)} placeholder="Property state *" className="h-10 rounded-lg bg-background/60 text-sm" />

                    <div className="grid grid-cols-2 gap-2">
                      <label className="sr-only" htmlFor="hero-price">Purchase price or value</label>
                      <Input id="hero-price" value={form.purchasePrice} onChange={(event) => update('purchasePrice', event.target.value)} placeholder="Purchase/value *" inputMode="numeric" className="h-10 rounded-lg bg-background/60 text-sm" />
                      <label className="sr-only" htmlFor="hero-rehab">Rehab amount</label>
                      <Input id="hero-rehab" value={form.rehabAmount} onChange={(event) => update('rehabAmount', event.target.value)} placeholder="Rehab amount" inputMode="numeric" className="h-10 rounded-lg bg-background/60 text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Select value={form.creditRange} onValueChange={(value) => update('creditRange', value)}>
                        <SelectTrigger aria-label="Credit range" className="h-10 rounded-lg bg-background/60 text-sm">
                          <SelectValue placeholder="Credit range *" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="740+">740+</SelectItem>
                          <SelectItem value="700-739">700-739</SelectItem>
                          <SelectItem value="660-699">660-699</SelectItem>
                          <SelectItem value="640-659">640-659</SelectItem>
                          <SelectItem value="below-640">Below 640</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={form.completedProjects} onValueChange={(value) => update('completedProjects', value)}>
                        <SelectTrigger aria-label="Completed projects" className="h-10 rounded-lg bg-background/60 text-sm">
                          <SelectValue placeholder="Completed projects *" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 completed</SelectItem>
                          <SelectItem value="1-3">1-3 completed</SelectItem>
                          <SelectItem value="4-10">4-10 completed</SelectItem>
                          <SelectItem value="11+">11+ completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <label className="sr-only" htmlFor="hero-name">Full name</label>
                    <Input id="hero-name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Full name *" className="h-10 rounded-lg bg-background/60 text-sm" />

                    <div className="grid grid-cols-2 gap-2">
                      <label className="sr-only" htmlFor="hero-phone">Phone</label>
                      <Input id="hero-phone" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="Phone *" type="tel" className="h-10 rounded-lg bg-background/60 text-sm" />
                      <label className="sr-only" htmlFor="hero-email">Email</label>
                      <Input id="hero-email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="Email *" type="email" className="h-10 rounded-lg bg-background/60 text-sm" />
                    </div>

                    {error && (
                      <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive" role="alert">
                        {error}
                      </p>
                    )}

                    <label
                      htmlFor="hero-sms-consent"
                      className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border bg-background/40 p-3 text-left text-xs leading-relaxed text-muted-foreground"
                    >
                      <input
                        id="hero-sms-consent"
                        name="smsConsent"
                        type="checkbox"
                        checked={smsConsent}
                        onChange={(event) => setSmsConsent(event.target.checked)}
                        className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded border-border accent-primary"
                      />
                      <span>
                        {SMS_CONSENT_TEXT}{' '}
                        <span className="font-medium text-foreground">{SMS_CONSENT_NOT_A_CONDITION}</span>{' '}
                        See our{' '}
                        <Link href="/privacy" className="underline hover:text-foreground">
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link href="/terms" className="underline hover:text-foreground">
                          Terms &amp; Conditions
                        </Link>
                        .
                      </span>
                    </label>

                    <Button type="submit" size="lg" className="w-full rounded-lg" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Get My Loan Options'}
                      {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Maximum leverage is not available to every borrower. Non-owner-occupied
                    investment property loans only.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
