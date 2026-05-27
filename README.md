# ASLA

A one-page firearms reference site built with Next.js and PostgreSQL.

## Data

- The canonical collection lives in `src/lib/data.ts`.
- The app reads from PostgreSQL when `DATABASE_URL` is set.
- On first use, the app creates the `firearms` table and seeds it from the bundled factual collection if the table is empty.
- If `DATABASE_URL` is missing, the page falls back to the bundled collection so local preview still works.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Set `DATABASE_URL` to your PostgreSQL connection string.
3. Run `npm run dev`.

## Schema

- `db/schema.sql` mirrors the table definition used by the app bootstrap logic.
