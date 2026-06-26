# Release 0 - Platform Foundation

## Release Objective

Establish the technical, governance, and UI foundation required before business modules are built.

## Release Dependency

- Confirmed repository baseline; approved stack; Project Owner and UBT/IT decisions where TBD exists.

## Release In Scope

- Repo and environment baseline.
- Database foundation.
- API convention.
- Tenant context and access scope.
- RBAC foundation.
- Audit log foundation.
- Global UI shell.
- Seed dummy project SPM-01.
- CI quality gates.

## Release Out of Scope

- Business feature completion.
- RBI calculations.
- Certification workflows.
- Full data import.
- Release 1-4 module delivery.

## Release Exit Criteria

- [x] Repo baseline documented.
- [x] Environment can run with agreed commands.
- [x] Tenant/RBAC/audit foundations are testable.
- [x] No unsupported final decision behavior introduced.

## Release Task List

- [x] R0-01 ? Repo and Environment Baseline
- [x] R0-02 ? Database Foundation
- [x] R0-03 ? API Convention
- [x] R0-04 ? Tenant Context and Access Scope
- [x] R0-05 ? RBAC Foundation
- [x] R0-06 ? Audit Log Foundation
- [x] R0-07 ? Global UI Shell
- [x] R0-08 ? Seed Dummy Project SPM-01
- [x] R0-09 ? CI Quality Gates

## Required Context Files to Read Before Starting Any Task

- docs/ai-context/00_PROJECT_CONTEXT.md
- docs/ai-context/01_SOURCE_DOCUMENT_INDEX.md
- docs/ai-context/05_DOMAIN_RULES_AND_GUARDRAILS.md
- docs/ai-context/06_RELEASE_PLAN_R0_R4.md
- docs/ai-context/12_TEST_AND_ACCEPTANCE_RULES.md
- docs/ai-context/13_AGENT_OPERATING_RULES.md
- docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md
- docs/ai-context/03_TECH_STACK_BASELINE.md
- docs/ai-context/04_ARCHITECTURE_RULES.md

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

## Release 0 Verification

- `pnpm run lint` passed.
- `pnpm run typecheck` passed.
- `pnpm run test` passed.
- `pnpm run build` passed.
- `pnpm run migration:check` passed.
- `python -m compileall services/analytics/app` passed.
- `pnpm run release0:verify` passed.

## Release 0 Handoff Summary

Release 0 was implemented under `main/` with a Next.js global shell, NestJS modular monolith API foundation, shared tenant/RBAC/audit/API/domain-guardrail primitives, Prisma foundation schema, FastAPI analytics placeholder, Docker-first infrastructure baseline, SPM-01 dummy seed, and quality gate scripts. No migrations were run and no Release 1-4 business modules were implemented.
