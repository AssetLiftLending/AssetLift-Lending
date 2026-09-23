'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TRI_STATE_HUB_CONTENT } from '@/lib/data/tri-state-hub-content';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CITIES } from '@/lib/data/cities';
import { shouldIndexCity } from '@/lib/seo/routing-policy';
import { STATES, type StateData } from '@/lib/data/states';

interface LocationPageProps {
  state: StateData;
}

const PRIORITY_STATE_GUIDANCE: Record<
  string,
  {
    lenderView: string;
    borrowerFocus: string[];
    caution: string;
  }
> = {
  florida: {
    lenderView:
      "Florida files tend to be won or lost on insurance realism, market velocity, and whether the borrower is buying into a clean resale corridor versus a story-driven coastal asset. In Tampa, Jacksonville, and the I-4 corridor, lenders usually get comfortable faster when the property is in a deep buyer pool with straightforward resale comps. In South Florida, the upside can be larger, but the file needs to account for higher carrying costs, more title/association friction, and a tighter margin for underwriting mistakes.",
    borrowerFocus: [
      "Budget wind, flood, and builder's risk coverage early instead of treating insurance as a closing-day surprise",
      "Use real neighborhood comps rather than broad metro averages, especially in Miami-Dade and Broward",
      "Show enough reserves to survive slower resale or storm-related project interruptions",
    ],
    caution:
      "Coastal and condo-heavy Florida deals tend to look thinner than they seem if association rules, flood zones, or insurance costs are not underwritten honestly at the start.",
  },
  texas: {
    lenderView:
      "Texas creates strong investor volume because the major metros are deep, liquid, and diverse, but each one behaves differently. Dallas-Fort Worth and Houston reward disciplined entry points and clear comp support. Austin can punish aggressive ARV assumptions more quickly because the market has more pricing sensitivity at higher price bands. Across the state, lenders usually like repeatable suburban product and become more cautious when the borrower is relying on speculative appreciation instead of operational spread.",
    borrowerFocus: [
      "Keep ARV support tight and recent in DFW, Houston, San Antonio, and Austin submarkets",
      "Address property tax and insurance carrying costs upfront because they materially affect hold math in Texas",
      "Match the loan product to the business plan instead of forcing long-hold assets into short-term debt",
    ],
    caution:
      "Texas deals often break when the borrower underestimates tax burden or assumes the refinance will be easy without first proving the stabilized numbers work.",
  },
  california: {
    lenderView:
      "California lenders usually focus less on whether there is demand and more on whether the borrower can execute precisely in a high-cost environment. The market rewards experienced operators who know their block, permit path, and resale ceiling. Los Angeles, San Diego, and Bay Area files can still price well, but they need disciplined scopes, strong liquidity, and a margin that survives permit drift or longer disposition timelines.",
    borrowerFocus: [
      "Bring contractor-ready scopes and realistic timing instead of optimistic renovation calendars",
      "Account for permit complexity, ADU timing, and local resale banding before requesting leverage",
      "Show enough cash to absorb change orders and longer hold periods in premium markets",
    ],
    caution:
      "California projects rarely fail because there is no demand. They fail because execution costs, permitting, or over-improvement eat the spread the borrower thought was there.",
  },
  georgia: {
    lenderView:
      "Georgia, especially metro Atlanta, is attractive because there is real transaction depth across entry-level and mid-market housing. Lenders usually get comfortable with well-located single-family and small multifamily projects where the borrower understands neighborhood-by-neighborhood pricing. Atlanta also rewards operators who know when to flip versus when to stabilize into a DSCR exit, because some submarkets support one path much more cleanly than the other.",
    borrowerFocus: [
      "Underwrite at the neighborhood level instead of treating metro Atlanta as one market",
      "Clarify whether the property is a resale play or a refinance hold before the term sheet stage",
      "Prepare for title, contractor, and access coordination early on older housing stock",
    ],
    caution:
      "Georgia files can look stronger than they are when the borrower assumes every Atlanta zip code behaves the same. Submarket discipline matters.",
  },
  'north-carolina': {
    lenderView:
      "North Carolina performs well for investors because it blends migration-driven demand with multiple strong metros instead of relying on one city. Charlotte and Raleigh support faster, cleaner exits when the property fits broad buyer demand. Secondary metros can still work well, but lenders usually want tighter comp logic and a more conservative business plan. In this state, the strongest files are the ones that respect local demand rather than assuming growth headlines alone will carry the deal.",
    borrowerFocus: [
      "Use current comps and rent support from the specific metro instead of statewide averages",
      "Keep renovation scope aligned with neighborhood finish level rather than overshooting the resale bracket",
      "Have a clear refinance plan for hold deals in Charlotte, Raleigh, and fast-growing suburban corridors",
    ],
    caution:
      "North Carolina growth stories attract aggressive underwriting assumptions. Lenders respond better when the borrower shows a conservative local plan instead of macro optimism.",
  },
  'new-york': {
    lenderView:
      "New York investor files are strong when the borrower makes the market-specific risks easy to underwrite. NYC boroughs, Long Island, Westchester, and upstate markets do not behave the same way. Lenders want exact comps, legal unit clarity, taxes, insurance, tenant status, reserves, and a payoff plan that works even if timing stretches.",
    borrowerFocus: [
      "Separate NYC borough, Long Island, Westchester, and upstate underwriting instead of using one statewide story",
      "Document legal unit count, tenant status, rent support, taxes, insurance, and entity structure early",
      "Use fix-and-flip debt for transitional assets and DSCR debt once the rental income supports the payment",
    ],
    caution:
      "New York deals often look stronger than they are when taxes, legal units, building rules, or tenant status are not fully documented before underwriting.",
  },
  'new-jersey': {
    lenderView:
      "New Jersey files can move quickly when the borrower is specific about the town, county, unit mix, tax load, and exit. Newark, Jersey City, Bergen County, Hudson County, and shore markets each need different comp and rent logic. Lenders respond better to a complete file than to a broad claim that the deal is in a strong NJ market.",
    borrowerFocus: [
      "Use town-specific comps and rent support instead of broad county averages",
      "Prepare taxes, insurance, tenant status, title, scope, reserves, and municipal timing before requesting leverage",
      "Plan the bridge-to-DSCR exit before closing if the property is being stabilized as a rental",
    ],
    caution:
      "New Jersey files can get delayed when taxes, municipal requirements, tenant status, or insurance assumptions are discovered late.",
  },
};

