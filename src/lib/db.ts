import 'server-only';

import { Pool } from 'pg';

function resolveConnectionString() {
  const directUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (directUrl) {
    return directUrl;
  }

  const host = process.env.PGHOST;
  const database = process.env.PGDATABASE;
  const user = process.env.PGUSER;

  if (!host || !database || !user) {
    return null;
  }

  const password = process.env.PGPASSWORD ?? '';
  const port = process.env.PGPORT ?? '5432';
  const encodedUser = encodeURIComponent(user);
  const encodedPassword = password ? `:${encodeURIComponent(password)}` : '';

  return `postgresql://${encodedUser}${encodedPassword}@${host}:${port}/${database}`;
}

function resolveSslOption(connectionString: string) {
  const sslMode = (process.env.PGSSLMODE || '').toLowerCase();
  const isLocalHost = /@(localhost|127\.0\.0\.1|::1)([:/]|$)/i.test(connectionString);

  if (sslMode === 'disable' || isLocalHost) {
    return undefined;
  }

  if (sslMode === 'require' || sslMode === 'prefer') {
    return { rejectUnauthorized: false };
  }

  return process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : undefined;
}

const connectionString = resolveConnectionString();

const pool =
  connectionString
    ? new Pool({
        connectionString,
        ssl: resolveSslOption(connectionString),
      })
    : null;

export async function queryDatabase<T>(text: string, values: unknown[] = []) {
  if (!pool) {
    throw new Error('No PostgreSQL connection is configured. Set DATABASE_URL or PGHOST/PGDATABASE/PGUSER locally.');
  }

  return pool.query<T>(text, values);
}

export function hasDatabaseConnection() {
  return Boolean(pool);
}

export { pool };
