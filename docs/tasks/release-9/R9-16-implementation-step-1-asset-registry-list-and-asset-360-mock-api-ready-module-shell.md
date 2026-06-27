# R9-16 - Implementation Step 1: Asset Registry List and Asset 360 Mock/API-ready Module Shell

## Status

* [ ] Not Started
* [ ] In Progress
* [ ] Blocked
* [ ] Documentation Complete
* [x] Code Complete
* [x] Tests Passed
* [ ] Reviewed
* [ ] Merged
* [x] Done

## Objective

Implement the first controlled runtime step for Release 9 by replacing the generic Asset Registry placeholder routes with a mock/API-ready Asset Registry List and Asset 360 module shell.

## Source Basis

- Asset Registry MBS Pengembangan AIM Platform SBU AEBT, Rev. 1, as decomposed in `docs/modules/asset-registry/`.
- `docs/frontend/APP_SHELL_SIDEBAR_RESTORATION_SPEC.md`.
- `docs/modules/asset-registry/ASSET_REGISTRY_UI_SCREEN_SPEC.md`.
- `docs/modules/asset-registry/ASSET_REGISTRY_COMPONENT_BEHAVIOR_SPEC.md`.
- Existing Release 1-4 shared mock foundations and Release 5-8 frontend shell components.

## In Scope

- Runtime Asset Registry List shell at `/assets`.
- Runtime Asset 360 shell at `/assets/[assetId]`.
- Reuse existing left-sidebar primary navigation and topbar utility shell.
- Keep Asset Registry sidebar active for Asset 360 detail routes.
- Show mock/API-ready, draft/preliminary, pending-backend, disabled, and Needs RBAC Review labels.
- Link Asset 360 sections to existing shared mock data for registry, evidence, inspection, certification, RBI/risk, validation, actions, and audit summary context.
- Update Release 9 progress and handoff documentation.

## Out Of Scope

- Backend/API integration beyond existing mock/shared data foundations.
- Database schema changes, Prisma migrations, or persistent storage.
- Object storage integration.
- Authentication/OIDC or final RBAC enforcement.
- Import parser expansion or real file upload.
- Final certification/PLO, fit-for-operation, legal, RBI/RLA/FFS, interval extension, risk acceptance, or asset safety decisions.
- Package metadata, dependency, or verification script changes.

## Files Changed

- `main/apps/web/src/components/AssetRegistryModuleShell.tsx`
- `main/apps/web/app/assets/page.tsx`
- `main/apps/web/app/assets/[assetId]/page.tsx`
- `main/apps/web/src/components/app-routes.ts`
- `docs/tasks/release-9/R9-16-implementation-step-1-asset-registry-list-and-asset-360-mock-api-ready-module-shell.md`
- `docs/tasks/release-9/README_RELEASE_9.md`
- `docs/tasks/TASK_INDEX.md`
- `docs/handoff/RELEASE_9_HANDOFF.md`
- `docs/handoff/TASK_COMPLETION_LOG.md`
- `docs/ai-context/15_CHANGELOG_CONTEXT.md`

## Acceptance Criteria

* [x] `/assets` renders Asset Registry List module shell instead of the generic route placeholder.
* [x] `/assets/[assetId]` renders Asset 360 shell instead of the generic route placeholder.
* [x] Asset Registry remains discoverable and active from the left sidebar for detail routes.
* [x] Topbar remains contextual utility chrome and does not become primary module navigation.
* [x] UI uses existing shared mock data and does not create a duplicate mock data source.
* [x] Mock/API-ready/pending-backend/disabled/Needs Review labels are visible where relevant.
* [x] Draft/preliminary guardrail language is visible for technical outputs.
* [x] No final technical, legal, certification, RBI/RLA/FFS, fit-for-operation, interval extension, risk acceptance, or asset safety logic is introduced.
* [x] Documentation progress and handoff notes are updated.

## Verification Method

* [x] `pnpm run lint` passed.
* [x] `pnpm run typecheck` passed.
* [x] `pnpm run test` passed.
* [x] `pnpm run build` passed.
* [x] `pnpm run release8:verify` passed as the latest available release verifier.
* [x] `git diff --check` reviewed; existing/new whitespace issues are tracked for cleanup.

## Anti-Slop Guardrails

- Do not convert Asset Registry into a generic SaaS asset table.
- Do not duplicate navigation source of truth.
- Do not make topbar the primary navigation.
- Do not hide missing RBAC, backend, storage, or evidence limitations.
- Do not imply final fitness, certification, RBI, RLA/FFS, legal, or risk-acceptance decisions.

## Handoff Notes

* Files changed: see `Files Changed` above.
* Summary: Implemented Asset Registry List and Asset 360 mock/API-ready route shells using existing shared R1-R4 mock data and Release 8 app shell patterns.
* Assumptions: Release 9 Step 1 can be recorded as R9-16 to distinguish runtime implementation from R9-00 through R9-15 docs-first guidance.
* Tests/checks run: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, `pnpm run build`, `pnpm run release8:verify`, `git diff --check`.
* Known limitations: No Release 9 verifier exists yet; `git diff --check` reports a pre-existing changelog trailing whitespace issue and one app-routes EOF whitespace issue to clean before commit.
* Follow-up tasks: Manual browser/visual review and Release 9 Step 2 for import/validation or deeper Asset Registry workflow implementation after approval.
* Open questions: Final RBAC authority, mandatory fields per equipment class, tag uniqueness rules, and physical schema/API integration remain open.
