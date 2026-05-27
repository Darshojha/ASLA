# ASLA

A one-page firearms reference site with a PostgreSQL-backed collection and a monochrome smoke visual system.

## What this repo uses

- Next.js app in `src/`
- PostgreSQL for local development and hosted deployment
- SQL migrations in `db/migrations`
- A VS Code recommendation for the PostgreSQL extension
- A fixed black background with lightweight smoke overlays behind the content
- A single-page layout with one continuous scroll surface

## Local PostgreSQL setup

Create a local database, then set the same values in `.env.local` and in the VS Code PostgreSQL connection UI.

Example local config:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/asla
PGHOST=localhost
PGPORT=5432
PGDATABASE=asla
PGUSER=postgres
PGPASSWORD=password
PGSSLMODE=disable
```

## VS Code PostgreSQL extension

This repo recommends `ms-ossdata.vscode-postgresql` in `.vscode/extensions.json`.

Use the same local database values from `.env.local` to create the connection in VS Code:

- Host: `localhost`
- Port: `5432`
- Database: `asla`
- User: your PostgreSQL user
- Password: your PostgreSQL password

Do not store secrets in the repository.

The UI is intentionally monochrome:

- Black background
- White, silver, and gray text hierarchy
- Smoke overlays used as atmosphere only, never as a full-screen blocker
- Minimal title bar and restrained separators

## Migrations

Schema changes should go through SQL migration files in `db/migrations`.

Run migrations with:

```bash
npm run db:migrate
```

Current bootstrap migration:

- `db/migrations/001_init.sql`

When you change the schema later, add a new file such as `002_add_column.sql` instead of editing old migrations.

## Vercel environment variables

For Vercel, use a database that Vercel can reach. A local-only PostgreSQL server will not be reachable from Vercel.

Recommended flow:

1. Link the project to Vercel:

```bash
vercel link
```

2. Add your database variables for the target environment. Use `production` for the live site and `preview` for preview deployments:

```bash
vercel env add DATABASE_URL production
vercel env add POSTGRES_URL production
vercel env add POSTGRES_URL_NON_POOLING production
```

3. Repeat the same commands for preview deployments if you use a separate database.

4. Pull the remote values into your local machine when needed:

```bash
vercel env pull .env.local
```

5. If you update a secret later, re-run `vercel env pull` so your local `.env.local` stays in sync.

The app reads these connection sources, in order:

1. `DATABASE_URL`
2. `POSTGRES_URL`
3. `POSTGRES_URL_NON_POOLING`
4. `PGHOST` / `PGDATABASE` / `PGUSER` / `PGPASSWORD` / `PGPORT`

For the live site, prefer a hosted PostgreSQL service such as Vercel Postgres or another provider that supports external connections from Vercel.

The production build should always keep the content visible. If a visual overlay hides the interface, reduce the overlay opacity or move it behind the content layer.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run db:migrate`
