# Tech Stack Baseline

## Baseline Stack

- Frontend: Next.js + TypeScript + Tailwind CSS + shadcn/ui.
- Backend: NestJS modular monolith.
- Analytics service: FastAPI Python.
- Database: PostgreSQL + TimescaleDB.
- Data access: Prisma + raw SQL where justified.
- Object storage: MinIO / S3-compatible storage.
- Background jobs: Redis + BullMQ.
- Authentication: Keycloak / OIDC-ready.
- Authorization: application-level RBAC.
- Monitoring/observability: OpenTelemetry-ready.
- Deployment: Docker-first, Kubernetes/OpenShift-ready.
- Security baseline: TLS, encryption at rest, secrets management, audit trail, access control, backup/DR, vulnerability handling, and incident response readiness.

## Change Control

Future agents must not change this stack without creating or updating an Architecture Decision Record and obtaining explicit approval from Project Owner and UBT/IT.

## Source Basis

- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Kajian Analisis Pengembangan AIM Platform SBU AEBT, Rev. A.
- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1.
