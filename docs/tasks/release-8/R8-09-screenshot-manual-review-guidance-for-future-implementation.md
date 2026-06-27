# R8-09 - Screenshot/manual review guidance for future implementation

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

Define how future implementation step captures visual evidence and conducts manual review for RoutePageShell pilot.

## Source Basis

- docs/frontend/ROUTE_PAGE_SHELL_VISUAL_ACCEPTANCE_CRITERIA.md
- docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md
- main/apps/web/src/components/RoutePageShell.tsx

## In Scope

- Screenshot guidance.
- Manual review checklist.
- Light and dark mode review guidance.
- Review record format.

## Out of Scope

- Automated visual regression tooling.
- Performance or loading metrics.

## Required Files

Documentation updates only.

## Guidance to Be Written

Future implementers MUST record screenshots and observations from manual visual review. The guidance MUST specify what to inspect, what to capture, and what limitations to record.

## Future Implementation Notes

Manual review is not optional for RoutePageShell pilot. Screenshots or manual observation notes MUST be recorded in the handoff.

## Acceptance Criteria

* [x] Screenshot/manual review guidance is stated.
* [x] Review record format is defined.
* [x] Limitations note is included.

## Anti-Slop Guardrails

- MUST NOT state that automated tests replace visual review.
- MUST NOT claim UAT completion.

## Handoff Notes

* Files changed: docs/frontend/ROUTE_PAGE_SHELL_VISUAL_ACCEPTANCE_CRITERIA.md, docs/tasks/release-8/R8-09*.
* Summary: Screenshot/manual review guidance documented.
* Assumptions: Reviewer environment and devices are outside this task.
* Tests/checks run: None.
* Known limitations: No runtime review executed.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
