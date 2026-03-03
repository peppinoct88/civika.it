"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* ═══════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_EXPO: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* ═══════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════ */

/* ── Scroll Progress Bar ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #D4A03C, #E8C06A, #D4A03C)",
      }}
    />
  );
}

/* ── Film Grain Overlay ── */
function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[150] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        animation: "grain 8s steps(10) infinite",
      }}
    />
  );
}

/* ── Word-by-Word Text Reveal ── */
function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              ease: EASE,
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

/* ── Char-by-Char Cinematic Reveal ── */
function CharReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.025,
  started = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  started?: boolean;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%", opacity: 0, rotateX: -90 }}
          animate={started ? { y: 0, opacity: 1, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: EASE,
            delay: delay + i * stagger,
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Parallax Mouse-Following Orb ── */
function ParallaxOrb({
  mouseX,
  mouseY,
  speed,
  className,
}: {
  mouseX: number;
  mouseY: number;
  speed: number;
  className: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ x: mouseX * speed, y: mouseY * speed }}
      transition={{ type: "spring", stiffness: 50, damping: 30, mass: 1 }}
    />
  );
}

/* ── 3D Tilt Card with Spotlight (Aceternity-inspired) ── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });
  const glare = useTransform(x, [-0.5, 0.5], [0, 1]);
  const spotlightBg = useMotionTemplate`radial-gradient(350px circle at ${spotX}px ${spotY}px, rgba(212,160,60,0.06), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
    >
      {children}
      {/* Spotlight radial gradient — follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBg }}
      />
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
        style={{
          opacity: glare,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}

/* ── Magnetic Hover Button ── */
function MagneticButton({
  children,
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.2,
      y: (e.clientY - rect.top - rect.height / 2) * 0.2,
    });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}

/* ── Animated Growing Line ── */
function GrowLine({
  color = "bg-accent",
  delay = 0,
}: {
  color?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className={`h-[3px] rounded-full mx-auto ${color}`}
      initial={{ width: 0 }}
      animate={inView ? { width: 60 } : {}}
      transition={{ duration: 1, ease: EASE, delay }}
    />
  );
}

/* ── Lamp Effect (Aceternity-inspired) ── */
function LampEffect({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Conic gradient glow expanding downward */}
      <motion.div
        className="absolute top-0 h-52"
        initial={{ opacity: 0, width: "15rem" }}
        whileInView={{ opacity: 1, width: "70%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
        style={{
          background:
            "conic-gradient(from 90deg at 50% 0%, transparent 60%, rgba(212,160,60,0.12) 78%, rgba(212,160,60,0.25) 90%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, white, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, white, transparent)",
        }}
      />
      {/* Central bright golden line */}
      <motion.div
        className="absolute top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A03C] to-transparent"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "55%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
      />
      {/* Glow spot at apex */}
      <motion.div
        className="absolute top-0 w-48 h-48 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
        style={{
          background:
            "radial-gradient(circle, rgba(212,160,60,0.3) 0%, transparent 70%)",
        }}
      />
      {/* Content below lamp */}
      <div className="relative z-10 mt-10">{children}</div>
    </div>
  );
}

/* ── Border Beam (Magic UI-inspired) ── */
function BorderBeam({
  duration = 8,
  delay: beamDelay = 0,
  colorFrom = "#D4A03C",
  colorTo = "#E8C06A",
  borderWidth = 1.5,
}: {
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}) {
  return (
    <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none z-[1]">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 75%, ${colorFrom} 85%, ${colorTo} 92%, transparent 100%)`,
          maskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor" as const,
          padding: `${borderWidth}px`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay: beamDelay,
        }}
      />
    </div>
  );
}

/* ── Number Ticker (Magic UI-inspired, spring physics) ── */
function NumberTicker({
  end,
  suffix = "",
  tickerDelay = 0,
}: {
  end: number;
  suffix?: string;
  tickerDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    damping: 60,
    stiffness: 100,
  });
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        motionVal.set(end);
      }, tickerDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, end, motionVal, tickerDelay]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springVal, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ── Section Wrapper ── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN HOMEPAGE
   ═══════════════════════════════════════════════ */

