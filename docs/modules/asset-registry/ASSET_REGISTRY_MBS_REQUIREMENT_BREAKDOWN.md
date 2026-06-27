# Asset Registry MBS Requirement Breakdown

## Source Confirmation

Source read: `E:/Project/AEBT's AIM Platform/Kajian/Asset Registry MBS Pengembangan AIM Platform SBU AEBT, Rev. 1.pdf`.

Formal title: Asset Registry Module Build Specification - Assets Integrity Management Platform SBU AEBT PT SUCOFINDO (Persero).

Status in source: Draft for internal review. Release 9 guidance MUST preserve open decisions and MUST NOT treat draft content as production-approved authority.

## A. Document Control

MBS requires Asset Registry build specification to combine functional requirement, workflow, UI/UX, data model, role-permission, approval, audit trail, export control, and acceptance criteria. Changes to scope, lifecycle, mandatory fields, permission, and approval rule must enter decision log and change request.

Future implementation must build from this controlled baseline and keep traceability to task, code, acceptance, and handoff records.

Must not build undocumented scope changes or silently alter approval/permission/status behavior.

Traceability note: reviewer set includes Project Owner, Platform Owner, Data Owner, Technical Inspector/SME, Q&C, Legal where compliance interpretation is involved, and UBT/IT for security/architecture.

Open question: final approval status of Draft 0.1 / Draft 1.0 MBS remains project-control review item.

## B. Purpose, Scope, and Out-of-Scope

MBS requires Asset Registry as single source of truth for asset/equipment, hierarchy, equipment class, technical base data, linked documents, inspection status, certification status, risk summary, data quality, and change log. It feeds statutory inspection tracking, certification support, RBI, risk register, document repository, evidence pack, dashboard, and audit readiness.

Future implementation must build MVP+ guidance for hierarchy up to 9 levels, Asset Registry List, Asset Detail / Asset 360, batch data intake, progressive readiness, downstream linkage, data quality gates, RBAC, approval by exception, audit trail, export log, and controlled access.

Must not claim fit for operation, layak operasi, safe to operate, final certification/PLO, final legal interpretation, automatic interval extension, full historical migration, full CMMS/EAM/ERP integration, final physical schema, final API contract, or infrastructure-as-code.

Open question: pilot-specific integration scope remains to be confirmed.

## C. Source Traceability

MBS requires traceability pattern: Source Document -> Requirement ID -> Data Requirement ID -> Workflow ID -> Screen ID -> Permission ID -> Approval ID -> Audit Event ID -> UAT ID -> Evidence Output.

Future implementation must keep traceability in docs, code comments where useful, tests, UAT mapping, and handoff.

Must not use generic or unsupported requirements outside MBS/supporting repository docs.

Open question: final evidence-output format per requirement remains to be decided during implementation/UAT.

## D. Role, Permission, and Approval Scope

MBS requires least privilege, default deny, tenant/project/site scoping, object ownership, approval authority, and immutable audit trail. UI-only permission is not enough; future APIs must validate role, permission, scope, object status, and approval authority.

Future implementation must model role-specific UI states for Platform Administrator, Data Analyst, Data Owner, Inspector, Client Document Controller/Engineer, Technical Inspector/SME, Document Controller, Q&C, Legal, Auditor/Viewer, and Management Reviewer.

Must not imply final RBAC enforcement until server-side implementation exists. Platform Administrator is not automatically approver of all technical data. Submitter must not self-approve sensitive records.

Open questions: final role authority matrix, sensitive field list, and negative tests remain open.

## E. Module Workflow Specification

MBS defines WF-02 Batch Data Intake & Asset Registry Baseline and WF-03 Asset Scoping & Criticality Routing.

Future implementation must support staging import, mandatory-field checks, duplicate tag checks, hierarchy validation, equipment class mapping, unit/date validation, source document check, data quality scoring, validation/data gap queue, batch correction, owner assignment, clarification, row rejection, reviewer routing, baseline approval, downstream readiness use, and audit trail.

Must not push every equipment item into full technical workflow by default. Routing must use equipment class, location, service, statutory obligation, certificate status, due status, inspection history, operating status, criticality, risk indicator, client request, and data readiness.

Open question: final routing policy and batch routing authority remain open.

## F. Functional Requirements

MBS functional requirements MBS-AR-FR-001 through MBS-AR-FR-015 define Asset Registry master data, 9-level hierarchy, minimum fields, dense Asset Registry List, Asset 360, batch import, smart mapping, data quality gate, progressive readiness L0-L4, reusable document links, workflow route/criticality register, export control, audit trail, unit normalization/engineering validation, and CML/TML quick import/trend preview.

Future implementation must map each FR to screens, data, API, permissions, audit events, and UAT.

Must not treat P1 validation/calculation helpers as final engineering decisions. Unit normalization and engineering warnings support review only.

Open questions: final mandatory equipment-class fields and CML/TML import payload belong to later contract planning.

## G. Business Rules and Validation Rules

MBS requires Asset Registry as master reference; unique tag number within agreed tenant/project/site/hierarchy scope; batch-first onboarding; L0 data visible in registry but not enough for RBI/advanced assessment; source document/source basis for imported/extracted/reconstructed/interview/assumption data; priority routing for statutory/due/expired/high-risk/criticality/client request; reusable evidence/document; soft delete; versioned technical/compliance-impact changes; human review for risk/RBI/inspection interval/remaining life/certification readiness/fitness outputs.

Validation rules include L0-L3 mandatory fields, valid parent hierarchy, active taxonomy mapping, issue date not after expiry date, operating pressure warning over design pressure, non-negative thickness, corrosion-rate outlier warning, data quality override approval, and blocked Validated state for duplicate/missing source/invalid unit/date/missing parent/mandatory field issues.

