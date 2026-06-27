# Design System Compliance Spec

## Direction
AIM Platform MUST feel like an Industrial Integrity Command Console: technical, precise, audit-ready, action-oriented, and built for asset-integrity operations. It MUST NOT look like a generic SaaS admin template or a decorative dashboard.

## Source Basis
- `docs/ai-context/10_UI_UX_RULES.md`
- `docs/ai-context/11_WORKFLOW_RULES.md`
- `docs/frontend/FRONTEND_PAGE_BUILD_SPEC.md`
- `docs/frontend/APP_SHELL_NAVIGATION_SPEC.md`
- UI UX Design Pack and UI UX Style & Design System Guideline source documents.
- Existing Release 5 and Release 6 frontend implementation.

## Operating Principles
- Workbench-first: users start from work context, not marketing pages.
- Task-first, module-second: queues, overdue items, evidence gaps, and review needs lead navigation.
- Table-led and action-led: high-volume lists are primary working surfaces.
- Compact but readable: density MUST support hundreds to thousands of equipment records per site/facility.
- Progressive disclosure: details, evidence, audit trail, and approvals open in drawers, tabs, or detail pages.
- Evidence-first: evidence state and source basis MUST remain visible in relevant workflows.
- Risk-aware: overdue, high-risk, missing-evidence, rejected, and pending-review states MUST be easy to find.
- Dashboard-to-action: dashboard cards MUST route to action context, not passive decoration.
- Human final decision: technical outputs remain draft/preliminary until authorized review.

## Required Compliance Layers
1. Tokens: semantic CSS variables and Tailwind mappings define color, surface, border, text, and status meaning.
2. Theme: light and dark themes MUST be deliberate and layered, not simple inversion.
3. Semantic status: badges MUST encode operational meaning and MUST NOT rely on color only.
4. Component contracts: reusable components define required states, accessibility, and forbidden use.
5. Page templates: dashboard, list, detail, workflow, review queue, evidence/export pages follow AIM-specific layouts.
6. Shell chrome: sidebar/topbar/breadcrumb/scope indicators are operational context, not decoration.
7. Accessibility: keyboard, focus, contrast, labels, units, helper text, and validation are required.
8. Export warning behavior: formal export MUST show warnings and audit/approval implications.

## Controlled Migration Approach
1. Inventory first: scan current pages/components for hard-coded colors, duplicated badges, hidden status meaning, and missing boundary labels.
2. Tokenize next: add semantic tokens and Tailwind mappings before widespread style changes.
3. Componentize third: centralize badges, tables, cards, drawers, evidence panels, export warnings, and shell primitives.
4. Apply page templates last: migrate pages by template group, not by one-off styling.

## Anti-Generic SaaS Rule
Future UI changes MUST NOT rely on vague claims like modern, beautiful, clean dashboard, or default shadcn/ui appearance. Every visual change SHOULD identify the operational problem it solves: triage, evidence, auditability, risk prioritization, review authority, data quality, or high-volume scanning.

## Compliance Boundary
Release 7 defines the contract. Full compliance requires future code implementation, visual review, accessibility review, and Project Owner/UBT/IT/Legal/Q&C/SME review where applicable.
