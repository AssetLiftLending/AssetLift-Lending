import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CITIES } from '@/lib/data/cities';
import CityPage from '@/components/seo/CityPage';
import {
  findTriStateProgramPage,
  TRI_STATE_PROGRAM_PAGES,
} from '@/lib/data/tri-state-program-pages';
import TriStateProgramPage from '@/components/seo/TriStateProgramPage';
import { shouldIndexCity } from '@/lib/seo/routing-policy';

interface Props {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return [
    ...CITIES.map((c) => ({
      state: c.stateSlug,
      city: c.citySlug,
    })),
    ...TRI_STATE_PROGRAM_PAGES.map((page) => ({
      state: page.stateSlug,
      city: page.programSlug,
    })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = CITIES.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
  const programPage = findTriStateProgramPage(stateSlug, citySlug);

  if (programPage) {
    return createMetadata({
      title: programPage.title,
      description: programPage.description,
      path: `/lending/${programPage.stateSlug}/${programPage.programSlug}`,
      keywords: [
        `${programPage.stateName} ${programPage.programName}`,
        `${programPage.stateAbbreviation} ${programPage.programName}`,
        `${programPage.programName} for experienced investors`,
        'private money lender',
        'real estate investor loans',
      ],
    });
  }

  if (!city) return {};

  return createMetadata({
    title: `Hard Money Loans in ${city.cityName}, ${city.stateAbbreviation}`,
    description: `Business-purpose hard money, fix-and-flip, bridge, and DSCR rental loans for non-owner-occupied investment properties in ${city.cityName}, ${city.stateAbbreviation}.`,
    keywords: [
      `hard money lender ${city.cityName} ${city.stateAbbreviation}`,
      `fix and flip loans ${city.cityName}`,
      `DSCR loans ${city.cityName}`,
      `investment property loans ${city.cityName}`,
    ],
    path: `/lending/${city.stateSlug}/${city.citySlug}`,
    noIndex: !shouldIndexCity(city.stateSlug, city.citySlug),
  });
}

export default async function CityLendingPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const city = CITIES.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
  const programPage = findTriStateProgramPage(stateSlug, citySlug);

  if (programPage) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: `AssetLift Lending - ${programPage.stateName} ${programPage.programName}`,
      description: programPage.description,
      url: `https://www.assetliftlending.com/lending/${programPage.stateSlug}/${programPage.programSlug}`,
      areaServed: {
        '@type': 'State',
        name: programPage.stateName,
      },
      serviceType: programPage.programName,
      provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: programPage.faqs.map((f) => ({
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
              { label: programPage.stateName, href: `/lending/${programPage.stateSlug}` },
              { label: programPage.programName },
            ]}
          />
        </div>
        <TriStateProgramPage page={programPage} />
      </>
    );
  }

  if (!city) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: `AssetLift Lending - ${city.cityName}, ${city.stateAbbreviation}`,
    description: `Business-purpose investment property financing in ${city.cityName}, ${city.stateName}`,
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    url: `https://www.assetliftlending.com/lending/${city.stateSlug}/${city.citySlug}`,
    areaServed: {
      '@type': 'City',
      name: city.cityName,
      containedInPlace: {
        '@type': 'State',
        name: city.stateName,
      },
    },
    provider: { '@type': 'FinancialService', name: 'AssetLift Lending' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((f) => ({
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
            { label: city.stateName, href: `/lending/${city.stateSlug}` },
            { label: city.cityName },
          ]}
        />
      </div>
      <CityPage city={city} />
    </>
  );
}
