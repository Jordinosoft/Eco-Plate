"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-[var(--ep-orange)] text-lg">🍃</span>
            <span className="font-bold text-lg tracking-tight text-[var(--ep-green)]">
              FoodLoop
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--ep-neutral)]">
            <Link href="/#how-it-works" className="hover:text-[var(--ep-green)] transition-colors">
              How It Works
            </Link>
            <Link href="/#impact" className="hover:text-[var(--ep-green)] transition-colors">
              Impact
            </Link>
            <Link href="/#partners" className="hover:text-[var(--ep-green)] transition-colors">
              Partners
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[var(--ep-green)] hover:underline"
            >
              Login
            </Link>
            <Link href="/signup" className="btn-cta text-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-[var(--ep-neutral)]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/#how-it-works" onClick={() => setOpen(false)} className="text-[var(--ep-neutral)]">How It Works</Link>
          <Link href="/#impact" onClick={() => setOpen(false)} className="text-[var(--ep-neutral)]">Impact</Link>
          <Link href="/#partners" onClick={() => setOpen(false)} className="text-[var(--ep-neutral)]">Partners</Link>
          <hr className="border-black/5" />
          <Link href="/login" onClick={() => setOpen(false)} className="text-[var(--ep-green)]">Login</Link>
          <Link href="/signup" onClick={() => setOpen(false)} className="btn-cta text-center">Get Started</Link>
        </div>
      )}
    </header>
  );
}
