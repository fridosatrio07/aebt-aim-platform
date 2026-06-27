# App Shell Sidebar Restoration Spec

## Purpose

Release 9 must preserve and harden the conventional desktop-first left sidebar as the AIM Platform primary navigation pattern. The platform must look and behave like an enterprise technical workbench, not a top-nav-only landing page or generic website header. The Industrial Integrity Command Console direction from Release 7 and Release 8 remains the visual and interaction baseline.

This document is guidance only. It does not implement runtime navigation code.

## Source Basis

- `main/apps/web/src/components/AppShell.tsx`
- `main/apps/web/src/components/RoutePageShell.tsx`
- `main/apps/web/src/components/app-shell-chrome.tsx`
- `main/apps/web/src/components/app-routes.ts`
- `main/apps/web/src/components/navigation-items.ts`
- `docs/frontend/APP_SHELL_NAVIGATION_SPEC.md`
- `docs/frontend/APP_SHELL_HARDENING_SPEC.md`
- `docs/ai-context/19_RELEASE_PLAN_R8_UI_RUNTIME_TOKENIZATION_ROUTE_PAGE_SHELL.md`
- Asset Registry MBS, Rev. 1, sections J and K for Asset Registry List and Asset Detail navigation expectations.

## Current State Summary

The runtime already contains `AppSidebar`, `AppTopbar`, `app-routes.ts`, and `navigation-items.ts`. Release 9 implementation MUST reuse this existing navigation direction. It MUST NOT create a second competing navigation system.

## Primary Navigation Rule

- Left sidebar = primary module and route navigation.
- Module navigation MUST be in the left sidebar.
- Sidebar MUST contain route groups/modules.
- Sidebar MUST show active route state.
- Sidebar MUST support collapsed and expanded state.
- Sidebar MUST remain persistent on desktop.
- Sidebar MAY become drawer/off-canvas on smaller screens, but Release 9 remains desktop-first.
- Route hierarchy, active module state, collapsed sidebar behavior, and access-scope context MUST be sidebar-driven.

## Topbar Rule

Topbar is a contextual utility bar only. It MUST NOT contain the full module navigation.

Topbar MAY contain:

- breadcrumb;
- tenant/project/site/facility context;
- role/access scope indicator;
- global search placeholder;
- notification digest placeholder;
- quick action placeholder;
- user/profile/help area if already present.

Topbar MUST NOT become the primary module navigation, MUST NOT duplicate every sidebar route, and MUST NOT hide sidebar route state.

## Sidebar Route Grouping

The sidebar must support the AIM Platform MVP+ navigation structure:

- Dashboard
- My Work / Action Inbox
- Project & Data Intake
- Asset Registry
- Inspection Tracking
- Certification Register
- Integrity / RBI
- Risk Register
- Document Repository
- Evidence Pack Builder
- Reviewer Work Queue
- Administration
- Helpdesk / Bug Log

For Release 9, Asset Registry MUST be clearly visible in the sidebar and active when the route is any Asset Registry child route.

## Release 9 Asset Registry Sidebar Behavior

Asset Registry navigation MUST:

- indicate active state for Asset Registry child routes;
- keep Asset Detail / Asset 360 as contextual child/detail route, not a confusing duplicate top-level sidebar item;
- support quick access to Asset Registry List;
- treat Asset Import / Validation Queue and Asset Hierarchy / Taxonomy as child/contextual routes if later implemented;
- show disabled/planned state only when the route is not implemented;
- avoid implying production readiness if the page is still mock/API-ready;
- use route registry/navigation registry as the source of truth.

## Layout Rule

Future runtime layout MUST use:

- left sidebar column;
- main content workbench area;
- topbar above the main content or integrated into the app shell as a contextual utility row;
- no full-width horizontal primary nav occupying the top of the page;
- no duplicate primary navigation in both sidebar and topbar.

## Future Implementation Boundary

Future implementation MUST:

- reuse existing `AppSidebar` and `AppTopbar` concepts where possible;
- avoid creating a second parallel `Sidebar` component unless the existing component is technically unusable;
- avoid broad page rewrite;
- avoid changing business module logic;
- avoid changing backend/API/database/package metadata;
- keep navigation state route-based;
- keep sidebar styling tokenized using Release 8 runtime tokens;
- preserve draft/preliminary, mock/API-ready, pending-backend, and needs-review status language.

## Acceptance Criteria For Future Implementation

- [ ] Primary module navigation is visually and structurally in the left sidebar.
- [ ] Topbar no longer behaves as primary module navigation.
- [ ] Active route state is visible in the sidebar.
- [ ] Collapsed sidebar remains usable.
- [ ] Asset Registry route is discoverable from the sidebar.
- [ ] Asset Detail uses breadcrumb/detail context instead of a duplicate top-level navigation item.
- [ ] Layout still follows Industrial Integrity Command Console direction.
- [ ] No backend/API/database implementation is introduced.
- [ ] No unrelated module rewrite is performed.

## Anti-Slop Guardrails

- Do not create generic navbar/sidebar prose.
- Do not say "make sidebar better" without exact layout rules.
- Do not duplicate navigation source of truth.
- Do not hard-code route labels in multiple places if route registry/navigation item source already exists.
- Do not move all actions into sidebar.
- Do not overload sidebar with every detail route.
- Do not make topbar the primary navigation.
- Do not claim navigation security/RBAC is final if only UI routing is implemented.
- Do not implement code in this docs-first task.