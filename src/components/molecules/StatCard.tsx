"use client";

import { cn } from "@/lib/utils";
import { Counter } from "@/components/motion/Counter";
import { FadeUp } from "@/components/motion/FadeUp";

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
  delay?: number;
}

export function StatCard({
  value,
  suffix = "",
  prefix = "",
  label,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <FadeUp delay={delay} className={cn("text-center", className)}>
      <div className="font-mono text-[clamp(2.5rem,5vw,4rem)] font-bold text-neutral-50 leading-none">
        <Counter to={value} suffix={suffix} prefix={prefix} />
      </div>
      <p className="mt-2 text-sm text-neutral-400 uppercase tracking-wider">
        {label}
      </p>
    </FadeUp>
  );
}
