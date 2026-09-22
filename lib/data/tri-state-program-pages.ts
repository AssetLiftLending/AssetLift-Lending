export type TriStateProgramSlug = 'fix-and-flip-loans' | 'dscr-loans';

export interface TriStateProgramPage {
  stateSlug: 'new-york' | 'new-jersey' | 'connecticut';
  stateName: string;
  stateAbbreviation: string;
  programSlug: TriStateProgramSlug;
  programName: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  markets: string[];
  fit: string[];
  localNotes: string[];
  whatToPrepare: string[];
  faqs: Array<{ question: string; answer: string }>;
}

const sharedQualification = [
  'Business-purpose loans for non-owner-occupied investment properties only',
  '$100K minimum loan size',
  '660+ credit preferred',
  'Best fit for experienced operators with a clear exit plan',
];

export const TRI_STATE_PROGRAM_PAGES: TriStateProgramPage[] = [
  {
    stateSlug: 'new-york',
    stateName: 'New York',
    stateAbbreviation: 'NY',
    programSlug: 'fix-and-flip-loans',
    programName: 'Fix & Flip Loans',
    title: 'New York Fix & Flip Loans | Hard Money Lender NY',
    description:
      'New York fix and flip loans from a hard money lender focused on experienced investors. Fund acquisition and rehab on non-owner-occupied properties.',
    h1: 'New York Fix & Flip Loans for Experienced Investors',
    intro:
      'AssetLift helps New York real estate investors finance acquisition and rehab projects when the numbers, scope, and exit plan are ready for underwriting. We focus on experienced flippers working non-owner-occupied investment properties, not consumer or owner-occupied requests.',
    markets: ['New York City', 'Long Island', 'Westchester', 'Hudson Valley', 'Buffalo', 'Rochester', 'Syracuse'],
    fit: [
      ...sharedQualification,
      'Purchase plus renovation files with a realistic ARV',
      'Rehab scope, contractor plan, and resale timeline already mapped out',
    ],
    localNotes: [
      'Downstate files usually need stronger liquidity because taxes, insurance, and carrying costs can move quickly.',
      'Long Island and Westchester deals should be supported by tight resale comps, not broad county averages.',
      'Upstate projects can work well when the borrower keeps the rehab scope matched to local buyer demand.',
    ],
    whatToPrepare: [
      'Purchase contract or target acquisition price',
      'Rehab budget and scope of work',
      'ARV support from recent comparable sales',
      'Timeline for renovation, resale, and payoff',
    ],
    faqs: [
      {
        question: 'Do you fund fix and flip loans in New York?',
        answer:
          'Yes. AssetLift reviews New York fix and flip scenarios for non-owner-occupied investment properties, with a focus on experienced borrowers and $100K+ loan requests.',
      },
      {
        question: 'What makes a New York flip file stronger?',
        answer:
          'Strong files usually include recent local comps, a realistic rehab budget, borrower experience, enough reserves for carrying costs, and a clear resale or refinance exit.',
      },
      {
        question: 'Can I call before submitting the full file?',
        answer:
          'Yes. If the deal is active, call (929) 639-2284 or upload the scenario so the team can review the address, basis, scope, and timeline.',
      },
    ],
  },
  {
    stateSlug: 'new-york',
    stateName: 'New York',
    stateAbbreviation: 'NY',
    programSlug: 'dscr-loans',
    programName: 'DSCR Rental Loans',
    title: 'DSCR Loans in New York for Rental Properties',
    description:
      'New York DSCR loans for non-owner-occupied rental purchases and refinances. Qualify from property cash flow and request terms for your NY property.',
    h1: 'DSCR Loans in New York',
    intro:
      "A New York DSCR loan finances a non-owner-occupied rental property using property income to measure payment coverage instead of relying mainly on the borrower's W-2 income. Lenders review rent, principal and interest, New York property taxes, insurance, HOA or common charges, value, credit, reserves, entity documents, property condition, and whether the request is a purchase, refinance, or cash-out refinance.",
    markets: ['New York City', 'Long Island', 'Westchester', 'Hudson Valley', 'Buffalo', 'Rochester', 'Syracuse'],
    fit: [
      ...sharedQualification,
      'Rental purchases, rate-term refinances, and cash-out refinances',
      'Properties with leases, market rent support, or a clear stabilization plan',
    ],
    localNotes: [
      'New York DSCR files need careful property tax, insurance, and HOA or condo review where applicable.',
      'Short-term rental income needs stronger support than long-term lease income.',
      "Small multifamily and portfolio files should clearly separate each property's rent and expense story.",
    ],
    whatToPrepare: [
      'Current or projected monthly rent',
      'Property taxes, insurance, HOA, and operating expense assumptions',
      'Purchase price or current value',
      'Entity and ownership details',
    ],
    faqs: [
      {
        question: 'Can New York rental investors qualify without personal income?',
        answer:
          'DSCR loans are designed to underwrite the property cash flow instead of W-2 income, subject to program guidelines, credit, leverage, and property performance.',
      },
      {
        question: 'What DSCR do lenders usually want?',
        answer:
          'A DSCR around 1.25x is typically stronger, but some files can work below that depending on leverage, reserves, credit, and program type.',
      },
      {
        question: 'Do you finance LLC-owned rental properties?',
        answer:
          'Yes. DSCR rental loans are commonly structured for LLC-held investment properties, usually with a personal guarantee from the managing members.',
      },
    ],
  },
  {
    stateSlug: 'new-jersey',
    stateName: 'New Jersey',
    stateAbbreviation: 'NJ',
    programSlug: 'fix-and-flip-loans',
    programName: 'Fix & Flip Loans',
    title: 'New Jersey Fix & Flip Loans | Hard Money Lender NJ',
    description:
      'New Jersey fix and flip loans from a hard money lender focused on experienced investors. Fast review for NJ acquisition and rehab deals.',
    h1: 'New Jersey Fix & Flip Loans for Experienced Investors',
    intro:
      'AssetLift helps New Jersey flippers move quickly when a property needs acquisition and rehab capital. We focus on non-owner-occupied investor deals with clear ARV support, borrower experience, and a realistic close-to-resale timeline.',
    markets: ['North Jersey', 'Jersey City', 'Newark', 'Paterson', 'Elizabeth', 'Central Jersey', 'South Jersey'],
    fit: [
      ...sharedQualification,
      'Purchase and rehab files with a documented scope',
      'Experienced borrowers buying into proven resale corridors',
    ],
    localNotes: [
      'North Jersey files often need block-level comp support because buyer demand changes quickly by town and transit access.',
      'Older housing stock can create title, permit, and contractor timing issues if the scope is not prepared early.',
      'Property taxes and holding costs should be modeled conservatively before pushing leverage.',
    ],
    whatToPrepare: [
      'Contract price and expected closing date',
      'Scope of work with line-item rehab budget',
      'After-repair value support',
      'Borrower track record and liquidity snapshot',
    ],
    faqs: [
      {
        question: 'Do you offer fix and flip loans in New Jersey?',
        answer:
          'Yes. AssetLift reviews New Jersey fix and flip loans for experienced investors working non-owner-occupied investment properties.',
      },
      {
        question: 'What New Jersey markets are a fit?',
        answer:
          'We review deals across North Jersey, Central Jersey, South Jersey, and shore-adjacent markets when the comps, rehab scope, and borrower plan are clear.',
      },
      {
        question: 'Can I get rehab funds included?',
        answer:
          'Many fix and flip structures can include approved rehab funding, subject to underwriting, ARV, borrower experience, and draw controls.',
      },
    ],
  },
  {
    stateSlug: 'new-jersey',
    stateName: 'New Jersey',
    stateAbbreviation: 'NJ',
    programSlug: 'dscr-loans',
    programName: 'DSCR Rental Loans',
    title: 'New Jersey DSCR Loans | Rental Investor Lender',
    description:
      'New Jersey DSCR loans for experienced rental investors. Review purchases, refinances, and cash-out scenarios based on property cash flow.',
    h1: 'New Jersey DSCR Loans for Rental Investors',
    intro:
      'AssetLift reviews DSCR rental loan scenarios for New Jersey investors buying, refinancing, or cashing out non-owner-occupied rental properties. Strong files show rent support, realistic expenses, and a clear long-term hold plan.',
    markets: ['North Jersey', 'Jersey City', 'Newark', 'Elizabeth', 'Central Jersey', 'Camden County', 'Shore rental markets'],
    fit: [
      ...sharedQualification,
      '1-4 unit rental properties and eligible portfolio scenarios',
      'Purchases, refinances, and cash-out requests with documented rent support',
    ],
    localNotes: [
      'New Jersey taxes can materially affect DSCR, so the expense assumptions need to be current.',
      'Urban multifamily files should separate actual leases from optimistic market rent projections.',
      'Condo or HOA properties need early review of association costs and eligibility.',
    ],
    whatToPrepare: [
      'Rent roll or market rent support',
      'Tax, insurance, and HOA details',
      'Loan amount requested and estimated value',
      'Entity documents if the property is LLC-owned',
    ],
    faqs: [
      {
        question: 'Do DSCR loans work for New Jersey rental properties?',
        answer:
          'Yes. DSCR loans can work for New Jersey rental investors when the property income, expenses, value, credit profile, and leverage fit program guidelines.',
      },
      {
        question: 'Can I use a DSCR loan for cash-out refinance in New Jersey?',
        answer:
          'Yes, cash-out DSCR refinances may be available for qualifying New Jersey rental properties, subject to value, seasoning, rent support, and leverage limits.',
      },
      {
        question: 'Do I need W-2 income for a DSCR loan?',
        answer:
          'DSCR loans focus on property cash flow rather than personal W-2 income, though credit, liquidity, experience, and property details still matter.',
      },
    ],
  },
  {
    stateSlug: 'connecticut',
    stateName: 'Connecticut',
    stateAbbreviation: 'CT',
    programSlug: 'fix-and-flip-loans',
    programName: 'Fix & Flip Loans',
    title: 'Connecticut Fix & Flip Loans | Hard Money Lender CT',
    description:
      'Fix and flip loans in Connecticut for experienced investors. Fast review for Stamford, Bridgeport, New Haven, Hartford, and nearby markets.',
    h1: 'Connecticut Fix & Flip Loans for Experienced Investors',
    intro:
      'AssetLift reviews Connecticut fix and flip scenarios for experienced investors who need acquisition and rehab capital for non-owner-occupied properties. The best files show tight local comps, a disciplined renovation scope, and enough reserves for carrying costs.',
    markets: ['Stamford', 'Bridgeport', 'New Haven', 'Hartford', 'Norwalk', 'Waterbury', 'Danbury'],
    fit: [
      ...sharedQualification,
      'Purchase and renovation projects with realistic resale comps',
      'Experienced operators with contractor plans and closing timelines ready',
    ],
    localNotes: [
      'Fairfield County files can work well, but high basis and taxes make conservative ARV support important.',
      'New Haven, Bridgeport, and Hartford deals need neighborhood-specific resale and rent analysis.',
      'Older properties should account for mechanical, environmental, and permit risk before closing.',
    ],
    whatToPrepare: [
      'Purchase basis and closing deadline',
      'Rehab budget, contractor plan, and contingency',
      'ARV comps from the immediate market',
      'Exit timeline and reserves',
    ],
    faqs: [
      {
        question: 'Do you fund fix and flip loans in Connecticut?',
        answer:
          'Yes. AssetLift reviews Connecticut fix and flip loan scenarios for experienced investors buying non-owner-occupied investment properties.',
      },
      {
        question: 'Which Connecticut markets are a fit?',
        answer:
          'We review deals in Stamford, Bridgeport, New Haven, Hartford, Norwalk, Waterbury, Danbury, and other Connecticut markets when the file is well-supported.',
      },
      {
        question: 'How fast can a Connecticut flip loan close?',
        answer:
          'Many files can close quickly when title, valuation, insurance, borrower documents, and the scope of work are ready, subject to underwriting and file complexity.',
      },
    ],
  },
  {
    stateSlug: 'connecticut',
    stateName: 'Connecticut',
    stateAbbreviation: 'CT',
    programSlug: 'dscr-loans',
    programName: 'DSCR Rental Loans',
    title: 'Connecticut DSCR Loans | Rental Investor Lender',
    description:
      'DSCR rental loans in Connecticut for experienced investors buying or refinancing non-owner-occupied rental properties based on cash flow.',
    h1: 'Connecticut DSCR Loans for Rental Investors',
    intro:
      'AssetLift reviews Connecticut DSCR rental loans for investors who want rental income to support qualification. Strong files show accurate rent, tax, insurance, and expense assumptions before requesting terms.',
    markets: ['Stamford', 'Bridgeport', 'New Haven', 'Hartford', 'Norwalk', 'Waterbury', 'Danbury'],
    fit: [
      ...sharedQualification,
      'Rental acquisitions, refinances, and cash-out requests',
      'Properties with actual leases or defensible market rent support',
    ],
    localNotes: [
      'Connecticut property taxes and insurance can affect DSCR more than borrowers expect.',
      "Small multifamily properties should show each unit's rent and occupancy clearly.",
      'Higher-priced Fairfield County rentals need conservative debt sizing and liquidity support.',
    ],
    whatToPrepare: [
      'Monthly rent or lease details',
      'Property taxes, insurance, and HOA if applicable',
      'Estimated value or purchase price',
      'Requested loan amount and ownership structure',
    ],
    faqs: [
      {
        question: 'Can Connecticut rental investors use DSCR loans?',
        answer:
          'Yes. DSCR rental loans can work for Connecticut investment properties when the property cash flow, credit, leverage, and reserves meet program guidelines.',
      },
      {
        question: 'Do Connecticut DSCR loans require tax returns?',
        answer:
          'DSCR programs generally focus on property cash flow instead of personal income documentation, but the property, borrower, and entity still need underwriting review.',
      },
      {
        question: 'Can I refinance a Connecticut rental into a DSCR loan?',
        answer:
          'Yes. Rate-term and cash-out refinance scenarios may be available for qualifying Connecticut rental properties.',
      },
    ],
  },
];

export function findTriStateProgramPage(stateSlug: string, programSlug: string) {
  return TRI_STATE_PROGRAM_PAGES.find(
    (page) => page.stateSlug === stateSlug && page.programSlug === programSlug,
  );
}
