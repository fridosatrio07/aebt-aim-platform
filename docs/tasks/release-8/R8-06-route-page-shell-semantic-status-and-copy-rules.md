# R8-06 - RoutePageShell semantic status and copy rules

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

Standardize copy, status wording, and forbidden phrasing for RoutePageShell and future industrial console pages.

## Source Basis

- docs/frontend/INDUSTRIAL_CONSOLE_UI_COPY_AND_STATUS_RULES.md
- docs/frontend/APP_SHELL_HARDENING_SPEC.md
- docs/frontend/COMPONENT_VISUAL_CONTRACT.md
- docs/ai-context/11_WORKFLOW_RULES.md (if present)

## In Scope

- Placeholder, draft/preliminary, API-ready, planned, and no-final-decision wording.
- Forbidden wording list.
- Preferred terms.
- Status taxonomy for readiness, maturity, data basis, evidence, review, access boundary, and export.

## Out of Scope

- Backend wording or legal interpretation.
- Other page templates beyond RoutePageShell pilot.

## Required Files

Documentation updates only.

## Guidance to Be Written

Explicit lists of approved wording, forbidden wording, and status taxonomy MUST be provided so RoutePageShell never implies unsupported capability or unsanctioned final decisions.

## Future Implementation Notes

Implementers MUST use approved wording only in RoutePageShell labels, banners, badges, and boundary notices.

## Acceptance Criteria

* [x] Forbidden wording is explicit.
* [x] Preferred terms are listed.
* [x] Status taxonomy is defined.
* [x] RoutePageShell-specific copy rules are stated.

## Anti-Slop Guardrails

- MUST NOT use generic positive language like modern, clean, or beautiful.
- MUST NOT use final-domain-decision wording.

## Handoff Notes

* Files changed: docs/frontend/INDUSTRIAL_CONSOLE_UI_COPY_AND_STATUS_RULES.md, docs/tasks/release-8/R8-06*.
* Summary: Semantic status and copy rules documented.
* Assumptions: Legal/Q&C wording review remains open.
* Tests/checks run: None.
* Known limitations: No runtime changes.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
