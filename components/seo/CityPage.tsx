'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { CityData } from '@/lib/data/cities';

interface CityPageProps {
  city: CityData;
  nearby?: Array<{ label: string; href: string }>;
}

const PRIORITY_CITY_GUIDANCE: Record<
  string,
  {
    lenderView: string;
    borrowerFocus: string[];
  }
> = {
  'florida/miami': {
    lenderView:
      "Miami files usually get underwritten through the lens of complexity as much as upside. Lenders know the city can produce strong profits, but they also know condo rules, insurance cost, title friction, and luxury-market variability can erode margin quickly. The strongest Miami files usually involve clean title, realistic HOA and carrying-cost assumptions, and a neighborhood-specific exit strategy rather than a broad 'South Florida appreciation' story.",
    borrowerFocus: [
      "Underwrite condo association restrictions and insurance cost before finalizing leverage expectations",
      "Keep comps extremely local because Brickell, Little Havana, Wynwood, and suburban Miami behave very differently",
      "Show enough liquidity to survive longer disposition timelines on higher-end product",
    ],
  },
  'florida/tampa': {
    lenderView:
      "Tampa is attractive to lenders because the market often balances resale demand with workable entry points. It tends to reward investors who stay disciplined on neighborhood-level pricing and do not over-renovate into a resale bracket the buyer pool will not support. Fix and flip, bridge, and rental-transition files all work here when the borrower is honest about hold costs and insurance.",
    borrowerFocus: [
      "Use neighborhood-level comps in Seminole Heights, West Tampa, and other fast-moving submarkets",
      "Budget insurance and hold costs clearly so the file still works if timing stretches",
      "Match the debt to the exit plan instead of forcing short-term capital into a long-hold strategy",
    ],
  },
  'florida/orlando': {
    lenderView:
      "Orlando lenders usually like multiple exit paths, especially when a property can work as resale, long-term rental, or short-term rental depending on the area. The market moves best for borrowers who understand local rules and who can explain whether the property is really a tourist-corridor play, a suburban family-home flip, or a rental hold in a job-driven submarket.",
    borrowerFocus: [
      "Clarify whether the property is a flip, long-term hold, or short-term rental before underwriting",
      "Support the rent or resale story with local data instead of broad Orlando growth assumptions",
      "Prepare for zoning, STR restrictions, or HOA limits before relying on the most aggressive exit",
    ],
  },
  'texas/dallas': {
    lenderView:
      "Dallas tends to reward borrowers who keep the file simple and disciplined. Lenders like the metro because of depth and liquidity, but they still want to see realistic taxes, conservative resale assumptions, and comps tied to the actual neighborhood instead of a wide DFW radius. The file usually gets stronger when the borrower shows they understand exactly who the end buyer or tenant is.",
    borrowerFocus: [
      "Budget property taxes honestly because they can materially change the hold math",
      "Keep ARV and rent support tied to the exact submarket rather than metro-wide averages",
      "Show a resale or refinance path that still works if pricing softens slightly",
    ],
  },
  'texas/houston': {
    lenderView:
      "Houston gives lenders a lot of volume, but it also demands discipline around flood exposure, taxes, and neighborhood-specific demand. The strongest Houston files are the ones where the borrower has already accounted for insurance, understands whether the area is a flip market or a cash-flow market, and has not confused permissive development rules with automatic project profitability.",
    borrowerFocus: [
      "Address flood, insurance, and tax exposure before the term sheet stage",
      "Separate appreciation-driven neighborhoods from true cash-flow neighborhoods in the underwriting story",
      "Use realistic timelines for resale and construction, especially in outer suburban markets",
    ],
  },
  'georgia/atlanta': {
    lenderView:
      "Atlanta is deep enough that lenders can get comfortable quickly when the borrower knows the submarket. The city supports flips, bridge situations, and rental holds, but not every neighborhood behaves the same. Strong files usually explain exactly why the property works in that specific pocket of Atlanta rather than leaning on broad metro growth and hoping the lender fills in the rest.",
    borrowerFocus: [
      "Anchor value and rent assumptions to the exact neighborhood rather than just 'Atlanta'",
      "Decide early whether the deal is best as resale, BRRRR, or stabilized rental debt",
      "Bring a scope and contractor plan that match the finish level of nearby sold comps",
    ],
  },
  'north-carolina/charlotte': {
    lenderView:
      "Charlotte lenders usually like the combination of migration, employer growth, and broad buyer demand, but they still want to know the property fits the local price band. The strongest Charlotte deals tend to be the ones with clean suburban or in-town buyer pools, realistic rehab plans, and a refinance path that makes sense if the borrower intends to hold.",
    borrowerFocus: [
      "Match renovation quality to the neighborhoodÃ¢â‚¬â„¢s actual buyer expectations",
      "Use current local comps instead of leaning on citywide appreciation headlines",
      "Show reserves and a refinance plan on hold-oriented deals",
    ],
  },
  'north-carolina/raleigh': {
    lenderView:
      "Raleigh looks strong to lenders because of the Research TriangleÃ¢â‚¬â„¢s employment base, but the best files are still conservative. Borrowers who rely on local rent support, clear resale comps, and a straightforward scope usually get cleaner execution than borrowers who assume macro growth alone makes the deal safe.",
    borrowerFocus: [
      "Support the property story with local comps and rent data from the exact submarket",
      "Avoid over-improving into a price point the neighborhood does not consistently trade at",
      "Prepare a realistic timeline for both renovation and exit, especially on first projects",
    ],
  },
  'california/los-angeles': {
    lenderView:
      "Los Angeles files are often less about finding demand and more about proving control over execution. Lenders usually focus on whether the borrower understands permit timing, neighborhood resale ceilings, and how much capital the project may require if the hold extends. Strong LA files are disciplined, local, and financially overprepared rather than merely optimistic.",
    borrowerFocus: [
      "Use hyper-local comps because pricing can change materially from one pocket to the next",
      "Budget for permit, hold, and insurance friction instead of assuming a straight-line timeline",
      "Show enough liquidity to absorb change orders or slower resale in premium markets",
    ],
  },
  'california/san-diego': {
    lenderView:
      "San Diego usually rewards borrowers who combine good local comp support with a realistic understanding of coastal versus inland behavior. Lenders like the long-term demand profile, but they still need a believable plan around pricing, construction timing, and the specific neighborhood buyer pool. ADU and small multifamily angles can work well when the borrower can document the completed value convincingly.",
    borrowerFocus: [
      "Keep the underwriting story specific to the neighborhood and property type",
      "Document ADU, multifamily, or value-add assumptions with strong local support",
      "Model the deal so it still works if resale or lease-up takes longer than planned",
    ],
  },
  'new-jersey/camden-county': {
    lenderView:
      "Camden County is not one uniform market. A lender will separate Camden, Pennsauken, Cherry Hill, Haddonfield, Voorhees, and the smaller boroughs because purchase basis, rents, taxes, condition, and resale liquidity differ. The cleanest files use municipality-level comps, a line-item scope, current taxes and insurance, and one clear sale or refinance exit.",
    borrowerFocus: [
      'Use nearby sales or rent comps that match the municipality, property type, unit count, and condition',
      'Send a line-item scope, current photos, contractor plan, taxes, insurance, reserves, and tenant status',
      'Choose the debt for the stage of the property: rehab or bridge first, DSCR after stabilization',
    ],
  },
  'new-jersey/cherry-hill': {
    lenderView:
      "Cherry Hill files usually depend on disciplined basis, close resale comps, property taxes, permit timing, and a renovation level that matches the local buyer or tenant pool. Higher values can support strong exits, but they also leave less room for an inflated ARV or an overbuilt scope.",
    borrowerFocus: [
      'Use recent Cherry Hill comps that match neighborhood, style, size, condition, and buyer price band',
      'Confirm zoning and permit requirements before finalizing the scope or closing timeline',
      'Model taxes, insurance, carrying costs, and reserves before asking for maximum leverage',
    ],
  },
  'new-jersey/pennsauken': {
    lenderView:
      "Pennsauken can support flips, small multifamily, and rental strategies, but the file needs clean legal-unit information, tenant status, local comps, and a plan for township resale, inspection, rental-registration, or zoning requirements. Lenders want to see those items before they become closing or refinance surprises.",
    borrowerFocus: [
      'Document legal unit count, current occupancy, leases or market rents, and property condition',
      'Check township sale inspection, rental registration, property maintenance, and zoning requirements early',
      'Use Pennsauken comps and realistic taxes, insurance, scope, reserves, and exit timing',
    ],
  },
  'new-jersey/camden': {
    lenderView:
      "Camden files are highly block- and condition-sensitive. A low purchase price does not make a loan safe by itself. Lenders need tight comps, title clarity, a controlled rehab scope, a realistic tenant or buyer profile, reserves, and a credible sale or DSCR refinance plan.",
    borrowerFocus: [
      'Use block-level value and rent support instead of broad Camden County averages',
      'Address title, property condition, tenant status, taxes, insurance, contractor plan, and reserves upfront',
      'Show that the exit still works if rehab, lease-up, or resale takes longer than planned',
    ],
  },
  'new-jersey/newark': {
    lenderView:
      "Newark can work well for experienced investors, especially on 2-4 unit, mixed-use, and value-add rental files, but lenders pay close attention to tenant status, taxes, municipal items, and block-level comps. The strongest Newark files show a real rent or resale path and do not rely on broad Essex County averages.",
    borrowerFocus: [
      "Document tenant status, rent support, taxes, insurance, and municipal timing early",
      "Use very local comps because values can move materially by neighborhood and property type",
      "Show reserves for hold time, rehab variance, and DSCR refinance timing if the exit is rental debt",
    ],
  },
  'new-jersey/jersey-city': {
    lenderView:
      "Jersey City files usually get reviewed through the lens of high basis, tight comps, condo or HOA restrictions, taxes, and exit liquidity. Lenders like the depth of demand, but they still need a borrower who understands the exact submarket, whether the asset is a condo, multifamily, or mixed-use property.",
    borrowerFocus: [
      "Separate Downtown, Journal Square, The Heights, Greenville, and Bergen-Lafayette comps",
      "Confirm HOA, condo, insurance, and tax assumptions before asking for maximum leverage",
      "Support DSCR files with leases, rent rolls, and conservative payment coverage",
    ],
  },
  'new-jersey/bergen-county': {
    lenderView:
      "Bergen County can be attractive collateral because of deep buyer demand and strong suburban liquidity, but loan files still need disciplined pricing. Lenders usually want town-specific comps, a realistic finish level, and a clear answer on whether the exit is resale, bridge payoff, or DSCR refinance.",
    borrowerFocus: [
      "Keep comps town-specific instead of relying on broad Bergen County averages",
      "Match rehab quality to the buyer pool and price band of the exact municipality",
      "Model taxes and insurance carefully because they can change the DSCR or flip margin",
    ],
  },
  'new-jersey/hudson-county': {
    lenderView:
      "Hudson County is dense and liquid, but complexity is common. Lenders focus on unit mix, tenant status, municipal requirements, taxes, insurance, and whether the borrower understands the difference between Jersey City, Hoboken, Bayonne, Union City, and North Bergen execution.",
    borrowerFocus: [
      "Document unit mix, rent status, and lease terms clearly on multifamily files",
      "Use city-specific comps and rents instead of one county-wide valuation story",
      "Confirm the payoff path before using bridge debt as a path into DSCR financing",
    ],
  },
  'new-york/queens': {
    lenderView:
      "Queens files can be attractive because of rental depth and resale liquidity, but lenders expect discipline around property type, tenant status, taxes, insurance, and exact-neighborhood comps. Astoria, Jamaica, Flushing, and Ridgewood do not underwrite the same way.",
    borrowerFocus: [
      "Use neighborhood-specific comps and rents instead of one borough-wide valuation story",
      "Document legal unit count, tenant status, taxes, insurance, and any municipal or title issues early",
      "Show whether the exit is resale, bridge payoff, or DSCR refinance before asking for leverage",
    ],
  },
  'new-york/bronx': {
    lenderView:
      "Bronx investor files usually rise or fall on unit mix, tenant status, rent support, building condition, and whether the borrower has enough reserves to manage timing. Lenders like clear multifamily stories, but weak documentation can slow the file quickly.",
    borrowerFocus: [
      "Prepare rent roll, leases, tenant status, taxes, insurance, and property condition details upfront",
      "Use submarket comps because Riverdale, Wakefield, Mott Haven, and Soundview behave differently",
      "Model the DSCR or resale exit with conservative timing and realistic operating costs",
    ],
  },
  'new-york/nassau-county': {
    lenderView:
      "Nassau County files tend to be reviewed around suburban buyer demand, higher basis, taxes, and town-specific resale comps. Lenders like strong liquidity and clean exit support because small differences in purchase basis or renovation scope can change margin materially.",
    borrowerFocus: [
      "Keep ARV comps town-specific instead of relying on broad Long Island averages",
      "Model taxes, insurance, and hold costs carefully before requesting max leverage",
      "Match the scope and finish level to the local buyer pool and price band",
    ],
  },
  'new-york/westchester-county': {
    lenderView:
      "Westchester County can support strong investor exits, but lenders want very local proof. Yonkers, White Plains, New Rochelle, Mount Vernon, and suburban towns have different rent, resale, tax, and buyer profiles.",
    borrowerFocus: [
      "Use municipality-specific comps and rent support",
      "Budget property taxes and insurance with care because they can change DSCR and flip margin",
      "Show reserves and a payoff path that still works if approvals or resale timing stretches",
    ],
  },
};

