# R2-04 - Reviewer Work Queue Backend

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

Create backend support for reviewer work queue aggregating pending review/approval items across modules.

## Context Files to Read First

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/08_API_CONVENTION.md
- docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md
- docs/ai-context/10_UI_UX_RULES.md
- docs/ai-context/11_WORKFLOW_RULES.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md

## Source Basis

- Master BPMN Workflow Pack Pengembangan AIM Platform SBU AEBT, Rev. 1
- Addendum Penambahan Ruang Lingkup MVP+ Pengembangan AIM Platform SBU AEBT, Rev. 1
- UI UX Design Pack & Prototype Pengembangan AIM Platform SBU AEBT, Rev. 1
- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1

## Scope

- Added Release2WorkflowFoundation.listReviewerQueue for pending review, revision-requested, and escalated items.
- Reviewer queue records include authority, aging, due state, evidence preview, comments, and history.
- Exposed GET /v1/workflow/reviewer-queue and tests for reviewer authority filtering.
- Support task-first, role-based, queue-driven, dashboard-to-action operation.
- Preserve tenant isolation, RBAC checks, audit logging, and draft/preliminary domain boundaries.

## Out of Scope

- Do not implement Release 3-4 inspection, certification, RBI/risk, evidence-pack builder, anomaly, or integrity assessment tasks.
- Do not automate final technical, compliance, legal, RBI, certification, RLA, FFS, risk acceptance, fit-for-operation, or safety decisions.
- Do not create notification floods per equipment; use digest/grouping only.
- Do not run database migrations.
- Do not add notification delivery channels, advanced SLA engine, or final KPI definitions.

## Allowed Files / Folders

- main/packages/shared/src/release-2.ts
- main/packages/shared/tests/release-2.test.ts
- main/packages/shared/src/rbac.ts
- main/packages/shared/src/types.ts
- main/packages/database/prisma/schema.prisma
- main/apps/api/src/workflow-foundation/
- main/apps/api/src/app.module.ts
- main/apps/api/src/foundation/foundation.service.ts
- main/apps/web/src/components/AppShell.tsx
- main/seed/release-2-workflow-foundation.json
- main/scripts/migration-check.mjs
- main/scripts/verify-release-2.mjs
- main/scripts/release2-verify.mjs
- docs/tasks/release-2/
- docs/handoff/

## Protected Files / Folders

- Source documents outside E:\Project\AEBT's AIM Platform\Source Code
- docs/tasks/release-3/ and docs/tasks/release-4/ except future release work
- Inspection, certification, RBI/risk, evidence-pack builder, anomaly, and module-specific final approval implementation files until their release tasks are active
- Package/dependency files unless justified and reviewed
- Architecture baseline and ADRs unless change is explicitly approved

## Functional Requirements

- Added Release2WorkflowFoundation.listReviewerQueue for pending review, revision-requested, and escalated items.
- Reviewer queue records include authority, aging, due state, evidence preview, comments, and history.
- Exposed GET /v1/workflow/reviewer-queue and tests for reviewer authority filtering.
- Support high-volume operation through work queues, filtered action lists, saved views, digest grouping, and dashboard-to-action cards where applicable.
- Keep reviewer/approver activity auditable.
- Keep all approvals generic and non-final.

## Data Requirements

- Use action/review/export data with tenant/project/site scope and linked object references.
- Include priority, due date, owner role, required authority, status, source basis, created/updated metadata, and audit-relevant identifiers.
- Physical schema was updated as a Release 2 foundation only; migration execution remains pending UBT/IT approval.

## API Requirements

- Follow docs/ai-context/08_API_CONVENTION.md.
- Use REST/JSON response shape with metadata.
- Enforce tenant scope and RBAC before returning, routing, approving, digesting, or logging records.
- Expose only Release 2 workflow endpoints; do not expose Release 3-4 business decision endpoints.

## UI/UX Requirements

- Follow docs/ai-context/10_UI_UX_RULES.md.
- Use task-first layout, dashboard-to-action cards, table + drawer pattern, filter chips, and empty/loading/error/access-denied state indicators where UI is in scope.
- Do not use misleading final technical decision labels.
- Reviewer queue is generic and does not perform final domain approval.

## RBAC / Permission Requirements

- Needs UBT/IT + Project Owner Review for final matrix.
- Implemented least-privilege Release 2 permissions: action.read, action.manage, review.queue.read, workflow.transition, notification.digest.read, dashboard.read, export.create, export.read.
- Tenant/project/site access scope is enforced through shared tenant context checks.

## Audit Trail Requirements

- Log read-sensitive queue access, workflow review/approve/reject/revision/delegate/escalate, notification digest creation, dashboard access, and export logging where applicable.
- Audit events must retain source basis and draft/preliminary decision boundary.
- Persistent audit storage remains part of later persistence hardening and migration execution.

## Validation Rules

- Validate tenant/project/site scope, required authority, status transitions, linked object, purpose/source basis, and review/approval eligibility.
- Generic approve transitions may only mark a workflow as approved_for_next_step.
- Notification digest must group items and avoid per-equipment floods.
- Export log must not generate or imply final reports.

## Acceptance Criteria

* [x] Scope implemented exactly as described in this task.
* [x] Tenant isolation, RBAC, workflow, and audit requirements are satisfied where applicable.
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

* Files changed: main/packages/shared/src/release-2.ts; main/packages/shared/tests/release-2.test.ts; main/packages/shared/src/rbac.ts; main/packages/shared/src/types.ts; main/packages/database/prisma/schema.prisma; main/apps/api/src/workflow-foundation/*; main/apps/api/src/app.module.ts; main/apps/api/src/foundation/foundation.service.ts; main/apps/web/src/components/AppShell.tsx; main/seed/release-2-workflow-foundation.json; main/scripts/migration-check.mjs; main/scripts/verify-release-2.mjs; main/scripts/release2-verify.mjs; main/package.json; main/README.md; docs/tasks/release-2/*; docs/handoff/*; docs/ai-context/06_RELEASE_PLAN_R0_R4.md; docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md; docs/ai-context/15_CHANGELOG_CONTEXT.md
* Implementation summary: Release 2 Work Queue & Operational Flow implemented under main/ and verified with pnpm run release2:verify.
* Assumptions: Source documents support a generic workflow/action foundation; persistent migrations, notification delivery channels, final workflow rules, SLA thresholds, and module-specific approvals remain UBT/IT/Project Owner/SME decisions.
* Tests run: pnpm run release2:verify; pnpm run lint; pnpm run typecheck; pnpm run test; pnpm run build; pnpm run migration:check; python -m compileall services/analytics/app.
* Known limitations: Source Code folder is not currently a Git repository; no database migrations were run; demo data is in-memory/static; no Release 3-4 business modules or final domain decision logic were implemented.
* Follow-up tasks: Begin Release 3 only after Project Owner approval; decide persistence/migration execution, notification delivery policy, final SLA/threshold rules, and export approval policy.
* Open questions: Final RBAC matrix, final physical schema/indexes, notification digest schedule/suppression policy, export approval workflow, pilot operating metrics, and Git repository status.
