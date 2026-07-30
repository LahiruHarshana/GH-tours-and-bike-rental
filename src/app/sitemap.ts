import type { MetadataRoute } from "next";
import { getTours } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/weligama"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/airport-hire"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/bikes"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tours"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
  ];

  const tours = await getTours();
  const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: absoluteUrl(`/tours/${tour.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...tourRoutes];
}
