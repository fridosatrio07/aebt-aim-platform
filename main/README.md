# AIM Platform Main Application

Release 4 adds RBI and integrity workflow controlled skeletons on top of the platform, data, document, work queue, reviewer flow, and first business modules foundations. It supports RBI candidate routing, RBI assessment shell with stepper UI, operating data input, damage mechanism review placeholder, PoF/CoF helper interface, preliminary risk ranking record, RBI review & approval workflow, and risk register linkage. It does not implement final technical decisions, automatic PoF/CoF formulas not source-approved, final RBI/RLA/FFS decisions, risk acceptance criteria changes, or interval extension approval.

## Workspace Layout

- `apps/web`: Next.js + TypeScript Release 4 integrity/RBI workbench.
- `apps/api`: NestJS modular monolith API.
- `packages/shared`: shared API, tenant, RBAC, audit, guardrail, seed, Release 1–3 primitives, and Release 4 integrity/RBI guardrails.
- `packages/database`: Prisma/PostgreSQL/TimescaleDB Release 4 schema.
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
pnpm run release4:verify
```

Python analytics syntax check:

```powershell
python -m compileall services/analytics/app
```

## Protected Boundary

All technical, certification, legal, RBI, RLA, FFS, risk acceptance, inspection interval, fit-for-operation, layak operasi, and asset safety outputs remain draft/preliminary unless reviewed and approved by authorized personnel outside the platform.
