
# Release 9 - Asset Registry & Asset Hierarchy Module Implementation Guidance

## Purpose

Release 9 started as documentation-first implementation guidance for the Asset Registry & Asset Hierarchy module based on the Asset Registry MBS. R9-16 records the subsequent controlled runtime Step 1 implementation for the mock/API-ready Asset Registry List and Asset 360 shell.

## Source Basis

- Asset Registry Module Build Specification, Rev. 1, read end to end from Document Control through Decision Log.
- Release 0-8 repository context and frontend/app-shell guidance.

## Task List

- [x] R9-00 - App shell sidebar restoration guidance before Asset Registry module implementation
- [x] R9-01 - Read and decompose Asset Registry MBS source
- [x] R9-02 - Asset Registry scope, boundary, and implementation phases
- [x] R9-03 - Asset hierarchy and taxonomy guidance
- [x] R9-04 - Asset Registry data requirements and field baseline
- [x] R9-05 - Workflow, routing, and status lifecycle
- [x] R9-06 - Business rules and validation rules
- [x] R9-07 - Asset Registry List screen specification
- [x] R9-08 - Asset Detail / Asset 360 screen specification
- [x] R9-09 - Data import mapping and validation queue specification
- [x] R9-10 - Component behavior, badge, drawer, import, and export rules
- [x] R9-11 - RBAC, permission, approval, audit, and export-control guidance
- [x] R9-12 - API dependency and integration boundary planning
- [x] R9-13 - Error, exception, edge-case, and negative test guidance
- [x] R9-14 - UAT and acceptance mapping
- [x] R9-15 - Dependencies, open issues, decision log, and handoff
- [x] R9-16 - Implementation Step 1: Asset Registry List and Asset 360 Mock/API-ready Module Shell

## Boundary

Release 9 task completion for R9-00 through R9-15 means documentation guidance is complete. R9-16 is the completed runtime Step 1 only; deeper Asset Registry implementation remains a future approved step.

## Implementation Step 2 Status

Release 9 Step 2 implementation is functionally complete.

Completed:
- Added validation queue workflow tab to `AssetRegistryModuleShell` with asset-scoped validation items and review-gated placeholders.
- Added import mapping placeholder workflow with staged upload/mapping/validation placeholders and explicit pending/disabled states.
- Preserved mock/API-ready, draft/preliminary, pending-backend, and access-boundary wording.
- Documentation updated in handoff/completion log/changelog.
