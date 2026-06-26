# Data Model Baseline

## Logical Entity Groups

The Data Model Pack groups AIM Platform data into eight source-backed domains. This document is a logical baseline only. Physical table names, constraints, indexes, partitioning, migration scripts, and API payloads remain TBD until implementation tasks and UBT/IT approval.

| Entity group | Entity names from source baseline | Relationship summary |
| --- | --- | --- |
| Master Organization & Access | tenant, client, project, site, user, role, permission, user_role_assignment | Tenant has clients/projects/sites; users receive roles and permissions scoped by tenant/project/site. |
| Asset Registry & Hierarchy | facility, system, subsystem, equipment, component, cml_tml_point, thickness_reading | Asset registry is the single source of truth. Other modules reference assets instead of copying asset data. |
| Inspection Management | inspection_plan, workpack, inspection_event, finding, recommendation | Inspection planning/events link to equipment, evidence, findings, recommendations, due/overdue status, and review. |
| Certification Support | certificate, certification_readiness_checklist, submission_log | Certificates link to assets/equipment, document checklist, renewal tracker, submission/approval logs, and evidence readiness. |
| RBI & Risk Management | rbi_assessment, damage_mechanism, risk_ranking_record, risk_register | RBI assessment and risk ranking records link to assets, evidence, risk register items, recommendations, and approvals. |
| Anomaly & Action Tracking | anomaly_action | Anomalies/actions link to assets, findings, recommendations, evidence, owners, due dates, and close-out status. |
| Document, Evidence & Approval | document, document_version, document_link, evidence_pack, evidence_pack_item, approval | Documents are reusable objects linked across assets, inspections, certificates, RBI, risk, anomaly, recommendation, and evidence packs. |
| Governance, Compliance, Notification & Logging | regulatory_standard_library, compliance_matrix_item, notification, audit_log, helpdesk_ticket, system_log | Governance records support traceability, notifications, auditability, helpdesk support, and system operations. |

## Common Fields

- id as generated primary identifier.
- tenant_id as mandatory tenant link for operational data.
- project_id and site_id where object scope requires project/site context.
- Created/updated metadata.
- Source document/source basis fields for technical data.
- Review status and approval requirement where decisions or controlled data are involved.
- Audit references for important changes.
- Version number for controlled documents, evidence packs, certificate readiness, approvals, and controlled technical outputs.

## Important Enums and Controlled Values

Source-supported controlled values include workflow status, risk level, due status, certificate status, approval status, data quality status, object type, document status, and import status. Exact enum lists are TBD for implementation.

Examples identified in source documents:

- Data/workflow: Draft, Imported, Pending Validation, Data Gap, Validated, In Review, Approved, Rejected, Limited Basis.
- Document status: Draft, Controlled, Approved, Superseded, Archived, Rejected.
- Import status: Uploaded, Mapped, Validation Failed, Pending Approval, Baseline Approved, Rejected.

## Data Quality and Review Rules

- Data can progress from minimum registry to compliance tracking ready, inspection/certification readiness, RBI readiness, and advanced assessment readiness.
- Data from import, extraction, manual input, historical archives, or assumptions must carry source, validation status, data quality flag, review status, and audit trail before use as a technical basis.
- Data with gaps may support limited workflows but must be labeled Data Gap, Pending Validation, or Limited Basis as applicable.

## Auditability Rules

- Every important data change, status change, approval, review, upload, export, and access-sensitive action must be auditable.
- No endpoint or data operation may bypass tenant isolation or RBAC checks.
- Evidence and documents must remain traceable to source objects and export purpose.

## Physical Schema Decisions

- Final physical schema: TBD.
- Final indexes and query plans: TBD.
- Final TimescaleDB hypertable use: TBD.
- Final migration strategy: TBD.
- Final API payloads: TBD.

## Source Basis

- Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.
