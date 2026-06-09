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

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ lang?: string; cat?: string }> }) {
  const { lang, cat } = await searchParams;
  const isEn = lang === "en";
  const langParam = isEn ? "?lang=en" : "";

  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  const categories = Array.from(new Set(sorted.map(p => p.category))).sort();

  const filtered = cat ? sorted.filter(p => p.category === cat) : sorted;

  const catParam = (c: string) => {
    const params = new URLSearchParams();
    if (isEn) params.set("lang", "en");
    if (c) params.set("cat", c);
    const s = params.toString();
    return s ? `?${s}` : "";
  };

  return (
    <div className="min-h-screen bg-white">
      <Suspense><BlogHeader /></Suspense>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
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

        {/* Filtry kategorii */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href={`/blog${langParam}`}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              !cat
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {isEn ? "All" : "Wszystkie"}
          </Link>
          {categories.map(c => (
            <Link
              key={c}
              href={`/blog${catParam(c)}`}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                cat === c
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}${langParam}`}
              className="flex flex-col p-5 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 hover:-translate-y-0.5 transition-all duration-200 group bg-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {isEn ? (post.categoryEn ?? post.category) : post.category}
                </span>
                <span className="text-[11px] text-gray-400">
                  {isEn ? (post.readTimeEn ?? post.readTime) : post.readTime} {isEn ? "read" : "czytania"}
                </span>
              </div>
              <h2 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug mb-2 flex-1">
                {isEn ? (post.titleEn ?? post.title) : post.title}
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                {isEn ? (post.descriptionEn ?? post.description) : post.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[11px] text-gray-400">{formatShortDate(post.date)}</span>
                <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  {isEn ? "Read" : "Czytaj"}
                  <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-16 text-sm">Brak artykułów w tej kategorii.</p>
        )}

        {/* CTA */}
        <div className="mt-12 bg-indigo-600 rounded-2xl p-7 text-white text-center">
          <p className="font-bold text-lg mb-2">
            {isEn ? "Need a letter right now?" : "Potrzebujesz pisma teraz?"}
          </p>
          <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
            {isEn
              ? "No need to write it yourself. Generate a formal letter with the correct legal provisions — PDF ready in 5 minutes."
              : "Nie musisz pisać sam. Wygeneruj formalne pismo z właściwymi przepisami — PDF gotowy w 5 minut."}
          </p>
          <Link href="/zamow" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl transition-all hover:bg-indigo-50 text-sm shadow-sm">
            {isEn ? "Generate your letter — 29 PLN" : "Napisz pismo — 29 zł"}
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
