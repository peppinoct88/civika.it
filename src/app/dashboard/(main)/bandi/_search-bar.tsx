"use client";

import { useState } from "react";
import { Search, Sparkles, Brain, Filter } from "lucide-react";

const SUGGESTIONS = [
  "PNRR comuni siciliani",
  "fondi europei cultura",
  "digitalizzazione PA",
];

const CATEGORIES = [
  { label: "Tutti", active: true },
  { label: "PNRR", active: false },
  { label: "Europei", active: false },
  { label: "Nazionali", active: false },
  { label: "Regionali", active: false },
];

export function BandiSearchBar() {
  const [query, setQuery] = useState("");

  // TODO (post ADR-026): wirea la search semantica via POST /search dedicato.
  // Per ora la barra è solo UI: il match base è già visualizzato via /match.

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-[#D4A03C]/20 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-6">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A03C]/5 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#1B3A5C]/20 blur-3xl" />

        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-[#D4A03C]" />
            <span className="text-xs font-medium text-[#D4A03C]">
              Ricerca Semantica BGE-M3 + Sonnet 4.6
            </span>
          </div>
          <div className="relative">
            <Sparkles className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D4A03C]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Descrivi cosa cerchi... es. "bandi per riqualificazione piazze in comuni sotto 15.000 abitanti"'
              className="h-14 w-full rounded-xl border border-[#D4A03C]/20 bg-[#070E18]/60 pl-12 pr-32 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-2 focus:ring-[#D4A03C]/10 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#D4A03C] to-[#E8C06A] px-5 py-2.5 text-sm font-semibold text-[#0A1628] transition-all hover:shadow-lg hover:shadow-[#D4A03C]/20"
            >
              <Search className="h-4 w-4" />
              Cerca
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#4A6A8A]">Suggerimenti:</span>
            {SUGGESTIONS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setQuery(s)}
                className="rounded-lg border border-[#1B3A5C]/30 bg-[#1B3A5C]/10 px-2.5 py-1 text-xs text-[#8AACCC] hover:border-[#D4A03C]/30 hover:text-[#D4A03C] transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-[#4A6A8A]" />
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat.label}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              cat.active
                ? "bg-[#D4A03C]/15 text-[#E8C06A] border border-[#D4A03C]/20"
                : "text-[#6B8AAD] border border-[#1B3A5C]/20 hover:border-[#1B3A5C]/40 hover:text-[#A0BED8]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </>
  );
}
