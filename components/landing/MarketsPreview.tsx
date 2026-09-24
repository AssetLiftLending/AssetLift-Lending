import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LendingCoverageMap from "@/components/seo/LendingCoverageMap";
import { CITIES } from "@/lib/data/cities";

const FEATURED_CITY_SLUGS = [
  "queens",
  "brooklyn",
  "bronx",
  "nassau-county",
  "suffolk-county",
  "westchester-county",
  "yonkers",
  "newark",
  "jersey-city",
  "bergen-county",
  "hudson-county",
  "essex-county",
  "union-county",
  "middlesex-county",
  "monmouth-county",
  "ocean-county",
  "new-haven",
];

const FEATURED_CITIES = CITIES.filter((city) => FEATURED_CITY_SLUGS.includes(city.citySlug));

export default function MarketsPreview() {
  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold text-primary mb-4">
            Investor markets
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            We Lend Where Investors Invest
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore representative markets where AssetLift Lending reviews fix and flip, bridge,
            DSCR rental, and ground-up construction scenarios for qualified investment property
            borrowers.
          </p>
        </div>

        <LendingCoverageMap />

        <div className="mt-8">
          <div className="flex flex-wrap gap-2 mb-5">
            {FEATURED_CITIES.map((city) => (
              <Link
                key={`${city.stateSlug}-${city.citySlug}`}
                href={`/lending/${city.stateSlug}/${city.citySlug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary/50 transition-colors"
              >
                {city.cityName}, {city.stateAbbreviation}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/markets"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View all lending markets <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Compare lenders and loan options <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
