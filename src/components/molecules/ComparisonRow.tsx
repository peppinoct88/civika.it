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
        "grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 py-4 border-b border-white/5 last:border-0",
        className
      )}
    >
      <div className="font-medium text-neutral-200 text-sm">
        {label}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <X className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
        <span className="text-neutral-500">{without}</span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Check className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
        <span className="text-neutral-200">{withCivika}</span>
      </div>
    </motion.div>
  );
}
