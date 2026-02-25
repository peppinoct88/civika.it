import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "interactive";
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-[var(--surface)] border border-[var(--border)]",
    elevated: "bg-[var(--surface)] shadow-md",
    outlined: "bg-transparent border border-[var(--border)]",
    interactive:
      "bg-[var(--surface)] border border-[var(--border)] hover:border-primary-300 hover:shadow-md transition-all cursor-pointer",
  };

  return (
    <div
      className={cn("rounded-xl p-6", variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
