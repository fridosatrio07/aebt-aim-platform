# Release 8 Plan â€” UI Runtime Tokenization & Industrial Console Shell Implementation

## Release Title

Release 8 â€” UI Runtime Tokenization & Industrial Console Shell Implementation

## Release Objective

Convert Release 7 design-system compliance guidance into a concrete implementation plan for CSS variables, Tailwind semantic mappings, and RoutePageShell runtime application. This plan defines exactly how RoutePageShell must become the pilot industrial console page template without broad rewrites, invented requirements, or generic SaaS styling.

## Why Release 8 Exists After Release 7

Release 7 created design-system guidance, token contracts, theme definitions, component visual contracts, app-shell hardening rules, and lightweight verification scripts. However, the current runtime UI still depends on:

1. A small `aim` color set in `main/apps/web/tailwind.config.ts`.
2. Raw Tailwind utilities and hard-coded colors in `main/apps/web/src/components/release5-ui.tsx` and other components.
3. A `globals.css` with only base resets and hard-coded `background`/`color` values on `body`.
4. A `RoutePageShell.tsx` that imports Release 5 UI components and uses generic `bg-aim-field`/`text-aim-ink` patterns.

Release 8 closes the gap between documented intent and runtime reality for the RoutePageShell pilot only.

## Current UI Maturity Problem

The UI is functional but not yet token-driven. The app looks like a placeholder workbench because:

1. Semantic CSS variables do not exist.
2. Tailwind does not map token categories to operational states (risk, evidence, export, review, due, draft).
3. RoutePageShell uses generic field/ink tokens and hard-coded visual classes.
4. Dark mode is not layered; light/dark switching is not implemented via token classes.
5. shadcn/ui defaults are available but are not overridden with AIM-specific surfaces, borders, and focus rules.
6. Visual status meanings are scattered across component files instead of being governed by centralized token contracts.

Release 8 addresses these gaps in a controlled, pilot-first sequence.

## Difference Between Release 7 and Release 8

- Release 7 created design-system contracts, theme names, component visual rules, and verification guidance. No runtime code changed.
- Release 8 converts those contracts into a concrete, implementation-grade execution plan for RoutePageShell as the pilot Industrial Integrity Command Console surface.

Release 8 does not rewrite the dashboard, all page templates, or all components.

## RoutePageShell as Pilot Implementation Target

RoutePageShell is the first implementation target because:

- It is already used by all route placeholder pages under `main/apps/web/app/*`.
- It already imports reusable components from `release5-ui.tsx`, giving a centralized surface to apply tokens.
- A successful RoutePageShell pilot proves the token, theme, and shell contract before broader page or component refactor.
- It avoids a full dashboard rewrite or page-by-page bulk conversion.

RoutePageShell MUST become the pilot Industrial Integrity Command Console surface.

## Scope In

- Release 8 plan and frontend implementation guidance.
- RoutePageShell-specific industrial console layout spec.
- CSS variable runtime token specification for light and dark themes.
- Tailwind semantic token mapping plan.
- shadcn/ui-compatible theme override plan.
- RoutePageShell copy and status rules.
- RoutePageShell visual acceptance criteria.
- Implementation sequencing and non-bulk-coding guardrails.
- Task packets R8-01 through R8-10.
- Task index and changelog updates.
- Release 8 handoff documenting docs-only completion.

## Scope Out

- Runtime code implementation.
- `main/package.json` edits.
- Release verification script additions or modifications.
- Backend, API, database, Prisma, FastAPI, storage, OIDC, RBAC persistence, audit persistence, PDF extraction, or calculation service changes.
- Full dashboard rewrite or all-module page refurbishment.
- Large mock datasets, chart libraries, or production data page conversions.
- Release 7 package metadata mismatch fixup.
- Implementation of color hex values not yet approved in repository documentation.

## Runtime Tokenization Strategy

1. Define CSS variables first in `main/apps/web/app/globals.css` for both light and dark themes using semantic names aligned with `docs/frontend/DESIGN_TOKENS_THEME_CONTRACT.md` and the CSS/Tailwind mapping plan in this release.
2. Map Tailwind semantic colors next in `main/apps/web/tailwind.config.ts`, extending the color palette with token categories while preserving existing `aim` keys until migration is complete.
3. Override shadcn/ui variables through the same CSS variable names so shadcn/ui primitives inherit AIM surface, border, focus, and status semantics.
4. Toggle themes via `.light`/`.dark` class on `html` or `body` so switching is explicit and does not rely on system color-scheme media queries alone.
5. Apply tokens in RoutePageShell only in the first implementation pass; leave other routes and components behind until subsequent implementation tasks.

### Layer Rules

- Layer 1: CSS variables. Define every required semantic token.
- Layer 2: Tailwind mapping. Expose each token as a Tailwind color key.
- Layer 3: shadcn/ui map. Tie shadcn/ui token names to CSS variables.
- Layer 4: RoutePageShell application. Use semantic classes instead of hard-coded utilities or `aim` colors.
- Layer 5: Dark mode toggle. Wire theme switching after RoutePageShell pilot proves stable in both modes.

## Industrial Console Shell Strategy

