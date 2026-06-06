import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "./posts";
import { BlogHeader } from "./BlogHeader";
import { Suspense } from "react";

const MONTHS_SHORT = ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"];
function formatShortDate(iso: string) {
  const [, m, d] = iso.split("-");
  return `${parseInt(d)} ${MONTHS_SHORT[parseInt(m) - 1]}`;
}

export const metadata: Metadata = {
  title: "Poradniki — prawa konsumenta i reklamacje",
  description: "Poradniki o prawach konsumenta, reklamacjach i pismach urzędowych. Dowiedz się jak skutecznie reklamować towary i usługi w Polsce.",
  alternates: { canonical: "https://writeback.pl/blog" },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  const isEn = lang === "en";
  const langParam = isEn ? "?lang=en" : "";

  return (
    <div className="min-h-screen bg-white">
      <Suspense><BlogHeader /></Suspense>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">
            {isEn ? "Guides" : "Poradniki"}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEn ? "Consumer Rights" : "Prawa konsumenta"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isEn ? "Concrete information about your rights, without legal jargon." : "Konkretne informacje o Twoich prawach, bez prawniczego żargonu."}
          </p>
        </div>

        <div className="space-y-3">
          {[...POSTS].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}${langParam}`}
              className="flex items-start gap-5 p-5 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-200 group bg-white"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-[11px] text-center leading-tight">
                {formatShortDate(post.date)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {isEn ? (post.categoryEn ?? post.category) : post.category}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {isEn ? (post.readTimeEn ?? post.readTime) : post.readTime} {isEn ? "read" : "czytania"}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug mb-1">
                  {isEn ? (post.titleEn ?? post.title) : post.title}
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {isEn ? (post.descriptionEn ?? post.description) : post.description}
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors shrink-0 mt-1" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm font-bold text-gray-900 mb-1">
            {isEn ? "Need a letter right now?" : "Potrzebujesz pisma teraz?"}
          </p>
          <p className="text-xs text-gray-500 mb-4">
            {isEn
              ? "No need to write it yourself. We generate the letter with the correct legal provisions — PDF ready in 5 minutes."
              : "Nie musisz pisać sam. Generujemy pismo z właściwymi przepisami — PDF gotowy w 5 minut."}
          </p>
          <Link href="/zamow" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
            {isEn ? "Generate your letter — 29 PLN" : "Napisz pismo — 29 zł"}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
