import { FormWizard } from "./FormWizard";
import Link from "next/link";

export const metadata = {
  title: "Napisz pismo — Writeback",
};

export default async function ZamowPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-40 bg-slate-950/98 backdrop-blur border-b border-white/5 px-6">
        <div className="max-w-2xl mx-auto h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">W</span>
            <span className="font-bold text-base tracking-tight text-white">writeback</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Lock + label */}
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Bezpieczna płatność
            </span>

            {/* Payment badges */}
            <div className="flex items-center gap-1.5">
              {/* Stripe */}
              <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">Stripe</span>
              {/* BLIK */}
              <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">BLIK</span>
              {/* Visa */}
              <span className="bg-white/10 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded italic tracking-wide">VISA</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-6 py-12">
        <FormWizard lang={lang} />
      </main>
    </div>
  );
}
