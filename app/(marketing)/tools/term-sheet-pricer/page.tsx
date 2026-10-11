import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';
import TermSheetPricer from './TermSheetPricer';

export const metadata: Metadata = createMetadata({
  title: 'Term Sheet Pricer | Private Lending Deal Structuring Tool | AssetLift Lending',
  description:
    'Model loan proceeds, leverage caps, closing fees, and cash to close with this private lending term sheet pricer.',
  path: '/tools/term-sheet-pricer',
  noIndex: true,
});

export default function TermSheetPricerPage() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Term Sheet Pricer',
    description:
      'A private lending term sheet calculator for estimating leverage, loan amount, payment, fees, and cash to close.',
    url: 'https://www.assetliftlending.com/tools/term-sheet-pricer',
    applicationCategory: 'FinanceApplication',
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  return (
    <>
      <JsonLd data={appSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools' },
            { label: 'Term Sheet Pricer' },
          ]}
        />
      </div>
      <TermSheetPricer />
    </>
  );
}
