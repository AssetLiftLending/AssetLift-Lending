'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROGRAM_TERMS } from "@/lib/data/program-terms";

const messages = [
  { text: "DSCR Rates from", highlight: "6.25%" },
  { text: "Fix & Flip Rates from", highlight: PROGRAM_TERMS.fixAndFlip.startingRate },
  { text: "Many files close in as fast as", highlight: "5 business days" },
  { text: "Private lending across", highlight: "46 states" },
];

const PromoBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 350);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const msg = messages[current];

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40 border-b border-primary/20 bg-[#1a1a2e] dark:bg-gradient-to-r dark:from-[#0c0e17] dark:via-[#131528] dark:to-[#0c0e17] dark:border-primary/30 shadow-sm">
      <div className="container flex items-center justify-center gap-4 md:gap-6 px-4 py-2.5 md:py-3">
        <span
          className="text-sm md:text-base font-medium text-white/90 tracking-wide transition-all duration-300 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          {msg.text}{" "}
          <span className="text-primary font-extrabold text-base md:text-lg">
            {msg.highlight}
          </span>
        </span>

        <Link
          href="/apply"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(45,93%,47%,0.35)]"
        >
          Review My Deal
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;
