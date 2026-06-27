# Asset Registry RBAC Approval Audit Export Spec

## Source Basis

Asset Registry MBS sections D and M.

## Principles

- Least privilege.
- Default deny.
- Tenant/project/site scoping.
- Object ownership.
- Approval authority.
- Immutable audit trail as future persistence target.
- Server-side permission validation for future API implementation.

## Role-Specific Responsibilities

- Platform Administrator: taxonomy, template, configuration baseline, permission configuration; not automatic approver of all technical data.
- Data Analyst: import, mapping, validation queue, correction, data quality report.
- Data Owner: baseline approval for imported/extracted/manual asset data.
- Inspector: scoped asset visibility and limited operational field updates.
- Client Document Controller / Client Engineer: permitted create/edit within client project/site scope.
- Technical Inspector / SME: technical fields, reconstructed data, data gap, critical fields, technical baseline impact review.
- Document Controller: linked documents, metadata, versioning, evidence link, document status.
- Q&C and Legal: compliance-related baseline, evidence readiness, regulatory mapping, audit readiness, legal boundary.
- Auditor/Viewer: read-only access by approved audit/review scope.
- Management Reviewer: dashboard, risk summary, overdue item, data gap, readiness status by scope.

## Permission Matrix Summary

| Permission | MBS guidance |
| --- | --- |
| View | Technical and assigned client roles; Auditor/Viewer read-only. |
| Create | Platform Administrator, Data Analyst, permitted Client Document Controller/Engineer. |
| Edit | Data Analyst, Inspector, Client Engineer by object scope; sensitive fields need validation/approval. |
| Delete/Archive | Soft delete/archive only with Data Owner or Module Owner approval. |
| Review | Technical Inspector/SME for technical and baseline fields. |
| Approve | Data Owner/SME for baseline; Q&C/Legal for compliance impact. |
| Export | Only roles with export permission and matching scope. |
| Configure | Platform Administrator for taxonomy, template, mapping, default saved view, field config. |

## Approval Rules

- Asset baseline import approval.
- Technical field approval for data affecting inspection, certification, RBI, risk, or compliance.
- Data quality override approval.
- Hierarchy/taxonomy baseline change approval if cross-asset impact exists.
- Archive approval for operational/compliance record.
- Formal export approval for audit, client, regulator, or external formal purpose.
- Submitter cannot approve the same sensitive record.
- Approval is version-bound; post-approval changes trigger revision/resubmission.

## Audit Event Catalog

- create_record
- update_record
- delete_archive_record
- import_data
- reject_import
- trigger_validation_queue
- submit_for_review
- approve
- reject
- request_revision
- upload_document
- link_evidence
- unlink_evidence
- update_inspection_due_date
- change_risk_ranking
- export_report_evidence_pack
- asset_register_export
- failed_authorization
- access_sensitive_document
- change_role_permission

## Export Control

Export MUST include purpose, scope, filter, row count, object version, data timestamp, file hash, actor, role, export timestamp, warning for draft/preliminary, Data Gap, Limited Basis, Pending Validation, and permission/approval checks.

Export MUST NOT open data outside tenant/project/site scope and MUST NOT bypass audit trail.

## Boundary

This document does not implement RBAC, audit persistence, or export persistence. Future API must enforce controls server-side.