"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import type { BlogPost } from "@/data/blog-posts";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.8, ease: EASE, delay },
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

/* ── Markdown-like content renderer ── */
function ArticleContent({ content }: { content: string }) {
  const blocks = content.split("\n\n");
  return (
    <div className="prose-civika">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={i} className="text-[19px] font-bold text-[#0F1F33] mt-10 mb-3">
              {trimmed.replace("### ", "")}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="text-[23px] font-black text-[#0F1F33] mt-12 mb-4">
              {trimmed.replace("## ", "")}
            </h2>
          );
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^- /, ""));
          return (
            <ul key={i} className="space-y-2 my-4 ml-1">
              {items.map((item, j) => (
                <li key={j} className="text-gray-600 leading-relaxed text-[16.5px] flex gap-2.5">
                  <span className="text-[#D4A03C] mt-1.5 shrink-0">&#9679;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-gray-600 leading-[1.85] text-[16.5px] mb-5">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogArticleClient({ post }: { post: BlogPost }) {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[45vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-16 px-8">
        <div className="max-w-[750px] mx-auto text-center relative z-10">
          <motion.div className="flex items-center justify-center gap-3 mb-6" {...fadeUp(0.1)}>
            <Link
              href="/blog"
              className="text-white/70 text-sm no-underline hover:text-[#D4A03C] transition-colors"
            >
              &larr; Blog
            </Link>
            <span className="text-white/60">|</span>
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${CATEGORY_COLORS[post.category] || "bg-white/10 text-white/60"}`}>
              {post.category}
            </span>
          </motion.div>
          <h1 className="text-[clamp(28px,4.5vw,48px)] font-black text-white leading-[1.15] mb-6">
            <TextReveal text={post.title} delay={0.15} stagger={0.03} />
          </h1>
          <motion.div {...fadeUp(0.6)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.div className="flex items-center justify-center gap-5 mt-6 text-white/70 text-sm" {...fadeUp(0.7)}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{post.readTime} min di lettura</span>
          </motion.div>
        </div>
      </header>

      {/* ══ ARTICLE BODY ══ */}
      <article className="bg-[#F7F5F0] py-20 px-8">
        <motion.div className="max-w-[720px] mx-auto" {...fadeUp(0.1)}>
          <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-200 shadow-sm">
            <ArticleContent content={post.content} />
          </div>
        </motion.div>
      </article>

      {/* ══ NAVIGATION ══ */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link
            href="/blog"
            className="text-[#0F1F33] font-semibold no-underline hover:text-[#D4A03C] transition-colors text-sm"
          >
            &larr; Torna al blog
          </Link>
          <Link
            href="/contatti"
            className="inline-block no-underline bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[#0F1F33] px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#D4A03C]/20 hover:shadow-xl hover:shadow-[#D4A03C]/30 transition-all duration-300"
          >
            Parliamo del vostro Comune
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
