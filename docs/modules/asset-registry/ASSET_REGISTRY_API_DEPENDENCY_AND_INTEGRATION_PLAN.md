# Asset Registry API Dependency And Integration Plan

## Source Basis

Asset Registry MBS section L.

## Boundary

Final endpoint paths belong in API Contract / OpenAPI Draft. This document defines future capability requirements only and MUST NOT be treated as final endpoint design.

## Backend Service Dependencies

- Tenant & Project Module
- Identity & Access Module
- Asset Registry Module
- Data Import & Validation Module
- Document Service
- Inspection Module
- Certification Module
- RBI & Risk Module
- Evidence Pack Service
- Audit Trail Service
- Notification Service
- Reporting/Export Service

## Minimum API Capability

- Retrieve asset registry list with filter, sort, pagination, saved view, and role scope.
- Retrieve asset detail / Asset 360 by asset ID.
- Create single asset draft.
- Update editable asset fields with validation and audit log.
- Archive asset by approval rule.
- Import asset batch.
- Retrieve import mapping template.
- Run validation on import batch.
- Resolve validation issue.
- Submit asset/import batch for review.
- Approve/reject/request revision for baseline asset data.
- Link/unlink document to asset.
- Retrieve linked objects.
- Retrieve change log and audit trail.
- Export asset register with purpose, filter, version, and audit metadata.
- Update workflow route with justification and approval if required.

## Non-Negotiable API Controls

- Server-side permission validation for all write/archive/approve/export/sensitive-read operations.
- Deny direct URL/API access outside scope.
- Log failed authorization.
- Fail closed for sensitive event audit failure where feasible.
- Preserve tenant isolation and project/site scoping.

## Integration Boundary

Future implementation may build mock/API-ready frontend before production API exists, but UI labels must say Mock, API-ready, Pending Backend, Needs Review, Draft, or Preliminary as applicable.