export default function CityPage({ city, nearby = [] }: CityPageProps) {
  const cityGuidance = PRIORITY_CITY_GUIDANCE[`${city.stateSlug}/${city.citySlug}`];

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
                {city.cityName}, {city.stateAbbreviation}
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Hard Money Loans in {city.cityName}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Fast, flexible real estate investment financing for {city.cityName} investors. Fix & flip, bridge, DSCR rental, and construction loans with responses within 24 hours and closings in as fast as 5 days.
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
              <div className="text-2xl md:text-3xl font-bold text-primary">{city.medianHomePrice}</div>
              <div className="text-sm text-muted-foreground">Median Home Price</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{city.population}</div>
              <div className="text-sm text-muted-foreground">Population</div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real Estate Investing in {city.cityName}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {city.overview}
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                Investment Highlight
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {city.investmentHighlight}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Neighborhoods */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Popular Investment Neighborhoods in {city.cityName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {city.topNeighborhoods.map((neighborhood, i) => (
              <motion.div
                key={neighborhood}
                className="flex items-center gap-2 bg-card border border-border rounded-lg p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium text-sm">{neighborhood}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {city.cityName} Hard Money Loan Fit
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                AssetLift is best fit for business-purpose investment property loans where the
                borrower can document the property, the numbers, and the exit. These pages are not
                built for owner-occupied or consumer mortgage requests.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                '$100K+ loan requests',
                '660+ credit preferred',
                'Non-owner-occupied property',
                'Fix and flip, bridge, DSCR, or construction exit',
              ].map((item) => (
                <div key={item} className="rounded-xl border border-border bg-card p-5">
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Usually Gets a {city.cityName} Deal Moving Faster
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The cleanest files in {city.cityName} usually have a realistic budget, market
                support for the value or rent story, and a borrower who already knows whether the
                exit is a sale, a refinance, or a longer hold. Speed matters, but clarity matters
                more. A fast lender still needs a file that makes sense.
              </p>
              <div className="space-y-4">
                {[
                  `A deal strategy that fits ${city.cityName}'s pricing and neighborhood comps`,
                  'A title, insurance, and entity setup that will not create last-minute closing friction',
                  'Numbers that still work if the sale timeline or refinance timing stretches',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Useful Resources</h3>
              <div className="space-y-3">
                {[
                  { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
                  { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
                  { label: 'Experienced Flipper Loan File Checklist', href: '/blog/how-experienced-flippers-package-deals-for-fast-approval' },
                  { label: 'How to Compare Hard Money Term Sheets', href: '/blog/how-to-compare-hard-money-term-sheets' },
                  { label: 'What Lenders Look For in Scope of Work', href: '/blog/what-lenders-look-for-in-scope-of-work' },
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
                Financing Paths Investors Commonly Use in {city.cityName}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The strongest {city.cityName} files usually match the debt to the stage of the
                asset. Transitional properties often fit bridge or rehab financing first.
                Stabilized rentals tend to work better with DSCR debt. Construction projects need
                stronger contractor, budget, and draw logic from the beginning.
              </p>
              <div className="space-y-4">
                {[
                  `Use bridge or rehab capital when the ${city.cityName} property still needs work or repositioning`,
                  'Shift into long-term rental debt once condition and income support are stable',
                  'Make sure taxes, insurance, and hold costs still leave room if timing slips',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">More Investor Guides</h3>
              <div className="space-y-3">
                {[
                  { label: 'What Is a Hard Money Loan?', href: '/blog/what-is-a-hard-money-loan' },
                  { label: 'DSCR File Checklist for Portfolio Investors', href: '/blog/dscr-loan-file-checklist-portfolio-investors' },
                  { label: 'New Jersey Investor Loan File Guide', href: '/blog/new-jersey-investor-loan-file-guide' },
                  { label: 'What Reserves Do Lenders Want?', href: '/blog/what-reserves-do-lenders-want' },
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

      {cityGuidance && (
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  How Lenders Usually View {city.cityName} Deals
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {cityGuidance.lenderView}
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  What Strong {city.cityName} Files Usually Include
                </h3>
                <div className="space-y-4">
                  {cityGuidance.borrowerFocus.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
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
            Loan Programs Available in {city.cityName}
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
            {city.cityName} Hard Money Lending FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {city.faqs.map((faq, i) => (
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

      {nearby.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">More {city.stateName} markets we cover</h2>
              <p className="text-muted-foreground mb-6">
                Local lending pages for nearby {city.stateName} investor markets, plus the statewide hub.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[...nearby, { label: `All ${city.stateName} lending`, href: `/lending/${city.stateSlug}` }].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Invest in {city.cityName}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Get funded for your next {city.cityName} deal. Hear back within 24 hours, usually within a few hours.
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
