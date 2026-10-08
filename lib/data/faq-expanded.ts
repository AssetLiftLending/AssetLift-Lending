import { PROGRAM_TERMS } from "./program-terms";

export interface FAQCategory {
  category: string;
  items: Array<{ question: string; answer: string }>;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    category: "General",
    items: [
      {
        question: "What is AssetLift Lending?",
        answer: "AssetLift Lending is a business-purpose real estate investment financing platform. We work with borrowers on fix and flip, ground-up construction, DSCR rental, and bridge scenarios for non-owner-occupied investment properties across 46 states. Depending on the file, a deal may be funded directly or placed with a capital partner."
      },
      {
        question: "What states do you lend in?",
        answer: "We lend in 46 U.S. states. We currently do not operate in Alaska, North Dakota, South Dakota, or Vermont. We are heavily focused on high-growth urban and suburban markets."
      },
      {
        question: "Are you a direct lender?",
        answer: "AssetLift Lending is a private lender. We fund loans with our own capital and with the backing of our capital partners, depending on the program, market, borrower profile, and file. Your loan documents identify the lender of record and funding source."
      },
      {
        question: "Do you work with mortgage brokers?",
        answer: "Yes, we accept deals from qualified mortgage brokers and loan officers. If you are a broker, contact us about submitting a deal."
      },
    ],
  },
  {
    category: "Loan Programs",
    items: [
      {
        question: "What types of loans do you offer?",
        answer: "We offer four main loan programs: Fix & Flip loans (up to 95% LTC on the purchase), Ground-Up Construction loans (up to 90% LTC), DSCR Rental loans (up to 85% LTV with 30-year terms), and Bridge loans (up to 80% LTV with quick closings)."
      },
      {
        question: "What is the minimum and maximum loan amount?",
        answer: "Our minimum loan amount is $100,000 and our standard maximum is $5,000,000 per asset. For larger portfolio deals exceeding $5MM, we can facilitate institutional-grade funding through our capital partners."
      },
      {
        question: "What types of properties do you finance?",
        answer: "We finance non-owner occupied residential investment properties including single-family homes, 2-4 unit multifamily, condos, and townhomes. We do not finance owner-occupied properties, raw land (without a construction plan), or commercial properties."
      },
      {
        question: "Do you fund 100% of rehab costs?",
        answer: "Yes, on our Fix & Flip program we can fund up to 100% of rehab costs, held in escrow and disbursed in draws as work is completed. You only pay interest on funds that have been drawn."
      },
      {
        question: "What is a DSCR loan?",
        answer: "DSCR stands for Debt Service Coverage Ratio. It's a loan qualification method that uses the property's rental income instead of your personal income. If the property's rent covers the mortgage payment (typically 1.0x or higher), you can qualify regardless of personal W-2 income."
      },
      {
        question: "What are your interest rates?",
        answer: `Rates vary by program, leverage, execution path, experience, and credit profile. Fix and flip rates start as low as ${PROGRAM_TERMS.fixAndFlip.startingRate}, and DSCR rental rates start as low as 5.85% for qualifying scenarios. Contact us for a personalized quote based on your specific deal.`
      },
    ],
  },
  {
    category: "Qualification & Requirements",
    items: [
      {
        question: "What credit score do I need?",
        answer: "We require a minimum credit score of 660 for most programs. Borrowers with scores above 720 may qualify for better rates and higher leverage. We look at the overall borrower profile, not just the score."
      },
      {
        question: "Do you require real estate investing experience?",
        answer: "Experience is preferred but not always required. Seasoned investors with a track record may qualify for higher leverage and better terms. First-time investors can qualify with slightly reduced leverage and additional reserves."
      },
      {
        question: "Do you require personal guarantees?",
        answer: "Yes, we typically require a full personal guarantee from all members with 20%+ ownership in the borrowing entity. This is standard in the private lending industry and allows us to offer competitive rates."
      },
      {
        question: "Can I borrow as an LLC or corporation?",
        answer: "Yes, in fact we require it. All loans are made to business entities (LLC, LP, Corp). If you don't have one, you'll need to form an entity before closing. We can guide you through the process."
      },
      {
        question: "Do you require an appraisal?",
        answer: "For fix & flip and construction loans, we typically use a BPO (Broker Price Opinion) or desktop valuation for faster closings. For DSCR rental loans, a full appraisal is usually required. In some cases, we accept recent appraisals from other lenders."
      },
      {
        question: "How much down payment do I need?",
        answer: "Down payment requirements vary by program: Fix & Flip requires as little as 5% of the purchase price on qualifying scenarios, Ground-Up Construction requires 10% (at 90% LTC), DSCR Rental requires as little as 15% (at 85% LTV), and Bridge requires 20% (at 80% LTV)."
      },
    ],
  },
  {
    category: "Process & Timeline",
    items: [
      {
        question: "How fast can you close a loan?",
        answer: "Many deals can close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity. Some programs and more complex files may take longer."
      },
      {
        question: "What is your application process?",
        answer: "Step 1: Submit your deal details through our online form or call us. Step 2: We get back to you within 24 hours, usually within a few hours. Step 3: If you move forward, we order valuations and begin underwriting. Step 4: If approved, the loan proceeds through the applicable lending or partner-funding channel and may close in as fast as 5 business days on many files."
      },
      {
        question: "What documents do you need?",
        answer: "Basic requirements include: entity documents (LLC operating agreement, articles), government-issued ID, purchase contract or proof of ownership, scope of work and budget (for rehab/construction), proof of insurance, and bank statements showing reserves."
      },
      {
        question: "Do you charge origination fees?",
        answer: "Yes, origination fees typically range from 1-3 points depending on the program, loan amount, and borrower profile. Fees are clearly disclosed upfront before you commit. There are no hidden fees or surprise charges."
      },
      {
        question: "Is there a prepayment penalty?",
        answer: "Fix & flip and bridge loans have no prepayment penalty - you can pay off the loan anytime. DSCR rental loans may have a prepayment penalty (typically a stepdown structure like 3-2-1) depending on the rate option you select."
      },
    ],
  },
  {
    category: "During the Loan",
    items: [
      {
        question: "How do construction draws work?",
        answer: "Rehab and construction funds are held in escrow and released in draws as work is completed. You request a draw, we send an inspector to verify the work, and funds are typically released within 2-3 business days. You only pay interest on funds that have been disbursed."
      },
      {
        question: "What happens if my project takes longer than expected?",
        answer: "We understand that construction timelines can shift. We offer extension options on our short-term loans (typically 3-6 months) for a fee. It's important to communicate early if you anticipate delays so we can work with you on a solution."
      },
      {
        question: "Can I refinance from a fix & flip loan to a DSCR loan?",
        answer: "Absolutely - this is a very common strategy known as BRRRR (Buy, Rehab, Rent, Refinance, Repeat). Once your rehab is complete and the property is rented, you may be able to refinance into a 30-year DSCR loan, subject to the property, appraisal, rent support, and the actual execution path."
      },
    ],
  },
];

export const ALL_FAQS = FAQ_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category }))
);
