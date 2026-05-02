/**
 * EsitiAttesiList — lista compatta dei bandi con `data_graduatoria_attesa_il`
 * nei prossimi 30gg per il workspace cliente.
 *
 * Pannello laterale del workspace: non è kanban, è una lista cronologica
 * ordinata per data ASC. L'operatore lo guarda quando vuole sapere "cosa
 * sapremo nei prossimi giorni" — esiti attesi su candidature già fatte
 * o su bandi in valutazione con scadenza vicina.
 */

import { Award } from "lucide-react";

import { formatScadenza } from "@/lib/api/formatters";
import type { BandoConsolidatoRead } from "@/lib/api/types";

interface Props {
  esiti: BandoConsolidatoRead[];
  clienteId: string;
}

export function EsitiAttesiList({ esiti, clienteId }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-sky-500/20 bg-[#0F1F33]/60 backdrop-blur-sm">
      <header className="flex items-center justify-between border-b border-sky-500/20 bg-sky-500/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-sky-300" />
          <div>
            <h3 className="text-sm font-semibold text-sky-300">Esiti attesi</h3>
            <p className="text-[10px] text-[#6B8AAD]">
              Graduatorie previste nei prossimi 30 giorni
            </p>
          </div>
        </div>
        <span className="flex h-6 min-w-[28px] items-center justify-center rounded-full bg-sky-500/10 px-2 text-xs font-bold text-sky-300">
          {esiti.length}
        </span>
      </header>
      <div className="divide-y divide-[#1B3A5C]/20">
        {esiti.length === 0 ? (
          <p className="px-4 py-8 text-center text-xs text-[#4A6A8A]">
            Nessuna graduatoria attesa nei prossimi 30 giorni
          </p>
        ) : (
          esiti.map((bando) => (
            <a
              key={bando.id}
              href={`/dashboard/bandi/${bando.id}?cliente=${clienteId}`}
              className="block px-4 py-3 transition-colors hover:bg-[#1B3A5C]/15"
            >
              <p className="text-xs font-semibold text-white">{bando.titolo}</p>
              <div className="mt-1 flex items-center justify-between text-[10px] text-[#6B8AAD]">
                <span className="truncate">{bando.ente_emittente}</span>
                {bando.data_graduatoria_attesa_il && (
                  <span className="ml-2 shrink-0 font-medium text-sky-300">
                    {formatScadenza(bando.data_graduatoria_attesa_il)}
                  </span>
                )}
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  );
}
