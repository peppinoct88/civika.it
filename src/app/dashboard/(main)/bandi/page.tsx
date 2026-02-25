"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  Filter,
  ArrowUpRight,
  Clock,
  Euro,
  Building2,
  Calendar,
  Target,
  Brain,
  Zap,
  Globe,
  BookOpen,
  TrendingUp,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   CIVIKA — Scouting Bandi (RAG-ready)
   Interfaccia per la ricerca intelligente di bandi
   europei, nazionali e regionali con AI
   ═══════════════════════════════════════════════ */

const categories = [
  { label: "Tutti", count: 0, active: true },
  { label: "PNRR", count: 0, active: false },
  { label: "Europei", count: 0, active: false },
  { label: "Nazionali", count: 0, active: false },
  { label: "Regionali", count: 0, active: false },
];

const features = [
  {
    icon: Brain,
    title: "Ricerca Semantica AI",
    description: "Trova bandi pertinenti con ricerca in linguaggio naturale. Il motore RAG comprende il contesto del tuo comune.",
    status: "Prossimamente",
  },
  {
    icon: Target,
    title: "Match Automatico",
    description: "L'AI analizza il profilo del tuo comune e suggerisce automaticamente i bandi più compatibili.",
    status: "Prossimamente",
  },
  {
    icon: Zap,
    title: "Alert in Tempo Reale",
    description: "Ricevi notifiche istantanee quando vengono pubblicati nuovi bandi rilevanti per il tuo territorio.",
    status: "Prossimamente",
  },
  {
    icon: BookOpen,
    title: "Analisi Documenti",
    description: "Upload dei documenti di bando per estrazione automatica di requisiti, scadenze e importi.",
    status: "Prossimamente",
  },
];

const sampleBandi = [
  {
    title: "PNRR M5C2 — Rigenerazione Urbana",
    ente: "Ministero dell'Interno",
    scadenza: "Da definire",
    importo: "€ 50.000 - € 5.000.000",
    categoria: "PNRR",
    match: 92,
    tags: ["Rigenerazione", "Urbanistica", "Comuni < 15.000 ab."],
  },
  {
    title: "Bando Cultura e Turismo Sostenibile",
    ente: "Regione Siciliana",
    scadenza: "Da definire",
    importo: "€ 20.000 - € 200.000",
    categoria: "Regionali",
    match: 87,
    tags: ["Cultura", "Turismo", "Sostenibilità"],
  },
  {
    title: "Horizon Europe — Smart Communities",
    ente: "Commissione Europea",
    scadenza: "Da definire",
    importo: "€ 500.000 - € 3.000.000",
    categoria: "Europei",
    match: 74,
    tags: ["Smart City", "Innovazione", "Digitale"],
  },
];

export default function BandiPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* ── Header con AI badge ── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-white">Scouting Bandi</h1>
            <span className="flex items-center gap-1.5 rounded-lg bg-[#D4A03C]/15 px-2.5 py-1 text-xs font-semibold text-[#D4A03C]">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by AI
            </span>
          </div>
          <p className="mt-1 text-sm text-[#6B8AAD]">
            Scopri bandi europei, nazionali e regionali con ricerca semantica intelligente
          </p>
        </div>
      </div>

      {/* ── AI Search Bar (hero) ── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#D4A03C]/20 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-6">
        {/* Background glow */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A03C]/5 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#1B3A5C]/20 blur-3xl" />

        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-[#D4A03C]" />
            <span className="text-xs font-medium text-[#D4A03C]">Ricerca Semantica RAG</span>
          </div>
          <div className="relative">
            <Sparkles className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D4A03C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Descrivi cosa cerchi... es. &quot;bandi per riqualificazione piazze in comuni sotto 15.000 abitanti&quot;"
              className="h-14 w-full rounded-xl border border-[#D4A03C]/20 bg-[#070E18]/60 pl-12 pr-32 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-2 focus:ring-[#D4A03C]/10 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#D4A03C] to-[#E8C06A] px-5 py-2.5 text-sm font-semibold text-[#0A1628] transition-all hover:shadow-lg hover:shadow-[#D4A03C]/20">
              <Search className="h-4 w-4" />
              Cerca
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#4A6A8A]">Suggerimenti:</span>
            {["PNRR comuni siciliani", "fondi europei cultura", "digitalizzazione PA"].map((s) => (
              <button
                key={s}
                onClick={() => setSearchQuery(s)}
                className="rounded-lg border border-[#1B3A5C]/30 bg-[#1B3A5C]/10 px-2.5 py-1 text-xs text-[#8AACCC] hover:border-[#D4A03C]/30 hover:text-[#D4A03C] transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-[#4A6A8A]" />
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              cat.active
                ? "bg-[#D4A03C]/15 text-[#E8C06A] border border-[#D4A03C]/20"
                : "text-[#6B8AAD] border border-[#1B3A5C]/20 hover:border-[#1B3A5C]/40 hover:text-[#A0BED8]"
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* ── Preview Bandi (demo data) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#D4A03C]" />
            Anteprima Bandi
          </h2>
          <span className="text-xs text-[#4A6A8A] flex items-center gap-1">
            <Clock className="h-3 w-3" />
            I dati verranno aggiornati con il modulo RAG
          </span>
        </div>

        {sampleBandi.map((bando) => (
          <div
            key={bando.title}
            className="group relative overflow-hidden rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#D4A03C]/20"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    bando.categoria === "PNRR"
                      ? "bg-blue-500/10 text-blue-400"
                      : bando.categoria === "Europei"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}>
                    {bando.categoria}
                  </span>
                  <span className="text-[10px] text-[#4A6A8A]">•</span>
                  <span className="text-xs text-[#6B8AAD] flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {bando.ente}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-[#E8C06A] transition-colors">
                  {bando.title}
                </h3>

                <div className="mt-3 flex items-center gap-4 text-xs text-[#6B8AAD]">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {bando.scadenza}
                  </span>
                  <span className="flex items-center gap-1">
                    <Euro className="h-3.5 w-3.5" />
                    {bando.importo}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {bando.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[#1B3A5C]/20 px-2 py-0.5 text-[10px] text-[#8AACCC]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match score */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A1628]/60 border border-[#1B3A5C]/20">
                  <TrendingUp className="absolute -top-1 -right-1 h-3.5 w-3.5 text-[#D4A03C]" />
                  <span className="text-lg font-bold text-[#D4A03C]">{bando.match}%</span>
                </div>
                <span className="text-[10px] text-[#4A6A8A]">Match</span>
              </div>
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#1B3A5C]/20 py-2.5 text-xs font-medium text-[#6B8AAD] hover:border-[#D4A03C]/30 hover:text-[#D4A03C] hover:bg-[#D4A03C]/5 transition-all">
              Dettagli Bando
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* ── AI Features Grid ── */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#D4A03C]" />
          Funzionalità AI in Arrivo
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-[#1B3A5C]/15 bg-[#0F1F33]/40 p-5 transition-all duration-300 hover:border-[#1B3A5C]/30"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3A5C]/20">
                  <feature.icon className="h-5 w-5 text-[#D4A03C]" />
                </div>
                <span className="rounded-md bg-[#D4A03C]/10 px-2 py-0.5 text-[10px] font-semibold text-[#D4A03C]">
                  {feature.status}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
              <p className="mt-1.5 text-xs text-[#6B8AAD] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
