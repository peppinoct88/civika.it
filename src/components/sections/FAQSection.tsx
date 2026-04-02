"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";

/* ── Data ── */

const faqs = [
  {
    question: "La mia azienda è troppo piccola per accedere ai bandi?",
    answer:
      "No. Esistono bandi specifici per micro-imprese, PMI e startup. Il problema non è la dimensione — è non sapere quali opportunità esistono per te. La Diagnosi gratuita serve proprio a questo.",
  },
  {
    question: "Quanto costa il servizio di Civika?",
    answer:
      "Il costo dipende dal pacchetto (Standard, PRO o VIP) e dalla complessità del bando. Ma il punto è il ROI: in media, per ogni euro investito nella consulenza, i nostri clienti ne sbloccano 23 in fondi. La Diagnosi è gratuita e ti dà tutti i numeri prima di decidere.",
  },
  {
    question: "Cosa succede se il progetto non viene approvato?",
    answer:
      "La nostra Garanzia di Risultato prevede che rivediamo insieme la strategia e ripresentiamo il progetto a nostre spese. Il tuo investimento non va mai perso.",
  },
  {
    question: "Quanto tempo ci vuole per ottenere i fondi?",
    answer:
      "Dipende dal bando: alcuni hanno tempi di risposta di 60-90 giorni, altri 6-12 mesi. Nella Diagnosi ti diamo una timeline realistica per il tuo caso specifico.",
  },
  {
    question: "Devo occuparmi io della burocrazia?",
    answer:
      "No. Gestiamo tutto noi: dalla ricerca del bando alla presentazione, dalla gestione dell'iter alla rendicontazione finale. Tu continui a gestire la tua azienda.",
  },
  {
    question: "Come funziona la Diagnosi Sblocca-Fondi™?",
    answer:
      "È una call gratuita di 30 minuti. Analizziamo il tuo settore, la tua azienda e il territorio. Ti mostriamo quali bandi sono attivi per te, quanto valgono e qual è il percorso per ottenerli. Nessun impegno.",
  },
] as const;

/* ── Accordion Item ── */

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-5 text-left",
          "text-base font-medium transition-colors duration-200 cursor-pointer",
          isOpen ? "text-neutral-50" : "text-neutral-300 hover:text-neutral-100"
        )}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-300",
            isOpen && "rotate-180 text-accent-400"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[0.9375rem] leading-relaxed text-neutral-400">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Component ── */

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper id="faq" bg="dark">
      <Container size="md">
        <SectionHeader
          overline="Domande frequenti"
          title="Hai dubbi? È normale."
          subtitle="Ecco le risposte alle domande che ci fanno più spesso."
          dark
        />

        <FadeUp>
          <div className="mx-auto max-w-2xl">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
