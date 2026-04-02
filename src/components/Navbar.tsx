"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { easeOutExpo } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Il Metodo", href: "/metodo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Risorse", href: "/risorse/mappa-fondi" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-xl shadow-neutral-950/40"
            : "bg-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between max-w-[1200px] transition-all duration-700 ease-out ${
            isScrolled ? "px-6 sm:px-8 py-3" : "px-6 sm:px-8 py-5 sm:py-6"
          }`}
          aria-label="Navigazione principale"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline relative z-10">
            <img
              src="/logo-civika-white.svg"
              alt="CIVIKA"
              width={108}
              height={36}
              className={`w-auto transition-all duration-700 ease-out ${
                isScrolled ? "h-[28px]" : "h-[36px] sm:h-[40px]"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-300 no-underline hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/diagnosi"
              className="inline-flex items-center gap-2 no-underline bg-accent-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-600 transition-colors duration-200"
            >
              Diagnosi Gratuita
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative z-10 lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer group"
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

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-neutral-950/[0.98] backdrop-blur-2xl" />

            {/* Content */}
            <div className="relative h-full flex flex-col px-8 pt-24 pb-10">
              {/* Nav links */}
              <nav
                className="flex-1 flex flex-col justify-center gap-1"
                aria-label="Menu principale"
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + i * 0.06,
                      ease: easeOutExpo,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-white/[0.06] no-underline"
                    >
                      <span className="text-white text-2xl sm:text-3xl font-semibold tracking-tight group-hover:text-accent-400 transition-colors duration-300">
                        {link.label}
                      </span>
                      <ArrowRight className="h-5 w-5 text-neutral-600 group-hover:text-accent-400 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 + NAV_LINKS.length * 0.06,
                  ease: easeOutExpo,
                }}
                className="pt-6"
              >
                <Link
                  href="/diagnosi"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 no-underline w-full bg-accent-500 text-white py-4 rounded-xl font-bold text-base hover:bg-accent-600 transition-colors duration-300 shadow-lg shadow-accent-500/20"
                >
                  Prenota la Diagnosi Gratuita
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: easeOutExpo }}
                className="pt-6 flex items-center justify-between text-xs text-neutral-600"
              >
                <span>© {new Date().getFullYear()} Civika</span>
                <div className="flex gap-4">
                  <Link
                    href="/privacy-policy"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-neutral-600 no-underline hover:text-neutral-400 transition-colors"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/cookie-policy"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-neutral-600 no-underline hover:text-neutral-400 transition-colors"
                  >
                    Cookie
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
