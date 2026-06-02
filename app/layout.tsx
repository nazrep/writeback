import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Writeback — Pismo reklamacyjne w 5 minut",
  description: "Profesjonalna reklamacja z podstawami prawnymi. Sklepy muszą odpowiadać. 29 zł, gotowe od razu.",
  metadataBase: new URL("https://writeback.pl"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={geist.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
