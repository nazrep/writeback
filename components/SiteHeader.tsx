"use client";

import { useState } from "react";
import Link from "next/link";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">W</span>
          <span className="font-bold text-lg tracking-tight text-gray-900">writeback<span className="text-indigo-600">.pl</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-7 text-sm">
          <Link href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors font-medium">Poradniki</Link>
          <Link href="/#jak-to-dziala" className="text-gray-500 hover:text-gray-900 transition-colors font-medium">Jak to działa</Link>
          <Link href="/#faq" className="text-gray-500 hover:text-gray-900 transition-colors font-medium">FAQ</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/en"
            className="hidden sm:inline-flex items-center rounded-lg border border-gray-200 text-xs font-semibold overflow-hidden"
            title="English version"
          >
            <span className="w-9 text-center py-1.5 text-gray-400 hover:text-gray-700 transition-colors">PL</span>
            <span className="w-9 text-center py-1.5 text-gray-400 hover:text-gray-700 transition-colors border-l border-gray-200">EN</span>
          </Link>
          <Link
            href="/zamow"
            className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            Napisz pismo — 29 zł
          </Link>

          <button
            onClick={() => setOpen(o => !o)}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            aria-label="Menu"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-6 pb-4 pt-2 space-y-1">
          <Link href="/blog" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            Poradniki
          </Link>
          <Link href="/#jak-to-dziala" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            Jak to działa
          </Link>
          <Link href="/#faq" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            FAQ
          </Link>
          <div className="pt-2 border-t border-gray-100">
            <Link
              href="/zamow"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3.5 rounded-xl transition-colors text-sm shadow-sm"
            >
              Napisz pismo — 29 zł
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
