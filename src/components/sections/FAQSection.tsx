"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";

/* ── Data — FAQ orientate a obiezioni di vendita ── */

const faqs = [
  {
    question: "Perché la Diagnosi Sblocca-Fondi™ è gratuita?",
    answer:
      "Perché è il modo migliore per dimostrarti il nostro valore. Il 73% di chi riceve il Dossier decide di affidarci il progetto. Non abbiamo bisogno di venderti nulla — basta che vedi i numeri.",
  },
  {
    question: "Sarò obbligato a comprare qualcosa dopo la Diagnosi?",
    answer:
      "Assolutamente no. Ricevi il Dossier Sblocca-Fondi™, la Mappa dei Fondi del tuo settore e la Roadmap Operativa. Se non vuoi procedere, tieni tutto e non devi nulla. Zero pressioni, zero vincoli.",
  },
  {
    question: "La mia azienda è troppo piccola per i bandi?",
    answer:
      "No. Esistono bandi specifici per micro-imprese con fatturato da 200.000€ in su. Il problema non è la dimensione — è non sapere quali opportunità esistono per te. La Diagnosi serve proprio a questo.",
  },
  {
    question: "Quanto tempo ci vuole per ottenere i fondi?",
    answer:
      "Dipende dal bando: alcuni rispondono in 60-90 giorni, altri in 6-12 mesi. Nella Diagnosi ti diamo una timeline realistica per il tuo caso specifico, così sai esattamente cosa aspettarti.",
  },
  {
    question: "E se il progetto non viene approvato?",
    answer:
      "Scatta la Garanzia «Fondi o Riproviamo»: analizziamo i feedback dell'ente, rivediamo la strategia e ripresentiamo a nostre spese. Il tuo investimento non va mai perso.",
  },
  {
    question: "Devo occuparmi io della burocrazia?",
    answer:
      "No. Gestiamo tutto noi: dalla ricerca del bando alla presentazione, dalla gestione dell'iter alla rendicontazione finale. Tu continui a fare l'imprenditore — alla burocrazia pensiamo noi.",
  },
  {
    question: "In cosa vi differenziate dai consulenti generalisti?",
    answer:
      "Civika fa solo progettazione bandi. Non facciamo 'anche i bandi' — facciamo solo quello. Ogni progetto ha un team dedicato, un project manager assegnato e report di avanzamento continui. È la differenza tra un tuttofare e uno specialista.",
  },
  {
    question: "Quanto costa il servizio se decido di procedere?",
    answer:
      "Il costo dipende dalla complessità del bando e dal pacchetto scelto. Ma il dato che conta è il ROI: in media, per ogni euro investito nella consulenza, i nostri clienti ne sbloccano 23 in fondi. La Diagnosi gratuita ti dà tutti i numeri prima di decidere qualsiasi cosa.",
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
          subtitle="Le risposte alle obiezioni più comuni — quelle che avresti anche tu."
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
