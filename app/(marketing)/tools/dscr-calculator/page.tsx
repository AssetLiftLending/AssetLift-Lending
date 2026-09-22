import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import DSCRCalculator from './DSCRCalculator';

export const metadata: Metadata = createMetadata({
  title: 'DSCR Loan Calculator for Rental Properties',
  description:
    'Calculate rental property DSCR from rent, mortgage payment, taxes, insurance, HOA dues, and vacancy. Review the ratio, then request DSCR loan terms.',
  path: '/tools/dscr-calculator',
});

export default function DSCRCalculatorPage() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DSCR Calculator',
    description:
      'Calculate your debt service coverage ratio (DSCR) to determine eligibility for rental property loans.',
    url: 'https://www.assetliftlending.com/tools/dscr-calculator',
    applicationCategory: 'FinanceApplication',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to use the AssetLift DSCR calculator',
    description:
      'Estimate debt service coverage ratio by entering monthly rent, mortgage payment, taxes, insurance, HOA dues, and a vacancy factor.',
    url: 'https://www.assetliftlending.com/tools/dscr-calculator',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter rent',
        text: "Add the property's expected monthly gross rent.",
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Add monthly debt costs',
        text: 'Input principal and interest, taxes, insurance, HOA dues, and a vacancy factor.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Review your ratio',
        text: 'Use the DSCR output to understand whether the property likely fits standard, qualifying, or no-ratio rental loan scenarios.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a good DSCR for a rental property?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "A DSCR of 1.25x or higher is usually considered strong because the property's income materially exceeds the monthly debt load. Some programs can still work below that threshold depending on leverage, reserves, and the lender's guidelines.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does DSCR use gross rent or net rent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lenders usually start with market rent and compare it against PITIA, though the exact method depends on the program and whether the file is treated as standard DSCR or no-ratio.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a property qualify with a DSCR below 1.0x?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sometimes. Some lenders offer no-ratio or reduced-ratio programs, but pricing, leverage, and reserve requirements are usually tighter when the rent does not fully cover the debt service.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools' },
            { label: 'DSCR Calculator' },
          ]}
        />
      </div>
      <DSCRCalculator />

      {/* Educational content */}
      <section className="container px-4 md:px-6 py-16 max-w-4xl mx-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            What This DSCR Calculator Does
          </h2>
          <div className="mb-6 flex flex-wrap gap-3 text-sm">{[['DSCR loans for rental properties','/loans/dscr-rental'],['New York DSCR loans','/lending/new-york/dscr-loans'],['New Jersey DSCR loans','/lending/new-jersey/dscr-loans'],['Connecticut DSCR loans','/lending/connecticut/dscr-loans'],['Rental income calculation','/blog/dscr-loan-rental-income-calculation'],['How to qualify','/blog/how-to-qualify-for-dscr-loan']].map(([label,href]) => <Link key={href} href={href} className="rounded-full border border-border px-3 py-2 hover:border-primary/50">{label}</Link>)}</div>
          <p className="text-muted-foreground leading-relaxed">
            The debt service coverage ratio (DSCR) measures whether a rental property generates enough
            income to cover its monthly debt obligations. This calculator takes your gross monthly rent,
            subtracts a vacancy factor, and divides the result by the total monthly payment including
            principal, interest, taxes, insurance, and HOA dues (PITIA). The output is a single ratio
            that lenders use to decide whether the property can carry the loan on its own merits --
            without relying on your personal income or W-2 employment.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Enter your expected monthly rent in the first field, then fill in each cost line item.
            If you do not know exact tax or insurance figures yet, use estimates from the listing,
            the county assessor site, or an insurance quote. Adjust the vacancy factor to reflect
            your local market -- 5% is common for strong rental markets, while 8-10% is more
            conservative for areas with seasonal demand or higher turnover.
          </p>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            Key Terms Defined
          </h2>
          <div className="grid gap-4 not-prose">
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">DSCR (Debt Service Coverage Ratio)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Net operating income divided by total debt service. A DSCR of 1.0x means the property
                breaks even -- rent exactly covers the payment. Above 1.0x, there is a cash-flow cushion.
                Below 1.0x, the property runs at a monthly deficit.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">PITIA</p>
              <p className="text-sm text-muted-foreground mt-1">
                Principal, Interest, Taxes, Insurance, and Association dues. This is the full monthly
                housing cost lenders use to calculate DSCR. Missing any component will overstate your ratio.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">LTV (Loan-to-Value)</p>
              <p className="text-sm text-muted-foreground mt-1">
                The loan amount divided by the appraised value of the property. Most DSCR loan programs
                cap LTV at 75-80% for purchases and 70-75% for cash-out refinances, though higher-ratio
                options exist at adjusted pricing.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">Vacancy Factor</p>
              <p className="text-sm text-muted-foreground mt-1">
                A percentage deducted from gross rent to account for turnover, vacancy between tenants,
                and collection loss. Even fully occupied properties should model some vacancy so your
                underwriting reflects realistic long-term performance.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">No-Ratio DSCR</p>
              <p className="text-sm text-muted-foreground mt-1">
                A program variant where the lender does not require the property to hit a minimum DSCR
                threshold. Pricing and reserve requirements are typically higher, but it allows investors
                to finance properties that do not yet cash-flow positively.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            Worked Example: Evaluating a Rental Purchase
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Suppose you are buying a duplex for $320,000 with 25% down. Market rent across both units
            is $2,800 per month. Here is how you would run the numbers:
          </p>
          <div className="rounded-lg border bg-card p-5 my-4 not-prose">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="font-medium text-foreground">Gross Monthly Rent:</span> $2,800</li>
              <li><span className="font-medium text-foreground">Vacancy (5%):</span> -$140</li>
              <li><span className="font-medium text-foreground">Effective Rent:</span> $2,660</li>
              <li className="pt-2 border-t"><span className="font-medium text-foreground">Loan Amount:</span> $240,000 (75% LTV)</li>
              <li><span className="font-medium text-foreground">P&I at 7.5%, 30-yr:</span> $1,678</li>
              <li><span className="font-medium text-foreground">Taxes:</span> $280/mo</li>
              <li><span className="font-medium text-foreground">Insurance:</span> $165/mo</li>
              <li><span className="font-medium text-foreground">Total PITIA:</span> $2,123</li>
              <li className="pt-2 border-t"><span className="font-medium text-foreground">DSCR:</span> $2,660 / $2,123 = <strong className="text-foreground">1.25x</strong></li>
            </ul>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            A 1.25x DSCR is strong enough for most standard DSCR loan programs. You would
            typically qualify for competitive pricing with six months of reserves. If the ratio
            came in at 1.05x instead, you could still qualify, but expect a rate adjustment and
            potentially higher reserve requirements. Below 1.0x, you would need a no-ratio program
            or a larger down payment to bring the ratio up.
          </p>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            When to Use DSCR Financing
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            DSCR loans are built for investors who want the property to qualify on its own income
            rather than their personal tax returns. They are a strong fit in several common scenarios:
          </p>
          <ul className="text-muted-foreground space-y-2 ml-4 list-disc">
            <li>
              <strong className="text-foreground">Self-employed investors</strong> whose tax returns
              understate actual income due to write-offs and depreciation.
            </li>
            <li>
              <strong className="text-foreground">Portfolio scaling</strong> -- once you exceed
              conventional loan limits (typically 10 financed properties), DSCR programs let you
              keep acquiring without DTI constraints.
            </li>
            <li>
              <strong className="text-foreground">BRRRR strategy exits</strong> -- after rehabbing
              and stabilizing a rental, a DSCR cash-out refinance lets you pull equity and recycle
              capital into the next deal.
            </li>
            <li>
              <strong className="text-foreground">Short-term rental properties</strong> -- some DSCR
              programs accept projected Airbnb or VRBO income, though documentation requirements
              and acceptable platforms vary by lender.
            </li>
            <li>
              <strong className="text-foreground">LLC-held properties</strong> -- DSCR loans close
              in entity names, which keeps your personal liability exposure clean.
            </li>
          </ul>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 not-prose">
            <div>
              <h3 className="font-semibold text-lg">What is a good DSCR for a rental property?</h3>
              <p className="text-muted-foreground mt-2">
                A DSCR of 1.25x or higher is considered strong by most lenders. At that level, the
                property generates 25% more income than the monthly debt service, providing a meaningful
                cushion for vacancies or unexpected expenses. Programs exist down to 1.0x and even
                below (no-ratio), but pricing adjusts upward and reserve requirements increase as the
                ratio drops.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Does DSCR use gross rent or net rent?</h3>
              <p className="text-muted-foreground mt-2">
                Most lenders start with market rent (typically supported by an appraisal with a rent
                schedule or a 1007 rent survey) and compare it against the full PITIA payment. Some
                programs apply a vacancy factor on the income side, while others bake that assumption
                into their ratio threshold. The specific methodology depends on the capital partner
                and program tier.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Can I qualify with a DSCR below 1.0x?</h3>
              <p className="text-muted-foreground mt-2">
                Yes, through no-ratio or reduced-ratio programs. These are designed for properties
                in appreciation markets or value-add plays where current rent has not yet caught up
                to the debt load. Expect tighter LTV caps (often 65-70%), higher rates, and larger
                reserve requirements -- typically 12-18 months of PITIA.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">How can I improve my DSCR before applying?</h3>
              <p className="text-muted-foreground mt-2">
                The ratio has two sides: income and debt. On the income side, you can raise rents to
                market, add units or rentable space, or switch to a short-term rental model if the
                location supports it. On the debt side, a larger down payment reduces the loan amount
                and monthly P&I. Buying down the rate or choosing an interest-only period (where
                available) also lowers the denominator.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-lg border bg-muted/50 p-6 not-prose">
            <h3 className="font-semibold text-lg mb-3">Related Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/loans/dscr-rental" className="text-primary hover:underline">
                  DSCR Rental Loan Programs
                </Link>{' '}
                <span className="text-muted-foreground">-- rates, terms, and eligibility for rental property financing</span>
              </li>
              <li>
                <Link href="/blog/what-does-dscr-mean-in-real-estate" className="text-primary hover:underline">
                  What Does DSCR Mean in Real Estate?
                </Link>{' '}
                <span className="text-muted-foreground">-- a deeper dive into how lenders evaluate rental income</span>
              </li>
              <li>
                <Link href="/blog/brrrr-exit-to-dscr-checklist" className="text-primary hover:underline">
                  BRRRR Exit to DSCR Checklist
                </Link>{' '}
                <span className="text-muted-foreground">-- step-by-step guide to refinancing a stabilized rental</span>
              </li>
              <li>
                <Link href="/blog/dscr-loan-reserves-explained" className="text-primary hover:underline">
                  DSCR Loan Reserves Explained
                </Link>{' '}
                <span className="text-muted-foreground">-- how much cash you need on hand to close</span>
              </li>
              <li>
                <Link href="/blog/short-term-rental-dscr-qualification" className="text-primary hover:underline">
                  Short-Term Rental DSCR Qualification
                </Link>{' '}
                <span className="text-muted-foreground">-- using Airbnb income to qualify for a DSCR loan</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
