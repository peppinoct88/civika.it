"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function MagneticButton({
  children,
  href = "#",
  className = "",
  isLink = false,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  isLink?: boolean;
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

  if (isLink) {
    return (
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseMove={handleMove}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
      >
        <Link href={href} className={className}>
          {children}
        </Link>
      </motion.div>
    );
  }

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

const NAV_LINKS = [
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Blog", href: "/blog" },
  { label: "Contatti", href: "/contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-[#0F1F33]/95 backdrop-blur-xl py-3.5 border-b border-white/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center no-underline">
          <img
            src="/logo-civika-white.svg"
            alt="CIVIKA — Comunicazione Istituzionale per Comuni Siciliani"
            width={108}
            height={36}
            className="h-[36px] w-auto"
          />
        </Link>
        <div className="flex gap-9 items-center">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-white/70 no-underline text-sm font-medium tracking-wide hover:text-[#D4A03C] transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
          <MagneticButton
            href="/contatti"
            isLink
            className="inline-block no-underline bg-[#D4A03C] text-[#0F1F33] px-7 py-2.5 rounded-[10px] font-bold text-sm shadow-lg shadow-[#D4A03C]/30"
          >
            Parliamone
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
