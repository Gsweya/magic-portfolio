# MUDA Monorepo

MUDA is a B2B bulk import procurement platform for the Tanzanian market, with a secondary storefront for leftover inventory sales.

This repository is organized as a monorepo so the backend services, frontend portals, shared packages, and infrastructure can evolve together while still deploying independently.

## Project Structure

```text
.
├── apps/
│   ├── backend/
│   │   ├── core-api/
│   │   ├── storefront-api/
│   │   └── notification-svc/
│   ├── web/
│   │   ├── order/
│   │   ├── agent/
│   │   ├── purchase/
│   │   ├── admin/
│   │   └── prototypes/
│   └── mobile-native/
├── packages/
│   ├── db/
│   ├── shared/
│   ├── config/
│   ├── ui/
│   └── types/
├── infra/
│   ├── fly/
│   ├── nginx/
│   ├── docker/
│   └── scripts/
├── docs/
│   ├── architecture/
│   ├── requirements/
│   ├── api/
│   └── runbooks/
├── frontend_ui_template/
├── MUDA_README.md
├── MUDA_System_Requirements.md
├── go.work
├── package.json
└── turbo.json
```

## Apps

- `apps/backend/core-api` — Main Go API for B2B orders, tickets, KYC, invoices, auth, suppliers, and agent workflows.
- `apps/backend/storefront-api` — Go API for the end-buyer storefront catalog, checkout, and order handling.
- `apps/backend/notification-svc` — Go service that consumes Redis events and dispatches SMS, WhatsApp, and email notifications.
- `apps/web/order` — Vite app for the bulk buyer customer portal at `order.muda.ink`.
- `apps/web/agent` — Vite app for the internal operator dashboard at `agent.muda.ink`.
- `apps/web/purchase` — Vite app for the end-buyer storefront at `purchase.muda.ink`.
- `apps/web/admin` — Vite app for the admin panel at `admin.muda.ink`.
- `apps/web/prototypes` — Vite app for demo screens, design spikes, and Figma-friendly prototype presentation.
- `apps/mobile-native` — Reserved workspace for a future native mobile app. Mobile web screens still live inside the web apps.

## Shared Packages

- `packages/db` — Database migrations, schema definitions, seeds, and database runbooks.
- `packages/shared` — Cross-cutting domain constants and contracts that can be mirrored across services.
- `packages/config` — Shared configuration loading patterns and environment conventions.
- `packages/ui` — Shared frontend UI components and design tokens, curated from `frontend_ui_template/main_ui/coss/packages/ui`.
- `packages/types` — Shared TypeScript types for frontend apps.

## Infrastructure And Docs

- `infra/fly` — Fly.io app configs and deployment helpers.
- `infra/nginx` — Gateway and proxy configuration.
- `infra/docker` — Container definitions for local and deployment workflows.
- `infra/scripts` — Repo-level operational scripts.
- `docs/architecture` — Architecture notes and diagrams.
- `docs/requirements` — Product and system requirement references.
- `docs/api` — API documentation and contracts.
- `docs/runbooks` — Deployment, backup, and incident runbooks.

## Reference Documents

- `MUDA_README.md` — Architecture-oriented reference for the intended system structure.
- `MUDA_System_Requirements.md` — Product requirements, role definitions, functional requirements, and deliverables.
- `frontend_ui_template/` — Reference source for the MUDA frontend design system. The `coss` package contents are the baseline for shared UI adoption.

## Workspace Conventions

- Go services live under `apps/backend/*` and should be linked through the root `go.work`.
- Frontend apps live under `apps/web/*`, use Vite, and are orchestrated from the root workspace using Turbo.
- Shared frontend packages belong in `packages/*`.
- Prototypes and demo flows belong in `apps/web/prototypes`, while production screens belong in the individual portal apps.
- Service-specific deployment config belongs in `infra/*`, not inside product code unless a framework requires it.

## Local Development Direction

- Backend: Go services will run independently and share common database and Redis dependencies.
- Frontend: each portal is a separate Vite app, all consuming the shared MUDA UI package derived from `coss`.
- Database: migrations and seed data will be managed from `packages/db`.
- Mobile: responsive/mobile web experiences belong in the web apps; native mobile is a later addition under `apps/mobile-native`.
