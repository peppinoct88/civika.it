"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "glass" | "elevated" | "bordered";
  className?: string;
  hover?: boolean;
}

const variants = {
  default: "bg-[var(--surface-card)] border border-white/5",
  glass: "glass-card",
  elevated: "bg-[var(--surface-elevated)] border border-white/8",
  bordered: "bg-transparent border border-white/10",
} as const;

export function Card({
  children,
  variant = "default",
  className,
  hover = true,
}: CardProps) {
  if (!hover) {
    return (
      <div
        className={cn(
          "rounded-[16px] p-6",
          variants[variant],
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "rounded-[16px] p-6 transition-colors duration-300",
        variants[variant],
        "hover:bg-[var(--surface-elevated)] hover:border-white/12",
        className
      )}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
    >
      {children}
    </motion.div>
  );
}
