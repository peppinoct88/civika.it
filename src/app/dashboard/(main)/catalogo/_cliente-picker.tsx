/**
 * `<ClientePicker>` — bottone "Match per cliente X" (A.3).
 *
 * Per ogni riga del catalogo globale, il super_admin sceglie quale cliente
 * vuole vedere matchato contro questo bando. La selezione naviga a
 * `/dashboard/bandi/{bandoId}?cliente={clienteId}`, dove la pagina dettaglio
 * carica `GET /cockpit/bando/{cliente}/{bando}` (score Sonnet, pipeline,
 * eventi, documenti).
 *
 * Edge cases:
 *  - Se l'utente non ha clienti in `user_clienti`, mostra disabled state
 *    con tooltip: "Nessun cliente associato".
 *  - Se ha 1 cliente, il dropdown è tecnicamente uno-shot ma resta uniforme
 *    con la riga (l'azione è "vai", non "scegli").
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Target } from "lucide-react";

import type { ClienteRead } from "@/lib/api/types";

export function ClientePicker({
  bandoId,
  clienti,
}: {
  bandoId: string;
  clienti: ClienteRead[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (clienti.length === 0) {
    return (
      <span
        title="Nessun cliente associato all'utente"
        className="inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 rounded-lg border border-[#1B3A5C]/30 px-3 py-1.5 text-xs text-[#4A6A8A]"
      >
        <Target className="h-3 w-3" />
        Nessun cliente
      </span>
    );
  }

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4A03C]/30 bg-[#D4A03C]/5 px-3 py-1.5 text-xs font-medium text-[#E8C06A] transition-colors hover:bg-[#D4A03C]/15"
      >
        <Target className="h-3 w-3" />
        Match per cliente
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-10 max-h-72 w-64 overflow-y-auto rounded-xl border border-[#1B3A5C]/40 bg-[#0F1F33] p-1.5 shadow-2xl shadow-black/40">
          {clienti.map((cliente) => (
            <button
              key={cliente.id}
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(
                  `/dashboard/bandi/${bandoId}?cliente=${cliente.id}`,
                );
              }}
              className="flex w-full flex-col items-start rounded-lg px-3 py-2 text-left text-xs text-[#A0BED8] transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              <span className="font-medium">{cliente.nome}</span>
              <span className="text-[10px] uppercase tracking-wide text-[#6B8AAD]">
                {cliente.tipo_ente}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
