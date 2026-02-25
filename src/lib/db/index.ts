import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Connessione per le query
// Su Supabase: usa il pooler (porta 6543) per le query normali
// prepare: false è necessario per il connection pooler di Supabase (PgBouncer)
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false, // richiesto da Supabase pooler
});

export const db = drizzle(client, { schema });

// Connessione per le migrazioni (usa la connessione diretta, porta 5432)
export function createMigrationClient() {
  const directUrl = process.env.DATABASE_DIRECT_URL || connectionString;
  const migrationClient = postgres(directUrl, { max: 1 });
  return drizzle(migrationClient, { schema });
}
