import Link from "next/link";

export const metadata = { title: "Strona nie istnieje — Writeback" };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mb-10">
        <span className="text-white font-black text-sm">W</span>
      </div>
      <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">404</p>
      <h1 className="text-3xl font-bold text-white mb-3">Strona nie istnieje</h1>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-10">
        Strona której szukasz została przeniesiona lub nigdy nie istniała.
      </p>
      <Link
        href="/"
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
