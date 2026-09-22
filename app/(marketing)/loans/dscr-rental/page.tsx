import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LOAN_PRODUCTS } from '@/lib/data/loan-products';
import LoanProductPage from '@/components/seo/LoanProductPage';

const product = LOAN_PRODUCTS.find((p) => p.slug === 'dscr-rental')!;

export const metadata: Metadata = createMetadata({
  title: 'DSCR Loan for Rental Property',
  description:
    'Finance a non-owner-occupied rental using property cash flow instead of W-2 income. Calculate DSCR, see what lenders review, and request rental loan terms.',
  path: '/loans/dscr-rental',
  keywords: [
    'DSCR loans',
    'DSCR rental loans',
    'DSCR loan lender',
    'rental property loans',
    'no tax return rental loan',
    'cash-out DSCR refinance',
  ],
});

export default function DSCRRentalPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.title,
    description: "A DSCR loan finances a non-owner-occupied rental property using the property's rent to measure repayment ability instead of relying mainly on the borrower's W-2 income.",
    category: 'DSCR Rental Loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    url: 'https://www.assetliftlending.com/loans/dscr-rental',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'DSCR Rental Financing',
    serviceType: 'DSCR rental loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    areaServed: 'US',
    url: 'https://www.assetliftlending.com/loans/dscr-rental',
    description: "A DSCR loan finances a non-owner-occupied rental property using the property's rent to measure repayment ability instead of relying mainly on the borrower's W-2 income.",
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'DSCR Rental Loans | AssetLift Lending',
    url: 'https://www.assetliftlending.com/loans/dscr-rental',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '[data-speakable]', '.hero-description'],
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={speakableSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loans', href: '/loans' }, { label: 'DSCR Rental' }]} />
      </div>
      <LoanProductPage
        product={{ ...product, heroTitle: 'DSCR Loans for Rental Properties' }}
        directAnswer="A DSCR loan finances a non-owner-occupied rental property using the property's rent to measure repayment ability instead of relying mainly on the borrower's W-2 income. Lenders review rent, principal and interest, property taxes, insurance, HOA dues, value, credit, reserves, and property condition before setting leverage, rate, and required DSCR."
        cta={{ heading: 'Check this rental property', copy: 'Send the property address, purchase price or value, monthly rent, taxes, insurance, HOA dues, requested loan amount, and target closing date. AssetLift will review the scenario across available DSCR programs.', primaryLabel: 'Request DSCR Terms', primaryHref: '/apply?loanPurpose=dscr&source=dscr-rental-page', secondaryLabel: 'Calculate DSCR First', secondaryHref: '/tools/dscr-calculator' }}
      />
    </>
  );
}
