# App Shell Navigation Specification - Release 6

## Purpose
Release 6 hardens the AIM Platform front-end shell, navigation registry, route registry, and route-based page-shell planning while preserving the Release 5 single-route workbench. It prepares navigation and shell structure for future route pages without making the platform fully operational.

## Source Basis
- Project source PDFs/XLSX under `E:\Project\AEBT's AIM Platform\Kajian\` reviewed by status/page/sheet sampling on 2026-06-27.
- `docs/ai-context/00_PROJECT_CONTEXT.md`
- `docs/ai-context/02_PRODUCT_SCOPE_MVP_PLUS.md`
- `docs/ai-context/03_TECH_STACK_BASELINE.md`
- `docs/ai-context/04_ARCHITECTURE_RULES.md`
- `docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md`
- `docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md`
- `docs/ai-context/10_UI_UX_RULES.md`
- `docs/ai-context/11_WORKFLOW_RULES.md`
- `docs/frontend/*`
- Existing Release 5 web workbench under `main/apps/web/`

## Current State Summary
- Current web app has only the root App Router page at `/`.
- `main/apps/web/src/components/AppShell.tsx` contains the shell, workbench tabs, page panels, drawer behavior, and Release 5 module surfaces in one large component.
- Release 5 data is centralized in `release5-data.ts`; Release 5 UI primitives are centralized in `release5-ui.tsx`.
- Route-based placeholder module pages are implemented for the Release 6 route hierarchy; backend integration and full business logic remain pending.
- Final RBAC enforcement, production APIs, persistence, object storage, and authentication remain pending.

## Target State for Release 6
- Maintain the Release 5 workbench as the visible first screen.
- Add a lightweight route registry as the single source of truth for planned route paths and route metadata.
- Add a navigation registry derived from the route registry.
- Split shell chrome into small components where safe.
- Improve sidebar, topbar, active route state, boundary labels, and shell placeholders without broad redesign.
- Keep all technical outputs visibly draft/preliminary/pending review where applicable.

## App Shell Anatomy
- `AppShell`: owns current active workbench tab and drawer state.
- `AppSidebar`: renders navigation groups from the navigation registry.
- `AppTopbar`: renders tenant/project/site selector, role scope, search placeholder, notification digest, and quick actions.
- `BreadcrumbTrail`: shows the active route hierarchy.
- `AccessBoundaryBanner`: repeats the non-final decision and access boundary.
- Module panels: remain in the existing workbench until route-page implementation is approved.

## Sidebar Requirements
- Use the navigation registry only; do not duplicate route labels in multiple files.
- Show active route state consistently.
- Group items by operational domains: command center, data foundation, business modules, integrity, governance/support.
- Display status badges such as Mock, API-ready, Pending Backend, Disabled, Needs Review, or Planned.
- Preserve compact high-volume usability.

## Topbar Requirements
- Show tenant/client/project/site/facility scope placeholder.
- Show role/access scope indicator with `Needs RBAC Review` until final RBAC is approved.
- Show global search placeholder as disabled/API-ready where backend search is not implemented.
- Show notification digest placeholder with digest status only.
- Show quick action menu placeholder with disabled/API-ready labels.

## Tenant/Project/Site/Facility Selector Behavior
- Selector is front-end placeholder only in Release 6.
- It may show current mock scenario scope from Release 5 data.
- It must not persist changes or imply final access enforcement.
- It must show pending backend/RBAC review status.

## Role/Access Scope Indicator Behavior
- Indicator may display active planning roles such as AIM Admin, Inspector, Engineer, Reviewer, Client Viewer, and Q&C/Legal reviewer if already present in docs/data.
- Final role authority remains `Needs RBAC Review`.
- No UI label may imply final approval authority unless confirmed by the approved RBAC specification.

## Global Search Placeholder Behavior
- Search field may be visible for future asset/document/evidence lookup.
- Release 6 search is placeholder/API-ready only.
- It must not promise full production search.

## Notification Digest Placeholder Behavior
- Digest may show counts from existing mock work queues.
- Sending, scheduling, and suppression policy remain pending backend and UBT/IT review.

## Breadcrumb Behavior
- Breadcrumbs must be generated from route registry metadata.
- For single-route workbench tabs, breadcrumb should map to the planned route represented by the current tab.
- Dynamic routes must display placeholder labels such as `[assetId]` until real route pages are implemented.

## Quick Action Menu Behavior
- Quick actions must be labelled Mock, API-ready, Pending Backend, Disabled, or Needs Review.
- No action may trigger final certification, RBI, legal, safety, RLA/FFS, or fit-for-operation decisions.

## Navigation Status Badge Behavior
- Badges communicate functional boundary only.
- Allowed labels: Mock, API-ready, Pending Backend, Disabled, Needs Review, Planned, Partial.
- Forbidden labels: Production Ready, Final Approved, Legally Compliant Final, Fit for Operation.

## Active Route Behavior
- Current root workbench maps each active tab to a planned route.
- Active state is derived from the current workbench tab on `/` and from route registry metadata on route pages.
- Future route pages must use the route registry rather than inventing separate route maps.

## Collapsed/Expanded Sidebar Behavior
- Sidebar collapse may use local component state only.
- No global state management dependency is permitted in Release 6.
- Collapsed state does not need to persist across reloads.

## Access Denied and Disabled Route Behavior
- Access denied is visual/planning only in Release 6.
- Disabled routes must remain non-clickable or clearly labelled.
- Final enforcement belongs to future RBAC/API tasks.

## Mock/API-ready/Pending-backend/Needs-review Labels
- Mock: uses static in-repo mock data.
- API-ready: UI shape can later call backend but no production call is wired.
- Pending Backend: backend, persistence, object storage, or API contract is incomplete.
- Needs Review: Product Owner, UBT/IT, Legal/Q&C, engineer, inspector, or SME review required.

## Route Hierarchy
| Route | Purpose | Release 6 status |
| --- | --- | --- |
| `/dashboard` | Command center and dashboard-to-action | Planned route, represented by workbench tab |
| `/my-work` | Action inbox and user tasks | Planned route, represented by workbench tab |
| `/projects` | Project/data intake scope | Planned route |
| `/assets` | Asset registry | Planned route, represented by data tab |
| `/assets/[assetId]` | Asset detail | Planned dynamic route |
| `/documents` | Document repository | Planned route, represented by data tab |
| `/documents/[documentId]` | Document detail | Planned dynamic route |
| `/validation` | Validation queue | Planned route, represented by data tab |
| `/inspections` | Inspection tracking | Planned route, represented by business tab |
| `/inspections/workpacks` | Workpack skeleton | Planned route |
| `/certification` | Certification support register | Planned route, represented by business tab |
| `/evidence-packs` | Evidence pack builder | Planned route, represented by business tab |
| `/evidence-packs/[evidencePackId]` | Evidence pack detail | Planned dynamic route |
| `/integrity` | Integrity overview | Planned route, represented by integrity tab |
| `/integrity/rbi` | RBI assessment list/candidates | Planned route, represented by integrity tab |
| `/integrity/rbi/[assessmentId]` | RBI assessment detail | Planned dynamic route |
| `/risk-register` | Risk register | Planned route, represented by integrity tab |
| `/reviewer-queue` | Reviewer queue | Planned route, represented by my-work tab |
| `/administration` | Administration controls | Planned route, represented by admin/support tab |
| `/helpdesk` | Helpdesk/bug log | Planned route, represented by admin/support tab |
| `/state-matrix` | UI state matrix | Planned route, represented by state lab tab |

## Parent-Child Navigation Rules
- Parent groups may link to overview routes.
- Child route folders and dynamic placeholder routes are present for Release 6 shell validation.
- Dynamic route labels remain placeholders until real object detail data is integrated.

## Role-Route Visibility Planning Matrix
| Route group | Primary roles | Release 6 behavior | Review need |
| --- | --- | --- | --- |
| Dashboard/My Work | Internal users, reviewers, client viewers as applicable | Visible with mock/action-led content | Needs RBAC Review |
| Projects/Data Intake | AIM admin, project/data roles | Visible/planned | Needs UBT/IT + Project Owner Review |
| Assets/Documents/Validation | Inspectors, engineers, document controllers, reviewers | Visible/planned | Needs RBAC Review |
| Inspection/Certification/Evidence | Inspectors, engineers, Q&C/Legal reviewers | Visible/planned | Needs Legal/Q&C + SME Review |
| Integrity/RBI/Risk | Engineers, reviewers, SME roles | Visible with strict preliminary guardrails | Needs Engineer/Inspector/SME Review |
| Administration/Helpdesk | Admin/support roles | Visible as placeholder | Needs UBT/IT Review |

## App Shell Component List
- `AppSidebar`
- `AppTopbar`
- `TenantProjectSiteSelector`
- `RoleScopeIndicator`
- `BreadcrumbTrail`
- `NotificationDigest`
- `GlobalSearch`
- `QuickActionMenu`
- `NavStatusBadge`
- `AccessBoundaryBanner`

## Forbidden Behavior
- No final technical, legal, certification, RBI, RLA/FFS, fit-for-operation, interval extension, risk acceptance, or asset safety decision logic.
- No production API, persistence, object storage, OIDC, final RBAC, migration, deployment, or dependency addition.
- No duplicate navigation maps across pages.
- No broad redesign of the Release 5 workbench.

## Design Token Usage Rules
- Reuse existing CSS utilities and token-like classes in `globals.css` and existing components.
- Do not introduce arbitrary one-off color systems.
- Keep layouts compact, table-led, and action-led.

## Accessibility Baseline
- Buttons must have visible text or accessible title/aria labels.
- Disabled/placeholder actions must be perceivable.
- Breadcrumb and navigation regions should use semantic labels where practical.
- Keyboard focus behavior must remain browser-default usable.

## Acceptance Checklist
- [x] Route registry covers required Release 6 route hierarchy.
- [x] Navigation registry derives from route metadata.
- [x] Sidebar active state is consistent.
- [x] Topbar shows scope, role, search, digest, and quick action placeholders.
- [x] Breadcrumb uses route metadata.
- [x] Labels distinguish Mock, API-ready, Pending Backend, Disabled, and Needs Review.
- [x] No final decision language is introduced.
- [x] Release 5 workbench remains usable.
- [x] Lint, typecheck, test, and build pass where applicable.

## Open Decisions
- Further route content rollout timing: Needs Project Owner Review.
- Final RBAC route visibility matrix: Needs UBT/IT + Project Owner Review.
- Final API integration readiness: Needs UBT/IT Review.
- Final design-token formalization: Needs UI/UX Review.
- Final production search, notification, and quick action behavior: TBD.


## Release 6 Implementation Note

- Route registry, navigation registry, shell chrome split, route-page shell, and placeholder module pages are implemented.
- Root `/` continues to preserve the Release 5 workbench.
- Planned route pages are available for shell validation and review, but remain mock/API-ready/pending-backend as labelled.
- Dynamic route pages use placeholder identifiers and do not fetch production object details.
