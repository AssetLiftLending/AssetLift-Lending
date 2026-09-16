import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import health from '@/internal/seo/data/health.json';
import backlog from '@/internal/seo/data/content-backlog.json';
import ideas from '@/internal/seo/data/conversion-ideas.json';
import lastRun from '@/internal/seo/data/last-run.json';
import backlinkQueue from '@/internal/seo/data/backlink-queue.json';
import backlinkOutreach from '@/internal/seo/data/backlink-outreach.json';
import searchConsoleStatus from '@/internal/seo/data/search-console-status.json';
import { SEO_AUTHORITY_SCHEDULE, SEO_DAILY_PRIORITY_MAP, SEO_JOBS } from '@/lib/seo/config';

export const metadata: Metadata = createMetadata({
  title: 'SEO Automation Status',
  description: 'Internal status page for SEO automation, authority tasks, and search console connectivity.',
  path: '/seo-status',
  noIndex: true,
});

function formatDate(value: string | null) {
  if (!value) {
    return 'Not run yet';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/New_York',
  });
}

function StatusCard({
  title,
  body,
  accent,
}: {
  title: string;
  body: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm">
      <div className={`mb-4 h-1.5 w-16 rounded-full ${accent}`} />
      <h2 className="text-xl font-semibold tracking-tight mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-muted-foreground leading-6">{body}</div>
    </div>
  );
}

