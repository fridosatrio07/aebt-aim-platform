# R5-04 - Mock Data Scenario Contract

## Status

* [ ] Not Started
* [ ] In Progress
* [ ] Blocked
* [ ] Documentation Complete
* [ ] Ready for Implementation
* [ ] Code Complete
* [ ] Tests Passed
* [ ] Reviewed
* [ ] Merged
* [x] Done

## Objective

Define one consistent dummy/pilot scenario used across Release 5 front-end pages.

## Context Files to Read First

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/10_UI_UX_RULES.md
- docs/ai-context/11_WORKFLOW_RULES.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md
- docs/ai-context/16_RELEASE_PLAN_R5_R7.md
- docs/tasks/release-5/README_RELEASE_5.md
- docs/frontend/FRONTEND_PAGE_BUILD_SPEC.md
- docs/frontend/ROUTE_NAVIGATION_MATRIX.md
- docs/frontend/REUSABLE_COMPONENT_CONTRACT.md
- docs/frontend/MOCK_DATA_SCENARIO_CONTRACT.md
- docs/frontend/UI_INTERACTION_STATE_MATRIX.md
- docs/frontend/FUNCTIONAL_BOUNDARY_MAP.md
- docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md

## Source Basis

- Kajian Analisis Pengembangan AIM Platform SBU AEBT, Rev. A.
- Project Charter Pengembangan AIM Platform SBU AEBT, Rev. 1.
- BRD Pengembangan AIM Platform SBU AEBT, Rev. 1.
- PRD URS Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Master BPMN Workflow Pack Pengembangan AIM Platform SBU AEBT, Rev. 1.
- UI UX Design Pack & Prototype Pengembangan AIM Platform SBU AEBT, Rev. 1.
- UI UX Style & Design System Guideline Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Addendum Penambahan Ruang Lingkup MVP+ Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.
- RBAC, Permission Approval, & Audit Log Specification AIM Platform SBU AEBT Rev. 1.
- Existing repository files under main/apps/web, main/package.json, and docs/.

## Scope

Document tenant, client, project, site/facility, assets, documents, inspections, certificates, RBI assessments, risk items, recommendations, actions, evidence packs, reviewer queue items, audit trail, notifications, and helpdesk tickets.

## Out of Scope

- Database migrations, physical schema finalization, dependency/package changes, production API integration, object storage integration, OIDC implementation, final RBAC enforcement, staging/production deployment, UAT execution, and security test execution.
- Final RBI, RLA, FFS, certification/PLO, fit-for-operation, inspection interval extension, risk acceptance, or legal/compliance decision logic.

## Allowed Files / Folders

- docs/frontend/**
- docs/tasks/release-5/**
- docs/tasks/TASK_INDEX.md
- docs/ai-context/15_CHANGELOG_CONTEXT.md
- docs/ai-context/16_RELEASE_PLAN_R5_R7.md
- docs/handoff/TASK_COMPLETION_LOG.md
- main/apps/web/** only during a later explicitly approved implementation task.

## Protected Files / Folders

- main/package.json, lockfiles, and workspace package files unless approved.
- main/packages/database/prisma/** unless a later Release 6 task authorizes schema/migration work.
- main/apps/api/** unless a later API integration task authorizes backend work.
- Source documents outside the repository.
- ADRs and architecture baseline unless explicit approval exists.

## Functional Requirements

- Maintain tenant/project/site context visibility.
- Preserve role-aware, task-first, table-led, batch-first, dashboard-to-action, evidence-first, and audit-ready workflows.
- Label mock/static/API-ready/pending-backend/disabled behavior clearly.
- Keep technical outputs draft/preliminary until authorized review.

## UI/UX Requirements

Ensure all mock pages use the same scenario labels and non-final status language.

## Data / Mock Data Requirements

Use Draft, Pending Review, Preliminary, Data Gap, Limited Basis, Missing Evidence, Due Soon, Overdue, Rejected, Revision Required, and Approved for Export only where appropriate.

## API / Backend Boundary

Mock-data planning only. No seed/source code changes unless later implementation task approves them.

## RBAC / Permission Notes

Role visibility and permission behavior require final RBAC review. Mark final navigation/access matrix as Needs RBAC Review until UBT/IT and Project Owner approve it.

## Audit / Evidence / Traceability Notes

UI surfaces must expose evidence linkage, source basis, status history, export/review warnings, and audit trail panels where applicable. No action should hide its audit or review implication.

## Draft / Preliminary Decision Guardrail

The UI must not claim final asset safety, fit-for-operation, layak operasi, final certification/PLO readiness, final RBI/RLA/FFS result, interval extension approval, risk acceptance, or final legal/compliance interpretation. Use Draft, Preliminary, Needs Review, Limited Basis, Data Gap, Pending Review, Revision Required, or Approved for Export only where appropriate.

## Acceptance Criteria

* [x] Scope is implemented or documented exactly as approved for this task.
* [x] UI labels and states distinguish mock, API-ready, pending backend, disabled, draft/preliminary, and needs-review behavior.
* [x] No unsupported domain, legal, compliance, RBI, certification, RLA, FFS, safety, interval extension, or risk-acceptance decision logic is introduced.

## Required Checks

* [x] Documentation updated
* [x] Source code changes stayed within approved Release 5 frontend implementation scope
* [x] No unsupported domain logic introduced
* [x] No final technical/legal/certification decision introduced
* [x] Handoff notes updated

## Handoff Notes

* Files changed: main/apps/web/app/globals.css; main/apps/web/app/layout.tsx; main/apps/web/src/components/AppShell.tsx; main/apps/web/src/components/release5-data.ts; main/apps/web/src/components/release5-ui.tsx; docs/tasks/release-5/*; docs/frontend/*; docs/tasks/TASK_INDEX.md; docs/ai-context/15_CHANGELOG_CONTEXT.md; docs/ai-context/16_RELEASE_PLAN_R5_R7.md; docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md; docs/handoff/*.
* Summary: Centralized the Release 5 SPM-01 mock scenario in release5-data.ts using existing R1-R4 shared foundations without inventing new domain records.
* Assumptions: Release 5 remains single-route frontend hardening using mock/static shared foundations; production routing, persistence, object storage, final RBAC, final RBI methodology, and legal/certification decisions remain future review gates.
* Tests/checks run: pnpm run lint; pnpm run typecheck; pnpm run test; pnpm run build; pnpm run migration:check; pnpm run analytics:check; pnpm run release4:verify; node scripts/verify-release-4.mjs.
* Known limitations: Manual Project Owner, UBT/IT, Legal/Q&C, engineer/inspector/SME review remains open. No Release 5-specific verifier script was added because package files were protected.
* Follow-up tasks: Release 6 should handle persistence/API/storage readiness; Release 7 should handle pilot security/UAT/governance gates.
* Open questions: Final route URLs, final role navigation visibility, final design-token governance, and pilot/UAT acceptance owner remain TBD.
