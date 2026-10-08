import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'How Funding Works | AssetLift Lending',
  description:
    'Learn how AssetLift Lending funds business-purpose real estate investment loans with its own capital and its capital partners.',
  path: '/how-funding-works',
});

export default function HowFundingWorksPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How Funding Works at AssetLift Lending',
    description:
      'Disclosure page explaining how AssetLift funds loans with its own capital and with capital partners.',
    url: 'https://www.assetliftlending.com/how-funding-works',
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto mb-10">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'How Funding Works' }]} />
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              How Funding Works
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              AssetLift works with real estate investors on business-purpose loans for non-owner-occupied
              investment properties. Depending on the deal, program, market, and borrower profile,
              a transaction may be funded with AssetLift's own capital or with the backing of one of
              our capital partners.
            </p>

            <div className="space-y-10 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Plain-English Summary</h2>
                <div className="space-y-4">
                  <p>
                    AssetLift is a private lender. We fund loans, and some of them are funded with the
                    backing of our capital partners. The lender of record and the funding source for
                    your loan are identified in your loan documents.
                  </p>
                  <p>
                    What stays consistent is the borrower experience: one team reviewing the file,
                    communicating what is realistic, and helping move the transaction toward the most
                    workable execution path available.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">How a Deal May Be Funded</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Direct Lending',
                      text: 'In some cases, AssetLift funds the transaction directly from its own capital.',
                    },
                    {
                      title: 'Capital Partner Funding',
                      text: 'In some cases, AssetLift funds the transaction with the backing of a capital partner, with AssetLift managing the file from application to payoff.',
                    },
                    {
                      title: 'Blended Funding',
                      text: 'In some cases, a transaction is funded using a combination of AssetLift capital and partner capital, depending on the file.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                      <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">What Borrowers Should Expect</h2>
                <div className="space-y-3">
                  {[
                    'Loan terms, rates, fees, and timelines depend on the actual execution path, underwriting decision, property, and borrower profile.',
                    'Not every program is available in every state, and not every file qualifies for the same funding source.',
                    'Nothing on this website is a commitment to lend or a promise of approval.',
                    'Where required by law, applicable lender, licensing, and closing disclosures should be reviewed carefully before proceeding.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-3">Why We Explain This Publicly</h2>
                <div className="space-y-4">
                  <p>
                    Borrowers should be able to understand who funds their loan. The point of this
                    page is to make that visible and reduce ambiguity in advertising and website copy.
                  </p>
                  <p>
                    If you have questions about how a specific transaction would be handled, contact
                    us before you rely on any rate, term, or timeline shown elsewhere on the site.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-3">Related Disclosures</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: 'Licensing & Disclosures', href: '/licensing' },
                    { label: 'Terms of Service', href: '/terms' },
                    { label: 'Contact AssetLift', href: '/contact' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl border border-border bg-card px-4 py-4 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </section>

              <div className="text-center pt-4">
                <Button asChild size="lg" className="glow-primary">
                  <Link href="/apply">
                    Submit a Deal <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
