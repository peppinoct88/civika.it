"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "section";
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  as = "div",
}: StaggerContainerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const Component = motion.create(as);

  return (
    <Component
      ref={ref}
      className={cn(className)}
      variants={staggerContainer(staggerDelay, delayChildren)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </Component>
  );
}
