import Image from "next/image";

type SignatureJourneyImageProps = {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  priority?: boolean;
};

export function SignatureJourneyImage({
  desktopSrc,
  mobileSrc,
  alt,
  priority = false,
}: SignatureJourneyImageProps) {
  return (
    <picture className="signature-journey-picture">
      <source media="(max-width: 760px)" srcSet={mobileSrc} type="image/webp" />
      <Image
        src={desktopSrc}
        alt={alt}
        width={1920}
        height={1280}
        sizes="100vw"
        priority={priority}
        className="signature-journey-picture__img"
      />
    </picture>
  );
}
