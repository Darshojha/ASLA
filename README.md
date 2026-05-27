# ASLA

A one-page firearms reference site built with Next.js and local PostgreSQL.

## Data

- The source collection lives in `src/lib/data.ts`.
- The app reads exclusively from PostgreSQL through `DATABASE_URL`.
- On first use, the app creates the `firearms` table and seeds it from the local source collection if the table is empty.
- There is no bundled runtime fallback now. If PostgreSQL is not configured, the app fails fast.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Point `DATABASE_URL` at your local PostgreSQL instance.
3. Make sure the database name exists.
4. Run `npm run dev`.

## Schema

- `db/schema.sql` mirrors the table definition used by the app bootstrap logic.
