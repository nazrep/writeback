"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies_accepted")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookies_accepted", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-xs text-slate-400 leading-relaxed flex-1">
          Używamy wyłącznie technicznych plików cookies niezbędnych do działania serwisu i realizacji płatności przez Stripe.
          Nie używamy cookies marketingowych ani analitycznych.{" "}
          <Link href="/polityka#cookies" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">
            Więcej informacji
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
        >
          Rozumiem
        </button>
      </div>
    </div>
  );
}
