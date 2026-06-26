# Architecture Rules

## Modular Monolith Boundary Rules

- The NestJS backend is the main modular monolith for API, business logic, workflow orchestration, RBAC, approval, audit, notification, reporting, and integration adapters.
- Domain modules must keep clear ownership of business logic and data access boundaries.
- Cross-module calls must use explicit service boundaries or published internal interfaces, not direct uncontrolled database coupling.
- Database migrations, schema changes, and shared model changes require task-level scope and review.

## Separate Service Rules

A separate service is allowed only when the source-backed architecture supports it or an ADR is approved. Current approved/proposed separate service area is FastAPI analytics/extraction for PDF extraction, OCR-ready processing, table extraction, unit normalization, calculation helper, and engineering analytics.

## No Premature Microservices

Do not split MVP+ domain modules into microservices merely for style or speculative scale. The source architecture selects modular monolith to keep MVP+ controlled while preserving future service separation options.

## Boundary Principles

- External application API is REST/JSON unless changed through approved ADR.
- Backend validates request, tenant/project/site context, RBAC permission, and audit requirements.
- No endpoint may bypass tenant isolation.
- PostgreSQL is the transactional and master-data system of record.
- TimescaleDB is reserved for justified time-series inspection/operating/thickness trend data.
- Prisma is default for CRUD and transactions; raw SQL is allowed only for complex/reporting/Timescale/indexing-sensitive paths with justification.
- Object storage stores documents, evidence, report exports, attachments, generated packages, and versioned files.
- Redis + BullMQ handles import, extraction, notification digest, evidence generation, export, scheduled calculation/reminder, retry, and background work.
- OpenTelemetry-ready traces, metrics, logs, queue monitoring, audit monitoring, and security monitoring are required.
- Docker-first deployment must be ready for Kubernetes/OpenShift scale-up.

## Protected Architecture Areas

Future agents must not change these without explicit approval and ADR update:

- Baseline stack.
- Backend modular monolith decision.
- FastAPI analytics/extraction boundary.
- PostgreSQL + TimescaleDB database choice.
- Object storage strategy.
- Keycloak/OIDC authentication direction.
- RBAC and tenant isolation model.
- Human final decision boundary.
- Audit trail and evidence traceability requirements.

## Source Basis

- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1.
