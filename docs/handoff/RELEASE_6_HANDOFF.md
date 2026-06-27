# Release 6 Handoff

## Scope Completed

- R6-01 - Release 6 Documentation Consistency Check
- R6-02 - App Shell Navigation Specification
- R6-03 - Navigation Registry and Route Registry
- R6-04 - App Shell Component Split
- R6-05 - Sidebar and Topbar Hardening
- R6-06 - Breadcrumb, Role Scope, Notification, and Search
- R6-07 - Route-Based Page Shell
- R6-08 - Placeholder Module Pages
- R6-09 - Access Boundary and Functional State Labels
- R6-10 - Release 6 Verification and Handoff

## Branch

main

## Date

2026-06-27

## Files Changed

- `docs/ai-context/15_CHANGELOG_CONTEXT.md`
- `docs/ai-context/17_RELEASE_PLAN_R6_APP_SHELL_NAVIGATION.md`
- `docs/frontend/APP_SHELL_NAVIGATION_SPEC.md`
- `docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md`
- `docs/frontend/ROUTE_NAVIGATION_MATRIX.md`
- `docs/tasks/TASK_INDEX.md`
- `docs/tasks/release-6/*`
- `docs/handoff/TASK_COMPLETION_LOG.md`
- `docs/handoff/RELEASE_6_HANDOFF.md`
- `main/apps/web/app/**`
- `main/apps/web/src/components/AppShell.tsx`
- `main/apps/web/src/components/RoutePageShell.tsx`
- `main/apps/web/src/components/app-routes.ts`
- `main/apps/web/src/components/navigation-items.ts`
- `main/apps/web/src/components/app-shell-chrome.tsx`

## Summary

Release 6 is implemented as a front-end shell/navigation release. It adds route/navigation registries, split shell chrome, route-based placeholder pages, visible boundary labels, role-scope/search/digest/action placeholders, and route-page smoke coverage while preserving the Release 5 root workbench.

## Schema Changes

None.

## API Changes

None.

## UI Changes

- Root `/` still renders the Release 5 workbench.
- Release 6 route pages exist for the planned route hierarchy.
- Sidebar links navigate between route pages in route-shell mode.
- Topbar and page headers show breadcrumbs, route status, data status, role review, and non-final decision labels.
- Placeholder pages reuse shared Release 5 data and show action/evidence/access boundaries.

## RBAC/Audit Changes

No final RBAC enforcement or audit persistence changes. Role visibility remains planning-only and `Needs RBAC Review`.

## Tests Run

- `pnpm run lint` - passed
- `pnpm run typecheck` - passed
- `pnpm run test` - passed
- `pnpm run build` - passed
- `pnpm run release4:verify` - passed
- Fresh dev server route probes at `http://127.0.0.1:3007` - passed for `/`, `/dashboard`, `/assets`, `/assets/asset-demo-001`, `/integrity/rbi`, `/integrity/rbi/rbi-demo-001`, `/risk-register`, and `/state-matrix`
- Browser smoke check at `http://127.0.0.1:3007/integrity/rbi` - passed

## Assumptions

- Release 6 is front-end shell/navigation work only.
- Existing Release 5 mock data remains the shared scenario source.
- Package metadata should not be changed without explicit approval.

## Known Limitations

- No backend/API integration, database persistence, object storage, OIDC, final RBAC, or deployment work was done.
- Dynamic routes are placeholders and do not fetch object-specific production data.
- Package metadata still references Release 4.

## Follow-up Tasks

- Manual Project Owner, UBT/IT, Legal/Q&C, engineer/inspector/SME review.
- Decide whether package metadata should be updated in a metadata-only task.
- Start persistence/API/storage integration only in a future approved release.

## Open Questions

- Which route group should receive real backend integration first?
- What is the approved route-level RBAC matrix?
- When should package metadata advance beyond Release 4?
