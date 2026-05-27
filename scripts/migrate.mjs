import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

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

function resolveSslOption(connectionString) {
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

async function main() {
  const connectionString = resolveConnectionString();

  if (!connectionString) {
    throw new Error('No PostgreSQL connection is configured. Set DATABASE_URL or PGHOST/PGDATABASE/PGUSER locally.');
  }

  const pool = new Pool({
    connectionString,
    ssl: resolveSslOption(connectionString),
  });

  const migrationsDir = path.join(projectRoot, 'db', 'migrations');
  const migrationFiles = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort((a, b) => a.localeCompare(b));

  try {
    await pool.query(`
      create table if not exists schema_migrations (
        filename text primary key,
        applied_at timestamptz not null default now()
      )
    `);

    const appliedResult = await pool.query('select filename from schema_migrations order by filename');
    const applied = new Set(appliedResult.rows.map((row) => row.filename));

    for (const file of migrationFiles) {
      if (applied.has(file)) {
        continue;
      }

      const migrationPath = path.join(migrationsDir, file);
      const sql = await fs.readFile(migrationPath, 'utf8');
      const client = await pool.connect();

      try {
        await client.query('begin');
        await client.query(sql);
        await client.query('insert into schema_migrations (filename) values ($1)', [file]);
        await client.query('commit');
        console.log(`Applied ${file}`);
      } catch (error) {
        await client.query('rollback');
        throw error;
      } finally {
        client.release();
      }
    }

    if (migrationFiles.length === 0) {
      console.log('No migrations found.');
    } else {
      console.log('Migrations complete.');
    }
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
