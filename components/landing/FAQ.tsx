'use client';

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What types of properties do you lend on?",
      answer: "We finance non-owner-occupied residential investment properties including single-family homes, 2-4 unit properties, condos, and townhomes. The most common use cases are fix and flip, bridge, DSCR rental, and ground-up construction files.",
    },
    {
      question: "How quickly can you close?",
      answer: "Many deals can close in as fast as 5 business days, subject to underwriting, valuation, title, and file complexity.",
    },
    {
      question: "What are your minimum loan requirements?",
      answer: "Fix and flip starts at $50,000, DSCR and bridge at $100,000, and ground-up construction at $150,000, each up to $5,000,000. We generally look for a 660+ credit profile, enough liquidity to support the deal, and a business plan that makes sense for the property and exit.",
    },
    {
      question: "Do you require personal guarantees?",
      answer: "Yes. We typically require a full personal guarantee from all members with 20% or more ownership in the borrowing entity.",
    },
    {
      question: "What states do you lend in?",
      answer: "We lend in 46 states. If you are not sure whether your market fits our current footprint, reach out and we can confirm quickly.",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container px-4 md:px-6 max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 data-speakable className="text-4xl md:text-5xl font-bold mb-4">Questions Borrowers Ask Before They Apply</h2>
          <p data-speakable className="text-muted-foreground text-lg">
            Quick answers on timing, loan fit, guarantees, and eligibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5" data-speakable>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
