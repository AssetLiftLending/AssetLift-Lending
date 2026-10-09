'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const PROGRAMS = [
  { label: 'Fix & Flip Loans', href: '/loans/fix-and-flip' },
  { label: 'DSCR Rental Loans', href: '/loans/dscr-rental' },
  { label: 'Bridge Loans', href: '/loans/bridge' },
  { label: 'Ground-Up Construction', href: '/loans/ground-up-construction' },
];

const RESOURCES = [
  { label: 'Blog', href: '/blog' },
  { label: 'Compare', href: '/compare' },
  { label: 'Broker Partners', href: '/brokers' },
  { label: 'Markets', href: '/markets' },
  { label: 'How Funding Works', href: '/how-funding-works' },
  { label: 'State Disclosures', href: '/state-disclosures' },
  { label: 'Fix & Flip Borrower Package', href: '/resources/fix-and-flip-borrower-package' },
  { label: 'Fix & Flip Calculator', href: '/tools/fix-and-flip-calculator' },
  { label: 'DSCR Calculator', href: '/tools/dscr-calculator' },
  { label: 'FAQ', href: '/faq' },
];

function DropdownMenu({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: { label: string; href: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    document.body.toggleAttribute('data-mobile-menu-open', isMobileMenuOpen);
    return () => document.body.removeAttribute('data-mobile-menu-open');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "nav-transparent bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <div className="flex flex-col items-start gap-0.5">
              <Logo size={36} className="md:hidden" />
              <div className="hidden md:flex flex-col items-start">
                <Logo size={45} />
                <span className="mt-1 text-xs font-semibold text-primary/85">
                  Capital that lifts.
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            <DropdownMenu
              label="Programs"
              items={PROGRAMS}
              open={openDropdown === 'programs'}
              onToggle={() => setOpenDropdown(openDropdown === 'programs' ? null : 'programs')}
              onClose={() => setOpenDropdown(null)}
            />
            <DropdownMenu
              label="Resources"
              items={RESOURCES}
              open={openDropdown === 'resources'}
              onToggle={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
              onClose={() => setOpenDropdown(null)}
            />
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
            >
              Process
            </Link>
            <Link
              href="/markets"
              className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
            >
              Markets
            </Link>
            <Link
              href="/brokers"
              className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
            >
              Brokers
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
            >
              About
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2">
            <a
              href="tel:+19296392284"
                className="flex items-center gap-2 text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">Call</span>
            </a>
              <div className="h-4 w-px bg-border" />
            <ThemeToggle />
            </div>
            <Button asChild size="sm" className="rounded-full px-5 font-bold">
              <Link href="/apply">
                Review Deal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="rounded-full border border-border bg-background/75 p-2.5 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-border bg-background/95 py-4 backdrop-blur-xl max-h-[calc(100svh-4rem)] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col gap-4">
              <div className="rounded-2xl border border-border bg-secondary/20 p-4">
                <p className="text-sm font-bold text-primary">
                  Fast investor financing
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Review programs, compare options, or send a deal for a real answer.
                </p>
              </div>

              <div>
              <p className="px-2 py-1 text-sm font-bold text-muted-foreground">
                Programs
              </p>
              {PROGRAMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                    className="mx-1 block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/35 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              </div>

              <div>
              <p className="px-2 py-1 text-sm font-bold text-muted-foreground">
                Resources
              </p>
              {RESOURCES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                    className="mx-1 block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/35 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              </div>

              <div className="grid grid-cols-2 gap-3 px-1">
                <Link
                  href="/how-it-works"
                  className="rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/35 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Process
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/35 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/brokers"
                  className="rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/35 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Brokers
                </Link>
                <Link
                  href="/about"
                  className="rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/35 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <a
                  href="tel:+19296392284"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/35 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </div>

              <div className="px-1">
                <Button asChild className="w-full rounded-full">
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    Review My Deal
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
