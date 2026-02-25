"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";
import { trackLead } from "@/lib/meta-events";

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

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: "",
    comune: "",
    ruolo: "",
    email: "",
    telefono: "",
    servizio: "",
    messaggio: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Track lead event via Meta Pixel + Conversions API
    trackLead({
      email: formData.email,
      phone: formData.telefono,
      firstName: formData.nome.split(" ")[0],
      lastName: formData.nome.split(" ").slice(1).join(" "),
    });
    // In production, this would send to an API
    setSubmitted(true);
  };

  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-16 px-8">
        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Contatti
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Parliamo del vostro Comune." delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[500px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Il primo passo è una conversazione. Nessun impegno, nessun contratto.
            Vi rispondiamo entro 24 ore.
          </motion.p>
        </div>
      </header>

      {/* ══ FORM + INFO ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div className="lg:col-span-3" {...fadeUp(0.1)}>
              {submitted ? (
                <motion.div
                  className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="text-3xl sm:text-5xl mb-4">✅</div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F1F33] mb-3">
                    Messaggio inviato!
                  </h3>
                  <p className="text-gray-500 text-base sm:text-lg">
                    Vi ricontatteremo entro 24 ore. Grazie per l&apos;interesse.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm"
                >
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F1F33] mb-5 sm:mb-8">
                    Richiedi un incontro gratuito
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 mb-3 sm:mb-5">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-semibold text-[#0F1F33] mb-2">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F5F0] text-[#0F1F33] text-base focus:border-[#D4A03C] focus:ring-1 focus:ring-[#D4A03C]/30 outline-none transition-all"
                        placeholder="Mario Rossi"
                      />
                    </div>
                    <div>
                      <label htmlFor="comune" className="block text-sm font-semibold text-[#0F1F33] mb-2">
                        Comune *
                      </label>
                      <input
                        type="text"
                        id="comune"
                        name="comune"
                        required
                        value={formData.comune}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F5F0] text-[#0F1F33] text-base focus:border-[#D4A03C] focus:ring-1 focus:ring-[#D4A03C]/30 outline-none transition-all"
                        placeholder="Comune di..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 mb-3 sm:mb-5">
                    <div>
                      <label htmlFor="ruolo" className="block text-sm font-semibold text-[#0F1F33] mb-2">
                        Ruolo
                      </label>
                      <input
                        type="text"
                        id="ruolo"
                        name="ruolo"
                        value={formData.ruolo}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F5F0] text-[#0F1F33] text-base focus:border-[#D4A03C] focus:ring-1 focus:ring-[#D4A03C]/30 outline-none transition-all"
                        placeholder="Sindaco, Assessore, Segretario..."
                      />
                    </div>
                    <div>
                      <label htmlFor="servizio" className="block text-sm font-semibold text-[#0F1F33] mb-2">
                        Servizio di interesse
                      </label>
                      <select
                        id="servizio"
                        name="servizio"
                        value={formData.servizio}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F5F0] text-[#0F1F33] text-base focus:border-[#D4A03C] focus:ring-1 focus:ring-[#D4A03C]/30 outline-none transition-all"
                      >
                        <option value="">Seleziona...</option>
                        <option value="comunicazione">Comunicazione integrata</option>
                        <option value="eventi">Eventi istituzionali</option>
                        <option value="sito">Sito web istituzionale</option>
                        <option value="social">Social media</option>
                        <option value="bandi">Bandi e rendicontazione</option>
                        <option value="tutto">Pacchetto completo</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 mb-3 sm:mb-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#0F1F33] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F5F0] text-[#0F1F33] text-base focus:border-[#D4A03C] focus:ring-1 focus:ring-[#D4A03C]/30 outline-none transition-all"
                        placeholder="email@comune.it"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-semibold text-[#0F1F33] mb-2">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F5F0] text-[#0F1F33] text-base focus:border-[#D4A03C] focus:ring-1 focus:ring-[#D4A03C]/30 outline-none transition-all"
                        placeholder="+39..."
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="messaggio" className="block text-sm font-semibold text-[#0F1F33] mb-2">
                      Messaggio
                    </label>
                    <textarea
                      id="messaggio"
                      name="messaggio"
                      rows={4}
                      value={formData.messaggio}
                      onChange={handleChange}
                      className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F5F0] text-[#0F1F33] text-base focus:border-[#D4A03C] focus:ring-1 focus:ring-[#D4A03C]/30 outline-none transition-all resize-none"
                      placeholder="Raccontateci le vostre esigenze..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[#0F1F33] py-4 rounded-xl font-bold text-base shadow-lg shadow-[#D4A03C]/20 hover:shadow-xl hover:shadow-[#D4A03C]/30 transition-all duration-300 cursor-pointer"
                  >
                    Invia richiesta
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    Vi rispondiamo entro 24 ore. Il primo incontro è sempre gratuito.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Info laterali */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div {...fadeUp(0.2)}>
                <h3 className="text-xl font-black text-[#0F1F33] mb-6">
                  Informazioni di contatto
                </h3>
              </motion.div>

              {[
                {
                  icon: "📧",
                  title: "Email",
                  value: "info@civika.it",
                  href: "mailto:info@civika.it",
                },
                {
                  icon: "📞",
                  title: "Telefono",
                  value: "+39 000 000 0000",
                  href: "tel:+390000000000",
                },
                {
                  icon: "📍",
                  title: "Sede",
                  value: "Sicilia — Ci muoviamo noi",
                  href: null,
                },
                {
                  icon: "⏰",
                  title: "Orari",
                  value: "Lun-Ven 9:00-18:00",
                  href: null,
                },
              ].map((info, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-gray-200 flex gap-4 items-start group hover:border-[#D4A03C]/30 hover:shadow-md transition-all duration-500"
                  {...scaleIn(0.3 + 0.1 * i)}
                >
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <div className="text-[13px] text-gray-400 font-medium mb-0.5">
                      {info.title}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-[15px] font-semibold text-[#0F1F33] no-underline hover:text-[#D4A03C] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-[15px] font-semibold text-[#0F1F33]">
                        {info.value}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* FAQ rapido */}
              <motion.div
                className="bg-gradient-to-br from-[#1B3A5C] to-[#2A5580] rounded-2xl p-5 sm:p-7 mt-8"
                {...fadeUp(0.6)}
              >
                <h4 className="text-[15px] font-bold text-[#E8C06A] mb-4">
                  Domande frequenti
                </h4>
                {[
                  {
                    q: "Il primo incontro è davvero gratuito?",
                    a: "Sì, sempre. Ci sediamo con voi, ascoltiamo, e vi proponiamo un piano. Zero costi, zero impegni.",
                  },
                  {
                    q: "Quanto costa il servizio?",
                    a: "Dipende dalle esigenze. Prepariamo sempre una proposta su misura con budget trasparente.",
                  },
                  {
                    q: "Lavorate anche fuori dalla Sicilia?",
                    a: "Il nostro focus è la Sicilia, ma valutiamo progetti anche nel resto d'Italia.",
                  },
                ].map((faq, i) => (
                  <div key={i} className={i < 2 ? "mb-4 pb-4 border-b border-white/10" : ""}>
                    <div className="text-sm font-semibold text-white mb-1">{faq.q}</div>
                    <div className="text-xs text-white/70 leading-relaxed">{faq.a}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
