"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { blogPosts, BLOG_CATEGORIES } from "@/data/blog-posts";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.8, ease: EASE, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85, y: 30 } as const,
  whileInView: { opacity: 1, scale: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.9, ease: EASE, delay },
});

function GrowLine({ color = "bg-accent", delay = 0 }: { color?: string; delay?: number }) {
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

function TextReveal({ text, className = "", delay = 0, stagger = 0.04 }: { text: string; className?: string; delay?: number; stagger?: number }) {
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
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Comunicazione PA": "bg-[#1B3A5C]/10 text-[#1B3A5C]",
  "Social Media": "bg-[#D4A03C]/10 text-[#D4A03C]",
  "Eventi": "bg-emerald-100 text-emerald-700",
  "Bandi e Fondi": "bg-violet-100 text-violet-700",
  "Normativa": "bg-rose-100 text-rose-700",
  "Digitalizzazione": "bg-sky-100 text-sky-700",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tutti");

  const filtered = activeCategory === "Tutti"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-16 px-8">
        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Blog
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Risorse per la comunicazione pubblica." delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[520px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Guide, approfondimenti e novità per i Comuni che vogliono comunicare meglio.
          </motion.p>
        </div>
      </header>

      {/* ══ CATEGORIES + ARTICLES ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Category Filter */}
          <motion.div className="flex flex-wrap gap-3 justify-center mb-8 sm:mb-14" {...fadeUp(0.1)}>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-[#0F1F33] text-white border-[#0F1F33] shadow-lg"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#D4A03C]/40 hover:text-[#0F1F33]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                {...scaleIn(0.08 * i)}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden no-underline hover:border-[#D4A03C]/30 hover:shadow-xl transition-all duration-500"
                >
                  {/* Category color bar */}
                  <div className="h-1.5 bg-gradient-to-r from-[#D4A03C] to-[#1B3A5C]" />

                  <div className="p-5 sm:p-7">
                    {/* Category + Read time */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-600"}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.readTime} min di lettura
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] leading-snug mb-3 group-hover:text-[#D4A03C] transition-colors duration-300">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Date + Arrow */}
                    <div className="flex items-center justify-between">
                      <time dateTime={post.date} className="text-xs text-gray-400">
                        {formatDate(post.date)}
                      </time>
                      <span className="text-[#D4A03C] text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                        Leggi &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.div className="text-center py-12 sm:py-20" {...fadeUp(0)}>
              <p className="text-gray-400 text-lg">Nessun articolo in questa categoria.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══ CTA Newsletter ══ */}
      <section className="bg-gradient-to-br from-[#0F1F33] to-[#1B3A5C] py-16 sm:py-24 px-4 sm:px-8 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(20px,3.5vw,40px)] font-black text-white leading-tight mb-4">
            <TextReveal text="Vuoi restare aggiornato?" />
          </h2>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p className="text-white/70 mt-6 mb-10 text-lg font-light" {...fadeUp(0.6)}>
            Contattaci per ricevere i nostri approfondimenti sulla comunicazione istituzionale.
          </motion.p>
          <motion.div {...fadeUp(0.8)}>
            <Link
              href="/contatti"
              className="inline-block no-underline bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[#0F1F33] px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-[#D4A03C]/30 hover:shadow-2xl hover:shadow-[#D4A03C]/40 transition-shadow duration-500"
            >
              Contattaci
            </Link>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
