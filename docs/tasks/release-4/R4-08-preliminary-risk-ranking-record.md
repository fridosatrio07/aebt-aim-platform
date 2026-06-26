# R4-08 — Preliminary Risk Ranking Record

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

Create preliminary risk ranking record that stores draft/preliminary results with review and approval state.

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

* Files changed: `packages/shared/src/release-4.ts`, `apps/api/src/integrity-foundation/*`
* Implementation summary: Created RiskRankingRecord type with PoF level, CoF level, overall risk level (low/medium/high/critical/tbd_sme), review status lifecycle (draft_ranking, pending_review, reviewed_preliminary, approved_preliminary), and reviewer role. Default risk level is tbd_sme.
* Assumptions: Risk levels are representative placeholders.
* Tests run: Tests verify risk ranking returns TBD SME status.
* Known limitations: No risk matrix calculation.
* Follow-up tasks: Final risk acceptance criteria.
* Open questions: Risk acceptance criteria matrix.