import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import FlipCalculator from './FlipCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Fix and Flip Calculator | Rehab Costs, Profit & MAO',
  description:
    'Free fix and flip calculator: purchase, rehab, financing, holding, and selling costs, plus projected profit and max allowable offer. Then request loan terms.',
  path: '/tools/fix-and-flip-calculator',
});

export default function FixAndFlipCalculatorPage() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fix & Flip Calculator',
    description:
      'Estimate your fix and flip project profitability including acquisition, renovation, holding costs, and projected return.',
    url: 'https://www.assetliftlending.com/tools/fix-and-flip-calculator',
    applicationCategory: 'FinanceApplication',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to use the AssetLift fix and flip calculator',
    description:
      'Model a fix and flip deal by entering purchase price, rehab budget, after-repair value, hold period, and project cost assumptions.',
    url: 'https://www.assetliftlending.com/tools/fix-and-flip-calculator',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter acquisition numbers',
        text: 'Add the purchase price, renovation budget, and after-repair value for the property you are analyzing.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set your cost assumptions',
        text: 'Adjust the hold period, interest rate, closing costs, and selling costs to match the real project.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Review projected profit',
        text: 'Use the estimated profit, all-in cost, and cash-on-cash ROI output to decide whether the spread is strong enough.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What profit margin should a house flip target?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most investors want enough projected spread to absorb rehab overruns, carry extensions, and sales friction. The right target depends on market speed, renovation risk, and experience level, but thin projected margins usually become thinner in real execution.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use gross profit or cash-on-cash return to evaluate a flip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use both. Gross profit shows the raw dollar spread, while cash-on-cash ROI helps you compare how efficiently your own capital is being used.',
        },
      },
      {
        '@type': 'Question',
        name: 'What costs do new flippers usually miss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'New investors often underwrite insurance, holding time, utilities, draw delays, price reductions, and selling costs too aggressively. A useful calculator should force those assumptions into the deal before you submit an offer.',
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
            { label: 'Fix & Flip Calculator' },
          ]}
        />
      </div>
      <FlipCalculator />

      {/* Educational content */}
      <section className="container px-4 md:px-6 py-16 max-w-4xl mx-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            What This Fix and Flip Calculator Does
          </h2>
          <div className="mb-6 flex flex-wrap gap-3 text-sm">{[['Fix & Flip Loans','/loans/fix-and-flip'],['Calculate ARV','/blog/how-to-calculate-after-repair-value'],['Rehab draw process','/blog/fix-and-flip-loan-rehab-draw-process'],['Loan requirements','/blog/fix-and-flip-loan-requirements'],['Deal checklist','/resources/fix-and-flip-deal-checklist'],['Borrower package','/resources/fix-and-flip-borrower-package']].map(([label,href]) => <Link key={href} href={href} className="rounded-full border border-border px-3 py-2 hover:border-primary/50">{label}</Link>)}</div>
          <p className="text-muted-foreground leading-relaxed">
            This calculator estimates a flip's project cost and profit from purchase price, rehab
            budget, after-repair value (ARV), financing rate, hold period, purchase closing costs,
            and sale costs. It uses fixed calculation assumptions described below. The output is a
            scenario estimate, not a lender quote, loan approval, tax calculation, or guarantee of
            the final return. Add costs the model does not include before deciding whether a deal works.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The goal is not to produce a perfect prediction. Rehab timelines slip, material costs
            shift, and resale markets move. The goal is to stress-test your assumptions before
            capital is committed. If a deal only works when every variable breaks your way, it
            is not a deal -- it is a bet.
          </p>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            What the model includes and leaves out
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The calculator models purchase price plus rehab as investment, purchase closing costs,
            interest on a fixed 95% purchase advance for the entered months, and the entered sale-cost
            percentage. It assumes rehab funding is available as part of the project but does not model
            draw timing or draw fees. It does not include taxes, insurance, utilities, permits, appraisal,
            title, lender points or other fees, reserves, contingency, or every source of cash. ROI uses
            the modeled 5% purchase down payment, rehab budget, and purchase closing costs as its cash
            denominator. Replace the illustrative inputs with deal-specific quotes and amounts; check
            that the model fits the actual written financing terms.
          </p>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            Key Terms Defined
          </h2>
          <div className="grid gap-4 not-prose">
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">ARV (After-Repair Value)</p>
              <p className="text-sm text-muted-foreground mt-1">
                The estimated resale value after the planned work. Support it with recent closed sales
                in the same neighborhood that match property type, size, unit count, condition, and
                finish level. A citywide median or listing price is not a substitute for subject-level
                comparable sales; appraised value and realized sale price can differ.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">LTV (Loan-to-Value) and LTC (Loan-to-Cost)</p>
              <p className="text-sm text-muted-foreground mt-1">
                LTV compares the loan amount to a property's value; LTC compares a loan with eligible
                project cost. Lender definitions, eligible costs, leverage limits, and ARV caps vary by
                program and file. This calculator does not determine a lender's maximum advance or
                cash-to-close amount; use the written term sheet and closing figures.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">Holding Costs</p>
              <p className="text-sm text-muted-foreground mt-1">
                Recurring project expenses during acquisition, rehab, and sale, which may include
                interest, property taxes, insurance, utilities, maintenance, HOA dues, and other costs.
                This calculator estimates interest from the entered purchase-financing assumption,
                rate, and months; it does not include every carrying expense. Add local amounts and
                test a longer hold before relying on the margin.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">Rehab Draw Schedule</p>
              <p className="text-sm text-muted-foreground mt-1">
                Most fix-and-flip lenders release renovation funds in stages (draws) as work is
                completed and inspected. Payment order, draw inspections, fees, timing, and borrower
                cash-flow requirements vary by program. Confirm the current written draw terms before
                relying on rehab advances.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">Selling Costs</p>
              <p className="text-sm text-muted-foreground mt-1">
                Sale-side costs may include brokerage compensation, transfer or recording taxes,
                title and settlement fees, concessions, and other transaction-specific charges. They
                vary by state, municipality, contract, and deal structure. Replace the default with
                quotes or estimates specific to the property; this input is not a universal range.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            Worked Example: Evaluating a Fix and Flip
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Hypothetical inputs: a $210,000 purchase, $55,000 rehab, $320,000 ARV, six-month hold,
            10% rate, 3% purchase costs, and 8% sale costs. The figures below apply this page's
            simplified model only; they are not market comps, lender terms, or a deal recommendation.
          </p>
          <div className="rounded-lg border bg-card p-5 my-4 not-prose">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="font-medium text-foreground">Purchase Price:</span> $210,000</li>
              <li><span className="font-medium text-foreground">Rehab Budget:</span> $55,000</li>
              <li><span className="font-medium text-foreground">Closing Costs (purchase):</span> $6,300 (3%)</li>
              <li className="pt-2 border-t"><span className="font-medium text-foreground">Modeled purchase advance:</span> $199,500 (95% of purchase; simplified tool assumption)</li>
              <li><span className="font-medium text-foreground">Interest (10%, 6 months):</span> ~$9,975</li>
              <li className="pt-2 border-t"><span className="font-medium text-foreground">Modeled project cost before sale costs:</span> $210,000 + $55,000 + $6,300 + $9,975 = $281,275</li>
              <li><span className="font-medium text-foreground">ARV (sale price):</span> $320,000</li>
              <li><span className="font-medium text-foreground">Selling Costs (8%):</span> -$25,600</li>
              <li className="pt-2 border-t"><span className="font-medium text-foreground">Modeled profit after sale costs:</span> $320,000 - $281,275 - $25,600 = <strong className="text-foreground">$13,125</strong></li>
              <li><span className="font-medium text-foreground">Modeled cash investment for ROI:</span> $10,500 down payment + $55,000 rehab + $6,300 closing costs = $71,800</li>
              <li><span className="font-medium text-foreground">Modeled ROI:</span> $13,125 / $71,800 = ~18.3%</li>
            </ul>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This is an illustrative model, not a quote or prediction. Change the hold, rate, sale-cost,
            tax, insurance, utility, and contingency assumptions to fit a specific property. The
            displayed cash-on-cash figure also depends on the calculator's assumed purchase financing
            and does not include every source and use of cash. Confirm the inputs, include missing costs,
            and get actual lender/title/contractor estimates before submitting an offer.
          </p>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            When to Use Fix and Flip Financing
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Fix-and-flip loans are short-term, interest-only financing designed for properties
            that will be renovated and resold within 6 to 18 months. They are the right tool
            in specific situations:
          </p>
          <ul className="text-muted-foreground space-y-2 ml-4 list-disc">
            <li>
              <strong className="text-foreground">Distressed acquisitions</strong> -- properties
              purchased below market value that need renovation before they can be resold or
              refinanced. Conventional lenders will not finance these.
            </li>
            <li>
              <strong className="text-foreground">Speed-to-close deals</strong> -- foreclosures,
              estate sales, and off-market opportunities where the seller needs to close in 10-21
              days. Fix-and-flip lenders are built for fast closings.
            </li>
            <li>
              <strong className="text-foreground">Scaling beyond personal capital</strong> -- leveraging
              a lender&apos;s capital for both the acquisition and the rehab lets you run multiple
              projects simultaneously instead of tying up all your cash in one property.
            </li>
            <li>
              <strong className="text-foreground">BRRRR strategy front-end</strong> -- buy distressed,
              renovate, rent, then refinance into a long-term DSCR loan. The flip loan covers the
              acquisition and rehab phase before you stabilize the asset.
            </li>
            <li>
              <strong className="text-foreground">Auction and wholesale purchases</strong> -- when you
              need proof of funds and fast execution, a pre-approved fix-and-flip line gives you
              the ability to move on tight timelines.
            </li>
          </ul>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 not-prose">
            <div>
              <h3 className="font-semibold text-lg">What profit margin should a house flip target?</h3>
              <p className="text-muted-foreground mt-2">
                There is no universal profit target. The required cushion depends on property price,
                project size, local sale liquidity, renovation scope, leverage, hold time, and your
                reserves. Stress-test a larger rehab budget, longer hold, lower sale price, and higher
                costs; the calculator cannot decide whether the risk fits your situation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Should I use gross profit or cash-on-cash return to evaluate a flip?</h3>
              <p className="text-muted-foreground mt-2">
                Use both. Gross profit tells you the raw dollar spread -- what you actually take
                home. Cash-on-cash ROI tells you how efficiently your own capital is working. A
                $40,000 profit on $80,000 of your own cash (50% ROI) is a different decision than
                $40,000 profit on $200,000 of your own cash (20% ROI). If you can achieve similar
                gross profit with less cash out of pocket by using leverage, your capital goes further.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">What costs do new flippers usually miss?</h3>
              <p className="text-muted-foreground mt-2">
                Items omitted or understated often include taxes, insurance, utilities, permits,
                inspection fees, lender and draw charges, contingency, price reductions, concessions,
                and carrying costs after rehab while the property is listed. Check local quotes and
                project details; there is no one percentage that fits every scope or market.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">How much of my own cash do I need for a flip?</h3>
              <p className="text-muted-foreground mt-2">
                Cash required depends on the purchase advance, eligible rehab draws, closing and third-
                party costs, initial reserves, and whether you must pay for work before reimbursement.
                Use a written term sheet and settlement estimate for a real deal; this calculator's
                modeled ROI denominator is not a complete cash-to-close estimate.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-lg border bg-muted/50 p-6 not-prose">
            <h3 className="font-semibold text-lg mb-3">Related Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/loans/fix-and-flip" className="text-primary hover:underline">
                  Fix and Flip Loan Programs
                </Link>{' '}
                <span className="text-muted-foreground">-- rates, leverage, and draw structure for renovation projects</span>
              </li>
              <li>
                <Link href="/blog/how-fix-and-flip-draws-work" className="text-primary hover:underline">
                  How Fix and Flip Draws Work
                </Link>{' '}
                <span className="text-muted-foreground">-- understanding the draw process and inspection requirements</span>
              </li>
              <li>
                <Link href="/blog/how-experienced-flippers-package-deals-for-fast-approval" className="text-primary hover:underline">
                  Experienced Flipper Loan File Checklist
                </Link>{' '}
                <span className="text-muted-foreground">-- what to package before asking for fast approval</span>
              </li>
              <li>
                <Link href="/blog/fix-and-flip-budget-template-guide" className="text-primary hover:underline">
                  Fix and Flip Budget Template Guide
                </Link>{' '}
                <span className="text-muted-foreground">-- line-item budgeting for rehab projects</span>
              </li>
              <li>
                <Link href="/blog/cash-out-dscr-refinance-after-a-flip" className="text-primary hover:underline">
                  Cash-Out DSCR Refinance After a Flip
                </Link>{' '}
                <span className="text-muted-foreground">-- converting a completed flip into a long-term rental hold</span>
              </li>
              <li>
                <Link href="/resources/fix-and-flip-deal-checklist" className="text-primary hover:underline">
                  Fix and Flip Deal Checklist
                </Link>{' '}
                <span className="text-muted-foreground">-- pre-application review for leverage, budget, and exit strategy</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
