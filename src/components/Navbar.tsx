"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Blog", href: "/blog" },
  { label: "Contatti", href: "/contatti" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  /* ── Scroll detection ── */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 100);

      /* Hide on scroll-down, show on scroll-up */
      if (currentY > lastScrollY.current && currentY > 100 && !isMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  /* ── Lock body scroll when menu is open ── */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* ══════════ HEADER ══════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-1000 ease-out ${
          isHidden && !isMenuOpen ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        {/* ── Pill background ── */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none transition-all duration-1000 ease-out ${
            isScrolled
              ? "top-3 h-[56px] w-[340px] md:w-[480px] opacity-100 shadow-2xl shadow-[#070E18]/60"
              : "top-8 h-[64px] w-[92%] max-w-[1200px] opacity-0"
          }`}
          style={{
            background: isScrolled
              ? "linear-gradient(135deg, #070E18 0%, #0F1F33 50%, #070E18 100%)"
              : "transparent",
            borderWidth: isScrolled ? "1px" : "0px",
            borderColor: "rgba(212, 160, 60, 0.12)",
            borderStyle: "solid",
          }}
        />

        {/* ── Nav content ── */}
        <nav
          className={`relative z-10 mx-auto flex items-center justify-between transition-all duration-1000 ease-out ${
            isScrolled
              ? "mt-3 max-w-[300px] md:max-w-[440px] px-7 py-2.5"
              : "mt-8 max-w-[1200px] px-8 py-3"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline">
            <img
              src="/logo-civika-white.svg"
              alt="CIVIKA"
              width={108}
              height={36}
              className={`w-auto transition-all duration-1000 ease-out ${
                isScrolled ? "h-[28px]" : "h-[42px]"
              }`}
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer group"
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                isMenuOpen
                  ? "w-6 rotate-45 translate-y-[8px]"
                  : "w-6 group-hover:w-5"
              }`}
            />
            <span
              className={`block h-[2px] w-4 bg-white rounded-full transition-all duration-500 ease-out ${
                isMenuOpen ? "opacity-0 scale-x-0" : "group-hover:w-6"
              }`}
            />
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                isMenuOpen
                  ? "w-6 -rotate-45 -translate-y-[8px]"
                  : "w-6 group-hover:w-4"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* ══════════ FULLSCREEN MENU ══════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#070E18]/[0.97] backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Main links */}
            <nav className="flex flex-col items-center gap-5 md:gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 + i * 0.07,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white text-[clamp(30px,6vw,52px)] font-black no-underline hover:text-[#D4A03C] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.05 + NAV_LINKS.length * 0.07,
                  ease: EASE,
                }}
                className="mt-6"
              >
                <Link
                  href="/contatti"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block no-underline bg-[#D4A03C] text-[#0F1F33] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#E8C06A] transition-colors duration-300 shadow-lg shadow-[#D4A03C]/25"
                >
                  Parliamone
                </Link>
              </motion.div>
            </nav>

            {/* Legal links — bottom */}
            <motion.div
              className="absolute bottom-10 flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/50 text-xs no-underline hover:text-[#D4A03C] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
