import type { BlogPost } from '@/lib/data/blog-posts';

export const SEO_JOB_NAMES = ['audit', 'programmatic', 'strategy', 'ideas'] as const;

export type SeoJobName = (typeof SEO_JOB_NAMES)[number];

export interface SeoJobConfig {
  slug: SeoJobName;
  label: string;
  scheduleLabel: string;
  keywords: string[];
}

export interface SeoCandidate extends BlogPost {
  sourceJob: SeoJobName;
  focusKeyword: string;
  publishReason: string;
}

export interface SeoGuardrailResult {
  autoPublish: boolean;
  score: number;
  errors: string[];
  warnings: string[];
}

export interface SeoBacklogItem {
  title: string;
  keyword: string;
  intent: 'informational' | 'commercial' | 'local' | 'conversion';
  targetPath: string;
  reason: string;
}

export interface SeoIdeaItem {
  page: string;
  angle: string;
  cta: string;
  reason: string;
}

export interface SeoAuditFinding {
  severity: 'high' | 'medium' | 'low';
  issue: string;
  evidence: string;
  fix: string;
}

export interface SeoAuditReport {
  generatedAt: string;
  score: number;
  summary: string;
  findings: SeoAuditFinding[];
  totals: {
    blogPosts: number;
    comparisons: number;
    states: number;
    cities: number;
    corePages: number;
  };
}

export interface SeoOpportunityQuery {
  query: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  recommendation: string;
}

export interface SeoOpportunityPage {
  page: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  recommendation: string;
}

/** One Search Console page-dimension row for the report window (unfiltered). */
export interface SeoPageRow {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/** One Search Console query + page row for the report window (unfiltered). */
export interface SeoQueryPageRow {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SeoTopQuery {
  query: string;
  impressions: number;
  clicks: number;
  position: number;
}

export interface SeoCategoryBreakdown {
  name: string;
  queries: number;
  impressions: number;
  clicks: number;
  position: number;
  topQueries: Array<{ query: string; impressions: number; position: number }>;
}

export interface SeoWindowSummary {
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SeoOpportunitiesReport {
  generatedAt: string;
  connected: boolean;
  dateRange: { startDate: string; endDate: string } | null;
  summary: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  } | null;
  strikingDistanceQueries: SeoOpportunityQuery[];
  weakCtrPages: SeoOpportunityPage[];
  topQueries: SeoTopQuery[];
  categories: SeoCategoryBreakdown[];
  recent: SeoWindowSummary | null;
  dailyMetrics: SeoDailyMetric[];
  message: string;
  /**
   * Every page-dimension row Search Console returned for the window (up to the
   * 250-row request limit), unfiltered. Additive measurement field; optional so
   * older reports without it still type-check.
   */
  pages?: SeoPageRow[];
  /**
   * Query + landing-page pairs Search Console returned for the window (up to
   * the 1000-row request limit), unfiltered. Additive measurement field.
   */
  queryPages?: SeoQueryPageRow[];
}

export interface SeoDailyMetric {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export type SeoActionType =
  | 'improve-meta'
  | 'expand-content'
  | 'add-internal-links'
  | 'build-demand-page';

export interface SeoActionItem {
  type: SeoActionType;
  target: string;
  category: string;
  priority: number;
  impressions: number;
  position: number;
  rationale: string;
  action: string;
}

export interface SeoActionQueue {
  generatedAt: string;
  connected: boolean;
  summary: string;
  items: SeoActionItem[];
}

export interface PublishArtifact {
  path: string;
  content: string;
  message: string;
}

export interface PublishResult {
  mode: 'dry-run' | 'github';
  committedPaths: string[];
}

export interface SeoRunResult {
  job: SeoJobName;
  generatedAt: string;
  dryRun: boolean;
  candidate: SeoCandidate | null;
  guardrails: SeoGuardrailResult | null;
  published: boolean;
  changedUrls: string[];
  audit: SeoAuditReport | null;
  backlog: SeoBacklogItem[];
  ideas: SeoIdeaItem[];
  notes: string[];
}
