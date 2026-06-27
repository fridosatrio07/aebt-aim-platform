# R8-08 - Implementation sequencing and non-bulk coding guardrails

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

Prescribe the phased implementation sequence and guardrails that prevent bulk rewrites or scattershot code changes during future Release 8 runtime work.

## Source Basis

- docs/ai-context/19_RELEASE_PLAN_R8_UI_RUNTIME_TOKENIZATION_ROUTE_PAGE_SHELL.md
- docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md
- main/apps/web/src/components/RoutePageShell.tsx
- main/apps/web/app/globals.css
- main/apps/web/tailwind.config.ts

## In Scope

- Phase 1 inspect current UI runtime.
- Phase 2 implement tokens.
- Phase 3 RoutePageShell pilot.
- Phase 4 manual visual review.
- Phase 5 handoff.
- Guardrails against bulk rewrites and unrelated module changes.

## Out of Scope

- Backend or API sequencing.
- Documentation of later releases beyond scope control.

## Required Files

Documentation updates only.

## Guidance to Be Written

The guide MUST specify an exact sequence, per-phase checks, and explicit boundaries such as no full dashboard rewrite, no other route refactor, no new dependencies, no package metadata changes, no verification script changes, and no claim of full compliance after RoutePageShell only.

## Future Implementation Notes

Future implementers MUST follow the sequence order and MUST NOT skip Phase 1 inspection or combine Phase 2 and Phase 3.

## Acceptance Criteria

* [x] Phase sequence is defined.
* [x] Guardrails are explicit.
* [x] Boundary rules prevent scope expansion.

## Anti-Slop Guardrails

- MUST NOT describe future releases as done after RoutePageShell pilot.
- MUST NOT approve ungrounded token values.

## Handoff Notes

* Files changed: docs/ai-context/19_RELEASE_PLAN_R8_UI_RUNTIME_TOKENIZATION_ROUTE_PAGE_SHELL.md, docs/tasks/release-8/R8-08*.
* Summary: Implementation sequencing and non-bulk coding guardrails documented.
* Assumptions: Token approval timing may delay Phase 2.
* Tests/checks run: None.
* Known limitations: No code changes executed.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
