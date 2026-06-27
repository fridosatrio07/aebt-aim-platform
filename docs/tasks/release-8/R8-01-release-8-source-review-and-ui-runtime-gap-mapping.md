# R8-01 - Release 8 source review and UI runtime gap mapping

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

Map the gap between Release 7 design-system contracts and the current runtime UI assets to guide the RoutePageShell pilot.

## Source Basis

- docs/ai-context/19_RELEASE_PLAN_R8_UI_RUNTIME_TOKENIZATION_ROUTE_PAGE_SHELL.md
- docs/frontend/DESIGN_SYSTEM_COMPLIANCE_SPEC.md
- docs/frontend/DESIGN_TOKENS_THEME_CONTRACT.md
- docs/frontend/COMPONENT_VISUAL_CONTRACT.md
- docs/frontend/APP_SHELL_HARDENING_SPEC.md
- docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md
- docs/frontend/CSS_TAILWIND_TOKEN_MAPPING_PLAN.md
- docs/frontend/ROUTE_PAGE_SHELL_INDUSTRIAL_CONSOLE_SPEC.md
- main/apps/web/app/globals.css
- main/apps/web/tailwind.config.ts
- main/apps/web/src/components/RoutePageShell.tsx
- main/apps/web/src/components/release5-ui.tsx
- main/apps/web/src/components/AppShell.tsx
- main/apps/web/src/components/app-shell-chrome.tsx
- main/apps/web/app/layout.tsx

## In Scope

- Document current runtime gaps.
- Record minimal change surface.
- Record assumptions and open questions.

## Out of Scope

- Runtime code changes.
- Backend/API/database/storage/OIDC/RBAC changes.
- Package metadata or verification script changes.

## Required Files

This task updates documentation only. No source code is modified.

## Acceptance Criteria

* [x] Gap map identifies CSS variable, Tailwind, shadcn/ui, and RoutePageShell touchpoints.
* [x] Open questions and assumptions are recorded.
* [x] Guidance is grounded in inspected repository files only.

## Verification Method

Repository and documentation inspection only.

## Anti-Slop Guardrails

- MUST use precise AIM workflow and shell language.
- MUST NOT invent hex values or token mappings beyond the documented spec.
- MUST NOT claim runtime implementation is complete.

## Handoff Notes

* Files changed: docs/ai-context/19_RELEASE_PLAN_R8_UI_RUNTIME_TOKENIZATION_ROUTE_PAGE_SHELL.md, docs/frontend/*, docs/tasks/release-8/*, docs/tasks/TASK_INDEX.md, docs/ai-context/15_CHANGELOG_CONTEXT.md, docs/handoff/RELEASE_8_HANDOFF.md, docs/handoff/TASK_COMPLETION_LOG.md.
* Summary: Mapped current runtime gaps for Release 8 RoutePageShell pilot.
* Assumptions: Token values must be approved before final implementation; existing `aim` colors are retained for other components during pilot.
* Tests/checks run: None. Documentation task only.
* Known limitations: No runtime implementation performed; Release 7 package metadata mismatch remains open and intentionally untouched.
* Follow-up tasks: Future implementation prompt `Release 8 Implementation Step 1 â€” Runtime Tokens and RoutePageShell Pilot`.
* Open questions: Approved token hex values, shadcn/ui radius/typography overrides, and final stakeholder review owners for visual acceptance.

## Implementation Completion Update

- Runtime implementation for the controlled Release 8 scope is complete.
- Required checks passed after implementation: pnpm run release8:verify, pnpm run lint, pnpm run typecheck, pnpm run test, and pnpm run build.
- No backend, API, database, migration, dependency, or final domain-decision logic was introduced.
- Manual visual/accessibility review and final token approval remain open follow-up items.
