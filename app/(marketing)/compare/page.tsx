import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Banknote, Scale, Search } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';
import { COMPARISONS } from '@/lib/data/comparisons';

export const metadata: Metadata = createMetadata({
  title: 'Hard Money Lending Comparisons and Alternatives | AssetLift Lending',
  description:
    'Compare AssetLift Lending, hard money loans, DSCR options, and alternative financing paths with side-by-side guides built for real estate investors.',
  path: '/compare',
  noIndex: true,
});

export default function CompareHubPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AssetLift Lending Comparison Guides',
    description:
      'Comparison content for real estate investors evaluating hard money lenders, DSCR loans, BRRRR financing, and alternative capital structures.',
    url: 'https://www.assetliftlending.com/compare',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: COMPARISONS.length,
      itemListElement: COMPARISONS.map((comparison, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.assetliftlending.com/compare/${comparison.slug}`,
        name: comparison.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]} />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Comparison Hub
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Financing Comparisons for Real Estate Investors
            </h1>
            <p className="text-lg text-muted-foreground">
              These pages turn borrower questions into publicly indexable comparison content.
              Use them to evaluate hard money lenders, compare financing paths, and understand
              where each loan structure fits in a real deal.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 mb-12">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-5 h-5 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">Side-by-Side Guides</h2>
              </div>
              <div className="grid gap-4">
                {COMPARISONS.map((comparison) => (
                  <Link
                    key={comparison.slug}
                    href={`/compare/${comparison.slug}`}
                    className="rounded-xl border border-border p-5 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-2">{comparison.heroTitle}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{comparison.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read comparison <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-secondary/20 border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-5 h-5 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">What These Pages Target</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Borrowers search for comparisons when they are close to choosing a lender or loan
                  structure. That makes these queries unusually high intent.
                </p>
                <p>
                  Publishing comparisons as standalone pages gives Google and AI engines a clean,
                  crawlable URL for each topic instead of relying only on `llms-full.txt`.
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  'AssetLift vs competing hard money lenders',
                  'Hard money vs bank or conventional financing',
                  'Fix and flip vs BRRRR strategy comparisons',
                  'DSCR and rental financing decision support',
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Banknote className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Loan Programs</h2>
            </div>
            <p className="text-muted-foreground mb-5">
              After comparing options, explore the loan product that fits your deal.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
                { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
                { label: 'Bridge Loans', href: '/loans/bridge' },
                { label: 'Ground-Up Construction Loans', href: '/loans/ground-up-construction' },
              ].map((loan) => (
                <Link
                  key={loan.href}
                  href={loan.href}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <span className="text-sm font-medium">{loan.label}</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              ))}
            </div>
            <Link
              href="/loans"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4"
            >
              View all loan programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
