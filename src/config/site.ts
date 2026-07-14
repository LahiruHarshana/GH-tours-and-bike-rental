export const siteConfig = {
  name: "GH Tours & Bike Rental",
  shortName: "GH Tours",
  tagline: "Ride the island. Feel the story.",
  description:
    "Private Sri Lanka tours, airport transfers and reliable motorbike rentals designed around your journey.",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+94 77 000 0000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "94770000000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@ghtours.lk",
  address: "Southern Province, Sri Lanka",
  currency: "USD",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/airport-hire", label: "Airport Hire" },
  { href: "/bikes", label: "Bike Rental" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];
