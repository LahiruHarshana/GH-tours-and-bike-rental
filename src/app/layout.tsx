import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Noto_Sans_Sinhala,
  Noto_Serif_Sinhala,
} from "next/font/google";
import "./styles/01-reset.css";
import "./styles/02-tokens.css";
import "./styles/03-base.css";
import "./styles/04-motion.css";
import "./styles/05-components.css";
import "./styles/06-hero-modern.css";
import "./styles/07-story-modern.css";
import "./styles/08-journeys-modern.css";
import "./styles/09-route-modern.css";
import "./styles/10-editorial-polish.css";
import "./styles/11-stayscape-template.css";
import "./styles/12-usability.css";
import "./styles/13-stayscape-inner.css";
import "./styles/14-inner-page-redesign.css";
import "./styles/15-cinematic-motion.css";
import "./styles/16-admin-editorial.css";
import "./styles/17-custom-tours.css";
import { siteConfig } from "@/config/site";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  variable: "--font-sinhala-body",
  weight: "variable",
  display: "swap",
});

const notoSerifSinhala = Noto_Serif_Sinhala({
  subsets: ["sinhala"],
  variable: "--font-sinhala-display",
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  referrer: "origin-when-cross-origin",
  title: {
    default: "GH Tours Weligama | Sri Lanka Airport Transfers & Bike Rental",
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  keywords: [
    "Weligama tours",
    "Sri Lanka airport transfer",
    "Colombo airport to Weligama taxi",
    "Weligama bike rental",
    "private tours Sri Lanka",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "GH Tours Weligama | Sri Lanka Airport Transfers & Bike Rental",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_LK",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GH Tours & Bike Rental in Weligama, Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GH Tours Weligama | Sri Lanka Airport Transfers & Bike Rental",
    description: siteConfig.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${notoSansSinhala.variable} ${notoSerifSinhala.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
