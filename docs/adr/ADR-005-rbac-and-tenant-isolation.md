# RBAC and Tenant Isolation

## Status

Proposed

## Context

AIM Platform MVP+ requires a controlled architecture and governance baseline that supports high-volume asset integrity workflows, evidence traceability, auditability, tenant isolation, and human review boundaries.

## Decision

Use Keycloak/OIDC-ready authentication with application-level RBAC and tenant/project/site access scope enforcement.

## Rationale

AIM Platform handles multi-tenant operational data and controlled evidence; no endpoint may bypass tenant isolation or least privilege.

## Consequences

- Future tasks must align with this proposed decision unless an approved ADR changes it.
- Implementation details remain subject to task-level review and UBT/IT approval.
- This ADR is not accepted until explicit approval exists.

## Source Basis

- PRD URS Pengembangan AIM Platform SBU AEBT, Rev. 1; Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.

## Open Issues

- Needs Project Owner and UBT/IT review.
- Needs confirmation during implementation planning.
