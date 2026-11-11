# Asset Lift Lending — SEO & AI Search Operating Doctrine (2026/2027)

> This is the binding strategy for all SEO/content work and for the automation in
> `lib/seo/`. The goal is **qualified lending applications and funded loans**, never
> page count or vanity traffic. Every page and every automated action must move a
> qualified investor-borrower toward `/apply`.

## Owner rules (binding, effective Nov 10, 2026)

These are the owner's standing rules. They override everything else in this file,
in `CLAUDE.md`, and in any other repo doc, prompt, or automation. Where anything
disagrees with them, these rules win.

**Above all: never go backward.** Nothing may change anything already in place
that ranks. Every improvement must move the site forward, never backward. If you
cannot verify from Search Console data that a change is safe for a page that
ranks, hold the change and flag it for the owner instead.

1. **Additive-only on anything already ranking, Search Console checked first.**
   Check Search Console before touching a page. A page ranks if it has any
   clicks, any impressions, or any recorded Search Console position, at any
   depth (not only the top 20). Ranking pages get additive changes only (new
   sections, FAQs, internal links, structured data). Never rewrite, replace, or
   delete their title, H1, meta description, or existing copy. Every title keeps
   the "| AssetLift Lending" suffix.
   - **Stale-data hold:** if Search Console data is missing, stale, or failed to
     refresh, hold ALL title, H1, meta description, and copy replacements on
     existing pages and flag them for the owner. Without fresh data, add content
     only.
2. **Merge and deploy (approved Nov 10, 2026).** Every change goes through a pull
   request; never commit directly to main.
   - **Website SEO work:** the agent may merge its own PR and take it live, but
     only after every check passes: build green, Vercel preview green, fact
     check clean, and the ranking-safety rules above satisfied with fresh Search
     Console data. After each deploy, verify the live page and keep the change
     revertable.
   - **Everything else stays open for the owner:** the CRM, paid services, and
     any change covered by rule 3 (rates, loan minimums or maximums, terms,
     licensing text, phone numbers, legal pages) need his explicit approval, and
     those PRs stay open for him to merge.
   - The publication blackout (rule 6) overrides this: no merges or go-live
     during it, whatever the checks say.
3. **No term, rate, or licensing changes without approval.** No changes to rates,
   loan minimums or maximums, terms, licensing text, phone numbers, or
   legal/privacy pages without the owner's explicit approval of that specific
   change.
4. **Free only.** No paid SEO tools, paid backlinks, paid placements,
   fee-charging directories, or new subscriptions.
5. **Brand-only outreach.** Outreach and profiles are "AssetLift Lending" only: no
   personal names, business mailbox only. Draft for the owner's approval; never
   send, register, or publish on your own.
6. **Publication blackout on Shabbat and Jewish holidays.** No publishing,
   merging, or go-live actions on Shabbat (Friday sunset through Saturday night)
   or on Jewish holidays and their eves. When in doubt about the calendar, hold.
   This applies to every automation in the repo that publishes, including the
   daily blog post bot (`daily-seo.yml`), the GEO bot (`daily-geo.yml`), and
   any `seo-pipeline.yml` job that publishes pages.

## Objectives
1. Increase qualified lending leads/applications.
2. Dominate high-intent commercial lending searches.
3. Become the most authoritative US resource for hard money, DSCR, bridge,
   fix-and-flip, rental portfolio, build-to-rent, and construction lending.
4. Maximize visibility in Google Search, Google AI Mode, ChatGPT, Claude, Gemini,
   Perplexity, and Bing Copilot.
5. Eliminate SEO clutter: duplicate content, thin pages, low-value articles.
6. Earn rankings through authority, expertise, trust, and usefulness.

## Reject / Prioritize
- **Reject:** AI content spam, keyword stuffing, thin location pages, generic blog
  articles, vanity traffic, low-quality backlinks, mass-generated content.
- **Prioritize:** topical authority, search intent, internal linking, entity SEO,
  EEAT, conversion optimization, AI citation optimization.

## Architecture — topic clusters
Build hub-and-spoke clusters per product (DSCR, Construction, Fix & Flip, Bridge,
Rental Portfolio, Hard Money, Build-to-Rent). Each cluster: Overview, Requirements,
Rates, Calculator, FAQ, comparison(s), use-case/scenario pages, and by-state pages.
Every cluster page links to every related page in the cluster and up to its hub.

## State pages — never a template swap
Each must carry unique: lending overview, market info, loan products, borrower
requirements, use cases, state-specific FAQ, cities served, local insights, and an
application CTA.

## Internal linking
Every page links up (parent category), sideways (related products), and down
(supporting content). No orphans. Everything reachable within 3 clicks.

## AI search optimization
Every major page contains clear definitions, bullet summaries, FAQs, comparisons,
tables, pros/cons, eligibility criteria, and loan scenarios — structured so AI
systems can extract answers to: What is it? Who qualifies? When to use it? What are
the alternatives? What are the requirements?

## Entity SEO
Reinforce Asset Lift Lending's relationship to DSCR/hard money/fix-and-flip/bridge/
construction loans, real estate investors, and rental/commercial financing, using
consistent terminology site-wide.

## EEAT (current weakest pillar)
Every major page reinforces Experience, Expertise, Authority, Trust via real
scenarios/examples/borrower situations, team info, contact info, credentials, and
genuine lending expertise. Avoid generic AI language.

## Conversion
Every page answers: Why Asset Lift? Why now? Why this loan? Why trust us? — with
clear CTAs, application links, contact options, and trust indicators.

## Technical (maintain)
Core Web Vitals passing, fast load, mobile-first, clean URLs, sitemap integrity,
structured data, canonicals, proper heading hierarchy. No indexation waste.

## Content evaluation gate — before creating ANY page
1. Targets a real borrower search? 2. Supports a lending product? 3. Improves
topical authority? 4. Improves conversion potential? 5. Strengthens internal
linking? If not all yes — do not create it.

## Success metrics
Primary: qualified applications, qualified leads, ranking growth, AI citations,
topical authority. Secondary: organic traffic, impressions, CTR. Optimize for
funded loans, never traffic alone.
