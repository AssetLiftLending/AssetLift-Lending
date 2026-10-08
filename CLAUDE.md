# AssetLift Lending - Project Instructions

## Project Overview
AssetLift Lending offers private lending for real estate investors, funded with its capital partners.
Built with Next.js 15, Tailwind CSS, deployed on Vercel.

## Architecture
- Blog content: TypeScript data files in `lib/data/blog-posts.ts` and `lib/data/generated-blog-posts.ts`
- Loan products: `lib/data/loan-products.ts`
- Geo pages: `lib/data/states.ts` and `lib/data/cities.ts`
- Marketing context: `.agents/product-marketing-context.md`
- SEO audit: `SEO-Audit-AssetLiftLending.md`

## Key Rules
- Do NOT change UI/visual design unless explicitly asked
- This is a YMYL (Your Money Your Life) finance site -- content must be accurate and substantive
- Blog posts should be as long as needed to thoroughly cover the topic — no padding, no filler. Quality and specificity over word count.
- Meta descriptions must be under 155 characters
- Loans are funded with AssetLift capital and with the backing of capital partners. Do not describe AssetLift as a broker or brokerage
- **Positioning: use the same voice as the public site.** "Private lending for real estate investors in 46 states. Fast closings, direct communication, funded with our capital partners." On directory listings, profiles, and any external-facing copy, lead with "private lending for real estate investors" and keep the "funded with our capital partners" qualifier wherever space allows. Do not claim a licensing status, funding source, or lender type the file does not support, and keep every external description consistent with the public site.

## Daily Content Improvement Task
When starting a session, if asked to improve content or if running /expand-content:

1. Read `lib/data/blog-posts.ts` and identify blog posts with thin or generic content
2. Pick the highest-priority post to improve (Fix & Flip and DSCR categories first)
3. Focus on: specific dollar examples, real percentages, actionable steps, and answering the questions a borrower would actually ask. Every sentence should earn its place.
4. Do NOT pad content to hit a word count. A tight 800-word post that nails the intent is better than a bloated 2,000-word post with filler.
5. Maintain the existing voice: professional, direct, investor-to-investor
6. After improving, update the `readTime` field to reflect actual length
7. Commit with message: "Improve blog post: [post title]"

### Content Priority Queue (work through in order):
1. Fix & Flip category posts (highest traffic potential)
2. DSCR Rental category posts
3. Bridge loan category posts
4. Construction category posts
5. City/state pages in `lib/data/generated-blog-posts.ts` (add unique local content)
