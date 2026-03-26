"use client";

import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion/FadeUp";
import { Divider } from "@/components/atoms/Divider";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  dark?: boolean;
}

export function SectionHeader({
  overline,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  dark = true,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {overline && (
        <FadeUp>
          <p
            className={cn(
              "text-[0.6875rem] font-medium uppercase tracking-[0.08em] mb-4",
              dark ? "text-primary-400" : "text-primary-600"
            )}
          >
            {overline}
          </p>
        </FadeUp>
      )}

      <FadeUp delay={0.05}>
        <h2
          className={cn(
            "font-heading font-bold leading-[1.15] tracking-[-0.01em]",
            "text-[clamp(1.75rem,3vw+0.5rem,3rem)]",
            dark ? "text-neutral-50" : "text-neutral-900",
            titleClassName
          )}
        >
          {title}
        </h2>
      </FadeUp>

      {subtitle && (
        <FadeUp delay={0.1}>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed max-w-2xl",
              align === "center" && "mx-auto",
              dark ? "text-neutral-400" : "text-neutral-600"
            )}
          >
            {subtitle}
          </p>
        </FadeUp>
      )}

      <FadeUp delay={0.15}>
        <Divider
          variant="gradient"
          className={cn(
            "mt-6 max-w-24",
            align === "center" && "mx-auto"
          )}
        />
      </FadeUp>
    </div>
  );
}
