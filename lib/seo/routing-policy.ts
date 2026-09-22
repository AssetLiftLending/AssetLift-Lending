import scheduledPosts from '@/lib/data/seo-scheduled-posts.json';

export const BASE_URL = 'https://www.assetliftlending.com';

export const PRIORITY_STATE_SLUGS = new Set(['new-york', 'new-jersey', 'connecticut']);

export const PRIORITY_CITY_PATHS = new Set([
  '/lending/new-jersey/camden-county',
  '/lending/new-jersey/camden',
  '/lending/new-jersey/cherry-hill',
  '/lending/new-jersey/pennsauken',
  '/lending/new-york/brooklyn',
  '/lending/new-york/buffalo',
  '/lending/new-york/rochester',
  '/lending/new-york/syracuse',
]);

export const INDEXABLE_STATIC_PATHS = new Set([
  '/',
  '/apply',
  '/about',
  '/contact',
  '/how-it-works',
  '/how-funding-works',
  '/state-disclosures',
  '/privacy',
  '/terms',
  '/licensing',
  '/faq',
  '/markets',
  '/loans',
  '/loans/fix-and-flip',
  '/loans/dscr-rental',
  '/loans/ground-up-construction',
  '/loans/bridge',
  '/tools',
  '/tools/fix-and-flip-calculator',
  '/tools/dscr-calculator',
  '/resources/fix-and-flip-deal-checklist',
  '/resources/fix-and-flip-borrower-package',
]);

export const NOINDEX_STATIC_PATHS = new Set([
  '/ai-context',
  '/answers',
  '/blog',
  '/brokers',
  '/compare',
  '/loans/commercial-lending',
  '/seo-status',
  '/team',
  '/tools/term-sheet-pricer',
]);

// Posts a person reviewed, approved and published from the AssetLift CRM SEO Hub
// (source: 'crm', indexable: true). Automated pipeline posts stay out unless listed below.
const CRM_REVIEWED_BLOG_SLUGS = (scheduledPosts as Array<{ slug: string; source?: string; indexable?: boolean }>)
  .filter((post) => post.source === 'crm' && post.indexable === true)
  .map((post) => post.slug);

export const INDEXABLE_BLOG_SLUGS = new Set([
  ...CRM_REVIEWED_BLOG_SLUGS,
  'dscr-loans-explained',
  'how-to-qualify-for-dscr-loan',
  'dscr-loan-for-rental-property',
  'how-does-a-dscr-loan-work',
  'brrrr-refinance-into-dscr-loan',
  'dscr-loan-for-short-term-rental',
  'dscr-loan-llc-vs-personal-name',
  'brrrr-method-complete-guide-2026',
  'hard-money-lender-prepayment-penalty',
  'fix-and-flip-loan-rehab-draw-process',
  'dscr-loan-rental-income-calculation',
  'bridge-loan-vs-hard-money-loan',
  'ground-up-construction-loan-requirements',
  'fix-and-flip-loan-requirements',
  'hard-money-loan-rates-2026',
  'how-to-calculate-after-repair-value',
]);

export const INDEXABLE_COMPARISON_SLUGS = new Set([
  'hard-money-loans-vs-conventional-mortgages',
  'fix-and-flip-vs-brrrr-strategy',
  'dscr-loans-vs-conventional-rental-loans',
  'bridge-loans-vs-hard-money-loans',
]);

export const INDEXABLE_ANSWER_SLUGS = new Set([
  'best-hard-money-lender-fix-and-flip',
  'best-dscr-lender-no-income-verification',
  'fix-and-flip-loans-100-percent-rehab-funding',
]);

export function isPriorityStatePath(path: string) {
  const stateSlug = path.replace('/lending/', '').split('/')[0];
  return PRIORITY_STATE_SLUGS.has(stateSlug);
}

export function shouldIndexState(stateSlug: string) {
  return PRIORITY_STATE_SLUGS.has(stateSlug);
}

export function shouldIndexCity(stateSlug: string, citySlug: string) {
  return PRIORITY_CITY_PATHS.has(`/lending/${stateSlug}/${citySlug}`);
}
