# Release 5 - Front-End Usability & Design System Hardening

## Release Purpose

Release 5 prepares the AIM Platform front-end for credible internal demo and UAT preparation by hardening usability, route planning, reusable component contracts, mock-data consistency, state behavior, and design-system application. It does not make unfinished business logic fully functional.

## Why Release 5 Exists After Release 0-4

Releases 0-4 created foundation, data/document surfaces, work queues, first business modules, and controlled RBI/integrity skeletons. The current web app is a single route workbench with visible module panels and static/demo data. Release 5 exists to turn that accumulated surface into a controlled, role-aware, table-led, workbench-first front-end plan before wider UI implementation starts.

## Dependencies From Release 0-4

- Release 0: app shell, tenant/project/site context, RBAC/audit guardrails, quality scripts.
- Release 1: asset registry, document repository, import staging, validation queue concepts.
- Release 2: My Work, reviewer queue, approval workflow, notification digest, dashboard-to-action, export log.
- Release 3: inspection tracking, workpack, certification register, evidence checklist/pack, KPI wiring.
- Release 4: RBI candidates, assessment shell, operating data, damage mechanism placeholder, PoF/CoF helper, preliminary risk ranking, risk register linkage.

## Required Context Files To Read Before Starting Release 5 Tasks

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/02_PRODUCT_SCOPE_MVP_PLUS.md
- docs/ai-context/03_TECH_STACK_BASELINE.md
- docs/ai-context/04_ARCHITECTURE_RULES.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/07_DATA_MODEL_BASELINE.md
- docs/ai-context/08_API_CONVENTION.md
- docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md
- docs/ai-context/10_UI_UX_RULES.md
- docs/ai-context/11_WORKFLOW_RULES.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md
- docs/ai-context/16_RELEASE_PLAN_R5_R7.md
- docs/frontend/FRONTEND_PAGE_BUILD_SPEC.md
- docs/frontend/ROUTE_NAVIGATION_MATRIX.md
- docs/frontend/REUSABLE_COMPONENT_CONTRACT.md
- docs/frontend/MOCK_DATA_SCENARIO_CONTRACT.md
- docs/frontend/UI_INTERACTION_STATE_MATRIX.md
- docs/frontend/FUNCTIONAL_BOUNDARY_MAP.md
- docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md

## In Scope

- Front-end documentation consistency check.
- Route and navigation matrix.
- Reusable component contract.
- Mock data scenario contract.
- Page build specification.
- UI interaction state matrix.
- Functional boundary map.
- Front-end acceptance checklist.
- Design system implementation planning.
- Workbench-first, action-led, table-led, drawer/modal/detail planning.
- Badge rules for status, risk, evidence, and data quality.
- Empty/loading/error/access denied state rules.
- Mock/API-ready/disabled state labelling.
- Draft/preliminary labels for technical outputs.
- Role-based navigation visibility planning.
- Dashboard-to-action, reviewer work queue, evidence-first, and audit-ready UI planning.

## Out of Scope

- Database migration implementation.
- Physical database schema finalization.
- Real production API integration.
- Real object storage integration.
- Authentication/OIDC implementation.
- Final RBAC enforcement.
- Final RBI methodology implementation.
- Final legal/compliance clause interpretation.
- Certification/PLO final readiness logic.
- Fit-for-operation decision logic.
- Production or staging deployment.
- UAT execution.
- Security test execution.
- AI/ML recommendation engine.
- FFS/RLA final workflow.
- Full CMMS/EAM/ERP integration.

## Release-Level Anti-Hallucination Rules

- Do not invent product scope, routes, roles, approval authority, compliance clauses, RBI formulas, legal interpretation, or final technical logic.
- Label unfinished behavior as mock, static, API-ready, pending backend, disabled, draft/preliminary, or needs review.
- Do not use UI labels that imply final safe, fit-for-operation, layak operasi, certificate/PLO issued, final RBI, final RLA, final FFS, or legal compliance decision.
- Mark unclear items as TBD, Needs Project Owner Review, Needs UBT/IT Review, Needs Legal/Q&C Review, or Needs Engineer/Inspector/SME Review.

## Front-End Usability Principles

- Workbench-first and action-led navigation.
- Table-led high-volume screens with saved views and filters.
- Dashboard-to-action drill-down rather than passive KPI cards.
- Progressive disclosure using drawers, detail tabs, and review panels.
- Evidence-first and audit-ready UI surfaces.
- Clear role and scope context.
- Compact, readable, consistent design-system use.

## Functional Boundary Rules

- Visual-only and mock functionality must be labelled.
- Local state must not be presented as persisted production behavior.
- API-ready actions must show pending backend or disabled behavior where no API exists.
- Approval/rejection/export actions must show review/audit implications and remain non-final where authority is TBD.

