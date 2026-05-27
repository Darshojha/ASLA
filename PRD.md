# PRD: ASLA Firearms Reference

## Purpose

Build and maintain a one-page informational website focused on firearms, organized as a curated reference archive.

## Product Goals

- Keep the experience single-page and fast to browse.
- Present firearms data in a subtle, editorial visual style.
- Use PostgreSQL as the source of truth for the collection.
- Support schema evolution through versioned SQL migrations.
- Make local development match deployment as closely as possible.

## Audience

- The site owner and future editors who care about firearms reference data.
- Visitors who want a concise, visually polished overview of firearms by category.

## Core Requirements

- One-page layout only.
- Categories remain grouped and scannable.
- Firearm records are stored in PostgreSQL.
- Schema changes are added through new migration files.
- Local database configuration must work from VS Code and the app runtime.
- Deployment configuration must be safe for Vercel and must not commit secrets.

## Technical Requirements

- Next.js frontend with server-side data loading.
- PostgreSQL connection support through `DATABASE_URL`, `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, or `PG*` variables.
- SQL migration runner for repeatable schema updates.
- Environment variable documentation for local development and Vercel deployment.

## Non-Goals

- No multi-page information architecture.
- No user accounts.
- No admin dashboard unless explicitly added later.
- No secret values committed to the repository.

## Future Change Policy

- New columns, tables, or indexes must be added in a new migration file.
- Existing migrations should not be rewritten once committed.
- Local and hosted database settings should remain documented in the repo.

