import Image from "next/image";

type BikeFleetImageProps = {
  desktopSrc: string;
  mobileSrc: string | null;
  alt: string;
  priority?: boolean;
  unoptimized?: boolean;
};

export function BikeFleetImage({
  desktopSrc,
  mobileSrc,
  alt,
  priority = false,
  unoptimized = false,
}: BikeFleetImageProps) {
  return (
    <picture className="bike-fleet-picture">
      {mobileSrc ? (
        <source media="(max-width: 760px)" srcSet={mobileSrc} type="image/webp" />
      ) : null}
      <Image
        src={desktopSrc}
        alt={alt}
        width={1920}
        height={1280}
        sizes="100vw"
        priority={priority}
        unoptimized={unoptimized}
        className="bike-fleet-picture__img"
      />
    </picture>
  );
}
