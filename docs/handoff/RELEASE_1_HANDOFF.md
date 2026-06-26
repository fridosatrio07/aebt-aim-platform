# Release 1 Handoff - Data & Document Foundation

## Task ID

Release 1: R1-01 through R1-10

## Branch

Not applicable. `E:\Project\AEBT's AIM Platform\Source Code` is not currently a Git repository.

## Agent/session

Codex

## Date

2026-06-26

## Files Changed

- main/packages/shared/src/release-1.ts
- main/packages/shared/tests/release-1.test.ts
- main/packages/database/prisma/schema.prisma
- main/apps/api/src/data-foundation/*
- main/apps/api/src/app.module.ts
- main/apps/web/src/components/AppShell.tsx
- main/seed/release-1-data-foundation.json
- main/scripts/migration-check.mjs
- main/scripts/verify-release-1.mjs
- main/scripts/release1-verify.mjs
- main/README.md
- docs/tasks/release-1/*
- docs/handoff/*
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md
- docs/ai-context/15_CHANGELOG_CONTEXT.md

## Summary

Implemented Release 1 under `main/` with asset hierarchy schema foundations, asset registry/detail API, asset registry/detail UI, document metadata/version/link schema, document repository UI, document upload intent API, import staging schema, CSV/TSV and normalized Excel-row staged parser, validation queue API/UI, and R1 verification checks.

## Schema Changes

- Added Release 1 Prisma models: Facility, AssetSystem, AssetSubsystem, Equipment, Component, CmlTmlPoint, ThicknessReading, Document, DocumentVersion, DocumentLink, ImportBatch, ImportRow, ValidationIssue.
- Added Release 1 enums for data quality, review, document, import, and validation statuses.
- No migrations were run.

## API Changes

- Added `DataFoundationModule` to NestJS app.
- Added `/v1/data-foundation/assets`.
- Added `/v1/data-foundation/assets/:assetId`.
- Added `/v1/data-foundation/documents`.
- Added `/v1/data-foundation/documents/upload-intent`.
- Added `/v1/data-foundation/imports/parse-preview`.
- Added `/v1/data-foundation/imports/validation-queue`.

## UI Changes

- Replaced Release 0 placeholder shell with Release 1 workbench.
- Added asset registry table, document repository table, validation queue table, metric counters, tenant/project/site selectors, state indicators, and asset detail drawer.
- Kept final-decision language out of the UI.

## RBAC/audit Changes

- Added Release 1 permissions: `asset.read`, `asset.write`, `document.read`, `document.upload`, `import.stage`, `validation.review`.
- Reused tenant/project/site scope checks.
- Added audit events for asset/document/validation access, document upload intent, and staged import creation.

## Tests Run

- `pnpm run release1:verify` passed.
- The aggregate check ran lint, typecheck, unit tests, build, migration check, analytics compile, and R1 verification.
- Shared package tests passed: 10 tests across Release 0 and Release 1.

## Assumptions

- Static/in-memory R1 demo data is acceptable until persistence repositories and migrations are approved.
- Upload API may return S3-compatible object-key intent before real presigned upload provider wiring is approved.
- Excel parser support may accept normalized Excel row data; native binary XLSX extraction remains TBD.

## Known Limitations

- `Source Code` is still not a Git repository.
- No database migrations were run.
- No real object storage client/presigned URL flow was configured.
- No native binary XLSX parser dependency was added.
- No Release 2-4 modules were implemented.

## Follow-up Tasks

- Confirm Git repository setup.
- Decide migration execution and persistent repository pattern.
- Confirm object-storage provider, bucket, credential, and presigned URL policy.
- Confirm whether native binary XLSX parsing is required in-app or handled before normalized row intake.
- Review final RBAC matrix with UBT/IT and Project Owner.

## Open Questions

- Who approves Release 1 schema migration execution?
- Which object storage provider/bucket naming policy will be used for pilot?
- Should native XLSX binary parsing be added as a dependency or handled by an approved import service?
- What is the final pilot dataset and site/client?
