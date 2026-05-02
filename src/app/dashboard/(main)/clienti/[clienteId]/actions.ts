/**
 * Server Action `updatePipelineStatoAction` — wraps POST /cockpit/pipeline.
 *
 * Invocato dal kanban del workspace cliente quando l'operatore droppa una
 * card in una colonna diversa. Il client fa optimistic update e poi
 * chiama questa action; in caso di errore la UI rolla back e mostra un
 * toast.
 *
 * Niente revalidatePath qui: l'optimistic update è già stato applicato
 * client-side, e un revalidate provocherebbe un round-trip aggiuntivo
 * con flicker. Il refresh esplicito (router.refresh) è gestito dal
 * client se serve sincronizzare con altri pezzi di stato server.
 */

"use server";

import { revalidatePath } from "next/cache";

import { ApiClientError, postCockpitPipelineStato } from "@/lib/api/client";
import type { BandoPipelineStato } from "@/lib/api/types";

export interface UpdatePipelineResult {
  ok: boolean;
  error?: string;
}

export async function updatePipelineStatoAction(
  clienteId: string,
  bandoId: string,
  stato: BandoPipelineStato,
  options?: { noteConsulente?: string | null; scartatoMotivo?: string | null },
): Promise<UpdatePipelineResult> {
  try {
    await postCockpitPipelineStato(clienteId, bandoId, {
      stato,
      note_consulente: options?.noteConsulente ?? null,
      scartato_motivo: options?.scartatoMotivo ?? null,
    });
    revalidatePath(`/dashboard/clienti/${clienteId}`);
    return { ok: true };
  } catch (error) {
    if (error instanceof ApiClientError) {
      const detail =
        typeof error.detail === "string"
          ? error.detail
          : JSON.stringify(error.detail);
      return { ok: false, error: `${error.status}: ${detail}` };
    }
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    };
  }
}
