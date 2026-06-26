# Release 2 - Work Queue & Operational Flow

## Release Objective

Deliver task/action mechanics, reviewer queues, approval workflow foundation, notifications, dashboard-to-action, and export logging.

## Release Dependency

- Release 0; Release 1; workflow rules; RBAC/audit baseline.

## Release In Scope

- Generic action item model.
- My Work API/UI.
- Reviewer work queue backend/UI.
- Generic approval workflow.
- Notification digest skeleton.
- Dashboard-to-action shell.
- Export log foundation.

## Release Out of Scope

- Module-specific final approvals.
- Notification flood per equipment.
- Advanced SLA engine.
- Final compliance decisions.
- Release 3 inspection/certification/evidence-pack modules.
- Release 4 RBI/risk modules.

## Release Exit Criteria

- [x] Users can work from prioritized queues.
- [x] Reviewer queues aggregate pending items.
- [x] Approvals and exports are logged.
- [x] No final domain decision is automated.

## Release Task List

- [x] R2-01 - Generic Action Item Model
- [x] R2-02 - My Work API
- [x] R2-03 - My Work UI
- [x] R2-04 - Reviewer Work Queue Backend
- [x] R2-05 - Reviewer Work Queue UI
- [x] R2-06 - Approval Workflow Generic
- [x] R2-07 - Notification Digest Skeleton
- [x] R2-08 - Dashboard to Action Shell
- [x] R2-09 - Export Log Foundation

## Required Context Files to Read Before Starting Any Task

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/08_API_CONVENTION.md
- docs/ai-context/09_RBAC_AND_PERMISSION_RULES.md
- docs/ai-context/10_UI_UX_RULES.md
- docs/ai-context/11_WORKFLOW_RULES.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md

## Release-Level Anti-Hallucination Notes

- Do not invent requirements, workflows, formulas, standards, clauses, approval rules, or permissions.
- Treat all technical outputs as draft/preliminary until authorized review and approval.
- Do not add final compliance/RBI/legal/certification logic unless source-backed and approved.

## Release-Level Completion Checklist

- [x] Every task file in this release shows Done.
- [x] Required checks are complete and documented for every task.
- [x] Handoff notes are filled for every task.
- [x] No out-of-scope implementation was added.
- [x] Open decisions were updated.
- [x] Task index was updated only after task completion.

## Verification

- pnpm run release2:verify passed on 2026-06-26.
- No database migrations were run.
- No Release 3-4 tasks were implemented or marked complete.
