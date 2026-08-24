export type SignatureDestination = {
  number: string;
  name: string;
  sinhala: string;
  region: string;
  title: string;
  copy: string;
  image: string;
  mobileImage: string;
  alt: string;
  slug: string;
};

const MOBILE_JOURNEY_IMAGE_BASE = "/images/journeys/sri-lanka-mobile-webp-images";

export const signatureDestinations: SignatureDestination[] = [
  {
    number: "01",
    name: "Ella",
    sinhala: "ඇල්ල",
    region: "Hill country",
    title: "Tea air. Train windows.",
    copy: "Nine Arch Bridge, cloud forest and the hill-country railway — weave Ella into a custom highland chapter at your pace.",
    image: "/images/journeys/ella.webp",
    mobileImage: `${MOBILE_JOURNEY_IMAGE_BASE}/ella-mobile.webp`,
    alt: "Colourful train crossing the Nine Arch Bridge in Ella, Sri Lanka",
    slug: "ella",
  },
  {
    number: "02",
    name: "Kandy",
    sinhala: "මහනුවර",
    region: "Cultural heart",
    title: "Sacred city. Living rhythm.",
    copy: "Temple of the Tooth, lake walks and spice gardens — add Kandy as a cultural anchor on your private route.",
    image: "/images/journeys/kandy.webp",
    mobileImage: `${MOBILE_JOURNEY_IMAGE_BASE}/kandy-mobile.webp`,
    alt: "Historic Queen's Hotel and street life in Kandy, Sri Lanka",
    slug: "kandy",
  },
  {
    number: "03",
    name: "Hiriketiya",
    sinhala: "හිරිකැටිය",
    region: "South coast",
    title: "Hidden bay. Slow surf.",
    copy: "A horseshoe cove tucked between palms — perfect for a relaxed south-coast stop on a tailor-made journey.",
    image: "/images/journeys/hiriketiya.webp",
    mobileImage: `${MOBILE_JOURNEY_IMAGE_BASE}/hiriketiya-mobile.webp`,
    alt: "Aerial view of Hiriketiya Bay on Sri Lanka's south coast",
    slug: "hiriketiya",
  },
  {
    number: "04",
    name: "Yala National Park",
    sinhala: "යාල",
    region: "Wild south",
    title: "Dust tracks. Wild eyes.",
    copy: "Leopards, elephants and open savannah — slot a private safari day into your custom island itinerary.",
    image: "/images/journeys/yala.webp",
    mobileImage: `${MOBILE_JOURNEY_IMAGE_BASE}/yala-mobile.webp`,
    alt: "Sri Lankan leopard in Yala National Park",
    slug: "yala",
  },
  {
    number: "05",
    name: "Sinharaja Forest",
    sinhala: "සිංහරාජ",
    region: "Rainforest",
    title: "Green cathedral. Rare air.",
    copy: "UNESCO rainforest trails, endemic birds and cool streams — for travellers who want nature woven in.",
    image: "/images/journeys/sinharaja.webp",
    mobileImage: `${MOBILE_JOURNEY_IMAGE_BASE}/sinharaja-mobile.webp`,
    alt: "Lush stream and waterfall in Sinharaja Forest Reserve",
    slug: "sinharaja",
  },
  {
    number: "06",
    name: "Arugam Bay",
    sinhala: "අරුගම් බේ",
    region: "East coast",
    title: "Surf horizon. Open road.",
    copy: "World-class waves, lagoon light and empty beaches — build an east-coast chapter from Arugam Bay outward.",
    image: "/images/journeys/arugam-bay.webp",
    mobileImage: `${MOBILE_JOURNEY_IMAGE_BASE}/arugam-bay-mobile.webp`,
    alt: "Clifftop view over Arugam Bay and the tropical coastline",
    slug: "arugam-bay",
  },
  {
    number: "07",
    name: "Pasikuda",
    sinhala: "පසිකුඩා",
    region: "East coast",
    title: "Shallow sea. Long light.",
    copy: "Calm turquoise shallows and palm-lined sand — ideal for a slow, sun-soaked finale on your custom route.",
    image: "/images/journeys/pasikuda.webp",
    mobileImage: `${MOBILE_JOURNEY_IMAGE_BASE}/pasikuda-mobile.webp`,
    alt: "Palm trees and turquoise water at Pasikuda Beach",
    slug: "pasikuda",
  },
];
