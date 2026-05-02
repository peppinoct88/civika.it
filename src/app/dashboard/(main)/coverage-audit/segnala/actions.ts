/**
 * Server Action `createSegnalazioneAction` — Strato 10 ZERO MISS Mecc. 4.
 *
 * Pattern (CLAUDE.md sez. 5 + ADR-011 + ADR-024):
 * - Form HTML invocato dal client component `_form.tsx` con FormData.
 * - Validation lato server: `titolo` obbligatorio (3-500 char); altri
 *   campi opzionali; `url_fonte` se presente deve iniziare con http/https;
 *   `scadenza_dichiarata` se presente deve essere ISO date valida.
 * - Inoltra a `POST /coverage-audit/segnalazioni` via il client tipato.
 * - Discrimina errori HTTP (401/403/422/5xx) per dare hint utili in UI.
 *
 * Su successo: rivalida `/dashboard/coverage-alerts` (la nuova segnalazione
 * deve apparire come ManualReportCard al prossimo render del feed).
 */

"use server";

import { revalidatePath } from "next/cache";

import { ApiClientError, createCoverageSegnalazione } from "@/lib/api/client";
import type { CoverageAuditSegnalazioneCreate } from "@/lib/api/types";

export interface CreateSegnalazioneState {
  status: "idle" | "success" | "error";
  message: string;
  hint?: string;
  values?: Partial<CoverageAuditSegnalazioneCreate>;
}

export const initialState: CreateSegnalazioneState = {
  status: "idle",
  message: "",
};

const MIN_TITOLO_LENGTH = 3;
const MAX_TITOLO_LENGTH = 500;
const MAX_URL_LENGTH = 2000;
const MAX_ENTE_LENGTH = 300;
const MAX_DESCRIZIONE_LENGTH = 4000;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function readField(formData: FormData, name: string): string {
  const raw = formData.get(name);
  return typeof raw === "string" ? raw.trim() : "";
}

export async function createSegnalazioneAction(
  _prev: CreateSegnalazioneState,
  formData: FormData,
): Promise<CreateSegnalazioneState> {
  const titolo = readField(formData, "titolo");
  const urlFonte = readField(formData, "url_fonte");
  const ente = readField(formData, "ente_pubblicatore");
  const scadenza = readField(formData, "scadenza_dichiarata");
  const descrizione = readField(formData, "descrizione");

  const echo: Partial<CoverageAuditSegnalazioneCreate> = {
    titolo,
    url_fonte: urlFonte || null,
    ente_pubblicatore: ente || null,
    scadenza_dichiarata: scadenza || null,
    descrizione: descrizione || null,
  };

  if (titolo.length < MIN_TITOLO_LENGTH) {
    return {
      status: "error",
      message: `Il titolo deve avere almeno ${MIN_TITOLO_LENGTH} caratteri`,
      hint: "Inserisci il titolo del bando come compare nella fonte originale.",
      values: echo,
    };
  }
  if (titolo.length > MAX_TITOLO_LENGTH) {
    return {
      status: "error",
      message: `Massimo ${MAX_TITOLO_LENGTH} caratteri per il titolo`,
      values: echo,
    };
  }
  if (urlFonte && urlFonte.length > MAX_URL_LENGTH) {
    return {
      status: "error",
      message: `URL troppo lunga (max ${MAX_URL_LENGTH} caratteri)`,
      values: echo,
    };
  }
  if (urlFonte && !/^https?:\/\//i.test(urlFonte)) {
    return {
      status: "error",
      message: "URL non valida: deve iniziare con http:// o https://",
      hint: "Copia l'URL completa dalla barra del browser.",
      values: echo,
    };
  }
  if (ente && ente.length > MAX_ENTE_LENGTH) {
    return {
      status: "error",
      message: `Ente troppo lungo (max ${MAX_ENTE_LENGTH} caratteri)`,
      values: echo,
    };
  }
  if (scadenza && !ISO_DATE_RE.test(scadenza)) {
    return {
      status: "error",
      message: "Scadenza non valida: usa il selettore di data",
      values: echo,
    };
  }
  if (descrizione && descrizione.length > MAX_DESCRIZIONE_LENGTH) {
    return {
      status: "error",
      message: `Descrizione troppo lunga (max ${MAX_DESCRIZIONE_LENGTH} caratteri)`,
      values: echo,
    };
  }

  const payload: CoverageAuditSegnalazioneCreate = {
    titolo,
    url_fonte: urlFonte || null,
    ente_pubblicatore: ente || null,
    scadenza_dichiarata: scadenza || null,
    descrizione: descrizione || null,
  };

  try {
    await createCoverageSegnalazione(payload);
    revalidatePath("/dashboard/coverage-alerts");
    return {
      status: "success",
      message:
        "Segnalazione registrata. Apparirà nella dashboard alerts come 'Segnalazione manuale'.",
      values: undefined,
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
        values: echo,
      };
    }
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Errore sconosciuto",
      hint: "Verifica che la FastAPI sia in esecuzione: cd apps/api && uv run uvicorn civika_api.main:app --reload",
      values: echo,
    };
  }
}

function hintForStatus(status: number): string {
  switch (status) {
    case 401:
    case 403:
      return "JWT mancante o non valido — fai login dalla pagina /dashboard/login";
    case 422:
      return "Il body è stato rifiutato dalla validazione FastAPI: ricontrolla titolo / URL / scadenza.";
    default:
      return "Verifica i log della FastAPI in apps/api";
  }
}
