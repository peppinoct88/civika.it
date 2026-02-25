"use client";

import { Users, Plus, Search, MoreHorizontal, Shield } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gestione Utenti</h1>
          <p className="mt-1 text-sm text-[#6B8AAD]">
            Gestisci gli utenti e i loro ruoli sulla piattaforma
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A03C] to-[#E8C06A] px-4 py-2.5 text-sm font-semibold text-[#0A1628] transition-all hover:shadow-lg hover:shadow-[#D4A03C]/20">
          <Plus className="h-4 w-4" />
          Invita Utente
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-4 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A6A8A]" />
          <input
            type="text"
            placeholder="Cerca per nome o email..."
            className="h-10 w-full rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 pl-10 pr-4 text-sm text-white placeholder-[#4A6A8A] focus:border-[#D4A03C]/40 focus:outline-none focus:ring-1 focus:ring-[#D4A03C]/20"
          />
        </div>
        <select className="h-10 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-3 text-sm text-[#8AACCC] focus:border-[#D4A03C]/40 focus:outline-none">
          <option value="">Tutti i ruoli</option>
          <option value="admin">Amministratore</option>
          <option value="editor">Editor</option>
          <option value="moderator">Moderatore</option>
          <option value="analyst">Analista</option>
        </select>
        <select className="h-10 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-3 text-sm text-[#8AACCC] focus:border-[#D4A03C]/40 focus:outline-none">
          <option value="">Tutti gli stati</option>
          <option value="active">Attivo</option>
          <option value="inactive">Disattivato</option>
        </select>
      </div>

      {/* Users table */}
      <div className="overflow-hidden rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1B3A5C]/20">
                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A6A8A]">
                  Utente
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A6A8A]">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A6A8A]">
                  Ruolo
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A6A8A]">
                  Stato
                </th>
                <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A6A8A]">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1B3A5C]/10 transition-colors hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[12px] font-bold text-[#0A1628]">
                      GS
                    </div>
                    <span className="text-sm font-medium text-white">
                      Giuseppe Spalletta
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#6B8AAD]">
                  gi.spalletta1988@gmail.com
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#D4A03C]/10 px-2.5 py-1 text-xs font-medium text-[#E8C06A]">
                    <Shield className="h-3 w-3" />
                    Super Admin
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Attivo
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="flex ml-auto h-8 w-8 items-center justify-center rounded-lg text-[#4A6A8A] hover:bg-white/[0.04] hover:text-white transition-all">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
