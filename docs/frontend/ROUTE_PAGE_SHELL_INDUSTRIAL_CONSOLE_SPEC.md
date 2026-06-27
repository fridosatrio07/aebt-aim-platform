# RoutePageShell Industrial Console Spec

## Objective

Define exactly how the existing `RoutePageShell` in `main/apps/web/src/components/RoutePageShell.tsx` must be transformed from a generic route placeholder into the pilot Industrial Integrity Command Console surface for Release 8.

## Current State

RoutePageShell currently:

- Imports Release 5 UI primitives from `release5-ui.tsx`.
- Uses `bg-aim-field text-aim-ink` on the main container.
- Renders a route header, preview table, and boundary banners.
- Is rendered by every route page under `main/apps/web/app/*`.

It is functional but not token-driven and does not communicate industrial console identity.

## Target Role

RoutePageShell must become the first production-style AIM template that reads as an Industrial Integrity Command Console surface. It is the pilot for token-driven, dark-capable, compact, evidence-aware, and boundary-labelled page layouts.

RoutePageShell MUST be reusable across placeholder, detail, list, and workflow routes once proven.

## Required Visual Sections

- Route header with breadcrumb, route title, module group, route status badge, draft/preliminary badge if relevant, and short operational description.
- Context strip for tenant/project/site placeholder, role/access scope placeholder, data source basis placeholder, and mock/API-ready status.
- Primary action row with primary placeholder action, secondary action, disabled action where capability is future/pending, and no fake working action.
- Main body with 3 to 4 operational cards, readiness/evidence/review/audit panels, route dependency panel, and future implementation notes.
- Footer or notice with a clear boundary statement that no final technical decision is made.

## UI Tone Rules

RoutePageShell MUST read as industrial, technical, audit-ready, compact, dense but readable, and not generic SaaS.

## Placeholder and Boundary Rules

- RoutePageShell MUST clearly state when a route is mock, API-ready, planned, or pending backend.
- RoutePageShell MUST NOT pretend backend persistence, RBAC enforcement, audit persistence, API integration, or real production data exists if it does not.
- Draft/preliminary status MUST remain visible.
- Semantic badges MUST be used for module status, route status, data basis, review status, evidence state, and access boundary.

## Container Rules

- Use a full-width workbench area.
- Use layered background and surface cards.
- Use strong header hierarchy.
- Compact max width is allowed only if the existing app shell requires it.