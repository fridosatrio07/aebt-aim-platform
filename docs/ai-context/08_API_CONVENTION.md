# API Convention

## Baseline

AIM Platform uses REST/JSON API between the Next.js frontend and NestJS backend. Exact endpoint inventory and payload contracts remain TBD until task-level implementation.

## Response Shape

TBD. Safe placeholder for future discussion:

```json
{
  "data": {},
  "meta": {}
}
```

Do not treat this as approved final contract until R0-03 is completed and reviewed.

## Error Shape

TBD. Safe placeholder for future discussion:

```json
{
  "error": {
    "code": "TBD_ERROR_CODE",
    "message": "Human-readable error message",
    "details": []
  }
}
```

## Validation Behavior

- Requests must be validated at the API boundary.
- Invalid field, missing tenant/project/site context, invalid unit/date, duplicate conflict, missing parent, missing source, and unsupported state transition must return structured validation errors.
- Import/extraction records must remain in staging or validation queue until approved.

## Pagination, Filtering, and Sorting

TBD final query contract. Initial convention must support pagination, filtering by tenant/project/site/facility/module/status/owner/due window/risk level where relevant, sorting by priority/due date/aging/risk/created/updated/module where relevant, and saved/default views for large lists.

## Tenant, Project, and Site Context

- Every tenant-scoped request must carry validated tenant context from authenticated session/access scope.
- Project/site/facility context must be enforced where object scope requires it.
- No endpoint may bypass tenant isolation.

## RBAC Permission Check

- Every endpoint must check application-level RBAC.
- Sensitive actions such as review, approval, final status change, export, delete, configuration, and sensitive data access require explicit permission and audit logging.
- Final permission matrix remains Needs UBT/IT + Project Owner Review.

## Audit Logging Requirement

Audit logging is required for create/update/delete, status changes, review, approval, upload, export, access-sensitive actions, configuration changes, and security-relevant actions.

## Source Basis

- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Data Model Pack Pengembangan AIM Platform SBU AEBT, Rev. 1.
