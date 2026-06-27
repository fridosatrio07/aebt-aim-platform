# RoutePageShell Visual Acceptance Criteria

## Objective

Define what "done enough" looks like for the RoutePageShell pilot in Release 8. This file is the manual review checklist for the future implementation step.

## Token Layer

- All color decisions in RoutePageShell flow through CSS variables.
- No new hard-coded hex values are introduced in RoutePageShell when a mapped token exists.
- Existing `aim` keys MAY remain in imported Release 5 UI primitives only if RoutePageShell itself uses semantic tokens; subsequent releases shrink `aim` usage.

## Visual Hierarchy

- Route header, breadcrumb, module identity, and status badges MUST create a clear scan path.
- Status badges MUST be text plus color; text MUST never be omitted.
- Cards and panels MUST use layered surfaces rather than flat backgrounds.
- Action row MUST clearly separate primary, secondary, and disabled futures.

## Dark and Light Mode

- Both modes MUST render readable text and visible boundaries.
- Dark mode MUST use layered surfaces (`surface-1`, `surface-2`, `surface-3`), not simple inversion.
- Focus rings and borders MUST remain visible in both modes.

## Non-Color-Only Status

- Every status MUST include text or an icon label.
- Color MUST NOT be the only signal for risk, evidence, review, export, or draft state.

## Draft or Preliminary Wording

- Draft/preliminary labels MUST remain visible on any technical output or boundary notice.
- No final decision wording MAY appear without explicit authorized-review qualification, which is not implemented at this stage.

## Placeholder Clarity

- Mock, API-ready, planned, pending backend, and disabled states MUST be explicitly labelled.
- Actions MUST NOT imply functionality that does not exist.

## Anti-Generic SaaS Look

- RoutePageShell MUST NOT look like a generic admin dashboard, decorative marketing surface, or default shadcn/ui card grid.
- Industrial console identity MUST come from compact density, strong hierarchy, layered surfaces, and boundary-labelled operational context.

## Maintainability

- Token-driven classes MUST be reusable across RoutePageShell sections.
- One-off color utilities MUST NOT be introduced when a token exists.
- Token decision log MUST be updated when new visual needs are discovered.

## No Bulk Code

- RoutePageShell pilot MUST NOT trigger a full app-wide refactor.
- Other routes and components MUST NOT be modified in the pilot implementation.

## No Unrelated Module Changes

- RoutePageShell changes MUST NOT alter navigation, RBAC, API client, data model, or backend wiring.

## Review Checklist for Future Implementation

- Light mode screenshot captured.
- Dark mode screenshot captured.
- Status text visible on all badges.
- No final-decision wording verified.
- Placeholder and boundary banners visible.
- Token classes used throughout RoutePageShell.
- No hard-coded hex values introduced where tokens exist.
- Maintainability notes recorded.
- Limitations and follow-up items recorded.