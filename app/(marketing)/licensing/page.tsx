import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Licensing & Disclosures | AssetLift Lending',
  description:
    'Review AssetLift Lending licensing information, lending disclosures, compliance details, and regulatory information for investment-property loans.',
  path: '/licensing',
});

const financialServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'AssetLift Lending',
  description:
    'Hard money and private lending for real estate investors. Business-purpose bridge loans, fix-and-flip financing, DSCR rental loans, and ground-up construction lending.',
  url: 'https://www.assetliftlending.com',
  telephone: '+1-929-639-2284',
  email: 'info@assetliftlending.com',
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  serviceType: [
    'Hard Money Lending',
    'Bridge Loans',
    'Fix and Flip Financing',
    'DSCR Rental Loans',
    'Construction Lending',
    'Real Estate Investment Lending',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Queens',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
};

export default function LicensingPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40">
      <JsonLd data={financialServiceSchema} />
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Licensing & Disclosures' }]}
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Licensing & Disclosures
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Regulatory information, execution-model disclosures, and business-purpose lending details.
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            {/* Company Information */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Company Information</h2>
              <ul className="space-y-2">
                <li>
                  <strong className="text-foreground">Company:</strong> AssetLift Lending
                </li>
                <li>
                  <strong className="text-foreground">Office:</strong> Queens, NY
                </li>
                <li>
                  <strong className="text-foreground">Phone:</strong>{' '}
                  <a
                    href="tel:+19296392284"
                    className="underline hover:text-primary transition-colors"
                  >
                    +1 (929) 639-2284
                  </a>
                </li>
                <li>
                  <strong className="text-foreground">Email:</strong>{' '}
                  <a
                    href="mailto:info@assetliftlending.com"
                    className="underline hover:text-primary transition-colors"
                  >
                    info@assetliftlending.com
                  </a>
                </li>
              </ul>
            </section>

            {/* Lending Disclosures */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Lending Disclosures</h2>
              <div className="space-y-4">
                <p>
                  AssetLift Lending provides business-purpose loans for real estate investment
                  properties only. We do not provide consumer residential mortgages or
                  owner-occupied financing.
                </p>
                <p>
                  All loans are subject to underwriting approval, property valuation, title review,
                  borrower qualification, and program availability.
                </p>
                <p>
                  Interest rates, fees, terms, and leverage vary based on property type, location,
                  borrower experience, and deal structure.
                </p>
                <p>
                  Loan products described on this website are for informational purposes only and
                  do not constitute a commitment to lend.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Execution Model Disclosure</h2>
              <div className="space-y-4">
                <p>
                  AssetLift Lending may handle transactions through direct lending, brokered
                  execution, or capital-partner / third-party funding structures depending on the
                  deal, program, market, and borrower profile.
                </p>
                <p>
                  This website should not be read to mean that every transaction is funded directly
                  by AssetLift or that every program is available through the same lending channel.
                </p>
                <p>
                  If a transaction is placed with a third-party lender or capital partner, the
                  borrower may receive additional lender-specific, broker, licensing, or closing
                  disclosures as required by applicable law and the actual transaction structure.
                </p>
                <p>
                  For a plain-English explanation of how deals may be handled, review our{' '}
                  <a href="/how-funding-works" className="underline hover:text-primary transition-colors">
                    How Funding Works
                  </a>{' '}
                  page.
                </p>
              </div>
            </section>

            {/* Equal Opportunity */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Equal Opportunity Lender
              </h2>
              <div className="space-y-4">
                <p>
                  AssetLift Lending is an equal opportunity lender. We evaluate all loan requests
                  based on the merits of the deal, the property, and the borrower&apos;s
                  qualifications without regard to race, color, religion, national origin, sex,
                  familial status, disability, marital status, age, sexual orientation, gender
                  identity, or any other characteristic protected by federal, state, or local law.
                </p>
                <p>
                  We are committed to fair lending practices and compliance with all applicable
                  fair lending laws and regulations, including the Equal Credit Opportunity Act
                  (ECOA) and the Fair Housing Act.
                </p>
              </div>
            </section>

            {/* State Disclosures */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">State Disclosures</h2>
              <div className="space-y-4">
                <p>
                  AssetLift Lending operates nationwide with the exception of AK, ND, SD, and VT.
                </p>
                <p>
                  Certain loan products may not be available in all states. Contact us for
                  state-specific availability.
                </p>
                <p>
                  State-specific licensing obligations can vary depending on whether a transaction
                  is originated, brokered, table-funded, white-labeled, or otherwise executed
                  through a partner channel. If you have questions about lending activity in a
                  particular state, contact us directly before relying on any website description.
                </p>
                <p>
                  State-specific licensing and disclosure information should be reviewed and updated
                  with counsel and your licensing team based on the exact entity, role, and
                  transaction structure used in that state.
                </p>
                <p>
                  For a state-by-state website disclosure matrix, review our{' '}
                  <a href="/state-disclosures" className="underline hover:text-primary transition-colors">
                    State Disclosures
                  </a>{' '}
                  page.
                </p>
              </div>
            </section>

            {/* Complaints & Disputes */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Complaints & Disputes</h2>
              <div className="space-y-4">
                <p>
                  If you have a complaint regarding your experience with AssetLift Lending, we
                  encourage you to contact us so we can address your concern promptly.
                </p>
                <ul className="space-y-2 pl-4 list-disc">
                  <li>
                    <strong className="text-foreground">Email:</strong>{' '}
                    <a
                      href="mailto:info@assetliftlending.com"
                      className="underline hover:text-primary transition-colors"
                    >
                      info@assetliftlending.com
                    </a>
                  </li>
                  <li>
                    <strong className="text-foreground">Phone:</strong>{' '}
                    <a
                      href="tel:+19296392284"
                      className="underline hover:text-primary transition-colors"
                    >
                      +1 (929) 639-2284
                    </a>
                  </li>
                </ul>
                <p>
                  Any disputes arising from or related to the services provided by AssetLift
                  Lending shall be governed by the laws of the State of New York, without regard
                  to its conflict of laws provisions.
                </p>
              </div>
            </section>

            {/* Contact for Regulatory Inquiries */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Contact for Regulatory Inquiries
              </h2>
              <p>
                For regulatory or compliance-related questions, please contact us at{' '}
                <a
                  href="mailto:info@assetliftlending.com"
                  className="underline hover:text-primary transition-colors"
                >
                  info@assetliftlending.com
                </a>{' '}
                or call{' '}
                <a
                  href="tel:+19296392284"
                  className="underline hover:text-primary transition-colors"
                >
                  +1 (929) 639-2284
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
