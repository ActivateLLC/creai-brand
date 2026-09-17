import type { Metadata } from "next";
import { Gloock, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const gloock = Gloock({ weight: "400", subsets: ["latin"], variable: "--font-gloock" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const plexmono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-plexmono" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.creai.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  title: "CreAI — Say it. See it. Own it.",
  description:
    "Describe your business in one sentence. CreAI builds your site live, beside the conversation, then helps you connect your domain and draft your first campaign. Nothing goes out without your yes.",
  keywords: "CreAI, AI website builder, build to launch, AI agent, small business website, AI marketing, agent skills",
  authors: [{ name: "CreAI" }],
  openGraph: {
    title: "CreAI — Say it. See it. Own it.",
    description: "One sentence in. Your site, built live. Your domain and first campaign — every step on your yes.",
    url: SITE_URL,
    siteName: "CreAI",
    locale: "en_US",
    type: "website",
    // JPEG on purpose: iMessage and WhatsApp drop preview images much over 300 KB.
    images: [{ url: "/og.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "CreAI — say it, see it, own it" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreAI — Say it. See it. Own it.",
    description: "One sentence in. Your site, built live. Your domain and first campaign — every step on your yes.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${gloock.variable} ${grotesk.variable} ${plexmono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
