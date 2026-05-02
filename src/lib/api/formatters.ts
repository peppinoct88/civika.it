/**
 * Helper formatting puri (server + client safe).
 *
 * Estratti da `client.ts` perché quest'ultimo importa `next/headers`
 * per leggere il cookie JWT, il che lo rende server-only. Le funzioni
 * qui dentro non hanno side-effect e possono essere importate da
 * Client Component (kanban dnd, slide-over, ecc).
 */

import type { BandoConsolidatoRead, CoverageAuditEsito } from "./types";

export function formatCentesimiEur(centesimi: number | null): string {
  if (centesimi === null || centesimi === undefined) return "—";
  const eur = centesimi / 100;
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(eur);
}

export function formatScadenza(iso: string | null): string {
  if (!iso) return "Da definire";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function livelloLabel(
  livello: BandoConsolidatoRead["livello"],
): string {
  switch (livello) {
    case "regionale":
      return "Regionale";
    case "nazionale":
      return "Nazionale";
    case "europeo":
      return "Europeo";
    default:
      return "—";
  }
}

export function coverageEsitoLabel(esito: CoverageAuditEsito): string {
  switch (esito) {
    case "shortfall":
      return "Shortfall";
    case "fonte_silente":
      return "Fonte silente";
    case "overshoot":
      return "Overshoot";
    case "ok":
      return "OK";
    default:
      return esito;
  }
}
