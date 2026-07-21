import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./styles/01-reset.css";
import "./styles/02-tokens.css";
import "./styles/03-base.css";
import "./styles/04-motion.css";
import "./styles/05-components.css";
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
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "GH Tours — Sri Lanka, at your pace." }],
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
