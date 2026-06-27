# App Shell Hardening Spec

## Purpose
This spec hardens the Release 6 app shell and route-page shell into an AIM-specific operational console contract for future implementation work.

## Sidebar Behavior
- Sidebar MUST use semantic design tokens for surface, active state, border, text, and focus.
- Active state MUST be route-based on route pages and workbench-tab based on `/`.
- Each item MUST show route status/data readiness where relevant: Mock, API-ready, Pending Backend, Planned, Disabled, or Needs Review.
- Sidebar MUST NOT hide access limitation, mock status, or missing RBAC enforcement.

## Topbar Behavior
- Topbar MUST show operational context, not decorative filler.
- Required controls: tenant/project/site/facility context indicator, role/access scope indicator, breadcrumb, search placeholder, notification digest placeholder, and quick action placeholder.
- Placeholder controls MUST be labelled as placeholder, planning, disabled, pending backend, or API-ready.

## Route-Based Page Shell Behavior
- Route pages MUST show page title, route path, module/domain, data status, and permission note.
- Placeholder route pages MUST clearly show planning/preliminary status and MUST NOT imply production data.
- Dynamic placeholder pages MUST not fetch or invent object-specific production data.

## Breadcrumb Rules
- Breadcrumb MUST reflect route hierarchy from the route registry.
- Breadcrumb MUST be visible on route pages and meaningful in the root workbench header.

## Context Indicator
Tenant, project, site, and facility context MUST remain visible. If facility selection is not implemented, it MUST be labelled Pending Backend or placeholder.

## Role/Access Scope Indicator
Role/access scope indicator MUST remain visible. Until final RBAC is approved, labels MUST say Needs RBAC Review or equivalent.

## Search, Notification, and Quick Action Rules
- Global search MAY remain a placeholder but MUST be labelled API-ready or Pending Backend.
- Notification digest MAY remain a placeholder but MUST be labelled Pending Backend.
- Quick actions MAY remain disabled but MUST explain authority/backend dependency.

## Route Status and Data Status Wording
Allowed wording: Mock, API-ready, Pending Backend, Disabled, Needs Review, Planned, Partial, Draft, Preliminary, Data Gap, Limited Basis.
Forbidden wording unless source-approved and authorized: production-ready, final approved, legally compliant final, fit for operation, layak operasi, final RBI, final RLA, final FFS, final certification-ready.

## Draft/Preliminary Label Behavior
Technical outputs, calculations, rankings, evidence packs, certification readiness, and risk records MUST show draft/preliminary or Needs Review until authorized review is complete.

## Access Boundary
Where final RBAC is not implemented, shell and page surfaces MUST say so. Access-denied states MUST not leak hidden object data.
