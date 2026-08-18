import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { join } from 'path';
import * as schema from '#db/schema';

const globalForDb = globalThis as unknown as { sqlite: Database.Database | undefined };

const sqlite = globalForDb.sqlite ?? new Database(join(process.cwd(), 'dataforge.sqlite'));

globalForDb.sqlite = sqlite;

export const db = drizzle(sqlite, { schema });