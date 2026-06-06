import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, POSTS } from "../posts";
import { getContent } from "../content";
import { BlogHeader } from "../BlogHeader";
import { CopyLinkButton } from "../CopyLinkButton";

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const Content = getContent(slug);
  if (!Content) notFound();

  const related = POSTS.filter(p => p.slug !== slug).slice(0, 4);
  const postUrl = `https://writeback.pl/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
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
    "inLanguage": "pl",
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  } : null;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`;

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <article className="max-w-2xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <Link href="/blog" className="text-sm text-gray-400 hover:text-indigo-600 font-medium inline-flex items-center gap-1.5 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Poradniki
        </Link>

        {/* Header */}
        <header className="mt-6 mb-0">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
            <span className="text-gray-200">·</span>
            <span className="text-xs text-gray-400">{post.readTime} czytania</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">{post.title}</h1>

          {/* Lead */}
          <p className="text-gray-500 text-base leading-relaxed mb-7">{post.description}</p>

          {/* Author + share */}
          <div className="flex items-center justify-between gap-4 py-4 border-t border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Maciej Perzankowski</div>
                <div className="text-xs text-gray-400">writeback.pl · prawa konsumenta</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <a
                href={tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-xs font-medium"
                title="Udostępnij na X"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="hidden sm:inline">Udostępnij</span>
              </a>
              <CopyLinkButton url={postUrl} />
            </div>
          </div>
        </header>

        {/* Article content */}
        <div className="mt-8
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
            Sklep, bank, operator, ZUS. PDF na maila w 5 minut — 29 zł jednorazowo, bez subskrypcji.
          </p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-5 py-3 rounded-xl transition-all hover:bg-indigo-50 text-sm"
          >
            Wygeneruj swoje pismo
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>

        {/* Author bio */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">O autorze</p>
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-0.5">Maciej Perzankowski</div>
              <div className="text-xs text-indigo-600 font-semibold mb-3">Twórca writeback.pl</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tworzę narzędzia, które pomagają konsumentom egzekwować swoje prawa bez prawnika. Napisałem setki pism konsumenckich, zanim zacząłem budować writeback.pl. Wiem, co działa, a co sklepy i banki po prostu ignorują.
              </p>
            </div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="mt-5 text-xs text-gray-400 leading-relaxed">
          Artykuł ma charakter informacyjny i nie stanowi porady prawnej w rozumieniu ustawy o radcach prawnych ani ustawy Prawo o adwokaturze. Writeback.pl jest narzędziem do tworzenia pism konsumenckich — w sprawach skomplikowanych skonsultuj się z prawnikiem lub rzecznikiem praw konsumentów.
        </p>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Przeczytaj też</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group border border-gray-200 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all"
                >
                  <span className="text-xs font-semibold text-indigo-600 block mb-2">{p.category}</span>
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
}
