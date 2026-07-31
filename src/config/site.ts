export const siteConfig = {
  name: "GH Tours & Bike Rental",
  shortName: "GH Tours",
  tagline: "Ride the island. Feel the story.",
  description:
    "Weligama-based private Sri Lanka tours, airport transfers and reliable motorbike rentals, planned by a local team in Matara.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ghtoursandbikerentals.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+94 77 131 3178",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "94771313178",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "ghtoursandbikerental@gmail.com",
  address: "Weligama, Matara, Southern Province, Sri Lanka",
  location: {
    locality: "Weligama",
    district: "Matara",
    region: "Southern Province",
    country: "LK",
  },
  currency: "USD",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/airport-hire", label: "Airport Hire" },
  { href: "/bikes", label: "Bike Rental" },
  { href: "/weligama", label: "Weligama" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];
