# Modular Monolith Backend

## Status

Proposed

## Context

AIM Platform MVP+ requires a controlled architecture and governance baseline that supports high-volume asset integrity workflows, evidence traceability, auditability, tenant isolation, and human review boundaries.

## Decision

Backend uses NestJS modular monolith as the main application boundary.

## Rationale

This keeps MVP+ controlled, preserves domain boundaries, and avoids premature microservices.

## Consequences

- Future tasks must align with this proposed decision unless an approved ADR changes it.
- Implementation details remain subject to task-level review and UBT/IT approval.
- This ADR is not accepted until explicit approval exists.

## Source Basis

- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.

## Open Issues

- Needs Project Owner and UBT/IT review.
- Needs confirmation during implementation planning.
