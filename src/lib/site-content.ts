export type SiteContent = {
  global: {
    brandName: string;
    footerLead: string;
    footerTagline: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroImage: string;
    heroImageAlt: string;
    heroCaption: string;
    heroPromise: string;
    assurances: string[];
    experiencesEyebrow: string;
    experiencesTitle: string;
    experiencesCopy: string;
    chooserEyebrow: string;
    chooserTitle: string;
    chooserCopy: string;
    bikeEyebrow: string;
    bikeTitle: string;
    airportCardTitle: string;
    airportCardCopy: string;
    proofTitle: string;
    proofCopy: string;
    guestStats: Array<{ value: string; label: string; detail: string }>;
    testimonial: string;
    testimonialByline: string;
    storyEyebrow: string;
    storyTitle: string;
    storyImage: string;
    storyImageAlt: string;
    storyMovements: string[];
    finalEyebrow: string;
    finalTitle: string;
    finalAccent: string;
    finalCopy: string;
  };
};

export const defaultSiteContent: SiteContent = {
  global: {
    brandName: "GH Tours",
    footerLead: "Until the next road.",
    footerTagline: "Weligama-based journeys across Sri Lanka",
    address: "Weligama, Matara, Southern Province, Sri Lanka",
    phone: "+94 77 131 3178",
    whatsapp: "94771313178",
    email: "ghtoursandbikerental@gmail.com",
  },
  home: {
    heroEyebrow: "Weligama-based Sri Lanka journeys",
    heroTitle: "Sri Lanka,\nat your pace.",
    heroImage: "/images/hero-sigiriya-cinematic.webp",
    heroImageAlt: "Sigiriya rock fortress rising above Sri Lanka's green central plains",
    heroCaption: "Ancient wonder",
    heroPromise: "From our home in Weligama, we arrange private island tours, Colombo airport transfers and reliable bike rentals around the way you want Sri Lanka to feel.",
    assurances: ["Locally planned", "Flexible by design", "Real support, every day"],
    experiencesEyebrow: "Signature journeys",
    experiencesTitle: "Your island.\nYour route.",
    experiencesCopy: "Scroll seven of Sri Lanka's most-loved places — then tell us how you want to connect them. Every journey is built around your dates, pace and interests.",
    chooserEyebrow: "Choose your way in",
    chooserTitle: "How do you want\nto explore?",
    chooserCopy: "Start with the feeling you want. We will help shape the details around your dates, pace and interests.",
    bikeEyebrow: "Freedom on two wheels",
    bikeTitle: "Choose the ride.\nFollow the coast.",
    airportCardTitle: "From arrivals hall\nto island calm.",
    airportCardCopy: "Your driver waits with your name, helps with luggage and takes the best route—whether you are heading to Colombo, Galle, Kandy, Ella or beyond.",
    proofTitle: "Small details.\nBig difference.",
    proofCopy: "Thoughtful planning, quick answers and a journey that always feels like your own.",
    guestStats: [
      { value: "4.9/5", label: "Guest rating", detail: "From travellers who explored with us" },
      { value: "20 min", label: "Typical reply", detail: "A real local team, ready every day" },
      { value: "100%", label: "Private journeys", detail: "Every route shaped around your pace" },
    ],
    testimonial: "It felt less like following a tour and more like travelling with someone who genuinely wanted us to love the island.",
    testimonialByline: "Maya & Daniel · United Kingdom · Cultural Triangle",
    storyEyebrow: "The island in five movements",
    storyTitle: "Sri Lanka",
    storyImage: "/images/elephant.webp",
    storyImageAlt: "An elephant in the Sri Lankan wilderness",
    storyMovements: ["Stone", "Tea", "Wild", "Road", "Sea"],
    finalEyebrow: "Your island story starts here",
    finalTitle: "Tell us where\nyou want to",
    finalAccent: "wake up",
    finalCopy: "Share your dates, interests and travel style. We will shape a route that feels unmistakably yours.",
  },
};

export function mergeSiteContent(content?: Partial<SiteContent> | null): SiteContent {
  return {
    global: { ...defaultSiteContent.global, ...(content?.global ?? {}) },
    home: { ...defaultSiteContent.home, ...(content?.home ?? {}) },
  };
}
