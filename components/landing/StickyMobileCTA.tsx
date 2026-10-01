'use client';

import { useEffect } from "react";
import Link from "next/link";
import { FileText, MessageSquare, Phone } from "lucide-react";
import { gtagEvent } from "@/lib/gtag";

const StickyMobileCTA = () => {
  // Tell the chat widget the action bar is showing so it sits above it on phones.
  useEffect(() => {
    document.body.setAttribute("data-sticky-cta", "true");
    return () => document.body.removeAttribute("data-sticky-cta");
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-primary/20 bg-background/95 backdrop-blur-md px-3 py-3 flex gap-2">
      <a
        href="tel:+19296392284"
        onClick={() => gtagEvent("phone_click", { location: "mobile_sticky" })}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary/50 py-3 text-xs font-semibold text-primary"
      >
        <Phone className="w-4 h-4" />
        Call
      </a>
      <a
        href="sms:+19296392284"
        onClick={() => gtagEvent("text_click", { location: "mobile_sticky" })}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary/50 py-3 text-xs font-semibold text-primary"
      >
        <MessageSquare className="w-4 h-4" />
        Text
      </a>
      <Link
        href="/apply"
        onClick={() => gtagEvent("primary_cta_click", { location: "mobile_sticky", cta: "Get Terms" })}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-xs font-bold text-primary-foreground"
      >
        <FileText className="w-4 h-4" />
        Get Terms
      </Link>
    </div>
  );
};

export default StickyMobileCTA;
