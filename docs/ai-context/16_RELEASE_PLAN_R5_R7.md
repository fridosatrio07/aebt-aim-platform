# Release Plan R5-R7

## Rationale For Splitting Release 5/6/7

Release 5 is front-end usability and design-system hardening only. Release 6 is persistence, API, and storage readiness. Release 7 is pilot readiness, security, UAT, and governance gate. Splitting prevents visual planning from silently becoming production integration or compliance approval work.

## Release 5 - Front-End Usability & Design System Hardening

### Objective

Make the AIM Platform front-end visually usable, consistent, credible, and ready for internal demo/UAT preparation while keeping unfinished business logic clearly marked as mock, disabled, API-ready, pending backend, draft/preliminary, or needs review.

### Dependencies

Release 0 through Release 4 foundations; UI/UX Design Pack; UI/UX Style & Design System Guideline; BPMN workflow pack; RBAC/audit specification; existing current web structure under main/apps/web.

### In Scope

- Route and navigation matrix.
- Reusable component contract.
- Mock data scenario contract.
- Page build specs.
- UI interaction state matrix.
- Functional boundary map.
- Front-end acceptance checklist.
- Documentation consistency cleanup planning.

### Out of Scope

Database migrations, production API integration, object storage integration, OIDC, final RBAC enforcement, final RBI methodology, final legal/compliance interpretation, staging/production deployment, UAT execution, and package/dependency changes.

### Exit Criteria

- [x] All Release 5 task files are completed after implementation and automated/self-review.
- [x] Front-end docs were used as implementation control documents.
- [x] Mock/API-ready/pending-backend boundaries are visible in UI implementation.
- [x] No unsupported final decision language is introduced.

### Task Index Summary

- [x] R5-01 - Front-End Documentation Consistency Fix
- [x] R5-02 - Route Navigation Matrix
- [x] R5-03 - Reusable Component Contract
- [x] R5-04 - Mock Data Scenario Contract
- [x] R5-05 - Page Build Spec: Dashboard & My Work
- [x] R5-06 - Page Build Spec: Asset, Document & Validation
- [x] R5-07 - Page Build Spec: Inspection, Certification & Evidence
- [x] R5-08 - Page Build Spec: RBI, Risk & Reviewer Queue
- [x] R5-09 - UI Interaction State Matrix
- [x] R5-10 - Front-End Acceptance Checklist

## Release 6 - Persistence, API & Storage Integration Readiness

Outline only. Do not implement in Release 5.

Focus:

- Physical database schema.
- Migration execution.
- API contract finalization.
- Repository/service layer.
- PostgreSQL/TimescaleDB integration.
- MinIO/S3-compatible object storage.
- Audit log persistence.
- Seed UAT dataset.
- API-client wiring.

Dependencies: Release 5 front-end contracts, UBT/IT review, final physical schema decisions, object storage provider decision, API contract review, RBAC scope model review.

Exit criteria outline: persistence/API/storage readiness verified in non-production environment, migrations reviewed, audit persistence tested, tenant isolation tested, no unsupported final decision logic introduced.

## Release 7 - Pilot Readiness, Security, UAT & Governance Gate

Outline only. Do not implement in Release 5.

Focus:

- RBAC finalization.
- Tenant isolation test.
- Security checklist.
- UAT scenario and scripts.
- Staging deployment readiness.
- Backup/restore procedure.
- Pilot dataset/site/client.
- Training material.
- Pilot operating metrics.
- SME/Legal/Q&C gate.

Dependencies: Release 6 integration readiness, Project Owner pilot decision, UBT/IT environment decision, Legal/Q&C review, engineer/inspector/SME review.

Exit criteria outline: pilot gate approved by required reviewers, UAT scripts ready, security checklist complete, staging/backup/restore readiness confirmed, and unresolved legal/SME items documented.

## Open Blockers

- Final RBAC matrix and approval authority.
- Final physical database schema and migrations.
- Final API contracts and persistence behavior.
- Final object storage provider and document access controls.
- Final RBI methodology/version baseline.
- Final legal/compliance clause validation.
- Final pilot dataset/site/client and UAT scripts.
- Current Release 4 hardening changes are uncommitted in the working tree.
- Documentation encoding/historical state cleanup remains needed.

## Anti-Hallucination Notes

- Do not invent requirements, formulas, clauses, workflows, roles, routes, approval authority, data entities, or legal/compliance interpretation.
- Use source-backed language and mark uncertainty explicitly.
- All technical outputs are draft/preliminary until authorized review.
- AIM Platform remains decision-support, workflow, evidence, audit, compliance-support, and reporting software; it does not automatically issue final technical, safety, legal, certification, RBI, RLA, FFS, interval extension, or risk acceptance decisions.

## Release 4 Documentation Consistency Check - 2026-06-27

Checked files: docs/tasks/TASK_INDEX.md, docs/ai-context/06_RELEASE_PLAN_R0_R4.md, docs/ai-context/15_CHANGELOG_CONTEXT.md, docs/tasks/release-4/README_RELEASE_4.md, Release 4 task packets, and main/package.json.

Findings:
- Release 4 is consistently marked complete in the task index, R0-R4 release plan, Release 4 README, and Release 4 task packets.
- main/package.json is visible as version 0.0.0-release-4 with release4:verify script available.
- docs/ai-context/15_CHANGELOG_CONTEXT.md includes both the 2026-06-26 Release 4 implementation entry and the 2026-06-27 Release 4 verification hardening entry.
- Repository working tree is dirty with uncommitted Release 4 hardening/application changes visible. Release 5 planning must not rewrite or revert those changes.
- Some existing task index and task packet title separators display mojibake/question-mark artifacts from previous encoding transitions. This should be corrected by a future documentation hygiene task, not silently changed in this planning pass.
- Historical handoff/task log entries for early releases still say Source Code was not a Git repository. Current inspection shows Source Code is a Git repository on branch main. Future documentation cleanup should preserve history while adding current-state clarification.

Conclusion: Release 4 completion state is broadly consistent, but documentation hygiene cleanup remains needed before Release 5 implementation. This is captured in R5-01.

## Release 5 Implementation Update - 2026-06-27

- Implemented Release 5 front-end usability and design-system hardening under `main/apps/web`.
- Added Release 5 frontend data contract and reusable UI primitives.
- Kept implementation single-route and mock/API-ready; production routing, persistence, object storage, OIDC, final RBAC, final RBI methodology, and legal/certification decisions remain out of scope.
- Required automated checks passed: lint, typecheck, test, build, migration check, analytics check, `pnpm run release4:verify`, and `node scripts/verify-release-4.mjs`.
- Manual Project Owner, UBT/IT, Legal/Q&C, engineer/inspector/SME review remains open.
