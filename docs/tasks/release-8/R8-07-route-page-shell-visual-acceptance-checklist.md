# R8-07 - RoutePageShell visual acceptance checklist

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

Define manual and visual acceptance criteria for RoutePageShell after runtime token implementation.

## Source Basis

- docs/frontend/ROUTE_PAGE_SHELL_VISUAL_ACCEPTANCE_CRITERIA.md
- docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md
- docs/frontend/APP_SHELL_HARDENING_SPEC.md
- main/apps/web/src/components/RoutePageShell.tsx

## In Scope

- Token usage acceptance.
- Visual hierarchy acceptance.
- Dark and light mode acceptance.
- Non-color-only status acceptance.
- Draft/preliminary wording acceptance.
- Placeholder clarity acceptance.
- Anti-generic SaaS acceptance.
- Maintainability and scope control acceptance.

## Out of Scope

- Full app-wide visual audit.
- Production performance metrics.

## Required Files

Documentation updates only.

## Guidance to Be Written

A reviewer-focused checklist MUST describe what good enough means for RoutePageShell pilot, including what to inspect in screenshots or manual review and what failures to reject.

## Future Implementation Notes

Future implementation MUST run this checklist before marking R8-07 review complete.

## Acceptance Criteria

* [x] Reviewer checklist exists.
* [x] Pass/fail criteria are stated.
* [x] Screenshot/manual review guidance is present.

## Anti-Slop Guardrails

- MUST NOT state that visual review replaces Project Owner or SME review.
- MUST NOT over-specify snapshot dimensions or browser settings.

## Handoff Notes

* Files changed: docs/frontend/ROUTE_PAGE_SHELL_VISUAL_ACCEPTANCE_CRITERIA.md, docs/tasks/release-8/R8-07*.
* Summary: Visual acceptance checklist documented.
* Assumptions: Manual review remains required after implementation.
* Tests/checks run: None.
* Known limitations: No runtime review performed.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
