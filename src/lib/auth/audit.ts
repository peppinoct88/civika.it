import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";

/**
 * Registra un'azione nell'audit log immutabile.
 */
export async function logAudit(params: {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    await db.insert(auditLogs).values({
      userId: params.userId,
      action: params.action,
      resource: params.resource,
      resourceId: params.resourceId,
      oldValues: params.oldValues ?? null,
      newValues: params.newValues ?? null,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      metadata: params.metadata ?? {},
    });
  } catch (error) {
    // L'audit log non deve mai bloccare l'operazione principale
    console.error("Errore scrittura audit log:", error);
  }
}
