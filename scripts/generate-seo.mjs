/**
 * Daily SEO content generator.
 * Runs via GitHub Actions every day at 10 AM UTC.
 * Picks the next uncovered keyword, calls Gemini AI, and appends
 * a new blog post to lib/data/seo-scheduled-posts.json.
 *
 * Required: GEMINI_API_KEY environment variable (stored as a GitHub secret).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCHEDULED_PATH = path.join(__dirname, '../lib/data/seo-scheduled-posts.json');
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('GEMINI_API_KEY is not set. Add it to your GitHub repository secrets.');
  process.exit(1);
}

// ─── Keyword bank ──────────────────────────────────────────────────────────────
// Each entry: { slug, keyword, category }
// The script picks the first one whose slug is not already in the JSON file.
const KEYWORD_BANK = [
  { slug: 'cash-out-refinance-investment-property', keyword: 'cash out refinance investment property', category: 'DSCR Rental' },
  { slug: 'how-to-scale-rental-portfolio-dscr', keyword: 'how to scale a rental portfolio with DSCR loans', category: 'DSCR Rental' },
  { slug: 'hard-money-vs-dscr-loan-comparison', keyword: 'hard money loan vs DSCR loan comparison for investors', category: 'Hard Money' },
  { slug: 'investment-property-down-payment-guide', keyword: 'investment property down payment requirements 2026', category: 'Hard Money' },
  { slug: 'real-estate-investor-financing-options-2026', keyword: 'real estate investor financing options 2026 complete guide', category: 'Guide' },
  { slug: 'what-is-a-private-money-lender', keyword: 'what is a private money lender real estate investing', category: 'Hard Money' },
  { slug: 'hard-money-loan-for-condo-investment', keyword: 'hard money loan for condo investment property', category: 'Hard Money' },
  { slug: 'dscr-loan-minimum-credit-score', keyword: 'DSCR loan minimum credit score requirements', category: 'DSCR Rental' },
  { slug: 'how-to-calculate-arv-fix-and-flip', keyword: 'how to calculate ARV for fix and flip investments', category: 'Fix & Flip' },
  { slug: 'bridge-loan-vs-hard-money-loan', keyword: 'bridge loan vs hard money loan difference', category: 'Hard Money' },
  { slug: 'dscr-loan-refinance-rental-property', keyword: 'DSCR loan refinance rental property no income docs', category: 'DSCR Rental' },
  { slug: 'real-estate-investing-with-llc-guide', keyword: 'real estate investing with LLC complete guide for investors', category: 'Guide' },
  { slug: 'fix-and-flip-rehab-budget-guide', keyword: 'fix and flip rehab budget how to estimate renovation costs', category: 'Fix & Flip' },
  { slug: 'hard-money-loan-for-airbnb', keyword: 'hard money loan for Airbnb investment property', category: 'DSCR Rental' },
  { slug: 'construction-loan-draw-schedule', keyword: 'construction loan draw schedule how it works for investors', category: 'Construction' },
  { slug: 'single-family-vs-multifamily-investment', keyword: 'single family vs multifamily investment property financing', category: 'Guide' },
  { slug: 'private-lender-vs-hard-money-lender', keyword: 'private lender vs hard money lender difference', category: 'Hard Money' },
  { slug: 'dscr-loan-for-portfolio-landlords', keyword: 'DSCR loans for portfolio landlords multiple properties', category: 'DSCR Rental' },
  { slug: 'fix-and-flip-exit-strategies', keyword: 'fix and flip exit strategies sell vs rent vs refinance', category: 'Fix & Flip' },
  { slug: 'investment-property-insurance-guide', keyword: 'investment property insurance what investors need before closing', category: 'Guide' },
  { slug: 'hard-money-lender-prepayment-penalty', keyword: 'hard money loan prepayment penalty what investors should know', category: 'Hard Money' },
  { slug: 'brrrr-method-complete-guide-2026', keyword: 'BRRRR method complete guide buy rehab rent refinance repeat 2026', category: 'Fix & Flip' },
  { slug: 'dscr-loan-llc-vs-personal-name', keyword: 'DSCR loan LLC vs personal name which is better', category: 'DSCR Rental' },
  { slug: 'ground-up-construction-timeline-investors', keyword: 'ground up construction loan timeline what to expect', category: 'Construction' },
  { slug: 'real-estate-investor-credit-score-guide', keyword: 'credit score for real estate investor hard money DSCR requirements', category: 'Guide' },

  // Batch 2 — high-intent buyer/investor keywords
  { slug: 'hard-money-lender-no-income-verification', keyword: 'hard money lender no income verification real estate', category: 'Hard Money' },
  { slug: 'fix-and-flip-loan-bad-credit', keyword: 'fix and flip loan with bad credit options for investors', category: 'Fix & Flip' },
  { slug: 'dscr-loan-short-term-rental', keyword: 'DSCR loan for short term rental Airbnb Vrbo', category: 'DSCR Rental' },
  { slug: 'how-fast-can-you-close-hard-money-loan', keyword: 'how fast can you close a hard money loan timeline', category: 'Hard Money' },
  { slug: 'real-estate-syndication-financing', keyword: 'real estate syndication financing options for sponsors', category: 'Guide' },
  { slug: 'fix-and-flip-profit-margins-2026', keyword: 'fix and flip profit margins what to expect in 2026', category: 'Fix & Flip' },
  { slug: 'interest-only-hard-money-loan', keyword: 'interest only hard money loan how it works for investors', category: 'Hard Money' },
  { slug: 'dscr-loan-multifamily-property', keyword: 'DSCR loan for multifamily property 2-4 units', category: 'DSCR Rental' },
  { slug: 'after-repair-value-lender-appraisal', keyword: 'how lenders calculate after repair value for fix and flip', category: 'Fix & Flip' },
  { slug: 'bridge-loan-for-new-construction', keyword: 'bridge loan for new construction project investors guide', category: 'Construction' },
  { slug: 'hard-money-loan-points-fees-explained', keyword: 'hard money loan points and fees explained for investors', category: 'Hard Money' },
  { slug: 'rental-property-cash-flow-calculator-guide', keyword: 'rental property cash flow analysis real estate investors', category: 'DSCR Rental' },
  { slug: 'ground-up-construction-loan-requirements', keyword: 'ground up construction loan requirements for investors', category: 'Construction' },
  { slug: 'first-time-real-estate-investor-loan', keyword: 'first time real estate investor loan options hard money', category: 'Hard Money' },
  { slug: 'how-to-find-off-market-deals', keyword: 'how to find off market real estate deals for investors', category: 'Fix & Flip' },
  { slug: 'dscr-loan-vs-conventional-rental-mortgage', keyword: 'DSCR loan vs conventional mortgage for rental property', category: 'DSCR Rental' },
  { slug: 'hard-money-loan-extension-options', keyword: 'hard money loan extension options when you need more time', category: 'Hard Money' },
  { slug: 'real-estate-investor-entity-structure', keyword: 'real estate investor LLC vs S-corp entity structure guide', category: 'Guide' },
  { slug: 'fix-and-flip-contractors-guide', keyword: 'how to manage contractors on a fix and flip project', category: 'Fix & Flip' },
  { slug: 'dscr-loan-vacation-rental-property', keyword: 'DSCR loan for vacation rental property financing', category: 'DSCR Rental' },
  { slug: 'construction-loan-vs-hard-money-loan', keyword: 'construction loan vs hard money loan which is better', category: 'Construction' },
  { slug: 'real-estate-market-analysis-investors', keyword: 'how to analyze a real estate market before investing', category: 'Guide' },
  { slug: 'hard-money-lender-red-flags', keyword: 'hard money lender red flags what to avoid', category: 'Hard Money' },
  { slug: 'fix-and-flip-holding-costs-guide', keyword: 'fix and flip holding costs how to calculate and minimize', category: 'Fix & Flip' },
  { slug: 'dscr-loan-seasoning-requirements', keyword: 'DSCR loan seasoning requirements ownership period', category: 'DSCR Rental' },
  { slug: 'private-money-loan-terms-negotiation', keyword: 'how to negotiate private money loan terms for investors', category: 'Hard Money' },
  { slug: 'real-estate-portfolio-growth-strategy', keyword: 'how to grow a real estate portfolio from 1 to 10 properties', category: 'Guide' },
  { slug: 'fix-and-flip-wholesaling-difference', keyword: 'fix and flip vs wholesaling real estate which is better', category: 'Fix & Flip' },
  { slug: 'hard-money-loan-apartment-building', keyword: 'hard money loan for apartment building small multifamily', category: 'Hard Money' },
  { slug: 'dscr-loan-self-employed-investor', keyword: 'DSCR loan for self employed real estate investor', category: 'DSCR Rental' },

  // Added 2026-09-17, after the bank ran dry and publishing stalled for seven
  // weeks. These deliberately avoid head terms like "hard money loans", which
  // established lenders hold: each one is a specific question a borrower asks
  // when they already intend to transact, so the traffic is lower but converts.
  { slug: 'hard-money-loan-for-auction-property', keyword: 'hard money loan to buy a foreclosure at auction', category: 'Hard Money' },
  { slug: 'proof-of-funds-letter-cash-offer', keyword: 'how to get a proof of funds letter for a cash offer', category: 'Hard Money' },
  { slug: 'hard-money-loan-for-land-purchase', keyword: 'hard money loan for raw land purchase', category: 'Hard Money' },
  { slug: 'transactional-funding-double-closing', keyword: 'transactional funding for a double closing explained', category: 'Hard Money' },
  { slug: 'hard-money-loan-second-position', keyword: 'second position hard money loan for investors', category: 'Hard Money' },
  { slug: 'blanket-loan-cross-collateralization', keyword: 'blanket loan cross collateralization for rental portfolios', category: 'Hard Money' },
  { slug: 'hard-money-loan-personal-guarantee', keyword: 'when does a hard money lender require a personal guarantee', category: 'Hard Money' },
  { slug: 'hard-money-loan-appraisal-who-pays', keyword: 'who pays for the appraisal on a hard money loan', category: 'Hard Money' },
  { slug: 'interest-reserve-hard-money-loan', keyword: 'how an interest reserve works on a hard money loan', category: 'Hard Money' },
  { slug: 'hard-money-loan-mixed-use-property', keyword: 'hard money loan for a mixed use property', category: 'Hard Money' },
  { slug: 'heloc-vs-hard-money-loan', keyword: 'HELOC vs hard money loan for real estate investors', category: 'Hard Money' },
  { slug: 'hard-money-loan-for-1031-exchange', keyword: 'using a hard money loan in a 1031 exchange', category: 'Hard Money' },
  { slug: 'commercial-hard-money-loan-guide', keyword: 'commercial hard money loan requirements and terms', category: 'Hard Money' },
  { slug: 'hard-money-loan-default-what-happens', keyword: 'what happens if you default on a hard money loan', category: 'Hard Money' },

  { slug: 'dscr-loan-foreign-national', keyword: 'DSCR loan for foreign national investors', category: 'DSCR Rental' },
  { slug: 'dscr-loan-itin-borrower', keyword: 'DSCR loan for an ITIN borrower', category: 'DSCR Rental' },
  { slug: 'dscr-loan-duplex-triplex-fourplex', keyword: 'DSCR loan for a duplex triplex or fourplex', category: 'DSCR Rental' },
  { slug: 'dscr-loan-prepayment-penalty-structures', keyword: 'DSCR loan prepayment penalty structures explained', category: 'DSCR Rental' },
  { slug: 'rent-schedule-1007-appraisal', keyword: 'form 1007 rent schedule appraisal for DSCR loans', category: 'DSCR Rental' },
  { slug: 'dscr-loan-minimum-loan-amount', keyword: 'DSCR loan minimum loan amount small balance rentals', category: 'DSCR Rental' },
  { slug: 'dscr-loan-vacant-lease-up-property', keyword: 'DSCR loan on a vacant or lease up rental property', category: 'DSCR Rental' },
  { slug: 'how-to-improve-dscr-ratio', keyword: 'how to improve your DSCR ratio before applying', category: 'DSCR Rental' },

  { slug: 'what-happens-if-your-flip-doesnt-sell', keyword: 'what happens if your flip does not sell in time', category: 'Fix & Flip' },
  { slug: 'fix-and-flip-taxes-dealer-status', keyword: 'fix and flip taxes and dealer status explained', category: 'Fix & Flip' },
  { slug: 'gap-funding-fix-and-flip', keyword: 'gap funding for a fix and flip deal', category: 'Fix & Flip' },
  { slug: 'title-seasoning-flip-resale', keyword: 'title seasoning rules when reselling a flip', category: 'Fix & Flip' },
  { slug: 'fix-and-flip-draw-inspection-process', keyword: 'fix and flip draw inspection process step by step', category: 'Fix & Flip' },
  { slug: 'flip-to-rental-conversion-refinance', keyword: 'converting a flip into a rental and refinancing', category: 'Fix & Flip' },

  { slug: 'bridge-loan-to-avoid-maturity-default', keyword: 'using a bridge loan to pay off a maturing loan', category: 'Bridge Loans' },
  { slug: 'bridge-loan-for-partnership-buyout', keyword: 'bridge loan for a real estate partnership buyout', category: 'Bridge Loans' },

  { slug: 'construction-loan-cost-overrun-options', keyword: 'what to do about a construction loan cost overrun', category: 'Construction' },
  { slug: 'builders-risk-insurance-construction-loan', keyword: 'builders risk insurance requirements for a construction loan', category: 'Construction' },
  { slug: 'spec-home-construction-financing', keyword: 'spec home construction financing for builders', category: 'Construction' },

  { slug: 'how-to-read-a-loan-term-sheet', keyword: 'how to read a hard money loan term sheet', category: 'Guide' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function todayISO() {
  return new Date().toISOString();
}

async function callGemini(prompt, attempt = 1) {
  const MAX_ATTEMPTS = 4;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        // Disable thinking so the budget goes to the article JSON itself
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    // Rate limits and transient server errors: wait and retry
    if ((res.status === 429 || res.status >= 500) && attempt < MAX_ATTEMPTS) {
      const retryMatch = err.match(/"retryDelay":\s*"(\d+)s"/);
      const delaySec = retryMatch ? Number(retryMatch[1]) + 5 : 60 * attempt;
      console.log(`Gemini ${res.status} — retrying in ${delaySec}s (attempt ${attempt + 1}/${MAX_ATTEMPTS})`);
      await new Promise(r => setTimeout(r, delaySec * 1000));
      return callGemini(prompt, attempt + 1);
    }
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

// ─── Prompt ────────────────────────────────────────────────────────────────────

function buildPrompt(entry) {
  return `You are an expert content writer for AssetLift Lending (assetliftlending.com), a mortgage brokerage that provides hard money loans, DSCR loans, fix-and-flip loans, bridge loans, and ground-up construction financing for real estate investors across 46 U.S. states.

Write a comprehensive, authoritative blog post targeting the keyword: "${entry.keyword}"

The post must be written for real estate investors who are experienced or semi-experienced. Use specific numbers, percentages, and real-world examples. Professional but direct tone — like an experienced investor talking to another investor.

Return ONLY a valid JSON object in exactly this format (no markdown, no code blocks, just raw JSON):

{
  "slug": "${entry.slug}",
  "title": "[compelling SEO title including the target keyword, under 65 characters]",
  "description": "[meta description targeting the keyword, under 155 characters]",
  "publishedAt": "${todayISO()}",
  "author": "AssetLift Team",
  "authorRole": "Lending Specialists",
  "readTime": "[X min read]",
  "category": "${entry.category}",
  "tags": ["[tag1]", "[tag2]", "[tag3]", "[tag4]", "[tag5]"],
  "heroImage": "/blog-placeholder.jpg",
  "sections": [
    {
      "heading": "[section heading]",
      "content": "[150-250 words of substantive content with specific numbers and examples]"
    },
    {
      "heading": "[section heading]",
      "content": "[150-250 words]"
    },
    {
      "heading": "[section heading]",
      "content": "[150-250 words]"
    },
    {
      "heading": "[section heading]",
      "content": "[150-250 words]"
    }
  ],
  "faqs": [
    { "question": "[specific FAQ question]", "answer": "[2-4 sentence specific answer with numbers]" },
    { "question": "[specific FAQ question]", "answer": "[2-4 sentence specific answer]" },
    { "question": "[specific FAQ question]", "answer": "[2-4 sentence specific answer]" },
    { "question": "[specific FAQ question]", "answer": "[2-4 sentence specific answer]" }
  ]
}

Important rules:
- AssetLift covers 46 states (not Alaska, North Dakota, South Dakota, or Vermont)
- Minimum credit score: 660 for most programs
- Fix & Flip: up to 95% LTC on purchase, 100% rehab funded
- DSCR: up to 85% LTV for purchase, 80% LTV for cash-out refinances, rates from 5.85%
- Bridge: up to 80% LTV
- Loan range: $100K to $5M
- Never guarantee approval — always say "subject to underwriting"
- Never use markdown formatting in the content
- Be specific with numbers: percentages, dollar amounts, timelines
- Each section should be substantive, not generic filler`;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Load existing posts
  const existing = JSON.parse(fs.readFileSync(SCHEDULED_PATH, 'utf8'));
  const existingSlugs = new Set(existing.map(p => p.slug));

  // Also load the main blog-posts.ts slugs by scanning the file
  const blogPostsRaw = fs.readFileSync(path.join(__dirname, '../lib/data/blog-posts.ts'), 'utf8');
  const staticSlugMatches = blogPostsRaw.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  for (const m of staticSlugMatches) existingSlugs.add(m[1]);

  // Find next keyword to cover
  const target = KEYWORD_BANK.find(k => !existingSlugs.has(k.slug));

  if (!target) {
    // Exit non-zero so the workflow goes red and GitHub emails us. Exiting 0
    // here meant the job reported success while publishing nothing, and that
    // is exactly how this went unnoticed from 2026-07-28 to 2026-09-17.
    console.error(
      'KEYWORD_BANK is exhausted: every keyword already has a post, so no ' +
        'content can be generated. Publishing is STOPPED until new keywords ' +
        'are added to KEYWORD_BANK in scripts/generate-seo.mjs.',
    );
    process.exit(1);
  }

  // Warn before it runs dry, so the bank can be topped up without a red run.
  const remaining = KEYWORD_BANK.filter(k => !existingSlugs.has(k.slug)).length;
  if (remaining <= 7) {
    console.warn(
      `WARNING: only ${remaining} unused keyword(s) left in KEYWORD_BANK. ` +
        'Top it up soon or daily publishing will stop.',
    );
  }

  console.log(`Generating post for: "${target.keyword}" (slug: ${target.slug})`);

  // Call Gemini
  const raw = await callGemini(buildPrompt(target));

  // Parse JSON — strip any accidental markdown fences
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();

  let post;
  try {
    post = JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse Gemini response as JSON:', e.message);
    console.error('Raw response:', raw.slice(0, 500));
    process.exit(1);
  }

  // Basic validation
  if (!post.slug || !post.title || !Array.isArray(post.sections) || post.sections.length < 3) {
    console.error('Generated post missing required fields. Skipping.');
    console.error('Post:', JSON.stringify(post, null, 2).slice(0, 500));
    process.exit(1);
  }

  // Enforce meta description limit (155 chars) — trim at a word boundary
  if (typeof post.description === 'string' && post.description.length > 155) {
    const cut = post.description.slice(0, 152);
    post.description = cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]?$/, '') + '...';
    console.log(`Trimmed meta description to ${post.description.length} chars`);
  }

  // Append and save
  existing.push(post);
  fs.writeFileSync(SCHEDULED_PATH, JSON.stringify(existing, null, 2));

  console.log(`✓ Added post: "${post.title}"`);
  console.log(`  Slug: ${post.slug}`);
  console.log(`  Sections: ${post.sections.length}`);
  console.log(`  FAQs: ${post.faqs?.length ?? 0}`);
}

main().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
