import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';

const title = 'Asset-Based Lending for Real Estate Investors';
const description = 'Asset-based real estate loans for non-owner-occupied investment properties. Compare fix-and-flip, bridge, DSCR rental, and ground-up construction financing from AssetLift Lending.';
const pageUrl = 'https://www.assetliftlending.com/loans/asset-based-lending';

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/loans/asset-based-lending',
  keywords: ['asset based lending', 'asset-based real estate loans', 'asset based loan companies', 'real estate investor financing'],
});

const faqs = [
  {
    question: 'What is asset-based lending for real estate investors?',
    answer: 'Asset-based lending evaluates the investment property and the plan for repayment alongside borrower qualifications. Depending on the loan, underwriting may consider current or completed value, rent, purchase price, renovation or construction costs, borrower experience, reserves, and the sale, refinance, or rental exit. It is not an automatic approval based only on collateral.',
  },
  {
    question: 'Which asset-based loan fits my project?',
    answer: 'Fix-and-flip or bridge financing may fit a property that needs work or a short-term transition; DSCR financing may fit a stabilized rental; and ground-up construction financing may fit an eligible new build. The property, project stage, borrower, requested terms, and exit plan determine which programs may fit.',
  },
  {
    question: 'Does asset-based lending mean no borrower review?',
    answer: 'No. A property-focused loan still involves underwriting. The lender may review credit, liquidity, experience, entity and title documents, property condition, valuation, insurance, project budget, and exit. Requirements and available terms vary by program and transaction.',
  },
  {
    question: 'Does AssetLift Lending lend directly?',
    answer: 'AssetLift Lending reviews investor scenarios and may structure or broker deals with capital partners. The funding source and terms depend on the transaction and available programs; the company does not guarantee approval, leverage, pricing, or closing time.',
  },
];

export default function AssetBasedLendingPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Asset-Based Real Estate Lending',
    serviceType: 'Business-purpose real estate investment property financing',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending', url: 'https://www.assetliftlending.com' },
    url: pageUrl,
    description,
    areaServed: 'United States',
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.assetliftlending.com/' },
      { '@type': 'ListItem', position: 2, name: 'Loans', item: 'https://www.assetliftlending.com/loans' },
      { '@type': 'ListItem', position: 3, name: 'Asset-Based Lending', item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loans', href: '/loans' }, { label: 'Asset-Based Lending' }]} />
      </div>
      <main className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <article className="max-w-4xl mx-auto">
            <header className="max-w-3xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Real estate investor financing</p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Asset-Based Lending for Real Estate Investors</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">Asset-based real estate lending evaluates the property, project economics, and repayment plan alongside the borrower. AssetLift Lending reviews business-purpose, non-owner-occupied investment-property scenarios and matches them to available fix-and-flip, bridge, DSCR rental, or ground-up construction programs. Approval and terms depend on underwriting and the specific transaction.</p>
            </header>

            <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-12" aria-labelledby="quick-answer">
              <h2 id="quick-answer" className="text-xl font-bold mb-3">Quick answer: how asset-based real estate loans work</h2>
              <p className="leading-relaxed">The lender assesses the real estate and the plan to repay the loan. Depending on the program, that can include the property's current or completed value, rent, purchase price, rehab or construction budget, borrower experience, available reserves, and exit strategy. Collateral matters, but it does not replace underwriting of the borrower, project, title, and repayment plan.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Choose financing for the property's stage</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-border rounded-xl p-5"><h3 className="font-bold mb-2">Fix-and-flip loans</h3><p className="text-muted-foreground mb-3">For eligible acquisitions and renovations where the borrower has a defined scope, budget, and resale or refinance exit.</p><Link className="text-primary underline" href="/loans/fix-and-flip">Explore fix-and-flip loans</Link></div>
                <div className="border border-border rounded-xl p-5"><h3 className="font-bold mb-2">Bridge loans</h3><p className="text-muted-foreground mb-3">Short-term capital for eligible acquisitions, transitions, or projects before stabilization or a longer-term financing step.</p><Link className="text-primary underline" href="/loans/bridge">Explore bridge loans</Link></div>
                <div className="border border-border rounded-xl p-5"><h3 className="font-bold mb-2">DSCR rental loans</h3><p className="text-muted-foreground mb-3">For eligible non-owner-occupied rentals, with property income and debt-service coverage central to the review.</p><Link className="text-primary underline" href="/loans/dscr-rental">Explore DSCR rental loans</Link></div>
                <div className="border border-border rounded-xl p-5"><h3 className="font-bold mb-2">Ground-up construction</h3><p className="text-muted-foreground mb-3">For eligible new builds with plans, budget, contractor and draw details, and a credible completed-project exit.</p><Link className="text-primary underline" href="/loans/ground-up-construction">Explore construction loans</Link></div>
              </div>
            </section>

            <section className="space-y-4 mb-12">
              <h2 className="text-2xl font-bold">What lenders may review</h2>
              <p className="text-muted-foreground leading-relaxed">The exact checklist varies by program. Be prepared to explain the property and intended use, requested amount and timing, purchase price or current value, rent or after-repair value support, rehab or construction scope and budget, borrower and entity experience, reserves, title and insurance, and the expected sale, refinance, or rental exit. A complete, supportable deal file helps lenders assess fit; it does not guarantee approval or a particular timeline.</p>
              <p className="text-muted-foreground leading-relaxed">Asset-based does not mean asset-only: credit, liquidity, experience, property condition, market evidence, and the borrower's capacity to execute can all matter. Rates, fees, leverage, recourse, and closing time vary by lender and transaction.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-5">Common questions</h2>
              <div className="space-y-5">{faqs.map((faq) => <div key={faq.question} className="border border-border rounded-xl p-5"><h3 className="font-semibold mb-2">{faq.question}</h3><p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p></div>)}</div>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-3">Discuss an investment-property scenario</h2>
              <p className="text-muted-foreground mb-5">Share the property location, purchase price or value, requested amount, project budget, rent or exit plan, and target timing. AssetLift Lending can review the scenario across available capital sources. No approval or terms are guaranteed.</p>
              <div className="flex flex-wrap gap-4"><Link href="/apply?source=asset-based-lending" className="inline-flex items-center bg-primary text-zinc-900 font-bold px-6 py-3 rounded-xl">Submit a deal for review</Link><a href="tel:9296392284" className="inline-flex items-center border border-border px-6 py-3 rounded-xl">Call (929) 639-2284</a></div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
