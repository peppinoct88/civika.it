import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import {
  userRoles,
  rolePermissions,
  permissions,
  roles,
} from "@/lib/db/schema";
import type { PermissionEntry } from "@/types";

/**
 * Carica i permessi completi di un utente dal database.
 * Unisce ruoli → permessi tramite le tabelle ponte.
 */
export async function getUserPermissions(
  userId: string
): Promise<{ roles: string[]; permissions: PermissionEntry[] }> {
  // Query: user_roles → roles + role_permissions → permissions
  const result = await db
    .select({
      roleName: roles.name,
      resource: permissions.resource,
      action: permissions.action,
      scope: permissions.scope,
    })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(eq(userRoles.userId, userId));

  const roleNames = [...new Set(result.map((r) => r.roleName))];
  const permEntries: PermissionEntry[] = result.map((r) => ({
    resource: r.resource,
    action: r.action,
    scope: r.scope as "own" | "all" | "team",
  }));

  // Deduplica permessi
  const uniquePerms = permEntries.filter(
    (p, i, arr) =>
      arr.findIndex(
        (x) =>
          x.resource === p.resource &&
          x.action === p.action &&
          x.scope === p.scope
      ) === i
  );

  return { roles: roleNames, permissions: uniquePerms };
}

/**
 * Verifica se un utente ha un permesso specifico.
 */
export function hasPermission(
  userPermissions: PermissionEntry[],
  resource: string,
  action: string,
  requiredScope?: "own" | "all"
): boolean {
  return userPermissions.some(
    (p) =>
      p.resource === resource &&
      p.action === action &&
      (requiredScope ? p.scope === requiredScope || p.scope === "all" : true)
  );
}

/**
 * Restituisce lo scope del permesso dell'utente per una risorsa/azione.
 * 'all' > 'team' > 'own' > null
 */
export function getPermissionScope(
  userPermissions: PermissionEntry[],
  resource: string,
  action: string
): "own" | "all" | "team" | null {
  const matching = userPermissions.filter(
    (p) => p.resource === resource && p.action === action
  );

  if (matching.some((p) => p.scope === "all")) return "all";
  if (matching.some((p) => p.scope === "team")) return "team";
  if (matching.some((p) => p.scope === "own")) return "own";
  return null;
}
