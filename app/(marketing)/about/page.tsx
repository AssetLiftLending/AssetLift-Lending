import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Users, Award, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = createMetadata({
  title: 'About Us | Private Real Estate Lending',
  description:
    'AssetLift Lending provides private financing for real estate investors. Fix & flip, DSCR, bridge, and construction loans in 46 states.',
  path: '/about',
});

export default function AboutPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    description: 'Private lending for real estate investors in 46 states. Fast closings, direct communication, funded with our capital partners.',
    url: 'https://www.assetliftlending.com',
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Queens',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    areaServed: 'US',
    priceRange: '$100,000 - $5,000,000',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+1-929-639-2284',
      email: 'info@assetliftlending.com',
      areaServed: 'US',
    },
    knowsAbout: [
      'Hard money loans',
      'Fix and flip financing',
      'Bridge loans',
      'DSCR rental loans',
      'Ground-up construction financing',
      'Real estate investor lending',
    ],
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          </div>

          {/* Hero */}
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              About <span className="gradient-text">AssetLift Lending</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              AssetLift Lending is a private lender built for real estate investors who need speed, certainty, and competitive terms. We are not a retail bank. We fund deals with our capital partners, which means we can match each deal to the right source of capital instead of forcing every file into one credit box.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Founded by Yaakov Pentelnik and Yisroel Pentelnik, AssetLift was born out of a straightforward frustration: too many real estate investors were losing deals because their lender could not move fast enough, communicate clearly enough, or think creatively enough about the file. The brothers saw an opportunity to build a lender that combined hands-on real estate knowledge with access to multiple capital sources, giving borrowers better options and faster execution.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our team combines real estate investing experience with institutional-style underwriting to deliver financing that actually works for investors in the field. Whether you are flipping your first house or scaling a portfolio of rental properties, we work to match each file to the lending approach that best fits the strategy.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We finance deals nationwide across 46 states, with loan amounts from $100,000 to $5,000,000. Our loan programs cover the full spectrum of investment real estate: fix and flip, ground-up construction, DSCR rental, and bridge financing. Based in the New York metro area, we serve borrowers from coast to coast with the same level of responsiveness and attention to detail.
            </p>
          </div>

          {/* Founders */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-6 text-center">Meet the Founders</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-3">Yaakov Pentelnik</h3>
                <p className="text-sm font-medium text-primary mb-3">Co-Founder</p>
                <p className="text-muted-foreground leading-relaxed">
                  Yaakov brings deep experience in real estate finance and a borrower-first mindset to every deal AssetLift touches. His background in structuring investment property transactions means he understands the pressure points borrowers face: tight closing deadlines, appraisal gaps, title issues, and the kind of last-minute friction that kills deals. He built AssetLift to eliminate as much of that friction as possible by maintaining relationships with multiple capital partners and staying hands-on through every file.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-3">Yisroel Pentelnik</h3>
                <p className="text-sm font-medium text-primary mb-3">Co-Founder</p>
                <p className="text-muted-foreground leading-relaxed">
                  Yisroel focuses on operations, underwriting workflow, and making sure the borrower experience at AssetLift stays fast and transparent as the company scales. He is the person making sure files move through the pipeline without unnecessary delays, that borrowers get honest feedback early, and that the team maintains the responsiveness that sets AssetLift apart from larger shops. His operational discipline keeps the company running efficiently across 46 states.
                </p>
              </div>
            </div>
          </div>

          {/* Capital partner model */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-5">Our Capital Partner Model: Why It Matters</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Most borrowers do not care how their lender is structured. They care about rate, speed, and whether the deal actually closes. But the structure behind the scenes matters more than most people realize, because it determines how flexible the lender can be when the file does not fit neatly into a standard box.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              AssetLift funds loans with the backing of our capital partners. In practice, that means we are not locked into a single set of guidelines. If one capital source cannot do the deal because of property type, borrower experience, leverage, or geography, we have other options. A lender with only one source of capital has nowhere else to turn when a file does not fit. We usually can find a fit.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              This model also lets us be more competitive on pricing. Because we work with multiple capital sources, we can shop the deal internally and offer the borrower the best available terms rather than the only available terms. For repeat investors doing multiple deals a year, that difference in rate or leverage can add up to tens of thousands of dollars in savings.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The tradeoff is that we have to be selective about which capital partners we work with. We vet our capital sources for reliability, speed, and fair dealing, because our reputation depends on the borrower&apos;s experience from application through payoff. If a capital partner cannot close on time or creates unnecessary friction, we stop working with them.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4">Licensing and Operating Details</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold mb-1">Company</p>
                <p className="text-muted-foreground">AssetLift Lending</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Coverage</p>
                <p className="text-muted-foreground">46 U.S. states, loans from $100K to $5M</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Structure</p>
                <p className="text-muted-foreground">Private lender funding with capital partners</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Phone</p>
                <p className="text-muted-foreground">(929) 639-2284</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Email</p>
                <p className="text-muted-foreground">info@assetliftlending.com</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Office</p>
                <p className="text-muted-foreground">Queens, NY</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {[
              { icon: Zap, title: 'Speed', desc: 'Every inquiry gets a response within 24 hours, usually within a few hours. Many deals close in as few as 5 business days, subject to underwriting, valuation, title, and file complexity. We know that in competitive markets, a slow lender costs you the deal.' },
              { icon: Shield, title: 'Transparency', desc: 'No hidden fees, no bait-and-switch term sheets. We surface potential issues early in the process so you can make informed decisions before you spend more time or money on the file. If we cannot do the deal, we tell you upfront.' },
              { icon: Users, title: 'Flexibility', desc: 'We focus on experienced investors and organized borrowers with real deals, clear numbers, and executable exit plans. Because we fund through multiple capital partners, we can find solutions for files that a single-source lender would decline. Different deal, different source, same service.' },
              { icon: Award, title: 'Expertise', desc: 'Our founders and team bring hands-on real estate investing experience to every file. We understand rehab scopes, ARV analysis, rental market dynamics, and exit strategies because we have been on the borrower side of the table.' },
            ].map((value, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-5">What Borrowers Actually Need From a Lender</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Sophisticated investors rarely choose a lender on headline rate alone. They want a
                lender that can underwrite quickly, explain friction early, and still close when
                the file has moving parts. That is the gap AssetLift is trying to fill.
              </p>
              <div className="space-y-4">
                {[
                  'Direct communication when a deal has valuation, title, or insurance issues',
                  'Product fit across short-term flips, bridge situations, construction, and rental holds',
                  'Execution that helps investors protect margin, not just get a term sheet',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Explore Loan Programs</h3>
              <div className="space-y-3">
                {[
                  { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
                  { label: 'Ground-Up Construction', href: '/loans/ground-up-construction' },
                  { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
                  { label: 'Bridge Loans', href: '/loans/bridge' },
                ].map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="font-medium">{resource.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-secondary/20 border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-4">Common Deal Profiles We See</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                These are not testimonials or promised outcomes. They are the types of investor
                situations our team regularly underwrites, which is often more useful than generic
                marketing copy when you are trying to decide if a lender fits the business plan.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Fix & Flip Execution',
                    desc: 'Borrowers buying outdated single-family homes with a defined rehab scope, realistic ARV support, and a short resale timeline.',
                  },
                  {
                    title: 'Bridge to Stabilization',
                    desc: 'Investors using short-term capital to close quickly, solve timing issues, or carry a property through lease-up before refinancing.',
                  },
                  {
                    title: 'BRRRR and Rental Holds',
                    desc: 'Operators improving a property, seasoning the rent story, and moving into DSCR financing once the asset is stable enough for long-term debt.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 mb-20">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-4">How We Think About Execution</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Investors usually remember a lender for one of two reasons: the file stayed on
                track when the deal became messy, or the lender created avoidable friction after
                making a strong first impression. AssetLift is designed around the first outcome.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                That means surfacing issues early, staying realistic about leverage and timeline,
                and matching the loan structure to the actual business plan instead of the most
                aggressive version of the story. A clean bridge file should move differently than a
                ground-up build, and a BRRRR refinance should move differently than a complex
                value-add flip.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our approach is operationally simple: communicate quickly, underwrite the actual
                risk, and make sure borrowers know what can still derail the closing before they
                sink more time or money into the file.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-4">Who We Work Best With</h2>
              <div className="space-y-4">
                {[
                  'Investors buying properties that need speed, rehab funding, or a non-bank credit box',
                  'Borrowers who want a lender that understands both flip exits and rental transitions',
                  'Operators who need realistic feedback on leverage, reserves, valuation support, and closing friction',
                  'Repeat borrowers and referral partners looking for consistent communication across multiple deals',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Have a Deal? Send It Over.</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              No commitment, no hard credit pull to get a quote. Submit the file and we&apos;ll tell you what&apos;s workable, what leverage looks like, and the fastest path to closing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+19296392284" className="hover:text-primary transition-colors">(929) 639-2284</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@assetliftlending.com" className="hover:text-primary transition-colors">info@assetliftlending.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Queens, NY</span>
              </div>
            </div>
            <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary">
              <Link href="/apply">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
