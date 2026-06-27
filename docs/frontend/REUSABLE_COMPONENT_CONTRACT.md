# Reusable Component Contract

## Rules

Components must support compact, table-led, action-led AIM workflows. Props listed here are planning contracts; implementation may refine them only within approved task scope. Forbidden use applies to all components: never present draft/preliminary technical support as final safety, legal, RBI, RLA, FFS, certification, PLO, interval extension, or risk-acceptance decision.

| Component | Purpose | Props/data contract | Visual behavior | Interaction behavior | Accessibility notes | Use cases | Forbidden use | Source basis |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AppShell | Global tenant/project/site and navigation frame | user, tenantScope, navItems, currentRoute, roleContext | Compact sidebar/topbar, clear scope selector | Route navigation, role visibility, access-denied fallbacks | Landmark nav/main, labelled selectors | All pages | Hiding scope context | UI UX Pack, Style Guideline |
| PageHeader | Page identity and actions | title, subtitle, breadcrumbs, status, actions | Dense header, no marketing hero | Primary/secondary actions, disabled labels | h1 and breadcrumb semantics | Module pages | Oversized hero/card | Style Guideline |
| KPIActionCard | Dashboard-to-action KPI | label, count, severity, filterTarget, dataStatus | Small card with severity edge/badge | Opens filtered list; if mock, label mock | Button/card role with accessible label | Dashboard | Passive KPI with no action path | Addendum, BPMN |
| DataTable | High-volume records | columns, rows, sort, pagination, rowActions, selectedRows | Dense readable table | Sort/filter/select/open drawer/bulk action | Table headers, keyboard row action | Assets, documents, queues | Layout-only table with hidden status meaning | Style Guideline |
| SavedViewBar | Saved filters/views | views, activeView, filters, permissions | Compact chips/tabs | Switch view, save where permitted | Announce active filter | High-volume lists | Saving unapproved compliance logic | UI UX Pack |
| FilterRail | Advanced filter area | filters, activeValues, apply/reset | Collapsible rail/drawer | Apply/reset without data loss | Labels and grouped controls | Tables/queues | Filters that imply final decisions | UI UX Pack |
| QuickDrawer | Read/quick detail panel | record, sections, actions | Right drawer or inline side panel | Open/close, action buttons, no route loss | Focus trap when modal drawer | Asset/detail previews | Replacing full review record when audit required | UI UX Pack |
| ReviewDrawer | Review/approval panel | item, evidence, auditTrail, allowedActions | Review state, evidence, warnings visible | Submit, reject, revision request when authorized | Clear button labels and confirmation | Reviewer queue | Final approval where authority TBD | BPMN, RBAC Spec |
| DetailTabs | Object detail sections | tabs, activeTab, counts, disabledReason | Compact tabs with status counts | Change section without losing scope | Keyboard tab semantics | Asset/RBI/detail pages | Hiding evidence/audit tabs | UI UX Pack |
| WorkflowStepper | Process stage display | steps, currentStep, statuses | Horizontal/vertical compact stepper | Navigate allowed steps; locked step labels | Ordered list semantics | RBI, workpack, certification support | Showing final technical completion automatically | BPMN |
| StatusBadge | Generic status | status, tone, label, sourceStatus | Consistent token colors | Tooltip for meaning | Text plus color | Workflow/data status | Color-only meaning | Style Guideline |
| RiskBadge | Risk status | preliminaryLevel, basisStatus, reviewStatus | Prominent but non-final | Tooltip shows preliminary/basis status | Text visible | RBI/risk list | Final risk acceptance | Domain Guardrails |
| EvidenceStatusBadge | Evidence completeness | required, available, gaps, reviewStatus | Count plus gap tone | Opens evidence panel | Label counts | Evidence packs/certification | Final readiness without review | FRD/SRS |
| DataQualityBadge | Data quality state | status, source, confidence, reviewer | Marks Data Gap/Limited Basis | Opens validation issue | Text state | Imports/operating data | Hiding assumed/low-basis data | Data Model Pack |
| DraftPreliminaryBanner | Human decision boundary | scope, message, reviewerNeeded | Amber/neutral banner | Link to guardrail docs or review queue | Alert/region as appropriate | Technical pages | Optional on RBI/certification pages | PRD/URS |
| AuditTrailPanel | History and audit events | events, actor, timestamp, action, object | Timeline/table | Filter/export where allowed | Chronological list | Detail/review pages | Editable audit records | RBAC Audit Spec |
| ApprovalTrailPanel | Review status history | approvals, status, authority, notes | Timeline with authority labels | Open related review item | Clear status text | Reviewer workflows | Undocumented authority | RBAC Audit Spec |
| EvidenceLinkPanel | Linked evidence | documents, links, completeness | Compact list with gap markers | Link/unlink where allowed | Document labels | Asset/inspection/RBI | Duplicate evidence uploads by default | Addendum |
| EmptyState | No records state | title, description, action, reason | Small informative state | Safe next action only | Plain text no icon-only | Tables/drawers | Marketing copy or misleading completion | Style Guideline |
| LoadingState | In-progress state | label, scope | Skeleton/progress | No destructive actions | aria-busy | Pages/tables | Masking error as loading | UI UX Pack |
| ErrorState | Recoverable error | message, retry, supportLink | Clear error panel | Retry/copy reference | role=alert where needed | API-ready pages | Exposing secrets | Security baseline |
| AccessDeniedState | Permission boundary | role, requiredPermission, supportRoute | Clear denied view | Request access/helpdesk | No sensitive data leakage | RBAC pages | Showing hidden data behind overlay | RBAC Spec |
| ExportWarningPanel | Export/release boundary | exportType, approvalStatus, disclaimer | Warning with approval state | Submit/request approval where allowed | Clear warning text | Evidence/export reports | Final legal/certification implication | RBAC Audit Spec |

## Open Issues

- Exact shadcn/ui component mapping is TBD.
- Final tokens, color names, and typography scale require design review.
- Final props must align with future API contracts in Release 6.
