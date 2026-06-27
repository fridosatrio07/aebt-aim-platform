# Asset Registry Workflow And Status Lifecycle

## Source Basis

Asset Registry MBS sections E and H.

## WF-02 - Batch Data Intake & Asset Registry Baseline

1. Authorized user opens Project & Data Intake or Asset Registry Import.
2. User downloads template or selects saved import mapping.
3. User uploads Excel/CSV or extraction result into staging.
4. System runs mandatory field check, duplicate tag check, hierarchy validation, equipment class mapping, unit/date validation, source document check, and data quality scoring.
5. Assets with minimum data enter Imported or Pending Validation.
6. Assets with validation issues enter Validation Queue or Data Gap Queue.
7. Data Analyst performs batch correction, assign owner, clarification request, reject row, or send to reviewer.
8. Data Owner/Technical Inspector/SME performs baseline approval according to field and impact.
9. Approved baseline may feed downstream modules according to data readiness stage.
10. All import, correction, rejection, approval, and baseline changes go to audit trail.

## WF-03 - Asset Scoping & Criticality Routing

Routing MUST prevent all equipment from entering full technical workflow by default. Criteria include equipment class, location, service, statutory obligation, certificate status, due status, inspection history, operating status, criticality, risk indicator, client request, and data readiness.

Minimum routing status:

- Registry Only
- Compliance Tracking
- Certification Tracking
- Inspection Tracking
- RBI Candidate
- RBI Active
- Revalidation Required
- Data Gap Before RBI
- Not in Scope

Batch routing SHOULD support equipment class, system, area, site, facility, due window, risk level, or service contract. Re-routing with technical impact requires justification and audit trail.

## Asset Status

- Draft
- Imported
- Pending Validation
- Validated
- Active
- Standby
- Under Maintenance
- Out of Service
- Decommissioned / Removed
- Archived

## Data Quality Status

- Imported
- Pending Validation
- Validated
- Data Gap
- Limited Basis
- Rejected
- Revision Required
- Approved

## Review Status

- Draft
- Pending Review
- Pending Approval
- Approved
- Rejected
- Revision Required
- Superseded

## Related Status Families

Future implementation must also display due_status, certificate_status, risk_level, document_status, and export_status where applicable. Exact enum details beyond the MBS require API/data-contract review.

## Guardrails

- Data that is Data Gap, Pending Validation, Limited Basis, or Draft MUST NOT render as final approved data.
- Routing status is workflow support only and not final technical approval.
- Status changes with technical/compliance impact require reason, approval, versioning, and audit.