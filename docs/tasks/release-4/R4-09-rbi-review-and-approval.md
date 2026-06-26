# R4-09 — RBI Review and Approval

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

Create review/approval workflow for RBI outputs preserving human final decision boundary and audit trail.

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
* Implementation summary: Implemented submitForReview, approveAssessment, and rejectAssessment methods on Release4IntegrityFoundation. Approval produces 'approved_preliminary' (not final approval). Rejection returns assessment to 'data_gathering' state. All transitions assert not final decision and generate audit events.
* Assumptions: Reviewer permissions assigned to platform_administrator, qc_reviewer, and management_reviewer roles.
* Tests run: Tests cover submit, approve, reject, and final-decision guard.
* Known limitations: No final approval authority defined.
* Follow-up tasks: Link to R2 approval workflow.
* Open questions: Final reviewer authority matrix.