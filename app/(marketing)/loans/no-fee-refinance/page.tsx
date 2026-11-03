import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const PAGE_URL = 'https://www.assetliftlending.com/loans/no-fee-refinance';

const PAGE_TITLE = 'Refinance Loans With No Origination Fee | AssetLift Lending';

const PAGE_DESCRIPTION =
  'Explore rate-and-term and cash-out refinance loans with no origination, lender or title fees on eligible deals. Appraisal is not included. $300,000 standard minimum; lower loans may qualify for 0% origination.';

const INTRO =
  'AssetLift Lending reviews rate-and-term and cash-out refinance requests for real estate investors. On eligible loans, there are no origination, lender or title fees. The appraisal is not included in this offer and is a separate third-party cost. The standard minimum loan amount is $300,000. Loan amounts below $300,000 may still qualify for 0% origination. Ask AssetLift Lending to confirm whether your loan qualifies and what appraisal cost applies before proceeding.';

const PREPARE_ITEMS = [
  'Property address',
  'Current value or purchase price',
  'Current rent',
  'Taxes',
  'Insurance',
  'Association dues, if any',
  'Requested loan amount',
  'Target closing date',
];

const FAQS = [
  {
    question: 'Does this include the appraisal?',
    answer: 'No. The appraisal is a separate third-party cost.',
  },
  {
    question: 'Is $300,000 a firm minimum for 0% origination?',
    answer: 'It is the standard minimum. Lower amounts can still qualify.',
  },
  {
    question: 'Can I request rate-and-term or cash-out?',
    answer:
      'Yes. Approval and terms depend on the property, borrower and program guidelines.',
  },
];

// createMetadata trims descriptions to 158 characters. The description above is
// supplied verbatim and runs longer, and the trim would cut it mid-clause after
// "$300,000 standard" — dropping the part that says lower amounts may still
// qualify. The fee and minimum wording has to reach the reader whole, so the
// helper's structure (canonical, Open Graph, Twitter) is kept and only the
// description is restored to the exact text.
const generated = createMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/loans/no-fee-refinance',
  keywords: [
    'rate-and-term refinance',
    'cash-out refinance',
    'no origination fee refinance',
    'investment property refinance',
  ],
});

export const metadata: Metadata = {
  ...generated,
  description: PAGE_DESCRIPTION,
  openGraph: { ...generated.openGraph, description: PAGE_DESCRIPTION },
  twitter: { ...generated.twitter, description: PAGE_DESCRIPTION },
};

export default function NoFeeRefinancePage() {
  const loanSchema = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: 'Rate-and-Term and Cash-Out Refinance for Real Estate Investors',
    description: INTRO,
    category: 'Refinance',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    url: PAGE_URL,
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rate-and-Term and Cash-Out Refinance',
    serviceType: 'Refinance',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    areaServed: 'US',
    url: PAGE_URL,
    description: INTRO,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PAGE_TITLE,
    url: PAGE_URL,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '[data-speakable]', '.hero-description'],
    },
  };

  return (
    <>
      <JsonLd data={loanSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={speakableSchema} />

      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Loans', href: '/loans' },
            { label: 'Refinance' },
          ]}
        />
      </div>

      <div className="overflow-x-hidden">
        {/* Hero */}
        <section className="pt-10 pb-16 md:pt-14 md:pb-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Rate-and-Term and Cash-Out Refinance for Real Estate Investors
              </h1>
              <p className="hero-description text-lg text-muted-foreground leading-relaxed mb-8">
                {INTRO}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 glow-primary"
                >
                  <Link href="/apply?loanPurpose=refinance&source=no-fee-refinance-page">
                    Request Refinance Terms <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6"
                >
                  <a href="tel:+19296392284">Call (929) 639-2284</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Information to prepare */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h2
                data-speakable
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Information to prepare
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {PREPARE_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-card border border-border px-4 py-3"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 max-w-3xl">
            <h2
              data-speakable
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
            >
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Quote form and phone */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6 text-center">
            <h2 data-speakable className="text-3xl md:text-4xl font-bold mb-4">
              Send your refinance scenario
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Use the quote form to send the details above, or call (929) 639-2284.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 glow-primary"
              >
                <Link href="/apply?loanPurpose=refinance&source=no-fee-refinance-page">
                  Open the Quote Form <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7"
              >
                <a href="tel:+19296392284">Call (929) 639-2284</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
