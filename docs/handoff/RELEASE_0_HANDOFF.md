# Release 0 Handoff - Platform Foundation

## Task ID

Release 0: R0-01 through R0-09

## Branch

Not applicable. `E:\Project\AEBT's AIM Platform\Source Code` is still not currently a Git repository.

## Agent/session

Codex

## Date

2026-06-26

## Files Changed

- `main/README.md`
- `main/.env.example`
- `main/.gitignore`
- `main/package.json`
- `main/pnpm-lock.yaml`
- `main/pnpm-workspace.yaml`
- `main/tsconfig.base.json`
- `main/apps/api/**`
- `main/apps/web/**`
- `main/packages/shared/**`
- `main/packages/database/**`
- `main/services/analytics/**`
- `main/infra/**`
- `main/seed/spm-01.json`
- `main/scripts/**`
- `docs/tasks/release-0/*.md`
- `docs/tasks/TASK_INDEX.md`
- `docs/ai-context/06_RELEASE_PLAN_R0_R4.md`
- `docs/ai-context/15_CHANGELOG_CONTEXT.md`
- `docs/handoff/TASK_COMPLETION_LOG.md`
- `docs/handoff/AGENT_ASSUMPTION_LOG.md`

## Summary

Release 0 Platform Foundation is implemented under `main/`. The scaffold includes a Next.js global UI shell, NestJS modular monolith API foundation, shared tenant/RBAC/audit/API/domain guardrail primitives, Prisma PostgreSQL/TimescaleDB foundation schema, FastAPI analytics service placeholder, Docker-first local infra baseline, SPM-01 dummy seed data, and Release 0 quality gate scripts.

## Schema Changes

- Added Prisma schema foundation only: Tenant, Client, Project, Site, UserProfile, Role, Permission, RolePermission, UserRoleAssignment, AuditLog, SeedDatasetRecord, and supporting enums.
- No asset, inspection, certification, RBI, risk register, document, evidence, or business-module tables were added.
- No migration was generated or run.

## API Changes

- Added NestJS API app with global `v1` prefix.
- Added foundation health, context, permissions, and audit-event endpoints.
- Added shared response/error/pagination helper types.

## UI Changes

- Added Next.js Release 0 workbench with tenant/project/site selectors, role-aware navigation placeholders, foundation baseline table, and draft/preliminary decision-boundary notice.

## RBAC/Audit Changes

- Added application-level Release 0 role-permission map.
- Added same-tenant/project/site permission checks.
- Added audit event builder and in-memory audit sink for Release 0 demonstration/tests.
- Added Prisma AuditLog foundation model.

## Tests Run

- `pnpm run lint` - passed.
- `pnpm run typecheck` - passed.
- `pnpm run test` - passed; shared foundation tests: 4 passed.
- `pnpm run build` - passed.
- `pnpm run migration:check` - passed.
- `python -m compileall services/analytics/app` - passed.
- `pnpm run release0:verify` - passed.

## Assumptions

- `main/` is the application implementation root under `Source Code`.
- `Source Code` not being a Git repository remains accepted for now because the user instructed continuation.
- Next.js `output: standalone` was not kept because the local Windows environment blocked symlink creation during standalone trace copying.

## Known Limitations

- No migrations were run.
- No production deployment environment is confirmed.
- FastAPI dependencies are declared in `requirements.txt`; the verification performed syntax compilation only.
- API/web have no module-specific test files yet; shared foundation tests cover tenant/RBAC/audit/final-decision guardrail primitives.
- Browser visual QA for the shell was not run in this turn.

## Follow-up Tasks

- Confirm Git repository status.
- Confirm final physical database schema review process.
- Confirm final RBAC matrix.
- Confirm final API contract details.
- Confirm CI provider/workflow.
- Begin Release 1 only after Project Owner approval.

## Open Questions

- Which Git repository should own `Source Code` if this folder must be versioned?
- Which pilot site/client/dataset should replace dummy SPM-01 later?
- Which production/staging environment and Keycloak realm/client values should be used?
