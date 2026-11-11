import { createSign } from 'node:crypto';
import { buildCategoryBreakdown } from './categories';
import type {
  SeoDailyMetric,
  SeoOpportunitiesReport,
  SeoOpportunityPage,
  SeoOpportunityQuery,
  SeoPageRow,
  SeoQueryPageRow,
  SeoTopQuery,
  SeoWindowSummary,
} from './types';

interface SearchConsoleResult {
  connected: boolean;
  submitted: boolean;
  property: string | null;
  sitemap: string | null;
  message: string;
  status?: number;
}

function getConfig() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const property = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;
  const sitemap = process.env.GOOGLE_SEARCH_CONSOLE_SITEMAP_URL || 'https://www.assetliftlending.com/sitemap.xml';

  if (!clientEmail || !privateKey || !property) {
    return null;
  }

  return { clientEmail, privateKey, property, sitemap };
}

function base64UrlEncode(input: string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

async function getAccessToken() {
  const config = getConfig();
  if (!config) {
    throw new Error(
      'Missing GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, or GOOGLE_SEARCH_CONSOLE_SITE_URL.',
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: config.clientEmail,
    scope: 'https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(payload),
  )}`;

  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(config.privateKey, 'base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google OAuth token request failed: ${response.status} ${text}`);
  }

  const json = (await response.json()) as { access_token: string };
  return { accessToken: json.access_token, config };
}

export async function submitSitemapToSearchConsole(): Promise<SearchConsoleResult> {
  const config = getConfig();
  if (!config) {
    return {
      connected: false,
      submitted: false,
      property: null,
      sitemap: null,
      message:
        'Missing Google Search Console service account configuration. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, and GOOGLE_SEARCH_CONSOLE_SITE_URL.',
    };
  }

  try {
    const { accessToken } = await getAccessToken();
    const property = encodeURIComponent(config.property);
    const sitemap = encodeURIComponent(config.sitemap);

    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${property}/sitemaps/${sitemap}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const text = await response.text();
      return {
        connected: true,
        submitted: false,
        property: config.property,
        sitemap: config.sitemap,
        message: `Search Console sitemap submission failed: ${response.status} ${text}`,
        status: response.status,
      };
    }

    return {
      connected: true,
      submitted: true,
      property: config.property,
      sitemap: config.sitemap,
      message: 'Sitemap submitted to Google Search Console successfully.',
      status: response.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Search Console error';
    return {
      connected: true,
      submitted: false,
      property: config.property,
      sitemap: config.sitemap,
      message,
    };
  }
}

// Queries within this position band are visible in search but not yet on top of
// page 1 — the band where a focused content/linking push can realistically move
// the ranking up. Below 5 is already strong; above 20 is usually too far to chase
// without a much larger effort.
const STRIKING_MIN_POSITION = 5;
const STRIKING_MAX_POSITION = 20;
const STRIKING_MIN_IMPRESSIONS = 5;
// Pages with real visibility but a click-through rate low enough that a sharper
// title tag / meta description is likely to win clicks from impressions you
// already have.
const WEAK_CTR_MIN_IMPRESSIONS = 20;
const WEAK_CTR_MAX_CTR = 0.03;
const WEAK_CTR_MAX_POSITION = 20;
const ANALYTICS_DAYS = 28;
const RECENT_DAYS = 7;
const GSC_DATA_LAG_DAYS = 3;

interface SearchAnalyticsRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

