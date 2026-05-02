/**
 * Active cliente resolver (ADR-025 mapping users↔clienti).
 *
 * Pattern:
 * - L'utente è associato a N clienti via `user_clienti` (mapping risolto
 *   server-side da `GET /clienti/me`).
 * - La selezione corrente è persistita nel cookie `active_cliente_id`
 *   (httpOnly=false: il valore non è sensibile, è solo UX state).
 * - Se il cookie è assente o punta a un cliente non più associato (es.
 *   permesso revocato), si riallinea al primo cliente della lista.
 * - Se l'utente non ha clienti, il chiamante riceve `null` e mostra un
 *   empty state con CTA "richiedi accesso".
 *
 * Tutto server-side (Server Components / Server Actions): zero leak di
 * stato cliente verso il browser oltre al cookie.
 */

import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import { ApiClientError, getClientiMe } from "@/lib/api/client";
import type { ClienteRead } from "@/lib/api/types";

const COOKIE_NAME = "active_cliente_id";
const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365; // 1 anno

export interface ActiveClienteResult {
  ok: true;
  active: ClienteRead;
  clienti: ClienteRead[];
}

export interface ActiveClienteEmpty {
  ok: false;
  reason: "no_clienti";
  clienti: [];
}

export interface ActiveClienteError {
  ok: false;
  reason: "api_error";
  status: number | null;
  message: string;
}

export type ActiveClienteState =
  | ActiveClienteResult
  | ActiveClienteEmpty
  | ActiveClienteError;

/**
 * Risolve il cliente attivo + lista completa per l'utente loggato.
 *
 * Ritorna sempre uno stato discriminato: il chiamante deve gestire
 * `no_clienti` (empty state) e `api_error` (banner).
 *
 * Wrappato in `cache()` per deduplicare le chiamate a `/clienti/me`
 * all'interno della stessa request RSC (topbar + page condividono il
 * risultato senza N+1 round-trip).
 */
export const resolveActiveCliente = cache(
  async (): Promise<ActiveClienteState> => {
  let clienti: ClienteRead[];
  try {
    clienti = await getClientiMe();
  } catch (error) {
    if (error instanceof ApiClientError) {
      const detail =
        typeof error.detail === "string"
          ? error.detail
          : JSON.stringify(error.detail);
      return {
        ok: false,
        reason: "api_error",
        status: error.status,
        message: detail,
      };
    }
    return {
      ok: false,
      reason: "api_error",
      status: null,
      message: error instanceof Error ? error.message : "Errore sconosciuto",
    };
  }

  if (clienti.length === 0) {
    return { ok: false, reason: "no_clienti", clienti: [] };
  }

  const cookieStore = await cookies();
  const stored = cookieStore.get(COOKIE_NAME)?.value;
  const fromCookie = stored
    ? clienti.find((c) => c.id === stored) ?? null
    : null;
  const active = fromCookie ?? clienti[0];

  return { ok: true, active, clienti };
  },
);

/**
 * Variante leggera per Server Components che hanno solo bisogno dell'id
 * (es. la pagina /bandi che passa cliente_id al `POST /match`).
 */
export async function getActiveClienteId(): Promise<string | null> {
  const state = await resolveActiveCliente();
  return state.ok ? state.active.id : null;
}

export const ACTIVE_CLIENTE_COOKIE = COOKIE_NAME;
export const ACTIVE_CLIENTE_COOKIE_MAX_AGE = COOKIE_MAX_AGE_SEC;
