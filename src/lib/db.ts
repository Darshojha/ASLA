import 'server-only';

import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool =
  connectionString
    ? new Pool({
        connectionString,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : undefined,
      })
    : null;

export async function queryDatabase<T>(text: string, values: unknown[] = []) {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured.');
  }

  return pool.query<T>(text, values);
}

export function hasDatabaseConnection() {
  return Boolean(pool);
}

export { pool };
