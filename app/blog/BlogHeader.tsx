"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { POSTS } from "./posts";

export function BlogHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">W</div>
          <span className="text-sm font-semibold text-gray-900">writeback.pl</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm text-gray-500">
          <Link href="/blog" className={`hover:text-gray-900 transition-colors font-medium ${pathname === "/blog" ? "text-indigo-600" : ""}`}>
            Poradniki
          </Link>
          <Link href="/#faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/zamow" className="hidden sm:inline-flex text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            Napisz pismo — 29 zł
          </Link>
          {/* Hamburger */}
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
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${pathname === "/blog" ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"}`}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Wszystkie poradniki
          </Link>
          {POSTS.map(p => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${pathname === `/blog/${p.slug}` ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <span className="text-[11px] text-gray-400 font-mono w-5 shrink-0">{p.category.slice(0, 2)}</span>
              <span className="line-clamp-1">{p.title.split(" — ")[0]}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 mt-2">
            <Link
              href="/zamow"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3 rounded-xl transition-colors text-sm"
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
