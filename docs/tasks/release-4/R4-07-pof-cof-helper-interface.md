# R4-07 - PoF CoF Helper Interface

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

Create PoF/CoF helper interface contract that records inputs/results as draft helper data with source basis and methodology TBD.

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
* Implementation summary: Created PofCofHelperRecord type with PoF/CoF input summaries, result levels (low/medium/high/tbd_sme), methodology refs pointing to TBD SME approval. Helper status is draft_helper until reviewed. No automatic calculations.
* Assumptions: PoF/CoF formulas are not implemented - pure placeholder interface.
* Tests run: Tests verify PoF/CoF helper returns draft status with TBD methodology.
* Known limitations: No calculation engine.
* Follow-up tasks: Implement formulas after SME methodology approval (OD-006).
* Open questions: Expected completion date for SME methodology baseline?
