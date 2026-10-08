export interface TriStateRegion {
  name: string;
  markets: string;
  detail: string;
}

export interface TriStateHubContent {
  intro: string;
  regions: TriStateRegion[];
  structures: Array<{ title: string; detail: string }>;
  fileChecklist: string[];
  localLinks: Array<{ label: string; href: string }>;
}

export const TRI_STATE_HUB_CONTENT: Record<string, TriStateHubContent> = {
  'new-york': {
    intro:
      'AssetLift Lending funds business-purpose, non-owner-occupied investment property across New York State. New York is really several markets under one name. A two-family in Buffalo, a mixed-use building in Brooklyn, and a single-family flip in Nassau County get underwritten on different comps, different carrying costs, and different exit timelines. The sections below cover how we look at each region, how deals usually get structured, and what to have ready so a file moves fast.',
    regions: [
      {
        name: 'New York City boroughs',
        markets: 'Brooklyn, Queens, the Bronx, Staten Island, Manhattan',
        detail:
          'Borough files turn on legal unit count, certificate of occupancy, tenant status, and rent regulation. A building that carries rent-stabilized units underwrites very differently from a free-market two- or three-family. Expect lenders to ask for the rent roll, leases, and proof of legal use early. Mixed-use and small multifamily are common and can work well for bridge-to-DSCR plans when the income is documented.',
      },
      {
        name: 'Long Island',
        markets: 'Nassau County and Suffolk County',
        detail:
          'Long Island is mostly single-family and small multifamily with deep resale demand. Flips work when the scope matches the block and the ARV is backed by recent nearby sales, not a town-wide average. Property taxes are a large part of the carrying cost, so hold math should include them from day one.',
      },
      {
        name: 'Westchester and the Hudson Valley',
        markets: 'Yonkers, Mount Vernon, New Rochelle, White Plains, Newburgh, Poughkeepsie',
        detail:
          'Older two- to four-family housing stock near rail lines draws both flippers and rental buyers. Lenders look closely at permits, older systems, and whether the finish level fits the local resale bracket. Rental holds in these markets often refinance into DSCR once units are leased.',
      },
      {
        name: 'Upstate',
        markets: 'Buffalo, Rochester, Syracuse, Albany',
        detail:
          'Lower purchase prices and steady rental demand make upstate a cash-flow market. Loan amounts are smaller, so a clean file matters more than leverage. Winter timing, older housing, and realistic rehab scope are the usual underwriting questions. BRRRR-style plans are common: buy and renovate with short-term debt, then refinance into a 30-year DSCR loan.',
      },
    ],
    structures: [
      {
        title: 'Fix and flip',
        detail:
          'Short-term financing on the purchase plus rehab funds released in draws as work is completed. Best when the exit is a resale within about a year and the comps support the ARV.',
      },
      {
        title: 'Bridge to DSCR',
        detail:
          'Bridge financing to buy or reposition a rental, then a long-term DSCR loan once the property is leased. Qualification is based on the property rent covering the payment, not personal income.',
      },
      {
        title: 'Ground-up and major renovation',
        detail:
          'Construction financing with a budget, plans, and permits reviewed up front. Works best with an experienced general contractor and a timeline that allows for inspections and approvals.',
      },
    ],
    fileChecklist: [
      'Property address, purchase price or current value, and contract if under contract',
      'Scope of work and budget for any renovation',
      'Recent comparable sales that support the after-repair value',
      'Rent roll and leases for occupied or rental properties',
      'Entity documents for the borrowing LLC or corporation',
      'Proof of funds for down payment, closing costs, and reserves',
      'Track record of past projects, if any',
    ],
    localLinks: [
      { label: 'DSCR loans in New York', href: '/lending/new-york/dscr-loans' },
      { label: 'Fix and flip loans in New York', href: '/lending/new-york/fix-and-flip-loans' },
      { label: 'Brooklyn investor loans', href: '/lending/new-york/brooklyn' },
      { label: 'Buffalo investor loans', href: '/lending/new-york/buffalo' },
      { label: 'Rochester investor loans', href: '/lending/new-york/rochester' },
      { label: 'Syracuse investor loans', href: '/lending/new-york/syracuse' },
    ],
  },
  'new-jersey': {
    intro:
      'AssetLift Lending funds business-purpose, non-owner-occupied investment property across New Jersey. New Jersey is dense, town-driven, and tax-heavy, and every municipality has its own rules. A deal in Camden County, a two-family in Newark, and a shore rental in Ocean County all need different comps and different carrying-cost math. The sections below cover how we look at each region, how deals usually get structured, and what to have ready so a file moves fast.',
    regions: [
      {
        name: 'South Jersey',
        markets: 'Camden County, Cherry Hill, Pennsauken, Camden, Gloucester and Burlington counties',
        detail:
          'Entry prices are lower than North Jersey and rental demand is steady, which makes South Jersey a strong market for both flips and rental holds. Lenders want block-level comps because values can change quickly from one neighborhood to the next. Many towns require a certificate of occupancy or rental inspection on resale or a new tenant, so that timing belongs in the plan.',
      },
      {
        name: 'Hudson and Essex counties',
        markets: 'Jersey City, Hoboken, Bayonne, Newark, East Orange, Irvington',
        detail:
          'Two- to four-family houses and small mixed-use buildings dominate. Files move faster when the legal unit count, tenant status, and rent support are documented up front. Jersey City and Hoboken carry higher values and tighter resale bands; Newark and the Oranges offer more spread with more scope risk.',
      },
      {
        name: 'Bergen, Passaic, and Union counties',
        markets: 'Hackensack, Paterson, Passaic, Elizabeth, Plainfield',
        detail:
          'Suburban single-family and older multifamily near transit. Property taxes are high, so they need to be in the carrying cost and the DSCR math from the start. Municipal approvals and inspections can add weeks, which matters for short-term loan terms.',
      },
      {
        name: 'Central Jersey and the Shore',
        markets: 'Middlesex, Monmouth, and Ocean counties, Toms River, Lakewood, Asbury Park',
        detail:
          'A mix of year-round rentals, seasonal rentals, and flips. Flood zone status and insurance cost are the first questions on shore properties. Seasonal rental income is underwritten more conservatively than a year-round lease.',
      },
    ],
    structures: [
      {
        title: 'Fix and flip',
        detail:
          'Short-term financing on the purchase plus rehab funds released in draws as work is completed. Plan for municipal inspections and certificate of occupancy timing before listing.',
      },
      {
        title: 'Bridge to DSCR',
        detail:
          'Bridge financing to buy or reposition a rental, then a long-term DSCR loan once the property is leased. Qualification is based on the property rent covering the payment, including New Jersey property taxes.',
      },
      {
        title: 'Ground-up and major renovation',
        detail:
          'Construction financing with plans, permits, and budget reviewed up front. Zoning and local approvals are the usual timeline risk.',
      },
    ],
    fileChecklist: [
      'Property address, purchase price or current value, and contract if under contract',
      'Scope of work and budget for any renovation',
      'Recent comparable sales that support the after-repair value',
      'Current property tax bill and insurance quote',
      'Rent roll and leases for occupied or rental properties',
      'Entity documents for the borrowing LLC or corporation',
      'Proof of funds for down payment, closing costs, and reserves',
    ],
    localLinks: [
      { label: 'DSCR loans in New Jersey', href: '/lending/new-jersey/dscr-loans' },
      { label: 'Fix and flip loans in New Jersey', href: '/lending/new-jersey/fix-and-flip-loans' },
      { label: 'Camden County investor loans', href: '/lending/new-jersey/camden-county' },
      { label: 'Cherry Hill investor loans', href: '/lending/new-jersey/cherry-hill' },
      { label: 'Pennsauken investor loans', href: '/lending/new-jersey/pennsauken' },
      { label: 'Camden investor loans', href: '/lending/new-jersey/camden' },
    ],
  },
  connecticut: {
    intro:
      'AssetLift Lending reviews business-purpose, non-owner-occupied investment-property scenarios across Connecticut. Fairfield County, the New Haven and Hartford areas, and eastern Connecticut have different price, rent, tax, insurance, and resale patterns, so support each project with parcel- and neighborhood-level evidence. Verify unit legality, municipal approvals, scope, title, borrower liquidity, and the planned sale or refinance exit before relying on a schedule or leverage assumption.',
    regions: [
      {
        name: 'Fairfield County',
        markets: 'Stamford, Norwalk, Bridgeport, Danbury',
        detail:
          'Fairfield County markets vary substantially by municipality and neighborhood. For Stamford, Norwalk, Bridgeport, and Danbury projects, support after-repair value with nearby closed sales matched for property type, size, condition, and finish; check taxes, insurance, unit legality, and permit status rather than applying one county-wide price assumption.',
      },
      {
        name: 'New Haven County',
        markets: 'New Haven, Waterbury, Meriden, West Haven',
        detail:
          'For New Haven, Waterbury, Meriden, and West Haven, verify each building’s legal unit count, occupancy, tax and insurance costs, condition, and rent or sale evidence. Older buildings may need added systems and permit diligence; for paid work disturbing painted surfaces in pre-1978 housing, check EPA RRP requirements and include any required lead-safe work in the scope.',
      },
      {
        name: 'Hartford County',
        markets: 'Hartford, New Britain, East Hartford, Bristol',
        detail:
          'For Hartford, New Britain, East Hartford, and Bristol, model actual taxes, insurance, unit-level rent, vacancy, utilities, repairs, and any required municipal work. Support value with close local comparables; do not assume a rental refinance will qualify until the completed property and borrower meet the takeout lender’s separate requirements.',
      },
      {
        name: 'Eastern Connecticut',
        markets: 'New London, Norwich, Groton',
        detail:
          'For New London, Norwich, and Groton, use rent and sale evidence from the same town and property type, and test a slower sale or lease-up. Avoid basing repayment on broad regional averages or assumed appreciation.',
      },
    ],
    structures: [
      {
        title: 'Fix and flip',
        detail:
          'For purchase-and-renovation projects, organize the contract, approved scope, bids, permit status, nearby after-repair-value comparables, cash-to-close, reserves, and exit. Confirm eligible costs, draw inspections, reimbursement timing, fees, maturity, and payoff terms in writing; available terms are project-specific.',
      },
      {
        title: 'Bridge to DSCR',
        detail:
          'A short-term financing plan may be followed by a rental refinance after renovation and lease-up, but the takeout is a separate application. Test rent against the full payment and operating costs, and confirm completed condition, unit legality, occupancy, appraisal, borrower eligibility, and current program criteria before depending on that exit.',
      },
      {
        title: 'Ground-up and major renovation',
        detail:
          'For a ground-up or major-build scenario, organize parcel control, zoning and permit status, plans, itemized budget, contractor, borrower experience, reserves, completed-value support, and exit. Confirm eligible costs and draw mechanics in project-specific written terms before starting work.',
      },
    ],
    fileChecklist: [
      'Property address, purchase price or current value, and contract if under contract',
      'Scope of work and budget for any renovation',
      'Recent comparable sales that support the after-repair value',
      'Rent roll and leases for occupied or rental properties',
      'Entity documents for the borrowing LLC or corporation',
      'Proof of funds for borrower contribution, closing costs, reserves, and draw timing needs',
    ],
    localLinks: [
      { label: 'DSCR loans in Connecticut', href: '/lending/connecticut/dscr-loans' },
      { label: 'Fix and flip loans in Connecticut', href: '/lending/connecticut/fix-and-flip-loans' },
    ],
  },
};
