import type { Variants, Transition } from "framer-motion";

/* ══════════════════════════════════════════════════
   Easing Curves
   ══════════════════════════════════════════════════ */

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeInOutExpo: [number, number, number, number] = [0.87, 0, 0.13, 1];
export const easeOutBack: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export const springDefault: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
};

/* ══════════════════════════════════════════════════
   Scroll Reveal Variants
   ══════════════════════════════════════════════════ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeUpStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/* ══════════════════════════════════════════════════
   Hero Specific
   ══════════════════════════════════════════════════ */

export const heroWord: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
      delay: i * 0.05,
    },
  }),
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo, delay: 0.3 },
  },
};

export const heroCTA: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo, delay: 0.5 },
  },
};

export const heroVideo: Variants = {
  hidden: { scale: 1.05, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: easeOutExpo },
  },
};

/* ══════════════════════════════════════════════════
   Container Stagger (per sezioni con figli)
   ══════════════════════════════════════════════════ */

export const staggerContainer = (
  staggerDelay = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/* ══════════════════════════════════════════════════
   Hover / Interaction Variants
   ══════════════════════════════════════════════════ */

export const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: easeOutExpo },
  },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: easeOutExpo },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/* ══════════════════════════════════════════════════
   Navbar
   ══════════════════════════════════════════════════ */

export const navbarBg = {
  transparent: {
    backgroundColor: "rgba(17, 17, 19, 0)",
    backdropFilter: "blur(0px)",
  },
  solid: {
    backgroundColor: "rgba(17, 17, 19, 0.8)",
    backdropFilter: "blur(12px)",
  },
};

export const mobileMenu: Variants = {
  closed: {
    x: "100%",
    transition: { duration: 0.3, ease: easeOutExpo },
  },
  open: {
    x: 0,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
};

export const mobileMenuItem: Variants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: easeOutExpo,
      delay: 0.1 + i * 0.05,
    },
  }),
};
