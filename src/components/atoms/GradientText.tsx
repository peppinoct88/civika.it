import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "accent" | "blue";
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
}

export function GradientText({
  children,
  variant = "accent",
  className,
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        variant === "accent" ? "gradient-text" : "gradient-text-blue",
        className
      )}
    >
      {children}
    </Tag>
  );
}
