# Release 1 - Data & Document Foundation

## Release Objective

Build asset, document, import, and validation foundations for controlled data intake.

## Release Dependency

- Release 0; data model baseline; UI/UX rules; source document traceability.

## Release In Scope

- Asset hierarchy schema.
- Asset registry list API/UI.
- Asset detail shell.
- Document metadata and upload intent.
- Document repository UI.
- Import staging.
- CSV/TSV parser and normalized Excel-row import parser.
- Validation queue UI.

## Release Out of Scope

- Advanced analytics.
- Final RBI.
- Certification final decision.
- Full historical migration.
- Native binary XLSX extraction unless approved.
- Real object-storage presigned upload wiring until UBT/IT confirms provider details.

## Release Exit Criteria

- [x] Assets and documents can be represented in controlled baseline.
- [x] Imports remain staged until validation.
- [x] Evidence links and audit requirements are respected.

## Release Task List

- [x] R1-01 - Asset Hierarchy Schema
- [x] R1-02 - Asset Registry List API
- [x] R1-03 - Asset Registry UI List
- [x] R1-04 - Asset Detail Shell
- [x] R1-05 - Document Metadata Schema
- [x] R1-06 - Document Upload API
- [x] R1-07 - Document Repository UI
- [x] R1-08 - Import Staging Schema
- [x] R1-09 - Excel CSV Import Parser
- [x] R1-10 - Validation Queue UI

## Required Context Files to Read Before Starting Any Task

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/07_DATA_MODEL_BASELINE.md
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

- pnpm run release1:verify passed on 2026-06-26.
- No database migrations were run.
- No Release 2-4 tasks were implemented or marked complete.


