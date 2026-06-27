# R8-05 - RoutePageShell industrial console layout specification

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

Define the exact target layout, section order, and visual behavior for RoutePageShell as the pilot Industrial Integrity Command Console page template.

## Source Basis

- docs/frontend/ROUTE_PAGE_SHELL_INDUSTRIAL_CONSOLE_SPEC.md
- docs/frontend/APP_SHELL_HARDENING_SPEC.md
- docs/frontend/COMPONENT_VISUAL_CONTRACT.md
- main/apps/web/src/components/RoutePageShell.tsx
- main/apps/web/src/components/release5-ui.tsx
- main/apps/web/src/components/AppShell.tsx
- main/apps/web/src/components/app-shell-chrome.tsx

## In Scope

- Route header, breadcrumb, module identity, scope/status strip, status cards, action row, readiness/evidence/review/audit panels, implementation status, linked route/action, and limitation banner.
- Industrial, technical, compact, audit-ready tone rules.
- Mock/API-ready/planned wording and disabled action states.

## Out of Scope

- Full route-page template rollout to all modules.
- Backend wiring or mock data expansion.

## Required Files

Documentation updates only.

## Guidance to Be Written

The spec MUST state container, header, context strip, action row, main body, and footer/notice expectations with enough precision for later implementation without invention.

## Future Implementation Notes

Future implementers MUST refactor only RoutePageShell and keep boundary banners explicit about non-final status, no persistence, and no production integration.

## Acceptance Criteria

* [x] Required visual sections are enumerated.
* [x] Tone and anti-generic SaaS rules are included.
* [x] Placeholder clarity and non-final status rules are stated.

## Anti-Slop Guardrails

- MUST NOT describe decorative marketing presentation.
- MUST NOT claim backend or production data availability.

## Handoff Notes

* Files changed: docs/frontend/ROUTE_PAGE_SHELL_INDUSTRIAL_CONSOLE_SPEC.md, docs/tasks/release-8/R8-05*.
* Summary: RoutePageShell layout specification documented.
* Assumptions: Exact copy and badge components may depend on existing release5-ui primitives.
* Tests/checks run: None.
* Known limitations: No runtime implementation.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
