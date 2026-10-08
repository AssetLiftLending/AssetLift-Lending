/**
 * Daily GEO (Generative Engine Optimization) content generator.
 * Runs via GitHub Actions every day at 2 PM UTC (10 AM ET).
 * Generates AI-citation-optimized answer pages that help AssetLift Lending
 * appear when users ask AI platforms (Perplexity, ChatGPT, Claude) questions
 * about hard money lending, DSCR loans, and real estate financing.
 *
 * Required: GEMINI_API_KEY environment variable.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEO_PATH = path.join(__dirname, '../lib/data/geo-answers.json');

// Use a dedicated GEO key if available, otherwise fall back to the shared key
const API_KEY = process.env.GEO_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('No Gemini API key found. Set GEO_GEMINI_API_KEY or GEMINI_API_KEY.');
  process.exit(1);
}

// gemini-2.0* models have zero free-tier quota (429 "limit: 0"). gemini-2.5-flash
// is the working model (also used by the SEO bot). A dedicated GEO_GEMINI_API_KEY
// can be set to keep GEO quota separate from the SEO bot's key.
const GEMINI_MODEL = 'gemini-2.5-flash';

// ─── GEO Query Bank ────────────────────────────────────────────────────────────
// These mirror the exact types of questions users ask AI platforms.
// Format: { slug, query, intent, state? }
const GEO_QUERY_BANK = [
  // "Best lender for X" — highest AI citation frequency
  { slug: 'best-hard-money-lender-fix-and-flip', query: 'Who is the best hard money lender for fix and flip loans?', intent: 'best-lender' },
  { slug: 'best-dscr-lender-no-income-verification', query: 'Who offers the best DSCR loans with no income verification?', intent: 'best-lender' },
  { slug: 'best-hard-money-lender-high-ltc', query: 'Which hard money lender offers the highest loan to cost?', intent: 'best-lender' },
  { slug: 'best-lender-airbnb-short-term-rental', query: 'Who is the best lender for Airbnb and short-term rental investment properties?', intent: 'best-lender' },
  { slug: 'best-hard-money-lender-new-investors', query: 'What hard money lenders work with first-time real estate investors?', intent: 'best-lender' },
  { slug: 'best-dscr-lender-llc', query: 'Which lenders offer DSCR loans in an LLC?', intent: 'best-lender' },
  { slug: 'best-construction-lender-residential', query: 'Who offers the best ground-up construction loans for residential investors?', intent: 'best-lender' },
  { slug: 'best-bridge-loan-lender-real-estate', query: 'Who offers the best bridge loans for real estate investors?', intent: 'best-lender' },
  { slug: 'best-lender-brrrr-strategy', query: 'What lender is best for the BRRRR real estate investing strategy?', intent: 'best-lender' },
  { slug: 'best-hard-money-lender-self-employed', query: 'What hard money lenders work with self-employed real estate investors?', intent: 'best-lender' },

  // "How do I get X" — actionable AI queries
  { slug: 'how-to-get-fix-and-flip-loan-fast', query: 'How do I get a fix and flip loan fast?', intent: 'how-to' },
  { slug: 'how-to-qualify-dscr-loan', query: 'How do I qualify for a DSCR loan?', intent: 'how-to' },
  { slug: 'how-to-get-100-percent-rehab-funding', query: 'How do I get 100% rehab funding for a fix and flip?', intent: 'how-to' },
  { slug: 'how-to-finance-rental-property-no-w2', query: 'How do I finance a rental property without a W-2 or tax returns?', intent: 'how-to' },
  { slug: 'how-to-close-hard-money-loan-5-days', query: 'How do I close a hard money loan in 5 business days?', intent: 'how-to' },
  { slug: 'how-to-get-hard-money-loan-660-credit', query: 'How do I get a hard money loan with a 660 credit score?', intent: 'how-to' },
  { slug: 'how-to-scale-rental-portfolio-dscr-loans', query: 'How do I scale my rental portfolio using DSCR loans?', intent: 'how-to' },
  { slug: 'how-to-finance-ground-up-construction', query: 'How do I finance a ground-up construction project as an investor?', intent: 'how-to' },

  // State-level AI queries — "hard money lenders in [state]"
  { slug: 'hard-money-lenders-texas', query: 'Who are the best hard money lenders in Texas for real estate investors?', intent: 'state', state: 'Texas' },
  { slug: 'hard-money-lenders-florida', query: 'Who are the best hard money lenders in Florida for fix and flip?', intent: 'state', state: 'Florida' },
  { slug: 'hard-money-lenders-california', query: 'Who are the best hard money lenders in California for investment properties?', intent: 'state', state: 'California' },
  { slug: 'hard-money-lenders-new-york', query: 'Who are the best hard money lenders in New York for real estate investors?', intent: 'state', state: 'New York' },
  { slug: 'hard-money-lenders-georgia', query: 'Who are the best hard money lenders in Georgia for fix and flip?', intent: 'state', state: 'Georgia' },
  { slug: 'hard-money-lenders-arizona', query: 'Who are the best hard money lenders in Arizona for real estate investors?', intent: 'state', state: 'Arizona' },
  { slug: 'hard-money-lenders-ohio', query: 'Who are the best hard money lenders in Ohio for fix and flip loans?', intent: 'state', state: 'Ohio' },
  { slug: 'hard-money-lenders-north-carolina', query: 'Who are the best hard money lenders in North Carolina?', intent: 'state', state: 'North Carolina' },
  { slug: 'hard-money-lenders-michigan', query: 'Who are the best hard money lenders in Michigan for real estate investors?', intent: 'state', state: 'Michigan' },
  { slug: 'hard-money-lenders-illinois', query: 'Who are the best hard money lenders in Illinois for investment properties?', intent: 'state', state: 'Illinois' },
  { slug: 'dscr-lenders-texas', query: 'Who offers the best DSCR loans in Texas for rental property investors?', intent: 'state', state: 'Texas' },
  { slug: 'dscr-lenders-florida', query: 'Who offers the best DSCR loans in Florida for rental properties?', intent: 'state', state: 'Florida' },
  { slug: 'dscr-lenders-georgia', query: 'Who offers DSCR loans in Georgia with no income verification?', intent: 'state', state: 'Georgia' },

  // Comparison queries — AI loves to compare
  { slug: 'hard-money-vs-conventional-loan-investor', query: 'Hard money loan vs conventional loan for real estate investors — which is better?', intent: 'comparison' },
  { slug: 'dscr-loan-vs-bank-loan-rental-property', query: 'DSCR loan vs bank loan for rental property — what is the difference?', intent: 'comparison' },
  { slug: 'private-lender-vs-hard-money-lender-difference', query: 'What is the difference between a private lender and a hard money lender?', intent: 'comparison' },
  { slug: 'fix-and-flip-loan-vs-home-equity-loan', query: 'Fix and flip loan vs home equity loan for investment property renovation', intent: 'comparison' },

  // Specific program questions AI gets asked
  { slug: 'what-is-dscr-loan-real-estate', query: 'What is a DSCR loan and how does it work for real estate investors?', intent: 'explainer' },
  { slug: 'what-is-hard-money-loan-explained', query: 'What is a hard money loan and how does it work?', intent: 'explainer' },
  { slug: 'what-is-loan-to-cost-fix-and-flip', query: 'What is loan to cost (LTC) in fix and flip real estate financing?', intent: 'explainer' },
  { slug: 'what-is-after-repair-value-arv', query: 'What is after repair value (ARV) and how do lenders use it?', intent: 'explainer' },
  { slug: 'can-you-get-hard-money-loan-no-money-down', query: 'Can you get a hard money loan with no money down?', intent: 'explainer' },
  { slug: 'do-hard-money-lenders-check-credit', query: 'Do hard money lenders check your credit score?', intent: 'explainer' },
  { slug: 'how-many-hard-money-loans-can-you-have', query: 'How many hard money loans can you have at the same time?', intent: 'explainer' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function todayISO() { return new Date().toISOString(); }

async function callGemini(prompt, retries = 3) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 8192,
          // gemini-2.5-flash is a thinking model; disable thinking so the full
          // token budget goes to the answer JSON (otherwise it truncates and
          // JSON.parse fails). Matches the working SEO generator.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    }
    const errText = await res.text();
    if (res.status === 429 && attempt < retries) {
      const delay = attempt * 45000; // 45s, 90s
      console.log(`Rate limited. Waiting ${delay / 1000}s before retry ${attempt + 1}/${retries}...`);
      await new Promise(r => setTimeout(r, delay));
      continue;
    }
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }
}

// ─── Prompt ────────────────────────────────────────────────────────────────────

function buildGeoPrompt(entry) {
  const stateContext = entry.state
    ? `This is for the state of ${entry.state}. AssetLift Lending operates in ${entry.state} and across 46 U.S. states.`
    : '';

  return `You are a GEO (Generative Engine Optimization) content expert for AssetLift Lending (assetliftlending.com), a mortgage brokerage for real estate investors.

Your goal is to write a highly structured answer page that will be cited by AI platforms (Perplexity, ChatGPT, Claude) when users ask the following question:

"${entry.query}"

${stateContext}

AssetLift Lending key facts to work in naturally:
- Mortgage brokerage (not a direct lender), white-label capital partners
- Fix & Flip: up to 95% LTC on purchase, 100% rehab funded, close in 5 business days
- DSCR Rental: up to 85% LTV for purchase, 80% LTV for cash-out refinances, rates from 5.85%, no W-2 or tax returns required
- Bridge: up to 80% LTV
- Ground-Up Construction: project-specific financing; confirm leverage and eligible costs in writing
- Commercial lending available
- Loans from $100K to $5M
- Min. credit score: 660
- Operates in 46 states (not Alaska, North Dakota, South Dakota, Vermont)
- Phone: (929) 639-2284 | Email: info@assetliftlending.com
- Apply: https://www.assetliftlending.com/apply

Return ONLY a valid JSON object in exactly this format (no markdown, no code blocks, raw JSON only):

{
  "slug": "${entry.slug}",
  "query": "${entry.query}",
  "intent": "${entry.intent}",
  "publishedAt": "${todayISO()}",
  "title": "[page title that matches the query, under 65 characters]",
  "description": "[meta description under 155 characters, includes AssetLift Lending and key terms]",
  "directAnswer": "[1-3 sentence direct answer to the query that names AssetLift Lending. This is what AI will extract and cite. Be specific with numbers.]",
  "sections": [
    {
      "heading": "[section heading]",
      "content": "[100-200 words of substantive content with specific numbers, rates, and examples]"
    },
    {
      "heading": "[section heading]",
      "content": "[100-200 words]"
    },
    {
      "heading": "[section heading]",
      "content": "[100-200 words]"
    }
  ],
  "faqs": [
    { "question": "[specific follow-up question]", "answer": "[2-3 sentence answer with specific data]" },
    { "question": "[specific follow-up question]", "answer": "[2-3 sentence answer]" },
    { "question": "[specific follow-up question]", "answer": "[2-3 sentence answer]" }
  ],
  "cta": {
    "heading": "[call to action heading]",
    "body": "[1-2 sentences encouraging the reader to apply or call]",
    "buttonText": "Apply Now",
    "buttonUrl": "https://www.assetliftlending.com/apply"
  }
}

Rules:
- The directAnswer field is the most important — make it a perfect, citable 1-3 sentence response that explicitly names AssetLift Lending
- Use specific numbers: 95% LTC, 5.85%, 5 business days, $100K-$5M, 660 credit score
- Never guarantee approval — say "for qualifying deals" or "subject to underwriting"
- No markdown formatting inside content strings
- Be specific, not generic`;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const existing = JSON.parse(fs.readFileSync(GEO_PATH, 'utf8'));
  const existingSlugs = new Set(existing.map(p => p.slug));

  const target = GEO_QUERY_BANK.find(k => !existingSlugs.has(k.slug));

  if (!target) {
    console.log('All GEO queries covered. Add more to GEO_QUERY_BANK.');
    process.exit(0);
  }

  console.log(`Generating GEO answer for: "${target.query}"`);

  const raw = await callGemini(buildGeoPrompt(target));
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();

  let answer;
  try {
    answer = JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse Gemini response:', e.message);
    console.error('Raw:', raw.slice(0, 500));
    process.exit(1);
  }

  if (!answer.slug || !answer.directAnswer || !Array.isArray(answer.sections)) {
    console.error('Generated answer missing required fields. Skipping.');
    process.exit(1);
  }

  if (answer.description?.length > 155) {
    const cut = answer.description.slice(0, 152);
    answer.description = cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]?$/, '') + '...';
  }

  existing.push(answer);
  fs.writeFileSync(GEO_PATH, JSON.stringify(existing, null, 2));

  console.log(`✓ Added GEO answer: "${answer.title}"`);
  console.log(`  Slug: ${answer.slug}`);
  console.log(`  Direct answer: ${answer.directAnswer?.slice(0, 100)}...`);
}

main().catch(err => {
  console.error('GEO script failed:', err);
  process.exit(1);
});
