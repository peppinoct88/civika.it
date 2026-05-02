/**
 * Server Action `submitFeedbackAction` — Strato 9 A4.3 active learning loop.
 *
 * Invocata dal widget `<FeedbackButtons>` su una BandoCard quando il
 * consulente clicca pertinente / borderline / non_pertinente. Inoltra a
 * `POST /match/{match_id}/feedback` via il client tipato.
 *
 * `autore` è valorizzato lato API dal JWT del consulente — il client non
 * lo invia. `tag_motivo` viene serializzato come `{ tags: [...] }` quando
 * almeno un chip è selezionato; `commento` è opzionale e trim-normalizzato.
 */

"use server";

import { revalidatePath } from "next/cache";

import { ApiClientError, postMatchFeedback } from "@/lib/api/client";
import type { FeedbackMatchCreate, FeedbackValutazione } from "@/lib/api/types";

export interface FeedbackState {
  status: "idle" | "success" | "error";
  message: string;
  hint?: string;
  valutazione?: FeedbackValutazione;
  tagsCount?: number;
  hasCommento?: boolean;
}

export const initialFeedbackState: FeedbackState = {
  status: "idle",
  message: "",
};

const VALUTAZIONI: ReadonlySet<FeedbackValutazione> = new Set([
  "pertinente",
  "borderline",
  "non_pertinente",
]);

export const TAG_MOTIVO_CHOICES: ReadonlyArray<{
  id: string;
  label: string;
}> = [
  { id: "fuori_settore", label: "Fuori settore" },
  { id: "fuori_territorio", label: "Fuori territorio" },
  { id: "importo_inadeguato", label: "Importo inadeguato" },
  { id: "beneficiari_diversi", label: "Beneficiari diversi" },
  { id: "scadenza_stretta", label: "Scadenza stretta" },
  { id: "requisiti_complessi", label: "Requisiti complessi" },
  { id: "duplicato_logico", label: "Duplicato logico" },
  { id: "gia_visto", label: "Già visto" },
];

const VALID_TAG_IDS: ReadonlySet<string> = new Set(
  TAG_MOTIVO_CHOICES.map((t) => t.id),
);

const MAX_COMMENTO_LEN = 1000;

function isValutazione(value: unknown): value is FeedbackValutazione {
  return typeof value === "string" && VALUTAZIONI.has(value as FeedbackValutazione);
}

export interface SubmitFeedbackInput {
  matchId: string;
  valutazione: FeedbackValutazione;
  tags?: ReadonlyArray<string>;
  commento?: string | null;
}

export async function submitFeedbackAction(
  input: SubmitFeedbackInput,
): Promise<FeedbackState> {
  if (!isValutazione(input.valutazione)) {
    return {
      status: "error",
      message: "Valutazione non valida",
      hint: "Premi uno dei tre pulsanti: pertinente, borderline, non pertinente.",
    };
  }

  const tagsClean = (input.tags ?? []).filter((t) => VALID_TAG_IDS.has(t));
  const commentoRaw = (input.commento ?? "").trim();
  if (commentoRaw.length > MAX_COMMENTO_LEN) {
    return {
      status: "error",
      message: `Commento troppo lungo (max ${MAX_COMMENTO_LEN} caratteri)`,
      hint: "Sintetizza il motivo in poche righe — il dettaglio lungo va in piano_cliente_memo.",
      valutazione: input.valutazione,
    };
  }

  const payload: FeedbackMatchCreate = {
    valutazione: input.valutazione,
  };
  if (tagsClean.length > 0) {
    payload.tag_motivo = { tags: tagsClean };
  }
  if (commentoRaw.length > 0) {
    payload.commento = commentoRaw;
  }

  try {
    await postMatchFeedback(input.matchId, payload);
    revalidatePath("/dashboard/bandi");
    return {
      status: "success",
      message: "Verdetto registrato. Grazie — alimenta l'active learning.",
      valutazione: input.valutazione,
      tagsCount: tagsClean.length,
      hasCommento: commentoRaw.length > 0,
    };
  } catch (error) {
    if (error instanceof ApiClientError) {
      const detail =
        typeof error.detail === "string"
          ? error.detail
          : JSON.stringify(error.detail);
      return {
        status: "error",
        message: `API error ${error.status}: ${detail}`,
        hint: hintForStatus(error.status),
        valutazione: input.valutazione,
      };
    }
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Errore sconosciuto",
      hint: "Verifica che la FastAPI sia in esecuzione: cd apps/api && uv run uvicorn civika_api.main:app --reload",
      valutazione: input.valutazione,
    };
  }
}

function hintForStatus(status: number): string {
  switch (status) {
    case 404:
      return "Match non trovato — può essere stato rigenerato. Ricarica la pagina.";
    case 403:
      return "Non sei autorizzato per questo cliente — ADR-025 mapping users↔clienti.";
    case 401:
      return "JWT mancante o scaduto — fai login dalla pagina /dashboard/login";
    default:
      return "Verifica i log della FastAPI in apps/api";
  }
}
