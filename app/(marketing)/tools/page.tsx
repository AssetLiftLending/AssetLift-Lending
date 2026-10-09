import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, TrendingUp } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Free Real Estate Investor Tools & Calculators | AssetLift Lending',
  description:
    'Free calculators and tools for real estate investors. Analyze fix-and-flip deals, estimate DSCR rental loan eligibility, and underwrite your next investment property.',
  path: '/tools',
});

const TOOLS = [
  {
    title: 'Fix & Flip Calculator',
    href: '/tools/fix-and-flip-calculator',
    description:
      'Estimate rehab costs, holding costs, projected resale value, and profit on your next house flip. Model acquisition, renovation, and exit assumptions before you submit an offer.',
    icon: TrendingUp,
  },
  {
    title: 'DSCR Calculator',
    href: '/tools/dscr-calculator',
    description:
      'Calculate your debt service coverage ratio to determine eligibility for DSCR rental property loans. Enter rent, mortgage payment, taxes, insurance, and vacancy to see where you stand.',
    icon: Calculator,
  },
];

export default function ToolsHubPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Real Estate Investor Tools & Calculators',
    description:
      'Free calculators and analysis tools for real estate investors evaluating fix-and-flip deals and DSCR rental property loans.',
    url: 'https://www.assetliftlending.com/tools',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: TOOLS.length,
      itemListElement: TOOLS.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.assetliftlending.com${tool.href}`,
        name: tool.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tools' }]} />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Investor Tools
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Free Calculators & Deal Analysis Tools
            </h1>
            <p className="text-lg text-muted-foreground">
              Run the numbers before you make an offer. These tools help real estate investors
              estimate project profitability, stress-test assumptions, and evaluate loan eligibility
              so you can move forward with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-bold">{tool.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Open calculator <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary/20 border-y border-border">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Finance Your Next Deal?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Once you have run the numbers, get a term sheet from AssetLift Lending. Fix-and-flip,
            DSCR rental, bridge, and ground-up construction loans for real estate investors.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
