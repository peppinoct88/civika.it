"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeOutExpo } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em] py-[0.1em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              ease: easeOutExpo,
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
