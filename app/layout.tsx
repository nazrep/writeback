import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "../components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import { PHProvider } from "@/components/posthog-provider";
import { PostHogPageview } from "@/components/posthog-pageview";
import { Suspense } from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const BASE = "https://writeback.pl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Writeback — pismo reklamacyjne z art. 43b UPK | 29 zł",
    template: "%s | Writeback",
  },
  description: "Sklep odmówił lub nie odpowiada? Pismo reklamacyjne z właściwymi przepisami gotowe w 5 minut. 14 dni na odpowiedź, brak odpowiedzi = reklamacja uznana. PDF na maila — 29 zł.",
  keywords: [
    "reklamacja sklep internetowy",
    "pismo reklamacyjne wzór",
    "reklamacja allegro",
    "jak złożyć reklamację",
    "wzór reklamacji",
    "reklamacja towar niezgodny z opisem",
    "prawa konsumenta",
    "art 43b ustawa o prawach konsumenta",
    "sklep nie odpowiada na reklamację",
    "reklamacja po roku",
    "jak reklamować towar w internecie",
    "jaki termin na reklamację",
  ],
  authors: [{ name: "Writeback" }],
  creator: "Writeback",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: BASE,
    siteName: "Writeback",
    title: "Zignorowali Cię? Napisz pismo, które muszą przeczytać.",
    description: "Formalne pismo z podstawą prawną do sklepu, banku, ZUS lub operatora. PDF gotowy w 5 minut, 29 zł. Brak odpowiedzi w terminie = sprawa uznana z mocy prawa.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Writeback — pisma reklamacyjne z podstawami prawnymi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zignorowali Cię? Napisz pismo, które muszą przeczytać.",
    description: "Formalne pismo z podstawą prawną do sklepu, banku, ZUS lub operatora. PDF w 5 minut. 29 zł.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: BASE },
  verification: {
    google: "sENrTYDt0GmSujFed42kAVpDTr3GVByTWrodmW9y4NE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Writeback",
      description: "Reklamacja do sklepu internetowego z podstawami prawnymi",
      inLanguage: "pl-PL",
    },
    {
      "@type": "Service",
      "@id": `${BASE}/#service`,
      name: "Pismo reklamacyjne z podstawami prawnymi",
      description: "Profesjonalne pismo reklamacyjne do sklepu internetowego z powołaniem na art. 43b ustawy o prawach konsumenta. Gotowe w 5 minut, PDF na email.",
      provider: {
        "@type": "Organization",
        name: "Maciej Perzankowski Software Solutions",
        url: BASE,
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@writeback.pl",
          contactType: "customer service",
          availableLanguage: "Polish",
        },
      },
      offers: {
        "@type": "Offer",
        price: "29.00",
        priceCurrency: "PLN",
        availability: "https://schema.org/InStock",
        description: "Pismo reklamacyjne PDF z właściwymi przepisami prawa polskiego",
      },
      areaServed: {
        "@type": "Country",
        name: "Poland",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak napisać skuteczną reklamację do sklepu internetowego?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Skuteczna reklamacja powinna zawierać powołanie na art. 43b ustawy o prawach konsumenta oraz konkretne żądanie (zwrot, wymiana, naprawa). Sklep ma 14 dni na odpowiedź — brak odpowiedzi oznacza uznanie reklamacji za zasadną.",
          },
        },
        {
          "@type": "Question",
          name: "Co jeśli sklep nie odpowie na reklamację w 14 dniach?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zgodnie z art. 7a ustawy o prawach konsumenta, brak odpowiedzi sklepu w 14 dniach od złożenia reklamacji oznacza jej uznanie za zasadną. Pismo z Writeback zawiera tę informację wprost.",
          },
        },
        {
          "@type": "Question",
          name: "Ile kosztuje pismo reklamacyjne przez Writeback?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pismo reklamacyjne kosztuje 29 zł jednorazowo. Nie ma subskrypcji ani ukrytych opłat. PDF gotowy jest w ciągu 5 minut i trafia bezpośrednio na podany adres email.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={geist.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
          Przejdź do treści
        </a>
        <PHProvider>
          <Suspense fallback={null}><PostHogPageview /></Suspense>
          <div id="main-content">{children}</div>
          <CookieBanner />
        </PHProvider>
        <Analytics />
      </body>
    </html>
  );
}
