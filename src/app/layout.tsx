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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${siteConfig.name} | Sri Lanka Tours, Airport Hire & Bikes`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: ["Sri Lanka tours", "Sri Lanka airport taxi", "Sri Lanka bike rental", "private driver Sri Lanka"],
  openGraph: {
    title: "Sri Lanka, at your pace.",
    description: siteConfig.description,
    type: "website",
    locale: "en_LK",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "GH Tours — Sri Lanka, at your pace." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka, at your pace.",
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
