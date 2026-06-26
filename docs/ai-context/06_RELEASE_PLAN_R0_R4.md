# Release Plan R0-R4

## Release 0: Platform Foundation

### Objective

Establish the technical, governance, and UI foundation required before business modules are built.

### Why It Exists

Prevents uncontrolled implementation by setting environment, database, API, tenant/RBAC, audit, UI shell, seed data, and quality gate baselines.

### In Scope

- Repo and environment baseline.
- Database foundation.
- API convention.
- Tenant context and access scope.
- RBAC foundation.
- Audit log foundation.
- Global UI shell.
- Seed dummy project SPM-01.
- CI quality gates.

### Out of Scope

- Business feature completion.
- RBI calculations.
- Certification workflows.
- Full data import.
- Release 1-4 module delivery.

### Dependencies

- Confirmed repository baseline.
- Approved stack.
- Project Owner and UBT/IT decisions where TBD exists.

### Exit Criteria

- Repo baseline documented.
- Environment can run with agreed commands.
- Tenant/RBAC/audit foundations are testable.
- No unsupported final decision behavior introduced.

### Risk of Refactoring If Skipped

Skipping R0 risks reworking tenant isolation, RBAC, audit, API conventions, UI shell, and quality gates after modules depend on them.

### Task List

- [x] R0-01 - Repo and Environment Baseline
- [x] R0-02 - Database Foundation
- [x] R0-03 - API Convention
- [x] R0-04 - Tenant Context and Access Scope
- [x] R0-05 - RBAC Foundation
- [x] R0-06 - Audit Log Foundation
- [x] R0-07 - Global UI Shell
- [x] R0-08 - Seed Dummy Project SPM-01
- [x] R0-09 - CI Quality Gates



### Release 0 Completion Note

Release 0 implementation was completed on 2026-06-26 under `main/`. Full verification passed with `pnpm run release0:verify`. No Release 1-4 business modules, migrations, or unsupported final-decision logic were implemented.

## Release 1: Data & Document Foundation

### Objective

Build asset, document, import, and validation foundations for controlled data intake.

### Why It Exists

AIM Platform depends on trustworthy asset and document data before workflow and RBI features can be meaningful.

### In Scope

- Asset hierarchy schema.
- Asset registry list API/UI.
- Asset detail shell.
- Document metadata and upload.
- Document repository UI.
- Import staging.
- Excel/CSV import parser.
- Validation queue UI.

### Out of Scope

- Advanced analytics.
- Final RBI.
- Certification final decision.
- Full historical migration.

### Dependencies

- Release 0.
- Data model baseline.
- UI/UX rules.
- Source document traceability.

### Exit Criteria

- Assets and documents can be represented in controlled baseline.
- Imports remain staged until validation.
- Evidence links and audit requirements are respected.

### Risk of Refactoring If Skipped

Skipping R1 risks building workflows on weak data lineage, missing evidence linkage, and ungoverned imports.

### Task List

- [x] R1-01 - Asset Hierarchy Schema
- [x] R1-02 - Asset Registry List API
- [x] R1-03 - Asset Registry UI List
- [x] R1-04 - Asset Detail Shell
- [x] R1-05 - Document Metadata Schema
- [x] R1-06 - Document Upload API
- [x] R1-07 - Document Repository UI
- [x] R1-08 - Import Staging Schema
- [x] R1-09 - Excel CSV Import Parser
- [x] R1-10 - Validation Queue UI

Release 1 implementation was completed on 2026-06-26 under `main/`. Full verification passed with `pnpm run release1:verify`. No Release 2-4 modules, database migrations, or unsupported final-decision logic were implemented.

## Release 2: Work Queue & Operational Flow

### Objective

Deliver task/action mechanics, reviewer queues, approval workflow foundation, notifications, dashboard-to-action, and export logging.

### Why It Exists

High-volume operation requires work queues and exception-driven flow before deeper business modules scale.

### In Scope

- Generic action item model.
- My Work API/UI.
- Reviewer work queue backend/UI.
- Generic approval workflow.
- Notification digest skeleton.
- Dashboard-to-action shell.
- Export log foundation.

### Out of Scope

- Module-specific final approvals.
- Notification flood per equipment.
- Advanced SLA engine.
- Final compliance decisions.

### Dependencies

- Release 0.
- Release 1.
- Workflow rules.
- RBAC/audit baseline.

### Exit Criteria

- Users can work from prioritized queues.
- Reviewer queues aggregate pending items.
- Approvals and exports are logged.
- No final domain decision is automated.

### Risk of Refactoring If Skipped

Skipping R2 risks turning later modules into page-by-page manual systems instead of task-first workflows.

