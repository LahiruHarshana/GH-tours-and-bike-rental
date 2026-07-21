import { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowVariant?: "light" | "dark";
  title?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
};

export function SectionHeading({
  eyebrow,
  eyebrowVariant = "dark",
  title,
  children,
  align = "left",
  className = "",
  as: Component = "h2",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`.trim()}>
      {eyebrow && <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>}
      {title && typeof title === "string" ? <Component>{title}</Component> : title}
      {children && <div className="section-heading__desc">{children}</div>}
    </div>
  );
}
