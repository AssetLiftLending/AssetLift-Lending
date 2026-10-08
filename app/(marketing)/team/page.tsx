import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Building2, Clock, MapPin, DollarSign, Shield, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = createMetadata({
  title: 'AssetLift Lending Team | Private Lending Leadership',
  description:
    'Meet the AssetLift Lending team behind our table-funded real estate lending platform for fix and flip, DSCR, bridge, and construction financing across 46 states.',
  path: '/team',
  noIndex: true,
});

const teamMembers = [
  {
    initials: 'YP',
    name: 'Yaakov Pentelnik',
    title: 'Co-Founder & Managing Partner',
    bio: 'Leads deal origination and borrower relationships at AssetLift Lending. Focused on building a lending platform that moves at the speed investors need, with the transparency and reliability to back it up.',
  },
  {
    initials: 'IP',
    name: 'Yisroel Pentelnik',
    title: 'Co-Founder & Head of Capital Markets',
    bio: 'Manages lender relationships, capital allocation, and portfolio strategy. Responsible for maintaining consistent funding capacity across all loan programs and markets.',
  },
];

const companyStats = [
  { icon: MapPin, label: 'Lending in 46 states', detail: 'Nationwide coverage' },
  { icon: DollarSign, label: 'Loans up to $5MM', detail: 'Flexible capital' },
  { icon: Clock, label: 'Fast closings on many files', detail: '5 business days for many straightforward files' },
  { icon: Building2, label: 'Response within 24 hours', detail: 'Usually within a few hours' },
];

export default function TeamPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AssetLift Lending',
    url: 'https://www.assetliftlending.com',
    description:
      'Table-funded real estate lending for investors nationwide — fix and flip, DSCR, bridge, and construction loans in 46 states.',
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Queens',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    areaServed: 'US',
    founder: [
      {
        '@type': 'Person',
        name: 'Yaakov Pentelnik',
        jobTitle: 'Co-Founder & Managing Partner',
      },
      {
        '@type': 'Person',
        name: 'Yisroel Pentelnik',
        jobTitle: 'Co-Founder & Head of Capital Markets',
      },
    ],
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Our Team' }]} />
          </div>

          {/* Hero */}
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Meet the <span className="gradient-text">AssetLift Team</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AssetLift Lending is led by a team of experienced real estate finance professionals
              with deep roots in private lending, underwriting, and capital markets. We built
              this platform because we believe real estate investors deserve a lender that
              moves as fast as they do, with the transparency and reliability to back it up.
            </p>
          </div>

          {/* Leadership Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Leadership</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto mb-5">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {companyStats.map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{stat.label}</h3>
                <p className="text-muted-foreground text-sm">{stat.detail}</p>
              </div>
            ))}
          </div>

          {/* Our Approach */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-secondary/20 border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-5">Our Approach to Lending</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                AssetLift structures deals through the lending path that best fits the file.
                In practice, that means funding loans with private capital
                from capital partners when the program, market, or scenario calls for it. What
                matters to borrowers is clear communication, realistic terms, and a team that stays
                accountable from inquiry through closing.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Direct Capital, Direct Decisions</p>
                      <p className="text-sm text-muted-foreground">
                        We work to match each deal to the most reliable private lending or
                        capital-partner path available for the file.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Transparent Process</p>
                      <p className="text-sm text-muted-foreground">
                        You will know your terms upfront and your loan officer stays with you
                        from application through funding.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Speed That Wins Deals</p>
                      <p className="text-sm text-muted-foreground">
                        In competitive markets, closing speed is a competitive advantage. Our
                        streamlined process is built to get you to the closing table faster.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Built for Repeat Borrowers</p>
                      <p className="text-sm text-muted-foreground">
                        Our programs reward track record. The more you work with us, the better
                        your terms and the smoother the process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Our Team?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Hear back within 24 hours, usually within a few hours. Our team is ready to review your deal and move fast.
            </p>
            <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary">
              <Link href="/apply">
                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