function getAnalyticsDateRange(days = ANALYTICS_DAYS) {
  const end = new Date();
  end.setDate(end.getDate() - GSC_DATA_LAG_DAYS);
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

async function querySearchAnalytics(
  accessToken: string,
  property: string,
  body: Record<string, unknown>,
): Promise<SearchAnalyticsRow[]> {
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Search Analytics query failed: ${response.status} ${text}`);
  }

  const json = (await response.json()) as { rows?: SearchAnalyticsRow[] };
  return json.rows ?? [];
}

function recommendForQuery(position: number): string {
  if (position <= 10) {
    return 'On page 1 but not at the top. Strengthen the ranking page with more depth and add internal links pointing to it to climb the last few spots.';
  }
  return 'On page 2-3. Expand or create focused content targeting this exact query, then link to it from related loan and city pages to break into page 1.';
}

export async function fetchSearchOpportunities(): Promise<SeoOpportunitiesReport> {
  const generatedAt = new Date().toISOString();
  const config = getConfig();

  if (!config) {
    return {
      generatedAt,
      connected: false,
      dateRange: null,
      summary: null,
      strikingDistanceQueries: [],
      weakCtrPages: [],
      topQueries: [],
      categories: [],
      recent: null,
      dailyMetrics: [],
      message:
        'Missing Google Search Console service account configuration. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, and GOOGLE_SEARCH_CONSOLE_SITE_URL.',
      pages: [],
      queryPages: [],
    };
  }

  try {
    const { accessToken } = await getAccessToken();
    const { startDate, endDate } = getAnalyticsDateRange();
    const recentRange = getAnalyticsDateRange(RECENT_DAYS);

    const [queryRows, pageRows, summaryRows, recentRows, dateRows, queryPageRows] = await Promise.all([
      querySearchAnalytics(accessToken, config.property, {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 1000,
      }),
      querySearchAnalytics(accessToken, config.property, {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 250,
      }),
      querySearchAnalytics(accessToken, config.property, {
        startDate,
        endDate,
        dimensions: [],
      }),
      querySearchAnalytics(accessToken, config.property, {
        startDate: recentRange.startDate,
        endDate: recentRange.endDate,
        dimensions: [],
      }),
      // Per-day breakdown so we can track clicks/impressions day over day.
      querySearchAnalytics(accessToken, config.property, {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 60,
      }),
      // Query + landing-page pairs (measurement only).
      querySearchAnalytics(accessToken, config.property, {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 1000,
      }),
    ]);

    const strikingDistanceQueries: SeoOpportunityQuery[] = queryRows
      .filter(
        (row) =>
          (row.position ?? 0) >= STRIKING_MIN_POSITION &&
          (row.position ?? 0) <= STRIKING_MAX_POSITION &&
          (row.impressions ?? 0) >= STRIKING_MIN_IMPRESSIONS,
      )
      .sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0))
      .slice(0, 20)
      .map((row) => ({
        query: row.keys?.[0] ?? '',
        impressions: row.impressions ?? 0,
        clicks: row.clicks ?? 0,
        ctr: row.ctr ?? 0,
        position: Number((row.position ?? 0).toFixed(1)),
        recommendation: recommendForQuery(row.position ?? 0),
      }));

    const weakCtrPages: SeoOpportunityPage[] = pageRows
      .filter(
        (row) =>
          (row.impressions ?? 0) >= WEAK_CTR_MIN_IMPRESSIONS &&
          (row.ctr ?? 0) < WEAK_CTR_MAX_CTR &&
          (row.position ?? 0) <= WEAK_CTR_MAX_POSITION,
      )
      .sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0))
      .slice(0, 15)
      .map((row) => ({
        page: (row.keys?.[0] ?? '').replace(config.property, '/'),
        impressions: row.impressions ?? 0,
        clicks: row.clicks ?? 0,
        ctr: Number((row.ctr ?? 0).toFixed(4)),
        position: Number((row.position ?? 0).toFixed(1)),
        recommendation:
          'High impressions but low click-through. Rewrite the title tag and meta description to be more specific and compelling to capture clicks you already earn.',
      }));

    // Full page-level rows (unfiltered), persisted as an additive measurement
    // field. Same path normalization as weakCtrPages; ordered by impressions.
    const pages: SeoPageRow[] = [...pageRows]
      .sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0))
      .map((row) => ({
        page: (row.keys?.[0] ?? '').replace(config.property, '/'),
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: Number((row.ctr ?? 0).toFixed(4)),
        position: Number((row.position ?? 0).toFixed(1)),
      }));

    // Query + landing-page pairs (unfiltered), persisted as an additive
    // measurement field. Same page normalization as pages; ordered by impressions.
    const queryPages: SeoQueryPageRow[] = [...queryPageRows]
      .sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0))
      .map((row) => ({
        query: row.keys?.[0] ?? '',
        page: (row.keys?.[1] ?? '').replace(config.property, '/'),
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: Number((row.ctr ?? 0).toFixed(4)),
        position: Number((row.position ?? 0).toFixed(1)),
      }));

    const topQueries: SeoTopQuery[] = [...queryRows]
      .sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0))
      .slice(0, 150)
      .map((row) => ({
        query: row.keys?.[0] ?? '',
        impressions: row.impressions ?? 0,
        clicks: row.clicks ?? 0,
        position: Number((row.position ?? 0).toFixed(1)),
      }));

    const categories = buildCategoryBreakdown(
      queryRows.map((row) => ({
        query: row.keys?.[0] ?? '',
        impressions: row.impressions ?? 0,
        clicks: row.clicks ?? 0,
        position: row.position ?? 0,
      })),
    );

    const dailyMetrics: SeoDailyMetric[] = dateRows
      .map((row) => ({
        date: row.keys?.[0] ?? '',
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: Number((row.ctr ?? 0).toFixed(4)),
        position: Number((row.position ?? 0).toFixed(1)),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const summaryRow = summaryRows[0] ?? {};
    const recentRow = recentRows[0] ?? {};
    const recent: SeoWindowSummary = {
      startDate: recentRange.startDate,
      endDate: recentRange.endDate,
      clicks: recentRow.clicks ?? 0,
      impressions: recentRow.impressions ?? 0,
      ctr: Number((recentRow.ctr ?? 0).toFixed(4)),
      position: Number((recentRow.position ?? 0).toFixed(1)),
    };

    return {
      generatedAt,
      connected: true,
      dateRange: { startDate, endDate },
      summary: {
        clicks: summaryRow.clicks ?? 0,
        impressions: summaryRow.impressions ?? 0,
        ctr: Number((summaryRow.ctr ?? 0).toFixed(4)),
        position: Number((summaryRow.position ?? 0).toFixed(1)),
      },
      strikingDistanceQueries,
      weakCtrPages,
      topQueries,
      categories,
      recent,
      dailyMetrics,
      message: `Found ${strikingDistanceQueries.length} striking-distance queries and ${weakCtrPages.length} pages with weak click-through over the last ${ANALYTICS_DAYS} days.`,
      pages,
      queryPages,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Search Console analytics error';
    return {
      generatedAt,
      connected: true,
      dateRange: null,
      summary: null,
      strikingDistanceQueries: [],
      weakCtrPages: [],
      topQueries: [],
      categories: [],
      recent: null,
      dailyMetrics: [],
      message,
      pages: [],
      queryPages: [],
    };
  }
}
