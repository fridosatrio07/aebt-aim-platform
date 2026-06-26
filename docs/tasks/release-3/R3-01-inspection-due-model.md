# R3-01 - Inspection Due Model

## Status

* [ ] Not Started
* [ ] In Progress
* [ ] Blocked
* [ ] Code Complete
* [ ] Tests Passed
* [ ] Reviewed
* [ ] Merged
* [x] Done

Only one status should be checked at a time. Initially check only Not Started.

## Objective

Create inspection due/overdue logical model for statutory inspection tracking without final compliance decision automation.

## Context Files to Read First

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/07_DATA_MODEL_BASELINE.md
- docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md
- docs/ai-context/10_UI_UX_RULES.md
- docs/ai-context/11_WORKFLOW_RULES.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md

## Source Basis

- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1
- Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1
- Master BPMN Workflow Pack Pengembangan AIM Platform SBU AEBT, Rev. 1
- PRD URS Pengembangan AIM Platform SBU AEBT, Rev. 1

## Scope

- Implement only the behavior required for R3-01 - Inspection Due Model.
- Support inspection, certification, evidence, workpack, or dashboard workflow only as described.
- Preserve human final decision boundary and source/evidence traceability.

## Out of Scope

- Do not implement unrelated release tasks.
- Do not issue certificates, PLO, layak operasi, fit-for-operation, or final compliance decisions automatically.
- Do not implement advanced RBI, RLA, FFS, or interval extension approval.

## Allowed Files / Folders

- docs/tasks/
- docs/handoff/
- Frontend/backend/database folders approved by repository baseline when this task is later executed.

## Protected Files / Folders

- Source documents outside E:\Project\AEBT's AIM Platform\Source Code.
- Package/dependency files unless approved.
- Architecture baseline and ADRs unless change is explicitly approved.

## Functional Requirements

- Must support inspection/certification/evidence workflows with reviewable status and audit trail.
- Must link dashboard/KPI items to filtered action lists where applicable.

## Data Requirements

- Follow docs/ai-context/07_DATA_MODEL_BASELINE.md.
- Store readiness/status as support data, not final certification or safety conclusion.

## API Requirements

- Follow docs/ai-context/08_API_CONVENTION.md where API is in scope; otherwise TBD.

## UI/UX Requirements

- Follow docs/ai-context/10_UI_UX_RULES.md where UI is in scope; otherwise Not Applicable.

## RBAC / Permission Requirements

- Needs Review.
- Review, approval, export, and status changes require explicit permission.

## Audit Trail Requirements

- Log data change, evidence linkage, checklist/review status, approval, export, upload, and close-out where applicable.

## Validation Rules

- Validate due/status fields, evidence completeness, source basis, review state, tenant/project/site scope, and RBAC permission.

## Acceptance Criteria

* [x] Scope implemented exactly as described in this task.
* [x] Tenant isolation, RBAC, evidence, workflow, and audit requirements are satisfied where applicable.
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

* Files changed: main/packages/shared/src/release-3.ts; main/packages/shared/tests/release-3.test.ts; main/packages/shared/src/rbac.ts; main/packages/shared/src/index.ts; main/packages/database/prisma/schema.prisma; main/apps/api/src/business-foundation/*; main/apps/api/src/app.module.ts; main/apps/api/src/foundation/foundation.service.ts; main/apps/web/src/components/AppShell.tsx; main/seed/release-3-business-foundation.json; main/scripts/migration-check.mjs; main/scripts/verify-release-3.mjs; main/scripts/release3-verify.mjs; main/package.json; main/README.md; docs/tasks/release-3/*; docs/handoff/*; docs/ai-context/06_RELEASE_PLAN_R0_R4.md; docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md; docs/ai-context/15_CHANGELOG_CONTEXT.md
* Implementation summary: Added inspection due logical schema, shared records, due-status filters, tenant-scoped service methods, RBAC checks, audit events, and tests for preliminary inspection tracking.
* Assumptions: Static/in-memory demo data and logical Prisma schema are acceptable until persistence repositories and migrations are approved; readiness/completeness/status fields are support data only.
* Tests run: pnpm run lint; pnpm run typecheck; pnpm run test; pnpm run build; pnpm run migration:check; pnpm run analytics:check; pnpm run release3:verify - all passed on 2026-06-26.
* Known limitations: No database migrations were run; no production persistence, final RBAC approval, final legal/compliance clause validation, or final inspection/certification decision logic was implemented.
* Follow-up tasks: Release 4 may start only after Project Owner/SME decisions for RBI methodology and after R3 open decisions are reviewed.
* Open questions: Final inspection interval policy, certification evidence policy, migration execution plan, pilot dataset, and production deployment environment remain open.