export default function LocationPage({ state }: LocationPageProps) {
  const stateCities = CITIES.filter((city) => city.stateSlug === state.slug).sort(
    (a, b) =>
      Number(shouldIndexCity(b.stateSlug, b.citySlug)) - Number(shouldIndexCity(a.stateSlug, a.citySlug)),
  );
  const nearbyStates = STATES.filter((entry) => entry.slug !== state.slug).slice(0, 8);
  const stateGuidance = PRIORITY_STATE_GUIDANCE[state.slug];

  const hub = TRI_STATE_HUB_CONTENT[state.slug];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container px-4 md:px-6 relative">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <p className="text-primary font-semibold text-sm uppercase tracking-wider">
                {state.name} ({state.abbreviation})
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Hard Money Loans in {state.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Fast, flexible real estate investment financing for {state.name} investors. Fix & flip, construction, DSCR rental, and bridge loans available statewide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 glow-primary">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6">
                <a href="tel:+19296392284">Call (929) 639-2284</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Max LTC</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Days to Close</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{state.medianHomePrice}</div>
              <div className="text-sm text-muted-foreground">Median Home Price</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">$5MM</div>
              <div className="text-sm text-muted-foreground">Max Loan Amount</div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real Estate Investing in {state.name}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {state.overview}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {state.marketHighlight}
            </p>
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Top Markets in {state.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {state.topCities.map((cityName, i) => {
              const cityPage = stateCities.find((city) => city.cityName === cityName);
              const content = (
                <>
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium">{cityName}</span>
                </>
              );

              if (cityPage) {
                return (
                  <motion.div
                    key={cityName}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/lending/${cityPage.stateSlug}/${cityPage.citySlug}`}
                      className="flex items-center gap-2 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                    >
                      {content}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                key={cityName}
                className="flex items-center gap-2 bg-card border border-border rounded-lg p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {content}
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {stateCities.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {state.name} Investor Lending Markets
              </h2>
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">
                Review city and county pages for local hard money, bridge, fix and flip, and DSCR
                rental loan context before uploading a scenario.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {stateCities.map((city) => (
                  <Link
                    key={`${city.stateSlug}-${city.citySlug}`}
                    href={`/lending/${city.stateSlug}/${city.citySlug}`}
                    className="rounded-xl border border-border bg-card px-4 py-4 text-sm font-medium hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    Hard Money Loans in {city.cityName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Borrowers Need to Have Ready in {state.name}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In most {state.name} files, the biggest delays are not interest-rate related. They
                come from weak supporting documents, insurance uncertainty, or unrealistic exit
                assumptions. Borrowers who move quickly usually have the property story, budget,
                and title/closing path organized before they ask for speed.
              </p>
              <div className="space-y-4">
                {[
                  'A clear purchase or refinance story with a believable payoff plan',
                  'Supporting numbers for value, rent, rehab budget, or completed price',
                  'Entity docs, insurance details, and a title company ready to move',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Useful Resources</h3>
              <div className="space-y-3">
                {[
                  { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
                  { label: 'DSCR Calculator', href: '/tools/dscr-calculator' },
                  { label: 'Experienced Flipper Loan File Checklist', href: '/blog/how-experienced-flippers-package-deals-for-fast-approval' },
                  { label: 'DSCR File Checklist for Portfolio Investors', href: '/blog/dscr-loan-file-checklist-portfolio-investors' },
                  { label: 'How to Compare Hard Money Term Sheets', href: '/blog/how-to-compare-hard-money-term-sheets' },
                  { label: 'How It Works', href: '/how-it-works' },
                ].map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="font-medium">{resource.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How Investors Usually Move Through a {state.name} Deal
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In most {state.name} lending files, the financing path is less about one keyword
                and more about where the property sits in its lifecycle. Distressed assets often
                start with bridge or rehab capital. Stabilized rentals usually fit DSCR debt
                better. Ground-up projects need stronger budgets, plans, and draw discipline from
                day one.
              </p>
              <div className="space-y-4">
                {[
                  `Use short-term capital when the ${state.name} property is still transitional or not yet bankable`,
                  'Move into DSCR or other long-term debt once the rent story and condition are stable',
                  'Stress-test taxes, insurance, and hold costs before assuming the exit will be easy',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Popular Investor Guides</h3>
              <div className="space-y-3">
                {[
                  { label: 'Questions to Ask a Hard Money Lender', href: '/blog/questions-to-ask-a-hard-money-lender' },
                  { label: 'When Not to Use a Hard Money Loan', href: '/blog/when-not-to-use-a-hard-money-loan' },
                  { label: 'What Lenders Look For in Scope of Work', href: '/blog/what-lenders-look-for-in-scope-of-work' },
                  { label: 'What Reserves Do Lenders Want?', href: '/blog/what-reserves-do-lenders-want' },
                  { label: 'New Jersey Investor Loan File Guide', href: '/blog/new-jersey-investor-loan-file-guide' },
                ].map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="font-medium">{resource.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {stateGuidance && (
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  How Lenders Usually View {state.name} Deals
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {stateGuidance.lenderView}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {stateGuidance.caution}
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  What Strong {state.name} Borrowers Usually Prepare
                </h3>
                <div className="space-y-4">
                  {stateGuidance.borrowerFocus.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {hub && (
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Investor lending across {state.name}, region by region</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{hub.intro}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {hub.regions.map((region) => (
                  <div key={region.name} className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-xl mb-1">{region.name}</h3>
                    <p className="text-sm text-primary mb-3">{region.markets}</p>
                    <p className="text-muted-foreground leading-relaxed">{region.detail}</p>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">How {state.name} investor deals usually get structured</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {hub.structures.map((item) => (
                    <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">What to send with a {state.name} deal</h2>
                  <ul className="space-y-3">
                    {hub.fileChecklist.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{state.name} programs and local pages</h2>
                  <div className="grid gap-3">
                    {hub.localLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium hover:border-primary/50 transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Programs Available */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Loan Programs Available in {state.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Fix & Flip Loans', desc: 'Up to 95% LTC on purchase with 100% rehab funding. 13-19 month terms.', href: '/loans/fix-and-flip' },
              { title: 'Ground-Up Construction', desc: 'Up to 90% LTC with 100% construction funding. 19-24 month terms.', href: '/loans/ground-up-construction' },
              { title: 'DSCR Rental Loans', desc: 'Up to 85% LTV. 30-year fixed rate. No income verification.', href: '/loans/dscr-rental' },
              { title: 'Bridge Loans', desc: 'Up to 80% LTV. Close in as fast as 5 days. Flexible exit strategies.', href: '/loans/bridge' },
            ].map((program, i) => (
              <Link
                key={i}
                href={program.href}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{program.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{program.desc}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {state.name} Hard Money Lending FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {state.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Explore More Lending States
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Investors operating in multiple markets can review additional state pages to compare
              local lending context, borrower expectations, and market conditions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyStates.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/lending/${entry.slug}`}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  {entry.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Invest in {state.name}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Get funded for your next {state.name} deal. Hear back within 24 hours, usually within a few hours.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 glow-primary">
            <Link href="/apply">
              Apply for Funding <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
