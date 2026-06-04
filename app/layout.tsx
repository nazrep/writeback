import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const BASE = "https://writeback.pl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Writeback — Reklamacja do sklepu z podstawami prawnymi | 29 zł",
    template: "%s | Writeback",
  },
  description: "Profesjonalna reklamacja do sklepu internetowego z art. 43b ustawy o prawach konsumenta. Gotowe pismo PDF w 5 minut. Sklep ma 14 dni na odpowiedź — brak odpowiedzi = reklamacja uznana.",
  keywords: ["reklamacja sklep internetowy", "pismo reklamacyjne", "prawa konsumenta", "reklamacja allegro", "zwrot towaru", "art 43b"],
  authors: [{ name: "Writeback" }],
  creator: "Writeback",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: BASE,
    siteName: "Writeback",
    title: "Sklep Cię zignorował? Napisz pismo które muszą przeczytać.",
    description: "Profesjonalna reklamacja z art. 43b ustawy o prawach konsumenta. PDF gotowy w 5 minut. 29 zł — brak odpowiedzi sklepu w 14 dniach = reklamacja uznana.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Writeback — pisma reklamacyjne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sklep Cię zignorował? Napisz pismo które muszą przeczytać.",
    description: "Reklamacja z podstawami prawnymi. PDF w 5 minut. 29 zł.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BASE },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={geist.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
