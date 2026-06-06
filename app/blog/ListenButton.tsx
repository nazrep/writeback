"use client";
import { useState, useEffect, useRef } from "react";

export function ListenButton({ contentSelector }: { contentSelector: string }) {
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis.cancel();
    };
  }, []);

  function getText() {
    const el = document.querySelector(contentSelector);
    if (!el) return "";
    return el.textContent?.replace(/\s+/g, " ").trim() ?? "";
  }

  function handleClick() {
    if (state === "idle") {
      const text = getText();
      if (!text) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "pl-PL";
      u.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const plVoice = voices.find(v => v.lang.startsWith("pl"));
      if (plVoice) u.voice = plVoice;
      u.onend = () => setState("idle");
      u.onerror = () => setState("idle");
      utteranceRef.current = u;
      window.speechSynthesis.speak(u);
      setState("playing");
    } else if (state === "playing") {
      window.speechSynthesis.pause();
      setState("paused");
    } else {
      window.speechSynthesis.resume();
      setState("playing");
    }
  }

  function handleStop() {
    window.speechSynthesis.cancel();
    setState("idle");
  }

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-xs font-medium"
        title={state === "idle" ? "Odsłuchaj artykuł" : state === "playing" ? "Wstrzymaj" : "Wznów"}
      >
        {state === "playing" ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="4" height="10" rx="1"/><rect x="9" y="3" width="4" height="10" rx="1"/></svg>
        ) : state === "paused" ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M3 2.5l11 5.5-11 5.5V2.5z"/></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 5h2l3-3v12l-3-3H2V5z"/><path d="M10.5 5.5a3 3 0 010 5M12.5 3.5a6 6 0 010 9"/></svg>
        )}
        <span className="hidden sm:inline">
          {state === "idle" ? "Odsłuchaj" : state === "playing" ? "Wstrzymaj" : "Wznów"}
        </span>
      </button>
      {state !== "idle" && (
        <button
          onClick={handleStop}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-gray-500 transition-colors text-xs"
          title="Zatrzymaj"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10" rx="1.5"/></svg>
        </button>
      )}
    </div>
  );
}