export default function SeoStatusPage() {
  const auditFindings = Array.isArray((health as { findings?: unknown[] }).findings)
    ? ((health as { findings: Array<{ severity: string; issue: string }> }).findings ?? [])
    : [];
  const backlogItems = ((backlog as { items?: Array<{ title: string; keyword: string; targetPath: string }> }).items ??
    []);
  const ideaItems = ((ideas as { items?: Array<{ page: string; angle: string; cta: string }> }).items ?? []);
  const queueItems = ((backlinkQueue as {
    items?: Array<{ tier: string; platform: string; targetUrl: string; anchorTheme: string }>;
  }).items ?? []);
  const outreachItems = ((backlinkOutreach as {
    items?: Array<{ platform: string; targetUrl: string; anchorTheme: string; action: string }>;
  }).items ?? []);
  const lastRunNotes = ((lastRun as { notes?: string[] }).notes ?? []);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,115,51,0.16),transparent_38%),radial-gradient(circle_at_top_right,rgba(14,116,144,0.14),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-4">Internal SEO Ops</p>
          <h1 className="max-w-3xl text-4xl md:text-5xl font-semibold tracking-tight mb-5">
            Automation, authority, and indexing status
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-8">
            This dashboard shows the current SEO automation outputs, daily authority rotation, and
            Search Console connectivity. It is intended for operations use, not public discovery.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <StatusCard
            title="Last Run"
            accent="bg-amber-500"
            body={
              <>
                <p>
                  <span className="font-medium text-foreground">Job:</span>{' '}
                  {(lastRun as { job?: string | null }).job ?? 'None'}
                </p>
                <p>
                  <span className="font-medium text-foreground">Generated:</span>{' '}
                  {formatDate((lastRun as { generatedAt?: string | null }).generatedAt ?? null)}
                </p>
                <p>
                  <span className="font-medium text-foreground">Published:</span>{' '}
                  {(lastRun as { published?: boolean }).published ? 'Yes' : 'No'}
                </p>
                {lastRunNotes.length > 0 ? (
                  <ul className="space-y-2">
                    {lastRunNotes.slice(0, 4).map((note) => (
                      <li key={note} className="rounded-2xl bg-muted/60 px-3 py-2 text-sm">
                        {note}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            }
          />

          <StatusCard
            title="Audit Health"
            accent="bg-cyan-600"
            body={
              <>
                <p>
                  <span className="font-medium text-foreground">Score:</span>{' '}
                  {(health as { score?: number }).score ?? 0}
                </p>
                <p>{(health as { summary?: string }).summary ?? 'No summary yet.'}</p>
                <div className="space-y-2">
                  {auditFindings.slice(0, 3).map((finding) => (
                    <div key={finding.issue} className="rounded-2xl bg-muted/60 px-3 py-2">
                      <div className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                        {finding.severity}
                      </div>
                      <div>{finding.issue}</div>
                    </div>
                  ))}
                </div>
              </>
            }
          />

          <StatusCard
            title="Daily Schedule"
            accent="bg-slate-600"
            body={
              <div className="space-y-3">
                {Object.values(SEO_JOBS).map((job) => (
                  <div key={job.slug} className="rounded-2xl bg-muted/60 px-3 py-2">
                    <div className="font-medium text-foreground">{job.label}</div>
                    <div>{job.scheduleLabel}</div>
                  </div>
                ))}
                <p className="text-xs">
                  These jobs are the daily publishing and visibility passes that support indexed
                  city pages, authority, deeper content, internal linking, and conversion work.
                </p>
              </div>
            }
          />

          <StatusCard
            title="Search Console"
            accent="bg-emerald-600"
            body={
              <>
                <p>
                  <span className="font-medium text-foreground">Connected:</span>{' '}
                  {(searchConsoleStatus as { connected?: boolean }).connected ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-medium text-foreground">Submitted:</span>{' '}
                  {(searchConsoleStatus as { submitted?: boolean }).submitted ? 'Yes' : 'No'}
                </p>
                <p>{(searchConsoleStatus as { message?: string }).message ?? 'No status yet.'}</p>
                <p className="text-xs">
                  Property:{' '}
                  {(searchConsoleStatus as { property?: string | null }).property ?? 'Not configured'}
                </p>
              </>
            }
          />
        </div>

        <div className="mt-6">
          <StatusCard
            title="Priority Map"
            accent="bg-slate-700"
            body={
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {SEO_DAILY_PRIORITY_MAP.map((item) => (
                  <div key={item.key} className="rounded-2xl bg-muted/60 px-3 py-3">
                    <div className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                      {item.key}
                    </div>
                    <div className="font-medium text-foreground">{item.label}</div>
                    <div>{item.focus}</div>
                    <div className="text-xs text-foreground/70">{item.job}</div>
                  </div>
                ))}
                <div className="rounded-2xl bg-muted/60 px-3 py-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                    Authority
                  </div>
                  <div className="font-medium text-foreground">{SEO_AUTHORITY_SCHEDULE.label}</div>
                  <div>{SEO_AUTHORITY_SCHEDULE.scheduleLabel}</div>
                </div>
              </div>
            }
          />
        </div>

        <div className="grid gap-6 mt-6 xl:grid-cols-2">
          <StatusCard
            title="Daily Outreach Batch"
            accent="bg-rose-500"
            body={
              <div className="space-y-3">
                <p>
                  Rotation indexes:{' '}
                  {(backlinkOutreach as { anchorRotationIndex?: number }).anchorRotationIndex ?? 0} /{' '}
                  {(backlinkOutreach as { pageRotationIndex?: number }).pageRotationIndex ?? 0}
                </p>
                {outreachItems.length > 0 ? (
                  outreachItems.map((item) => (
                    <div key={`${item.platform}-${item.targetUrl}`} className="rounded-2xl bg-muted/60 p-4">
                      <div className="text-sm font-medium text-foreground">{item.platform}</div>
                      <div>Target: {item.targetUrl}</div>
                      <div>Anchor: {item.anchorTheme}</div>
                      <div>{item.action}</div>
                    </div>
                  ))
                ) : (
                  <p>No outreach batch generated yet.</p>
                )}
              </div>
            }
          />

          <StatusCard
            title="Backlink Queue"
            accent="bg-violet-500"
            body={
              <div className="space-y-3">
                {queueItems.length > 0 ? (
                  queueItems.map((item) => (
                    <div key={`${item.platform}-${item.targetUrl}`} className="rounded-2xl bg-muted/60 p-4">
                      <div className="text-sm font-medium text-foreground">
                        {item.tier}: {item.platform}
                      </div>
                      <div>Target: {item.targetUrl}</div>
                      <div>Theme: {item.anchorTheme}</div>
                    </div>
                  ))
                ) : (
                  <p>No backlink queue generated yet.</p>
                )}
              </div>
            }
          />
        </div>

        <div className="grid gap-6 mt-6 xl:grid-cols-2">
          <StatusCard
            title="SEO Backlog"
            accent="bg-orange-500"
            body={
              <div className="space-y-3">
                {backlogItems.length > 0 ? (
                  backlogItems.slice(0, 6).map((item) => (
                    <div key={item.targetPath} className="rounded-2xl bg-muted/60 p-4">
                      <div className="text-sm font-medium text-foreground">{item.title}</div>
                      <div>Keyword: {item.keyword}</div>
                      <div>Path: {item.targetPath}</div>
                    </div>
                  ))
                ) : (
                  <p>No backlog generated yet.</p>
                )}
              </div>
            }
          />

          <StatusCard
            title="Conversion Ideas"
            accent="bg-sky-500"
            body={
              <div className="space-y-3">
                {ideaItems.length > 0 ? (
                  ideaItems.slice(0, 6).map((item) => (
                    <div key={`${item.page}-${item.cta}`} className="rounded-2xl bg-muted/60 p-4">
                      <div className="text-sm font-medium text-foreground">{item.page}</div>
                      <div>{item.angle}</div>
                      <div>CTA: {item.cta}</div>
                    </div>
                  ))
                ) : (
                  <p>No conversion ideas generated yet.</p>
                )}
              </div>
            }
          />
        </div>
      </section>
    </main>
  );
}
