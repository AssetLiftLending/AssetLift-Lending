/**
 * CLI runner for SEO automation jobs, used by GitHub Actions.
 * Usage: npx tsx scripts/run-seo-job.ts <audit|programmatic|strategy|ideas|authority>
 *
 * Publishing requires SEO_GITHUB_TOKEN and SEO_GITHUB_REPO. In GitHub Actions
 * the built-in GITHUB_TOKEN is passed as SEO_GITHUB_TOKEN, so no personal
 * access token is needed. Set SEO_DRY_RUN=true to preview without committing.
 *
 * Every run emits structured, timestamped logs and (when not a dry run) records
 * the outcome to internal/seo/data/job-status.json so failures are visible in the repo
 * rather than only in the Actions logs.
 */
import { runSeoJob } from '../lib/seo/run';
import { runAuthorityJob } from '../lib/seo/authority';
import { fetchRepoFile, writeRepoFile } from '../lib/seo/github';
import { SEO_ARTIFACT_PATHS } from '../lib/seo/config';
import { SEO_JOB_NAMES, type SeoJobName } from '../lib/seo/types';

const job = process.argv[2];
const dryRun = process.env.SEO_DRY_RUN === 'true';

function log(level: 'info' | 'error', message: string, extra?: unknown) {
  const line = `[${new Date().toISOString()}] [seo:${job ?? 'unknown'}] [${level.toUpperCase()}] ${message}`;
  if (level === 'error') console.error(line, extra ?? '');
  else console.log(line, extra ?? '');
}

async function recordStatus(status: { ok: boolean; durationMs: number; error?: string }) {
  if (dryRun || !process.env.SEO_GITHUB_TOKEN || !process.env.SEO_GITHUB_REPO) return;
  try {
    const payload = { generatedAt: new Date().toISOString(), job, ...status };
    const current = await fetchRepoFile(SEO_ARTIFACT_PATHS.jobStatus);
    await writeRepoFile(
      SEO_ARTIFACT_PATHS.jobStatus,
      `${JSON.stringify(payload, null, 2)}\n`,
      `chore(seo): record ${status.ok ? 'success' : 'FAILURE'} for ${job} job`,
      current.sha,
    );
  } catch (statusErr) {
    // Never let status logging mask the original outcome.
    log('error', 'failed to write job-status artifact', statusErr instanceof Error ? statusErr.message : statusErr);
  }
}

async function main() {
  const startedAt = Date.now();
  log('info', `job starting (dryRun=${dryRun})`);

  if (job !== 'authority' && !SEO_JOB_NAMES.includes(job as SeoJobName)) {
    log('error', `unknown job "${job}". Valid: ${[...SEO_JOB_NAMES, 'authority'].join(', ')}`);
    process.exit(1);
  }

  try {
    if (job === 'authority') {
      const result = await runAuthorityJob({ dryRun });
      console.log(JSON.stringify(result, null, 2));
    } else {
      const result = await runSeoJob(job as SeoJobName, { dryRun });
      console.log(
        JSON.stringify(
          {
            job: result.job,
            dryRun: result.dryRun,
            published: result.published,
            candidate: result.candidate?.slug ?? null,
            changedUrls: result.changedUrls,
            notes: result.notes,
          },
          null,
          2,
        ),
      );
    }
    const durationMs = Date.now() - startedAt;
    log('info', `job completed successfully in ${durationMs}ms`);
    await recordStatus({ ok: true, durationMs });
  } catch (err) {
    const durationMs = Date.now() - startedAt;
    const detail = err instanceof Error ? (err.stack ?? err.message) : String(err);
    log('error', `job FAILED after ${durationMs}ms`, detail);
    await recordStatus({ ok: false, durationMs, error: err instanceof Error ? err.message : String(err) });
    process.exit(1);
  }
}

main();
