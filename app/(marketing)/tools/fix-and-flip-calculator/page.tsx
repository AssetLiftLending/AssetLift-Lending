import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import FlipCalculator from './FlipCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Fix and Flip Loan Calculator | Costs & Profit',
  description:
    'Calculate purchase, rehab, financing, holding, selling costs, and projected flip profit. Review the deal, then request fix-and-flip loan terms.',
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
            This calculator models the full cost structure of a house flip so you can see whether
            the projected spread justifies the risk before you submit an offer. Enter the purchase
            price, renovation budget, and after-repair value (ARV), then adjust your hold period,
            interest rate, closing costs, and selling costs. The tool outputs your total project
            cost, estimated profit, and cash-on-cash return -- the three numbers that determine
            whether a deal is worth pursuing.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The goal is not to produce a perfect prediction. Rehab timelines slip, material costs
            shift, and resale markets move. The goal is to stress-test your assumptions before
            capital is committed. If a deal only works when every variable breaks your way, it
            is not a deal -- it is a bet.
          </p>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            Key Terms Defined
          </h2>
          <div className="grid gap-4 not-prose">
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">ARV (After-Repair Value)</p>
              <p className="text-sm text-muted-foreground mt-1">
                The estimated market value of the property after renovations are complete. Lenders
                and investors base this on sold comparable properties in the area with similar
                square footage, condition, and finish level. Your ARV assumption is the single
                biggest driver of projected profit -- and the easiest number to get wrong.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">LTV (Loan-to-Value) and LTC (Loan-to-Cost)</p>
              <p className="text-sm text-muted-foreground mt-1">
                LTV compares the loan amount to the property value, while LTC compares it to total
                project cost (purchase price plus rehab). Fix-and-flip lenders typically cap at
                85-90% of purchase price and 100% of rehab, with a combined limit of 70-75% of ARV.
                Understanding both ratios tells you how much cash you need to bring.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">Holding Costs</p>
              <p className="text-sm text-muted-foreground mt-1">
                The monthly expenses incurred while you own the property -- loan interest, taxes,
                insurance, utilities, and any HOA dues. On a $300,000 loan at 10% interest-only,
                holding costs run roughly $2,500 per month in interest alone before taxes and
                insurance. Every month of delay erodes profit directly.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">Rehab Draw Schedule</p>
              <p className="text-sm text-muted-foreground mt-1">
                Most fix-and-flip lenders release renovation funds in stages (draws) as work is
                completed and inspected. You typically fund work upfront and get reimbursed after
                a draw inspection. Budget for the cash flow gap between spending and reimbursement.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-semibold">Selling Costs</p>
              <p className="text-sm text-muted-foreground mt-1">
                Agent commissions, transfer taxes, title fees, seller concessions, and closing costs
                on the sale side. A realistic estimate is 7-9% of the sale price in most markets.
                New investors often underwrite this at 5-6% and get surprised at the closing table.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight mt-12 mb-6">
            Worked Example: Evaluating a Fix and Flip
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Suppose you find a three-bedroom ranch listed at $210,000 in a neighborhood where
            renovated comps sell for $320,000. The property needs a full kitchen and bath remodel,
            new flooring, paint, and landscaping. Here is how the numbers break down:
          </p>
          <div className="rounded-lg border bg-card p-5 my-4 not-prose">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="font-medium text-foreground">Purchase Price:</span> $210,000</li>
              <li><span className="font-medium text-foreground">Rehab Budget:</span> $55,000</li>
              <li><span className="font-medium text-foreground">Closing Costs (purchase):</span> $6,300 (3%)</li>
              <li className="pt-2 border-t"><span className="font-medium text-foreground">Loan Amount:</span> $178,500 (85% of purchase) + $55,000 rehab = $233,500 total</li>
              <li><span className="font-medium text-foreground">Interest (10%, 6 months):</span> ~$11,675</li>
              <li><span className="font-medium text-foreground">Taxes + Insurance (6 months):</span> ~$2,400</li>
              <li><span className="font-medium text-foreground">Utilities (6 months):</span> ~$1,200</li>
              <li className="pt-2 border-t"><span className="font-medium text-foreground">Total Project Cost:</span> ~$286,575</li>
              <li><span className="font-medium text-foreground">ARV (sale price):</span> $320,000</li>
              <li><span className="font-medium text-foreground">Selling Costs (8%):</span> -$25,600</li>
              <li className="pt-2 border-t"><span className="font-medium text-foreground">Gross Profit:</span> $320,000 - $286,575 - $25,600 = <strong className="text-foreground">$7,825</strong></li>
              <li><span className="font-medium text-foreground">Cash Out of Pocket:</span> ~$48,175 (down payment + closing + draw float)</li>
              <li><span className="font-medium text-foreground">Cash-on-Cash ROI:</span> ~16%</li>
            </ul>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            At first glance, $7,825 in profit on a six-month project looks thin -- and it is.
            If rehab runs $10,000 over budget or the hold extends to nine months, this deal
            loses money. A stronger version of this project would need either a lower acquisition
            basis (offer $185,000), a tighter rehab scope, or stronger ARV support. That is
            exactly why you run the calculator before making the offer, not after.
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
                There is no universal rule, but experienced investors typically want to see at least
                $25,000-$30,000 in projected profit on a standard residential flip, with enough
                buffer to absorb a 10-15% rehab overrun and a one- to two-month timeline extension
                without going negative. If the projected margin is under $15,000, the risk-to-reward
                ratio rarely makes sense unless you are doing the work yourself and have deep local
                comp knowledge.
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
                The most common blind spots are: holding costs during the listing period (the clock
                does not stop when rehab ends), draw delays that create cash flow gaps, builder&apos;s
                risk insurance premiums, utility costs during renovation, permit and inspection fees,
                seller concessions to buyers, and the cost of price reductions if the property sits
                on the market longer than expected. Build a 10-15% contingency into both your rehab
                budget and your timeline.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">How much of my own cash do I need for a flip?</h3>
              <p className="text-muted-foreground mt-2">
                Plan for 10-15% of the purchase price as a down payment, plus closing costs (2-4%
                of the loan amount), plus enough liquidity to cover draw float and holding costs
                during renovation. On a $250,000 purchase with a $60,000 rehab, budget roughly
                $45,000-$65,000 in total cash needed. Some programs offer higher leverage for
                experienced investors with a track record of completed projects.
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
