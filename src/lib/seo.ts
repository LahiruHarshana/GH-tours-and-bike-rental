import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const siteUrl = siteConfig.url.replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/og.png",
  keywords,
  noIndex = false,
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} | ${siteConfig.shortName}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false, noarchive: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_LK",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} in Weligama, Sri Lanka`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const businessId = absoluteUrl("/#business");

export function localBusinessSchema() {
  const hasRealPhone = !siteConfig.phone.includes("000 0000");

  return {
    "@type": "TravelAgency",
    "@id": businessId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    image: [
      absoluteUrl("/images/hero-south-coast-cinematic.webp"),
      absoluteUrl("/images/hero-coast.webp"),
    ],
    description: siteConfig.description,
    email: siteConfig.email,
    logo: absoluteUrl("/images/gh-tours-logo.png"),
    ...(hasRealPhone ? { telephone: siteConfig.phone } : {}),
    priceRange: "$$",
    currenciesAccepted: "LKR, USD",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Weligama",
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      postalCode: "81700",
      addressCountry: siteConfig.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.975,
      longitude: 80.284,
    },
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Weligama, Sri Lanka")}`,
    areaServed: [
      { "@type": "City", name: "Weligama" },
      { "@type": "AdministrativeArea", name: "Matara District" },
      { "@type": "Country", name: "Sri Lanka" },
    ],
    knowsLanguage: ["en", "si"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sri Lanka travel services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Private Sri Lanka tours",
          url: absoluteUrl("/tours"),
        },
        {
          "@type": "OfferCatalog",
          name: "Sri Lanka airport transfers",
          url: absoluteUrl("/airport-hire"),
        },
        {
          "@type": "OfferCatalog",
          name: "Weligama motorbike rentals",
          url: absoluteUrl("/bikes"),
        },
      ],
    },
  };
}
