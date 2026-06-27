# Release 6 - App Shell, Navigation Hardening, Route-Based Page Shell

## Release Purpose
Release 6 hardens the AIM Platform front-end shell, navigation architecture, and route metadata while preserving the Release 5 workbench. It prepares future route-based implementation without attempting to make the platform fully operational.

## Why Release 6 Exists After Release 5
Release 5 improved usability and front-end consistency in a single-route workbench. Release 6 separates shell/navigation concerns, adds route/navigation registries, and documents route behavior so future agents can add module routes in small reviewable tasks.

## Dependencies From Release 0-5
- Foundation quality scripts, tenant/RBAC/audit concepts, and non-final decision guardrails.
- Asset, document, validation, work queue, inspection, certification, evidence, integrity/RBI, and risk surfaces from Releases 1-5.
- Release 5 UI primitives, mock data, and front-end control documents.

## Required Context Files
- `docs/ai-context/00_PROJECT_CONTEXT.md`
- `docs/ai-context/02_PRODUCT_SCOPE_MVP_PLUS.md`
- `docs/ai-context/03_TECH_STACK_BASELINE.md`
- `docs/ai-context/04_ARCHITECTURE_RULES.md`
- `docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md`
- `docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md`
- `docs/ai-context/10_UI_UX_RULES.md`
- `docs/ai-context/11_WORKFLOW_RULES.md`
- `docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md`
- `docs/ai-context/13_AGENT_OPERATING_RULES.md`
- `docs/ai-context/16_RELEASE_PLAN_R5_R7.md`
- `docs/ai-context/17_RELEASE_PLAN_R6_APP_SHELL_NAVIGATION.md`
- `docs/frontend/APP_SHELL_NAVIGATION_SPEC.md`
- `docs/frontend/FRONTEND_PAGE_BUILD_SPEC.md`
- `docs/frontend/ROUTE_NAVIGATION_MATRIX.md`
- `docs/frontend/REUSABLE_COMPONENT_CONTRACT.md`
- `docs/frontend/FUNCTIONAL_BOUNDARY_MAP.md`

## In Scope
- Create Release 6 planning and task-control documents.
- Add app shell navigation specification.
- Add route registry and navigation registry.
- Split AppShell chrome only where safe.
- Harden sidebar/topbar to use registry metadata.
- Add visible Mock/API-ready/Pending Backend/Needs Review/Disabled labels.
- Preserve Release 5 workbench content and mock data.

## Out of Scope
- Full backend integration, final API contract, database persistence, object storage, OIDC, final RBAC, migrations, deployments, AI/ML recommendations, route folder rollout, and any final domain-decision logic.

## Release-Level Anti-Hallucination Rules
- Do not invent compliance, RBI, certification, legal, RLA/FFS, fit-for-operation, inspection interval, or risk acceptance rules.
- Do not imply automatic final approval or safety decisions.
- Label unfinished functions clearly as Mock, API-ready, Pending Backend, Disabled, Draft, Preliminary, Data Gap, Limited Basis, or Needs Review.

## Front-End Usability Principles
- Workbench-first, task-first, table-led, action-led, compact, evidence-first, risk-aware, dashboard-to-action, approval by exception, human final decision.

## Functional Boundary Rules
- Route/navigation metadata is allowed.
- Visual shell placeholders are allowed.
- Real persistence, storage, final RBAC enforcement, and production APIs are not allowed in Release 6 unless separately approved.

## Task List
- [x] R6-01 - Release 6 Documentation Consistency Check
- [x] R6-02 - App Shell Navigation Specification
- [x] R6-03 - Navigation Registry and Route Registry
- [x] R6-04 - App Shell Component Split
- [x] R6-05 - Sidebar and Topbar Hardening
- [x] R6-06 - Breadcrumb, Role Scope, Notification, and Search
- [x] R6-07 - Route-Based Page Shell
- [x] R6-08 - Placeholder Module Pages
- [x] R6-09 - Access Boundary and Functional State Labels
- [x] R6-10 - Release 6 Verification and Handoff

## Exit Criteria
- Required docs exist and are updated.
- Implemented R6 tasks show Done only after checks pass and handoff notes are filled.
- Release 5 workbench remains usable.
- No unsupported final decision logic introduced.

## Required Verification Commands
Run from `main/` where applicable:
- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run build`

## Handoff Requirements
- Update affected R6 task packets.
- Update `docs/tasks/TASK_INDEX.md` only for tasks truly complete.
- Update `docs/ai-context/15_CHANGELOG_CONTEXT.md`.
- Update `docs/handoff/TASK_COMPLETION_LOG.md` and create a release handoff note if implementation occurs.

## Completion Criteria
Release 6 is not complete until all R6 task packets show Done, required checks pass, handoff notes are filled, and human review has passed.

## Known Blockers
- Final RBAC matrix and route visibility remain review items.
- Full route folder rollout is not approved in this run.
- API/backend/persistence integration remains pending.

## Open Decisions
- Whether to update `main/package.json` version/description from Release 4 metadata.
- When to migrate from root workbench to route folders.
- Final role-route visibility and permission enforcement.



## Implementation Result

- Release 6 route/navigation registries are implemented.
- App shell chrome is split into reusable sidebar/topbar/scope/search/digest/action/boundary components.
- App Router placeholder pages exist for the planned Release 6 route hierarchy.
- Placeholder pages reuse shared Release 5 mock data and show Mock/API-ready/Pending Backend/Needs Review/Draft labels.
- No backend implementation, package change, dependency addition, migration, object-storage wiring, OIDC, final RBAC, or final domain-decision logic was introduced.
- Verification passed: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, `pnpm run build`, `pnpm run release4:verify`, route HTTP probes, and browser smoke check.