RoutePageShell must visually communicate operational context through:

- Layered surfaces rather than flat backgrounds.
- Strong breadcrumb/route-header hierarchy.
- Module identity and scope/status strips.
- Compact operational status cards.
- Primary and secondary action rows with explicit disabled states.
- Technical readiness, evidence/review/audit visibility, route implementation status, linked route/action, and limitation notices.
- Non-color-only status labels (text plus icon or pattern).
- Draft/preliminary visibility preserved at page and section level.

The shell MUST feel engineered for asset integrity operations, not marketing, analytics decoration, or generic admin UX.

## Required Implementation Sequence for a Future Coding Step

### Phase 1 â€” Inspect Current UI Runtime

- Read `main/apps/web/app/globals.css`.
- Read `main/apps/web/tailwind.config.ts`.
- Read `main/apps/web/src/components/RoutePageShell.tsx`.
- Read `main/apps/web/src/components/release5-ui.tsx`.
- Read `main/apps/web/src/components/AppShell.tsx`, `app-shell-chrome.tsx`, `app-routes.ts`.
- Identify minimal change surface.

### Phase 2 â€” Implement Tokens

- Add CSS variables for light and dark themes.
- Add semantic Tailwind color mapping.
- Keep existing classes working where possible.
- Avoid replacing all class names at once.

### Phase 3 â€” RoutePageShell Pilot

- Refactor only RoutePageShell.
- Use semantic token classes.
- Add status badges if existing component patterns support it.
- Add context strip, operational cards, evidence/review/audit panels, and limitation banner.
- Keep mock/API-ready wording honest.

### Phase 4 â€” Manual Visual Review

- Check light mode.
- Check dark mode.
- Check mobile/tablet only for breakage, but keep desktop-first.
- Check status does not rely on color only.
- Check no final-decision wording appears.

### Phase 5 â€” Handoff

- Record changed files.
- Record screenshots/manual observations if available.
- Record limitations.

## Acceptance Criteria

- CSS token layer is defined and active for both light and dark themes.
- Tailwind semantic mapping exists for all required token categories.
- RoutePageShell visually changes through semantic tokens only.
- UI reads as technical command console, not generic SaaS.
- RoutePageShell truthfully preserves mock/API-ready/planned status.
- No backend, RBAC, audit persistence, or production integration claims are introduced.
- Implementation remains limited to RoutePageShell and its dependencies.
- No bulk one-off color classes are introduced when a semantic token exists.

## Non-Goals

- Full app-wide token migration.
- Full component library refactor.
- Full dashboard rewrite.
- Backend or data-layer changes.
- User-facing theme switcher.
- Large asset/integrity/evidence dataset creation.
- Final hex value approval.

## Known Risks

- Existing components depend on `aim.*` Tailwind colors and hard-coded utilities; partial token migration must not break other routes inadvertently.
- shadcn/ui primitive behavior may conflict with compact industrial density if radius, padding, and typography are not overridden correctly.
- Dark mode layered surfaces require explicit token values; a lazy inversion will be rejected.
- RoutePageShell is central; changes here affect all 20+ placeholder modules. Regression risk is real.
- Release 7 queries for final token hex values; until approved, tokens may use placeholder values recorded in the token decision log.

## Handoff Requirements

- Updated `docs/handoff/RELEASE_8_HANDOFF.md` stating docs-only completion.
- Updated `docs/tasks/TASK_INDEX.md` with Release 8 task list.
- Updated `docs/ai-context/15_CHANGELOG_CONTEXT.md` with Release 8 entry.
- Clear next-step title for implementer: `Release 8 Implementation Step 1 â€” Runtime Tokens and RoutePageShell Pilot`.

## Explicit Docs-Only Boundary

This task documents Release 8 only. It does not implement runtime UI, does not edit `main/package.json`, does not add or modify verification scripts, and does not fix Release 7 package metadata mismatches. The implementation agent must perform code changes only after this documentation package is reviewed and approved.
## Implementation Completion Addendum

Release 8 implementation was completed on 2026-06-27 for the controlled pilot scope. The docs-only boundary above describes the planning package that existed before implementation. The implemented scope is limited to runtime tokenization and RoutePageShell/AppShell pilot hardening.

Implemented items:

- CSS runtime tokens in main/apps/web/app/globals.css for AEBT Precision Light and AEBT Control Room Dark placeholders.
- Tailwind semantic token mappings in main/apps/web/tailwind.config.ts, while retaining existing im keys for compatibility.
- RoutePageShell pilot refactor using semantic tokens, operational context, readiness rail, visible boundary notices, and no-final-decision wording.
- App shell chrome token usage for sidebar, topbar, breadcrumb, role scope, search, notification, quick action, and access boundary placeholders.
- Tokenized shared UI primitives used by the route shell.
- Release 8 package metadata and lightweight elease8:verify script.

Still out of scope:

- Full app-wide page redesign.
- Backend/API/database/storage/OIDC/RBAC persistence.
- Final token value approval.
- Browser screenshot/manual accessibility review.
- Any final technical, legal, certification, RBI/RLA/FFS, fit-for-operation, interval extension, or risk acceptance decision logic.
