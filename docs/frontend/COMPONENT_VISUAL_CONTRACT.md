# Component Visual Contract

## Purpose
This file defines minimum reusable component expectations for AIM Platform UI/UX compliance. It is conceptual guidance unless the component already exists in `main/apps/web/src/components/`.

| Component | Purpose | Required props conceptually | Required visual states | Accessibility notes | Must not do | Release 7 status |
| --- | --- | --- | --- | --- | --- | --- |
| AppSidebar | Route and workbench navigation with status labels | items, active route, collapsed state, scope | active, hover, disabled, pending backend, needs review | keyboard reachable links/buttons | hide scope or RBAC limitations | partially implemented |
| AppTopbar | Operational context and global controls | breadcrumb, route, scope, search/digest/actions | normal, placeholder, disabled | controls need labels | decorative filler | partially implemented |
| PageHeader | Page identity and boundary labels | eyebrow, title, description, status actions | normal, warning, draft/preliminary | heading hierarchy | marketing hero | implemented partial |
| RoleScopeIndicator | Visible role/access boundary | role, scope, review status | needs review, read-only | text label required | imply final RBAC | partially implemented |
| DataTable | High-volume record scanning | columns, rows, empty, row actions | empty, loading, error, selected, bulk | headers and actions accessible | hide status in color only | implemented partial |
| SavedViewBar | Saved filters/views | views, active view, save action | active, unsaved, disabled | buttons named | silently persist scope | guideline-only |
| FilterChip | Active filter visibility | label, value, remove | active, removable, disabled | remove action named | encode meaning by color only | implemented as FilterChips partial |
| StatusBadge | General operational status | label, semantic status | draft, pending, approved, rejected, disabled | text label required | claim final domain approval | implemented partial |
| RiskBadge | Risk visibility | risk level, basis | low, medium, high, critical, preliminary | text and title include basis | imply final risk acceptance | guideline-only |
| DueStatusBadge | Schedule status | due state, date | due, due soon, overdue, scheduled | not color-only | replace inspector judgement | guideline-only |
| DataQualityBadge | Data confidence | quality state, basis | clean, data gap, limited basis, rejected | visible text | hide missing evidence | guideline-only |
| EvidenceStatusBadge | Evidence completeness | completeness, count | complete, missing, partial, pending review | include count/text | imply accepted evidence pack | guideline-only |
| ApprovalStatusBadge | Review workflow state | approval/review state | draft, pending, revision, rejected, approved for export | text state | imply final legal/certification approval | guideline-only |
| KPIActionCard | Dashboard-to-action indicator | label, value, route, severity, boundary | normal, warning, critical, disabled | clickable card named | become passive decoration | implemented as MetricCard partial |
| QuickDrawer | Preview detail without route loss | title, rows, evidence, actions | open, closed, loading, error | focus management needed | replace formal review record | implemented partial |
| ReviewDrawer | Review decision support | item, authority, evidence, comments | pending, revision, rejected, approved for export | form controls labelled | imply final technical approval | guideline-only |
| WorkflowStepper | Workflow progress | steps, active, blockers | complete, active, blocked, skipped | ordered semantics | hide data gaps | guideline-only |
| EvidenceChecklist | Evidence requirements | required, available, missing | complete, missing, rejected, pending | list semantics | mark certification final | guideline-only |
| RiskMatrix | Risk visualization | likelihood, consequence, basis | preliminary, data gap, limited basis | text alternative | compute final RBI/risk acceptance | guideline-only |
| ExportWarningPanel | Formal export boundary | warnings, blockers, confirmation | missing evidence, draft, rejected, expired, sensitive, permission | role alert/summary | bypass permission/audit | guideline-only |
| AuditTrailPanel | Traceability | events, actor, time, source | empty, loading, filtered | chronological list | imply immutable persistence before backend | guideline-only |
| EmptyState | No data state | title, detail, action | empty, access limited | informative text | blame user vaguely | implemented |
| AccessDeniedState | Restricted state | reason, next step | denied, pending RBAC | no hidden data leak | reveal restricted object detail | implemented |
| LoadingState | Loading skeleton | label, region | loading | aria-busy | look like actual data | implemented |
| ErrorState | Error recovery | message, corrective action | validation, server, permission | role alert; corrective text | vague failure only | implemented partial |

## Page Template Rules

### Dashboard Page
MUST include period selector, site/facility selector, role view, KPI action cards, risk distribution, compliance readiness, inspection/certification timeline, critical attention list, reviewer bottleneck indicator, recent activity, and export snapshot. Dashboard cards MUST be dashboard-to-action.

### List Page
MUST include page header, breadcrumb, role scope, saved view, search, filter bar, table, quick drawer, pagination, bulk action, export, and empty/loading/error/access denied states.

### Detail Page
MUST include object header, key metadata, status rail, primary/secondary action, tabs, linked object panel, comment, approval trail, audit trail, and evidence panel.

### Workflow Page
MUST include stepper, sticky action bar, field validation, evidence, data gap, source basis, reviewer note, and Save Draft always available.

### Review Queue Page
MUST include prioritized queue, risk level, due date, aging, required authority, module, owner, latest comment, evidence status, and review drawer.

### Evidence / Export Page
MUST include purpose, scope, template, required evidence, available evidence, missing evidence, review status, approval status, export version, export log, and warning before formal export.

## Export Warning Rules
ExportWarningPanel MUST warn for missing evidence, draft/preliminary output, rejected item, expired certificate, data gap, sensitive data, and permission issue. Formal export MUST NOT bypass permission check, completeness check, confirmation, versioning, and audit trail.

## Accessibility Rules
- Text and important UI components MUST have sufficient contrast.
- Keyboard focus state MUST be visible.
- Table actions, drawer actions, modal actions, forms, dropdowns, and filters MUST be keyboard accessible.
- Error message MUST explain field and corrective action.
- Technical form fields MUST show label, unit, helper text, and validation message.
- Tooltip MUST NOT be the only place for mandatory information.

## Non-Negotiable Rules
- Status must include text, not color only.
- Draft/preliminary technical output must remain visible.
- Evidence, audit trail, approval trail, export log, source basis, data quality, and review status must remain visible where relevant.
- Components MUST NOT introduce final fit-for-operation, certification/PLO, RBI/RLA/FFS, legal, interval extension, or risk acceptance decisions.
