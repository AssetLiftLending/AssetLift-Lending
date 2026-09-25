'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { LoanProduct } from '@/lib/data/loan-products';

interface LoanProductPageProps {
  product: LoanProduct;
  directAnswer?: string;
  cta?: { heading: string; copy: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };
  checklist?: string[];
}

const RELATED_GUIDES: Record<
  string,
  Array<{ label: string; href: string }>
> = {
  'fix-and-flip': [
    { label: 'Experienced Flipper Loan File Checklist', href: '/blog/how-experienced-flippers-package-deals-for-fast-approval' },
    { label: 'Fix and Flip Loan Requirements', href: '/blog/fix-and-flip-loan-requirements' },
    { label: '90% LTC Fix and Flip Loans', href: '/blog/90-ltc-fix-and-flip-loan' },
    { label: 'What Lenders Look For in Scope of Work', href: '/blog/what-lenders-look-for-in-scope-of-work' },
    { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
    { label: 'Borrower Package', href: '/resources/fix-and-flip-borrower-package' },
    { label: 'Fix and Flip vs BRRRR Strategy', href: '/compare/fix-and-flip-vs-brrrr-strategy' },
    { label: 'Asset-Based Loan Companies for Investors', href: '/answers/asset-based-loan-companies-real-estate-investors' },
    { label: 'Fix & Flip Loans in Camden County, NJ', href: '/lending/new-jersey/camden-county' },
    { label: 'Fix & Flip Loans in Cherry Hill, NJ', href: '/lending/new-jersey/cherry-hill' },
    { label: 'Fix & Flip Loans in Lakewood, NJ', href: '/lending/new-jersey/lakewood' },
    { label: 'Fix & Flip Loans in Freehold, NJ', href: '/lending/new-jersey/freehold' },
    { label: 'View all loan programs', href: '/loans' },
  ],
  'dscr-rental': [
    { label: 'DSCR Loans Explained', href: '/blog/dscr-loans-explained' },
    { label: 'How to Qualify for a DSCR Loan', href: '/blog/how-to-qualify-for-dscr-loan' },
    { label: 'DSCR Loans for Rental Property', href: '/blog/dscr-loan-for-rental-property' },
    { label: 'How Does a DSCR Loan Work?', href: '/blog/how-does-a-dscr-loan-work' },
    { label: 'BRRRR to DSCR Refinance Guide', href: '/blog/brrrr-refinance-into-dscr-loan' },
    { label: 'DSCR Calculator', href: '/tools/dscr-calculator' },
    { label: 'DSCR vs Conventional Rental Loans', href: '/compare/dscr-loans-vs-conventional-rental-loans' },
    { label: 'Asset-Based Loan Companies for Investors', href: '/answers/asset-based-loan-companies-real-estate-investors' },
    { label: 'DSCR Loans in New York', href: '/lending/new-york/dscr-loans' },
    { label: 'DSCR Loans in New Jersey', href: '/lending/new-jersey/dscr-loans' },
    { label: 'DSCR Loans in Camden, NJ', href: '/lending/new-jersey/camden' },
    { label: 'DSCR Loans in Pennsauken, NJ', href: '/lending/new-jersey/pennsauken' },
    { label: 'DSCR Loans in Toms River, NJ', href: '/lending/new-jersey/toms-river' },
    { label: 'DSCR Loans in Edison, NJ', href: '/lending/new-jersey/edison' },
    { label: 'View all loan programs', href: '/loans' },
  ],
  bridge: [
    { label: 'Bridge Loan vs Hard Money Loan', href: '/blog/bridge-loan-vs-hard-money-loan' },
    { label: 'Bridge Loans vs Hard Money Loans', href: '/compare/bridge-loans-vs-hard-money-loans' },
    { label: 'Asset-Based Loan Companies for Investors', href: '/answers/asset-based-loan-companies-real-estate-investors' },
    { label: 'BRRRR to DSCR Refinance Guide', href: '/blog/brrrr-refinance-into-dscr-loan' },
    { label: 'Hard Money Prepayment Penalties', href: '/blog/hard-money-lender-prepayment-penalty' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Bridge Loans in Red Bank, NJ', href: '/lending/new-jersey/red-bank' },
    { label: 'Bridge Loans in New Brunswick, NJ', href: '/lending/new-jersey/new-brunswick' },
    { label: 'View all loan programs', href: '/loans' },
  ],
  'ground-up-construction': [
    { label: 'Ground-Up Construction Loan Requirements', href: '/blog/ground-up-construction-loan-requirements' },
    { label: 'Asset-Based Loan Companies for Investors', href: '/answers/asset-based-loan-companies-real-estate-investors' },
    { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
    { label: 'Hard Money Loan Rates 2026', href: '/blog/hard-money-loan-rates-2026' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Construction Loans in Howell, NJ', href: '/lending/new-jersey/howell' },
    { label: 'Construction Loans in Woodbridge, NJ', href: '/lending/new-jersey/woodbridge' },
    { label: 'View all loan programs', href: '/loans' },
  ],
};

const PRODUCT_INSIGHTS: Record<
  string,
  {
    fitTitle: string;
    fitBody: string;
    watchouts: Array<{ title: string; detail: string }>;
    resources: Array<{ label: string; href: string }>;
    walkthroughs?: Array<{
      title: string;
      duration: string;
      summary: string;
      href: string;
      chapters: string[];
    }>;
  }
> = {
  'fix-and-flip': {
    fitTitle: 'When Fix & Flip Debt Actually Makes Sense',
    fitBody:
      "The best fix and flip files are not just 'cheap enough' deals. They have a realistic rehab scope, enough margin after financing and carrying costs, and an exit that still works if the sale takes longer than expected. Borrowers usually get into trouble when they under-budget the rehab, overestimate the ARV, or assume every cosmetic project will sell on the first weekend.",
    watchouts: [
      {
        title: 'ARV support matters more than optimism',
        detail:
          'If the after-repair value depends on best-case comps or a finish level the neighborhood does not support, leverage usually compresses quickly.',
      },
      {
        title: 'Timeline slippage is expensive',
        detail:
          'A project that drifts by 60 days can erase margin through extra interest, utilities, insurance, and price reductions at resale.',
      },
      {
        title: 'Contractor discipline changes the loan outcome',
        detail:
          'Borrowers with a credible GC, line-item scope, and draw discipline generally get through underwriting and construction with less friction.',
      },
    ],
    resources: [
      { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
      { label: 'Experienced Flipper Loan File Checklist', href: '/blog/how-experienced-flippers-package-deals-for-fast-approval' },
      { label: 'How to Compare Hard Money Term Sheets', href: '/blog/how-to-compare-hard-money-term-sheets' },
    ],
    walkthroughs: [
      {
        title: 'Fix and Flip Loans Explained',
        duration: '3 min walkthrough',
        summary:
          'A simple borrower-facing explanation of what a fix and flip loan covers, how leverage usually works, and what makes a file financeable.',
        href: '/blog/how-experienced-flippers-package-deals-for-fast-approval',
        chapters: ['Acquisition leverage', 'Rehab escrow', 'ARV and exit plan'],
      },
      {
        title: 'How Rehab Draws Actually Work',
        duration: '2 min walkthrough',
        summary:
          'A clean explanation of inspections, draw requests, and what borrowers should prepare before funds are released.',
        href: '/blog/how-fix-and-flip-draws-work',
        chapters: ['Scope approval', 'Inspection timing', 'Draw release'],
      },
      {
        title: 'Purchase, Rehab, and Exit Timeline',
        duration: '4 min walkthrough',
        summary:
          'A step-by-step look at how a real file moves from contract to closing, through renovation, and into resale or refinance.',
        href: '/blog/what-happens-if-a-flip-takes-longer-than-expected',
        chapters: ['Underwriting', 'Project management', 'Sale or refinance'],
      },
    ],
  },
  'ground-up-construction': {
    fitTitle: 'Where Construction Loans Usually Break Down',
    fitBody:
      'Ground-up execution is won before the first draw. The files that move smoothly usually have clean plans, realistic budgets, a proven GC, and a market where end values are already supported. The files that struggle tend to rely on thin builder experience, incomplete permits, or resale assumptions that need the market to keep running hotter.',
    watchouts: [
      {
        title: 'Incomplete pre-close prep slows everything down',
        detail:
          'Missing plans, permit uncertainty, or vague budgets create delays before closing and usually create more draw friction later.',
      },
      {
        title: 'Contingency is not optional',
        detail:
          'Material swings, site surprises, and labor delays are normal. A thin contingency reserve can turn a good project into a capital problem.',
      },
      {
        title: 'Builder quality is underwritten',
        detail:
          'The GC is not just a vendor. Their experience, insurance, and prior delivery record directly affect how lenders view the risk.',
      },
    ],
    resources: [
      { label: 'Ground-Up Construction Financing Guide', href: '/blog/ground-up-construction-financing-guide' },
      { label: 'Bridge Loans', href: '/loans/bridge' },
      { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
    ],
  },
  'dscr-rental': {
    fitTitle: 'What Experienced Rental Investors Usually Care About',
    fitBody:
      'Most seasoned DSCR borrowers are not looking for a theoretical maximum loan. They want a loan that closes in an entity, works with the rent profile, and still leaves room for cash flow after taxes, insurance, and vacancy. The strongest DSCR executions happen when the borrower treats the property like an operating business instead of just chasing leverage.',
    watchouts: [
      {
        title: 'Break-even DSCR is not the same as healthy cash flow',
        detail:
          'A ratio that technically works can still leave the deal too thin once repairs, turnover, and management are layered in.',
      },
      {
        title: 'Rent support has to survive appraisal review',
        detail:
          'Projected rent that cannot be defended by leases, comps, or short-term rental data is a common reason terms move late in the process.',
      },
      {
        title: 'Entity and insurance details matter',
        detail:
          'If vesting, lease structure, or landlord coverage is sloppy, the file can stall even when the property cash flow is strong.',
      },
    ],
    resources: [
      { label: 'DSCR Calculator', href: '/tools/dscr-calculator' },
      { label: 'DSCR Loans Explained', href: '/blog/dscr-loans-explained' },
      { label: 'DSCR vs Conventional Rental Loans', href: '/compare/dscr-loans-vs-conventional-rental-loans' },
    ],
  },
  bridge: {
    fitTitle: 'When a Bridge Loan Is Better Than Waiting for Permanent Debt',
    fitBody:
      'Bridge debt works when speed is part of the edge. That usually means a property that needs to close before a conventional lender can move, a transition period before refinance, or a borrower solving a timing mismatch between sale proceeds and the next acquisition. The mistake is using bridge debt to cover a weak business plan instead of a short-term execution need.',
    watchouts: [
      {
        title: 'Your exit has to be believable on day one',
        detail:
          'A bridge loan is only as good as the refinance, sale, or payoff event behind it. If that exit is vague, the risk profile rises quickly.',
      },
      {
        title: 'Vacant or transitional assets need margin',
        detail:
          'Properties with lease-up risk, deferred maintenance, or title issues need more cushion than stabilized acquisitions.',
      },
      {
        title: 'Short-term debt rewards decisiveness',
        detail:
          'The borrowers who use bridge debt well usually have a defined plan, a strong team, and a reason they cannot wait on bank timing.',
      },
    ],
    resources: [
      { label: 'Hard Money vs. Bank Loans', href: '/blog/hard-money-vs-bank-loans' },
      { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
      { label: 'How It Works', href: '/how-it-works' },
    ],
  },
};

export default function LoanProductPage({ product, directAnswer, cta, checklist }: LoanProductPageProps) {
  const insights = PRODUCT_INSIGHTS[product.slug];
  const isFixAndFlip = product.slug === 'fix-and-flip';
  const isDscr = product.slug === 'dscr-rental';

  return (
    <div className="min-h-screen overflow-x-clip">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid min-w-0 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="min-w-0">
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  {product.heroSubtitle}
                </p>
                <h1 data-speakable className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  {product.heroTitle}
                </h1>
                <p data-speakable className="text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
                  {product.description}
                </p>
                {directAnswer && (
                  <div data-speakable className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-base leading-relaxed text-foreground">
                    {directAnswer}
                  </div>
                )}
                {isFixAndFlip && (
                  <div className="mb-8 rounded-2xl border border-border bg-secondary/25 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                      Best Fit
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3 text-sm">
                      <div className="rounded-xl bg-background px-4 py-3 text-foreground/90">
                        Value-add houses, condos, and 2-4 unit projects.
                      </div>
                      <div className="rounded-xl bg-background px-4 py-3 text-foreground/90">
                        Investors who need a fast answer on leverage and rehab.
                      </div>
                      <div className="rounded-xl bg-background px-4 py-3 text-foreground/90">
                        Borrowers planning either a resale or DSCR refinance exit.
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 glow-primary">
                    <Link href="/apply">
                      Review My Deal <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6">
                    <a href="tel:+19296392284">Call (929) 639-2284</a>
                  </Button>
                </div>
              </div>

              {(isFixAndFlip || isDscr) && (
                <div className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                    {isDscr ? 'DSCR Quick Terms' : 'Borrower Quick Start'}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight mb-3">
                    {isDscr ? 'What matters before you request DSCR loan terms.' : 'What helps a flip file move fast.'}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {isDscr
                      ? 'DSCR loan terms depend on rent support, credit, reserves, property type, leverage, and current program guidelines. Strong files usually document the rent story before underwriting starts.'
                      : 'Experienced investors with 3 or more completed flips may close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity. The fastest files usually come in organized from day one.'}
                  </p>
                  <div className="space-y-3 mb-5">
                    {(isDscr
                      ? [
                          'Up to 85% LTV on qualifying purchases',
                          'Up to 80% LTV on qualifying cash-out refinances',
                          'No personal tax returns for DSCR qualification',
                          'Rent-ready 1-4 unit and eligible STR properties',
                        ]
                      : [
                          'Signed purchase contract',
                          'Line-item rehab scope and budget',
                          'Local comp support for ARV',
                          'Borrower or GC experience summary',
                        ]
                    ).map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl bg-secondary/30 px-4 py-3">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-sm text-foreground/90">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href={isDscr ? '/tools/dscr-calculator' : '/resources/fix-and-flip-deal-checklist'}
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                    >
                      {isDscr ? 'Run DSCR math' : 'Free deal checklist'}
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </Link>
                    <Link
                      href={isDscr ? '/apply' : '/tools/fix-and-flip-calculator'}
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                    >
                      {isDscr ? 'Review my rental' : 'Run deal math'}
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {checklist && cta && (
        <section className="pb-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-[1fr_0.9fr] md:p-8">
              <div><h2 className="mb-4 text-2xl font-bold">What to send</h2><div className="grid gap-3 sm:grid-cols-2">{checklist.map((item) => <div key={item} className="flex gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 shrink-0 text-primary" />{item}</div>)}</div></div>
              <div><h2 className="mb-3 text-2xl font-bold">{cta.heading}</h2><p className="mb-5 text-sm leading-relaxed text-muted-foreground">{cta.copy}</p><p className="mb-5 text-xs font-semibold uppercase tracking-wide text-primary">Business-purpose, non-owner-occupied properties only.</p><div className="flex flex-col gap-3 sm:flex-row"><Button asChild><Link href={cta.primaryHref}>{cta.primaryLabel}</Link></Button><Button asChild variant="outline"><Link href={cta.secondaryHref}>{cta.secondaryLabel}</Link></Button></div></div>
            </div>
          </div>
        </section>
      )}

      {cta && !checklist && (
        <section className="pb-16"><div className="container px-4 md:px-6"><div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-6 md:p-8"><h2 className="mb-3 text-2xl font-bold">{cta.heading}</h2><p className="mb-4 max-w-3xl text-muted-foreground">{cta.copy}</p><p className="mb-5 text-xs font-semibold uppercase tracking-wide text-primary">Business-purpose, non-owner-occupied properties only.</p><div className="flex flex-col gap-3 sm:flex-row"><Button asChild><Link href={cta.primaryHref}>{cta.primaryLabel}</Link></Button><Button asChild variant="outline"><Link href={cta.secondaryHref}>{cta.secondaryLabel}</Link></Button></div></div></div></section>
      )}

      {/* Key Stats */}
      <section className="py-12 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {product.keyStats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-8">Overview</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              {product.overview.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {product.features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h3 data-speakable className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {insights && (
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 max-w-5xl mx-auto">
              <div>
                <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-6">{insights.fitTitle}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{insights.fitBody}</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">Related Resources</h3>
                <div className="space-y-3">
                  {insights.resources.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                    >
                      <span className="font-medium">{resource.label}</span>
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Eligibility */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-8">Eligibility Requirements</h2>
            <div className="space-y-4">
              {product.eligibility.map((req, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">{req.requirement}:</span>{' '}
                    <span className="text-muted-foreground">{req.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {product.process.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 data-speakable className="font-semibold mb-2">{step.step}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {insights?.walkthroughs && (
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-3xl mb-10">
                <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-4">
                  Borrower Walkthroughs
                </h2>
                <p className="text-lg text-muted-foreground">
                  These short explainers are structured so borrowers can understand the file
                  before they apply. They also give you a clean content base if you want to
                  narrate them into AI video later.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {insights.walkthroughs.map((walkthrough) => (
                  <Link
                    key={walkthrough.title}
                    href={walkthrough.href}
                    className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                      {walkthrough.duration}
                    </p>
                    <h3 className="text-xl font-semibold mb-3">{walkthrough.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {walkthrough.summary}
                    </p>
                    <div className="space-y-2 mb-5">
                      {walkthrough.chapters.map((chapter) => (
                        <div
                          key={chapter}
                          className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground"
                        >
                          {chapter}
                        </div>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Open explainer <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {isFixAndFlip && (
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-3xl mb-10">
                <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-4">
                  Free Fix &amp; Flip Deal Checklist
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Borrowers usually lose time on the same things: weak comp support, thin rehab
                  budgets, missing entity documents, and unrealistic timelines. This checklist gives
                  you the clean version of what to line up before you submit a deal.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                    What it includes
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      'Acquisition and leverage checklist',
                      'Rehab budget and draw prep',
                      'ARV and comp validation prompts',
                      'Closing-readiness document list',
                      'Exit-plan review for resale or refinance',
                      'Common underwriting mistakes to avoid',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-secondary/25 px-4 py-4">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-sm text-foreground/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-border bg-foreground p-6 md:p-8 text-background">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                    Best next step
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">
                    Open the checklist, run your numbers, then send the deal.
                  </h3>
                  <p className="text-sm leading-relaxed text-background/80 mb-6">
                    This is built for real borrowers, not generic lead-gen fluff. Use it to clean
                    up the file before you apply so the first quote you get is closer to something
                    that can actually close.
                  </p>
                  <div className="space-y-3">
                    <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:opacity-95">
                      <Link href="/resources/fix-and-flip-deal-checklist">
                        Open the Checklist <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background">
                      <Link href="/apply">Send Us Your Deal</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {insights && (
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-8 text-center">
                What Usually Trips Borrowers Up
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {insights.watchouts.map((item) => (
                  <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-8">Who Is This For?</h2>
            <div className="space-y-6">
              {product.useCases.map((uc, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-2">{uc.title}</h3>
                  <p className="text-muted-foreground">{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6 max-w-3xl">
          <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {product.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related Guides */}
      {RELATED_GUIDES[product.slug] && (
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-4">Related Guides &amp; Tools</h2>
              <p className="text-muted-foreground mb-8">
                Explore in-depth articles, calculators, and comparison guides related to {product.heroTitle.toLowerCase()}.
              </p>
              <div className="space-y-3">
                {RELATED_GUIDES[product.slug].map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-sm font-medium">{guide.label}</span>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lending Disclaimer */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <p className="text-xs text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed">
            This page is for informational purposes only and does not constitute a loan offer, commitment to lend, or guarantee of terms. All loans are subject to underwriting approval, property valuation, and title review. Rates, terms, fees, leverage, and closing timelines vary based on property type, location, borrower experience, deal structure, and the actual execution path. Depending on the transaction, financing may be provided directly or through a lending partner. AssetLift Lending provides business-purpose loans for investment properties only and does not offer consumer residential mortgages.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Submit your deal in minutes. Hear back within 24 hours, usually within a few hours.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 glow-primary">
            <Link href="/apply">
              Apply for {product.title} <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
