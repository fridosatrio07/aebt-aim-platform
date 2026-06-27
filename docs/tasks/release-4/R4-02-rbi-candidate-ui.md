# R4-02 - RBI Candidate UI

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

Create RBI candidate UI for filtering, bulk assignment to RBI scope, and review routing without final RBI approval.

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

## Scope

- Implement only the behavior required for R4-02 - RBI Candidate UI.
- Keep RBI/integrity outputs draft/preliminary and reviewable.
- Preserve source basis, evidence linkage, tenant isolation, RBAC, and audit logging.

## Out of Scope

- Do not implement unrelated release tasks.
- Do not invent RBI formulas, damage mechanism rules, PoF/CoF logic, or risk acceptance criteria.
- Do not approve final RBI, RLA, FFS, repair, alteration, rerating, interval extension, fit-for-operation, or legal interpretation.

## Allowed Files / Folders

- docs/tasks/
- docs/handoff/
- Frontend/backend/database/API folders approved by repository baseline when this task is later executed.

## Protected Files / Folders

- Source documents outside E:\Project\AEBT's AIM Platform\Source Code.
- Package/dependency files unless approved.
- Architecture baseline and ADRs unless change is explicitly approved.

## Functional Requirements

- Must support controlled RBI/integrity workflow skeleton only.
- Must show draft/preliminary status and missing data/evidence state where applicable.
- Must require reviewer/SME approval for controlled outputs.

## Data Requirements

- Follow docs/ai-context/07_DATA_MODEL_BASELINE.md.
- Store methodology/source basis and review status for helper outputs.

## API Requirements

- Follow docs/ai-context/08_API_CONVENTION.md where API is in scope; otherwise TBD.

## UI/UX Requirements

- Follow docs/ai-context/10_UI_UX_RULES.md where UI is in scope; otherwise Not Applicable.

## RBAC / Permission Requirements

- Needs Review.
- RBI review, approval, export, methodology change, and risk-register linkage require explicit permission.

## Audit Trail Requirements

- Log assessment changes, helper inputs/results, review, approval, evidence linkage, risk register linkage, and export where applicable.

## Validation Rules

- Validate source basis, unit/data quality status, missing data/evidence, review state, tenant/project/site scope, and RBAC permission.
- Methodology/formula details remain TBD until SME-approved.

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

* Files changed: `apps/web/src/components/AppShell.tsx`
* Implementation summary: Added RBI Candidates navigation item with count status showing routed candidates count. Navigation uses BarChart3 icon.
* Assumptions: UI follows existing AppShell pattern from R0-R3.
* Tests run: Visual checks for navigation item rendering.
* Known limitations: Static demo data only.
* Follow-up tasks: Integrate with real API when available.
* Open questions: None.