### Task List

- [x] R2-01 - Generic Action Item Model
- [x] R2-02 - My Work API
- [x] R2-03 - My Work UI
- [x] R2-04 - Reviewer Work Queue Backend
- [x] R2-05 - Reviewer Work Queue UI
- [x] R2-06 - Approval Workflow Generic
- [x] R2-07 - Notification Digest Skeleton
- [x] R2-08 - Dashboard to Action Shell
- [x] R2-09 - Export Log Foundation

Release 2 implementation was completed on 2026-06-26 under `main/`. Full verification passed with `pnpm run release2:verify`. No Release 3-4 modules, database migrations, notification delivery channels, or unsupported final-decision logic were implemented.

## Release 3: First Business Modules

### Objective

Implement first operational business modules for inspection, workpacks, certification register, evidence checklist/pack, and KPI wiring.

### Why It Exists

These modules convert the platform foundation into business-usable inspection/certification/evidence workflows.

### In Scope

- Inspection due model/tracking.
- Inspection tracking API/UI.
- Workpack skeleton.
- Certification schema/register API/UI.
- Evidence checklist basic.
- Evidence pack builder basic.
- Dashboard KPI wiring.

### Out of Scope

- Automatic certification/PLO.
- Final layak operasi.
- Advanced RBI.
- FFS/RLA.
- Interval extension approval.

### Dependencies

- Release 0.
- Release 1.
- Release 2.
- Domain guardrails.

### Exit Criteria

- Inspection and certification statuses are traceable.
- Evidence pack supports review.
- Dashboard links to actions.
- Human final decision boundary is preserved.

### Risk of Refactoring If Skipped

Skipping R3 risks delaying the first value-bearing operational modules and dashboard evidence loops.

### Task List

- [x] R3-01 - Inspection Due Model
- [x] R3-02 - Inspection Tracking API
- [x] R3-03 - Inspection Tracking UI
- [x] R3-04 - Workpack Skeleton
- [x] R3-05 - Certification Schema
- [x] R3-06 - Certification Register API
- [x] R3-07 - Certification Register UI
- [x] R3-08 - Evidence Checklist Basic
- [x] R3-09 - Evidence Pack Builder Basic
- [x] R3-10 - Dashboard KPI Wiring

Release 3 implementation was completed on 2026-06-26 under main/. Full verification passed with pnpm run release3:verify. No database migrations, Release 4 RBI/risk/anomaly modules, final inspection/certification decisions, interval extension logic, or unsupported final-decision logic were implemented.

## Release 4: Integrity/RBI Controlled Skeleton

### Objective

Create controlled RBI and integrity workflow skeletons without final technical decision automation.

### Why It Exists

RBI support must be governed, staged, reviewable, and linked to evidence/risk before advanced analytics are considered.

### In Scope

- RBI candidate routing.
- RBI candidate UI.
- RBI assessment shell.
- RBI stepper UI.
- Operating data input.
- Damage mechanism review placeholder.
- PoF/CoF helper interface.
- Preliminary risk ranking record.
- RBI review and approval.
- Risk register linkage.

### Out of Scope

- Final RBI methodology approval.
- Automatic PoF/CoF formulas not source-approved.
- Final RBI/RLA/FFS decision.
- Risk acceptance criteria change.
- Interval extension approval.

### Dependencies

- Release 0.
- Release 1.
- Release 2.
- Release 3.
- SME-approved RBI methodology baseline.

### Exit Criteria

- RBI records are draft/preliminary.
- Reviewer approval controls are in place.
- Risk register linkage exists.
- No unsupported formula or final decision is introduced.

### Risk of Refactoring If Skipped

Skipping R4 risks implementing RBI screens or calculations without proper review, evidence, risk register, and domain guardrail controls.

### Task List

- [x] R4-01 - RBI Candidate Routing Schema
- [x] R4-02 - RBI Candidate UI
- [x] R4-03 - RBI Assessment Shell
- [x] R4-04 - RBI Assessment Stepper UI
- [x] R4-05 - Operating Data Input
- [x] R4-06 - Damage Mechanism Review Placeholder
- [x] R4-07 - PoF CoF Helper Interface
- [x] R4-08 - Preliminary Risk Ranking Record
- [x] R4-09 - RBI Review and Approval
- [x] R4-10 - Risk Register Linkage

### Release 4 Completion Note

Release 4 implementation was completed on 2026-06-26 under `main/`. Full verification should pass with `pnpm run release4:verify`. No database migrations, unsupported RBI formulas, final technical decisions, or interval extension logic were implemented. RBI methodology baseline remains TBD SME approval (OD-006/OD-018).

