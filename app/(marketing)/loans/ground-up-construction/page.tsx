import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LOAN_PRODUCTS } from '@/lib/data/loan-products';
import LoanProductPage from '@/components/seo/LoanProductPage';

const product = LOAN_PRODUCTS.find((p) => p.slug === 'ground-up-construction')!;

export const metadata: Metadata = createMetadata({
  title: 'Ground-Up Construction Financing for Investors',
  description:
    'Finance land acquisition and vertical construction for non-owner-occupied investment projects. See required plans, budget, permits, experience, and draws.',
  path: '/loans/ground-up-construction',
});

export default function GroundUpConstructionPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.title,
    description: 'Ground-up construction financing funds a new investment property from land or teardown through completion.',
    category: 'Ground-Up Construction Loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    url: 'https://www.assetliftlending.com/loans/ground-up-construction',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ground-Up Construction Financing',
    serviceType: 'Ground-up construction loan',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    areaServed: 'US',
    url: 'https://www.assetliftlending.com/loans/ground-up-construction',
    description: 'Ground-up construction financing funds a new investment property from land or teardown through completion.',
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
    name: 'Ground-Up Construction Loans | AssetLift Lending',
    url: 'https://www.assetliftlending.com/loans/ground-up-construction',
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Loans', href: '/loans' }, { label: 'Ground-Up Construction' }]} />
      </div>
      <LoanProductPage
        product={{ ...product, heroTitle: 'Ground-Up Construction Financing' }}
        directAnswer="Ground-up construction financing funds a new investment property from land or teardown through completion. Lenders review the land basis, plans, permits, line-item budget, licensed contractor, borrower experience, completed value, local demand, equity, reserves, timeline, and exit. Construction funds are generally released in verified draws, and terms depend on the project, borrower, title, valuation, and market."
        checklist={['Address or land details', 'Acquisition basis', 'Plans and permit status', 'Line-item budget', 'Licensed contractor', 'Completed-value support', 'Borrower experience', 'Equity and reserves']}
        cta={{ heading: 'Get the construction file reviewed', copy: 'Send the address or land details, acquisition basis, plans and permit status, line-item budget, contractor, completed-value support, borrower experience, equity, reserves, requested loan amount, and target closing date.', primaryLabel: 'Request Construction Terms', primaryHref: '/apply?loanPurpose=ground-up-construction&source=ground-up-construction-page', secondaryLabel: 'See the File Checklist', secondaryHref: '/blog/ground-up-construction-loan-requirements' }}
      />
    </>
  );
}
