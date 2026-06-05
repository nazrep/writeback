"use client";

import { useState } from "react";
import Link from "next/link";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">W</span>
          <span className="font-bold text-lg tracking-tight text-white">writeback</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/blog" className="hover:text-white transition-colors">Poradniki</Link>
          <Link href="/#jak-to-dziala" className="hover:text-white transition-colors">Jak to działa</Link>
          <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/zamow"
            className="hidden sm:inline-flex bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
          >
            Napisz pismo
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-slate-300"
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
        <div className="sm:hidden border-t border-white/5 bg-slate-950 px-6 pb-4 pt-2 space-y-1">
          <Link href="/blog" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Poradniki
          </Link>
          <Link href="/#jak-to-dziala" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Jak to działa
          </Link>
          <Link href="/#faq" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 6.5C6.5 5.7 7.2 5 8 5s1.5.7 1.5 1.5c0 .6-.4 1.1-.9 1.3L8 8.2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="11" r=".5" fill="currentColor"/></svg>
            FAQ
          </Link>
          <div className="pt-2 border-t border-white/5">
            <Link
              href="/zamow"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-4 py-3 rounded-xl transition-colors text-sm"
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
