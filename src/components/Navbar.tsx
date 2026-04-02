"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { easeOutExpo } from "@/lib/animations";

const NAV_LINKS = [
  { label: "Il Metodo", href: "/metodo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Risorse", href: "/risorse/mappa-fondi" },
  { label: "Blog", href: "/blog" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Pill background */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none transition-all duration-1000 ease-out ${
            isScrolled
              ? "top-3 h-[56px] w-[calc(100%-24px)] max-w-[480px] opacity-100 shadow-2xl shadow-neutral-950/60"
              : "top-8 h-[64px] w-[92%] max-w-[1200px] opacity-0"
          }`}
          style={{
            background: isScrolled
              ? "linear-gradient(135deg, #06111d 0%, #0a1e2e 50%, #06111d 100%)"
              : "transparent",
            borderWidth: isScrolled ? "1px" : "0px",
            borderColor: "rgba(16, 185, 129, 0.15)",
            borderStyle: "solid",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
          }}
        />

        <nav
          className={`relative z-10 mx-auto flex items-center justify-between transition-all duration-1000 ease-out ${
            isScrolled
              ? "mt-3 max-w-[calc(100%-24px)] sm:max-w-[440px] md:max-w-[440px] px-5 sm:px-7 py-2.5"
              : "mt-8 max-w-[1200px] px-8 py-3"
          }`}
          aria-label="Navigazione principale"
        >
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

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer group"
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                isMenuOpen ? "w-6 rotate-45 translate-y-[8px]" : "w-6 group-hover:w-5"
              }`}
            />
            <span
              className={`block h-[2px] w-4 bg-white rounded-full transition-all duration-500 ease-out ${
                isMenuOpen ? "opacity-0 scale-x-0" : "group-hover:w-6"
              }`}
            />
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                isMenuOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-6 group-hover:w-4"
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-neutral-900/[0.97] backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <nav className="flex flex-col items-center gap-5 md:gap-7" aria-label="Menu principale">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.05 + i * 0.07, ease: easeOutExpo }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white text-[clamp(24px,5vw,52px)] font-black no-underline hover:text-accent-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.05 + NAV_LINKS.length * 0.07, ease: easeOutExpo }}
                className="mt-4 sm:mt-6"
              >
                <Link
                  href="/diagnosi"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block no-underline bg-accent-500 text-white px-10 py-4 rounded-[10px] font-bold text-lg hover:bg-accent-600 transition-colors duration-300 shadow-lg shadow-accent-500/25"
                >
                  Diagnosi Gratuita
                </Link>
              </motion.div>
            </nav>

            <motion.div
              className="absolute bottom-6 sm:bottom-10 flex flex-col sm:flex-row gap-3 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: easeOutExpo }}
            >
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neutral-500 text-xs no-underline hover:text-accent-400 transition-colors duration-300"
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
