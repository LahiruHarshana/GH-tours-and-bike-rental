const MOBILE_BIKE_IMAGE_BASE = "/images/bikes/mobile-vehicle-webp-images";

const MOBILE_BIKE_SLUGS = new Set([
  "yamaha-nmax-155",
  "honda-adv-160",
  "suzuki-burgman-street-125",
  "honda-dio",
  "tvs-ntorq-125",
  "yamaha-fz-s-fi",
]);

export function getBikeMobileImage(slug: string): string | null {
  if (!MOBILE_BIKE_SLUGS.has(slug)) return null;
  return `${MOBILE_BIKE_IMAGE_BASE}/${slug}-mobile.webp`;
}
