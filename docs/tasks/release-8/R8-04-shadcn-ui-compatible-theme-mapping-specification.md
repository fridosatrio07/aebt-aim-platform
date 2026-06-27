# R8-04 - shadcn/ui-compatible theme mapping specification

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

Define how shadcn/ui variables map to AIM runtime tokens so default shadcn/ui styling is overridden before acceptance.

## Source Basis

- docs/frontend/DESIGN_TOKENS_THEME_CONTRACT.md
- docs/frontend/COMPONENT_VISUAL_CONTRACT.md
- docs/frontend/CSS_TAILWIND_TOKEN_MAPPING_PLAN.md
- docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md

## In Scope

- shadcn/ui variable to CSS variable mapping.
- Priority overrides for surface, primary, destructive, border, and ring.
- Radius/spacing scope statement.

## Out of Scope

- Component-by-component shadcn/ui retheming outside RoutePageShell.
- Adding new shadcn/ui components.
- Production acceptance of every shadcn/ui primitive.

## Required Files

Documentation updates only.

## Guidance to Be Written

shadcn/ui primitives MUST inherit AIM tokens by mapping shadcn/ui variables to CSS variables, not by accepting defaults. The target is an industrial console look, not generic white-card UI.

## Future Implementation Notes

Future implementers MUST apply the CSS variable mapping in `globals.css` and validate that shadcn/ui buttons, inputs, cards, popovers, dialogs, and toasts follow layered-surface rules.

## Acceptance Criteria

* [x] shadcn/ui variable mapping table is defined.
* [x] Surface, primary, destructive, border, and ring rules are stated.
* [x] Radius/spacing scope is clarified for later release.

## Anti-Slop Guardrails

- MUST NOT accept default shadcn/ui styling as final AIM UI.
- MUST NOT imply full shadcn/ui acceptance after one component passes.

## Handoff Notes

* Files changed: docs/frontend/CSS_TAILWIND_TOKEN_MAPPING_PLAN.md, docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md, docs/tasks/release-8/R8-04*.
* Summary: shadcn/ui theme mapping documented.
* Assumptions: Radius and typography overrides remain future work.
* Tests/checks run: None.
* Known limitations: No code changes.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
