import { FormWizard } from "./FormWizard";
import Link from "next/link";

export const metadata = {
  title: "Napisz pismo — Writeback",
};

export default async function ZamowPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-white/5 px-6">
        <div className="max-w-2xl mx-auto h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">W</span>
            <span className="font-bold text-lg tracking-tight text-white">writeback</span>
          </Link>
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Bezpieczna płatność przez Stripe
          </span>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-6 py-12">
        <FormWizard lang={lang} />
      </main>
    </div>
  );
}
