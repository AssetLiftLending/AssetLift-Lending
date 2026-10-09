import { PROGRAM_TERMS } from "./program-terms";

export interface LoanProduct {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  keyStats: Array<{ label: string; value: string }>;
  features: Array<{ title: string; description: string }>;
  eligibility: Array<{ requirement: string; detail: string }>;
  process: Array<{ step: string; description: string }>;
  useCases: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    slug: "fix-and-flip",
    title: "Fix & Flip Loans - Fast Funding for House Flipping Projects",
    description:
      `AssetLift Lending offers fix-and-flip loans with rates starting as low as ${PROGRAM_TERMS.fixAndFlip.startingRate} for qualifying scenarios, up to 95% LTC on the purchase, and closings in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.`,
    heroTitle: "Fix & Flip Loans",
    heroSubtitle:
      "Close in days, not months. Get the capital you need to acquire and renovate investment properties with speed and certainty.",
    overview:
      "Fix-and-flip loans are short-term, asset-based financing instruments designed specifically for real estate investors who purchase distressed properties, renovate them, and sell them at a profit. Unlike conventional mortgages that evaluate your employment history and tax returns, fix-and-flip loans are underwritten primarily on the property's current value and its projected after-repair value (ARV). This means experienced flippers and first-time investors alike can access capital based on the strength of the deal rather than their personal financial profile.\n\nAssetLift Lending's fix-and-flip program provides acquisition financing up to 95% LTC on the purchase and 100% of the renovation budget, with total loan amounts capped at 70% to 75% of the after-repair value. Loan terms range from 6 to 18 months, giving borrowers ample time to complete renovations and list the property for sale without the pressure of an artificially short deadline. Renovation funds are held in escrow and disbursed through a structured draw process as work is completed, ensuring that capital is deployed efficiently and that the project stays on track.\n\nOur underwriting team evaluates every deal based on comparable sales data, the scope of the renovation plan, and the borrower's experience level. We fund single-family homes, duplexes, triplexes, four-unit properties, townhomes, and condos in markets across the country. Whether you are flipping your first house or your fiftieth, our streamlined process is designed to move at the speed your deals demand.\n\nThe fix-and-flip market remains one of the most profitable segments of real estate investing for those who execute disciplined renovation plans and buy at the right price. With property values continuing to reward well-positioned renovations and buyer demand staying strong in most metro areas, access to fast, reliable capital is the single biggest competitive advantage a flipper can have. AssetLift Lending exists to provide exactly that advantage.",
    keyStats: [
      { label: "Max LTC on Purchase", value: "Up to 95%" },
      { label: "Renovation Financing", value: "Up to 100% of rehab costs" },
      { label: "Loan Term", value: "6 to 18 months" },
      {
        label: "Closing Speed",
        value: "As fast as 5 business days",
      },
      { label: "Interest Rates Starting At", value: PROGRAM_TERMS.fixAndFlip.startingRate },
    ],
    features: [
      {
        title: "High-Leverage Acquisition Financing",
        description:
          "Borrow up to 95% LTC on the purchase for qualifying fix and flip projects, reducing the out-of-pocket capital required to get into a deal. Combined with 100% rehab financing, you can control a property with as little as 5% of the purchase price in cash, freeing up liquidity for additional projects or reserves.",
      },
      {
        title: "Full Renovation Budget Coverage",
        description:
          "We finance up to 100% of the renovation budget through a structured draw process. Submit your scope of work at origination, and funds are released in stages as each phase of construction is completed and inspected. This eliminates the need to fund renovations out of pocket and keeps your capital working across multiple deals.",
      },
      {
        title: "Dedicated Draw Management",
        description:
          "Our in-house draw management team processes inspection requests within 48 hours. Once a draw is approved, funds are wired directly to your account or issued via check within 1 to 2 business days. We coordinate with your general contractor to ensure draw requests align with completed work and stay within the approved budget.",
      },
      {
        title: "No Prepayment Penalties",
        description:
          "Sell the property whenever you are ready without worrying about early payoff fees. Our fix-and-flip loans carry no prepayment penalties, so you keep every dollar of profit from a fast sale. If you finish ahead of schedule and close with a buyer in month 4 of a 12-month loan, you pay interest only for the time you used the capital.",
      },
      {
        title: "Experienced Borrower Rate Discounts",
        description:
          "Investors with a verified track record of completed flips qualify for reduced origination fees, lower interest rates, and potentially faster closings. Bring documentation of your last 3 to 5 completed projects at application and our pricing team will build a customized rate sheet for your deal.",
      },
      {
        title: "Flexible Exit Strategies",
        description:
          "While most borrowers plan to sell the renovated property, our fix-and-flip loans also support refinance exits. If market conditions change or you decide to hold the property as a rental, you can refinance into a DSCR loan or conventional mortgage without penalty. This flexibility protects you from being forced into a sale at an unfavorable time.",
      },
    ],
    eligibility: [
      {
        requirement: "Minimum Credit Score",
        detail:
          "A FICO score of 620 or higher is required. Borrowers with scores above 700 qualify for the most competitive rate tiers. Scores between 620 and 660 are eligible with compensating factors such as higher down payments or demonstrated flipping experience.",
      },
      {
        requirement: "Down Payment",
        detail:
          "A minimum of 5% of the purchase price is required at closing on qualifying scenarios, funded from your own capital or a documented capital partner. Gift funds and unsecured borrowed funds are not eligible for the down payment. Larger down payments can unlock better interest rates and origination pricing.",
      },
      {
        requirement: "Property Types",
        detail:
          "Eligible properties include single-family residences, duplexes, triplexes, four-unit buildings, townhomes, and warrantable condos. The property must be non-owner-occupied and intended for renovation and resale or refinance. Raw land and ground-up construction are not eligible under this program.",
      },
      {
        requirement: "Renovation Scope of Work",
        detail:
          "A detailed scope of work with line-item costs must be submitted at application. The renovation plan should be prepared by or reviewed with a licensed general contractor. We accept renovations ranging from cosmetic updates to full gut rehabilitations, provided the total project stays within our maximum ARV guidelines.",
      },
      {
        requirement: "Real Estate Experience",
        detail:
          "First-time flippers are welcome, though borrowers with no prior flipping experience may face slightly higher rates or lower maximum leverage. Having a licensed general contractor on your team or documented construction management experience strengthens your application. Repeat borrowers with 3 or more completed flips receive preferential pricing.",
      },
    ],
    process: [
      {
        step: "Apply and Submit Your Deal",
        description:
          "Complete our online application in under 15 minutes. Upload the purchase contract, your renovation scope of work with cost estimates, comparable sales supporting your ARV estimate, and a brief summary of your investment experience. Our team reviews every submission within 24 hours and issues a preliminary term sheet if the deal meets our guidelines.",
      },
      {
        step: "Underwriting and Appraisal",
        description:
          "Once you accept the term sheet, we order a third-party appraisal or broker price opinion to confirm the property's as-is value and after-repair value. Our underwriting team reviews the title report, property insurance, and your borrower profile in parallel. Most files clear underwriting within 3 to 5 business days of receiving all required documents.",
      },
      {
        step: "Closing and Funding",
        description:
          "We coordinate with the title company or closing attorney to prepare loan documents, schedule signing, and wire funds. Acquisition proceeds are funded directly to the closing agent at the time of purchase. Renovation funds are deposited into a controlled escrow account managed by AssetLift Lending and disbursed as work is completed.",
      },
      {
        step: "Renovation Draws and Project Completion",
        description:
          "As you complete each phase of renovation, submit a draw request through our online portal. We dispatch an inspector to verify completed work within 48 hours and release the corresponding funds within 1 to 2 business days after approval. When the renovation is complete, you list the property for sale or initiate a refinance to pay off the loan.",
      },
    ],
    useCases: [
      {
        title: "Residential Property Flips",
        description:
          "The classic fix-and-flip: purchase a dated or distressed single-family home, complete a cosmetic or moderate renovation, and sell to a retail buyer at a profit. Our financing covers the acquisition and the full rehab budget, allowing you to enter deals with minimal out-of-pocket capital and maximum speed.",
      },
      {
        title: "Auction and Foreclosure Purchases",
        description:
          "Auction purchases require proof of funds and rapid closing. AssetLift Lending provides proof-of-funds letters for active borrowers and can close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity, making it possible to compete at courthouse auctions, HUD sales, and bank-owned property liquidations where traditional financing is not an option.",
      },
      {
        title: "Small Multifamily Value-Add",
        description:
          "Purchase a 2-4 unit property with below-market rents, renovate the units to justify higher rental rates, and either sell at the improved valuation or refinance into a long-term DSCR loan. Our fix-and-flip program finances the acquisition and renovation, and our DSCR program handles the take-out refinance.",
      },
      {
        title: "Wholesale Double-Close Financing",
        description:
          "Wholesalers who need transactional funding to close on a property before immediately reselling to an end buyer can use our short-term bridge product. Funds are available for same-day or next-day closings, and the loan is repaid from the proceeds of the B-to-C sale, often within hours of the original purchase.",
      },
    ],
    faqs: [
      {
        question: "How quickly can AssetLift Lending close a fix-and-flip loan?",
        answer:
          "Many straightforward fix-and-flip files can close in as fast as 5 business days from the date a complete application is received, subject to underwriting, valuation, title, and file complexity.",
      },
      {
        question: "Do you finance the full renovation cost?",
        answer:
          "Yes, we finance up to 100% of the renovation budget as outlined in your approved scope of work. Renovation funds are held in escrow and released in draws as work is completed and inspected. This means you do not need to fund renovations out of pocket, though the total loan amount (purchase plus rehab) is capped at 70% to 75% of the property's after-repair value.",
      },
      {
        question: "What happens if my renovation goes over budget?",
        answer:
          "If your project exceeds the original scope of work, you can request a budget increase by submitting a change order with updated cost estimates. Our team will review the request and, if the revised total still falls within our maximum ARV guidelines, approve the additional funds. Budget overruns that push the total loan above our ARV cap will need to be funded by the borrower from their own resources.",
      },
      {
        question: "Can I use a fix-and-flip loan for a property I plan to keep as a rental?",
        answer:
          "Yes. While the loan is structured for a short-term hold, your exit strategy can be a sale or a refinance. If you decide to keep the property, you will need to refinance into a long-term loan (such as a DSCR or conventional mortgage) before the fix-and-flip loan matures. There is no penalty for choosing a refinance exit instead of a sale exit.",
      },
      {
        question: "Do I need a general contractor, or can I do the work myself?",
        answer:
          "We do not require a licensed general contractor for every project, but having one significantly strengthens your application, particularly for large-scope renovations. If you plan to self-manage the rehab using subcontractors, you should demonstrate prior renovation experience and provide a detailed, itemized scope of work. For gut renovations or structural work, we strongly recommend and may require a licensed GC.",
      },
      {
        question: "Are there any geographic restrictions?",
        answer:
          "AssetLift Lending funds fix-and-flip projects in most U.S. states. We focus on metropolitan statistical areas and suburban markets with strong comparable sales activity. Rural properties with limited comp data may require additional underwriting review. Contact our team with the property address before applying, and we will confirm eligibility within 24 hours.",
      },
    ],
  },
  {
    slug: "ground-up-construction",
    title: "Ground-Up Construction Loans - Finance New Builds from the Ground Up",
    description:
      "AssetLift Lending reviews ground-up construction loan scenarios for non-owner-occupied residential projects. Share the site, plans, budget, permit status, builder, equity, and exit for a project-specific review.",
    heroTitle: "Ground-Up Construction Loans",
    heroSubtitle:
      "Project-based financing review for residential investors building from the ground up. Terms, eligible costs, leverage, and draw procedures depend on the complete project file.",
    overview:
      "Ground-up construction financing is distinct from financing the purchase and renovation of an existing building. A review for a non-owner-occupied residential build can involve the parcel, acquisition basis, plans, zoning and permit status, itemized hard and soft costs, contractor, borrower experience, equity, reserves, valuation evidence, proposed draw process, schedule, and exit.\n\nWhat a lender may finance, how much equity is required, how completed value is assessed, and how construction funds are advanced vary by project and current program. Obtain written, project-specific terms that identify eligible costs, leverage limits, borrower contributions, fees, interest basis, conditions to funding, draw documentation, and maturity. Do not treat illustrative figures or an initial discussion as an approval or commitment.\n\nConstruction introduces entitlement, site, budget, contractor, draw, completion, and market-absorption risks before a finished asset exists. Build a downside case that includes approval delays, cost changes, a longer schedule, and a lower completed value. A projected return, appraisal, draw plan, financing amount, or timing is not guaranteed; each depends on the property, complete file, third parties, and market conditions.",
    keyStats: [
      { label: "Site and approvals", value: "Parcel-specific" },
      { label: "Plans and budget", value: "Itemized review" },
      { label: "Builder and team", value: "Document experience" },
      { label: "Draw process", value: "Confirm in writing" },
      { label: "Financing terms", value: "Project-specific" },
    ],
    features: [
      {
        title: "Confirm Eligible Project Costs",
        description:
          "Ask whether the proposed facility can include land acquisition, construction costs, or both. Eligible costs, closing conditions, funding sequence, and any separately funded items depend on the property and written terms; do not assume all land, soft costs, or future work are covered.",
      },
      {
        title: "Clarify Draw Procedures",
        description:
          "Before choosing a project budget, get the lender's proposed draw schedule and written requirements. Confirm milestones, inspection method, documentation, fees, retainage, expected processing times, and whether work must be completed or paid for before an advance. Procedures are specific to the loan.",
      },
      {
        title: "Confirm Interest and Carrying Costs",
        description:
          "Some construction facilities calculate interest on disbursed funds, while other structures may differ. Confirm the exact payment basis, funded balance, draw schedule, interest reserve, and any undrawn fees in the written term sheet before modeling monthly carrying costs.",
      },
      {
        title: "Experienced Construction Underwriting",
        description:
          "A project review should connect plans, budget, contractor capacity, milestones, and exit assumptions. Submit supporting documents together and identify open approvals, bids, dependencies, and schedule risks so the review can focus on the actual project rather than an incomplete estimate.",
      },
      {
        title: "Flexible Exit Options",
        description:
          "Possible exits include selling the completed property or refinancing into rental financing if the property and borrower qualify. Select a primary plan before construction, test an alternate plan, and confirm maturity, extension, prepayment, and refinance terms in writing; no exit value or takeout loan is guaranteed.",
      },
    ],
    eligibility: [
      {
        requirement: "Construction Experience",
        detail:
          "Construction experience is one part of project review. Provide a concise record of completed builds or renovations, your role, budget and schedule performance, and any current projects. If you are a first-time builder, describe the experienced professionals responsible for construction and provide their relevant project history. Requirements vary by program and file.",
      },
      {
        requirement: "Licensed General Contractor",
        detail:
          "Builder and contractor requirements depend on project scope and program guidelines. Provide the contractor's credentials, relevant completed projects, insurance evidence, trade coverage, project schedule, and references. Verify any required state or local license with the relevant authority before construction begins.",
      },
      {
        requirement: "Approved Plans and Permits",
        detail:
          "Share current architectural and engineering plans, zoning or land-use status, and the permit application or issued permits. The responsible local authority determines what approvals are required and when work may begin. Whether a project can close before permits are issued depends on its specific risks and written loan terms; do not assume a rate or approval will be held while permits are pending.",
      },
      {
        requirement: "Borrower and guarantor review",
        detail:
          "Borrower and guarantor requirements, including credit review, depend on the current program and project. Be ready to provide requested financial information, liabilities, liquidity, relevant experience, and entity documents; obtain the applicable criteria for the specific scenario.",
      },
      {
        requirement: "Down Payment and Reserves",
        detail:
          "Required equity and reserves depend on the project budget, collateral, experience, valuation, and current program guidelines. Document cash and any proposed land equity separately, and show liquidity for closing costs, draw timing, contingencies, carrying costs, and delays. Confirm the actual amounts and acceptable equity sources in the written terms.",
      },
    ],
    process: [
      {
        step: "Prepare the Project Package",
        description:
          "Organize the parcel and acquisition details, plans, zoning and permit status, itemized budget, contractor credentials, borrower experience, equity and reserves, completed-value evidence, schedule, and intended exit. Ask the lender which items are needed for an initial screen and which third-party reports may be required later.",
      },
      {
        step: "Underwriting and Due Diligence",
        description:
          "The review may include a project appraisal, title and zoning review, plans and budget, borrower and contractor information, and other diligence required for the file. Ask which third-party reports, permits, conditions, and costs apply to your project and what remains before closing. Timing depends on completeness, third parties, title, valuation, and approvals; do not schedule around an unconfirmed closing date.",
      },
      {
        step: "Closing and Initial Funding",
        description:
          "Before closing, confirm in writing which costs are financed, how undisbursed funds are held, what conditions must be met before the first advance, and whether deposits or completed work are reimbursed. Do not start work or rely on future draws until the approved budget, funding mechanics, and conditions are clear in the executed documents.",
      },
      {
        step: "Construction Draws and Project Completion",
        description:
          "Draw requests may require invoices, photos, inspections, lien waivers, or other evidence. Confirm the steps, approval authority, fees, retainage, timing, and who pays contractors before a draw is released. At completion, obtain the closeout and occupancy approvals required by the local authority; an eventual sale or refinance remains subject to market conditions and separate buyer or lender approval.",
      },
    ],
    useCases: [
      {
        title: "Spec Home Construction",
        description:
          "A spec build depends on the buyer pool, competing inventory, price, finish choices, carrying costs, and completed-sale comparables. Compare the projected exit with recent closed sales and include a slower sale and lower price in the downside case; new construction does not ensure a premium or a quick sale.",
      },
      {
        title: "Teardown and Rebuild",
        description:
          "Before valuing a teardown, verify demolition rules, existing utilities, setbacks, tree or historic protections, zoning, and permit requirements with the relevant local authorities. Compare the total acquisition, demolition, site, and build costs against supported completed sales.",
      },
      {
        title: "Infill Development",
        description:
          "Infill projects can still face access, utility-capacity, easement, drainage, neighboring-property, and entitlement constraints. Verify the parcel-specific conditions and avoid assuming nearby infrastructure or amenities make a project feasible or support a particular price.",
      },
      {
        title: "Small Multifamily New Construction",
        description:
          "For a small multifamily build, support unit mix and projected rents with relevant market evidence, and include lease-up, operating costs, vacancy, and reserves in the plan. A later rental refinance depends on completion, occupancy, appraisal, rent support, borrower eligibility, and the takeout lender's guidelines; it is not guaranteed.",
      },
    ],
    faqs: [
      {
        question: "Can I finance the land purchase and construction in one loan?",
        answer:
          "Some construction scenarios may include both site acquisition and construction costs; others may finance construction on land already owned. Eligibility, land-equity treatment, valuation, and required cash depend on the complete file. Request written terms for the specific parcel and plan before assuming that land or soft costs are included.",
      },
      {
        question: "How does the draw process work during construction?",
        answer:
          "Draw procedures are set for the specific loan. Before closing, confirm eligible cost categories, required invoices and lien waivers, inspection steps, draw fees, retainage, minimum draw size, reimbursement rules, and expected processing timing. Ask whether the borrower must advance funds before a draw is approved and paid.",
      },
      {
        question: "What if construction takes longer than expected?",
        answer:
          "A delay can increase interest, taxes, insurance, contractor costs, and the risk of reaching loan maturity before the exit. Ask whether extensions are available, what fees and conditions apply, and whether an extension is guaranteed; do not assume extra time will be granted. Model a project-specific contingency and a slower completion rather than relying on one schedule.",
      },
      {
        question: "Do you finance ADUs or detached guest houses?",
        answer:
          "ADU and detached-structure eligibility depends on local land-use approvals, property type, project scope, valuation, and current financing guidelines. Verify whether the use is allowed at the parcel and ask for written confirmation that the project is eligible before relying on financing.",
      },
      {
        question: "What types of properties can I build?",
        answer:
          "Eligible property types, unit counts, construction methods, and mixed-use limits depend on the current program and project. Describe the intended use, unit mix, construction type, and ownership structure in your inquiry and request confirmation before incurring design or application costs.",
      },
      {
        question: "Is builder experience absolutely required?",
        answer:
          "Prior construction experience and contractor capacity help support a project review, but requirements vary by program and transaction. If this is your first build, document the experienced professionals on the team, their roles, relevant projects, insurance, and how construction will be supervised. Any compensating conditions depend on current underwriting.",
      },
    ],
  },
  {
    slug: "dscr-rental",
    title: "DSCR Loans for Rental Investors - No Tax Return Rental Property Financing",
    description:
      "Qualify for DSCR loans based on property cash flow, not personal income. AssetLift Lending reviews rental purchases, rate-term refinances, and cash-out refinances for real estate investors.",
    heroTitle: "DSCR Loans for Rental Investors",
    heroSubtitle:
      "Qualify on rental income, not tax returns. Use 30-year rental property financing to buy, refinance, or cash out qualifying investment properties.",
    overview:
      "DSCR loans are rental property loans for real estate investors who want the property income to drive qualification. Instead of underwriting personal tax returns, W-2s, or debt-to-income ratios first, a DSCR lender compares the property's rent to the full monthly housing payment. If the rental income supports the PITIA payment and the file meets credit, reserve, property, and leverage guidelines, the loan may qualify.\n\nAssetLift Lending reviews DSCR loan scenarios for purchases, rate-term refinances, cash-out refinances, short-term rentals, and BRRRR exits. Qualifying rental purchases may reach up to 85% LTV, and qualifying DSCR cash-out refinances may reach up to 80% LTV. Maximum leverage is not available on every file and depends on credit, DSCR, property type, liquidity, rent support, value, seasoning, and program guidelines.\n\nThe strongest DSCR files usually have clean rent support, realistic tax and insurance assumptions, an entity ready to close, adequate reserves, and a property that is rent-ready at closing. AssetLift's DSCR rental loan program supports 30-year fixed and adjustable-rate structures, loan amounts from $100,000 to $3 million, LLC or entity vesting, and investment properties such as single-family rentals, 2-4 unit properties, warrantable condos, townhomes, and eligible short-term rentals.\n\nDSCR origination as low as 0%. Terms depend on the scenario.",
    keyStats: [
      { label: "Loan-to-Value (Purchase)", value: "Up to 85%" },
      { label: "Loan-to-Value (Cash-Out Refi)", value: "Up to 80%" },
      { label: "Minimum DSCR Ratio", value: "1.0 (lower available with adjustments)" },
      { label: "Loan Term", value: "30-year fixed or 5/6 ARM" },
      { label: "Interest Rates Starting At", value: "6.25%" },
    ],
    features: [
      {
        title: "No Personal Income Verification",
        description:
          "We do not require tax returns, W-2s, 1099s, or profit-and-loss statements. Your qualification is based entirely on the subject property's rental income and your credit profile. This is the defining advantage of DSCR lending and the reason it has become the preferred financing tool for full-time real estate investors.",
      },
      {
        title: "Close in Your LLC or Entity Name",
        description:
          "Title the property in your LLC, LP, or corporation from day one. Unlike conventional mortgages that often require individual vesting, DSCR loans can typically close in the name of your business entity, subject to program guidelines and the actual execution path. This helps preserve the liability protection you set up your LLC to provide without having to rely on a post-closing title transfer.",
      },
      {
        title: "No Property Count Limits",
        description:
          "Finance your 5th, 15th, or 50th rental property with the same streamlined process. There is no Fannie Mae-style cap on the number of financed properties. Each property is underwritten independently based on its own cash flow, so scaling your portfolio does not create compounding documentation burdens.",
      },
      {
        title: "30-Year Fixed Rate Option",
        description:
          "Lock in a fixed interest rate for the full 30-year term of the loan, providing payment certainty and protection against rising interest rates. Fixed-rate DSCR loans allow you to model long-term cash flow with confidence, knowing your debt service will never increase regardless of market conditions.",
      },
      {
        title: "Cash-Out Refinancing Available",
        description:
          "Access the equity in your existing rental properties through cash-out refinances at up to 80% LTV. Use the proceeds to fund new acquisitions, complete renovations on other properties, or pay down higher-cost debt. Cash-out DSCR refinances are one of the most powerful tools for recycling capital within a rental portfolio.",
      },
      {
        title: "Interest-Only Payment Option",
        description:
          "Choose an interest-only payment structure for the first 5 to 10 years of the loan to maximize monthly cash flow during the early ownership period. Interest-only payments reduce your monthly obligation, increasing the net income the property generates and improving your return on equity during the years when rental income growth is compounding.",
      },
    ],
    eligibility: [
      {
        requirement: "Minimum DSCR Ratio",
        detail:
          "The property's gross monthly rent divided by the total monthly housing expense (PITIA) must equal or exceed 1.0 for standard pricing. Ratios of 1.25 or higher qualify for the best available rates. Programs for ratios between 0.75 and 0.99 are available with compensating factors such as lower LTV, higher credit score, or additional reserves.",
      },
      {
        requirement: "Minimum Credit Score",
        detail:
          "A FICO score of 660 is the minimum for program eligibility. Scores of 720 and above qualify for the most competitive rates and highest leverage. Borrowers with scores between 660 and 700 are eligible with modest rate adjustments. The credit review also evaluates for recent bankruptcies, foreclosures, or short sales, which may require additional seasoning.",
      },
      {
        requirement: "Property Condition",
        detail:
          "The property must be in rentable condition at the time of closing. This means it must be habitable, free of major structural defects, and ready to generate rental income immediately. Properties requiring significant renovation should be financed with a fix-and-flip loan first, then refinanced into a DSCR loan after rehab is complete and the property is stabilized.",
      },
      {
        requirement: "Reserves",
        detail:
          "Borrowers must hold liquid reserves equal to 3 to 6 months of the total monthly housing payment at the time of closing. Acceptable reserves include bank account balances, brokerage accounts, retirement accounts (valued at 60% to 70%), and documented cryptocurrency holdings. Reserves protect against vacancy and maintenance costs during the early months of ownership.",
      },
      {
        requirement: "Eligible Property Types",
        detail:
          "Single-family homes, duplexes, triplexes, four-unit properties, warrantable condos, and townhomes qualify under our DSCR program. Properties must be non-owner-occupied. Short-term rental properties (Airbnb, VRBO) may be eligible using projected rental income from a third-party rental analysis or 12 months of documented booking history.",
      },
    ],
    process: [
      {
        step: "Application and Property Analysis",
        description:
          "Submit your application online along with the property address, current or projected rent, and your credit authorization. Our team pulls comps, verifies rental income against market data, and calculates the DSCR ratio. You receive a rate quote and term sheet within 24 to 48 hours of application.",
      },
      {
        step: "Appraisal and Underwriting",
        description:
          "We order a full appraisal that includes a rental survey to establish the property's fair market rent. The underwriting review covers the property's condition, the borrower's credit profile, and the entity documentation (if closing in an LLC). Because no income verification is required, many files move through underwriting and toward closing in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.",
      },
      {
        step: "Conditional Approval and Document Collection",
        description:
          "Once underwriting is complete, you receive a conditional approval with a list of remaining items needed for clear-to-close. Common conditions include proof of insurance, entity formation documents, reserve verification, and a signed lease agreement (for purchase transactions on tenanted properties). Most conditions are satisfied within 2 to 3 business days.",
      },
      {
        step: "Closing",
        description:
          "We coordinate with the title company or closing attorney to prepare and execute loan documents. Funds are wired at closing for purchases, or disbursed promptly for refinances after any applicable rescission period. Many DSCR files close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.",
      },
    ],
    useCases: [
      {
        title: "BRRRR Strategy Refinance",
        description:
          "After completing a renovation and placing a tenant, refinance out of your short-term hard money or fix-and-flip loan into a 30-year DSCR loan. Recover your renovation capital through a cash-out refinance and redeploy it into the next acquisition. Our DSCR product is purpose-built as the long-term take-out loan in the BRRRR cycle.",
      },
      {
        title: "Turnkey Rental Acquisition",
        description:
          "Purchase a stabilized rental property that already has a tenant in place and is generating income. The existing lease provides the rental income documentation needed for DSCR qualification, and the property's cash flow history gives confidence in the underwriting. Close in your LLC name with no income documentation required.",
      },
      {
        title: "Portfolio Consolidation",
        description:
          "If you have multiple rental properties financed with short-term or variable-rate loans, consolidate them into individual 30-year DSCR loans at fixed rates. This stabilizes your monthly cash flow, extends your repayment timeline, and eliminates the refinance risk associated with balloon-payment or adjustable-rate products.",
      },
      {
        title: "Short-Term Rental Financing",
        description:
          "Finance vacation rentals and short-term rental properties using projected income from platforms like Airbnb and VRBO. We accept third-party rental projections from services like AirDNA or 12 months of documented booking revenue to establish the DSCR ratio. This opens DSCR financing to the growing short-term rental investor market.",
      },
    ],
    faqs: [
      {
        question: "What does DSCR stand for, and how is it calculated?",
        answer:
          "DSCR stands for Debt Service Coverage Ratio. It is calculated by dividing the property's gross monthly rental income by the total monthly housing payment, which includes principal, interest, property taxes, homeowner's insurance, and any HOA dues (commonly abbreviated as PITIA). A DSCR of 1.25 means the property generates 25% more income than the total monthly payment, indicating strong cash flow. A DSCR of 1.0 means income exactly covers the payment.",
      },
      {
        question: "Do I really not need to provide tax returns?",
        answer:
          "Correct. DSCR loans do not require personal or business tax returns, W-2s, 1099s, or profit-and-loss statements. Your qualification is based on the property's rental income and your credit score. This is the core advantage of DSCR lending: the property's cash flow, not your personal income, determines eligibility. You will still need to provide standard items like an ID, entity documents, proof of insurance, and reserve verification.",
      },
      {
        question: "Can I finance a short-term rental (Airbnb) with a DSCR loan?",
        answer:
          "Yes. We offer DSCR loans for short-term rental properties using projected income from third-party analytics platforms (such as AirDNA) or 12 months of documented booking revenue from Airbnb, VRBO, or similar platforms. The projected or historical income is used in place of a traditional lease to calculate the DSCR ratio. Some rate or LTV adjustments may apply compared to long-term rental properties.",
      },
      {
        question: "What is the minimum down payment for a DSCR purchase loan?",
        answer:
          "The minimum down payment is 20% of the purchase price for properties with a DSCR of 1.25 or higher. For properties with lower DSCR ratios (between 1.0 and 1.24), a 25% down payment may be required. Properties with DSCR ratios below 1.0 typically require 25% to 30% down. A larger down payment also qualifies you for a lower interest rate, so putting down 25% to 30% can meaningfully improve your borrowing terms.",
      },
      {
        question: "What is the maximum LTV for AssetLift DSCR loans?",
        answer:
          "Qualifying DSCR purchase loans may reach up to 85% LTV, and qualifying DSCR cash-out refinances may reach up to 80% LTV. Maximum leverage depends on credit score, DSCR ratio, property type, value, rent support, reserves, seasoning, and current program guidelines.",
      },
      {
        question: "Is there a maximum number of DSCR loans I can have?",
        answer:
          "No. Unlike conventional mortgages, which are subject to the Fannie Mae 10-property limit, our DSCR program has no cap on the number of loans per borrower. You can finance 5, 25, or 100 properties with AssetLift Lending, and each is underwritten independently based on its own cash flow. This makes DSCR lending the only realistic option for investors building large rental portfolios.",
      },
      {
        question: "Can I use a DSCR loan for a property that needs minor repairs?",
        answer:
          "DSCR loans are designed for properties that are in rent-ready condition. Minor cosmetic issues (paint, landscaping, appliance replacements) are generally acceptable as long as the property is habitable and can generate rental income immediately after closing. Properties that require significant structural, mechanical, or safety repairs should be financed with a fix-and-flip or rehab loan first, then refinanced into a DSCR loan after the work is complete.",
      },
    ],
  },
  {
    slug: "commercial-lending",
    title: "Commercial Lending - Flexible Financing for Investment Properties",
    description:
      "AssetLift Lending reviews commercial lending scenarios for investors seeking acquisition, refinance, bridge, and transitional financing on commercial or mixed-use investment properties.",
    heroTitle: "Commercial Lending",
    heroSubtitle:
      "Finance commercial and mixed-use investment properties with a structure built around the asset, the business plan, and the exit.",
    overview:
      "Commercial lending is built for investment properties that do not fit neatly into a standard residential loan box. These scenarios can include mixed-use buildings, small commercial assets, multifamily properties beyond residential program limits, and business-purpose real estate where the underwriting needs to focus on collateral value, income, tenancy, and exit strategy.\n\nAssetLift Lending reviews commercial lending requests for acquisitions, refinances, cash-out needs, bridge situations, and transitional assets. Some files may be funded directly and others may be placed with a capital partner when that creates the cleanest execution path. The goal is to understand the property, the borrower, and the payoff plan before forcing the deal into a generic structure.\n\nCommercial files vary more than residential investor loans, so final terms depend on property type, location, occupancy, net operating income, sponsor experience, valuation support, title, and the intended exit. Strong submissions usually include a rent roll, trailing operating statements, purchase contract or payoff statement, property photos, and a clear explanation of how the loan will be repaid.",
    keyStats: [
      { label: "Loan Purpose", value: "Purchase, refinance, bridge" },
      { label: "Property Types", value: "Commercial and mixed-use" },
      { label: "Structure", value: "Scenario-based" },
      { label: "Review Speed", value: "Fast scenario review" },
      { label: "Execution", value: "Direct or partner placed" },
    ],
    features: [
      {
        title: "Commercial and Mixed-Use Review",
        description:
          "Submit commercial, mixed-use, and larger investment-property scenarios for a practical review of leverage, collateral, income, and exit fit.",
      },
      {
        title: "Acquisition and Refinance Options",
        description:
          "Commercial lending can support new purchases, rate-and-term refinances, cash-out requests, and short-term payoff needs depending on the property and sponsor profile.",
      },
      {
        title: "Bridge and Transitional Capital",
        description:
          "For assets that need lease-up, stabilization, repairs, or timing flexibility, commercial bridge structures can provide room to execute before permanent financing or sale.",
      },
      {
        title: "Capital Partner Placement",
        description:
          "When a file is better served by a specialized commercial lender, AssetLift can route the scenario through lending partners rather than forcing it into a residential program.",
      },
      {
        title: "Asset-Based Underwriting",
        description:
          "Commercial files are reviewed around property value, income, borrower experience, liquidity, marketability, and the credibility of the repayment plan.",
      },
    ],
    eligibility: [
      {
        requirement: "Business Purpose",
        detail:
          "The property must be for investment or business-purpose use. AssetLift Lending does not offer consumer owner-occupied residential mortgages.",
      },
      {
        requirement: "Property Information",
        detail:
          "Borrowers should provide the property address, asset type, occupancy, rent roll if applicable, purchase price or payoff amount, and requested loan amount.",
      },
      {
        requirement: "Income and Valuation Support",
        detail:
          "For income-producing assets, operating statements, leases, rent rolls, and market support help determine whether the requested structure is realistic.",
      },
      {
        requirement: "Sponsor Strength",
        detail:
          "Borrower experience, liquidity, credit profile, entity documents, and ownership structure all affect the available commercial lending path.",
      },
      {
        requirement: "Defined Exit",
        detail:
          "Commercial bridge and transitional files need a credible exit, such as refinance, sale, lease-up, stabilization, or payoff from another transaction.",
      },
    ],
    process: [
      {
        step: "Submit the Scenario",
        description:
          "Send the property address, asset type, requested loan amount, purchase or refinance details, and a short summary of the business plan.",
      },
      {
        step: "Initial Fit Review",
        description:
          "AssetLift reviews collateral, location, income, sponsor profile, and exit strategy to determine whether the file fits direct lending or a capital partner path.",
      },
      {
        step: "Term Direction",
        description:
          "If the scenario is workable, you receive direction on likely structure, documentation needs, valuation requirements, and timing.",
      },
      {
        step: "Underwriting and Closing",
        description:
          "The file moves through valuation, title, entity, insurance, income, and borrower review before final terms and closing.",
      },
    ],
    useCases: [
      {
        title: "Mixed-Use Building Acquisition",
        description:
          "Purchase a property with both commercial and residential income where the structure needs to account for lease mix, occupancy, and market value.",
      },
      {
        title: "Commercial Bridge Financing",
        description:
          "Use short-term capital to acquire or refinance an asset while completing lease-up, stabilization, repairs, or a planned sale.",
      },
      {
        title: "Cash-Out Refinance",
        description:
          "Access equity from a commercial or mixed-use investment property when the asset, income, and sponsor profile support the requested leverage.",
      },
      {
        title: "Partner-Placed Commercial Loan",
        description:
          "Route specialized commercial scenarios to capital partners when a dedicated commercial lender is the most reliable execution path.",
      },
    ],
    faqs: [
      {
        question: "What property types fit Commercial Lending?",
        answer:
          "Commercial lending may fit mixed-use buildings, small commercial properties, multifamily assets outside standard residential program limits, and other business-purpose investment real estate. Final fit depends on the asset, market, income, borrower, and requested structure.",
      },
      {
        question: "Are commercial loans funded directly by AssetLift?",
        answer:
          "Some scenarios may be handled directly and others may be brokered or placed with capital partners. AssetLift routes the file through the path that appears most workable for the property and borrower profile.",
      },
      {
        question: "What documents should I send for a commercial scenario?",
        answer:
          "Start with the property address, purchase contract or payoff statement, requested loan amount, rent roll, leases if available, trailing operating statements, property photos, and a summary of the exit plan.",
      },
      {
        question: "Can Commercial Lending be used for bridge financing?",
        answer:
          "Yes. Commercial lending can include short-term bridge structures for acquisition, refinance, stabilization, lease-up, partner buyout, or timing-driven payoff needs when the exit is credible.",
      },
      {
        question: "How are commercial loan terms determined?",
        answer:
          "Terms are scenario-based and depend on property type, location, loan-to-value, net operating income, borrower experience, liquidity, credit profile, title, valuation, and the planned exit.",
      },
    ],
  },
  {
    slug: "bridge",
    title: "Bridge Loans for Real Estate Investors - Short-Term Capital When You Need It Most",
    description:
      "AssetLift Lending offers bridge loans for real estate investors who need fast, flexible capital to close acquisitions, reposition assets, or bridge the gap between transactions. Close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.",
    heroTitle: "Bridge Loans",
    heroSubtitle:
      "Bridge the gap between opportunity and long-term financing. Close fast, act decisively, and execute your strategy without waiting on slow capital.",
    overview:
      "Bridge loans are short-term financing instruments that provide immediate capital to real estate investors who need to move quickly, cannot wait for conventional underwriting timelines, or face situations where traditional lending products do not apply. The term \"bridge\" refers to the loan's purpose: it bridges the gap between an immediate capital need and a longer-term financing solution or asset disposition. Bridge loans are not a permanent financing tool. They are a tactical weapon deployed when speed, certainty, and flexibility matter more than cost.\n\nThe scenarios that call for bridge loans are varied and time-sensitive. An investor may need to close on a property in 5 days to beat a competing offer. A borrower's conventional loan may fall through 48 hours before closing, and they need replacement capital to avoid losing their earnest money. A property owner may need to pull equity from an existing asset to fund a down payment on a new acquisition before the first property sells. In each case, a bridge loan solves a problem that no other financing product can address within the required timeframe.\n\nAssetLift Lending's bridge loan program is built for exactly these situations. We offer loan terms from 3 to 24 months, with many files closing in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity. Our bridge loans finance acquisitions, refinances, cash-out equity extraction, and partner buyouts on residential and small commercial properties. Loan amounts range from $100,000 to $3 million, with leverage up to 75% of the as-is property value.\n\nThe cost of a bridge loan is higher than a conventional mortgage, but the value it provides is measured in deals saved, opportunities captured, and financial flexibility preserved. For investors operating in competitive markets where the best deals go under contract within hours, having access to fast, reliable bridge capital is not a luxury. It is a requirement for staying in the game.",
    keyStats: [
      { label: "Loan-to-Value (As-Is)", value: "Up to 75%" },
      { label: "Loan Term", value: "3 to 24 months" },
      { label: "Closing Speed", value: "As fast as 5 business days" },
      { label: "Loan Amount Range", value: "$100,000 to $3,000,000" },
      { label: "Interest Rates Starting At", value: "10%" },
    ],
    features: [
      {
        title: "Rapid Closing Capability",
        description:
          "We close many bridge loans in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity. This speed allows you to make competitive offers with short due diligence periods and close before other buyers can even secure financing.",
      },
      {
        title: "Flexible Collateral Types",
        description:
          "Bridge loans from AssetLift Lending can be secured by single-family homes, multifamily properties (2-8 units), mixed-use buildings, and small commercial properties. We also consider cross-collateralization, where equity in a property you already own provides additional security for the bridge loan on a new acquisition.",
      },
      {
        title: "Interest-Only Payments",
        description:
          "All bridge loans feature interest-only monthly payments, minimizing your carrying costs during the hold period. You are not paying down principal on a loan designed to be repaid in full within months. This structure preserves your cash flow and keeps more capital available for renovation, operating expenses, or reserves.",
      },
      {
        title: "Multiple Exit Strategy Support",
        description:
          "Whether your exit plan is a property sale, a refinance into a DSCR or conventional loan, or a cash infusion from another source, our bridge loans are structured to accommodate any legitimate repayment path. We work with you at origination to identify and document your planned exit, and we provide guidance on timing your transition to permanent financing.",
      },
      {
        title: "No Prepayment Penalty",
        description:
          "Repay the bridge loan at any time without penalty. If your property sells in month 2 of a 12-month loan, you pay interest only for the two months you held the capital. This no-penalty structure ensures that fast exits are rewarded rather than penalized, aligning the lender's incentives with the borrower's goal of a quick, profitable resolution.",
      },
    ],
    eligibility: [
      {
        requirement: "Property Value and Equity",
        detail:
          "The subject property must appraise for a value that supports the requested loan amount at or below 75% loan-to-value. For cross-collateralized loans, the combined LTV across all pledged properties must not exceed 65%. A current appraisal or broker price opinion will be ordered as part of the underwriting process.",
      },
      {
        requirement: "Defined Exit Strategy",
        detail:
          "Every bridge loan requires a clearly articulated exit strategy documented at origination. Acceptable exits include property sale (with comparable sales data supporting the anticipated sale price), refinance (with preliminary qualification from the take-out lender), or payoff from proceeds of another closing. Bridge loans without a credible exit plan will not be approved.",
      },
      {
        requirement: "Minimum Credit Score",
        detail:
          "A FICO score of 620 or higher is required. Bridge loan underwriting places less emphasis on credit score than conventional lending, but a score below 650 may result in reduced leverage or higher pricing. Recent bankruptcies (within 2 years) or active foreclosures may disqualify the borrower regardless of the current score.",
      },
      {
        requirement: "Liquidity and Reserves",
        detail:
          "Borrowers must demonstrate liquid assets sufficient to cover 6 to 12 months of interest payments at closing. Bridge loans are short-term instruments with inherent timing risk, and adequate reserves ensure that the borrower can service the loan even if the exit takes longer than projected. Acceptable reserve sources include bank accounts, investment accounts, and documented lines of credit.",
      },
      {
        requirement: "Real Estate Investment Experience",
        detail:
          "While bridge loans are available to investors at all experience levels, borrowers with a demonstrated track record of successful real estate transactions will receive better pricing and higher leverage. First-time investors applying for bridge loans should present a detailed business plan, a strong exit strategy, and ideally a mentor or partner with relevant experience.",
      },
    ],
    process: [
      {
        step: "Initial Inquiry and Scenario Review",
        description:
          "Contact our bridge loan team with the details of your situation: the property address, your capital need, the timeline, and your planned exit strategy. We provide a preliminary indication of terms within hours, not days. For time-critical deals, we can issue a term sheet the same day you contact us, allowing you to present a financed offer to the seller immediately.",
      },
      {
        step: "Term Sheet and Commitment",
        description:
          "Once you accept the preliminary terms, we issue a formal commitment letter outlining the loan amount, interest rate, term, fees, and conditions. The commitment holds your terms for 30 days while underwriting and closing are completed. A commitment deposit may be required for loans above $500,000, which is credited toward closing costs at funding.",
      },
      {
        step: "Expedited Underwriting",
        description:
          "Our bridge loan underwriting is built for speed. We order a rush appraisal or desktop valuation, pull title, verify insurance, and review borrower credentials in parallel rather than sequentially. Most bridge loans clear underwriting within 2 to 5 business days. For repeat borrowers with pre-approved profiles, underwriting can be completed in 24 to 48 hours.",
      },
      {
        step: "Closing and Funding",
        description:
          "We coordinate directly with the title company or closing attorney to prepare documents, schedule signing, and wire funds. Bridge loan closings are streamlined with fewer documents than conventional transactions. Funds are wired to the title company on the day of closing, and you take possession of the property immediately. Many files close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.",
      },
    ],
    useCases: [
      {
        title: "Time-Sensitive Acquisitions",
        description:
          "When a deal requires you to close in days rather than weeks, a bridge loan is the only viable option. Off-market deals, auction purchases, estate sales, and bank-owned property dispositions frequently come with compressed timelines that eliminate conventional financing. A bridge loan ensures you can commit to the deal with confidence and close on the seller's timeline.",
      },
      {
        title: "Gap Financing Between Transactions",
        description:
          "You are selling one property and buying another, but the timings do not align. A bridge loan allows you to close on the purchase before the sale is finalized, using equity in the property being sold or the property being purchased as collateral. When the sale closes, you repay the bridge loan with the proceeds, completing the transition without a gap in ownership.",
      },
      {
        title: "Rescue Capital for Failed Conventional Closings",
        description:
          "Conventional loan approvals fall through more often than borrowers expect, sometimes days before the scheduled closing. When a bank pulls approval at the last minute due to an appraisal issue, underwriting condition, or policy change, a bridge loan can step in to save the deal. We have closed rescue bridge loans in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity, to help borrowers avoid losing earnest money and the deal itself.",
      },
      {
        title: "Equity Extraction for Down Payments",
        description:
          "Pull equity from a property you already own to fund the down payment on a new acquisition. Rather than waiting months for a conventional cash-out refinance, a bridge loan provides the capital in days. Once the new property is acquired and stabilized, you can refinance both properties into long-term loans and repay the bridge, having used speed and leverage to secure an opportunity that would otherwise have been lost.",
      },
    ],
    faqs: [
      {
        question: "How fast can AssetLift Lending actually close a bridge loan?",
        answer:
          "Many bridge files can close in as fast as 5 business days from application to funding, subject to underwriting, valuation, title, and file complexity. Borrowers with clean title, complete documentation, and a straightforward scenario are best positioned for the fastest execution. In every case, we structure the process to move as fast as your deal requires.",
      },
      {
        question: "What is the typical interest rate on a bridge loan?",
        answer:
          "Bridge loan interest rates at AssetLift Lending start at 10% and range up to 13% depending on the loan-to-value ratio, borrower experience, property type, and loan term. Bridge loans are priced higher than long-term products because they carry more risk and require significantly more operational resources to originate and manage on compressed timelines. However, because bridge loans are short-term (often repaid within 3 to 12 months), the total interest cost is manageable relative to the value of the deal they enable.",
      },
      {
        question: "Can I use a bridge loan to buy a property at auction?",
        answer:
          "Yes. Bridge loans are one of the best tools for auction purchases. We provide proof-of-funds letters that satisfy auction requirements and can fund the closing within the timeframe mandated by most auction houses (typically 7 to 30 days). If you regularly purchase at auction, establishing a pre-approved borrower profile with AssetLift Lending will allow you to move with maximum speed when the right property comes up for bid.",
      },
      {
        question: "What happens if I cannot repay the bridge loan by the maturity date?",
        answer:
          "If your exit strategy takes longer than anticipated, we offer loan extensions on a case-by-case basis, typically for 3 to 6 months, subject to an extension fee and evidence that the exit is still viable. We strongly encourage borrowers to have realistic timelines and backup exit plans. A bridge loan that matures without a clear path to repayment is a serious situation for both the borrower and the lender, which is why we underwrite the exit strategy as carefully as we underwrite the collateral.",
      },
      {
        question: "Do bridge loans require an appraisal?",
        answer:
          "Most bridge loans require either a full appraisal or a broker price opinion (BPO) to establish the property's current as-is value. For loans under $500,000 in well-documented markets, a BPO or desktop valuation may be sufficient, which can be completed in 2 to 3 days. For larger loans or properties in less liquid markets, a full appraisal is required and typically takes 5 to 7 days. Rush appraisals can often be completed in 2 to 3 days for an additional fee.",
      },
      {
        question: "Can I use a bridge loan to buy out a partner?",
        answer:
          "Yes. Partner buyouts are a common use case for bridge loans. If you co-own a property and need to purchase your partner's equity share, a bridge loan can provide the capital to complete the buyout immediately. You then refinance the property into a long-term loan under your sole ownership (or your entity's ownership) and repay the bridge. This is often faster and simpler than trying to arrange a conventional cash-out refinance to fund the buyout.",
      },
    ],
  },
];
