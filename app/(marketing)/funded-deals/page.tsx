import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Home, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';
import { CITIES } from '@/lib/data/cities';
import { FUNDED_DEALS, type FundedDeal } from '@/lib/data/funded-deals';

const PATH = '/funded-deals';

export const metadata: Metadata = createMetadata({
  title: 'Funded Deals | Recent Investor Loans',
  description:
    'Single-family investor loans AssetLift Lending has funded in Georgia, Florida, Oklahoma, New Jersey, Michigan, Ohio and Alabama. Call 929-639-2284.',
  path: PATH,
  keywords: [
    'funded fix and flip loans',
    'private lender funded deals',
    'recent hard money loans',
    'single-family investor loans',
  ],
});

function cityHref(deal: FundedDeal) {
  if (!deal.citySlug) return null;
  const exists = CITIES.some((c) => c.stateSlug === deal.stateSlug && c.citySlug === deal.citySlug);
  return exists ? `/lending/${deal.stateSlug}/${deal.citySlug}` : null;
}

export default function FundedDealsPage() {
  const states = Array.from(new Set(FUNDED_DEALS.map((d) => d.state)));
  const byState = states
    .map((state) => ({
      state,
      stateSlug: FUNDED_DEALS.find((d) => d.state === state)!.stateSlug,
      deals: FUNDED_DEALS.filter((d) => d.state === state),
    }))
    .sort((a, b) => b.deals.length - a.deals.length || a.state.localeCompare(b.state));
  const orderedDeals = byState.flatMap((group) => group.deals);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Funded Deals | AssetLift Lending',
    description:
      'Single-family investment property loans funded by AssetLift Lending, listed by city and state.',
    url: `https://www.assetliftlending.com${PATH}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: FUNDED_DEALS.length,
      itemListElement: FUNDED_DEALS.map((deal, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${deal.propertyType} investor loan funded in ${deal.city}, ${deal.stateAbbreviation}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto mb-10">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Funded Deals' }]} />
          </div>

          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Funded Deals</h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              A running list of single-family investment property loans AssetLift Lending has funded
              for real estate investors. To protect our borrowers&apos; privacy, we list the city and
              state only. No addresses, names, or entities.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-14 max-w-xl">
              {[
                { value: FUNDED_DEALS.length, label: 'Loans listed' },
                { value: states.length, label: 'States' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-6">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {orderedDeals.map((deal) => {
                const href = cityHref(deal);
                return (
                  <div
                    key={`${deal.city}-${deal.stateAbbreviation}`}
                    className="rounded-2xl border border-border bg-card p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                      <CheckCircle2 className="w-4 h-4" /> Funded
                    </div>
                    <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      {deal.city}, {deal.stateAbbreviation}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                        <Home className="w-3.5 h-3.5" /> {deal.propertyType}
                      </span>
                      {deal.program && (
                        <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                          {deal.program}
                        </span>
                      )}
                    </div>
                    <Link
                      href={href ?? `/lending/${deal.stateSlug}`}
                      className="mt-auto pt-5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Investor loans in {href ? deal.city : deal.state} <ArrowRight className="inline w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-foreground mb-4">States We&apos;ve Funded In</h2>
              <div className="flex flex-wrap gap-3">
                {byState.map((group) => (
                  <Link
                    key={group.state}
                    href={`/lending/${group.stateSlug}`}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {group.state} ({group.deals.length})
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-16 rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">Have a Deal in One of These Markets?</h2>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                We fund business-purpose loans on non-owner-occupied investment properties in 46
                states, including fix-and-flip, DSCR rental, bridge, and ground-up construction. Send
                the purchase price, rehab budget, and after-repair value and we&apos;ll tell you what
                is realistic.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="glow-primary">
                  <Link href="/apply">
                    Submit a Deal <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/loans/fix-and-flip">Fix &amp; Flip Loan Terms</Link>
                </Button>
              </div>
            </section>

            <p className="text-xs text-muted-foreground mt-10 max-w-3xl">
              Past loans are shown for informational purposes only and are not a commitment to lend or
              a guarantee of approval, terms, or timing on any future transaction. Every loan is
              subject to underwriting, appraisal, and program availability in the property&apos;s state.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
