/**
 * Server Action `setActiveClienteAction` — switch del cliente attivo.
 *
 * Invocata dal `<ClientePicker>` nella topbar quando l'utente seleziona
 * un cliente diverso. Valida che l'id sia tra quelli effettivamente
 * associati all'utente (anti-tampering: non basta il check di hasAccess
 * server-side, vogliamo evitare di settare un cookie per un cliente che
 * il backend respingerà comunque a 403 al prossimo round-trip).
 */

"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { getClientiMe } from "@/lib/api/client";
import {
  ACTIVE_CLIENTE_COOKIE,
  ACTIVE_CLIENTE_COOKIE_MAX_AGE,
} from "@/lib/active-cliente";

export async function setActiveClienteAction(clienteId: string): Promise<void> {
  const clienti = await getClientiMe();
  const allowed = clienti.some((c) => c.id === clienteId);
  if (!allowed) {
    throw new Error("cliente non associato all'utente");
  }

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_CLIENTE_COOKIE, clienteId, {
    path: "/",
    maxAge: ACTIVE_CLIENTE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });

  revalidatePath("/dashboard", "layout");
}
