import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Fix & Flip Deal Checklist | AssetLift Lending',
  description:
    'Use this fix and flip deal checklist to review leverage, rehab budget, ARV support, closing documents, and exit strategy before you apply.',
  path: '/resources/fix-and-flip-deal-checklist',
});

const CHECKLIST_GROUPS = [
  {
    title: 'Deal Basics',
    items: [
      'Signed purchase contract or clear target basis',
      'Property address and asset type confirmed',
      'Target hold period and exit strategy defined',
      'Borrower or entity name ready for the file',
    ],
  },
  {
    title: 'Rehab and Budget',
    items: [
      'Line-item rehab scope with realistic cost assumptions',
      'Contingency reserve built into the budget',
      'Contractor or project-management plan identified',
      'Draw expectations understood before closing',
    ],
  },
  {
    title: 'Value and Underwriting',
    items: [
      'Local sold comps support the ARV story',
      'The finish level matches the neighborhood standard',
      'The deal still works if the timeline slips',
      'Insurance, taxes, utilities, and sale friction are included',
    ],
  },
  {
    title: 'Closing Readiness',
    items: [
      'Entity documents ready if closing in an LLC',
      'Liquidity available for down payment, reserves, and gaps',
      'Title, insurance, and valuation are treated as real timing items',
      'All assumptions are organized before shopping term sheets',
    ],
  },
];

export default function FixAndFlipDealChecklistPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Fix & Flip Deal Checklist',
    description:
      'A borrower-facing checklist covering acquisition, rehab budget, ARV, closing readiness, and exit planning for a fix and flip deal.',
    url: 'https://www.assetliftlending.com/resources/fix-and-flip-deal-checklist',
    about: ['Fix and flip loans', 'Hard money lending', 'House flipping checklist'],
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Resources' },
            { label: 'Fix & Flip Deal Checklist' },
          ]}
        />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  Free Borrower Resource
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                  Fix &amp; Flip Deal Checklist
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Use this before you apply, before you shop term sheets, and before you assume
                  the deal is ready. Most flip files slow down for predictable reasons. This page
                  helps you clean those up early.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="w-full sm:w-auto glow-primary">
                    <Link href="/apply">
                      Review My Deal <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href="/tools/fix-and-flip-calculator">Run Deal Math</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                  Fast-close profile
                </p>
                <h2 className="text-2xl font-bold tracking-tight mb-3">
                  The cleanest files usually have four things.
                </h2>
                <div className="space-y-3">
                  {[
                    'Clear basis and contract terms',
                    'Credible rehab scope and budget',
                    'Defensible ARV using real sold comps',
                    'Experienced borrower or clearly managed execution',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-secondary/25 px-4 py-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-sm text-foreground/90">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                  Experienced investors with 3 or more completed flips may close in as fast as 5
                  business days, subject to underwriting, valuation, title, and file complexity.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {CHECKLIST_GROUPS.map((group) => (
                <section key={group.title} className="rounded-3xl border border-border bg-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold tracking-tight mb-5">{group.title}</h2>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <p className="text-sm leading-relaxed text-foreground/90">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-12 rounded-3xl border border-border bg-secondary/20 p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    What to do with this checklist
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Start with the checklist. Then run the deal through the fix-and-flip
                    calculator. If the numbers still work after financing, hold costs, and a real
                    contingency buffer, send the file over for review.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    That sequence is a better use of time than filling out generic lead forms
                    before you know whether the file is actually lender-ready.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                    Next steps
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/tools/fix-and-flip-calculator"
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                    >
                      Open the fix &amp; flip calculator
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </Link>
                    <Link
                      href="/loans/fix-and-flip"
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                    >
                      Review the program page
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </Link>
                    <Link
                      href="/apply"
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                    >
                      Send us your deal
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
