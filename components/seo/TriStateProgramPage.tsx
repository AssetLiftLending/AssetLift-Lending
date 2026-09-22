import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, MapPin, Phone } from 'lucide-react';
import type { TriStateProgramPage as TriStateProgramPageData } from '@/lib/data/tri-state-program-pages';
import { CITIES } from '@/lib/data/cities';

interface Props {
  page: TriStateProgramPageData;
}

function siblingHref(page: TriStateProgramPageData) {
  const siblingSlug = page.programSlug === 'fix-and-flip-loans' ? 'dscr-loans' : 'fix-and-flip-loans';
  return `/lending/${page.stateSlug}/${siblingSlug}`;
}

function programHubHref(page: TriStateProgramPageData) {
  return page.programSlug === 'fix-and-flip-loans' ? '/loans/fix-and-flip' : '/loans/dscr-rental';
}

function calculatorHref(page: TriStateProgramPageData) {
  return page.programSlug === 'fix-and-flip-loans'
    ? '/tools/fix-and-flip-calculator'
    : '/tools/dscr-calculator';
}

const PROGRAM_GUIDES = {
  'fix-and-flip-loans': [
    {
      label: 'Experienced Flipper Loan File Checklist',
      href: '/blog/how-experienced-flippers-package-deals-for-fast-approval',
    },
    {
      label: 'What Lenders Look For in Scope of Work',
      href: '/blog/what-lenders-look-for-in-scope-of-work',
    },
    {
      label: 'How to Compare Hard Money Term Sheets',
      href: '/blog/how-to-compare-hard-money-term-sheets',
    },
  ],
  'dscr-loans': [
    {
      label: 'DSCR File Checklist for Portfolio Investors',
      href: '/blog/dscr-loan-file-checklist-portfolio-investors',
    },
    {
      label: 'DSCR Loan Reserves Explained',
      href: '/blog/dscr-loan-reserves-explained',
    },
    {
      label: 'What Reserves Do Lenders Want?',
      href: '/blog/what-reserves-do-lenders-want',
    },
  ],
} satisfies Record<TriStateProgramPageData['programSlug'], Array<{ label: string; href: string }>>;

function priorityMarketLinks(page: TriStateProgramPageData) {
  return CITIES.filter((city) => city.stateSlug === page.stateSlug).slice(0, 12);
}

export default function TriStateProgramPage({ page }: Props) {
  const marketLinks = priorityMarketLinks(page);
  const programGuides = PROGRAM_GUIDES[page.programSlug];

  return (
    <main>
      <section className="pt-10 pb-16 md:pb-20">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                {page.stateAbbreviation} Investor Lending
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                {page.h1}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {page.intro}
              </p>
              <div className="grid gap-3 sm:grid-cols-3 mb-8">
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Loan Size</p>
                  <p className="mt-1 font-bold">$100K-$5MM</p>
                </div>
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Borrower</p>
                  <p className="mt-1 font-bold">Experienced Investors</p>
                </div>
                <div className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Property</p>
                  <p className="mt-1 font-bold">Non-Owner Occupied</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={page.programSlug === 'dscr-loans' ? `/apply?loanPurpose=dscr&state=${page.stateAbbreviation}&source=${page.stateSlug}-dscr` : '/apply'}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {page.programSlug === 'dscr-loans' ? `Request ${page.stateName} DSCR Terms` : 'Upload Your Scenario Now'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a
                  href="tel:+19296392284"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-5">Best-Fit Borrower Profile</h2>
              <div className="space-y-4">
                {page.fit.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {page.stateSlug === 'new-york' && page.programSlug === 'dscr-loans' && (
        <section className="pb-14"><div className="container px-4 md:px-6"><div className="rounded-3xl border border-border bg-card p-6 md:p-8"><h2 className="mb-3 text-2xl font-bold">Review a New York rental property</h2><p className="mb-4 max-w-4xl text-muted-foreground">Send the property address, purchase price or current value, monthly rent, taxes, insurance, HOA or common charges, requested loan amount, entity details, and target closing date.</p><p className="mb-5 text-xs font-semibold uppercase tracking-wide text-primary">Business-purpose, non-owner-occupied properties only. Long-term lease support and short-term-rental assumptions are reviewed separately.</p><div className="flex flex-col gap-3 sm:flex-row"><Link href="/apply?loanPurpose=dscr&state=NY&source=new-york-dscr" className="rounded-lg bg-primary px-6 py-3 text-center font-semibold text-primary-foreground">Request New York DSCR Terms</Link><Link href="/tools/dscr-calculator" className="rounded-lg border border-border px-6 py-3 text-center font-semibold">Calculate DSCR</Link></div></div></div></section>
      )}

      <section className="py-14 md:py-18 bg-secondary/25">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <MapPin className="h-6 w-6 text-primary mb-4" />
              <h2 className="text-xl font-bold mb-4">Priority {page.stateAbbreviation} Markets</h2>
              <div className="flex flex-wrap gap-2">
                {marketLinks.map((market) => (
                  <Link
                    key={`${market.stateSlug}-${market.citySlug}`}
                    href={`/lending/${market.stateSlug}/${market.citySlug}`}
                    className="rounded-full bg-secondary px-3 py-1 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {market.cityName}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Local Underwriting Notes</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {page.localNotes.map((note) => (
                  <p key={note} className="rounded-xl bg-background p-4 text-sm text-muted-foreground">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Faster Review
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What to send with your scenario
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The goal is to qualify serious investor files quickly and avoid wasting time on
                owner-occupied, undercapitalized, or unclear requests.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {page.whatToPrepare.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-card p-5">
                  <FileText className="h-5 w-5 text-primary mb-3" />
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                {page.stateAbbreviation} {page.programName} Questions
              </h2>
              <div className="space-y-4">
                {page.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-border bg-secondary/25 p-6 md:p-8 h-fit">
              <h2 className="text-2xl font-bold mb-4">Related Pages</h2>
              <div className="grid gap-3">
                <Link className="rounded-xl bg-card border border-border px-4 py-3 text-sm font-medium hover:border-primary/50 transition-colors" href={`/lending/${page.stateSlug}`}>
                  {page.stateName} lending overview
                </Link>
                <Link className="rounded-xl bg-card border border-border px-4 py-3 text-sm font-medium hover:border-primary/50 transition-colors" href={programHubHref(page)}>
                  {page.programName} program details
                </Link>
                <Link className="rounded-xl bg-card border border-border px-4 py-3 text-sm font-medium hover:border-primary/50 transition-colors" href={calculatorHref(page)}>
                  Run the matching calculator
                </Link>
                <Link className="rounded-xl bg-card border border-border px-4 py-3 text-sm font-medium hover:border-primary/50 transition-colors" href={siblingHref(page)}>
                  See the other {page.stateAbbreviation} investor loan page
                </Link>
                {marketLinks.slice(0, 4).map((market) => (
                  <Link
                    key={`${market.stateSlug}-${market.citySlug}`}
                    className="rounded-xl bg-card border border-border px-4 py-3 text-sm font-medium hover:border-primary/50 transition-colors"
                    href={`/lending/${market.stateSlug}/${market.citySlug}`}
                  >
                    Hard money loans in {market.cityName}
                  </Link>
                ))}
                {programGuides.map((guide) => (
                  <Link
                    key={guide.href}
                    className="rounded-xl bg-card border border-border px-4 py-3 text-sm font-medium hover:border-primary/50 transition-colors"
                    href={guide.href}
                  >
                    {guide.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
