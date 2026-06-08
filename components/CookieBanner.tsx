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
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookies_choice");
    if (!choice) {
      setVisible(true);
    } else {
      setDecided(true);
      if (choice === "accepted") loadGA();
    }
  }, []);

  function accept() {
    localStorage.setItem("cookies_choice", "accepted");
    loadGA();
    setVisible(false);
    setDecided(true);
  }

  function decline() {
    localStorage.setItem("cookies_choice", "declined");
    setVisible(false);
    setDecided(true);
  }

  function reset() {
    localStorage.removeItem("cookies_choice");
    setDecided(false);
    setVisible(true);
  }

  return (
    <>
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="text-xs text-gray-400 leading-relaxed flex-1">
              Używamy technicznych cookies (niezbędne do płatności) oraz opcjonalnie{" "}
              <strong className="text-gray-200">Google Analytics 4</strong>{" "}
              do anonimowej analizy ruchu.{" "}
              <Link href="/polityka#cookies" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition-colors">
                Szczegóły
              </Link>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={decline}
                className="text-gray-400 hover:text-gray-200 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap border border-white/10 hover:border-white/20"
              >
                Tylko niezbędne
              </button>
              <button
                onClick={accept}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Akceptuj
              </button>
            </div>
          </div>
        </div>
      )}

      {decided && !visible && (
        <button
          onClick={reset}
          title="Zarządzaj cookies"
          aria-label="Zarządzaj ustawieniami cookies"
          className="fixed bottom-4 left-4 z-40 w-8 h-8 bg-gray-800 border border-white/10 rounded-full shadow-lg flex items-center justify-center text-sm hover:bg-gray-700 transition-all duration-200 hover:scale-110"
        >
          🍪
        </button>
      )}
    </>
  );
}
