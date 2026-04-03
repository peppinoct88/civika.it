"use client";

import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpChild } from "@/lib/animations";

interface ComparisonRowProps {
  label: string;
  without: string;
  withCivika: string;
  className?: string;
}

export function ComparisonRow({
  label,
  without,
  withCivika,
  className,
}: ComparisonRowProps) {
  return (
    <motion.div
      variants={fadeUpChild}
      className={cn(
        "grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-2 md:gap-4 py-4 border-b border-white/5 last:border-0",
        className
      )}
    >
      <div className="font-medium text-neutral-200 text-base mb-1 md:mb-0">
        {label}
      </div>

      {/* Mobile: show inline labels | Desktop: hide them */}
      <div className="flex items-start gap-2 text-base">
        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
        <span className="text-neutral-400">
          <span className="md:hidden font-semibold text-red-400/70 mr-1">Da solo:</span>
          {without}
        </span>
      </div>

      <div className="flex items-start gap-2 text-base">
        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
        <span className="text-neutral-300">
          <span className="md:hidden font-semibold text-accent-400/70 mr-1">Con Civika:</span>
          {withCivika}
        </span>
      </div>
    </motion.div>
  );
}
