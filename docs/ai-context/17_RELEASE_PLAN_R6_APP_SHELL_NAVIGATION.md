# Release Plan R6 - App Shell, Navigation Hardening, Route-Based Page Shell

## Release Title
Release 6 - App Shell, Navigation Hardening, Route-Based Page Shell

## Objective
Harden the AIM Platform front-end shell and navigation foundations so the current Release 5 workbench can evolve into route-based pages in controlled future tasks.

## Rationale
Release 5 created a usable workbench and front-end control documents. Release 6 adds maintainability by separating shell/navigation metadata from page content and by documenting the route hierarchy before route folders are created.

## Dependencies
- Release 0 platform foundation and quality scripts.
- Release 1 data/document foundations.
- Release 2 action queues and dashboard-to-action foundations.
- Release 3 inspection, certification, evidence surfaces.
- Release 4 integrity/RBI controlled skeleton.
- Release 5 front-end usability and design-system hardening.

## In Scope
- Release 6 planning documents and task packets.
- App shell navigation specification.
- Route registry and navigation registry.
- Safe AppShell chrome split.
- Sidebar/topbar hardening to consume the registry.
- Mock/API-ready/pending-backend/needs-review labels.
- Documentation, task index, changelog, and handoff updates.

## Out of Scope
- Route folder rollout for all modules unless separately approved.
- Backend integration, persistence, object storage, OIDC, final RBAC, migrations, package changes, dependency additions, deployments, and final technical/legal/certification/RBI/RLA/FFS/fit-for-operation logic.

## Task Index Summary
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
- Release 6 documentation pack exists.
- Route/navigation registry exists and covers required planned routes.
- App shell consumes registry for navigation metadata.
- Release 5 workbench remains functional.
- Checks pass: `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, `pnpm run build`.
- No migration, dependency addition, package file change, backend implementation, or final domain-decision logic is introduced.

## Documentation Inconsistencies Found
- Historical task completion log entries for Release 0 state the repository was not currently a Git repository, but the current repository is on branch `main` with three commits.
- `main/package.json` still uses version/description text ending at Release 4, while Release 5 implementation docs and UI exist. This should be handled as a future documentation/package metadata decision, not silently changed in R6 unless approved.
- Existing app is a single root page, while front-end docs plan many routes. Release 6 should bridge this with route registry planning before route folders are created.

## Anti-Hallucination Notes
All route, role, status, and action labels are planning/control metadata only unless supported by implemented code and reviewed source documents. Final legal, certification, RBI, RLA/FFS, fit-for-operation, interval extension, risk acceptance, and asset safety decisions remain human decisions.

## Open Blockers
- Final RBAC route visibility matrix.
- Final route folder migration plan.
- Final API contract and backend persistence for planned routes.
- Design-token formalization beyond current CSS conventions.
- Production search/notification/quick-action behavior.


