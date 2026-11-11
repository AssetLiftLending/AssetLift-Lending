# AssetLift Lending - Project Instructions

## Project Overview
AssetLift Lending is a direct private lender for real estate investors, funded with capital partners.
Built with Next.js 15, Tailwind CSS, deployed on Vercel.

## Architecture
- Blog content: TypeScript data files in `lib/data/blog-posts.ts` and `lib/data/generated-blog-posts.ts`
- Loan products: `lib/data/loan-products.ts`
- Geo pages: `lib/data/states.ts` and `lib/data/cities.ts`
- Marketing context: `.agents/product-marketing-context.md`
- SEO audit: `SEO-Audit-AssetLiftLending.md`

## Owner Rules (binding, effective Nov 10, 2026)
The owner's standing rules are stated in full in `.agents/seo-strategy.md` under "Owner rules". They override everything in this file and in any other repo doc or automation:
- **Above all: never go backward.** Nothing may change anything already in place that ranks. If you cannot verify from Search Console data that a change is safe for a page that ranks, hold it and flag it for the owner.
- **Additive-only on anything already ranking, Search Console checked first.** A page ranks if it has any clicks, any impressions, or any recorded Search Console position, at any depth. Ranking pages get additive changes only (new sections, FAQs, internal links, structured data). Never rewrite, replace, or delete their title, H1, meta description, or existing copy. Every title keeps the "| AssetLift Lending" suffix.
- **Stale-data hold:** if Search Console data is missing, stale, or failed to refresh, hold ALL title, H1, meta description, and copy replacements on existing pages and flag them for the owner. Without fresh data, add content only.
- **The owner merges every PR.** Open the PR, wait for the Vercel preview check, and stop. Never merge or commit to main.
- **No changes to rates, loan minimums or maximums, terms, licensing text, phone numbers, or legal/privacy pages** without the owner's explicit approval of that specific change.
- **Free only:** no paid SEO tools, paid backlinks, paid placements, fee-charging directories, or new subscriptions.
- **Brand-only outreach:** outreach and profiles are "AssetLift Lending" only, no personal names, business mailbox only. Draft for the owner's approval; never send, register, or publish on your own.
- **Publication blackout:** no publishing, merging, or go-live actions on Shabbat (Friday sunset through Saturday night) or on Jewish holidays and their eves. When in doubt about the calendar, hold. This applies to every automation in the repo that publishes, including the daily blog post bot.

## Key Rules
- Do NOT change UI/visual design unless explicitly asked
- This is a YMYL (Your Money Your Life) finance site -- content must be accurate and substantive
- Blog posts should be as long as needed to thoroughly cover the topic — no padding, no filler. Quality and specificity over word count.
- Meta descriptions must be under 155 characters
- AssetLift is positioned as a direct private lender, not a broker. Loans are funded with capital partners.
- **Positioning: use the same voice as the public site.** "Private lending for real estate investors in 46 states. Fast closings, direct communication, funded with our capital partners." Never describe AssetLift as a broker, brokerage, or deal-shopper in marketing copy (owner decision, Oct 2026). Do not edit legal, licensing, or state-disclosure text; flag it for the owner instead. Do not claim a licensing status, funding source, or lender type the file does not support, and keep every external description consistent with the public site.

## Daily Content Improvement Task
When starting a session, if asked to improve content or if running /expand-content:

1. Read `lib/data/blog-posts.ts` and identify blog posts with thin or generic content
2. Pick the highest-priority post to improve (Fix & Flip and DSCR categories first). Check Search Console for it first: if it has any clicks, impressions, or recorded position, make additive changes only and never rewrite its title, H1, meta description, or existing copy. If Search Console data is missing, stale, or failed to refresh, add content only and hold every title/H1/meta/copy replacement for the owner; if you cannot verify the change is safe, hold it and flag it.
3. Focus on: specific dollar examples, real percentages, actionable steps, and answering the questions a borrower would actually ask. Every sentence should earn its place.
4. Do NOT pad content to hit a word count. A tight 800-word post that nails the intent is better than a bloated 2,000-word post with filler.
5. Maintain the existing voice: professional, direct, investor-to-investor
6. After improving, update the `readTime` field to reflect actual length
7. Commit on a new branch with message "Improve blog post: [post title]", open a pull request, wait for the Vercel preview check, and stop. Never merge or commit to main; the owner merges every PR.

### Content Priority Queue (work through in order):
1. Fix & Flip category posts (highest traffic potential)
2. DSCR Rental category posts
3. Bridge loan category posts
4. Construction category posts
5. City/state pages in `lib/data/generated-blog-posts.ts` (add unique local content)
