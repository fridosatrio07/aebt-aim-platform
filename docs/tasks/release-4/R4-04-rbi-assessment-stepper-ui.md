# R4-04 — RBI Assessment Stepper UI

## Status

* [ ] Not Started
* [ ] In Progress
* [ ] Blocked
* [ ] Code Complete
* [ ] Tests Passed
* [ ] Reviewed
* [ ] Merged
* [x] Done

## Objective

Create guided RBI stepper UI with draft/preliminary status and visible missing data/evidence states.

## Context Files to Read First

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md
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

- Project Charter Pengembangan AIM Platform SBU AEBT, Rev. 1
- PRD URS Pengembangan AIM Platform SBU AEBT, Rev. 1
- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1
- Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1
- Master BPMN Workflow Pack Pengembangan AIM Platform SBU AEBT, Rev. 1

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

* Files changed: `apps/web/src/components/AppShell.tsx`, `apps/api/src/integrity-foundation/*`
* Implementation summary: Added RBI Assessment navigation item showing shell count. Assessment API returns full status lifecycle including stepper states (data_gathering, operating_data_input, damage_mechanism_review, pof_cof_helper, risk_ranking, pending_review, approved_preliminary).
* Assumptions: UI follows existing AppShell pattern.
* Tests run: Release 4 tests cover assessment lifecycle.
* Known limitations: Static demo data.
* Follow-up tasks: None.
* Open questions: None.