export default function Homepage() {
  const [curtainDone, setCurtainDone] = useState(false);
  const [heroSequence, setHeroSequence] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Mouse tracking for parallax orbs
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Cinematic hero sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurtainDone(true), 300),
      setTimeout(() => setHeroSequence(1), 350),
      setTimeout(() => setHeroSequence(2), 400),
      setTimeout(() => setHeroSequence(3), 1100),
      setTimeout(() => setHeroSequence(4), 1500),
      setTimeout(() => setHeroSequence(5), 1900),
      setTimeout(() => setHeroSequence(6), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Animation presets */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.8, ease: EASE, delay },
  });

  const fadeLeft = (delay = 0) => ({
    initial: { opacity: 0, x: -50 } as const,
    whileInView: { opacity: 1, x: 0 } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.8, ease: EASE, delay },
  });

  const fadeRight = (delay = 0) => ({
    initial: { opacity: 0, x: 50 } as const,
    whileInView: { opacity: 1, x: 0 } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.8, ease: EASE, delay },
  });

  const scaleIn = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.85, y: 30 } as const,
    whileInView: { opacity: 1, scale: 1, y: 0 } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <div className="text-[#0F1F33] leading-relaxed overflow-x-hidden">
      {/* ══ GLOBAL EFFECTS ══ */}
      <ScrollProgress />

      {/* ══════════ NAVBAR ══════════ */}
      <Navbar />

      {/* ══════════ CURTAIN REVEAL ══════════ */}
      <AnimatePresence>
        {!curtainDone && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-[#070E18] origin-left"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.3 }}
              style={{ transformOrigin: "right" }}
            />
            <motion.div
              className="fixed inset-0 z-[99] bg-[#0F1F33]"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.15 }}
              style={{ transformOrigin: "right" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ══════════ HERO ══════════ */}
      <header className="min-h-screen flex items-center justify-center bg-[#070E18] relative overflow-hidden">
        {/* Video Background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: EASE, delay: 0.5 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/og-image.png"
            title="CIVIKA — Comunicazione Istituzionale per Comuni Siciliani"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#070E18]/80 via-[#0F1F33]/70 to-[#1B3A5C]/80" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, #070E18 100%)" }}
          />
        </motion.div>


        <div className="max-w-[900px] mx-auto px-4 sm:px-8 pt-24 sm:pt-36 pb-16 sm:pb-24 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={heroSequence >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4A03C]/10 border border-[#D4A03C]/25 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A03C]" style={{ animation: "pulse-dot 2s ease infinite" }} />
              <span className="text-[#E8C06A] text-[11px] sm:text-[13px] font-semibold tracking-[0.5px] sm:tracking-[1.5px] uppercase">
                La Regia per la Visibilità Istituzionale
              </span>
            </div>
          </motion.div>

          {/* Title Line 1 — char-by-char */}
          <h1 className="text-[clamp(18px,5vw,68px)] font-black text-white leading-[1.1] mb-2 overflow-hidden">
            <CharReveal text="Il vostro Comune lavora." delay={0} stagger={0.03} started={heroSequence >= 2} />
          </h1>

          {/* Animated Gold Line */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-transparent via-[#D4A03C] to-transparent mx-auto mb-4"
            initial={{ width: 0, opacity: 0 }}
            animate={heroSequence >= 2 ? { width: 200, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
          />

          {/* Title Line 2 — gradient blur-to-sharp */}
          <motion.h1
            className="text-[clamp(18px,5vw,68px)] font-black leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={heroSequence >= 3 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <span className="gradient-text">Ma i cittadini lo sanno?</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-[clamp(15px,2vw,21px)] text-white/75 max-w-[600px] mx-auto mb-8 sm:mb-13 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={heroSequence >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            Ogni giorno la vostra amministrazione lavora per il territorio: strade,
            servizi, progetti, bandi vinti. Ma quanti cittadini lo sanno davvero?
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={heroSequence >= 5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-3 rounded-2xl bg-[#D4A03C]/30 blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <MagneticButton
                href="#contatti"
                className="relative inline-block no-underline bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[#0F1F33] px-7 sm:px-10 py-3.5 sm:py-4.5 rounded-[14px] font-bold text-base shadow-xl shadow-[#D4A03C]/30 overflow-hidden"
              >
                Parliamo del vostro Comune
              </MagneticButton>
            </div>
            <MagneticButton
              href="#servizi"
              className="inline-block no-underline bg-white/5 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-[14px] font-semibold text-base border border-white/15 hover:bg-white/10 transition-colors"
            >
              Scopri i servizi →
            </MagneticButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-18 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={heroSequence >= 6 ? { opacity: 0.4 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-[11px] text-white tracking-[2px] uppercase">Scorri</span>
            <div className="w-6 h-10 rounded-xl border-[1.5px] border-white/40 flex justify-center pt-2">
              <motion.div
                className="w-[3px] h-2.5 rounded-full bg-white"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* ══════════ MARQUEE — DUAL ROW ══════════ */}
      <div className="bg-[#0F1F33] border-t border-b border-white/5 py-4 marquee-container">
        {/* Row 1 — scrolls left */}
        <div className="marquee-mask overflow-hidden mb-3">
          <div className="flex w-max marquee-track" style={{ animation: "marquee 22s linear infinite" }}>
            {[0, 1].map((rep) => (
              <div key={rep} className="flex gap-8 sm:gap-16 pr-8 sm:pr-16">
                {[
                  { n: "75%", l: "dei cittadini non sa cosa fa il proprio Comune" },
                  { n: "90%", l: "senza addetto comunicazione" },
                  { n: "62%", l: "siti web non conformi AGID" },
                  { n: "38%", l: "con almeno un social attivo" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 whitespace-nowrap">
                    <span className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-[#D4A03C]">{item.n}</span>
                    <span className="text-[11px] sm:text-[13px] text-white/70 font-medium">{item.l}</span>
                    <span className="text-white/10 text-xl">◆</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Row 2 — scrolls left at different speed (parallax effect) */}
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max marquee-track" style={{ animation: "marquee 35s linear infinite" }}>
            {[0, 1].map((rep) => (
              <div key={rep} className="flex gap-8 sm:gap-16 pr-8 sm:pr-16">
                {[
                  { n: "391", l: "Comuni in Sicilia" },
                  { n: "82%", l: "sotto i 15.000 abitanti" },
                  { n: "47%", l: "sotto i 5.000 abitanti" },
                  { n: "133", l: "in aree interne SNAI" },
                  { n: "350", l: "senza ufficio comunicazione" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 whitespace-nowrap">
                    <span className="text-[18px] sm:text-[24px] md:text-[28px] font-black text-white/60">{item.n}</span>
                    <span className="text-[11px] sm:text-[12px] text-white/60 font-medium">{item.l}</span>
                    <span className="text-[#D4A03C]/20 text-lg">◆</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ IL PROBLEMA — 3D Tilt Cards ══════════ */}
      <Section id="problema" className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-red-50 text-red-600 text-[13px] font-semibold mb-5 tracking-wide"
            {...fadeUp(0.1)}
          >
            Il Problema
          </motion.span>
          <h2 className="text-[clamp(22px,4vw,48px)] font-black text-[#0F1F33] leading-[1.15] mb-5">
            <TextReveal text="Cosa succede quando il Comune non comunica" delay={0.2} />
          </h2>
          <motion.div {...fadeUp(0.6)}>
            <GrowLine color="bg-red-500" delay={0.2} />
          </motion.div>
          <motion.p
            className="text-lg text-gray-500 max-w-[560px] mx-auto mt-6 mb-16 leading-relaxed font-light"
            {...fadeUp(0.7)}
          >
            L&apos;invisibilità costa più di qualsiasi investimento in comunicazione. Questa
            spirale negativa si ripete in centinaia di Comuni siciliani.
          </motion.p>
        </div>

        <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: "👁️‍🗨️", title: "Perdita di visibilità", desc: "I progetti realizzati restano sconosciuti ai cittadini" },
            { icon: "📉", title: "Danni alla reputazione", desc: "L'amministrazione appare inattiva e disinteressata" },
            { icon: "🚫", title: "Opportunità perse", desc: "Il territorio perde occasioni di sviluppo e finanziamenti" },
            { icon: "🔄", title: "Spirale negativa", desc: "Meno visibilità → meno fiducia → meno partecipazione" },
          ].map((item, i) => (
            <motion.div key={i} {...scaleIn(0.15 * i)}>
              <TiltCard className="relative bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 cursor-default h-full group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-500" />
                <div className="text-4xl mb-4 relative z-[1]">{item.icon}</div>
                <h3 className="text-[17px] font-bold text-[#0F1F33] mb-2.5 relative z-[1]">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed relative z-[1]">{item.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════ INTRO CIVIKA ══════════ */}
      <Section className="bg-gradient-to-br from-[#0F1F33] to-[#1B3A5C] py-16 sm:py-28 px-4 sm:px-8 text-center relative overflow-hidden">

        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div
            className="mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, type: "spring", stiffness: 200 }}
          >
            <img
              src="/logo-civika-white.svg"
              alt="CIVIKA — Comunicazione Istituzionale per Comuni Siciliani"
              width={180}
              height={60}
              className="h-[40px] sm:h-[60px] w-auto mx-auto drop-shadow-[0_8px_24px_rgba(212,160,60,0.35)]"
            />
          </motion.div>

          <h2 className="text-[clamp(22px,4vw,50px)] font-black text-white leading-[1.15] mb-6">
            <TextReveal text="Ogni Comune merita di essere visto." delay={0.3} />
          </h2>
          <motion.div {...fadeUp(0.8)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>

          <motion.p
            className="text-[19px] text-white/70 max-w-[600px] mx-auto mt-7 mb-12 leading-relaxed font-light text-center"
            {...fadeUp(0.9)}
          >
            CIVIKA è la regia per la visibilità istituzionale dei Comuni siciliani.
            Comunicazione integrata. Eventi professionali. Presidio mediatico continuativo.
          </motion.p>
          <div className="flex gap-4 justify-center flex-wrap">
            {["Eventi istituzionali", "Comunicazione integrata", "Bandi e rendicontazione"].map(
              (s, i) => (
                <motion.div
                  key={i}
                  className="bg-white/8 border border-white/15 rounded-xl px-7 py-3.5 text-white font-semibold text-[15px] backdrop-blur-sm hover:bg-white/12 hover:border-[#D4A03C]/40 transition-all duration-400"
                  {...scaleIn(1.1 + i * 0.12)}
                >
                  {s}
                </motion.div>
              )
            )}
          </div>
        </div>
      </Section>

      {/* ══════════ CONFRONTO ══════════ */}
      <Section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Un evento fatto bene vale più di cento post" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.5)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Senza CIVIKA */}
            <motion.div className="rounded-3xl overflow-hidden border-2 border-gray-200" {...fadeLeft(0.1)}>
              <div className="bg-red-50 px-4 sm:px-7 py-4 sm:py-5 flex items-center gap-2.5">
                <span className="text-xl">❌</span>
                <span className="font-extrabold text-lg text-red-600">Senza CIVIKA</span>
              </div>
              <div className="p-4 sm:p-7">
                {[
                  ["Partecipanti", "Poche centinaia"],
                  ["Stampa", "0 articoli"],
                  ["Social", "2 foto dal cellulare"],
                  ["Foto", "Selfie del Sindaco"],
                  ["Video", "Nessuno"],
                  ["Report", "Nessuno"],
                  ["Rendicontazione", "Nessun materiale"],
                ].map(([k, v], i) => (
                  <div key={i} className={`flex justify-between py-3 ${i < 6 ? "border-b border-gray-200" : ""}`}>
                    <span className="text-sm text-gray-500">{k}</span>
                    <span className="text-sm text-red-600 font-semibold">{v}</span>
                  </div>
                ))}
                <div className="mt-6 p-4 rounded-[14px] bg-red-50 text-center">
                  <span className="text-3xl font-black text-red-600">15%</span>
                  <div className="text-xs text-red-600/70 mt-0.5">cittadini raggiunti</div>
                </div>
              </div>
            </motion.div>

            {/* Con CIVIKA — pulsing glow */}
            <motion.div className="relative" {...fadeRight(0.25)}>
              <motion.div
                className="absolute -inset-1 rounded-3xl bg-green-500/20 blur-xl"
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative rounded-3xl overflow-hidden border-2 border-green-500 shadow-xl shadow-green-500/10 bg-white">
                <div className="bg-green-50 px-4 sm:px-7 py-4 sm:py-5 flex items-center gap-2.5">
                  <span className="text-xl">✅</span>
                  <span className="font-extrabold text-lg text-green-600">Con CIVIKA</span>
                </div>
                <div className="p-4 sm:p-7">
                  {[
                    ["Partecipanti", "Migliaia"],
                    ["Stampa", "3-8 uscite media"],
                    ["Social", "10-15 contenuti pro"],
                    ["Foto", "Reportage (80+ scatti)"],
                    ["Video", "Highlights 2-3 min"],
                    ["Report", "Impatto in 7 giorni"],
                    ["Rendicontazione", "Pacchetto completo"],
                  ].map(([k, v], i) => (
                    <div key={i} className={`flex justify-between py-3 ${i < 6 ? "border-b border-gray-200" : ""}`}>
                      <span className="text-sm text-gray-500">{k}</span>
                      <span className="text-sm text-green-600 font-semibold">{v}</span>
                    </div>
                  ))}
                  <div className="mt-6 p-4 rounded-[14px] bg-green-50 text-center">
                    <span className="text-3xl font-black text-green-600">
                      <NumberTicker end={93} suffix="%" />
                    </span>
                    <div className="text-xs text-green-600/70 mt-0.5">cittadini raggiunti</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ══════════ 6 TIPOLOGIE EVENTI — 3D Tilt Cards ══════════ */}
      <Section id="servizi" className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4.5 py-1.5 rounded-full bg-[#1B3A5C]/7 text-[#1B3A5C] text-[13px] font-semibold tracking-wide"
              {...fadeUp()}
            >
              Eventi Istituzionali
            </motion.span>
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight mt-4">
              <TextReveal text="6 tipologie di eventi. Una sola regia." delay={0.2} />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.6)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: "🎀", title: "Inaugurazioni", desc: "Taglio del nastro, visite guidate, presentazione opere alla cittadinanza.", href: "/servizi/eventi-istituzionali" },
              { icon: "🏛️", title: "Convegni istituzionali", desc: "Forum, seminari, tavoli di concertazione con relatori e ospiti istituzionali.", href: "/servizi/eventi-istituzionali" },
              { icon: "🎭", title: "Festival e cultura", desc: "Rassegne, festival, eventi di promozione turistica e territoriale.", href: "/servizi/eventi-istituzionali" },
              { icon: "🤝", title: "Animazione GAL/SNAI", desc: "Workshop partecipativi, assemblee, giornate LEADER.", href: "/servizi/eventi-istituzionali" },
              { icon: "🏅", title: "Cerimonie", desc: "Commemorazioni, cittadinanze onorarie, celebrazioni civiche.", href: "/servizi/eventi-istituzionali" },
              { icon: "🎤", title: "Conferenze stampa", desc: "Presentazione iniziative, bilanci, annunci. Media management completo.", href: "/servizi/eventi-istituzionali" },
            ].map((item, i) => (
              <motion.div key={i} {...scaleIn(0.1 * i)}>
                <a href={item.href} className="block no-underline h-full">
                <TiltCard className="relative bg-white rounded-2xl p-4 sm:p-7 border border-gray-200 flex gap-4 items-start cursor-pointer group overflow-hidden h-full">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4A03C]/0 to-[#1B3A5C]/0 group-hover:from-[#D4A03C]/5 group-hover:to-[#1B3A5C]/5 transition-all duration-700" />
                  <div className="w-[54px] h-[54px] rounded-2xl bg-[#1B3A5C]/5 group-hover:bg-[#D4A03C]/10 flex items-center justify-center text-3xl shrink-0 transition-colors duration-500 relative z-[1]">
                    {item.icon}
                  </div>
                  <div className="relative z-[1]">
                    <h3 className="text-[17px] font-bold text-[#0F1F33] mb-1.5">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ 6 STEP — Animated Timeline ══════════ */}
      <Section id="metodo" className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#D4A03C] text-[13px] font-semibold tracking-wide"
              {...fadeUp()}
            >
              Il Processo
            </motion.span>
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight mt-4">
              <TextReveal text="Dal concept alla rassegna stampa" delay={0.2} />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.6)}>
              <GrowLine />
            </motion.div>
            <motion.p
              className="text-[17px] text-gray-500 max-w-[520px] mx-auto mt-6 leading-relaxed font-light"
              {...fadeUp(0.7)}
            >
              Il Sindaco non deve pensare a niente. Noi gestiamo tutto: dalla prima idea al
              report finale.
            </motion.p>
          </div>

          <div className="relative">
            {/* Animated gradient timeline line */}
            <motion.div
              className="absolute left-[23px] sm:left-[31px] top-8 w-[2px]"
              style={{ background: "linear-gradient(180deg, #D4A03C, #1B3A5C, #D4A03C)" }}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "calc(100% - 64px)", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: EASE, delay: 0.3 }}
            />
            {[
              { n: "01", title: "Ascolto", desc: "Obiettivo dell'evento, pubblico, budget, contesto politico e territoriale." },
              { n: "02", title: "Concept", desc: "Format creativo, programma, storytelling, selezione relatori." },
              { n: "03", title: "Logistica", desc: "Location, allestimenti, audio/video, permessi, catering." },
              { n: "04", title: "Comunicazione", desc: "Inviti, comunicato stampa, piano social, contatto media." },
              { n: "05", title: "Evento", desc: "Regia in loco, copertura social live, reportage foto/video." },
              { n: "06", title: "Dopo", desc: "Rassegna stampa, report metriche, materiale per rendicontazione." },
            ].map((step, i) => (
              <motion.div
                key={i}
                className={`flex gap-3 sm:gap-6 items-start relative ${i < 5 ? "mb-4 sm:mb-6" : ""}`}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 + 0.15 * i }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#D4A03C] to-[#1B3A5C] flex items-center justify-center text-white font-extrabold text-base z-10 shadow-lg shadow-[#1B3A5C]/20 shrink-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300, delay: 0.3 + 0.15 * i }}
                >
                  {step.n}
                </motion.div>
                <div className="bg-[#F7F5F0] rounded-2xl px-7 py-5 flex-1 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500">
                  <h3 className="text-[17px] font-bold text-[#0F1F33] mb-1.5">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center p-5 bg-[#1B3A5C]/[0.03] rounded-2xl border border-gray-200"
            {...fadeUp(0.3)}
          >
            <span className="text-[15px] text-[#1B3A5C] font-semibold">
              ⏱ Tempo medio di organizzazione: <strong>30-45 giorni</strong>
            </span>
          </motion.div>
        </div>
      </Section>

      {/* ══════════ 5 SERVIZI INTEGRATI ══════════ */}
      <Section className="bg-gradient-to-br from-[#070E18] to-[#1B3A5C] py-16 sm:py-28 px-4 sm:px-8 relative overflow-hidden">

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/12 text-[#E8C06A] text-[13px] font-semibold tracking-wide"
              {...fadeUp()}
            >
              Comunicazione Integrata
            </motion.span>
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-white leading-tight mt-4">
              <TextReveal text="Un unico partner. Cinque servizi integrati." delay={0.2} />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.6)}>
              <GrowLine color="bg-[#D4A03C]" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🌐", title: "Sito web istituzionale", href: "/servizi/sito-web-comunale-agid", items: ["Conforme AGID e Design System Italia", "Accessibile WCAG 2.1 AA", "Integrazione SPID, CIE, pagoPA", "Manutenzione continua"] },
              { icon: "📱", title: "Social media", href: "/servizi/social-media-comuni", items: ["Piano editoriale istituzionale", "Content creation professionale", "Gestione crisi e emergenze", "Community management"] },
              { icon: "📰", title: "Ufficio stampa", href: "/servizi/ufficio-stampa-comuni", items: ["Comunicati stampa", "Relazioni con media locali e regionali", "Media training per Sindaci", "Rassegna stampa"] },
              { icon: "✉️", title: "Newsletter", href: "/servizi/comunicazione-istituzionale", items: ["Comunicazioni ai cittadini", "Mailing list segmentate", "Piattaforme conformi GDPR"] },
              { icon: "🎨", title: "Branding", href: "/servizi/comunicazione-istituzionale", items: ["Identità visiva dell'Ente", "Materiali per campagne", "Video istituzionali", "Template documentali"] },
            ].map((svc, i) => (
              <motion.div key={i} {...scaleIn(0.12 * i)}>
                <a href={svc.href} className="block no-underline h-full">
                <TiltCard className="relative bg-white/[0.04] rounded-2xl p-4 sm:p-8 border border-white/[0.08] backdrop-blur-sm cursor-pointer group overflow-hidden h-full">
                  {/* Gold border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-[#D4A03C]/0 group-hover:border-[#D4A03C]/30 transition-all duration-700" />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,160,60,0.08) 0%, transparent 60%)" }} />
                  <div className="text-4xl mb-5 relative z-[1]">{svc.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-4 relative z-[1]">{svc.title}</h3>
                  {svc.items.map((item, j) => (
                    <div key={j} className="text-sm text-white/70 py-1.5 flex items-center gap-2.5 relative z-[1]">
                      <span className="text-[#D4A03C] text-[8px]">●</span> {item}
                    </div>
                  ))}
                </TiltCard>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ A NORMA ══════════ */}
      <Section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="A norma. Sempre. Su tutto." />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.5)}>
              <GrowLine />
            </motion.div>
            <motion.p
              className="text-base text-gray-500 max-w-[520px] mx-auto mt-6 leading-relaxed"
              {...fadeUp(0.6)}
            >
              Il vostro Segretario Comunale può stare tranquillo. Ogni deliverable viene
              verificato prima della pubblicazione.
            </motion.p>
          </div>

          <div className="grid gap-1.5">
            {[
              ["L. 150/2000", "Comunicazione pubblica", "Piano editoriale distingue informazione da propaganda"],
              ["D.Lgs. 33/2013", "Trasparenza", "Amministrazione Trasparente strutturata e aggiornata"],
              ["Linee Guida AGID", "Siti PA", "Design System Italia applicato a ogni sito"],
              ["WCAG 2.1 AA", "Accessibilità", "Test di accessibilità su ogni rilascio"],
              ["GDPR", "Privacy", "Newsletter e form conformi, DPO consultato"],
              ["D.Lgs. 36/2023", "Contratti pubblici", "Supporto per determine e atti di affidamento"],
              ["CAD", "Amm. digitale", "Integrazione SPID, CIE, pagoPA, AppIO"],
            ].map(([norm, area, desc], i) => (
              <motion.div
                key={i}
                className={`grid grid-cols-[100px_120px_1fr_32px] sm:grid-cols-[130px_160px_1fr_40px] items-center gap-4 px-3 sm:px-6 py-3 sm:py-4 rounded-xl group hover:bg-[#1B3A5C]/5 transition-all duration-300 ${
                  i % 2 === 0 ? "bg-[#F7F5F0]" : "bg-white"
                }`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.06 * i }}
              >
                <span className="font-bold text-xs text-[#1B3A5C] font-mono">{norm}</span>
                <span className="text-sm font-semibold text-[#0F1F33]">{area}</span>
                <span className="text-[13px] text-gray-500">{desc}</span>
                <motion.span
                  className="text-green-500 font-extrabold text-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 400, delay: 0.1 + 0.06 * i }}
                >
                  ✓
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ BANDI ══════════ */}
      <Section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#D4A03C] text-[13px] font-semibold"
              {...fadeUp()}
            >
              Servizio Complementare
            </motion.span>
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight mt-4">
              <TextReveal text="Vi aiutiamo anche a trovare i fondi" delay={0.2} />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.6)}>
              <GrowLine />
            </motion.div>
          </div>

          {[
            { n: "1", title: "Scouting bandi", desc: "PNRR, FESR, FEASR, regionali, SNAI, LEADER, fondazioni" },
            { n: "2", title: "Analisi ammissibilità", desc: "Verifica requisiti e stima punteggio competitivo" },
            { n: "3", title: "Scrittura progetto", desc: "Progetto esecutivo e piano finanziario completo" },
            { n: "4", title: "Supporto istruttoria", desc: "Integrazioni e controdeduzioni durante la valutazione" },
            { n: "5", title: "Rendicontazione", desc: "Accompagnamento fino alla chiusura amministrativa" },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="flex gap-5 items-center mb-3 bg-white rounded-2xl px-4 sm:px-7 py-4 sm:py-5 border border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#D4A03C]/20 transition-all duration-500 group"
              {...fadeRight(0.1 * i)}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] flex items-center justify-center text-white font-extrabold text-[17px] shrink-0 group-hover:shadow-lg group-hover:shadow-[#D4A03C]/30 transition-shadow duration-500">
                {step.n}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F1F33] mb-0.5">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              className="bg-gradient-to-br from-[#1B3A5C] to-[#2A5580] rounded-2xl p-8 text-white relative overflow-hidden group"
              {...fadeLeft(0.1)}
            >
              <div className="absolute inset-0 bg-[#D4A03C]/0 group-hover:bg-[#D4A03C]/5 transition-colors duration-700" />
              <div className="text-[15px] font-bold mb-2.5 text-[#E8C06A] relative z-[1]">→ Dall&apos;evento al bando</div>
              <p className="text-sm leading-relaxed opacity-80 relative z-[1]">
                Vorreste fare il festival culturale con noi? C&apos;è un bando che lo finanzia.
                Scriviamo il progetto.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] rounded-2xl p-8 text-white relative overflow-hidden group"
              {...fadeRight(0.2)}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-700" />
              <div className="text-[15px] font-bold mb-2.5 relative z-[1]">→ Dal bando all&apos;evento</div>
              <p className="text-sm leading-relaxed opacity-85 relative z-[1]">
                Avete vinto il bando? Lo organizziamo e lo comunichiamo.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ══════════ METODO CIVIKA — 3D Phase Cards ══════════ */}
      <Section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Il Metodo CIVIKA" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
            <motion.p
              className="text-[17px] text-gray-500 max-w-[560px] mx-auto mt-6 leading-relaxed font-light"
              {...fadeUp(0.5)}
            >
              Non improvvisiamo. Un processo collaudato dall&apos;ascolto alla misurazione.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "①", title: "Ascolto", color: "bg-[#1B3A5C]", items: ["Incontro con Sindaco e Giunta", "Audit completo comunicazione", "Analisi priorità politiche"] },
              { n: "②", title: "Strategia", color: "bg-[#2A5580]", items: ["Piano comunicazione completo", "Piano eventi", "Proposta operativa con budget"] },
              { n: "③", title: "Esecuzione", color: "bg-[#D4A03C]", items: ["Gestione quotidiana canali", "Organizzazione eventi", "Monitoraggio e ottimizzazione"] },
              { n: "④", title: "Misurazione", color: "bg-green-600", items: ["Report visite e reach social", "Uscite stampa e partecipazione", "Analisi sentiment"] },
            ].map((phase, i) => (
              <motion.div key={i} {...scaleIn(0.15 * i)}>
                <TiltCard className="rounded-2xl overflow-hidden border border-gray-200 cursor-default group h-full bg-white">
                  <div className={`${phase.color} px-4 sm:px-7 py-4 sm:py-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-700" />
                    <div className="text-3xl mb-1 opacity-70 relative z-[1]">{phase.n}</div>
                    <div className="text-xl font-extrabold relative z-[1]">{phase.title}</div>
                  </div>
                  <div className="px-4 sm:px-7 py-4 sm:py-6">
                    {phase.items.map((item, j) => (
                      <div key={j} className="text-sm text-gray-500 py-1.5 leading-relaxed">
                        {item}
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center p-5 bg-[#F7F5F0] rounded-2xl border border-gray-200"
            {...fadeUp(0.3)}
          >
            <span className="text-base text-[#1B3A5C] font-semibold italic">
              &ldquo;Se non si misura, non esiste.&rdquo;
            </span>
          </motion.div>
        </div>
      </Section>

      {/* ══════════ PERCHÉ CIVIKA ══════════ */}
      <Section id="perche" className="bg-gradient-to-br from-[#0F1F33] to-[#1B3A5C] py-16 sm:py-28 px-4 sm:px-8 relative overflow-hidden">

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-white leading-tight">
              <TextReveal text="Perché scegliere CIVIKA" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine color="bg-[#D4A03C]" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🏛️", title: "Solo PA", desc: "Il 100% del nostro lavoro è per Comuni ed Enti pubblici." },
              { icon: "🔗", title: "Integrati", desc: "Un solo partner per sito, social, stampa, eventi, branding." },
              { icon: "📅", title: "Continuativi", desc: "Retainer mensile, presenza costante, relazione che dura." },
              { icon: "⚖️", title: "A norma", desc: "AGID, accessibilità, trasparenza, GDPR. Tutto a norma, sempre." },
              { icon: "📍", title: "Sul territorio", desc: "Siamo in Sicilia. Conosciamo i territori. Parliamo la stessa lingua." },
              { icon: "📊", title: "Misurabili", desc: "Report con dati veri. Risultati, non slide." },
            ].map((item, i) => (
              <motion.div key={i} {...scaleIn(0.1 * i)}>
                <TiltCard className="relative bg-white/[0.04] rounded-2xl p-5 sm:p-8 border border-white/[0.08] backdrop-blur-sm cursor-default group overflow-hidden h-full">
                  {/* Gold border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-[#D4A03C]/0 group-hover:border-[#D4A03C]/40 transition-all duration-500" />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 100%, rgba(212,160,60,0.1) 0%, transparent 60%)" }} />
                  <div className="text-4xl mb-4 relative z-[1]">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2.5 relative z-[1]">{item.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed relative z-[1]">{item.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ 391 COMUNI ══════════ */}
      <Section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100, damping: 15 }}
          >
            <h2 className="text-[clamp(36px,9vw,100px)] font-black text-[#1B3A5C] mb-2">
              <NumberTicker end={391} />
            </h2>
          </motion.div>
          <h3 className="text-[clamp(18px,3vw,36px)] font-extrabold text-[#0F1F33] mb-4">
            <TextReveal text="Comuni. Una missione." delay={0.3} />
          </h3>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 mb-12">
            {[
              { num: 321, label: "Sotto i 15.000 ab.", detail: "82%" },
              { num: 185, label: "Sotto i 5.000 ab.", detail: "47%" },
              { num: 133, label: "In aree SNAI", detail: "" },
              { num: 350, label: "Senza ufficio comunicazione", detail: "90%" },
            ].map((s, i) => (
              <motion.div key={i} {...scaleIn(0.12 * i)}>
                <TiltCard className="bg-white rounded-2xl px-3 sm:px-5 py-5 sm:py-7 border border-gray-200 cursor-default group h-full">
                  <div className="text-3xl sm:text-4xl font-black text-[#1B3A5C]">
                    <NumberTicker end={s.num} />
                  </div>
                  <div className="text-[13px] text-gray-500 mt-1.5">{s.label}</div>
                  {s.detail && (
                    <div className="text-xs text-[#D4A03C] font-bold mt-1">{s.detail}</div>
                  )}
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-lg text-gray-500 max-w-[500px] mx-auto leading-relaxed font-light"
            {...fadeUp(0.3)}
          >
            Ogni punto su questa mappa è un Comune che merita di essere visto. CIVIKA esiste
            per questo.
          </motion.p>
        </div>
      </Section>

      {/* ══════════ CTA / CONTATTI ══════════ */}
      <Section
        id="contatti"
        className="bg-gradient-to-br from-[#070E18] to-[#1B3A5C] py-16 sm:py-28 px-4 sm:px-8 text-center relative overflow-hidden"
      >

        <div className="max-w-[700px] mx-auto relative z-10">
          <h2 className="text-[clamp(20px,4vw,50px)] font-black text-white leading-tight mb-2">
            <TextReveal text="Parliamo del vostro Comune." />
          </h2>
          <motion.div {...fadeUp(0.6)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-lg text-white/75 max-w-[500px] mx-auto mt-7 mb-3 leading-relaxed font-light"
            {...fadeUp(0.7)}
          >
            Il primo passo è una conversazione. Nessun impegno, nessun contratto. Ci sediamo
            con voi, ascoltiamo, e vi proponiamo un piano su misura.
          </motion.p>
          <motion.p className="text-sm text-white/70 mb-14" {...fadeUp(0.9)}>
            Vi rispondiamo entro 24 ore. Il primo incontro è sempre gratuito.
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {[
              { icon: "📞", label: "Telefono", desc: "Chiamateci per un primo confronto" },
              { icon: "📧", label: "Email", desc: "Scriveteci per informazioni" },
              { icon: "🌐", label: "Web", desc: "civika.it" },
              { icon: "📍", label: "Sede", desc: "Sicilia — Ci muoviamo noi" },
            ].map((c, i) => (
              <motion.div key={i} {...scaleIn(1 + 0.1 * i)}>
                <TiltCard className="relative bg-white/[0.04] rounded-2xl px-3 sm:px-5 py-5 sm:py-7 border border-white/[0.08] backdrop-blur-sm cursor-default group overflow-hidden h-full">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,160,60,0.08) 0%, transparent 60%)" }} />
                  <div className="text-3xl mb-2.5 relative z-[1]">{c.icon}</div>
                  <div className="text-[15px] font-bold text-white mb-1 relative z-[1]">{c.label}</div>
                  <div className="text-[13px] text-white/70 relative z-[1]">{c.desc}</div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA button with pulsing glow */}
          <motion.div {...fadeUp(1.4)}>
            <div className="relative inline-block">
              <motion.div
                className="absolute -inset-4 rounded-3xl bg-[#D4A03C]/25 blur-2xl"
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <MagneticButton
                href="mailto:civikasrl@gmail.com"
                className="relative inline-block no-underline bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[#0F1F33] px-8 sm:px-14 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-[#D4A03C]/30 overflow-hidden"
              >
                Contattaci ora
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ══════════ FOOTER ══════════ */}
      <Footer />
    </div>
  );
}
