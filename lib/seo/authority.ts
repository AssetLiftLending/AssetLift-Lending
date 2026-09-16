import { buildActionPlan } from './action-plan';
import { SEO_ARTIFACT_PATHS } from './config';
import { fetchRepoFile, writeRepoFile } from './github';
import { fetchSearchOpportunities, submitSitemapToSearchConsole } from './search-console';

interface BacklinkQueueItem {
  tier: string;
  platform: string;
  targetUrl: string;
  anchorTheme: string;
  status: 'pending';
  notes: string;
}

interface BacklinkOutreachItem {
  platform: string;
  targetUrl: string;
  anchorTheme: string;
  action: string;
  notes: string;
}

interface AuthorityRunResult {
  generatedAt: string;
  published: boolean;
  backlinkQueueCount: number;
  outreachCount: number;
  anchorRotationIndex: number;
  pageRotationIndex: number;
  searchConsole: Awaited<ReturnType<typeof submitSitemapToSearchConsole>>;
  opportunities: Awaited<ReturnType<typeof fetchSearchOpportunities>>;
  actionQueue: ReturnType<typeof buildActionPlan>;
  notes: string[];
}

const BACKLINK_ITEMS: BacklinkQueueItem[] = [
  {
    tier: 'Tier 1',
    platform: 'Google Business Profile',
    targetUrl: 'https://www.assetliftlending.com/lending/new-york/fix-and-flip-loans',
    anchorTheme: 'New York hard money lender',
    status: 'pending',
    notes: 'Highest priority entity listing. Must be fully verified and kept active with NY/NJ investor lending language.',
  },
  {
    tier: 'Tier 1',
    platform: 'LLMs.txt / AI crawler reference',
    targetUrl: 'https://www.assetliftlending.com/llms.txt',
    anchorTheme: 'AssetLift Lending entity facts',
    status: 'pending',
    notes: 'Keep AI-readable entity, product, contact, and citation facts current for AI crawlers that inspect llms.txt-style files.',
  },
  {
    tier: 'Tier 1',
    platform: 'LLMs-full.txt / AI citation source',
    targetUrl: 'https://www.assetliftlending.com/llms-full.txt',
    anchorTheme: 'AssetLift Lending source summary',
    status: 'pending',
    notes: 'Maintain a comprehensive AI-readable site summary for systems that use web retrieval or citation-oriented crawling.',
  },
  {
    tier: 'Tier 1',
    platform: 'LinkedIn Company Page',
    targetUrl: 'https://www.assetliftlending.com/lending/new-jersey/fix-and-flip-loans',
    anchorTheme: 'New Jersey hard money lender',
    status: 'pending',
    notes: 'Use company overview plus application link.',
  },
  {
    tier: 'Tier 2',
    platform: 'BBB Profile',
    targetUrl: 'https://www.assetliftlending.com/lending/new-york/dscr-loans',
    anchorTheme: 'New York DSCR loans',
    status: 'pending',
    notes: 'Strong trust signal for financial services.',
  },
  {
    tier: 'Tier 3',
    platform: 'BiggerPockets Profile or Mention',
    targetUrl: 'https://www.assetliftlending.com/lending/new-jersey/dscr-loans',
    anchorTheme: 'New Jersey DSCR loans',
    status: 'pending',
    notes: 'Investor-relevant platform. Requires real account activity and value-first participation.',
  },
  {
    tier: 'Tier 4',
    platform: 'Guest Post Outreach',
    targetUrl: 'https://www.assetliftlending.com/blog/how-experienced-flippers-package-deals-for-fast-approval',
    anchorTheme: 'experienced fix and flip lender',
    status: 'pending',
    notes: 'Needs manual outreach to real estate or lending publishers.',
  },
];

const ANCHOR_ROTATION = [
  'AssetLift Lending',
  'New York hard money lender',
  'New Jersey hard money lender',
  'NY fix and flip loans',
  'NJ fix and flip loans',
  'NY DSCR loans',
  'NJ DSCR loans',
  'private lender for experienced investors',
];

