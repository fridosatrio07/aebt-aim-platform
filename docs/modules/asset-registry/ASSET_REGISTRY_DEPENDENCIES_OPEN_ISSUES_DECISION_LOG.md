# Asset Registry Dependencies Open Issues Decision Log

## Source Basis

Asset Registry MBS sections P and Q.

## Dependencies

- Final asset taxonomy library and equipment class mapping.
- Mandatory field per equipment class.
- Import template, sample dataset, and mapping template.
- RBAC, permission, approval authority, and negative tests.
- Compliance baseline and obligation mapping.
- Database implementation plan and API Contract / OpenAPI Draft.
- Object storage for documents and evidence linkage.
- Audit trail service and export logging.
- Notification digest and validation queue.
- UI component system: data table, status badge, risk badge, data quality badge, drawer, stepper, filter chip, export modal, audit trail link.

## Open Issues Before Build

- Final 9-level hierarchy naming.
- Mandatory field per equipment class.
- Tag number uniqueness rule.
- Approval authority by role and action.
- Retention class and retention duration.
- Sensitive fields requiring approval.
- Final asset register export format and watermark.
- Integration scope with Document Repository, Inspection Tracking, Certification Register, RBI, Risk Register, and Evidence Pack.
- Boundary between data readiness, certification readiness, and technical approval.
- SOP for data correction and baseline resubmission.
- Sidebar restoration runtime implementation remains future work before Asset Registry UI build.

## Decision Log

| Decision ID | Decision | Status | Notes |
| --- | --- | --- | --- |
| DEC-AR-001 | Asset Registry is single source of truth for master asset/equipment | Accepted as baseline | Other modules use reference, not uncontrolled copy. |
| DEC-AR-002 | Asset hierarchy configurable up to 9 levels | Accepted as baseline | Final level names must be locked before implementation sprint. |
| DEC-AR-003 | Asset Registry onboarding is batch-first | Accepted as baseline | Manual entry only for individual asset or minor correction. |
| DEC-AR-004 | Import/extraction does not directly update approved baseline | Accepted as baseline | Must pass staging/validation queue/approval. |
| DEC-AR-005 | Data Gap visible in UI, review queue, export, and audit metadata | Accepted as baseline | Must not render as valid data. |
| DEC-AR-006 | Asset Detail uses Asset 360 / linked object panel | Accepted as baseline | Reduces page switching and preserves work context. |
| DEC-AR-007 | Technical outputs remain draft/preliminary until authorized review | Accepted as baseline | Applies to risk, due date change, helper calculation, RBI readiness, certification readiness. |
| DEC-AR-008 | Soft delete/archive default; hard delete unavailable in normal workflow | Accepted as baseline | Final retention policy needed. |
| DEC-AR-009 | Export requires purpose, scope, version, timestamp, actor, role, filter, file hash, audit log | Accepted as baseline | Formal/external export may need extra approval. |
| DEC-AR-010 | Final API path and physical schema outside MBS | Accepted as boundary | Belongs to API Contract/OpenAPI Draft and Database Implementation Plan. |

## Additional Release 9 Guidance Decision

- DEC-R9-001: Primary module navigation must remain left-sidebar-based; topbar is contextual utility only. Status: Release 9 guidance decision, pending runtime implementation.