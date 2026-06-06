"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const GA_ID = "G-433MLRJZJJ";

function loadGA() {
  if (typeof window === "undefined" || document.getElementById("ga-script")) return;
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookies_choice");
    if (!choice) {
      setVisible(true);
    } else if (choice === "accepted") {
      loadGA();
    }
  }, []);

  function accept() {
    localStorage.setItem("cookies_choice", "accepted");
    loadGA();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookies_choice", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-xs text-slate-400 leading-relaxed flex-1">
          Używamy technicznych cookies (niezbędne do płatności) oraz opcjonalnie{" "}
          <strong className="text-slate-300">Google Analytics 4</strong>{" "}
          do anonimowej analizy ruchu.{" "}
          <Link href="/polityka#cookies" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">
            Szczegóły
          </Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-slate-400 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap border border-white/10 hover:border-white/20"
          >
            Tylko niezbędne
          </button>
          <button
            onClick={accept}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            Akceptuj
          </button>
        </div>
      </div>
    </div>
  );
}
