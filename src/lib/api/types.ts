/**
 * Facade tipato sugli schemi Pydantic della FastAPI civika-scout.
 *
 * Le definizioni vere stanno in `schema.ts`, generato da
 * `npm run api:types` (uv run python scripts/dump_openapi.py |
 * openapi-typescript). Qui esponiamo alias stabili che il resto del
 * dashboard può importare senza accoppiarsi al layout di OpenAPI.
 *
 * Per aggiornare in seguito a una modifica della FastAPI:
 *   cd apps/dashboard && npm run api:types
 *
 * NON modificare a mano `schema.ts`. Aggiungere alias qui se serve.
 */

import type { components } from "./schema";

type Schemas = components["schemas"];

// ============================================================
// Enums
// ============================================================

export type FonteLivello = Schemas["FonteLivello"];
export type BandoStato = Schemas["BandoStato"];
export type ClienteTipoEnte = Schemas["ClienteTipoEnte"];

// ============================================================
// Bando Consolidato (Strato 7)
// ============================================================

export type BandoConsolidatoRead = Schemas["BandoConsolidatoRead"];

// ============================================================
// Cliente
// ============================================================

export type ClienteRead = Schemas["ClienteRead"];
export type ClienteUpdateNeeds = Schemas["ClienteUpdateNeeds"];

// ============================================================
// Match (Strato 9)
// ============================================================

export type MatchRequest = Schemas["MatchRequest"];
export type MatchScoresRead = Schemas["MatchScoresRead"];
export type MatchMotivazioniRead = Schemas["MatchMotivazioniRead"];
export type MatchProposalRead = Schemas["MatchProposalRead"];

// ============================================================
// Match feedback (Strato 9 active learning)
// ============================================================

export type FeedbackValutazione = Schemas["FeedbackValutazione"];
export type FeedbackMatchCreate = Schemas["FeedbackMatchCreate"];
export type FeedbackMatchRead = Schemas["FeedbackMatchRead"];

// ============================================================
// Coverage Audit (Strato 10 ZERO MISS — ADR-011)
// ============================================================

export type CoverageAuditEsito = Schemas["CoverageAuditEsito"];

/**
 * Vista dashboard alert (`GET /coverage-alerts`). Riproduce
 * `CoverageAuditAlertRead` finché `schema.ts` non viene rigenerato
 * (`npm run api:types` post-allineamento FastAPI ADR-011 Mecc. 4).
 *
 * Differenze chiave vs schema generato:
 *   - `fonte_id`, `fonte_nome`, `fonte_livello` sono nullable (segnalazioni
 *     manuali Mecc. 4 hanno `fonte_id = NULL`).
 *   - Nuovo campo `tipo_segnalazione` per discriminare Mecc. 4.
 */
export interface CoverageAuditAlertRead {
  id: string;
  fonte_id: string | null;
  fonte_nome: string | null;
  fonte_livello: FonteLivello | null;
  periodo_inizio: string;
  periodo_fine: string;
  expected_count: number;
  actual_count: number;
  delta_pct: string;
  esito: CoverageAuditEsito;
  note: string | null;
  bando_consolidato_id: string | null;
  bando_titolo: string | null;
  tipo_segnalazione: CoverageAuditTipoSegnalazione;
  created_at: string;
}

/**
 * Tipo di segnalazione (ADR-011 Mecc. 4):
 *   - `manual_report`     : segnalazione consulente via UI `/segnala`.
 *   - `must_have_missed`  : auto-detection MUST_HAVE_PROGRAMMES (futuro).
 *   - `null`              : audit standard (Mecc. 1 + Mecc. 2).
 */
export type CoverageAuditTipoSegnalazione =
  | "manual_report"
  | "must_have_missed"
  | null;

/**
 * Payload della segnalazione manuale POST /coverage-audit/segnalazioni.
 *
 * Manuale perché `schema.ts` è generato e va rigenerato (`npm run api:types`)
 * dopo aver allineato la FastAPI: in attesa, riprodichiamo il contratto qui
 * per non bloccare la UI.
 */
export interface CoverageAuditSegnalazioneCreate {
  titolo: string;
  url_fonte?: string | null;
  ente_pubblicatore?: string | null;
  scadenza_dichiarata?: string | null;
  descrizione?: string | null;
}

/**
 * Risposta del POST: record `coverage_audit` appena creato. Riproduce
 * `CoverageAuditRead` finché `schema.ts` non viene rigenerato.
 */
export interface CoverageAuditRead {
  id: string;
  fonte_id: string | null;
  periodo_inizio: string;
  periodo_fine: string;
  expected_count: number;
  actual_count: number;
  delta_pct: string;
  esito: CoverageAuditEsito;
  note: string | null;
  bando_consolidato_id: string | null;
  tipo_segnalazione: CoverageAuditTipoSegnalazione;
  created_at: string;
}

// ============================================================
// Operator Cockpit (ADR-035)
// ============================================================

export type BandoPipelineStato = Schemas["BandoPipelineStato"];
export type BandoClientePipelineRead = Schemas["BandoClientePipelineRead"];
export type BandoClientePipelineUpsert = Schemas["BandoClientePipelineUpsert"];
export type PipelineKanbanItem = Schemas["PipelineKanbanItem"];
export type WorkspaceClienteRead = Schemas["WorkspaceClienteRead"];
export type InboxBandoNuovo = Schemas["InboxBandoNuovo"];
export type InboxScadenzaImminente = Schemas["InboxScadenzaImminente"];
export type InboxGraduatoriaAttesa = Schemas["InboxGraduatoriaAttesa"];
export type InboxEventoRecente = Schemas["InboxEventoRecente"];
export type InboxGiornalieraRead = Schemas["InboxGiornalieraRead"];
export type BandoEventoRead = Schemas["BandoEventoRead"];
export type BandoDetailRead = Schemas["BandoDetailRead"];

// ============================================================
// Errori HTTP FastAPI
// ============================================================

export type ValidationError = Schemas["ValidationError"];
export type HTTPValidationError = Schemas["HTTPValidationError"];

/**
 * Forma "denormalizzata" di un errore HTTP rifiutato dal client.
 * FastAPI usa `detail` come stringa per HTTPException e come array di
 * `ValidationError` per 422. Lo manteniamo unito qui per discriminare
 * lato UI senza frammentare il tipo per status code.
 */
export interface ApiError {
  detail: string | ValidationError[];
  status: number;
}
