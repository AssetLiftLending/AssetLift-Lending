import type { SeoJobConfig } from './types';

export const SEO_BASE_URL = 'https://www.assetliftlending.com';

export const SEO_ARTIFACT_PATHS = {
  scheduledPosts: 'lib/data/seo-scheduled-posts.json',
  health: 'internal/seo/data/health.json',
  backlog: 'internal/seo/data/content-backlog.json',
  ideas: 'internal/seo/data/conversion-ideas.json',
  backlinkQueue: 'internal/seo/data/backlink-queue.json',
  backlinkOutreach: 'internal/seo/data/backlink-outreach.json',
  searchConsoleStatus: 'internal/seo/data/search-console-status.json',
  opportunities: 'internal/seo/data/opportunities.json',
  actionQueue: 'internal/seo/data/action-queue.json',
  metricsHistory: 'internal/seo/data/metrics-history.json',
  jobStatus: 'internal/seo/data/job-status.json',
  lastRun: 'internal/seo/data/last-run.json',
} as const;

export const SEO_JOBS: Record<string, SeoJobConfig> = {
  audit: {
    slug: 'audit',
    label: 'SEO Audit',
    scheduleLabel: '04:05 UTC and 13:05 UTC / 00:05 ET and 09:05 ET during DST',
    keywords: ['hard money lender', 'DSCR loans', 'fix and flip loans'],
  },
  programmatic: {
    slug: 'programmatic',
    label: 'Programmatic SEO',
    scheduleLabel: '10:05 UTC and 22:05 UTC / 06:05 ET and 18:05 ET during DST',
    keywords: ['hard money lender in city', 'fix and flip loans state', 'DSCR loans state'],
  },
  strategy: {
    slug: 'strategy',
    label: 'Content Strategy',
    scheduleLabel: '16:05 UTC / 12:05 ET during DST',
    keywords: ['how to finance first fix and flip', 'how to qualify for DSCR loan', 'real estate investing guide'],
  },
  ideas: {
    slug: 'ideas',
    label: 'Marketing Ideas',
    scheduleLabel: '18:05 UTC / 14:05 ET during DST',
    keywords: ['fix and flip checklist', 'rental property underwriting', 'bridge loan strategy'],
  },
};

export const SEO_AUTHORITY_SCHEDULE = {
  label: 'Authority / Search Console',
  scheduleLabel: '08:05 UTC / 04:05 ET during DST',
};

export const SEO_DAILY_PRIORITY_MAP = [
  {
    key: '1',
    label: 'Indexed pages',
    focus: 'Programmatic city and market coverage',
    job: 'Programmatic SEO',
  },
  {
    key: '2',
    label: 'Authority links',
    focus: 'Backlink queue and sitemap submission',
    job: 'Authority / Search Console',
  },
  {
    key: '4',
    label: 'E-E-A-T',
    focus: 'Trust, expertise, and educational depth',
    job: 'Content Strategy',
  },
  {
    key: '5',
    label: 'Content depth',
    focus: 'Higher-intent educational and comparison content',
    job: 'Content Strategy',
  },
  {
    key: '6',
    label: 'Internal linking',
    focus: 'Cross-linking between cities, loans, and blog content',
    job: 'SEO Audit',
  },
  {
    key: '7',
    label: 'Consistency',
    focus: 'Repeated publishing across the day',
    job: 'Programmatic SEO / Marketing Ideas',
  },
  {
    key: '8',
    label: 'Conversion tracking',
    focus: 'Audit quality, lead flow, and action paths',
    job: 'SEO Audit',
  },
] as const;

export const SEO_CORE_PAGE_TARGETS = [
  '/',
  '/apply',
  '/markets',
  '/lending/new-york',
  '/lending/new-york/fix-and-flip-loans',
  '/lending/new-york/dscr-loans',
  '/lending/new-york/queens',
  '/lending/new-york/brooklyn',
  '/lending/new-york/nassau-county',
  '/lending/new-york/westchester-county',
  '/lending/new-jersey',
  '/lending/new-jersey/fix-and-flip-loans',
  '/lending/new-jersey/dscr-loans',
  '/lending/new-jersey/newark',
  '/lending/new-jersey/jersey-city',
  '/lending/new-jersey/bergen-county',
  '/lending/new-jersey/hudson-county',
  '/loans/fix-and-flip',
  '/loans/dscr-rental',
  '/loans/bridge',
  '/blog/how-experienced-flippers-package-deals-for-fast-approval',
  '/blog/dscr-loan-file-checklist-portfolio-investors',
  '/about',
  '/how-it-works',
  '/how-funding-works',
  '/contact',
  '/faq',
  '/compare',
  '/blog',
  '/loans/ground-up-construction',
  '/tools/fix-and-flip-calculator',
  '/tools/dscr-calculator',
];

export const SEO_RESTRICTED_PHRASES = [
  'guaranteed approval',
  '#1 on google',
  'best lender in america',
  'lowest rate guaranteed',
  'all leads possible',
];

export const SEO_PROTECTED_COPY_HINTS = [
  'rate',
  'rates',
  'apr',
  'licensed',
  'licensing',
  'nmls',
  'compliance',
];

export const SEO_CONTENT_BACKLOG = [
  {
    title: 'Hard Money Loan Rates by Scenario',
    keyword: 'hard money loan rates 2026',
    intent: 'commercial' as const,
    targetPath: '/blog/hard-money-loan-rates-by-scenario',
    reason: 'Commercial intent term that can feed both product pages and lead conversion.',
  },
  {
    title: 'How to Underwrite a Fix and Flip Before You Borrow',
    keyword: 'fix and flip loan requirements',
    intent: 'informational' as const,
    targetPath: '/blog/how-to-underwrite-fix-and-flip',
    reason: 'High-intent borrowers need a pre-application checklist before they submit a deal.',
  },
  {
    title: 'DSCR Refinance Playbook for BRRRR Investors',
    keyword: 'how to qualify for DSCR loan',
    intent: 'commercial' as const,
    targetPath: '/blog/dscr-refinance-playbook-brrrr',
    reason: 'Supports DSCR product intent and links naturally to the application flow.',
  },
  {
    title: 'Bridge Loan Exit Planning Worksheet',
    keyword: 'bridge loan exit strategy',
    intent: 'conversion' as const,
    targetPath: '/blog/bridge-loan-exit-planning',
    reason: 'Improves bridge borrower quality and creates a stronger CTA bridge to /apply.',
  },
];

export const SEO_MARKETING_IDEAS = [
  {
    page: '/loans/fix-and-flip',
    angle: 'Offer a downloadable rehab draw schedule checklist inside the main CTA block.',
    cta: 'Get the fix and flip checklist',
    reason: 'Adds a softer conversion for investors not ready to apply today.',
  },
  {
    page: '/loans/dscr-rental',
    angle: 'Add a mini-case-study section showing what changes a borderline DSCR profile.',
    cta: 'Send me a DSCR scenario review',
    reason: 'Captures visitors comparing rental income strength before they fill the main form.',
  },
  {
    page: '/compare/assetlift-vs-kiavi',
    angle: 'Add a quick-fit selector that routes borrowers to the right product page.',
    cta: 'See which loan fits this deal',
    reason: 'Comparison traffic is high intent and usually needs a direct next step.',
  },
  {
    page: '/markets',
    angle: 'Feature top-performing city pages with investor-specific entry points by strategy.',
    cta: 'Browse top lending markets',
    reason: 'Improves internal linking and pushes users into location clusters more intentionally.',
  },
];
