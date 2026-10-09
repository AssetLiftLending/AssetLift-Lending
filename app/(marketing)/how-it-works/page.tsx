import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import { ArrowRight, FileText, Search, ClipboardCheck, Banknote, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = createMetadata({
  title: 'How Our Hard Money Loans Work | AssetLift Lending',
  description:
    'See how AssetLift Lending handles hard money loan quotes, underwriting, due diligence, and closing for fix and flip, bridge, DSCR, and construction deals.',
  path: '/how-it-works',
});

export default function HowItWorksPage() {
  const steps = [
    {
      icon: FileText,
      number: '01',
      title: 'Submit Your Deal',
      description: 'Fill out our quick online form with your deal details: purchase price, rehab budget, ARV (for flips), or rental income (for DSCR). You can also call us directly or email your deal package.',
      details: [
        'Takes less than 5 minutes',
        'No application fee',
        'No obligation or credit pull at this stage',
      ],
    },
    {
      icon: Search,
      number: '02',
      title: 'Receive Your Quote',
      description: 'A loan specialist reviews your deal and gets back to you within 24 hours, usually within a few hours. This includes a soft-quote or a request for any missing items needed to move forward.',
      details: [
        'Response within 24 hours, usually within a few hours',
        'Clear breakdown of all costs',
        'Direct access to your loan specialist',
      ],
    },
    {
      icon: ClipboardCheck,
      number: '03',
      title: 'Due Diligence',
      description: 'Once you accept the quote, we order a property valuation (BPO or appraisal) and title work. You submit your entity documents, proof of insurance, and purchase contract. Our underwriting team works in parallel to keep things fast.',
      details: [
        'BPO or appraisal ordered immediately',
        'Title and insurance run concurrently',
        'We guide you through every document',
      ],
    },
    {
      icon: Banknote,
      number: '04',
      title: 'Close & Fund',
      description: 'Once underwriting is complete and title is clear, we schedule your closing. For many hard money deals, this can happen in as fast as 5 business days, subject to valuation, title, and file complexity. Funds are wired to the title company at closing.',
      details: [
        'Many files close in as fast as 5 business days',
        'Funds wired same day as closing',
        'Rehab/construction funds held in escrow for draws',
      ],
    },
  ];

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get a Hard Money Loan from AssetLift Lending',
    description:
      'Get funded in 4 simple steps: submit your deal, hear back within 24 hours, complete due diligence, and many files close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.',
    url: 'https://www.assetliftlending.com/how-it-works',
    totalTime: 'P10D',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Submit Your Deal',
        text: 'Fill out our quick online form with your deal details: purchase price, rehab budget, ARV, or rental income. No application fee, no obligation.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Receive Your Quote',
        text: 'A loan specialist reviews your deal and gets back to you within 24 hours, usually within a few hours, with a soft-quote or any follow-up items needed to proceed.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Due Diligence',
        text: 'We order a property valuation and title work. You submit entity documents, proof of insurance, and purchase contract. Underwriting works in parallel.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Close & Fund',
        text: 'Once underwriting is complete and title is clear, many files can close in as fast as 5 business days, subject to valuation, title, and file complexity. Funds are wired directly to the title company.',
      },
    ],
  };

  return (
    <>
    <JsonLd data={howToSchema} />
    <div className="pt-32 pb-20 md:pt-40">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-12">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'How It Works' }]} />
        </div>

        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            From Application to <span className="gradient-text">Funding</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process gets you from application to funded in days, not weeks. Here is exactly what to expect at every step.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto mb-20">
          {steps.map((step, i) => (
            <div key={i} className="relative pl-16 pb-16 last:pb-0">
              {/* Timeline line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
              )}

              {/* Step number circle */}
              <div className="absolute left-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Documents Needed */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Documents Typically Required</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Purchase contract or proof of ownership',
              'LLC operating agreement / articles of organization',
              'Government-issued photo ID for all guarantors',
              'Scope of work and rehab budget (fix & flip / construction)',
              'Property insurance binder',
              'Bank statements (2 months, showing reserves)',
              'Entity certification of good standing',
              'Lease agreement or rent roll (DSCR only)',
            ].map((doc, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-20 bg-card border border-border rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4">Choose the Right Loan Before You Apply</h2>
          <p className="text-muted-foreground mb-6">
            The fastest file is usually the one tied to the right loan product from the start.
            If the deal needs rehab, bridge timing, construction draws, or rental qualification,
            the application package should reflect that clearly.
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
              { label: 'Ground-Up Construction', href: '/loans/ground-up-construction' },
              { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
              { label: 'Bridge Loans', href: '/loans/bridge' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-border px-4 py-4 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Submit your deal today and hear back within 24 hours, usually within a few hours. No fees, no obligation.
          </p>
          <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary">
            <Link href="/apply">
              Apply for Funding <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
