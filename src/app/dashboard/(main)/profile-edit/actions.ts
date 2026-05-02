/**
 * Server Action `updateNeedsAction` — Strato 9 A4.1 wired al frontend.
 *
 * Pattern (CLAUDE.md sez. 5 + ADR-024):
 * - Server Action invocata dal form `_form.tsx` con FormData.
 * - Valida lato server che `needs` non sia blank (la FastAPI restituisce
 *   422 se lo è, ma rifiutare prima evita un round-trip).
 * - Inoltra a `POST /clienti/{id}/profile` via il client tipato.
 * - Discrimina errori HTTP (404/422/401/5xx) per dare hint utili in UI.
 *
 * Il re-embedding NON avviene qui: lo fa il runner batch
 * `embed_pending_clienti`. La UI rassicura l'utente che il prossimo
 * run aggiornerà l'embedding (mediamente entro 1-2 minuti in dev).
 */

"use server";

import { revalidatePath } from "next/cache";

import { ApiClientError, updateClienteNeeds } from "@/lib/api/client";

export interface UpdateNeedsState {
  status: "idle" | "success" | "error";
  message: string;
  hint?: string;
  needs?: string;
}

export const initialState: UpdateNeedsState = {
  status: "idle",
  message: "",
};

const MIN_NEEDS_LENGTH = 20;
const MAX_NEEDS_LENGTH = 4000;

export async function updateNeedsAction(
  clienteId: string,
  _prev: UpdateNeedsState,
  formData: FormData,
): Promise<UpdateNeedsState> {
  if (!clienteId) {
    return {
      status: "error",
      message: "Nessun cliente attivo",
      hint: "Seleziona un cliente dal picker in topbar (post ADR-025) o contatta il super-admin per essere mappato in `user_clienti`.",
    };
  }

  const raw = formData.get("needs");
  const needs = typeof raw === "string" ? raw.trim() : "";

  if (needs.length === 0) {
    return {
      status: "error",
      message: "Il campo `needs` non può essere vuoto",
      hint: "Descrivi in linguaggio naturale cosa il cliente sta cercando.",
      needs: typeof raw === "string" ? raw : "",
    };
  }
  if (needs.length < MIN_NEEDS_LENGTH) {
    return {
      status: "error",
      message: `Servono almeno ${MIN_NEEDS_LENGTH} caratteri (attuali: ${needs.length})`,
      hint: "Una frase troppo breve produce embedding poco discriminanti.",
      needs,
    };
  }
  if (needs.length > MAX_NEEDS_LENGTH) {
    return {
      status: "error",
      message: `Massimo ${MAX_NEEDS_LENGTH} caratteri (attuali: ${needs.length})`,
      hint: "Sintetizza il profilo: l'embedding BGE-M3 lavora meglio con prompt focalizzati.",
      needs,
    };
  }

  try {
    const updated = await updateClienteNeeds(clienteId, { needs });
    revalidatePath("/dashboard/profile-edit");
    revalidatePath("/dashboard/bandi");
    return {
      status: "success",
      message: "Profilo aggiornato. Il re-embedding partirà al prossimo run di `embed_pending_clienti`.",
      needs: updated.needs ?? "",
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
        needs,
      };
    }
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Errore sconosciuto",
      hint: "Verifica che la FastAPI sia in esecuzione: cd apps/api && uv run uvicorn civika_api.main:app --reload",
      needs,
    };
  }
}

function hintForStatus(status: number): string {
  switch (status) {
    case 404:
      return "Il cliente non esiste lato API — possibile disallineamento tra `user_clienti` e `clienti`. Verifica con il super-admin.";
    case 422:
      return "Il body è stato rifiutato dalla validazione FastAPI: verifica che `needs` non sia stringa blank.";
    case 401:
    case 403:
      return "JWT mancante o non valido — fai login dalla pagina /dashboard/login";
    default:
      return "Verifica i log della FastAPI in apps/api";
  }
}
