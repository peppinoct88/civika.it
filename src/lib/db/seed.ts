/**
 * Seed script per popolare il database con dati iniziali:
 * - 6 Ruoli di sistema
 * - Permessi RBAC completi
 * - Associazione ruolo-permesso
 * - Utente Super Admin (Giuseppe)
 *
 * Eseguire con: npx tsx src/lib/db/seed.ts
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { hash } from "bcryptjs";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

async function seed() {
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  console.log("🌱 Avvio seed database Civika...\n");

  // ---- RUOLI ----
  console.log("📋 Creazione ruoli...");
  const rolesData = [
    {
      name: "super_admin",
      displayName: "Super Admin",
      description: "Gestione totale piattaforma, configurazione sistema",
      isSystem: true,
      priority: 100,
    },
    {
      name: "admin",
      displayName: "Amministratore",
      description: "Gestione contenuti, utenti e analytics",
      isSystem: true,
      priority: 80,
    },
    {
      name: "editor",
      displayName: "Editor",
      description: "Creazione e modifica contenuti propri",
      isSystem: true,
      priority: 40,
    },
    {
      name: "moderator",
      displayName: "Moderatore",
      description: "Revisione e approvazione contenuti",
      isSystem: true,
      priority: 40,
    },
    {
      name: "analyst",
      displayName: "Analista",
      description: "Accesso analytics e report in sola lettura",
      isSystem: true,
      priority: 30,
    },
    {
      name: "scout_operator",
      displayName: "Operatore Scouting",
      description: "Operatore modulo scouting bandi (futuro)",
      isSystem: true,
      priority: 50,
    },
  ];

  const insertedRoles = await db
    .insert(schema.roles)
    .values(rolesData)
    .onConflictDoNothing()
    .returning();

  const roleMap = new Map(insertedRoles.map((r) => [r.name, r.id]));
  console.log(`   ✅ ${insertedRoles.length} ruoli creati`);

  // ---- PERMESSI ----
  console.log("🔑 Creazione permessi...");
  const permissionsData = [
    // Users
    { resource: "users", action: "create", scope: "all", description: "Creare utenti" },
    { resource: "users", action: "read", scope: "all", description: "Leggere tutti gli utenti" },
    { resource: "users", action: "read", scope: "own", description: "Leggere il proprio profilo" },
    { resource: "users", action: "update", scope: "all", description: "Modificare tutti gli utenti" },
    { resource: "users", action: "update", scope: "own", description: "Modificare il proprio profilo" },
    { resource: "users", action: "delete", scope: "all", description: "Eliminare utenti" },
    { resource: "users", action: "bulk", scope: "all", description: "Operazioni bulk sugli utenti" },
    // Roles
    { resource: "roles", action: "manage", scope: "all", description: "Gestire ruoli e permessi" },
    // Contents
    { resource: "contents", action: "create", scope: "own", description: "Creare contenuti propri" },
    { resource: "contents", action: "create", scope: "all", description: "Creare contenuti per chiunque" },
    { resource: "contents", action: "read", scope: "all", description: "Leggere tutti i contenuti" },
    { resource: "contents", action: "update", scope: "own", description: "Modificare contenuti propri" },
    { resource: "contents", action: "update", scope: "all", description: "Modificare tutti i contenuti" },
    { resource: "contents", action: "delete", scope: "own", description: "Eliminare contenuti propri" },
    { resource: "contents", action: "delete", scope: "all", description: "Eliminare tutti i contenuti" },
    { resource: "contents", action: "review", scope: "all", description: "Revisionare contenuti" },
    { resource: "contents", action: "publish", scope: "all", description: "Pubblicare contenuti" },
    // Analytics
    { resource: "analytics", action: "read", scope: "all", description: "Visualizzare analytics" },
    { resource: "analytics", action: "export", scope: "all", description: "Esportare analytics" },
    // Audit
    { resource: "audit_logs", action: "read", scope: "all", description: "Leggere audit log" },
    // Settings
    { resource: "settings", action: "manage", scope: "all", description: "Gestire impostazioni sistema" },
    // Notifications
    { resource: "notifications", action: "manage", scope: "own", description: "Gestire proprie notifiche" },
    { resource: "notifications", action: "manage", scope: "all", description: "Gestire tutte le notifiche" },
    // Media
    { resource: "media", action: "upload", scope: "all", description: "Caricare file" },
    { resource: "media", action: "delete", scope: "own", description: "Eliminare propri file" },
    { resource: "media", action: "delete", scope: "all", description: "Eliminare tutti i file" },
    // Bandi (RBAC namespace; tabelle reali in schema scout — vedi ADR-024)
    { resource: "bandi", action: "search", scope: "all", description: "Cercare bandi" },
    { resource: "bandi", action: "manage", scope: "all", description: "Gestire bandi" },
    { resource: "bandi", action: "ingest", scope: "all", description: "Ingerire nuovi bandi" },
    // Clienti (RBAC sui clienti scout; mapping in user_clienti — vedi ADR-025)
    { resource: "clienti", action: "manage", scope: "own", description: "Gestire propri clienti" },
    { resource: "clienti", action: "manage", scope: "all", description: "Gestire tutti i clienti" },
    // API
    { resource: "api", action: "access", scope: "all", description: "Accesso API programmatico" },
  ];

  const insertedPerms = await db
    .insert(schema.permissions)
    .values(permissionsData)
    .onConflictDoNothing()
    .returning();

  // Crea una mappa per lookup rapido
  const permMap = new Map(
    insertedPerms.map((p) => [`${p.resource}.${p.action}.${p.scope}`, p.id])
  );
  console.log(`   ✅ ${insertedPerms.length} permessi creati`);

  // ---- ASSOCIAZIONE RUOLO → PERMESSI ----
  console.log("🔗 Associazione ruoli ↔ permessi...");

  const rolePermData: { roleId: string; permissionId: string }[] = [];

  function addPerm(roleName: string, resource: string, action: string, scope: string) {
    const roleId = roleMap.get(roleName);
    const permId = permMap.get(`${resource}.${action}.${scope}`);
    if (roleId && permId) {
      rolePermData.push({ roleId, permissionId: permId });
    }
  }

  // Super Admin: TUTTO
  for (const perm of insertedPerms) {
    const roleId = roleMap.get("super_admin");
    if (roleId) {
      rolePermData.push({ roleId, permissionId: perm.id });
    }
  }

  // Admin
  const adminPerms = [
    ["users", "create", "all"], ["users", "read", "all"], ["users", "update", "all"],
    ["users", "delete", "all"], ["users", "bulk", "all"],
    ["contents", "create", "all"], ["contents", "read", "all"], ["contents", "update", "all"],
    ["contents", "delete", "all"], ["contents", "review", "all"], ["contents", "publish", "all"],
    ["analytics", "read", "all"], ["analytics", "export", "all"],
    ["audit_logs", "read", "all"],
    ["notifications", "manage", "all"],
    ["media", "upload", "all"], ["media", "delete", "all"],
    ["bandi", "search", "all"], ["bandi", "manage", "all"],
    ["clienti", "manage", "all"],
    ["api", "access", "all"],
  ];
  adminPerms.forEach(([r, a, s]) => addPerm("admin", r, a, s));

  // Editor
  const editorPerms = [
    ["users", "read", "own"], ["users", "update", "own"],
    ["contents", "create", "own"], ["contents", "read", "all"],
    ["contents", "update", "own"], ["contents", "delete", "own"],
    ["notifications", "manage", "own"],
    ["media", "upload", "all"], ["media", "delete", "own"],
  ];
  editorPerms.forEach(([r, a, s]) => addPerm("editor", r, a, s));

  // Moderator
  const modPerms = [
    ["users", "read", "own"], ["users", "update", "own"],
    ["contents", "read", "all"], ["contents", "review", "all"], ["contents", "publish", "all"],
    ["notifications", "manage", "own"],
  ];
  modPerms.forEach(([r, a, s]) => addPerm("moderator", r, a, s));

  // Analyst
  const analystPerms = [
    ["users", "update", "own"],
    ["contents", "read", "all"],
    ["analytics", "read", "all"], ["analytics", "export", "all"],
    ["notifications", "manage", "own"],
    ["bandi", "search", "all"],
    ["api", "access", "all"],
  ];
  analystPerms.forEach(([r, a, s]) => addPerm("analyst", r, a, s));

  // Scout Operator
  const scoutPerms = [
    ["users", "read", "own"], ["users", "update", "own"],
    ["contents", "read", "all"],
    ["notifications", "manage", "own"],
    ["media", "upload", "all"], ["media", "delete", "own"],
    ["bandi", "search", "all"], ["bandi", "manage", "all"], ["bandi", "ingest", "all"],
    ["clienti", "manage", "own"],
    ["api", "access", "all"],
  ];
  scoutPerms.forEach(([r, a, s]) => addPerm("scout_operator", r, a, s));

  if (rolePermData.length > 0) {
    await db.insert(schema.rolePermissions).values(rolePermData).onConflictDoNothing();
  }
  console.log(`   ✅ ${rolePermData.length} associazioni ruolo-permesso create`);

  // ---- UTENTE SUPER ADMIN ----
  console.log("👤 Creazione utente Super Admin...");
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminPassword) {
    console.error("   ❌ Variabile ADMIN_SEED_PASSWORD non impostata!");
    console.error("   Esegui con: ADMIN_SEED_PASSWORD='TuaPassword!' npx tsx src/lib/db/seed.ts");
    process.exit(1);
  }
  const passwordHash = await hash(adminPassword, 12);

  const [superAdmin] = await db
    .insert(schema.users)
    .values({
      email: process.env.ADMIN_SEED_EMAIL || "gi.spalletta1988@gmail.com",
      passwordHash,
      firstName: process.env.ADMIN_SEED_FIRST_NAME || "Giuseppe",
      lastName: process.env.ADMIN_SEED_LAST_NAME || "Spalletta",
      emailVerified: true,
      isActive: true,
      gdprConsentAt: new Date(),
      gdprConsentVersion: "1.0",
    })
    .onConflictDoNothing()
    .returning();

  if (superAdmin) {
    const superAdminRoleId = roleMap.get("super_admin");
    if (superAdminRoleId) {
      await db
        .insert(schema.userRoles)
        .values({
          userId: superAdmin.id,
          roleId: superAdminRoleId,
        })
        .onConflictDoNothing();
    }
    console.log(`   ✅ Super Admin creato: ${superAdmin.email}`);
    console.log(`   ⚠️  CAMBIA LA PASSWORD AL PRIMO LOGIN!\n`);
  } else {
    console.log(`   ℹ️  Super Admin già esistente, skip\n`);
  }

  console.log("✅ Seed completato con successo!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Errore durante il seed:", err);
  process.exit(1);
});
