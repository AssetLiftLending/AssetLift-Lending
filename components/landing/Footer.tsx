import Link from "next/link";
import Logo from "@/components/Logo";

const FEATURED_MARKETS = [
  { label: "Where We Lend", href: "/markets" },
  { label: "New York", href: "/lending/new-york" },
  { label: "New Jersey", href: "/lending/new-jersey" },
  { label: "Connecticut", href: "/lending/connecticut" },
  { label: "Camden County, NJ", href: "/lending/new-jersey/camden-county" },
  { label: "Cherry Hill, NJ", href: "/lending/new-jersey/cherry-hill" },
  { label: "Pennsauken, NJ", href: "/lending/new-jersey/pennsauken" },
  { label: "Camden, NJ", href: "/lending/new-jersey/camden" },
  { label: "Brooklyn, NY", href: "/lending/new-york/brooklyn" },
  { label: "Nassau County, NY", href: "/lending/new-york/nassau-county" },
  { label: "Yonkers, NY", href: "/lending/new-york/yonkers" },
  { label: "Jersey City, NJ", href: "/lending/new-jersey/jersey-city" },
  { label: "Newark, NJ", href: "/lending/new-jersey/newark" },
  { label: "Ocean County, NJ", href: "/lending/new-jersey/ocean-county" },
  { label: "State Disclosures", href: "/state-disclosures" },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Logo & tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <Logo size={38} />
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              Private real estate lending for investors buying, renovating, building, refinancing,
              and scaling investment property portfolios.
            </p>
          </div>

          {/* Loan Programs */}
          <div>
            <h4 className="font-semibold mb-4">Loan Programs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/loans/fix-and-flip" className="hover:text-primary transition-colors">Fix &amp; Flip Loans</Link>
              </li>
              <li>
                <Link href="/loans/dscr-rental" className="hover:text-primary transition-colors">DSCR Rental Loans</Link>
              </li>
              <li>
                <Link href="/loans/bridge" className="hover:text-primary transition-colors">Bridge Loans</Link>
              </li>
              <li>
                <Link href="/loans/ground-up-construction" className="hover:text-primary transition-colors">Construction Loans</Link>
              </li>
              <li>
                <Link href="/loans/commercial-lending" className="hover:text-primary transition-colors">Commercial Lending</Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-primary transition-colors">Apply Now</Link>
              </li>
              <li>
                <Link href="/brokers" className="hover:text-primary transition-colors">Broker Partners</Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-primary transition-colors">Broker Login</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/answers/asset-based-loan-companies-real-estate-investors" className="hover:text-primary transition-colors">Asset-Based Lenders</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/resources/fix-and-flip-borrower-package" className="hover:text-primary transition-colors">Fix & Flip Borrower Package</Link>
              </li>
              <li>
                <Link href="/tools/fix-and-flip-calculator" className="hover:text-primary transition-colors">Fix & Flip Calculator</Link>
              </li>
              <li>
                <Link href="/tools/dscr-calculator" className="hover:text-primary transition-colors">DSCR Calculator</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Markets</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FEATURED_MARKETS.map((market) => (
                <li key={market.href}>
                  <Link href={market.href} className="hover:text-primary transition-colors">
                    {market.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:info@assetliftlending.com" className="hover:text-primary transition-colors">
                  info@assetliftlending.com
                </a>
              </li>
              <li>
                <a href="tel:+19296392284" className="hover:text-primary transition-colors">
                  +1 929-639-2284
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Asset Lift Lending. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>|</span>
            <Link href="/licensing" className="hover:text-primary transition-colors">
              Licensing
            </Link>
            <span>|</span>
            <Link href="/state-disclosures" className="hover:text-primary transition-colors">
              State Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
