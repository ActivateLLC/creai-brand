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
  title: "Creai — Say it. See it. Own it.",
  description:
    "From idea to income, in one conversation. Creai builds your site, the app your customers sign into, and a playable game if that's the business — registers your domain, takes payments into your Stripe, then writes, directs and cuts your ads and drafts your posts. Everything waits for your yes.",
  keywords: "Creai, AI website builder, AI app builder, AI game builder, build to launch, AI marketing, AI ads, AI agent, small business, domain, Stripe",
  authors: [{ name: "Creai" }],
  openGraph: {
    title: "Creai — Say it. See it. Own it.",
    description: "Conceive it, launch it, grow it. The whole business from one conversation — site, app, domain, payments, ads and posts, every step on your yes.",
    url: SITE_URL,
    siteName: "Creai",
    locale: "en_US",
    type: "website",
    // JPEG on purpose: iMessage and WhatsApp drop preview images much over 300 KB.
    images: [{ url: "/og.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "Creai — say it, see it, own it" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creai — Say it. See it. Own it.",
    description: "Conceive it, launch it, grow it. The whole business from one conversation — site, app, domain, payments, ads and posts, every step on your yes.",
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
