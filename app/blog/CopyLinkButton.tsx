"use client";

import { useState } from "react";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-xs font-medium"
      title={copied ? "Skopiowano!" : "Kopiuj link"}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 8l4 4 8-8" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-green-600">Skopiowano</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-7A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Kopiuj link
        </>
      )}
    </button>
  );
}
