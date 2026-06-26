# R4-10 — Risk Register Linkage

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

Link RBI assessment/risk ranking to risk register items, recommendations, action owners, evidence, and close-out status.

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

* Files changed: `packages/shared/src/release-4.ts`, `apps/api/src/integrity-foundation/*`, `apps/web/src/components/AppShell.tsx`
* Implementation summary: Created RiskRegisterItemRecord type linked to assessments with risk level, category (technical, safety, environmental, compliance, operational, reputation), status lifecycle (identified, assessed_preliminary, mitigation_planned, mitigation_in_progress, closed_preliminary), action owner, due date, and evidence pack linkage. Added Risk Register navigation item in UI.
* Assumptions: Risk register items are assessed_preliminary until SME review.
* Tests run: Tests verify risk register items return with proper category and boundary.
* Known limitations: No automatic risk register creation.
* Follow-up tasks: Integrate with evidence pack builder.
* Open questions: Risk acceptance criteria.