/**
 * Funded deals shown on /funded-deals.
 *
 * Privacy rule (owner decision, Nov 2026): never list a street address,
 * borrower name, or entity name here. City and state only.
 *
 * To add a deal: append an entry. Set `program` only when it is confirmed
 * from the file; leave it out otherwise. `citySlug` links the card to an
 * existing /lending/{stateSlug}/{citySlug} page and is only used when that
 * city page exists in lib/data/cities.ts.
 */

export type FundedDealProgram = 'Fix & Flip' | 'DSCR Rental' | 'Bridge' | 'Ground-Up Construction';

export interface FundedDeal {
  city: string;
  state: string;
  stateAbbreviation: string;
  stateSlug: string;
  citySlug?: string;
  propertyType: 'Single-Family';
  program?: FundedDealProgram;
}

export const FUNDED_DEALS: FundedDeal[] = [
  {
    city: 'Tuscaloosa',
    state: 'Alabama',
    stateAbbreviation: 'AL',
    stateSlug: 'alabama',
    propertyType: 'Single-Family',
  },
  {
    city: 'Piscataway',
    state: 'New Jersey',
    stateAbbreviation: 'NJ',
    stateSlug: 'new-jersey',
    citySlug: 'piscataway',
    propertyType: 'Single-Family',
    program: 'Fix & Flip',
  },
  {
    city: 'Detroit',
    state: 'Michigan',
    stateAbbreviation: 'MI',
    stateSlug: 'michigan',
    citySlug: 'detroit',
    propertyType: 'Single-Family',
    program: 'Fix & Flip',
  },
  {
    city: 'Brunswick',
    state: 'Georgia',
    stateAbbreviation: 'GA',
    stateSlug: 'georgia',
    citySlug: 'brunswick-glynn-county',
    propertyType: 'Single-Family',
  },
  {
    city: 'Kingsland',
    state: 'Georgia',
    stateAbbreviation: 'GA',
    stateSlug: 'georgia',
    propertyType: 'Single-Family',
  },
  {
    city: 'St. Marys',
    state: 'Georgia',
    stateAbbreviation: 'GA',
    stateSlug: 'georgia',
    propertyType: 'Single-Family',
  },
  {
    city: 'Jacksonville',
    state: 'Florida',
    stateAbbreviation: 'FL',
    stateSlug: 'florida',
    citySlug: 'jacksonville',
    propertyType: 'Single-Family',
  },
  {
    city: 'Oklahoma City',
    state: 'Oklahoma',
    stateAbbreviation: 'OK',
    stateSlug: 'oklahoma',
    citySlug: 'oklahoma-city',
    propertyType: 'Single-Family',
  },
  {
    city: 'Cleveland',
    state: 'Ohio',
    stateAbbreviation: 'OH',
    stateSlug: 'ohio',
    citySlug: 'cleveland',
    propertyType: 'Single-Family',
  },
];
