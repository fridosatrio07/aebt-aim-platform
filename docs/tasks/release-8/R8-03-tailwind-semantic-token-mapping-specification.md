# R8-03 - Tailwind semantic token mapping specification

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

Define the Tailwind color configuration transformation required to expose CSS variables through semantic keys in `main/apps/web/tailwind.config.ts`.

## Source Basis

- docs/frontend/CSS_TAILWIND_TOKEN_MAPPING_PLAN.md
- docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md
- main/apps/web/tailwind.config.ts

## In Scope

- Semantic color key naming.
- Mapping from Tailwind key to CSS variable.
- Existing `aim` key retention rules.
- Avoidance of decorative color keys.

## Out of Scope

- Token hex value approval.
- Radius, spacing, or typography overrides.
- Runtime code edits.

## Required Files

Documentation updates only.

## Guidance to Be Written

Tailwind color extension MUST introduce semantic keys only. No new decorative palette is added. Existing `aim` keys are retained until later migration passes replace them.

## Future Implementation Notes

`tailwind.config.ts` MUST extend colors under a semantic namespace. Each key points to a CSS variable. shadcn/ui maps to selected keys where appropriate.

## Acceptance Criteria

* [x] Semantic key set is defined.
* [x] Mapping table exists.
* [x] `aim` key retention rule is stated.

## Anti-Slop Guardrails

- MUST NOT add generic palette keys like `gray`, `slate`, or `zinc` if they do not map to AIM operational tokens.
- MUST NOT claim implementation complete.

## Handoff Notes

* Files changed: docs/frontend/CSS_TAILWIND_TOKEN_MAPPING_PLAN.md, docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md, docs/tasks/release-8/R8-03*.
* Summary: Tailwind semantic token mapping documented.
* Assumptions: Hex values require approval.
* Tests/checks run: None.
* Known limitations: No runtime changes.
* Follow-up tasks: R8-04 shadcn/ui mapping and implementation prompt.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
