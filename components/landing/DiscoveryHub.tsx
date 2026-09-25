import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HUB_LINKS = [
  {
    label: "Markets Hub",
    href: "/markets",
    blurb: "Priority state and city pages for experienced investor lending search intent.",
  },
  {
    label: "Comparison Hub",
    href: "/compare",
    blurb: "High-intent lender and loan-structure comparisons for borrowers evaluating options.",
  },
  {
    label: "Investor Q&A",
    href: "/answers",
    blurb: "Direct answers to common real estate investor questions about hard money, DSCR, and fix and flip financing.",
  },
  {
    label: "Blog",
    href: "/blog",
    blurb: "Investor education content focused on fix and flip, DSCR, and refinance queries.",
  },
  {
    label: "How Funding Works",
    href: "/how-funding-works",
    blurb: "Borrower-facing process content that strengthens trust and clarifies execution.",
  },
];

const PRIORITY_PAGES = [
  { label: "Fix & Flip Loans for Experienced Investors", href: "/loans/fix-and-flip" },
  { label: "DSCR Rental Loans for Portfolio Investors", href: "/loans/dscr-rental" },
  { label: "NY Fix & Flip Loans", href: "/lending/new-york/fix-and-flip-loans" },
  { label: "NY DSCR Loans", href: "/lending/new-york/dscr-loans" },
  { label: "NJ Fix & Flip Loans", href: "/lending/new-jersey/fix-and-flip-loans" },
  { label: "NJ DSCR Loans", href: "/lending/new-jersey/dscr-loans" },
  { label: "CT Fix & Flip Loans", href: "/lending/connecticut/fix-and-flip-loans" },
  { label: "CT DSCR Loans", href: "/lending/connecticut/dscr-loans" },
  { label: "Fix & Flip Calculator", href: "/tools/fix-and-flip-calculator" },
  { label: "DSCR Calculator", href: "/tools/dscr-calculator" },
  { label: "Hard Money Loans in New York", href: "/lending/new-york" },
  { label: "Hard Money Loans in New Jersey", href: "/lending/new-jersey" },
  { label: "Hard Money Loans in Connecticut", href: "/lending/connecticut" },
  { label: "Hard Money Loans in Queens", href: "/lending/new-york/queens" },
  { label: "Hard Money Loans in Brooklyn", href: "/lending/new-york/brooklyn" },
  { label: "Hard Money Loans in Nassau County", href: "/lending/new-york/nassau-county" },
  { label: "Hard Money Loans in Westchester County", href: "/lending/new-york/westchester-county" },
  { label: "Hard Money Loans in Camden County", href: "/lending/new-jersey/camden-county" },
  { label: "Hard Money Loans in Cherry Hill", href: "/lending/new-jersey/cherry-hill" },
  { label: "Hard Money Loans in Pennsauken", href: "/lending/new-jersey/pennsauken" },
  { label: "Hard Money Loans in Lakewood", href: "/lending/new-jersey/lakewood" },
  { label: "Hard Money Loans in Toms River", href: "/lending/new-jersey/toms-river" },
  { label: "Hard Money Loans in Brick", href: "/lending/new-jersey/brick" },
  { label: "Hard Money Loans in Jackson", href: "/lending/new-jersey/jackson" },
  { label: "Hard Money Loans in Howell", href: "/lending/new-jersey/howell" },
  { label: "Hard Money Loans in Newark", href: "/lending/new-jersey/newark" },
  { label: "Hard Money Loans in Jersey City", href: "/lending/new-jersey/jersey-city" },
  { label: "Hard Money Loans in Bergen County", href: "/lending/new-jersey/bergen-county" },
  { label: "Hard Money Loans in Hudson County", href: "/lending/new-jersey/hudson-county" },
  { label: "DSCR Loans: No Income Verification", href: "/answers/best-dscr-lender-no-income-verification" },
  { label: "100% Rehab Funding Explained", href: "/answers/fix-and-flip-loans-100-percent-rehab-funding" },
  { label: "Experienced Flipper Loan File Checklist", href: "/blog/how-experienced-flippers-package-deals-for-fast-approval" },
  { label: "DSCR File Checklist for Portfolio Investors", href: "/blog/dscr-loan-file-checklist-portfolio-investors" },
];

export default function DiscoveryHub() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Site Guide
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Start With the Right Page for Your Deal
          </h2>
          <p className="text-lg text-muted-foreground">
            These hubs make the site easier for borrowers to navigate and easier for Google to
            crawl. Start with the path that matches the property, market, or financing question you
            are working through right now.
          </p>
        </div>

        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4">Primary Crawl Hubs</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {HUB_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-border bg-background p-5 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold mb-2">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.blurb}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-secondary/20 p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4">Priority Pages</h3>
            <p className="text-sm text-muted-foreground mb-5">
              These are the pages most likely to support qualified borrower discovery in the states
              and products you want most.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PRIORITY_PAGES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-border bg-card px-4 py-4 text-sm font-medium hover:border-primary/50 hover:bg-background transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
