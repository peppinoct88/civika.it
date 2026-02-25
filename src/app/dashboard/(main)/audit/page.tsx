"use client";

import { ScrollText, Clock, Search } from "lucide-react";

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Registro Attività</h1>
        <p className="mt-1 text-sm text-[#6B8AAD]">
          Traccia tutte le azioni eseguite sulla piattaforma
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-4 backdrop-blur-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A6A8A]" />
          <input
            type="text"
            placeholder="Cerca nelle attività..."
            className="h-10 w-full rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 pl-10 pr-4 text-sm text-white placeholder-[#4A6A8A] focus:border-[#D4A03C]/40 focus:outline-none focus:ring-1 focus:ring-[#D4A03C]/20"
          />
        </div>
        <select className="h-10 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-3 text-sm text-[#8AACCC] focus:border-[#D4A03C]/40 focus:outline-none">
          <option value="">Tutti gli utenti</option>
        </select>
        <select className="h-10 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-3 text-sm text-[#8AACCC] focus:border-[#D4A03C]/40 focus:outline-none">
          <option value="">Tutte le azioni</option>
          <option value="user.login">Login</option>
          <option value="user.logout">Logout</option>
          <option value="content.create">Creazione contenuto</option>
          <option value="content.update">Modifica contenuto</option>
        </select>
        <input
          type="date"
          className="h-10 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-3 text-sm text-[#8AACCC] focus:border-[#D4A03C]/40 focus:outline-none"
        />
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B3A5C]/20">
            <ScrollText className="h-8 w-8 text-[#4A6A8A]" />
          </div>
          <h3 className="text-lg font-semibold text-white">Nessuna attività registrata</h3>
          <p className="mt-2 max-w-sm text-sm text-[#6B8AAD]">
            Le attività degli utenti verranno registrate qui automaticamente.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-[#4A6A8A]">
            <Clock className="h-3.5 w-3.5" />
            Il registro si aggiorna in tempo reale
          </div>
        </div>
      </div>
    </div>
  );
}
