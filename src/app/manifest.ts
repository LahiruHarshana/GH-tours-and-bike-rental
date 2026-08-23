import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GH Tours & Bike Rental",
    short_name: "GH Tours",
    description:
      "Private Sri Lanka tours, islandwide airport transfers and motorbike rentals.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3f1",
    theme_color: "#ff8108",
    lang: "en-LK",
    categories: ["travel", "tourism", "transportation"],
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
