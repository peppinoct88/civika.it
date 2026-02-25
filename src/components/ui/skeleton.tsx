import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ variant = "text", className, ...props }: SkeletonProps) {
  const variants = {
    text: "h-4 w-full rounded",
    circular: "h-10 w-10 rounded-full",
    rectangular: "h-32 w-full rounded-lg",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--surface-2)]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
