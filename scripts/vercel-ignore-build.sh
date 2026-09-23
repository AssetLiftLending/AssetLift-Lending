#!/usr/bin/env bash
# Vercel "Ignored Build Step".
# Exit 0 = skip the build entirely. Exit 1 = build as normal.
#
# The SEO automation (GitHub Actions) commits bookkeeping JSON to
# internal/seo/data/ several times a day with messages like
# "chore(seo): record success for audit job". Those commits never change
# site content, but every one of them fired a full production build, and
# each retained deployment stores ~420 MB of output. That is what pushed
# the team over Vercel's 10 GB Hobby deployment-storage cap.
#
# Skip builds for those automated commits; build everything else.

msg="${VERCEL_GIT_COMMIT_MESSAGE:-}"

if [[ "$msg" == chore\(seo\):* ]]; then
  echo "Skipping build: automated SEO bookkeeping commit (no site content changes)."
  exit 0
fi

exit 1
