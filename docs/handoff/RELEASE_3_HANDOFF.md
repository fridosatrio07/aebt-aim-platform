# Release 3 Handoff - First Business Modules

- Task ID: R3-01 through R3-10
- Branch: Not applicable; `Source Code` is not currently a Git repository
- Agent/session: Codex
- Date: 2026-06-26
- Files changed: `main/packages/shared/src/release-3.ts`, `main/packages/shared/tests/release-3.test.ts`, `main/packages/shared/src/rbac.ts`, `main/packages/shared/src/index.ts`, `main/packages/database/prisma/schema.prisma`, `main/apps/api/src/business-foundation/*`, `main/apps/api/src/app.module.ts`, `main/apps/api/src/foundation/foundation.service.ts`, `main/apps/web/src/components/AppShell.tsx`, `main/seed/release-3-business-foundation.json`, `main/scripts/migration-check.mjs`, `main/scripts/verify-release-3.mjs`, `main/scripts/release3-verify.mjs`, `main/package.json`, `main/README.md`, `docs/tasks/release-3/*`, `docs/handoff/*`, `docs/ai-context/06_RELEASE_PLAN_R0_R4.md`, `docs/ai-context/14_OPEN_DECISIONS_AND_BLOCKERS.md`, `docs/ai-context/15_CHANGELOG_CONTEXT.md`
- Summary: Implemented Release 3 business foundation for inspection due tracking, workpack skeletons, certification support register, evidence checklist, evidence pack preview, and business KPI dashboard wiring under `main/`.
- Schema changes: Added logical Prisma models/enums for InspectionDue, Workpack, WorkpackStep, CertificationRegister, CertificationChecklistItem, CertificationSubmissionLog, EvidenceChecklist, EvidenceChecklistItem, EvidencePack, EvidencePackItem, and BusinessKpiSnapshot. No database migrations were run.
- API changes: Added NestJS `BusinessFoundationModule` under `/business` with inspection due, workpack, certification register, evidence checklist, evidence pack, evidence pack build-preview, and dashboard KPI endpoints.
- UI changes: Replaced the R2 workbench with a Release 3 business workbench showing KPI cards, Inspection Due, Certification Register, Evidence Checklist, Workpack Drawer, Evidence Pack, and Decision Boundary surfaces.
- RBAC/audit changes: Added Release 3 permissions for inspection, workpack, certification, evidence, and business KPI reads/build/manage. Shared services enforce tenant scope, RBAC, and audit events.
- Tests run: `pnpm run lint`; `pnpm run typecheck`; `pnpm run test`; `pnpm run build`; `pnpm run migration:check`; `pnpm run analytics:check`; `pnpm run release3:verify` all passed on 2026-06-26.
- Assumptions: Static/in-memory demo data and logical schema are acceptable until persistence repositories and migrations are approved. Evidence readiness, certification readiness, inspection status, and KPI counts are support data only.
- Known limitations: No production persistence, no migrations, no final legal/compliance clause validation, no final RBAC matrix approval, no final inspection/certification decision logic, and no Release 4 RBI/risk/anomaly implementation.
- Follow-up tasks: Review R3 open decisions; confirm migration plan; confirm pilot dataset; confirm evidence/certification operating policy; start R4 only after Project Owner/SME approval of RBI methodology baseline.
- Open questions: Final inspection interval policy, certification evidence policy, reviewer authority matrix, production deployment environment, and pilot site/client remain open.
