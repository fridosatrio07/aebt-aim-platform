# R0-03 ? API Convention

## Status

* [ ] Not Started
* [ ] In Progress
* [ ] Blocked
* [ ] Code Complete
* [ ] Tests Passed
* [ ] Reviewed
* [ ] Merged
* [x] Done

Only one status should be checked at a time. Release 0 implementation and required checks are complete.

## Objective

Establish initial REST/JSON response, error, pagination, filtering, sorting, validation, tenant context, RBAC, and audit conventions.

## Context Files to Read First

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md
- docs/ai-context/03_TECH_STACK_BASELINE.md
- docs/ai-context/04_ARCHITECTURE_RULES.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/08_API_CONVENTION.md
- docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md

## Source Basis

- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1
- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1
- Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1

## Scope

- Implemented Release 0 platform foundation under main/ only.
- Added stack-aligned workspace skeleton for Next.js web, NestJS API, shared foundation primitives, Prisma database foundation, FastAPI analytics placeholder, Docker-first infra, seed data, and quality gates.
- Preserved tenant isolation, RBAC checks, audit logging, source-basis traceability, and draft/preliminary domain guardrails.

## Out of Scope

- No Release 1-4 business module implementation.
- No final legal, certification, RBI, RLA, FFS, fit-for-operation, interval extension, risk acceptance, or asset safety decision logic.
- No database migration was run.
- No confidential source documents copied into the repository.

## Allowed Files / Folders

- main/
- docs/tasks/
- docs/handoff/
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/15_CHANGELOG_CONTEXT.md

## Protected Files / Folders

- Source documents outside E:\Project\AEBT's AIM Platform\Source Code.
- Release 1-4 application module implementation files beyond scaffolding placeholders.
- Architecture baseline and ADRs unless explicitly approved.

## Functional Requirements

- AIM Platform foundation supports workflow, data, evidence, compliance support, audit trail, reporting, and decision-support boundaries.
- Draft/preliminary status and final-decision guardrails are encoded in shared primitives and displayed in the UI shell.
- Tenant, project, site, RBAC, and audit controls are represented in shared utilities, API endpoints, and Prisma foundation schema.

## Data Requirements

- Prisma foundation schema includes Tenant, Client, Project, Site, UserProfile, Role, Permission, RolePermission, UserRoleAssignment, AuditLog, and SeedDatasetRecord only.
- Business module tables for assets, inspection, certification, RBI, risk register, documents, and evidence are intentionally out of scope for Release 0.

## API Requirements

- NestJS API exposes Release 0 health, foundation context, permission, and audit-event endpoints under the global v1 prefix.
- Shared API response helpers define success, error, pagination, validation placeholder, and tenant metadata conventions.

## UI/UX Requirements

- Next.js global shell includes role-aware workbench, tenant/project/site selectors, navigation placeholders, and visible draft/preliminary decision boundary notice.

## RBAC / Permission Requirements

- Application-level RBAC primitives define Release 0 role-permission mappings.
- Permission checks enforce same-tenant scope before allowing actions.
- Final permission matrix remains Needs UBT/IT + Project Owner Review for future releases.

## Audit Trail Requirements

- Audit event builder records actor, tenant/project/site scope, action, object type/id, source basis, previous/new values where applicable, and draft/preliminary decision boundary.
- In-memory audit sink supports Release 0 demonstration and tests only; persistent audit storage is represented in Prisma schema but no migration was run.

## Validation Rules

- Tenant scope normalization requires tenantId.
- Same-tenant/project/site guard rejects cross-scope access.
- Final-decision guard rejects prohibited final decision actions.
- Migration check rejects out-of-scope business module schema models in Release 0.

## Acceptance Criteria

* [x] Scope implemented exactly as described in this task.
* [x] Tenant isolation, RBAC, and audit requirements are satisfied where applicable.
* [x] No unsupported domain, legal, compliance, RBI, certification, RLA, FFS, or final safety decision logic introduced.

## Required Checks

* [x] Lint passed
* [x] Typecheck passed
* [x] Unit tests passed where applicable
* [x] Build passed where applicable
* [x] RBAC/tenant isolation checked where applicable
* [x] Audit log behavior checked where applicable
* [x] No unsupported domain decision introduced
* [x] Handoff log updated

## Handoff Notes

* Files changed: main/README.md, main/.env.example, main/.gitignore, main/package.json, main/pnpm-lock.yaml, main/pnpm-workspace.yaml, main/tsconfig.base.json, main/apps/api/**, main/apps/web/**, main/packages/shared/**, main/packages/database/**, main/services/analytics/**, main/infra/**, main/seed/spm-01.json, main/scripts/**, docs/tasks/release-0/*.md, docs/tasks/TASK_INDEX.md, docs/ai-context/06_RELEASE_PLAN_R0_R4.md, docs/ai-context/15_CHANGELOG_CONTEXT.md, docs/handoff/TASK_COMPLETION_LOG.md, docs/handoff/AGENT_ASSUMPTION_LOG.md
* Implementation summary: Release 0 foundation implemented under main with Next.js web shell, NestJS API foundation, shared tenant/RBAC/audit/API/domain guardrail utilities, Prisma foundation schema, FastAPI placeholder, Docker infra, SPM-01 dummy seed, and quality gates.
* Assumptions: Source Code/main is the implementation root; Source Code is still not a Git repository; Next standalone output is disabled for local build because Windows symlink creation failed under this environment.
* Tests run: pnpm run lint - passed; pnpm run typecheck - passed; pnpm run test - passed; shared package 4 tests passed; API/web had no test files yet and passed with --passWithNoTests; pnpm run build - passed; pnpm run migration:check - passed; python -m compileall services/analytics/app - passed; pnpm run release0:verify - passed.
* Known limitations: No migrations run; production deployment remains TBD; FastAPI dependencies are declared but only Python syntax was checked; API/web currently have no module-specific test files beyond shared foundation tests.
* Follow-up tasks: Begin Release 1 only after Project Owner approval and review of remaining open decisions.
* Open questions: Final Git repository status, production environment, final RBAC matrix, final API contract, and final physical database schema remain open.
