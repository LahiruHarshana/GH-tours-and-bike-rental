import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GH Tours & Bike Rental",
    short_name: "GH Tours",
    description:
      "Weligama-based Sri Lanka tours, airport transfers and motorbike rentals.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3f1",
    theme_color: "#ff8108",
    lang: "en-LK",
    categories: ["travel", "tourism", "transportation"],
  };
}
