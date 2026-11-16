'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { BlogPost } from '@/lib/data/blog-posts';

interface BlogPostLayoutProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

const RESOURCE_MAP: Record<string, Array<{ label: string; href: string }>> = {
  'Fix & Flip': [
    { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
    { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
    { label: '90% LTC Fix & Flip Guide', href: '/blog/90-ltc-fix-and-flip-loan' },
  ],
  'DSCR Rental': [
    { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
    { label: 'DSCR Calculator', href: '/tools/dscr-calculator' },
    { label: 'DSCR vs Conventional Rental Loans', href: '/compare/dscr-loans-vs-conventional-rental-loans' },
    { label: 'BRRRR to DSCR Refinance Guide', href: '/blog/brrrr-refinance-into-dscr-loan' },
  ],
  Comparisons: [
    { label: 'Compare AssetLift', href: '/compare' },
    { label: 'How Funding Works', href: '/how-funding-works' },
    { label: 'Apply for Funding', href: '/apply' },
  ],
  Bridge: [
    { label: 'Bridge Loans', href: '/loans/bridge' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Markets Coverage', href: '/markets' },
  ],
  Construction: [
    { label: 'Ground-Up Construction Loans', href: '/loans/ground-up-construction' },
    { label: 'Bridge Loans', href: '/loans/bridge' },
    { label: 'How It Works', href: '/how-it-works' },
  ],
  'Local Markets': [
    { label: 'Markets Coverage', href: '/markets' },
    { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
    { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
  ],
  Education: [
    { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
    { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
    { label: 'Bridge Loans', href: '/loans/bridge' },
    { label: 'Hard Money vs Bank', href: '/compare/hard-money-lender-vs-bank' },
    { label: 'Questions to Ask a Hard Money Lender', href: '/blog/questions-to-ask-a-hard-money-lender' },
  ],
};

export default function BlogPostLayout({ post, relatedPosts = [] }: BlogPostLayoutProps) {
  const resources = RESOURCE_MAP[post.category] ?? RESOURCE_MAP.Education;
  const quickTakeaways = post.sections.slice(0, 3).map((section) => section.heading);
  const quickAnswer = post.faqs[0]?.answer ?? post.description;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-8 rounded-2xl border border-border bg-card p-6"
            >
              <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                    Quick Answer
                  </p>
                  <p className="text-base leading-7 text-foreground/90">{quickAnswer}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                    Key Takeaways
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {quickTakeaways.map((takeaway) => (
                      <li key={takeaway} className="rounded-lg bg-secondary/40 px-3 py-2">
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-8">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                In This Article
              </h2>
              <nav className="space-y-2">
                {post.sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {i + 1}. {section.heading}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {post.sections.map((section, i) => (
              <motion.div
                key={i}
                id={`section-${i}`}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.heading}</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {section.content.split('\n\n').map((paragraph, j) => (
                    <p key={j} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-3">Related Financing Resources</h2>
            <p className="text-muted-foreground mb-5">
              If this topic matches an active deal, move from the educational guide into the
              financing page that fits the property and exit plan.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {resources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="rounded-lg border border-border px-4 py-4 hover:border-primary/50 hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-medium">{resource.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {post.faqs.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {post.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Author Bio */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground mb-2">{post.authorRole}</p>
                <p className="text-sm text-muted-foreground">
                  The AssetLift Team provides expert insights on real estate investing, hard money lending, and portfolio growth strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedPosts.slice(0, 3).map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
                >
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {related.category}
                  </span>
                  <h3 className="font-semibold mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Funded?</h2>
          <p className="text-muted-foreground mb-8">Apply today and hear back within 24 hours, usually within a few hours.</p>
          <Button asChild size="lg" className="glow-primary">
            <Link href="/apply">
              Apply for Funding <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
