# Open Decisions and Blockers

| ID | Decision / blocker | Why it matters | Required reviewer | Status |
| --- | --- | --- | --- | --- |
| OD-001 | Final physical database schema | Logical model exists, but table names, constraints, indexes, partitioning, migrations, and TimescaleDB hypertables remain TBD | UBT/IT + Project Owner | Open |
| OD-002 | Final API contract details | REST/JSON baseline exists, but exact response/error/pagination/filtering/sorting contract remains TBD | UBT/IT + frontend/backend lead | Open |
| OD-003 | Final RBAC matrix | Roles are identified, but exact permission matrix requires approval | UBT/IT + Project Owner + Q&C/Legal where relevant | Open |
| OD-004 | Final UAT script | FRD/SRS and workflow baseline exist, but final UAT scripts are not approved | Project Owner + QA/UAT + business users | Open |
| OD-005 | Final security checklist | Security baseline exists, but environment-specific checklist remains TBD | UBT/IT + security | Open |
| OD-006 | Final RBI methodology baseline and standard-version decision | Platform must not invent RBI formulas or methodology | Engineer + Inspector + SME + Q&C | Open |
| OD-007 | Final legal/compliance clause validation | Compliance matrix is a draft and TXT repository is URL inventory, not final clause extraction | Legal + Q&C + SME | Open |
| OD-008 | Final production deployment environment | Docker/Kubernetes/OpenShift-ready baseline exists, but actual pilot/production environment remains TBD | UBT/IT + Project Owner | Open |
| OD-009 | Final pilot dataset and pilot site/client | MVP+ must be validated against a controlled pilot | Project Owner + SBU AEBT + client/pilot owner | Open |
| OD-010 | Source Code folder Git status | Required path is accessible but not currently a Git repository | Project Owner / repository owner | Open - user instructed to continue |
| OD-011 | Release 0 production packaging and CI provider | Local Release 0 checks passed; production CI and Next.js standalone/deployment packaging need environment-specific decision | UBT/IT + Project Owner | Open |
| OD-012 | Release 1 persistence and migration execution | Release 1 Prisma schema exists and validates, but no database migrations were run and repository/API uses static in-memory demo data for the current implementation | UBT/IT + Project Owner | Open |
| OD-013 | Release 1 object storage and native XLSX handling | Upload API returns S3-compatible object-key intent and parser accepts CSV/TSV plus normalized Excel rows; real presigned upload provider and binary XLSX extraction remain environment decisions | UBT/IT + Document Controller + Project Owner | Open |
| OD-014 | Release 2 persistence and migration execution | Release 2 Prisma schema exists and validates, but no database migrations were run and workflow/API uses static in-memory demo data for the current implementation | UBT/IT + Project Owner | Open |
| OD-015 | Release 2 workflow, digest, SLA, and export policy | Generic workflow transitions, digest grouping, dashboard action filters, and export approval statuses need final operating policy before production use | Project Owner + UBT/IT + Q&C + Legal where relevant | Open |
| OD-016 | Release 3 persistence and migration execution | Release 3 Prisma schema exists and validates, but no database migrations were run and business/API uses static in-memory demo data for the current implementation | UBT/IT + Project Owner | Open |
| OD-017 | Release 3 inspection, certification, and evidence operating policy | Due/overdue, certification readiness, evidence completeness, reviewer routing, and KPI meanings need final operating policy before production use | Project Owner + Q&C + Legal + engineer/inspector/SME | Open |
| OD-018 | Release 4 start gate | RBI/risk/anomaly work must not start until SME-approved methodology/version baseline and human final-decision boundaries are confirmed | Project Owner + engineer + inspector + SME + Q&C | Open |

## Project-Control Blocker Note

The AI Development Control System was created after user confirmation to continue even though E:\Project\AEBT's AIM Platform\Source Code was not a Git repository at inspection time.

## Release 0 Update

Release 0 Platform Foundation was implemented under `main/` on 2026-06-26 and passed `pnpm run release0:verify`. Open decisions remain for Git repository status, final physical schema, final API/RBAC contracts, CI provider, production deployment, and pilot dataset.

## Release 1 Update

Release 1 Data & Document Foundation was implemented under `main/` on 2026-06-26 and passed `pnpm run release1:verify`. Open decisions remain for Git repository status, migration execution, final physical schema/indexes, final API/RBAC contracts, object-storage presigned upload provider, native XLSX binary extraction, production deployment, and pilot dataset.

## Release 2 Update

Release 2 Work Queue & Operational Flow was implemented under `main/` on 2026-06-26 and passed `pnpm run release2:verify`. Open decisions remain for Git repository status, migration execution, final physical schema/indexes, final API/RBAC contracts, notification digest schedule/suppression policy, workflow authority matrix, export approval policy, production deployment, and pilot operating metrics.

## Release 3 Update

Release 3 First Business Modules was implemented under main/ on 2026-06-26 and passed pnpm run release3:verify. Open decisions remain for Git repository status, migration execution, final physical schema/indexes, final API/RBAC contracts, inspection/certification/evidence operating policy, production deployment, pilot operating metrics, and Release 4 RBI methodology start gate.

## Release 4 Update

Release 4 Integrity/RBI Controlled Skeleton was implemented under main/ on 2026-06-26. RBI candidate routing, assessment shell, operating data input, damage mechanism review placeholder, PoF/CoF helper interface, preliminary risk ranking record, review/approval workflow, and risk register linkage were implemented with draft/preliminary boundaries and no unsupported final decision logic. `pnpm run release4:verify` should be run after tooling/environment checks pass. Open decisions remain for Git repository status, migration execution, final physical schema/indexes, final API/RBAC contracts, SME-approved RBI methodology baseline (OD-006), Release 4 start gate closure (OD-018), production deployment, and pilot dataset validation.


