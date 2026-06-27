# R6-04 - App Shell Component Split

## Status

* [ ] Not Started
* [ ] In Progress
* [ ] Blocked
* [ ] Documentation Complete
* [ ] Code Complete
* [ ] Tests Passed
* [ ] Reviewed
* [ ] Merged
* [x] Done

## Objective

Split AppShell chrome into smaller obvious components where safe while preserving existing workbench behavior.

## Context Files to Read First

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/02_PRODUCT_SCOPE_MVP_PLUS.md
- docs/ai-context/03_TECH_STACK_BASELINE.md
- docs/ai-context/04_ARCHITECTURE_RULES.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md
- docs/ai-context/10_UI_UX_RULES.md
- docs/ai-context/11_WORKFLOW_RULES.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/16_RELEASE_PLAN_R5_R7.md
- docs/ai-context/17_RELEASE_PLAN_R6_APP_SHELL_NAVIGATION.md
- docs/frontend/APP_SHELL_NAVIGATION_SPEC.md
- docs/frontend/FRONTEND_PAGE_BUILD_SPEC.md
- docs/frontend/ROUTE_NAVIGATION_MATRIX.md
- docs/frontend/REUSABLE_COMPONENT_CONTRACT.md
- docs/frontend/FUNCTIONAL_BOUNDARY_MAP.md

## Source Basis

- Reviewed project source documents under E:\Project\AEBT's AIM Platform\Kajian\.
- Existing Release 0-5 repository documentation.
- Existing web app files under main/apps/web/.

## Scope

Extract shell chrome only; keep module page content stable.

## Out of Scope

- Backend implementation, database persistence, object storage integration, authentication/OIDC, final RBAC enforcement, migrations, deployments, package changes, dependency additions, broad redesign, and final legal/certification/RBI/RLA/FFS/fit-for-operation decision logic.

## Allowed Files / Folders

- docs/tasks/release-6/
- docs/frontend/APP_SHELL_NAVIGATION_SPEC.md
- docs/ai-context/17_RELEASE_PLAN_R6_APP_SHELL_NAVIGATION.md
- docs/tasks/TASK_INDEX.md
- docs/ai-context/15_CHANGELOG_CONTEXT.md
- docs/handoff/
- main/apps/web/src/components/ only when this task is approved for implementation

## Protected Files / Folders

- main/package.json unless explicitly approved.
- main/packages/database/ and migration files.
- main/apps/api/ backend source.
- Source documents under E:\Project\AEBT's AIM Platform\Kajian\.
- Any file outside E:\Project\AEBT's AIM Platform\Source Code.

## Functional Requirements

- Preserve Release 5 workbench behavior.
- Keep route/navigation changes controlled and front-end only.
- Use existing mock data rather than creating per-page duplicate data.
- Maintain tenant/project/site/facility scope visibility as placeholder/planning state.

## UI/UX Requirements

- Keep UI compact, table-led, action-led, evidence-first, risk-aware, and dashboard-to-action.
- Show Mock, API-ready, Pending Backend, Disabled, Draft, Preliminary, Data Gap, Limited Basis, or Needs Review labels where applicable.
- Do not use misleading final decision labels.

## Data / Mock Data Requirements

- Use main/apps/web/src/components/release5-data.ts as the shared scenario source.
- Do not create inconsistent mock data per page.

## API / Backend Boundary

- Mock/API-ready front-end only unless this task explicitly states otherwise.
- No production API calls or database persistence.

## RBAC / Permission Notes

- Role visibility planning only.
- Final enforcement remains Needs RBAC Review.

## Audit / Evidence / Traceability Notes

- Preserve visible audit/evidence/source-basis/status-history concepts already in Release 5 UI and docs.
- Do not claim persistent audit storage unless already implemented and verified.

## Draft / Preliminary Decision Guardrail

- UI must not imply final asset safety, fit-for-operation, certification readiness, RBI approval, RLA/FFS conclusion, legal compliance, interval extension, or risk acceptance.

## Acceptance Criteria

* [x] Required files are updated within allowed scope.
* [x] Release 5 workbench behavior remains available.
* [x] Functional boundary labels remain visible where relevant.
* [x] No unsupported domain logic is introduced.

## Required Checks

* [x] Documentation updated
* [x] Lint passed
* [x] Typecheck passed
* [x] Unit tests passed where applicable
* [x] Build passed where applicable
* [x] Existing release verification still passes where applicable
* [x] No unsupported domain logic introduced
* [x] No final technical/legal/certification decision introduced
* [x] Handoff notes updated

## Handoff Notes

* Files changed: main/apps/web/app/**; main/apps/web/src/components/AppShell.tsx; main/apps/web/src/components/RoutePageShell.tsx; main/apps/web/src/components/app-routes.ts; main/apps/web/src/components/navigation-items.ts; main/apps/web/src/components/app-shell-chrome.tsx; main/apps/web/app/layout.tsx; docs/tasks/release-6/*; docs/frontend/APP_SHELL_NAVIGATION_SPEC.md; docs/ai-context/17_RELEASE_PLAN_R6_APP_SHELL_NAVIGATION.md; docs/tasks/TASK_INDEX.md; docs/ai-context/15_CHANGELOG_CONTEXT.md; docs/handoff/*
* Summary: Split shell chrome into reusable components while preserving the Release 5 root workbench.
* Assumptions: Release 6 remains front-end/navigation-shell only; backend, persistence, object storage, OIDC, and final RBAC are future releases.
* Tests/checks run: pnpm run lint, pnpm run typecheck, pnpm run test, pnpm run build, pnpm run release4:verify, route HTTP probes on port 3007, and browser smoke check passed.
* Known limitations: Package metadata still references Release 4; final RBAC, API, storage, deployment, and domain authority reviews remain open.
* Follow-up tasks: Manual review, package metadata decision, and future Release 7/API-persistence planning.
* Open questions: Which route group should receive real backend integration first, and when package metadata should be updated.

