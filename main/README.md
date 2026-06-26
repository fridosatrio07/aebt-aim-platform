# AIM Platform Main Application

Release 3 adds first operational business modules on top of the platform, data, document, work queue, and reviewer flow foundations. It supports inspection due tracking, workpack skeletons, certification support register, evidence checklist, evidence pack preview, and dashboard KPI wiring. It does not implement final business decisions, RBI calculations, certification decisions, RLA/FFS decisions, fit-for-operation decisions, legal interpretations, or inspection interval extension logic.

## Workspace Layout

- `apps/web`: Next.js + TypeScript Release 3 business workbench.
- `apps/api`: NestJS modular monolith API.
- `packages/shared`: shared API, tenant, RBAC, audit, guardrail, seed, Release 1 data, Release 2 workflow, and Release 3 business primitives.
- `packages/database`: Prisma/PostgreSQL/TimescaleDB Release 3 foundation schema.
- `services/analytics`: FastAPI analytics/extraction placeholder.
- `infra`: Docker-first local infrastructure baseline.
- `scripts`: release quality gates and safety checks.

## Required Local Commands

```powershell
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run migration:check
pnpm run release3:verify
```

Python analytics syntax check:

```powershell
python -m compileall services/analytics/app
```

## Protected Boundary

All technical, certification, legal, RBI, RLA, FFS, risk acceptance, inspection interval, fit-for-operation, layak operasi, and asset safety outputs remain draft/preliminary unless reviewed and approved by authorized personnel outside the platform.
