import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import geoAnswers from '@/lib/data/geo-answers.json';

interface GeoAnswer {
  slug: string;
  query: string;
  intent: string;
  title: string;
  description: string;
  directAnswer: string;
}

const ANSWERS = geoAnswers as GeoAnswer[];

const INTENT_LABELS: Record<string, string> = {
  'best-lender': 'Best Lender',
  'geo-lender': 'By State',
  'how-to': 'How To',
  'product-feature': 'Product Features',
  'state': 'By State',
  'comparison': 'Comparison',
  'explainer': 'Explainer',
};

export const metadata: Metadata = createMetadata({
  title: 'Real Estate Investor Q&A | Hard Money & DSCR Loan Answers | AssetLift Lending',
  description: 'Direct answers to the most common real estate investor questions about hard money loans, DSCR rental financing, fix and flip funding, and more.',
  path: '/answers',
  noIndex: true,
});

export default function AnswersIndexPage() {
  if (ANSWERS.length === 0) {
    return (
      <div className="container px-4 md:px-6 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Investor Q&A</h1>
        <p className="text-muted-foreground">Answer pages coming soon.</p>
      </div>
    );
  }

  const byIntent = ANSWERS.reduce<Record<string, GeoAnswer[]>>((acc, a) => {
    const key = a.intent ?? 'other';
    acc[key] = [...(acc[key] ?? []), a];
    return acc;
  }, {});

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Real Estate Investor Q&A
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Direct answers to the questions real estate investors ask about hard money loans,
            DSCR rental financing, fix and flip funding, and investment property lending.
          </p>

          <div className="space-y-10">
            {Object.entries(byIntent).map(([intent, answers]) => (
              <div key={intent}>
                <h2 className="text-lg font-bold mb-4 text-primary">
                  {INTENT_LABELS[intent] ?? intent}
                </h2>
                <div className="space-y-3">
                  {answers.map(a => (
                    <Link
                      key={a.slug}
                      href={`/answers/${a.slug}`}
                      className="flex items-start justify-between gap-4 border border-border rounded-xl p-5 hover:border-primary/50 hover:bg-secondary/20 transition-colors group"
                    >
                      <div>
                        <p className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {a.query}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {a.directAnswer}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
