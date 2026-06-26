# R1-08 - Import Staging Schema

## Status

* [ ] Not Started
* [ ] In Progress
* [ ] Blocked
* [ ] Code Complete
* [ ] Tests Passed
* [ ] Reviewed
* [ ] Merged
* [x] Done

Only one status should be checked at a time.

## Objective

Create import staging records for uploaded/imported asset/document data before baseline approval.

## Context Files to Read First

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md
- docs/ai-context/02_PRODUCT_SCOPE_MVP_PLUS.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/07_DATA_MODEL_BASELINE.md
- docs/ai-context/08_API_CONVENTION.md
- docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md
- docs/ai-context/10_UI_UX_RULES.md
- docs/ai-context/11_WORKFLOW_RULES.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md

## Source Basis

- Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1
- PRD URS Pengembangan AIM Platform SBU AEBT, Rev. 1
- UI UX Design Pack & Prototype Pengembangan AIM Platform SBU AEBT, Rev. 1
- Addendum Penambahan Ruang Lingkup MVP+ Pengembangan AIM Platform SBU AEBT, Rev. 1

## Scope

- Extended Prisma schema with ImportBatch, ImportRow, and ValidationIssue foundation models.
- Added shared import batch/row/issue types and demo staged import records.
- Parser result always blocks direct baseline write.
- Preserve staged validation, source basis, document/evidence traceability, tenant isolation, RBAC, and audit logging.
- Support high-volume list/import patterns through pagination, table-first UI, and staged validation where applicable.

## Out of Scope

- Do not implement Release 2-4 workflow, inspection, certification, RBI/risk, evidence-pack, anomaly, or approval workflow tasks.
- Do not make final legal, certification, RBI, RLA, FFS, fit-for-operation, interval extension, risk acceptance, or asset safety decisions.
- Do not perform full historical migration.
- Do not run database migrations.
- Do not copy confidential source documents into the repository unless explicitly instructed.

## Allowed Files / Folders

- main/packages/shared/src/release-1.ts
- main/packages/shared/tests/release-1.test.ts
- main/packages/database/prisma/schema.prisma
- main/apps/api/src/data-foundation/
- main/apps/api/src/app.module.ts
- main/apps/web/src/components/AppShell.tsx
- main/seed/release-1-data-foundation.json
- main/scripts/migration-check.mjs
- main/scripts/verify-release-1.mjs
- main/scripts/release1-verify.mjs
- docs/tasks/release-1/
- docs/handoff/

## Protected Files / Folders

- Source documents outside E:\Project\AEBT's AIM Platform\Source Code
- docs/tasks/release-2/, docs/tasks/release-3/, docs/tasks/release-4/ except future release work
- Inspection, certification, RBI/risk, evidence-pack, anomaly, and approval workflow implementation files until their release tasks are active
- Package/dependency files unless justified and reviewed
- Architecture baseline and ADRs unless change is explicitly approved

## Functional Requirements

- Extended Prisma schema with ImportBatch, ImportRow, and ValidationIssue foundation models.
- Added shared import batch/row/issue types and demo staged import records.
- Parser result always blocks direct baseline write.
- Keep imported/extracted data out of approved baseline until validation and authorized review.
- Preserve draft/preliminary status for technical outputs.
- Record source basis and audit-relevant action context.

## Data Requirements

- Follow docs/ai-context/07_DATA_MODEL_BASELINE.md.
- Use tenant_id/project_id/site_id scope for operational records.
- Include data quality status, review status, source basis, and auditability fields for controlled data.
- Physical schema was updated as a Release 1 foundation only; migration execution remains pending UBT/IT approval.

## API Requirements

- Follow docs/ai-context/08_API_CONVENTION.md.
- Use REST/JSON response shape with metadata.
- Enforce tenant scope and RBAC before returning or staging records.
- Expose only Release 1 data-foundation endpoints; do not expose later-release business decision endpoints.

## UI/UX Requirements

- Follow docs/ai-context/10_UI_UX_RULES.md.
- Use table + drawer pattern, filter chips, dashboard-to-action counters, and empty/loading/error/access-denied state indicators where UI is in scope.
- Do not use misleading final technical decision labels.
- No full historical migration or baseline promotion was implemented.

## RBAC / Permission Requirements

- Needs UBT/IT + Project Owner Review for final matrix.
- Implemented least-privilege Release 1 permissions: asset.read, asset.write, document.read, document.upload, import.stage, validation.review.
- Tenant/project/site access scope is enforced through shared tenant context checks.

## Audit Trail Requirements

- Log read-sensitive, create/stage, upload intent, and validation queue access actions where applicable.
- Audit events must retain source basis and draft/preliminary decision boundary.
- Persistent audit storage remains part of later persistence hardening and migration execution.

## Validation Rules

- Validate required fields, tenant/project/site scope, data quality status, source basis, duplicate candidates, missing parent hierarchy, and status transitions where applicable.
- Import parser must capture validation issues and must not write directly to baseline.
- Document upload intent must validate required metadata before returning an object-storage key.

## Acceptance Criteria

* [x] Scope implemented exactly as described in this task.
* [x] Tenant isolation, RBAC, validation, and audit requirements are satisfied where applicable.
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

* Files changed: main/packages/shared/src/release-1.ts; main/packages/shared/tests/release-1.test.ts; main/packages/database/prisma/schema.prisma; main/apps/api/src/data-foundation/*; main/apps/api/src/app.module.ts; main/apps/web/src/components/AppShell.tsx; main/seed/release-1-data-foundation.json; main/scripts/migration-check.mjs; main/scripts/verify-release-1.mjs; main/scripts/release1-verify.mjs; main/README.md; docs/tasks/release-1/*; docs/handoff/*; docs/ai-context/06_RELEASE_PLAN_R0_R4.md; docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md; docs/ai-context/15_CHANGELOG_CONTEXT.md
* Implementation summary: Release 1 Data & Document Foundation implemented under main/ and verified with pnpm run release1:verify.
* Assumptions: Source documents support the logical R1 baseline; persistent migrations, native binary XLSX extraction, and real presigned object-storage uploads remain UBT/IT decisions.
* Tests run: pnpm run release1:verify; pnpm run lint; pnpm run typecheck; pnpm run test; pnpm run build; pnpm run migration:check; python -m compileall services/analytics/app.
* Known limitations: Source Code folder is not currently a Git repository; no database migrations were run; demo data is in-memory/static; no Release 2-4 workflow/business modules were implemented.
* Follow-up tasks: Begin Release 2 only after Project Owner approval; decide persistence/migration execution and object-storage provider details.
* Open questions: Final RBAC matrix, final physical schema/indexes, native XLSX binary parser requirement, object-storage presigned URL pattern, pilot dataset/site, and Git repository status.

