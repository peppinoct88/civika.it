import { cn } from "@/lib/utils";

interface DividerProps {
  variant?: "horizontal" | "vertical" | "gradient";
  className?: string;
}

export function Divider({ variant = "horizontal", className }: DividerProps) {
  if (variant === "vertical") {
    return (
      <div
        className={cn("w-px h-full bg-white/10", className)}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (variant === "gradient") {
    return (
      <div
        className={cn(
          "h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent",
          className
        )}
        role="separator"
      />
    );
  }

  return (
    <div
      className={cn("h-px w-full bg-white/10", className)}
      role="separator"
    />
  );
}
