"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mb-10">
        <span className="text-white font-black text-sm">W</span>
      </div>
      <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Coś poszło nie tak</h1>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">
        Wystąpił nieoczekiwany błąd. Jeśli problem się powtarza, napisz do nas na{" "}
        <a href="mailto:hello@writeback.pl" className="text-indigo-400 underline">hello@writeback.pl</a>.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          Spróbuj ponownie
        </button>
        <Link
          href="/"
          className="bg-white/5 hover:bg-white/10 text-slate-300 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          Strona główna
        </Link>
      </div>
    </div>
  );
}
