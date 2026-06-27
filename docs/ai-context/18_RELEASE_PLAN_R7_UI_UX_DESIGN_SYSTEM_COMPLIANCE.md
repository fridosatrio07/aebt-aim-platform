# Release 7 - UI/UX Design System Compliance & App Shell Hardening

## Release Objective
Release 7 defines the AIM Platform UI/UX design-system compliance foundation and aligns release maturity metadata after Release 6. It is a governance, guidance, and verification release. It MUST NOT be treated as proof that the full UI has already been visually refactored or production-approved.

## Source Basis
- Source documents listed in `docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md`, including the UI UX Design Pack, UI UX Style & Design System Guideline, Technical Design Solution Architecture, BPMN workflow pack, BRD/PRD/FRD/SRS, Module Compliance Basis, and RBAC/audit workbook.
- Existing repository context under `docs/ai-context/00_PROJECT_CONTEXT.md` through `17_RELEASE_PLAN_R6_APP_SHELL_NAVIGATION.md`.
- Existing frontend control docs under `docs/frontend/`.
- Existing Release 5 and Release 6 task packets and handoffs.
- Current frontend implementation under `main/apps/web/app/` and `main/apps/web/src/components/`.

## Why Release 7 Exists After Release 6
Release 6 implemented route-based placeholder pages and a hardened shell, but the repository still has a maturity mismatch: `main/package.json` remains at `0.0.0-release-4`, verification scripts stop at Release 4, and design-token governance is not yet formalized. Release 7 fixes release-control maturity and defines the design-system compliance contract before a future approved UI implementation/refactor release.

## Current Maturity Mismatch
- Release 5 and Release 6 docs/handoffs exist and are complete.
- The app contains Release 6 route shell work.
- `main/package.json` still uses Release 4 version/description.
- `release5:verify`, `release6:verify`, and `release7:verify` are missing before this release.
- Tailwind currently exposes a small `aim` color set; full semantic token coverage is not implemented.

## Scope In
- Release 7 plan, frontend design-system guidance, task packets, handoff, changelog, and completion log.
- Design-system compliance rules for tokens, theme, semantic state, component contracts, page templates, shell chrome, accessibility, and export warning behavior.
- Minimal release maturity metadata and deterministic verification scripts.
- Clear acceptance criteria for future UI implementation work.

## Scope Out
- Broad UI rewrite or page-by-page styling implementation.
- Backend, API, database, Prisma schema, migrations, object storage, OIDC/authentication, FastAPI, PDF/OCR extraction, AI/ML, or persistence work.
- Final RBAC enforcement, legal/compliance interpretation, certification/PLO readiness, RBI/RLA/FFS approval, fit-for-operation, inspection interval extension, or risk acceptance logic.
- New runtime dependencies or component-generation workflows.

## Release 7 Work Breakdown
- R7-01 - Source review and documentation consistency check.
- R7-02 - Design token and theme contract.
- R7-03 - Semantic status, badge, and operational state contract.
- R7-04 - shadcn/ui override and reusable component visual contract.
- R7-05 - Page template, density, and table/drawer pattern rules.
- R7-06 - App shell, route page shell, sidebar, and topbar hardening rules.
- R7-07 - Accessibility, dark mode, and non-color-only status baseline.
- R7-08 - Export warning, evidence visibility, and draft/preliminary label rules.
- R7-09 - Package metadata and release verification maturity alignment.
- R7-10 - Release 7 verification and handoff.

## Deliverables
- `docs/frontend/DESIGN_SYSTEM_COMPLIANCE_SPEC.md`
- `docs/frontend/DESIGN_TOKENS_THEME_CONTRACT.md`
- `docs/frontend/COMPONENT_VISUAL_CONTRACT.md`
- `docs/frontend/APP_SHELL_HARDENING_SPEC.md`
- Updated `docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md`
- `docs/tasks/release-7/*`
- `docs/handoff/RELEASE_7_HANDOFF.md`
- `main/scripts/release5-verify.mjs`
- `main/scripts/release6-verify.mjs`
- `main/scripts/release7-verify.mjs`
- Updated `main/package.json`

## Acceptance Criteria
- Release 7 guidance is AIM-specific, enforceable, and not generic SaaS polish.
- Industrial Integrity Command Console direction is documented.
- Token, theme, component, page-template, app-shell, accessibility, evidence/export, and non-final decision guardrails are documented.
- Package metadata is aligned to `0.0.0-release-7`.
- Verify scripts exist through Release 7.
- Release 7 handoff says schema/API changes are `None`.
- No final technical, legal, certification, RBI, RLA/FFS, fit-for-operation, inspection interval, or risk acceptance decision logic is introduced.

## Verification Commands
Run from `main/`:
- `pnpm run release7:verify`
- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run build`

## Known Limitations
- Release 7 documentation does not by itself prove full visual compliance.
- Actual token implementation, component refactor, dark-mode buildout, and page-by-page UI hardening require a future approved implementation release.
- Final RBAC matrix, production API/storage integration, and legal/Q&C/SME review remain open.

## Handoff Requirements
- Update Release 7 task packets and `docs/tasks/TASK_INDEX.md` only after checks pass.
- Update `docs/handoff/RELEASE_7_HANDOFF.md` and `docs/handoff/TASK_COMPLETION_LOG.md`.
- Record assumptions only if a Release 7 decision cannot be source-backed.

## Explicit Boundary
Release 7 defines and hardens design-system compliance guidance and release metadata maturity. It does not mean full production UI compliance unless future implementation tasks apply the contracts to code and pass visual, accessibility, and stakeholder review gates.
