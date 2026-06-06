"use client";
import { useState, useRef, useEffect } from "react";

const SPEEDS = [0.75, 1, 1.25, 1.5];

function SpeedPicker({ speed, onChange }: { speed: number; onChange: (s: number) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="h-7 px-2 rounded-lg hover:bg-indigo-100 text-[11px] font-bold text-indigo-600 transition-colors flex items-center gap-0.5"
      >
        {speed === 1 ? "1×" : `${speed}×`}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className="opacity-60">
          <path d="M1 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-1.5 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-[64px] z-10">
          {SPEEDS.map(s => (
            <button
              key={s}
              onClick={() => { onChange(s); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-[12px] font-semibold transition-colors flex items-center justify-between gap-2 ${
                s === speed
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s === 1 ? "1×" : `${s}×`}
              {s === speed && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function formatTime(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ slug }: { slug: string }) {
  const [exists, setExists] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const src = `/audio/${slug}.mp3`;

  useEffect(() => {
    fetch(src, { method: "HEAD" })
      .then(r => setExists(r.ok))
      .catch(() => setExists(false));
  }, [src]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
  }, [speed]);

  const totalWordsRef = useRef(0);

  function wrapWords() {
    const container = document.querySelector(".article-content");
    if (!container || container.getAttribute("data-words-wrapped")) return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    let n: Node | null;
    while ((n = walker.nextNode())) nodes.push(n as Text);
    let idx = 0;
    nodes.forEach(node => {
      const parts = node.textContent?.split(/(\s+)/) ?? [];
      if (parts.length <= 1) return;
      const frag = document.createDocumentFragment();
      parts.forEach(part => {
        if (/^\s+$/.test(part) || !part) {
          frag.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement("span");
          span.className = "audio-word";
          span.dataset.w = String(idx++);
          span.textContent = part;
          frag.appendChild(span);
        }
      });
      node.parentNode?.replaceChild(frag, node);
    });
    totalWordsRef.current = idx;
    container.setAttribute("data-words-wrapped", "1");
  }

  function highlightWord(time: number, dur: number) {
    const container = document.querySelector(".article-content");
    if (!container || !dur || !totalWordsRef.current) return;
    const all = container.querySelectorAll<HTMLElement>(".audio-word");
    const idx = Math.min(Math.floor((time / dur) * all.length), all.length - 1);
    container.querySelector(".audio-word-current")?.classList.remove("audio-word-current");
    all[idx]?.classList.add("audio-word-current");
    all[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function tick() {
    if (!audioRef.current) return;
    const t = audioRef.current.currentTime;
    const d = audioRef.current.duration;
    setCurrentTime(t);
    highlightWord(t, d);
    rafRef.current = requestAnimationFrame(tick);
  }

  function handlePlay() {
    if (!audioRef.current) return;
    wrapWords();
    audioRef.current.play();
    setPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }

  function clearHighlight() {
    document.querySelectorAll(".audio-word-current").forEach(el => el.classList.remove("audio-word-current"));
  }

  function handlePause() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    clearHighlight();
  }

  function handleEnded() {
    setPlaying(false);
    setCurrentTime(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    clearHighlight();
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function skip(seconds: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
  }

  if (exists === false || exists === null) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 mb-6">
      <audio
        ref={audioRef}
        src={src}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Play/pause */}
      <button
        onClick={playing ? handlePause : handlePlay}
        className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center shrink-0 transition-colors"
        aria-label={playing ? "Wstrzymaj" : "Odsłuchaj artykuł"}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
            <rect x="3" y="3" width="4" height="10" rx="1"/>
            <rect x="9" y="3" width="4" height="10" rx="1"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
            <path d="M4 2.5l10 5.5-10 5.5V2.5z"/>
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {/* Label */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-indigo-700">Odsłuchaj artykuł</span>
          <span className="text-[11px] text-gray-400 tabular-nums">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>

        {/* Progress bar */}
        <div
          className="relative h-1.5 bg-indigo-100 rounded-full cursor-pointer group"
          onClick={handleSeek}
        >
          <div
            className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>
      </div>

      {/* Skip buttons */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => skip(-15)}
          className="w-7 h-7 rounded-lg hover:bg-indigo-100 flex items-center justify-center text-indigo-400 hover:text-indigo-600 transition-colors"
          title="-15s"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
            <text x="9" y="15" fontSize="6" fontWeight="bold" fill="currentColor">15</text>
          </svg>
        </button>
        <button
          onClick={() => skip(15)}
          className="w-7 h-7 rounded-lg hover:bg-indigo-100 flex items-center justify-center text-indigo-400 hover:text-indigo-600 transition-colors"
          title="+15s"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
            <text x="9" y="15" fontSize="6" fontWeight="bold" fill="currentColor">15</text>
          </svg>
        </button>

        <SpeedPicker speed={speed} onChange={setSpeed} />
      </div>
    </div>
  );
}