Must not auto-use outlier or negative corrosion rate as final basis.

Open question: exact L0-L3 field completeness per equipment class must be finalized.

## H. Status Lifecycle

MBS status lifecycle includes asset_status, data_quality_status, review_status, workflow_route_status, and related due/certificate/risk/document/export status guidance.

Future implementation must display and preserve lifecycle state transitions for Draft, Imported, Pending Validation, Validated, Active, Standby, Under Maintenance, Out of Service, Decommissioned/Removed, Archived; Imported, Pending Validation, Validated, Data Gap, Limited Basis, Rejected, Revision Required, Approved; Draft, Pending Review, Pending Approval, Approved, Rejected, Revision Required, Superseded; Registry Only, Compliance Tracking, Certification Tracking, Inspection Tracking, RBI Candidate, RBI Active, Revalidation Required, Data Gap Before RBI, Not in Scope.

Must not render Data Gap or Pending Validation as final/approved.

Open question: exact transition rules and permissions per transition remain open.

## I. Data Requirements

MBS lists main entities, standard operational fields, and minimum equipment fields. Future implementation must preserve logical data requirements without claiming final physical schema.

Must not finalize table names, indexes, migrations, or API payload details in this docs-first step.

Open question: mapping from logical entities to Prisma/API contracts remains future Database Implementation Plan/API Contract work.

## J. Screen Specification

MBS requires Asset Registry List, Asset Detail / Asset 360, and Data Import Mapping Screen.

Future implementation must build dense operational table, toolbar, default columns, filters, Asset 360 header/tabs/linked-object panel, and import stepper for template selection, upload, mapping, duplicate detection, validation, data quality review, and baseline approval.

Must not turn Asset Detail into final approval cockpit unless authority, evidence preview, change diff, comment, and approval checks exist.

Open question: final screen grouping and responsive behavior need UI/UX review.

## K. Component Behavior

MBS defines table, badge, drawer, import, and export behavior.

Future implementation must support visible/resettable filters, sorting, row click, quick drawer, safe bulk action only, data quality/risk/due/certificate badges, Draft/Preliminary watermark for unapproved export/report, grouped validation errors, duplicate resolution, rejected-batch non-write behavior, import log/data quality report/change log/audit event, and export warnings.

Must not provide bulk critical technical approval unless explicitly allowed by rule and authority.

Open question: final component API belongs to implementation task.

## L. API Dependency Summary

MBS states final endpoint paths belong in API Contract / OpenAPI Draft. Dependencies include Tenant & Project, Identity & Access, Asset Registry, Data Import & Validation, Document, Inspection, Certification, RBI & Risk, Evidence Pack, Audit Trail, Notification, and Reporting/Export services.

Future implementation must plan API capabilities without inventing final paths.

Must not bypass server-side permission validation, tenant isolation, project/site scope, failed authorization logging, or fail-closed behavior for sensitive audit failure where feasible.

Open question: final endpoint contract and persistence implementation remain future work.

## M. Audit Trail, Approval, and Export Control

MBS requires audit event catalog, approval minimum rules, and export control metadata. Future implementation must expose audit/export placeholders and later persist create/update/archive/import/reject/validation/review/approve/reject/revision/document/evidence/due/risk/export/failed authorization/sensitive document/role permission events.

Must not claim immutable persistence until backend implementation exists. Export must not bypass purpose, scope, filter, row count, object version, timestamp, file hash, actor, role, warning, approval, or audit rules.

Open question: retention class and export approval policy need final approval.

## N. Error, Exception, and Edge Case

MBS defines permission denied, duplicate asset, missing parent, unknown equipment class, missing mandatory field, invalid unit, technical data without source, archived/superseded document, partial import failure, self-approval, approved asset changed, export unvalidated data, audit log write failure, archive with open linked action, low-risk with statutory due/expired obligation, cross-scope export/direct API bypass.

Future implementation must map each case to UI behavior, API/control behavior, audit event, message style, and blocked/review/warning outcome.

Must not hide authorization failures or silently write baseline data after validation failure.

Open question: exact user-facing message copy needs UI/content review.

## O. Acceptance Criteria and UAT Mapping

MBS defines UAT-AR-001 through UAT-AR-015. Future implementation must map each UAT to requirement, screen, permission, audit event, evidence/output, priority, and status.

Must not mark pilot ready until P0 UAT passes, no critical authorization defect remains, baseline import approval works, audit trail is recorded, and export cannot bypass permission.

Open question: final UAT execution owner and evidence repository remain open.

## P. Dependencies and Open Issues

MBS lists dependencies on taxonomy, mandatory fields, import templates, RBAC/approval, compliance baseline, database/API plan, object storage, audit/export logging, notification/validation queue, and UI component system.

Future implementation must resolve sprint-build blockers before production baseline.

Must not invent final 9-level naming, field requirements, uniqueness scope, authority, retention, sensitive fields, export format, integration scope, readiness/approval boundary, or data correction SOP.

## Q. Decision Log

MBS accepted baseline decisions: Asset Registry is single source of truth; hierarchy configurable up to 9 levels; onboarding batch-first; import/extraction does not directly update approved baseline; Data Gap visible in UI/review/export/audit metadata; Asset 360 linked object panel; technical outputs remain draft/preliminary until authorized review; soft delete/archive default; export requires purpose/scope/version/timestamp/actor/role/filter/file hash/audit log; final API path and physical schema are outside MBS.

Future implementation must carry these decisions into tasks, UI, API planning, and acceptance mapping.

Must not override accepted decisions without change request and decision-log update.