import { cn } from "@/lib/utils";

const variants = {
  default: "bg-primary-500/10 text-primary-300 border-primary-500/20",
  accent: "bg-accent-400/10 text-accent-300 border-accent-400/20",
  outline: "bg-transparent text-neutral-300 border-neutral-700",
} as const;

interface BadgeProps {
  variant?: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
