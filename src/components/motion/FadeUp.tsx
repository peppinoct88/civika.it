"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}

export function FadeUp({ children, className, delay = 0, as = "div" }: FadeUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const Component = motion.create(as);

  return (
    <Component
      ref={ref}
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
