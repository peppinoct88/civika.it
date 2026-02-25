"use client";

import { FileText, Plus } from "lucide-react";

const tabs = ["Tutti", "Bozze (0)", "In Revisione (0)", "Pubblicati (0)"];

export default function ContentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Contenuti</h1>
          <p className="mt-1 text-sm text-[#6B8AAD]">
            Gestisci articoli, pagine e annunci della piattaforma
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A03C] to-[#E8C06A] px-4 py-2.5 text-sm font-semibold text-[#0A1628] transition-all hover:shadow-lg hover:shadow-[#D4A03C]/20">
          <Plus className="h-4 w-4" />
          Nuovo Contenuto
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#1B3A5C]/20">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-3 text-sm font-medium transition-all ${
              i === 0
                ? "border-b-2 border-[#D4A03C] text-[#E8C06A]"
                : "text-[#4A6A8A] hover:text-[#8AACCC]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B3A5C]/20">
            <FileText className="h-8 w-8 text-[#4A6A8A]" />
          </div>
          <h3 className="text-lg font-semibold text-white">Nessun contenuto</h3>
          <p className="mt-2 max-w-sm text-sm text-[#6B8AAD]">
            Inizia creando il tuo primo articolo o pagina. I contenuti
            passeranno attraverso un workflow di revisione prima della
            pubblicazione.
          </p>
          <button className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A03C] to-[#E8C06A] px-4 py-2.5 text-sm font-semibold text-[#0A1628] transition-all hover:shadow-lg hover:shadow-[#D4A03C]/20">
            <Plus className="h-4 w-4" />
            Crea il primo contenuto
          </button>
        </div>
      </div>
    </div>
  );
}
