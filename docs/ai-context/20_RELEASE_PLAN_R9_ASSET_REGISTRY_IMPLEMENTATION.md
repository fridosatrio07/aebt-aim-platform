# Release 9 Plan - Asset Registry & Asset Hierarchy Module Implementation Guidance

## Release Title

Release 9 - Asset Registry & Asset Hierarchy Module Implementation Guidance

## Release Objective

Translate the Asset Registry Module Build Specification into implementation-grade Markdown guidance for future controlled runtime work. Release 9 is docs-first only: it prepares the Asset Registry & Asset Hierarchy module build plan, acceptance mapping, boundaries, and handoff without implementing runtime code.

## Why Release 9 Follows Release 8

Release 8 established runtime tokens and the RoutePageShell Industrial Integrity Command Console pilot. Release 9 uses that shell direction to prepare the first module-specific build guidance for Asset Registry, the master reference for asset/equipment data and downstream inspection, certification, RBI, risk, evidence, dashboard, and audit workflows.

## MBS Source-Read Confirmation

The source file `E:/Project/AEBT's AIM Platform/Kajian/Asset Registry MBS Pengembangan AIM Platform SBU AEBT, Rev. 1.pdf` was located and read from Document Control through Decision Log. The PDF contains 24 pages and covers sections A through Q. Release 9 guidance is based on that MBS and repository Release 0-8 context.

## Asset Registry Module Purpose

Asset Registry is the single source of truth for asset/equipment, hierarchy, equipment class, technical base data, linked documents, inspection status, certification status, risk summary, data quality, and change log. It is the starting point for statutory inspection tracking, certification support, RBI workflow, risk register, document repository, evidence pack, dashboard, and audit readiness.

## Scope In

- MBS requirement breakdown.
- Asset hierarchy and taxonomy guidance.
- Asset Registry data requirements.
- Workflow, routing, and status lifecycle guidance.
- Business and validation rules.
- Screen, component, RBAC, approval, audit, export, API dependency, edge-case, UAT, dependency, and decision-log guidance.
- Sidebar restoration guidance before Asset Registry runtime implementation.
- Release 9 task packets and handoff.

## Scope Out

- Runtime React/Next.js implementation.
- Backend APIs.
- Database schema, Prisma migration, physical index design, or TimescaleDB changes.
- Package metadata or verification scripts.
- Authentication/OIDC, RBAC persistence, audit persistence, object storage, Excel/CSV parser, PDF extraction/OCR, CMMS/EAM/ERP integration.
- Final fit-for-operation, layak operasi, certification/PLO, RBI/RLA/FFS approval, interval extension, risk acceptance, or legal interpretation.

## Implementation Target Boundaries

Future implementation MUST remain mock/API-ready until backend/API/database controls are explicitly approved. UI may show draft/preliminary, Data Gap, Limited Basis, Pending Review, API-ready, and Pending Backend states. It MUST NOT imply final technical, legal, certification, safety, or asset-operability decisions.

## Required Future Implementation Phases

1. Source and requirement freeze.
2. Data model/API contract planning.
3. Frontend mock/API-ready module shell.
4. Asset Registry List.
5. Asset Detail / Asset 360.
6. Import Mapping and Validation Queue UI.
7. RBAC-aware action states and audit/export placeholders.
8. UAT mapping and handoff.

This docs-first task completes Phase 1 only.

## Required Documents Created In This Step

- `docs/frontend/APP_SHELL_SIDEBAR_RESTORATION_SPEC.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_MBS_REQUIREMENT_BREAKDOWN.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_IMPLEMENTATION_SPEC.md`
- `docs/modules/asset-registry/ASSET_HIERARCHY_AND_TAXONOMY_SPEC.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_DATA_REQUIREMENTS.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_WORKFLOW_AND_STATUS_LIFECYCLE.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_BUSINESS_VALIDATION_RULES.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_UI_SCREEN_SPEC.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_COMPONENT_BEHAVIOR_SPEC.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_RBAC_APPROVAL_AUDIT_EXPORT_SPEC.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_API_DEPENDENCY_AND_INTEGRATION_PLAN.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_ERROR_EXCEPTION_EDGE_CASE_SPEC.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_UAT_ACCEPTANCE_MAPPING.md`
- `docs/modules/asset-registry/ASSET_REGISTRY_DEPENDENCIES_OPEN_ISSUES_DECISION_LOG.md`

## Acceptance Criteria

- [x] Asset Registry MBS was found and read end to end before drafting.
- [x] MBS sections A-Q were decomposed into module guidance.
- [x] Release 9 task packets exist, including R9-00 sidebar restoration guidance.
- [x] Handoff records docs-first completion and runtime boundaries.
- [x] Open issues are preserved instead of invented.
- [x] No runtime code, backend/API/database, package, dependency, migration, or verification script changes were made.

## Open Issues Before Runtime Build

- Final 9-level hierarchy naming.
- Mandatory fields per equipment class.
- Tag number uniqueness scope.
- Approval authority by role/action.
- Retention class and duration.
- Sensitive field list.
- Export format and watermark.
- Integration scope with Document Repository, Inspection Tracking, Certification Register, RBI, Risk Register, and Evidence Pack.
- Boundary between data readiness, certification readiness, and technical approval.
- SOP for data correction and baseline resubmission.
- Left-sidebar runtime restoration remains a future implementation step.

## Known Limitations

- Guidance is documentation-only.
- No runtime Asset Registry page was implemented.
- No final API path or physical schema is defined.
- No final RBAC/approval matrix is approved.
- No legal/compliance interpretation is finalized.

## Handoff Requirements

Future implementation MUST read this file, the Asset Registry module docs, `APP_SHELL_SIDEBAR_RESTORATION_SPEC.md`, Release 8 handoff, and the MBS before coding. It MUST update task packets and handoff only after checks pass.

## Explicit Docs-Only Statement

This Release 9 task creates Markdown implementation guidance only. It does not perform runtime implementation.