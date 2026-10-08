import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FAQ_CATEGORIES, ALL_FAQS } from '@/lib/data/faq-expanded';
import FAQAccordion from './FAQAccordion';

function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const metadata: Metadata = createMetadata({
  title: 'Hard Money Loan FAQ | DSCR, Bridge & Fix and Flip',
  description:
    'Get answers about hard money loans, fix and flip financing, DSCR rental loans, bridge loans, rates, requirements, closings, and underwriting.',
  path: '/faq',
});

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
          </div>

          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Hard Money Loan <span className="gradient-text">FAQ</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Direct answers on hard money loans, fix and flip financing, DSCR rental loans,
              bridge loans, qualifications, pricing, and what to expect before closing.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-3">Browse By Topic</h2>
              <p className="text-muted-foreground mb-6">
                Start with the lending topic that matches your deal stage, then move into the
                related product page or calculator for specifics.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {FAQ_CATEGORIES.map((category) => (
                  <a
                    key={category.category}
                    href={`#${slugifyCategory(category.category)}`}
                    className="rounded-lg border border-border px-4 py-4 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <p className="font-medium mb-1">{category.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {category.items.length} answers
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="max-w-3xl mx-auto mb-16">
            <FAQAccordion categories={FAQ_CATEGORIES} />
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: 'Fix & Flip Loans',
                  href: '/loans/fix-and-flip',
                  description: 'Program details, leverage, rehab draws, and loan requirements.',
                },
                {
                  label: 'DSCR Rental Loans',
                  href: '/loans/dscr-rental',
                  description: 'Qualification rules, DSCR underwriting, and long-term rental options.',
                },
                {
                  label: 'Bridge Loans',
                  href: '/loans/bridge',
                  description: 'Short-term capital for fast closings, payoffs, and transitional assets.',
                },
                {
                  label: 'How Funding Works',
                  href: '/how-funding-works',
                  description: 'See how AssetLift funds loans with its own capital and with capital partners.',
                },
              ].map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <p className="font-semibold mb-2">{resource.label}</p>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our loan specialists are happy to answer any questions. Call, email, or submit a deal for a personalized response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="glow-primary">
                <Link href="/apply">
                  Apply for Funding <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+19296392284">Call (929) 639-2284</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
