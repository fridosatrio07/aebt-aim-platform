# R4-05 - Operating Data Input

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

Create operating data input foundation with source, unit validation, data quality status, review status, and audit traceability.

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
* Implementation summary: Created OperatingDataRecord type with unit validation (barg, degc, mm, etc.), dataQualityStatus, reviewStatus, and listOperatingData endpoint.
* Assumptions: Unit types are representative placeholders; final list TBD.
* Tests run: Tests verify operating data listing and boundary.
* Known limitations: No write API yet.
* Follow-up tasks: Add CRUD operations.
* Open questions: Final unit list.
