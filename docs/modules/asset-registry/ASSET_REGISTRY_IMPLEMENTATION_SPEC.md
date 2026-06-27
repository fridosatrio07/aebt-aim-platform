# Asset Registry Implementation Spec

## Module Purpose

Asset Registry MUST be the single source of truth for asset/equipment, hierarchy, equipment class, technical base data, documents, inspection status, certification status, risk summary, data quality, and change log.

It supports downstream modules by reference: statutory inspection tracking, certification support, RBI workflow, risk register, document repository, evidence pack, dashboard, reviewer work queue, and audit readiness.

## Module Boundary

Asset Registry owns asset identity, hierarchy context, equipment classification, basic technical metadata, data readiness, data quality state, linked-object summary, and lifecycle state. It does not own final inspection decision, certification/PLO decision, RBI approval, RLA/FFS approval, interval extension, risk acceptance, legal interpretation, or fit-for-operation decision.

## MVP+ Scope

- Configurable asset hierarchy up to 9 levels.
- Asset Registry List.
- Asset Detail / Asset 360.
- Batch data intake with import mapping, duplicate detection, hierarchy/equipment class mapping, validation queue, data quality review, and baseline approval.
- Progressive data readiness from L0 Minimum Registry to L4 Advanced Assessment Ready.
- Linkage to documents, inspection, certification, RBI, risk, anomaly/action, evidence, dashboard, and reviewer work queue.
- RBAC-aware UI states, approval by exception, audit trail placeholder, export log placeholder, and controlled access labels.

## Out Of Scope

- Runtime implementation in this docs-first task.
- Backend API, database schema, Prisma migration, object storage, OIDC, RBAC persistence, audit persistence, Excel/CSV parser, PDF extraction/OCR, TimescaleDB hypertables, CMMS/EAM/ERP integration.
- Final API paths, final physical schema, and final production readiness.

## Release 9 Implementation Phases

1. Documentation and requirement extraction - completed by this docs-first task.
2. Data model/API contract planning.
3. Frontend mock/API-ready module shell.
4. Asset Registry List.
5. Asset Detail / Asset 360.
6. Import Mapping and Validation Queue UI.
7. RBAC-aware action states and audit/export placeholders.
8. UAT mapping and handoff.

## Frontend Scope For Future Implementation

- Use Release 8 route shell and semantic tokens.
- Restore/harden left sidebar as primary navigation before module build.
- Build Asset Registry List with dense table, toolbar, filters, saved view, quick drawer, import/export placeholders, and permission-aware disabled states.
- Build Asset Detail / Asset 360 with header, status rail, tabs, linked object panel, evidence/readiness/review/audit visibility.
- Build import mapping/validation screen as mock/API-ready stepper.

## Backend/API Scope For Future Implementation

Backend/API work MUST wait for approved API Contract/OpenAPI Draft. Final endpoint paths are not defined in the MBS. Future APIs must validate permission server-side, enforce tenant/project/site scope, audit sensitive operations, and fail closed for sensitive audit failures where feasible.

## Data Model Scope For Future Implementation

Use MBS logical entities and fields as planning baseline. Physical schema, indexes, migrations, retention implementation, and payload contracts are future Database Implementation Plan work.

## RBAC/Audit/Export Scope

UI MUST expose least-privilege, default-deny, scope, permission, review, approval, audit, and export-control states. It MUST NOT claim final enforcement until backend/API persistence exists.

## Human-Final-Decision Boundary

The platform MUST NOT automatically declare fit for operation, layak operasi, safe to operate, certification/PLO final, RBI/RLA/FFS final, interval extension, risk acceptance, or final legal interpretation. Technical outputs remain draft/preliminary until authorized review.

## Implemented Enough For Release 9 Pilot

A future Release 9 runtime pilot is implemented enough only when:

- Asset Registry is discoverable from left sidebar.
- List and Asset 360 shell use MBS fields and statuses.
- Import/validation states are represented without writing baseline data.
- Data Gap and draft/preliminary labels are visible.
- Export/action placeholders show permission/audit warnings.
- UAT-AR-001 through UAT-AR-015 are mapped and ready for execution.
- No unsupported final decision or production-readiness claim is introduced.