## Task List

- [x] R5-01 - Front-End Documentation Consistency Fix
- [x] R5-02 - Route Navigation Matrix
- [x] R5-03 - Reusable Component Contract
- [x] R5-04 - Mock Data Scenario Contract
- [x] R5-05 - Page Build Spec: Dashboard & My Work
- [x] R5-06 - Page Build Spec: Asset, Document & Validation
- [x] R5-07 - Page Build Spec: Inspection, Certification & Evidence
- [x] R5-08 - Page Build Spec: RBI, Risk & Reviewer Queue
- [x] R5-09 - UI Interaction State Matrix
- [x] R5-10 - Front-End Acceptance Checklist

## Exit Criteria

- [ ] Release 5 planning docs are read and accepted by Project Owner/UBT/IT before implementation.
- [x] Existing Release 4 documentation consistency issues are resolved or explicitly waived.
- [x] Front-end route, component, mock data, state, and boundary documents are implementation-ready.
- [x] Release 5 implementation tasks remain small, controlled, reviewable, and source-backed.
- [x] No unsupported final decision language appears in planned UI.

## Required Verification Commands If Already Available

Visible package scripts in main/package.json include: pnpm run lint, pnpm run typecheck, pnpm run test, pnpm run build, pnpm run migration:check, pnpm run analytics:check, and pnpm run release4:verify. Release 5 may later add a release5:verify script only in an approved implementation task. This planning task does not modify package files.

## Handoff Requirements

- Update the specific R5 task packet only after implementation and checks pass.
- Update docs/handoff/TASK_COMPLETION_LOG.md only after task completion or documentation-control event.
- Record assumptions where implementation relies on unresolved decisions.
- Include source basis, checks run, known limitations, and open questions.

## Completion Criteria

Release 5 is complete only after all R5 task packets show Done, required checks pass, handoff notes are filled, and review has passed. This README is planning-only and does not mark Release 5 complete.

## Known Blockers

- Final RBAC permission matrix remains Needs UBT/IT + Project Owner Review.
- Final physical database schema and API contracts remain TBD.
- Real persistence, object storage, OIDC, and production integration are out of scope for Release 5.
- Release 4 working tree contains uncommitted changes that should be resolved through normal repository workflow.
- Existing documentation encoding artifacts should be cleaned in R5-01 before broader implementation.

## Open Decisions

- Final route structure and URL naming.
- Final role-to-navigation visibility matrix.
- Final design-token mapping and component ownership.
- Final mock data seed ownership and synchronization with backend fixtures.
- Final acceptance owner for visual/UAT readiness.

## Release 4 Documentation Consistency Check - 2026-06-27

Checked files: docs/tasks/TASK_INDEX.md, docs/ai-context/06_RELEASE_PLAN_R0_R4.md, docs/ai-context/15_CHANGELOG_CONTEXT.md, docs/tasks/release-4/README_RELEASE_4.md, Release 4 task packets, and main/package.json.

Findings:
- Release 4 is consistently marked complete in the task index, R0-R4 release plan, Release 4 README, and Release 4 task packets.
- main/package.json is visible as version 0.0.0-release-4 with release4:verify script available.
- docs/ai-context/15_CHANGELOG_CONTEXT.md includes both the 2026-06-26 Release 4 implementation entry and the 2026-06-27 Release 4 verification hardening entry.
- Repository working tree is dirty with uncommitted Release 4 hardening/application changes visible. Release 5 planning must not rewrite or revert those changes.
- Some existing task index and task packet title separators display mojibake/question-mark artifacts from previous encoding transitions. This should be corrected by a future documentation hygiene task, not silently changed in this planning pass.
- Historical handoff/task log entries for early releases still say Source Code was not a Git repository. Current inspection shows Source Code is a Git repository on branch main. Future documentation cleanup should preserve history while adding current-state clarification.

Conclusion: Release 4 completion state is broadly consistent, but documentation hygiene cleanup remains needed before Release 5 implementation. This is captured in R5-01.

## Release 5 Implementation Note - 2026-06-27

- [x] Release 5 frontend workbench implemented under `main/apps/web`.
- [x] Single-route workbench now covers route/navigation matrix, reusable components, mock scenario, dashboard/My Work, asset/document/validation, inspection/certification/evidence, RBI/risk, state matrix, and admin/helpdesk support panels.
- [x] Existing R1-R4 shared mock foundations are reused; no new production persistence or backend integration was added.
- [x] Lint, typecheck, test, build, migration check, analytics check, `pnpm run release4:verify`, and `node scripts/verify-release-4.mjs` passed.
- [ ] Manual Project Owner, UBT/IT, Legal/Q&C, engineer/inspector/SME review remains pending.
