import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from './ContactForm';

export const metadata: Metadata = createMetadata({
  title: 'Contact | Hard Money Loan Quotes',
  description:
    'Contact AssetLift Lending for fast hard money loan quotes on fix and flip, DSCR, bridge, construction, and commercial lending deals. Call, email, or apply online today.',
  path: '/contact',
});

export default function ContactPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'AssetLift Lending',
    telephone: '+1-929-639-2284',
    email: 'info@assetliftlending.com',
    url: 'https://www.assetliftlending.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Queens',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+1-929-639-2284',
      email: 'info@assetliftlending.com',
      areaServed: 'US',
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <div className="pt-32 pb-20 md:pt-40">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
          </div>

          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a deal to discuss? Need a quote? Our team will get back to you within 24 hours, and usually within a few hours during business hours.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-3">Before You Reach Out</h2>
              <p className="text-muted-foreground mb-4">
                AssetLift handles business-purpose financing for non-owner-occupied investment
                properties. Depending on the file, a transaction may be funded directly or may be
                placed with a lending partner.
              </p>
              <p className="text-muted-foreground">
                If you want more detail on how those structures work, review our{' '}
                <Link href="/how-funding-works" className="text-primary hover:text-primary/80 transition-colors">
                  How Funding Works
                </Link>{' '}
                and{' '}
                <Link href="/licensing" className="text-primary hover:text-primary/80 transition-colors">
                  Licensing & Disclosures
                </Link>{' '}
                pages.
              </p>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            <a
              href="tel:+19296392284"
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Call Us</h3>
              <p className="text-muted-foreground text-sm">+1 (929) 639-2284</p>
            </a>
            <a
              href="mailto:info@assetliftlending.com"
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Email Us</h3>
              <p className="text-muted-foreground text-sm">info@assetliftlending.com</p>
            </a>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Office</h3>
              <p className="text-muted-foreground text-sm">
                Queens, NY
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Hours</h3>
              <p className="text-muted-foreground text-sm">
                Mon - Fri: 9AM - 6PM EST<br />Weekend: By appointment
              </p>
            </div>
          </div>

          {/* Two-path section: contact form + apply CTA */}
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Contact form */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Have a question, want to introduce yourself, or just not ready to apply yet? Send us a note and we&apos;ll get back to you within a few hours.
              </p>
              <ContactForm />
            </div>

            {/* Apply CTA */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col">
              <h2 className="text-2xl font-bold mb-2">Have a Deal Ready?</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Submit your deal details and get a real answer on leverage, rate, and timeline — usually within a few hours.
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6 glow-primary mb-6">
                <Link href="/apply">
                  Review My Deal <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <div className="mt-auto space-y-2">
                {[
                  { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
                  { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
                  { label: 'Bridge Loans', href: '/loans/bridge' },
                  { label: 'How It Works', href: '/how-it-works' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
