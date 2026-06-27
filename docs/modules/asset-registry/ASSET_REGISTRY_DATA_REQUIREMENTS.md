# Asset Registry Data Requirements

## Source Basis

Asset Registry MBS sections I, F, G, H, L, M, P, and Q.

## Main Entities

- facility
- system
- subsystem
- equipment
- component
- cml_tml_point
- thickness_reading
- document_link
- approval
- audit_log
- compliance_matrix_item reference
- inspection_plan reference
- certificate reference
- rbi_assessment reference
- risk_register reference
- anomaly_action reference
- evidence_pack reference

## Standard Operational Fields

- id
- tenant_id
- project_id
- site_id
- status
- data_quality_status
- source_document_id
- source_basis
- version_no
- created_by
- created_at
- updated_by
- updated_at
- deleted_at
- review_status
- approval_required
- remarks

## Minimum Equipment Fields

- tag_number
- asset_name
- asset_description
- hierarchy_path
- parent_id
- facility_id
- system_id
- subsystem_id
- equipment_class
- equipment_type or subtype if used
- service
- location
- area or unit
- criticality
- asset_status
- operating_status
- design_basis
- operating_envelope
- material
- design_pressure
- design_temperature
- operating_pressure
- operating_temperature
- installation_date if available
- manufacturer/model/serial_number if available
- statutory_applicability
- inspection_due_status
- certificate_status
- risk_level
- document_status
- data_readiness_stage
- owner
- last_updated

## Versioning And Retention Rules

- Approved baseline MUST NOT be overwritten directly.
- Changes MUST create version update or revision record.
- Sensitive fields MUST retain prior value, new value, actor, timestamp, reason, and approver.
- Archive MUST NOT remove historical inspection, certificate, RBI, risk, document, approval, or audit relation.

## Source Basis Rules

Imported, extracted, reconstructed, interview-based, or assumption-based data MUST have source document or source basis. Missing source moves data to Data Gap or Limited Basis and blocks direct Validated state where applicable.

## Data Quality Status Rules

Allowed data quality statuses from MBS: Imported, Pending Validation, Validated, Data Gap, Limited Basis, Rejected, Revision Required, Approved.

## Sensitive Field Handling

Changes to hierarchy, equipment class, design basis, operating envelope, material, statutory applicability, due date source, data quality override, or routing status with technical/compliance impact require approval by exception and audit.

## Out Of Scope

Physical database schema, final index design, final migration script, and final API payload are out of scope for this docs-first guidance.