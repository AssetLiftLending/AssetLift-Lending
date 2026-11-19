export const PROGRAM_TERMS = {
  fixAndFlip: {
    startingRate: '8.25%',
    maxPurchaseLtc: 'Up to 95% of purchase',
    rehabFunding: 'Up to 100% of approved rehab budget',
    loanRange: '$50K to $5MM',
    // A separate tier, not the standard program. 100% LTC means no borrower
    // cash into purchase or rehab, so it is only offered where the track
    // record, credit, scope and liquidity all clear a higher bar. Every place
    // this figure is shown has to show these four conditions with it.
    hundredLtc: {
      headline: '100% LTC tier',
      summary:
        'Qualifying borrowers can finance 100% of total project cost - purchase and approved rehab - on a limited tier.',
      requirements: [
        '10 or more completed flips in the last 3 years',
        '740+ FICO',
        'Light renovation scope',
        'Liquid reserves of 10% of total project cost, verified in your account',
      ],
      disclosure:
        'All four conditions apply. The tier is subject to the same underwriting, valuation, title, and ARV limits as the standard program, and is not available on every file.',
    },
    disclosure:
      'Maximum leverage depends on credit, experience, liquidity, property, scope, valuation, title, and deal strength.',
  },
  dscr: {
    maxLtv: 'Up to 85% LTV',
    cashOutLtv: 'Up to 80% LTV on cash-out refinance scenarios',
    loanRange: '$100K to $5MM',
    qualification: 'Property cash-flow based qualification',
    disclosure:
      'Rates, DSCR requirements, leverage, reserves, and documentation vary by program and property performance.',
  },
  bridge: {
    maxLtv: 'Up to 80% LTV',
    loanRange: '$100K to $5MM',
    timing: 'Fast review for time-sensitive acquisitions and transitions',
    disclosure:
      'Bridge terms depend on collateral, exit plan, title, valuation, borrower profile, and file complexity.',
  },
  groundUp: {
    maxLtc: 'Up to 92.5% LTC',
    maxCompletedValue: 'Up to 70% completed value',
    loanRange: '$150K to $5MM',
    drawStructure: 'Construction draws released as work is verified',
    disclosure:
      'Construction leverage and draw terms depend on experience, plans, permits, budget, valuation, and market demand.',
  },
} as const;

export const GLOBAL_PROGRAM_DISCLOSURE =
  'All programs are business-purpose financing for non-owner-occupied investment properties only. Rates, fees, terms, leverage, and timing are subject to underwriting approval and transaction-specific disclosures.';
