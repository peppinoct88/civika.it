/**
 * Client component `<ClientePicker>` — dropdown per switch cliente attivo.
 *
 * Visibile solo se l'utente è associato a >=2 clienti. Con 1 cliente solo
 * mostra il nome senza interazione (niente switching possibile).
 *
 * Pattern:
 * - Lista + active passati come props dal Server Component padre.
 * - Switch via Server Action `setActiveClienteAction` (cookie + revalidate).
 * - `useTransition` per loading state durante l'await dell'action.
 */

"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Building2, Check, ChevronDown } from "lucide-react";

import type { ClienteRead } from "@/lib/api/types";
import { setActiveClienteAction } from "@/lib/actions/cliente";

interface ClientePickerProps {
  active: ClienteRead;
  clienti: ClienteRead[];
}

export function ClientePicker({ active, clienti }: ClientePickerProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
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

  const isMulti = clienti.length >= 2;

  if (!isMulti) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/40 px-3 py-1.5 text-[12px]">
        <Building2 className="h-3.5 w-3.5 text-[#D4A03C]" />
        <span className="font-medium text-white">{active.nome}</span>
      </div>
    );
  }

  function handleSelect(clienteId: string) {
    if (clienteId === active.id) {
      setOpen(false);
      return;
    }
    startTransition(async () => {
      await setActiveClienteAction(clienteId);
      setOpen(false);
    });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className="flex items-center gap-2 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/40 px-3 py-1.5 text-[12px] transition-all hover:border-[#D4A03C]/40 disabled:opacity-60"
      >
        <Building2 className="h-3.5 w-3.5 text-[#D4A03C]" />
        <span className="font-medium text-white">{active.nome}</span>
        <span className="text-[10px] text-[#6B8AAD]">
          {clienti.length} clienti
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-[#6B8AAD]" />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-40 w-72 overflow-hidden rounded-xl border border-[#1B3A5C]/30 bg-[#0F1F33] p-1.5 shadow-2xl shadow-black/40">
          <div className="border-b border-[#1B3A5C]/20 px-3 py-2 mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#6B8AAD]">
            Cliente attivo
          </div>
          <ul className="max-h-72 overflow-y-auto">
            {clienti.map((c) => {
              const isActive = c.id === active.id;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(c.id)}
                    disabled={isPending}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition-all disabled:opacity-50 ${
                      isActive
                        ? "bg-[#D4A03C]/10 text-[#E8C06A]"
                        : "text-[#A0BED8] hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span className="min-w-0 flex-1 truncate font-medium">
                      {c.nome}
                    </span>
                    {isActive && (
                      <Check className="h-4 w-4 flex-shrink-0 text-[#D4A03C]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