const TARGET_PAGE_ROTATION = [
  'https://www.assetliftlending.com/lending/new-york/fix-and-flip-loans',
  'https://www.assetliftlending.com/lending/new-york/dscr-loans',
  'https://www.assetliftlending.com/lending/new-york/queens',
  'https://www.assetliftlending.com/lending/new-york/brooklyn',
  'https://www.assetliftlending.com/lending/new-york/nassau-county',
  'https://www.assetliftlending.com/lending/new-york/westchester-county',
  'https://www.assetliftlending.com/lending/new-jersey/fix-and-flip-loans',
  'https://www.assetliftlending.com/lending/new-jersey/dscr-loans',
  'https://www.assetliftlending.com/lending/new-jersey/newark',
  'https://www.assetliftlending.com/lending/new-jersey/jersey-city',
  'https://www.assetliftlending.com/lending/new-jersey/bergen-county',
  'https://www.assetliftlending.com/lending/new-jersey/hudson-county',
  'https://www.assetliftlending.com/blog/how-experienced-flippers-package-deals-for-fast-approval',
  'https://www.assetliftlending.com/blog/dscr-loan-file-checklist-portfolio-investors',
  'https://www.assetliftlending.com/markets',
];

function getRotationSeed(date: string) {
  const digits = date.replace(/\D/g, '');
  return Number(digits.slice(-6)) || 0;
}

function buildOutreachBatch(generatedAt: string) {
  const seed = getRotationSeed(generatedAt);
  const anchorRotationIndex = seed % ANCHOR_ROTATION.length;
  const pageRotationIndex = seed % TARGET_PAGE_ROTATION.length;

  const items: BacklinkOutreachItem[] = BACKLINK_ITEMS.slice(0, 4).map((item, index) => ({
    platform: item.platform,
    targetUrl: TARGET_PAGE_ROTATION[(pageRotationIndex + index) % TARGET_PAGE_ROTATION.length],
    anchorTheme: ANCHOR_ROTATION[(anchorRotationIndex + index) % ANCHOR_ROTATION.length],
    action:
      item.platform === 'Guest Post Outreach'
        ? 'Pitch one publisher and offer a topic tied to the selected landing page.'
        : 'Publish or update the profile/listing using the selected target page and anchor theme.',
    notes: item.notes,
  }));

  return {
    anchorRotationIndex,
    pageRotationIndex,
    items,
  };
}

