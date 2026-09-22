'use client';

import { motion } from "framer-motion";
import { ArrowRightLeft, BadgeCheck, Layers3, TrendingUp } from "lucide-react";

const proofCards = [
  {
    title: "You Hear Back Fast",
    content:
      "Borrowers hear quickly whether the file is workable, what the leverage looks like, and what can slow it down before costs start stacking up.",
    icon: BadgeCheck,
  },
  {
    title: "We Shop the Deal for You",
    content:
      "Some deals fit direct private lending. Some are better handled through capital partners. The job is to route the file through the cleanest closing path, not force one structure everywhere.",
    icon: ArrowRightLeft,
  },
  {
    title: "Keep More Capital Working",
    content:
      "Up to 95% LTC on the purchase for fix and flip and investor-friendly DSCR leverage help borrowers keep more capital available for additional deals and reserves.",
    icon: TrendingUp,
  },
  {
    title: "Built for Repeat Investors",
    content:
      "Repeat investors want less friction, tighter communication, and a team that already understands the way they buy, rehab, refinance, and exit.",
    icon: Layers3,
  },
];

const WhyAssetLift = () => {
  return (
    <section className="relative overflow-x-clip py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-16 grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            className="lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Why Borrowers Choose{" "}
              <span className="gradient-text">AssetLift Lending</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The pitch is simple: move faster than a bank, stay cleaner than a messy broker chain,
              and give investors a financing process that feels organized from the first call to funding.
            </p>
            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-3 text-sm font-semibold text-primary">
                Core borrower outcomes
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Move faster on time-sensitive purchases.</p>
                <p>Keep more capital available across multiple deals.</p>
                <p>Get a financing process that is easier to understand and easier to repeat.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="min-w-0 divide-y divide-border"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {proofCards.map((card) => (
              <div key={card.title} className="flex min-w-0 gap-4 py-6 first:pt-0">
                <card.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <h3 className="mb-1.5 text-xl font-semibold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.content}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-secondary/30 border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4">
              Built for Real Files, Not Marketing Decks
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most borrowers do not need another vague lender promise. They need someone who can
              tell them quickly whether the timeline, leverage, title, insurance, reserves, and
              exit story actually hold together.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              AssetLift is strongest when the borrower needs a clean path through a nuanced file:
              value-add purchases, rental refinances, bridge scenarios, and projects where timing
              matters and the wrong lender wastes weeks.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The goal is a lender experience that feels more organized, more technical, and easier
              to trust on the first visit.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAssetLift;
