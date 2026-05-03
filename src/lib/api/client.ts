/**
 * Client HTTP verso FastAPI civika-scout (apps/api).
 *
 * Pattern (ADR-024):
 * - Server-side fetch (Server Components / Server Actions)
 * - Auth via header `Authorization: Bearer <jwt>` letto dal cookie
 *   `access_token` (stesso JWT del middleware Next.js).
 * - Base URL da `NEXT_PUBLIC_API_URL` (dev: http://localhost:8000,
 *   prod: https://api.civika.it).
 * - Errori HTTP → `ApiClientError` con status + detail; la UI può
 *   discriminare 401/403/404/409/422/5xx senza parsare stringhe.
 */

import { cookies } from "next/headers";
import type {
  ApiError,
  BandiListPage,
  BandoClientePipelineRead,
  BandoClientePipelineUpsert,
  BandoConsolidatoRead,
  BandoDetailRead,
  BandoStato,
  ClienteRead,
  ClienteUpdateNeeds,
  CoverageAuditAlertRead,
  CoverageAuditEsito,
  CoverageAuditRead,
  CoverageAuditSegnalazioneCreate,
  FeedbackMatchCreate,
  FeedbackMatchRead,
  FonteLivello,
  InboxGiornalieraRead,
  MatchProposalRead,
  MatchRequest,
  WorkspaceClienteRead,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

export class ApiClientError extends Error {
  status: number;
  detail: ApiError["detail"];

  constructor(status: number, detail: ApiError["detail"], message?: string) {
    super(message ?? `API error ${status}`);
    this.name = "ApiClientError";
    this.status = status;
    this.detail = detail;
  }
}

async function getAuthHeader(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const authHeader = await getAuthHeader();
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let detail: ApiError["detail"] = "Errore sconosciuto";
    try {
      const body = (await response.json()) as { detail?: ApiError["detail"] };
      if (body.detail !== undefined) detail = body.detail;
    } catch {
      // body non JSON, lascia detail di default
    }
    throw new ApiClientError(response.status, detail);
  }

  return (await response.json()) as T;
}

// ============================================================
// Endpoints
// ============================================================

export async function getCliente(clienteId: string): Promise<ClienteRead> {
  return request<ClienteRead>(`/clienti/${clienteId}`);
}

export async function getClientiMe(): Promise<ClienteRead[]> {
  return request<ClienteRead[]>("/clienti/me");
}

export async function updateClienteNeeds(
  clienteId: string,
  payload: ClienteUpdateNeeds,
): Promise<ClienteRead> {
  return request<ClienteRead>(`/clienti/${clienteId}/profile`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function postMatch(
  payload: MatchRequest,
): Promise<MatchProposalRead[]> {
  return request<MatchProposalRead[]>("/match", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function postMatchFeedback(
  matchId: string,
  payload: FeedbackMatchCreate,
): Promise<FeedbackMatchRead> {
  return request<FeedbackMatchRead>(`/match/${matchId}/feedback`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getCoverageAlerts(params?: {
  since?: string;
  limit?: number;
}): Promise<CoverageAuditAlertRead[]> {
  const query = new URLSearchParams();
  if (params?.since) query.set("since", params.since);
  if (params?.limit !== undefined) query.set("limit", String(params.limit));
  const qs = query.toString();
  return request<CoverageAuditAlertRead[]>(
    `/coverage-alerts${qs ? `?${qs}` : ""}`,
  );
}

export async function createCoverageSegnalazione(
  payload: CoverageAuditSegnalazioneCreate,
): Promise<CoverageAuditRead> {
  return request<CoverageAuditRead>("/coverage-audit/segnalazioni", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ============================================================
// Cockpit (ADR-035)
// ============================================================

export async function getCockpitInbox(): Promise<InboxGiornalieraRead> {
  return request<InboxGiornalieraRead>("/cockpit/inbox-giornaliera");
}

export async function getCockpitWorkspace(
  clienteId: string,
): Promise<WorkspaceClienteRead> {
  return request<WorkspaceClienteRead>(`/cockpit/workspace/${clienteId}`);
}

export async function postCockpitPipelineStato(
  clienteId: string,
  bandoId: string,
  payload: BandoClientePipelineUpsert,
): Promise<BandoClientePipelineRead> {
  return request<BandoClientePipelineRead>(
    `/cockpit/pipeline/${clienteId}/${bandoId}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function getCockpitBandoDetail(
  clienteId: string,
  bandoId: string,
): Promise<BandoDetailRead> {
  return request<BandoDetailRead>(`/cockpit/bando/${clienteId}/${bandoId}`);
}

export async function getBandiCatalogo(params?: {
  q?: string;
  stato?: BandoStato;
  livello?: FonteLivello;
  page?: number;
  pageSize?: number;
}): Promise<BandiListPage> {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", params.q);
  if (params?.stato) qs.set("stato", params.stato);
  if (params?.livello) qs.set("livello", params.livello);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.pageSize) qs.set("page_size", String(params.pageSize));
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return request<BandiListPage>(`/bandi${suffix}`);
}

// ============================================================
// Helper formatting (UI) — re-export per backward compatibility
// ============================================================

export {
  coverageEsitoLabel,
  formatCentesimiEur,
  formatScadenza,
  livelloLabel,
} from "./formatters";
