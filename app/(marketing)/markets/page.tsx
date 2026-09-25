import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LendingCoverageMap from "@/components/seo/LendingCoverageMap";
import { STATES } from "@/lib/data/states";
import { CITIES } from "@/lib/data/cities";

export const metadata: Metadata = createMetadata({
  title: "Hard Money Lender by State | 46 Lending Markets",
  description:
    "Browse AssetLift Lending markets by state and city for hard money loans, fix and flip financing, bridge loans, DSCR rentals, and construction deals.",
  path: "/markets",
});

const PRIORITY_STATE_SLUGS = [
  "new-jersey",
  "new-york",
  "connecticut",
];

const PRIORITY_CITY_SLUGS = [
  "camden-county",
  "camden",
  "cherry-hill",
  "pennsauken",
  "lakewood",
  "toms-river",
  "brick",
  "jackson",
  "howell",
  "newark",
  "jersey-city",
  "queens",
  "westchester-county",
  "bridgeport",
  "new-haven",
];

export default function MarketsPage() {
  const featuredStates = STATES.filter((state) => PRIORITY_STATE_SLUGS.includes(state.slug));
  const featuredCities = CITIES.filter((city) => PRIORITY_CITY_SLUGS.includes(city.citySlug));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AssetLift Lending Markets",
    description:
      "Hard money loan markets served by AssetLift Lending for real estate investors.",
    url: "https://www.assetliftlending.com/markets",
    mainEntity: [
      {
        "@type": "ItemList",
        name: "State Lending Pages",
        numberOfItems: STATES.length,
        itemListElement: STATES.map((state, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://www.assetliftlending.com/lending/${state.slug}`,
          name: `Hard Money Loans in ${state.name}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "City Lending Pages",
        numberOfItems: CITIES.length,
        itemListElement: CITIES.map((city, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://www.assetliftlending.com/lending/${city.stateSlug}/${city.citySlug}`,
          name: `Hard Money Loans in ${city.cityName}, ${city.stateAbbreviation}`,
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Markets" }]} />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Lending Coverage
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Hard Money Loan Markets for Real Estate Investors
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse the states where AssetLift Lending offers investor financing, then explore
              city and product pages that match your project type and exit strategy.
            </p>
          </div>

          <div className="mb-12">
            <LendingCoverageMap compact />
          </div>

          <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-8 mb-12">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">States We Serve</h2>
              <p className="text-muted-foreground mb-6">
                We lend across 46 states for investment-property deals, including fix and flip,
                bridge, DSCR rental, and ground-up construction scenarios.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {STATES.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/lending/${state.slug}`}
                    className="rounded-xl border border-border p-5 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <MapPin className="w-4 h-4" />
                      {state.name}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{state.marketHighlight}</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Median home price {state.medianHomePrice}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View {state.name} market <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Featured City Pages</h2>
              <p className="text-muted-foreground mb-6">
                Explore a few borrower-facing city pages with local market context, then move into
                the state or loan page that best matches the deal.
              </p>
              <div className="space-y-3">
                {featuredCities.map((city) => (
                  <Link
                    key={`${city.stateSlug}-${city.citySlug}`}
                    href={`/lending/${city.stateSlug}/${city.citySlug}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-4 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <div>
                      <p className="font-semibold">
                        {city.cityName}, {city.stateAbbreviation}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Median home price {city.medianHomePrice}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-border bg-secondary/20 p-4">
                <h3 className="font-semibold mb-2">Featured State Coverage</h3>
                <div className="flex flex-wrap gap-2">
                  {featuredStates.map((state) => (
                    <Link
                      key={state.slug}
                      href={`/lending/${state.slug}`}
                      className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary/50 transition-colors"
                    >
                      {state.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">City Landing Pages</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              City-level pages are where local hard money queries usually happen. Browse the full
              index below to move directly into metro-specific pages for borrowers searching terms
              like hard money lender, fix and flip loans, and bridge loans plus city modifiers.
            </p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {CITIES.map((city) => (
                <Link
                  key={`${city.stateSlug}-${city.citySlug}`}
                  href={`/lending/${city.stateSlug}/${city.citySlug}`}
                  className="rounded-xl border border-border p-4 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <p className="font-semibold mb-1">
                    {city.cityName}, {city.stateAbbreviation}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Median home price {city.medianHomePrice}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View city page <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-secondary/20 border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Match Market Intent to Product</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { label: "Fix & Flip Loans", href: "/loans/fix-and-flip" },
                { label: "Ground-Up Construction", href: "/loans/ground-up-construction" },
                { label: "DSCR Rental Loans", href: "/loans/dscr-rental" },
                { label: "Bridge Loans", href: "/loans/bridge" },
              ].map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="rounded-xl border border-border bg-card px-4 py-5 hover:border-primary/50 transition-colors"
                >
                  <p className="font-semibold mb-2">{product.label}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View product page <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
