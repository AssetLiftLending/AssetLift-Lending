import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Banknote, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';
import { LOAN_PRODUCTS } from '@/lib/data/loan-products';

export const metadata: Metadata = createMetadata({
  title: 'Loan Programs for Real Estate Investors | Hard Money & DSCR Financing',
  description:
    'Explore AssetLift Lending loan programs for real estate investors: fix and flip, DSCR rental, bridge, and ground-up construction loans. Fast closings, asset-based underwriting, competitive rates.',
  path: '/loans',
});

export default function LoansHubPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AssetLift Lending Loan Programs',
    description:
      'Loan programs for real estate investors including fix and flip, DSCR rental, bridge, and ground-up construction financing.',
    url: 'https://www.assetliftlending.com/loans',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: LOAN_PRODUCTS.length,
      itemListElement: LOAN_PRODUCTS.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.assetliftlending.com/loans/${product.slug}`,
        name: product.heroTitle,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loan Programs' }]} />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Loan Programs
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Financing Built for Real Estate Investors
            </h1>
            <p className="text-lg text-muted-foreground">
              AssetLift Lending offers four core loan programs designed for speed, flexibility, and
              asset-based qualification. Whether you are flipping houses, building from the ground
              up, stabilizing rentals, or bridging between transactions, we have a product that fits
              your deal.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {LOAN_PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/loans/${product.slug}`}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Banknote className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold">{product.heroTitle}</h2>
                </div>
                <p className="text-muted-foreground mb-5">{product.heroSubtitle}</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {product.keyStats.slice(0, 4).map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border bg-secondary/20 px-3 py-2.5"
                    >
                      <p className="text-xs text-muted-foreground mb-0.5">{stat.label}</p>
                      <p className="text-sm font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  View {product.heroTitle} details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="bg-secondary/20 border border-border rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Investors Choose AssetLift Lending
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                {
                  title: 'Asset-Based Underwriting',
                  detail:
                    'We qualify deals on the property and the project, not just your personal income or tax returns.',
                },
                {
                  title: 'Close in Days, Not Months',
                  detail:
                    'Many loans close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.',
                },
                {
                  title: 'No Prepayment Penalties',
                  detail:
                    'Sell or refinance whenever your exit strategy calls for it without early payoff fees on short-term products.',
                },
                {
                  title: 'Flexible Entity Structures',
                  detail:
                    'Close in the name of an LLC, LP, or corporation to protect personal assets and simplify portfolio management.',
                },
                {
                  title: 'Experienced Borrower Pricing',
                  detail:
                    'Investors with a track record of completed deals qualify for reduced rates and streamlined processing.',
                },
                {
                  title: 'Nationwide Coverage',
                  detail:
                    'We lend across 46 states for investment-property deals, covering most major and secondary markets.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card px-4 py-4"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p className="font-semibold">{item.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investor resources */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Investor Resources</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Asset-Based Loan Companies for Real Estate Investors', href: '/answers/asset-based-loan-companies-real-estate-investors' },
                { label: 'Compare Lenders and Loan Options', href: '/compare' },
                { label: 'DSCR Calculator', href: '/tools/dscr-calculator' },
                { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
              ].map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-medium">{resource.label}</span>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Fund Your Next Deal?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Submit your deal today and hear back within 24 hours, usually within a few hours. No
              fees, no obligation.
            </p>
            <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary">
              <Link href="/apply">
                Apply for Funding <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
