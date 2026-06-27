# R8-02 - CSS variable runtime token specification

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

Define the exact CSS variable set, naming, theme structure, and application rules for `main/apps/web/app/globals.css`.

## Source Basis

- docs/frontend/DESIGN_TOKENS_THEME_CONTRACT.md
- docs/frontend/CSS_TAILWIND_TOKEN_MAPPING_PLAN.md
- docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md
- main/apps/web/app/globals.css

## In Scope

- Light and dark theme variable definitions.
- Layered surface rules.
- Non-color-only status guidance at the CSS token level.
- Token decision log convention.

## Out of Scope

- Code edits in this docs-only task.
- Backend styling or service styling.

## Required Files

Documentation updates only. No source files modified.

## Guidance to Be Written

AEBT Precision Light and AEBT Control Room Dark themes MUST use layered surfaces. Dark mode MUST NOT be a simple color inversion. Base, surface, border, text, brand, intelligence, integrity, operational state, risk, due, evidence, export, and review tokens MUST be defined or referenced for later implementation.

## Future Implementation Notes

Future implementers MUST map these CSS variables in `globals.css` and link them through Tailwind mapping. Hex values MUST be sourced from approved design-system guidance or recorded in the token decision log.

## Acceptance Criteria

* [x] Required token categories are listed.
* [x] Light theme and dark theme variable rules are stated.
* [x] Layered surface and non-inversion rules are stated.
* [x] Token decision log convention is defined.

## Anti-Slop Guardrails

- MUST NOT invent ungrounded colors.
- MUST NOT claim visual review or production readiness.

## Handoff Notes

* Files changed: docs/frontend/CSS_TAILWIND_TOKEN_MAPPING_PLAN.md, docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md, docs/tasks/release-8/R8-02*, docs/tasks/TASK_INDEX.md.
* Summary: CSS variable token specification documented for future runtime implementation.
* Assumptions: Token hex values await final design-system approval.
* Tests/checks run: None.
* Known limitations: No code changes performed.
* Follow-up tasks: R8-03 Tailwind mapping, R8-04 shadcn/ui mapping, and implementation prompt.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
