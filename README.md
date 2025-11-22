# TinyLink - Next.js Take-Home

This is a complete TinyLink app (Next.js + Prisma + Tailwind). It implements the assignment's required API and pages.

## Quick start

1. Install dependencies:
```bash
pnpm install
# or npm install
```

2. Set env vars in `.env` (use `.env.example`).

3. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

4. Start dev server:
```bash
pnpm dev
```

## Routes (required by autograder)
- `/` Dashboard
- `/code/:code` Stats page
- `/:code` Redirect (302)
- `/healthz` Health check (200)

API:
- `POST /api/links` Create link (409 if exists)
- `GET  /api/links` List links
- `GET  /api/links/:code` Get link
- `DELETE /api/links/:code` Delete link

