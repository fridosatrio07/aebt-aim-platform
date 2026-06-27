# R7-06 - App shell, route page shell, sidebar, and topbar hardening rules

## Status

* [ ] Not Started
* [ ] In Progress
* [ ] Blocked
* [ ] Documentation Complete
* [ ] Code Complete
* [ ] Tests Passed
* [ ] Reviewed
* [ ] Merged
* [x] Done

## Objective

Define app shell hardening rules for sidebar, topbar, route pages, and placeholders.

## Source Basis

- docs/ai-context/00_PROJECT_CONTEXT.md through 18_RELEASE_PLAN_R7_UI_UX_DESIGN_SYSTEM_COMPLIANCE.md.
- docs/frontend/ design and route-control documents.
- Release 5 and Release 6 task packets and handoffs.
- Current frontend code under main/apps/web/.
- Source document index and compact review of UI/UX, architecture, BPMN, RBAC/audit, and product requirement documents.

## In Scope

- Documentation, governance, acceptance criteria, release metadata, and lightweight deterministic verification related to Release 7.

## Out of Scope

- Broad UI rewrite, backend/API/database/storage/OIDC work, migrations, dependencies, final RBAC enforcement, production deployment, AI/ML, PDF/OCR, and final domain-decision logic.

## Required Files

- docs/ai-context/18_RELEASE_PLAN_R7_UI_UX_DESIGN_SYSTEM_COMPLIANCE.md
- docs/frontend/DESIGN_SYSTEM_COMPLIANCE_SPEC.md
- docs/frontend/DESIGN_TOKENS_THEME_CONTRACT.md
- docs/frontend/COMPONENT_VISUAL_CONTRACT.md
- docs/frontend/APP_SHELL_HARDENING_SPEC.md
- docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md
- docs/tasks/release-7/
- docs/handoff/RELEASE_7_HANDOFF.md
- main/package.json and main/scripts/release*-verify.mjs where applicable

## Acceptance Criteria

* [x] Release 7 guidance is AIM-specific and source-grounded or clearly proposed as Release 7 guidance.
* [x] No unsupported compliance, RBI, legal, certification, or safety logic is introduced.
* [x] Required documentation and verification artifacts are present.
* [x] Handoff notes identify limitations and open review gates.

## Verification Method

- pnpm run release7:verify
- pnpm run lint
- pnpm run typecheck
- pnpm run test
- pnpm run build

## Anti-Slop Guardrails

- MUST use precise AIM workflow language.
- MUST NOT write generic SaaS polish language.
- MUST preserve draft/preliminary and human-final-decision boundaries.
- MUST NOT claim full visual compliance from documentation alone.

## Handoff Notes

* Files changed: Release 7 docs, task packets, handoff, package metadata, and lightweight verification scripts.
* Summary: Define app shell hardening rules for sidebar, topbar, route pages, and placeholders.
* Assumptions: None beyond documented open review gates.
* Tests/checks run: See docs/handoff/RELEASE_7_HANDOFF.md.
* Known limitations: Full UI implementation/refactor remains future work.
* Follow-up tasks: Manual review and future token/component/page implementation release.
* Open questions: Final RBAC route visibility, token values, dark-mode implementation timing, and stakeholder review owners.
