# Functional Boundary Map

## Boundary Categories

| Category | Meaning | Required label |
| --- | --- | --- |
| Visual-only | Static UI affordance without behavior | Visual only |
| Mock functional | Local/demo behavior using mock data | Mock data |
| Local state only | Changes do not persist after reload/session | Local only |
| API-ready | UI contract can call API once available | API-ready |
| Backend pending | Needs backend endpoint/service | Pending backend |
| Requires database | Needs persistent schema/migration/data access | Requires database |
| Requires object storage | Needs MinIO/S3-compatible implementation | Requires object storage |
| Requires RBAC finalization | Needs final role/permission/authority approval | Needs RBAC Review |
| Requires SME review | Technical method/output requires engineer/inspector/SME | Needs Engineer/Inspector/SME Review |
| Requires Legal/Q&C review | Compliance/legal wording or export needs review | Needs Legal/Q&C Review |
| Requires UBT/IT review | Architecture, auth, deployment, security, integration needs IT review | Needs UBT/IT Review |
| Production-blocked | Not usable in production until gate is closed | Production blocked |

## Pages And Actions Affected

| Page/action | Current boundary | Blockers |
| --- | --- | --- |
| Current `/` AppShell | Mock functional/static demo | Single route; no persistence; role visibility partial |
| Dashboard KPI drill-down | API-ready/planned | Filter contract and backend query endpoints |
| My Work actions | API-ready/planned | Workflow persistence, RBAC authority, audit persistence |
| Asset registry edit/import | Backend pending/requires database | Schema/migrations/API in Release 6 |
| Document upload/download | Requires object storage | MinIO/S3 provider and access control in Release 6 |
| Validation queue resolution | API-ready/requires database | Persistent validation workflow |
| Inspection due/workpack | API-ready/requires SME policy review | Final due policy and persistence |
| Certification readiness | Requires Legal/Q&C review | No final PLO/certificate logic allowed |
| Evidence pack export | Requires object storage/RBAC/Legal/Q&C review | Export control and audit persistence |
| Reviewer work queue approval | Requires RBAC finalization | Final authority matrix |
| RBI assessment stepper | API-ready/requires SME review | Final methodology, no formulas until approved |
| PoF/CoF helper | Requires SME review | Formula/methodology TBD |
| Preliminary risk ranking | Requires SME review | Risk matrix/methodology TBD |
| Risk register updates | Requires database/RBAC/SME review | Persistence and risk acceptance policy |
| Administration role config | Requires OIDC/RBAC finalization | Keycloak/OIDC and role matrix |
| Helpdesk tickets | Backend pending | Ticket persistence and SLA policy |