function stringifyWithTrailingNewline(value: unknown) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export async function runAuthorityJob(options?: { dryRun?: boolean }): Promise<AuthorityRunResult> {
  const generatedAt = new Date().toISOString();
  const searchConsole = await submitSitemapToSearchConsole();
  const opportunities = await fetchSearchOpportunities();
  const actionQueue = buildActionPlan(opportunities);
  const outreach = buildOutreachBatch(generatedAt);

  const backlinkQueuePayload = {
    generatedAt,
    items: BACKLINK_ITEMS,
  };

  const backlinkOutreachPayload = {
    generatedAt,
    anchorRotationIndex: outreach.anchorRotationIndex,
    pageRotationIndex: outreach.pageRotationIndex,
    items: outreach.items,
  };

  const searchConsolePayload = {
    generatedAt,
    connected: searchConsole.connected,
    submitted: searchConsole.submitted,
    property: searchConsole.property,
    sitemap: searchConsole.sitemap,
    message: searchConsole.message,
    ...(typeof searchConsole.status === 'number' ? { status: searchConsole.status } : {}),
  };

  const notes = [
    'Backlink queue refreshed from existing authority plan.',
    searchConsole.message,
    opportunities.message,
    actionQueue.summary,
    'AI visibility targets refreshed: llms.txt, llms-full.txt, entity facts, product pages, and high-authority citation targets.',
    'AI platforms such as ChatGPT, Perplexity, Claude, Gemini, and Copilot generally discover brands through crawlable pages, citations, backlinks, structured data, and trusted third-party mentions; this job improves those inputs but cannot force inclusion in a model index.',
    'This job cannot create third-party backlinks by itself; it can only keep the queue current and update submission status.',
    'Google Search Console sitemap submission is supported here. Google indexing for ordinary webpages is not directly force-triggered via the public Indexing API.',
  ];

  const published = Boolean(
    !options?.dryRun && process.env.SEO_GITHUB_TOKEN && process.env.SEO_GITHUB_REPO,
  );

  if (published) {
    const backlinkCurrent = await fetchRepoFile('internal/seo/data/backlink-queue.json');
    await writeRepoFile(
      'internal/seo/data/backlink-queue.json',
      stringifyWithTrailingNewline(backlinkQueuePayload),
      'chore(seo): refresh backlink queue',
      backlinkCurrent.sha,
    );

    const consoleCurrent = await fetchRepoFile('internal/seo/data/search-console-status.json');
    await writeRepoFile(
      'internal/seo/data/search-console-status.json',
      stringifyWithTrailingNewline(searchConsolePayload),
      'chore(seo): refresh search console status',
      consoleCurrent.sha,
    );

    const opportunitiesCurrent = await fetchRepoFile(SEO_ARTIFACT_PATHS.opportunities);
    await writeRepoFile(
      SEO_ARTIFACT_PATHS.opportunities,
      stringifyWithTrailingNewline(opportunities),
      'chore(seo): refresh search opportunities',
      opportunitiesCurrent.sha,
    );

    const actionQueueCurrent = await fetchRepoFile(SEO_ARTIFACT_PATHS.actionQueue);
    await writeRepoFile(
      SEO_ARTIFACT_PATHS.actionQueue,
      stringifyWithTrailingNewline(actionQueue),
      'chore(seo): refresh action queue',
      actionQueueCurrent.sha,
    );

    const days = opportunities.dailyMetrics;
    const latest = days[days.length - 1];
    const prior = days[days.length - 2];
    const metricsPayload = {
      generatedAt,
      latestDay: latest ?? null,
      dayOverDay:
        latest && prior
          ? {
              clicks: latest.clicks - prior.clicks,
              impressions: latest.impressions - prior.impressions,
              positionChange: Number((prior.position - latest.position).toFixed(1)),
            }
          : null,
      days,
    };
    const metricsCurrent = await fetchRepoFile(SEO_ARTIFACT_PATHS.metricsHistory);
    await writeRepoFile(
      SEO_ARTIFACT_PATHS.metricsHistory,
      stringifyWithTrailingNewline(metricsPayload),
      'chore(seo): refresh daily metrics history',
      metricsCurrent.sha,
    );

    const outreachCurrent = await fetchRepoFile('internal/seo/data/backlink-outreach.json');
    await writeRepoFile(
      'internal/seo/data/backlink-outreach.json',
      stringifyWithTrailingNewline(backlinkOutreachPayload),
      'chore(seo): refresh backlink outreach batch',
      outreachCurrent.sha,
    );

    const lastRunCurrent = await fetchRepoFile(SEO_ARTIFACT_PATHS.lastRun);
    await writeRepoFile(
      SEO_ARTIFACT_PATHS.lastRun,
      stringifyWithTrailingNewline({
        generatedAt,
        job: 'authority',
        published: true,
        changedUrls: searchConsole.submitted && searchConsole.sitemap ? [searchConsole.sitemap] : [],
        notes: [
          ...notes,
          `Anchor rotation index: ${outreach.anchorRotationIndex}`,
          `Page rotation index: ${outreach.pageRotationIndex}`,
        ],
      }),
      'chore(seo): record authority run',
      lastRunCurrent.sha,
    );
  }

  return {
    generatedAt,
    published,
    backlinkQueueCount: BACKLINK_ITEMS.length,
    outreachCount: outreach.items.length,
    anchorRotationIndex: outreach.anchorRotationIndex,
    pageRotationIndex: outreach.pageRotationIndex,
    searchConsole,
    opportunities,
    actionQueue,
    notes,
  };
}
