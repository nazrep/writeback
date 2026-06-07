"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <span className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">W</span>
        <span className="font-bold text-lg text-gray-900">writeback<span className="text-indigo-600">.pl</span></span>
      </Link>
      <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-6">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Coś poszło nie tak</h1>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
        Wystąpił nieoczekiwany błąd. Jeśli problem się powtarza, napisz do nas na{" "}
        <a href="mailto:hello@writeback.pl" className="text-indigo-600 underline">hello@writeback.pl</a>.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          Spróbuj ponownie
        </button>
        <Link
          href="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          Strona główna
        </Link>
      </div>
    </div>
  );
}
