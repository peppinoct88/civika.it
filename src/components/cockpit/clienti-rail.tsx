/**
 * ClientiRail — sidebar scrollabile dei clienti dell'utente.
 *
 * Client Component (use client). Riceve la lista clienti + l'id attivo +
 * un map opzionale `badges` (cliente_id → numero alert). Quando il
 * portafoglio supera `SEARCH_THRESHOLD` espone un input di ricerca client-side
 * — necessario quando un consulente segue 30+ clienti e scorrere è
 * inefficiente. Sotto soglia il rail resta compatto e silenzioso.
 *
 * Niente Server Action: il click su un cliente è un Link che naviga al
 * suo workspace. Il "cliente attivo" cookie viene aggiornato dal layout
 * a livello di routing.
 */

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Building2, Search, Sparkles, X } from "lucide-react";

import type { ClienteRead } from "@/lib/api/types";

const SEARCH_THRESHOLD = 8;

interface Props {
  clienti: ClienteRead[];
  activeClienteId: string | null;
  badges?: Record<string, number>;
}

export function ClientiRail({ clienti, activeClienteId, badges }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clienti;
    return clienti.filter(
      (c) =>
        c.nome.toLowerCase().includes(q) ||
        c.tipo_ente?.toLowerCase().includes(q),
    );
  }, [clienti, query]);

  if (clienti.length === 0) {
    return <ClientiRailEmpty />;
  }

  const showSearch = clienti.length >= SEARCH_THRESHOLD;

  return (
    <aside className="flex h-full w-full flex-col bg-[#0A1628]/40">
      <div className="border-b border-[#1B3A5C]/20 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A6A8A]">
          Portafoglio
        </p>
        <p className="mt-0.5 text-sm font-medium text-[#A0BED8]">
          {clienti.length} cliente{clienti.length === 1 ? "" : "i"}
        </p>
      </div>

      {showSearch && (
        <div className="border-b border-[#1B3A5C]/20 px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#4A6A8A]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtra clienti…"
              className="h-8 w-full rounded-lg border border-[#1B3A5C]/40 bg-[#0A1628]/60 pl-8 pr-7 text-xs text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:outline-none focus:ring-1 focus:ring-[#D4A03C]/20"
              aria-label="Filtra clienti per nome o tipo ente"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded text-[#6B8AAD] hover:text-white"
                aria-label="Cancella filtro"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <p className="px-3 py-6 text-center text-[11px] text-[#6B8AAD]">
            Nessun cliente trovato per <em>&ldquo;{query}&rdquo;</em>
          </p>
        ) : (
          filtered.map((cliente) => {
            const isActive = cliente.id === activeClienteId;
            const badge = badges?.[cliente.id] ?? 0;
            return (
              <Link
                key={cliente.id}
                href={`/dashboard/clienti/${cliente.id}`}
                className={`group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13px] transition-all duration-150 ${
                  isActive
                    ? "bg-[#D4A03C]/10 text-[#E8C06A]"
                    : "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-[#D4A03C]/20 text-[#D4A03C]"
                      : "bg-[#1B3A5C]/30 text-[#4A6A8A] group-hover:text-[#8AACCC]"
                  }`}
                >
                  <Building2 className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{cliente.nome}</p>
                  {cliente.tipo_ente && (
                    <p className="truncate text-[10px] uppercase tracking-wide text-[#4A6A8A]">
                      {cliente.tipo_ente}
                    </p>
                  )}
                </div>
                {badge > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D4A03C] px-1 text-[10px] font-bold text-[#0A1628]">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })
        )}
      </nav>
    </aside>
  );
}

function ClientiRailEmpty() {
  return (
    <aside className="flex h-full w-full flex-col items-center justify-center bg-[#0A1628]/40 p-6 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B3A5C]/30">
        <Sparkles className="h-6 w-6 text-[#D4A03C]" />
      </div>
      <p className="text-sm font-semibold text-[#A0BED8]">
        Nessun cliente associato
      </p>
      <p className="mt-1 text-xs text-[#6B8AAD]">
        Chiedi all&apos;amministratore di assegnarti almeno un cliente CIVIKA.
      </p>
    </aside>
  );
}
