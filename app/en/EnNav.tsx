"use client";

import { useState } from "react";
import Link from "next/link";

export function EnNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">W</span>
          <span className="font-bold text-lg tracking-tight text-gray-900">writeback<span className="text-indigo-600">.pl</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-200 text-xs font-semibold overflow-hidden">
            <Link href="/" className="w-9 text-center py-1.5 text-gray-400 hover:text-gray-700 transition-colors">PL</Link>
            <span className="w-9 text-center py-1.5 bg-indigo-600 text-white border-l border-indigo-500">EN</span>
          </div>
          <Link
            href="/zamow?lang=en"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors shadow-sm"
          >
            Write a letter
          </Link>
        </div>

        {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-6 pb-4 pt-2 space-y-1">
          <Link href="/#jak-to-dziala" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            How it works
          </Link>
          <Link href="/#faq" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            FAQ
          </Link>
          <div className="flex items-center gap-2 px-3 py-2">
            <Link href="/" onClick={() => setOpen(false)} className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors">PL</Link>
            <span className="flex-1 text-center py-2 rounded-lg bg-indigo-600 text-xs font-semibold text-white">EN</span>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <Link
              href="/zamow?lang=en"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3.5 rounded-xl transition-colors text-sm shadow-sm"
            >
              Write a letter — PLN 29
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
