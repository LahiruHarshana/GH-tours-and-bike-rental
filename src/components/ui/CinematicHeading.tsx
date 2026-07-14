import { cn } from "@/lib/utils";

export function CinematicHeading({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <h2 className={cn("cinematic-heading", className)}>
      {lines.map((line, index) => (
        <span className="cinematic-heading__line" key={line}>
          <span style={{ transitionDelay: `${index * 105}ms` }}>{line}</span>
        </span>
      ))}
    </h2>
  );
}
