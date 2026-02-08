"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function NotFound() {
  return (
    <PageShell>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] px-8">
        <div className="max-w-[500px] mx-auto text-center">
          <motion.div className="text-8xl font-black text-[#D4A03C] mb-6" {...fadeUp(0)}>
            404
          </motion.div>
          <motion.h1 className="text-3xl font-black text-white mb-4" {...fadeUp(0.1)}>
            Pagina non trovata
          </motion.h1>
          <motion.p className="text-white/50 text-lg mb-10" {...fadeUp(0.2)}>
            La pagina che cercate non esiste o è stata spostata.
          </motion.p>
          <motion.div {...fadeUp(0.3)}>
            <Link
              href="/"
              className="inline-block no-underline bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-white px-10 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#D4A03C]/30 hover:shadow-2xl hover:shadow-[#D4A03C]/40 transition-shadow duration-500"
            >
              Torna alla homepage
            </Link>
          </motion.div>
        </div>
      </main>
    </PageShell>
  );
}
