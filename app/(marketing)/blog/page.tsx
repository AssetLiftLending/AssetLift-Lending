import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { Clock, ArrowRight } from 'lucide-react';

const START_HERE_LINKS = [
  { label: 'Compare Lenders', href: '/compare', blurb: 'High-intent comparisons for borrowers evaluating options.' },
  { label: 'Browse Markets', href: '/markets', blurb: 'State and city pages for local hard money and DSCR intent.' },
  { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator', blurb: 'Run quick deal math before you apply.' },
  { label: 'DSCR Calculator', href: '/tools/dscr-calculator', blurb: 'Check rental coverage and long-term financing fit.' },
];

const CATEGORY_GUIDES: Record<string, { href: string; blurb: string }> = {
  'Fix & Flip': {
    href: '/loans/fix-and-flip',
    blurb: 'Rehab funding, draw process, timelines, and repeat-flipper execution.',
  },
  'DSCR Rental': {
    href: '/loans/dscr-rental',
    blurb: 'Rental-property financing, refinance strategy, and DSCR qualification.',
  },
  Bridge: {
    href: '/loans/bridge',
    blurb: 'Short-term acquisition and stabilization financing for transitional deals.',
  },
  Construction: {
    href: '/loans/ground-up-construction',
    blurb: 'Ground-up and heavy-project financing with draws and execution controls.',
  },
  Comparisons: {
    href: '/compare',
    blurb: 'High-intent lender comparisons for borrowers evaluating alternatives.',
  },
  Education: {
    href: '/how-it-works',
    blurb: 'Process guides, underwriting prep, and closing-readiness articles.',
  },
  'Local Markets': {
    href: '/markets',
    blurb: 'State and city search intent for borrowers who finance deals locally.',
  },
};

export const metadata: Metadata = createMetadata({
  title: 'Hard Money Lending Blog | Fix & Flip, DSCR & Bridge | AssetLift Lending',
  description:
    'Read expert guides on hard money loans, fix and flip financing, DSCR rentals, bridge loans, construction lending, and real estate investing strategy.',
  path: '/blog',
  noIndex: true,
});

export default function BlogListingPage() {
  const categoryCounts = BLOG_POSTS.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const latestPosts = BLOG_POSTS.slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AssetLift Lending Blog',
    description:
      'Real estate investing and hard money lending insights from AssetLift Lending.',
    url: 'https://www.assetliftlending.com/blog',
    about: [
      'Hard money loans',
      'Fix and flip financing',
      'DSCR loans',
      'Bridge loans',
      'Ground-up construction loans',
    ],
    isPartOf: {
      '@type': 'WebSite',
      name: 'AssetLift Lending',
      url: 'https://www.assetliftlending.com',
    },
    publisher: { '@type': 'Organization', name: 'AssetLift Lending' },
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: BLOG_POSTS.length,
      itemListElement: BLOG_POSTS.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.assetliftlending.com/blog/${post.slug}`,
        name: post.title,
        description: post.description,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
        />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Hard Money Lending Blog
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Expert insights on hard money lending, fix & flip investing, rental
              strategies, and building wealth through real estate.
            </p>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">Published guides</p>
                <p className="text-3xl font-bold">{BLOG_POSTS.length}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">Core categories</p>
                <p className="text-3xl font-bold">{Object.keys(categoryCounts).length}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">Newest focus</p>
                <p className="text-3xl font-bold">Local SEO</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {topCategories.map(([category, count]) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm"
                >
                  <span className="font-medium">{category}</span>
                  <span className="text-muted-foreground">{count}</span>
                </span>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-12">
              {START_HERE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
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

            <div className="mb-12">
              <div className="flex items-end justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Browse by Topic</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start with the content bucket that matches the deal you are actively working on.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {topCategories.map(([category, count]) => {
                  const guide = CATEGORY_GUIDES[category] ?? {
                    href: '/how-it-works',
                    blurb: 'Borrower education and financing process guidance.',
                  };

                  return (
                    <Link
                      key={category}
                      href={guide.href}
                      className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold mb-2">{category}</p>
                          <p className="text-sm text-muted-foreground mb-3">{guide.blurb}</p>
                          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                            {count} articles
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mb-12 rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Latest Publishing Sprint</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fresh content built around investor intent, local search, and lender comparison queries.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {latestPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-2xl border border-border bg-background p-5 hover:border-primary/50 transition-colors"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      {post.category}
                    </p>
                    <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                    Read article <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
