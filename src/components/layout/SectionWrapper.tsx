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
  darker: "bg-[#0a0a0c]",
  light: "bg-neutral-50 text-neutral-900",
  gradient: "bg-gradient-to-b from-neutral-950 to-[#0a0a0c]",
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
