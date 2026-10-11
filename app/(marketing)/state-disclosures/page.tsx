import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';
import { STATES } from '@/lib/data/states';

export const metadata: Metadata = createMetadata({
  title: 'State Disclosures | AssetLift Lending',
  description:
    'Review AssetLift Lending state-by-state website disclosures for business-purpose investment-property financing, coverage, and execution-model notes.',
  path: '/state-disclosures',
});

const UNSERVED_STATES = new Set(['AK', 'ND', 'SD', 'VT']);

const EXCLUDED_STATE_ROWS = [
  { name: 'Alaska', abbreviation: 'AK', slug: 'alaska' },
  { name: 'North Dakota', abbreviation: 'ND', slug: 'north-dakota' },
  { name: 'South Dakota', abbreviation: 'SD', slug: 'south-dakota' },
  { name: 'Vermont', abbreviation: 'VT', slug: 'vermont' },
];

const STATE_ROWS = [
  ...STATES,
  ...EXCLUDED_STATE_ROWS.filter(
    (excludedState) => !STATES.some((state) => state.abbreviation === excludedState.abbreviation),
  ),
]
  .map((state) => ({
  ...state,
  currentlyServed: !UNSERVED_STATES.has(state.abbreviation),
}))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function StateDisclosuresPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'State Disclosures | AssetLift Lending',
    description:
      'State-by-state website disclosure matrix for AssetLift Lending business-purpose financing programs and execution-model notes.',
    url: 'https://www.assetliftlending.com/state-disclosures',
  };

  return (
    <div className="pt-32 pb-20 md:pt-40">
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'State Disclosures' }]} />
          </div>

          <div className="max-w-4xl mb-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              State Disclosures
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              This page is a website disclosure matrix, not a substitute for legal review. It is
              meant to make the public marketing posture clearer by separating states currently
              marketed on the site from states where AssetLift does not currently advertise
              availability.
            </p>
            <p className="text-muted-foreground">
              In every state, actual licensing, lender-or-broker role, table-funding posture,
              white-label structure, and required disclosures should be confirmed against the exact
              transaction, entity, and program before advertising or closing a loan.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-10">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-2">
                Borrower Type
              </p>
              <p className="text-muted-foreground">
                Business-purpose financing for non-owner-occupied residential investment
                properties only.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-2">
                Execution Model
              </p>
              <p className="text-muted-foreground">
                Depending on the file, financing may be provided directly or through a lending
                partner.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-2">
                Compliance Note
              </p>
              <p className="text-muted-foreground">
                State-specific licensing, fee, advertising, and closing disclosures should be
                reviewed with counsel and your licensing team.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-secondary/30">
                  <tr className="text-left">
                    <th className="px-4 py-4 font-semibold text-foreground">State</th>
                    <th className="px-4 py-4 font-semibold text-foreground">Website Status</th>
                    <th className="px-4 py-4 font-semibold text-foreground">Borrower Scope</th>
                    <th className="px-4 py-4 font-semibold text-foreground">Execution Note</th>
                    <th className="px-4 py-4 font-semibold text-foreground">Disclosure Note</th>
                  </tr>
                </thead>
                <tbody>
                  {STATE_ROWS.map((state) => (
                    <tr key={state.abbreviation} className="border-t border-border align-top">
                      <td className="px-4 py-4 font-medium text-foreground">
                        {state.name} ({state.abbreviation})
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {state.currentlyServed
                          ? 'Currently marketed as an active coverage state'
                          : 'Not currently marketed as an active coverage state'}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        Business-purpose financing for non-owner-occupied investment properties
                        only.
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        Funding channel may vary by transaction, program, and borrower profile.
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        Confirm state-specific licensing, entity role, fee treatment, and required
                        disclosures before advertising or closing.
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
