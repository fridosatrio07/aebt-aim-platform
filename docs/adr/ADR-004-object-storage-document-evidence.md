# Object Storage for Document and Evidence

## Status

Proposed

## Context

AIM Platform MVP+ requires a controlled architecture and governance baseline that supports high-volume asset integrity workflows, evidence traceability, auditability, tenant isolation, and human review boundaries.

## Decision

Use MinIO / S3-compatible object storage for documents, evidence, attachments, report exports, and generated packages.

## Rationale

Large/versioned evidence files should not burden relational tables and must support traceability and scalable storage.

## Consequences

- Future tasks must align with this proposed decision unless an approved ADR changes it.
- Implementation details remain subject to task-level review and UBT/IT approval.
- This ADR is not accepted until explicit approval exists.

## Source Basis

- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1; Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1.

## Open Issues

- Needs Project Owner and UBT/IT review.
- Needs confirmation during implementation planning.
