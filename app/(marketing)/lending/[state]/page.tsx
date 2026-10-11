import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { STATES } from '@/lib/data/states';
import LocationPage from '@/components/seo/LocationPage';
import { shouldIndexState } from '@/lib/seo/routing-policy';

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = STATES.find((s) => s.slug === slug);
  if (!state) return {};
  return createMetadata({
    title: `Hard Money Loans in ${state.name}`,
    description: state.metaDescription ?? `Hard money loans in ${state.name}. Fix & flip, bridge, DSCR, and construction financing. Close in as fast as 5 business days.`,
    path: `/lending/${state.slug}`,
    noIndex: !shouldIndexState(state.slug),
  });
}

export default async function StateLendingPage({ params }: Props) {
  const { state: slug } = await params;
  const state = STATES.find((s) => s.slug === slug);
  if (!state) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `AssetLift Lending - ${state.name}`,
    description: `Hard money loans and private lending in ${state.name}`,
    url: `https://www.assetliftlending.com/lending/${state.slug}`,
    areaServed: {
      '@type': 'State',
      name: state.name,
      containedInPlace: { '@type': 'Country', name: 'United States' },
    },
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: state.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Markets', href: '/markets' },
            { label: state.name },
          ]}
        />
      </div>
      <LocationPage state={state} />
    </>
  );
}
