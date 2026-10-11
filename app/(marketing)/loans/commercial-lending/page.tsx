import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LOAN_PRODUCTS } from '@/lib/data/loan-products';
import LoanProductPage from '@/components/seo/LoanProductPage';

const product = LOAN_PRODUCTS.find((p) => p.slug === 'commercial-lending')!;

export const metadata: Metadata = createMetadata({
  title: 'Commercial Lending | Investment Property Financing | AssetLift Lending',
  description:
    'Commercial lending for investor acquisition, refinance, bridge, mixed-use, and business-purpose real estate scenarios.',
  path: '/loans/commercial-lending',
  noIndex: true,
});

export default function CommercialLendingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.title,
    description: product.description,
    category: 'Commercial Lending',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    url: 'https://www.assetliftlending.com/loans/commercial-lending',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Commercial Lending',
    serviceType: 'Commercial real estate lending',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    areaServed: 'US',
    url: 'https://www.assetliftlending.com/loans/commercial-lending',
    description: product.description,
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

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loans', href: '/#programs' }, { label: 'Commercial Lending' }]} />
      </div>
      <LoanProductPage product={product} />
    </>
  );
}
