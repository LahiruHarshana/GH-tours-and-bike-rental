import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import "./theme.css";
import { siteConfig } from "@/config/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
