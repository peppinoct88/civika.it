"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { TextReveal } from "@/components/motion";
import { Badge } from "@/components/atoms";
import { Container } from "@/components/layout/Container";
import { easeOutExpo } from "@/lib/animations";
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

/* ── Scroll indicator ── */

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
        Scorri
      </span>
      <div className="h-8 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
    </motion.div>
  );
}

/* ── Lead Capture Form ── */

function LeadForm() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    azienda: "",
    fatturato: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Collegare a Klaviyo / API
    console.log("Lead form submitted:", formData);
  };

  const inputClass =
    "w-full rounded-lg border border-white/15 bg-white/[0.07] px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Nome *"
          required
          className={inputClass}
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cognome *"
          required
          className={inputClass}
          value={formData.cognome}
          onChange={(e) =>
            setFormData({ ...formData, cognome: e.target.value })
          }
        />
      </div>

      <input
        type="email"
        placeholder="Email aziendale *"
        required
        className={inputClass}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        type="tel"
        placeholder="Telefono *"
        required
        className={inputClass}
        value={formData.telefono}
        onChange={(e) =>
          setFormData({ ...formData, telefono: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Nome azienda"
        className={inputClass}
        value={formData.azienda}
        onChange={(e) =>
          setFormData({ ...formData, azienda: e.target.value })
        }
      />

      <select
        className={`${inputClass} appearance-none`}
        value={formData.fatturato}
        onChange={(e) =>
          setFormData({ ...formData, fatturato: e.target.value })
        }
      >
        <option value="" className="bg-neutral-900">
          Fatturato annuo
        </option>
        <option value="under200k" className="bg-neutral-900">
          Meno di 200.000 €
        </option>
        <option value="200k-500k" className="bg-neutral-900">
          200.000 € – 500.000 €
        </option>
        <option value="500k-1m" className="bg-neutral-900">
          500.000 € – 1.000.000 €
        </option>
        <option value="1m-5m" className="bg-neutral-900">
          1.000.000 € – 5.000.000 €
        </option>
        <option value="over5m" className="bg-neutral-900">
          Oltre 5.000.000 €
        </option>
      </select>

      {/* Privacy */}
      <label className="flex items-start gap-2 text-[11px] text-neutral-500 leading-snug cursor-pointer pt-1">
        <input
          type="checkbox"
          required
          className="mt-0.5 accent-accent-500"
        />
        <span>
          Acconsento al trattamento dei dati personali ai sensi del GDPR.{" "}
          <a href="/privacy-policy" className="text-accent-400 underline">
            Privacy Policy
          </a>
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-500/20 hover:bg-accent-600 hover:shadow-accent-500/30 transition-all duration-200 cursor-pointer"
      >
        <Calendar className="h-4 w-4" />
        Richiedi la Diagnosi Gratuita
        <ArrowRight className="h-4 w-4" />
      </button>

      {/* Trust note */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        <ShieldCheck className="h-3.5 w-3.5 text-accent-400" />
        <span className="text-[11px] text-neutral-500">
          Gratuita. Senza impegno. I tuoi dati sono al sicuro.
        </span>
      </div>
    </form>
  );
}

/* ── Benefit bullets ── */

const benefits = [
  "Scopri a quali bandi può accedere la tua azienda (europei, nazionali, regionali)",
  "Ricevi un Dossier personalizzato con importi, scadenze e probabilità di successo",
  "Ottieni una Roadmap operativa: cosa fare, in che ordine, con che tempi",
  "Zero burocrazia per te — gestiamo tutto noi dalla A alla Z",
];

/* ── Hero Section — Sblocco Fondi™ con form + foto ── */

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-20"
    >
      {/* ── Background Image — skyline ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.2 } : {}}
        transition={{ duration: 1.5 }}
        style={{ y: bgY }}
      >
        <img
          className="h-full w-full object-cover"
          src="/hero-bg.jpg"
          alt=""
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Overlay ── */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#06111d]/90 via-[#0a1e2e]/85 to-[#0a1e2e]"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <Container size="xl" className="relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_440px] lg:gap-14 xl:gap-20">
          {/* ── Left: Copy + Benefits + Form ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="mb-6"
            >
              <Badge variant="gold">
                Il 73% dei fondi pubblici resta inutilizzato
              </Badge>
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-3xl font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl md:text-[2.75rem] lg:text-[3rem] mb-5">
              <TextReveal
                text="Vuoi sbloccare fondi pubblici per far crescere la tua PMI?"
                delay={0.3}
                stagger={0.03}
              />
            </h1>

            {/* Subtitle — il pitch completo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: easeOutExpo }}
              className="mb-6"
            >
              <p className="max-w-xl text-lg leading-relaxed text-neutral-200 sm:text-xl">
                Ogni anno milioni di euro in finanziamenti pubblici restano
                inutilizzati perché le PMI non sanno come accedervi. Civika ti
                affianca con il{" "}
                <span className="font-semibold text-gold-400">
                  Sistema Sblocca-Fondi™
                </span>{" "}
                per individuare i bandi giusti, progettare la candidatura e
                ottenere i fondi — senza che tu debba occuparti della
                burocrazia.
              </p>
            </motion.div>

            {/* Benefit bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: easeOutExpo }}
              className="mb-8"
            >
              <p className="text-base font-semibold uppercase tracking-wider text-gold-400 mb-4">
                Parlane con uno Specialista in Progettazione Bandi e scopri come:
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-400 shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed text-neutral-200">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: easeOutExpo }}
              className="max-w-md rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-sm"
            >
              <p className="text-sm font-semibold text-white mb-1">
                Diagnosi Sblocca-Fondi™ Gratuita
              </p>
              <p className="text-xs text-neutral-400 mb-4">
                Compila il form e ricevi il tuo Dossier personalizzato. Ti
                ricontattiamo entro 24h.
              </p>
              <LeadForm />
            </motion.div>
          </div>

          {/* ── Right: Foto Giuseppe — solo desktop ── */}
          <motion.div
            className="hidden lg:block relative sticky top-28"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: easeOutExpo }}
          >
            <div className="relative">
              {/* Decorative glow */}
              <div
                className="absolute -inset-8 rounded-2xl opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <img
                src="/giuseppe-scrivania.png"
                alt="Giuseppe Spalletta — Fondatore di Civika"
                className="relative rounded-xl w-full shadow-2xl shadow-black/30"
              />
              {/* Name badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-neutral-900/80 backdrop-blur-sm border border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-white">
                  Giuseppe Spalletta
                </p>
                <p className="text-xs text-gold-400">
                  Fondatore Civika
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ── Scroll Indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
