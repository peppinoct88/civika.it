/**
 * Helper server-side per leggere l'utente corrente dal cookie `access_token`.
 *
 * Centralizza il pattern "read cookie → verify JWT → return claims" usato
 * dalle Server Components/Server Actions che devono gating su ruolo o
 * stamping audit (es. /dashboard/catalogo solo per super_admin).
 *
 * Ritorna `null` se token assente, scaduto o invalido — il chiamante decide
 * cosa fare (redirect, 403, hide nav).
 */

import { cookies } from "next/headers";

import { verifyAccessToken } from "./jwt";
import type { JWTPayload } from "@/types";

export async function getCurrentSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function isSuperAdmin(): Promise<boolean> {
  const session = await getCurrentSession();
  return session?.roles.includes("super_admin") ?? false;
}
