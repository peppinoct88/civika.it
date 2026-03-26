"use client";

import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion/FadeUp";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
  delay?: number;
  className?: string;
}

export function ProcessStep({
  number,
  title,
  description,
  isLast = false,
  delay = 0,
  className,
}: ProcessStepProps) {
  return (
    <FadeUp delay={delay} className={cn("relative flex gap-6", className)}>
      {/* Numero + connettore verticale */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
          <span className="font-mono text-sm font-bold text-primary-400">
            {String(number).padStart(2, "0")}
          </span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-3 bg-gradient-to-b from-primary-500/30 to-transparent" />
        )}
      </div>

      {/* Contenuto */}
      <div className="pb-10">
        <h3 className="font-heading font-bold text-lg text-neutral-50">
          {title}
        </h3>
        <p className="mt-2 text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
    </FadeUp>
  );
}
