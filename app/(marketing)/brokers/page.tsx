import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BriefcaseBusiness, FileText, Handshake, LockKeyhole, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Broker Partners | Submit Investor Deals | AssetLift Lending',
  description:
    'AssetLift Lending works with mortgage brokers, commercial brokers, and referral partners on fix and flip, DSCR, bridge, construction, and commercial lending scenarios.',
  alternates: {
    canonical: 'https://www.assetliftlending.com/brokers',
  },
  robots: { index: false, follow: true },
};

const STEPS = [
  {
    title: 'Submit the scenario',
    description: 'Send the borrower, property, purchase price, rehab budget, ARV, credit profile, and timeline.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Track the file',
    description: 'Use the broker portal to see each deal status from submitted through term sheet, docs, closing, and funded.',
    icon: FileText,
  },
  {
    title: 'Receive term sheets',
    description: 'We can upload a term sheet directly to the deal record so your team can keep every file organized.',
    icon: Upload,
  },
];

export default function BrokersPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="border-b border-border pb-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Handshake className="h-4 w-4" />
                Broker Partners
              </div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-normal text-foreground md:text-6xl">
                We work with brokers on investor lending deals.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                AssetLift Lending helps brokers place fix and flip, DSCR rental, bridge, ground-up construction,
                and commercial lending scenarios for real estate investors. Submit the deal, track the file, and keep
                term sheets organized in one portal.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full font-bold">
                  <Link href="/portal">
                    Broker Login
                    <LockKeyhole className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full font-bold">
                  <Link href="/apply">
                    Submit a Deal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">Broker portal includes</h2>
              <div className="mt-5 space-y-4">
                {[
                  'Deal list by borrower, broker, property, loan type, and status',
                  'Pipeline stages for submitted, review, term sheet, docs, closing, and funded',
                  'Broker contact fields for each file',
                  'Term sheet upload and download on each deal record',
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container px-4 md:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
