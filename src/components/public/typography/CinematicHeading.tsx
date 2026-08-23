import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type CinematicHeadingProps = {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  id?: string;
};

export function CinematicHeading({
  lines,
  className,
  as: Component = "h2",
  id,
}: CinematicHeadingProps) {
  return (
    <Component id={id} className={cn("cinematic-heading", className)}>
      {lines.map((line, index) => (
        <span className="cinematic-heading__line" key={index}>
          <span style={{ transitionDelay: `${index * 105}ms` }}>{line}</span>
        </span>
      ))}
    </Component>
  );
}
