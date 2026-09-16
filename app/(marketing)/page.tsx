import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Hero from "@/components/landing/Hero";
import WhyAssetLift from "@/components/landing/WhyAssetLift";
import LoanPrograms from "@/components/landing/LoanPrograms";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import MarketsPreview from "@/components/landing/MarketsPreview";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = createMetadata({
  title: "Private Real Estate Lending for Investors",
  description:
    "Private lending for real estate investors. Fix and flip, DSCR rental, bridge, and ground-up construction loans for business-purpose investment properties.",
  path: "/",
  keywords: [
    "fix and flip loans",
    "DSCR loans",
    "experienced real estate investor loans",
    "investment property loans",
    "hard money loans for flippers",
    "DSCR rental property loans",
    "fix and flip lender",
    "private lending",
    "real estate investor financing",
  ],
});

export default function HomePage() {
  const homeFaqs = [
    {
      question: "What types of properties do you lend on?",
      answer:
        "We finance non-owner occupied residential investment properties including single-family homes, 2-4 unit properties, condos, and townhomes.",
    },
    {
      question: "How quickly can you close?",
      answer:
        "Many deals can close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.",
    },
    {
      question: "What are your minimum loan requirements?",
      answer:
        "Our minimum loan amount is $100,000 and maximum is $5,000,000. We require a minimum credit score of 660 and prioritize borrowers with a clear investment property strategy, documented numbers, and a credible exit plan.",
    },
    {
      question: "What states do you lend in?",
      answer:
        "We provide financing in 46 states for qualifying real estate investment deals.",
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    description:
      'Private lending for real estate investors. Business-purpose fix and flip, DSCR rental, bridge, and ground-up construction loans from $100K to $5M, 660+ credit preferred.',
    url: 'https://www.assetliftlending.com',
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    priceRange: '$100,000 - $5,000,000',
    currenciesAccepted: 'USD',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Queens',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    founder: [
      { '@type': 'Person', name: 'Yaakov Pentelnik' },
      { '@type': 'Person', name: 'Yisroel Pentelnik' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+1-929-639-2284',
      email: 'info@assetliftlending.com',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    knowsAbout: [
      'Fix and flip loans',
      'DSCR rental loans',
      'Bridge loans',
      'Ground-up construction loans',
      'Private lending',
      'Rental property financing',
      'Real estate investor financing',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    serviceType: [
      'Fix and Flip Loans',
      'DSCR Rental Loans',
      'Bridge Loans',
      'Ground-Up Construction Loans',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Loan Programs',
      itemListElement: [
          {
            '@type': 'Offer',
            name: 'Fix & Flip Loans',
            description: 'Short-term financing for purchasing and renovating investment properties. Up to 95% LTC on the purchase, 100% of rehab funded, and closings in as fast as 5 business days subject to underwriting, valuation, title, and file complexity.',
            url: 'https://www.assetliftlending.com/loans/fix-and-flip',
          },
        {
          '@type': 'Offer',
          name: 'DSCR Rental Loans',
          description: 'Long-term financing for rental properties. Qualify primarily on property cash flow, subject to program guidelines, leverage, reserves, and underwriting.',
          url: 'https://www.assetliftlending.com/loans/dscr-rental',
        },
        {
          '@type': 'Offer',
          name: 'Bridge Loans',
          description: 'Short-term capital for acquisitions, transitions, and refinance timing gaps when speed and exit clarity matter.',
          url: 'https://www.assetliftlending.com/loans/bridge',
        },
        {
          '@type': 'Offer',
          name: 'Ground-Up Construction Loans',
          description: 'Construction financing for residential investment builds, with draw structures tied to verified progress.',
          url: 'https://www.assetliftlending.com/loans/ground-up-construction',
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
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
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <main className="pt-14">
        <Hero />
        <section className="border-y border-border bg-secondary/25 py-12">
          <div className="container grid gap-6 px-4 md:grid-cols-3 md:px-6">
            <div>
              <p className="text-sm font-semibold text-primary">Funding fit</p>
              <h2 className="mt-2 text-2xl font-bold">Terms depend on the file.</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Rates, leverage, fees, and timelines vary by borrower, credit, liquidity, experience,
              property, valuation, title, insurance, market, and exit plan.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              AssetLift provides business-purpose financing for non-owner-occupied investment
              properties. Final terms are subject to underwriting approval and transaction-specific
              disclosures.
            </p>
          </div>
        </section>
        <LoanPrograms />
        <WhyAssetLift />
        <HowItWorks />
        <MarketsPreview />
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">
                  About AssetLift
                </p>
                <h2 className="text-3xl font-bold tracking-tight">A focused private lending team for investor deals.</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  AssetLift Lending reviews fix and flip, DSCR rental, bridge, and ground-up
                  construction scenarios for real estate investors. The site preserves approved
                  licensing and funding-role language on the legal and disclosure pages.
                </p>
              </div>
            </div>
          </div>
        </section>
        <FAQ />
        <CTA />
      </main>
      <StickyMobileCTA />
    </>
  );
}
