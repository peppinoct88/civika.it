import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "dark" | "darker" | "light" | "gradient";
  as?: "section" | "div";
}

const backgrounds = {
  dark: "bg-neutral-950",
  darker: "bg-neutral-900",
  light: "bg-neutral-50 text-neutral-900",
  gradient: "bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950",
} as const;

export function SectionWrapper({
  children,
  className,
  id,
  bg = "dark",
  as: Tag = "section",
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative py-[var(--section-py)] overflow-hidden",
        backgrounds[bg],
        className
      )}
    >
      {children}
    </Tag>
  );
}
