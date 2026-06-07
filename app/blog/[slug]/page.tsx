import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPost, POSTS } from "../posts";
import { getContent } from "../content";
import { BlogHeader } from "../BlogHeader";
import { CopyLinkButton } from "../CopyLinkButton";
import { AudioPlayer } from "../AudioPlayer";

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://writeback.pl/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: "pl_PL",
    },
  };
}

const MONTHS = ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d)} ${MONTHS[parseInt(m) - 1]} ${y}`;
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams]);
  const isEn = lang === "en";
  const post = getPost(slug);
  if (!post) notFound();
  const Content = getContent(slug, isEn ? "en" : "pl");
  if (!Content) notFound();

  const title     = isEn ? (post.titleEn    ?? post.title)    : post.title;
  const desc      = isEn ? (post.descriptionEn ?? post.description) : post.description;
  const category  = isEn ? (post.categoryEn  ?? post.category)  : post.category;
  const readTime  = isEn ? (post.readTimeEn  ?? post.readTime)  : post.readTime;
  const faq       = isEn ? (post.faqEn       ?? post.faq)       : post.faq;
  const langParam = isEn ? "?lang=en" : "";

  const related = POSTS.filter(p => p.slug !== slug).slice(0, 4);
  const postUrl = `https://writeback.pl/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": desc,
    "datePublished": post.date,
    "dateModified": post.date,
    "url": postUrl,
    "author": {
      "@type": "Person",
      "name": "Maciej Perzankowski",
      "url": "https://writeback.pl",
    },
    "publisher": {
      "@type": "Organization",
      "name": "writeback.pl",
      "url": "https://writeback.pl",
      "logo": { "@type": "ImageObject", "url": "https://writeback.pl/icon.png" },
    },
    "inLanguage": isEn ? "en" : "pl",
  };

  const faqSchema = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  } : null;
  return (
    <div className="min-h-screen bg-white">
      <Suspense><BlogHeader /></Suspense>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <article className="max-w-2xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <Link href={`/blog${langParam}`} className="text-sm text-gray-400 hover:text-indigo-600 font-medium inline-flex items-center gap-1.5 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {isEn ? "Guides" : "Poradniki"}
        </Link>

        {/* Header */}
        <header className="mt-6 mb-0">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
              {category}
            </span>
            <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
            <span className="text-gray-200">·</span>
            <span className="text-xs text-gray-400">{readTime} {isEn ? "read" : "czytania"}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">{title}</h1>

          {/* Lead */}
          <p className="text-gray-500 text-base leading-relaxed mb-7">{desc}</p>

          {/* Author + share */}
          <div className="flex items-center justify-between gap-4 py-4 border-t border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Maciej Perzankowski</div>
                <div className="text-xs text-gray-400">writeback.pl · {isEn ? "consumer law · Poland" : "prawa konsumenta"}</div>
              </div>
            </div>
            <CopyLinkButton url={postUrl} />
          </div>
        </header>

        <AudioPlayer slug={slug} isEn={isEn} />

        {/* Article content */}
        <div className="article-content mt-8
          [&_p]:text-gray-700 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:mb-4
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-snug [&_h2]:pt-2 [&_h2]:border-t [&_h2]:border-gray-100
          [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2
          [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul>li]:text-[15px] [&_ul>li]:text-gray-700 [&_ul>li]:leading-relaxed [&_ul>li]:pl-4 [&_ul>li]:relative [&_ul>li]:before:content-['–'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-indigo-400
          [&_ol]:mb-4 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol>li]:text-[15px] [&_ol>li]:text-gray-700 [&_ol>li]:leading-relaxed
          [&_strong]:font-semibold [&_strong]:text-gray-900
          [&_em]:italic [&_em]:text-gray-600
        ">
          <Content />
        </div>

        {/* CTA box */}
        <div className="mt-12 bg-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
          <p className="font-bold text-lg mb-2">Gotowe pismo z właściwymi przepisami</p>
          <p className="text-indigo-200 text-sm mb-5 leading-relaxed">
            {isEn
              ? "Store, bank, operator, ZUS. PDF by email in 5 minutes — 29 PLN one-time, no subscription."
              : "Sklep, bank, operator, ZUS. PDF na maila w 5 minut — 29 zł jednorazowo, bez subskrypcji."}
          </p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-5 py-3 rounded-xl transition-all hover:bg-indigo-50 text-sm"
          >
            {isEn ? "Generate your letter" : "Wygeneruj swoje pismo"}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>

        {/* Author bio */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{isEn ? "About the author" : "O autorze"}</p>
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-0.5">Maciej Perzankowski</div>
              <div className="text-xs text-indigo-600 font-semibold mb-3">{isEn ? "Creator of writeback.pl" : "Twórca writeback.pl"}</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEn
                  ? "I build tools that help consumers enforce their rights without a lawyer. I wrote hundreds of consumer letters before I started building writeback.pl. I know what works and what stores and banks simply ignore."
                  : "Tworzę narzędzia, które pomagają konsumentom egzekwować swoje prawa bez prawnika. Napisałem setki pism konsumenckich, zanim zacząłem budować writeback.pl. Wiem, co działa, a co sklepy i banki po prostu ignorują."}
              </p>
            </div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-5 space-y-1.5">
          <p className="text-xs text-gray-400 leading-relaxed">
            {isEn
              ? "This article is for informational purposes only and does not constitute legal advice. writeback.pl is a tool for creating consumer letters — for complex matters, consult a lawyer or consumer rights ombudsman."
              : "Artykuł ma charakter informacyjny i nie stanowi porady prawnej w rozumieniu ustawy o radcach prawnych ani ustawy Prawo o adwokaturze. Writeback.pl jest narzędziem do tworzenia pism konsumenckich — w sprawach skomplikowanych skonsultuj się z prawnikiem lub rzecznikiem praw konsumentów."}
          </p>
          <p className="text-xs text-gray-400">
            {isEn
              ? `Legal status: June 2026 · Verified against current Polish law.`
              : `Stan prawny: czerwiec 2026 · Przepisy zweryfikowane na podstawie aktualnie obowiązującego prawa.`}
          </p>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              {isEn ? "Read also" : "Przeczytaj też"}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}${langParam}`}
                  className="group border border-gray-200 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all"
                >
                  <span className="text-xs font-semibold text-indigo-600 block mb-2">
                    {isEn ? (p.categoryEn ?? p.category) : p.category}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-2">
                    {isEn ? (p.titleEn ?? p.title) : p.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                    {isEn ? (p.descriptionEn ?? p.description) : p.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
}
