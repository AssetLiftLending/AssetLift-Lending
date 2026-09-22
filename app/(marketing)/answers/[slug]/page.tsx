import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/metadata';
import { INDEXABLE_ANSWER_SLUGS } from '@/lib/seo/routing-policy';
import geoAnswers from '@/lib/data/geo-answers.json';

interface GeoAnswer {
  slug: string;
  query: string;
  intent: string;
  publishedAt: string;
  title: string;
  description: string;
  directAnswer: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
  cta: { heading: string; body: string; buttonText: string; buttonUrl: string };
}

const ANSWERS = geoAnswers as GeoAnswer[];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ANSWERS.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const answer = ANSWERS.find(a => a.slug === slug);
  if (!answer) return {};
  return createMetadata({
    title: answer.title,
    description: answer.description,
    path: `/answers/${answer.slug}`,
    type: 'article',
    publishedTime: answer.publishedAt,
    noIndex: !INDEXABLE_ANSWER_SLUGS.has(answer.slug),
  });
}

export default async function AnswerPage({ params }: Props) {
  const { slug } = await params;
  const answer = ANSWERS.find(a => a.slug === slug);
  if (!answer) notFound();

  // Related answers: same intent first, then cross-intent, max 4
  const related = [
    ...ANSWERS.filter(a => a.slug !== slug && a.intent === answer.intent),
    ...ANSWERS.filter(a => a.slug !== slug && a.intent !== answer.intent),
  ].slice(0, 4);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: answer.query,
        acceptedAnswer: { '@type': 'Answer', text: answer.directAnswer },
      },
      ...answer.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.assetliftlending.com/' },
      { '@type': 'ListItem', position: 2, name: 'Answers', item: 'https://www.assetliftlending.com/answers' },
      { '@type': 'ListItem', position: 3, name: answer.title, item: `https://www.assetliftlending.com/answers/${answer.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: answer.title,
    description: answer.description,
    datePublished: answer.publishedAt,
    author: { '@type': 'Organization', name: 'AssetLift Lending' },
    publisher: {
      '@type': 'Organization',
      name: 'AssetLift Lending',
      url: 'https://www.assetliftlending.com',
    },
    mainEntityOfPage: `https://www.assetliftlending.com/answers/${answer.slug}`,
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Answers', href: '/answers' },
            { label: answer.title },
          ]}
        />
      </div>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">

            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Quick Answer
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              {answer.query}
            </h1>

            {/* Direct answer box — the part AI systems extract */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
              <p className="text-lg leading-relaxed font-medium">{answer.directAnswer}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Apply Now
                </Link>
                <a
                  href="tel:9296392284"
                  className="inline-flex items-center gap-2 border border-border text-sm px-5 py-2.5 rounded-xl hover:border-primary/50 transition-colors"
                >
                  (929) 639-2284
                </a>
              </div>
            </div>

            {/* Detailed sections */}
            <div className="space-y-8 mb-12">
              {answer.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold mb-3">{section.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            {/* FAQs */}
            {answer.faqs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-5">Related Questions</h2>
                <div className="space-y-5">
                  {answer.faqs.map((faq, i) => (
                    <div key={i} className="border border-border rounded-xl p-5">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* More Q&A — internal linking between answer pages */}
            {related.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-5">More Investor Q&A</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {related.map(a => (
                    <Link
                      key={a.slug}
                      href={'/answers/' + a.slug}
                      className="border border-border rounded-xl p-4 hover:border-primary/50 hover:bg-secondary/20 transition-colors group"
                    >
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {a.query}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">{answer.cta.heading}</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">{answer.cta.body}</p>
              <Link
                href={answer.cta.buttonUrl}
                className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors"
              >
                {answer.cta.buttonText}
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
