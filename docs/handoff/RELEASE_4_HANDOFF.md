# Release 4 Handoff Notes

## Release Summary

Release 4 implements the Integrity/RBI Controlled Skeleton for the AIM Platform. This release creates controlled RBI and integrity workflow skeletons without final technical decision automation.

## What Was Built

- **RBI Candidate Routing Schema (R4-01)**: Schema, types, dataset, and API for identifying and routing RBI candidates based on approved scoping flags (criticality, statutory, risk indicator, client request, SME recommendation).
- **RBI Candidate UI (R4-02)**: Navigation and data table components integrated into the AppShell for filtering and viewing RBI candidates with draft/preliminary boundaries.
- **RBI Assessment Shell (R4-03)**: Assessment data model tracking status (data gathering, operating data input, damage mechanism review, PoF/CoF helper, risk ranking, pending review, approved preliminary), methodology status, and reviewer role.
- **RBI Assessment Stepper UI (R4-04)**: Assessment listing with assessment status, methodology status, and detail views in the UI.
- **Operating Data Input (R4-05)**: Operating parameter input with unit validation, data quality status, and audit traceability.
- **Damage Mechanism Review Placeholder (R4-06)**: Placeholder workflow requiring SME input, with susceptible=TBD SME status.
- **PoF/CoF Helper Interface (R4-07)**: Helper interface contract recording inputs/results as draft data with methodology TBD.
- **Preliminary Risk Ranking Record (R4-08)**: Risk ranking record storing draft/preliminary results with review and approval state.
- **RBI Review and Approval (R4-09)**: Submit-for-review, approve (preliminary), and reject workflow preserving human final decision boundary and audit trail.
- **Risk Register Linkage (R4-10)**: Risk register items linked to RBI assessments with risk level, category, mitigation tracking, and close-out status.

## Files Changed

### New Files
- `packages/shared/src/release-4.ts` - Core types, dataset, and Release4IntegrityFoundation class
- `packages/shared/tests/release-4.test.ts` - Release 4 shared tests
- `apps/api/src/integrity-foundation/integrity-foundation.module.ts` - NestJS module
- `apps/api/src/integrity-foundation/integrity-foundation.service.ts` - NestJS service
- `apps/api/src/integrity-foundation/integrity-foundation.controller.ts` - NestJS controller with REST endpoints under `/integrity`
- `scripts/verify-release-4.mjs` - Release 4 verification checks
- `scripts/release4-verify.mjs` - Release 4 verification runner

### Modified Files
- `packages/shared/src/index.ts` - Added release-4 export
- `packages/shared/src/rbac.ts` - Added RBI permissions (rbi.candidate.read/manage, rbi.assessment.read/manage/approve, rbi.operatingdata.read, rbi.damagemechanism.read, rbi.pofcof.read, rbi.riskranking.read, rbi.riskregister.read)
- `apps/api/src/app.module.ts` - Registered IntegrityFoundationModule
- `apps/web/src/components/AppShell.tsx` - Added RBI Candidates, RBI Assessment, Risk Register, Integrity Dashboard navigation items
- `package.json` - Updated version to release-4, added release4:verify script

## Key Architecture Decisions

1. All RBI/integrity outputs are marked `draft_preliminary_only` in the decision boundary.
2. Methodology status defaults to `tbd_sme_approval` - no RBI formulas are implemented.
3. PoF/CoF results are stored as `tbd_sme` with methodology ref notes.
4. Damage mechanisms default to `placeholder_sme_input` requiring SME input.
5. Risk ranking can be submitted for review, approved (preliminary), or rejected back to data gathering.
6. Permissions follow the existing RBAC pattern with new Release 4 specific permissions.

## API Endpoints

All endpoints are under `/integrity`:
- `GET /integrity/rbi-candidates` - List RBI candidates
- `GET /integrity/rbi-candidates/:id` - Get RBI candidate detail
- `GET /integrity/assessments` - List assessments
- `GET /integrity/assessments/:id` - Get assessment detail
- `GET /integrity/assessments/:assessmentId/operating-data` - List operating data
- `GET /integrity/assessments/:assessmentId/damage-mechanisms` - List damage mechanisms
- `GET /integrity/assessments/:assessmentId/pof-cof-helper` - Get PoF/CoF helper
- `GET /integrity/assessments/:assessmentId/risk-ranking` - Get risk ranking
- `POST /integrity/assessments/:assessmentId/submit-review` - Submit for review
- `POST /integrity/assessments/:assessmentId/approve` - Approve (preliminary)
- `POST /integrity/assessments/:assessmentId/reject` - Reject with reason
- `GET /integrity/assessments/:assessmentId/risk-register` - List risk register items
- `GET /integrity/integrity-audit-events` - List audit events

## Assumptions

1. No database migrations were run - demo data uses in-memory static dataset.
2. RBI methodology baseline remains TBD (OD-006 / OD-018).
3. PoF/CoF formulas are not implemented - only helper interface placeholders.
4. Damage mechanism rules are not encoded - SME input is required.
5. Risk acceptance criteria remain open for SME/Project Owner review.
6. Browser visual QA was not run in this turn.

## Tests Run

- Release 4 shared tests cover: candidate listing, tenant isolation, candidate detail, assessment listing, operating data, damage mechanisms, PoF/CoF helper, risk ranking, submit for review, approve (preliminary), reject, risk register linkage.
- See `packages/shared/tests/release-4.test.ts` for full test suite.

## Known Limitations

1. No persistent database - uses static in-memory demo data.
2. No Prisma schema updates for Release 4 entities (follows R0-R3 pattern).
3. Methodology formula details remain TBD until SME-approved (OD-006).
4. Risk acceptance criteria changes are out of scope.
5. Interval extension approval is out of scope.

## Open Follow-up

- Final migration execution (OD-016 pattern).
- Final physical schema/indexes.
- Final API/RBAC contracts.
- SME-approved RBI methodology baseline (OD-006).
- Release 4 start gate closure (OD-018).
- Production deployment environment.
- Pilot dataset validation.

## Open Questions

- When will SME-approved RBI methodology baseline be available?
- Should risk register items be auto-created or manually linked?
- What is the final risk acceptance criteria matrix?