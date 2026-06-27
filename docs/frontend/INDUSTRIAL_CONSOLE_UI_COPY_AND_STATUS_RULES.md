# Industrial Console UI Copy and Status Rules

## Objective

Standardize placeholder, draft/preliminary, route readiness, and boundary wording so RoutePageShell and future industrial console pages never imply unsupported backend availability, final domain decisions, or production persistence.

## Approved Wording Patterns

Use these patterns in RoutePageShell and future industrial console pages.

### Placeholder State

- `Mock data`
- `Mock/API-ready shell`
- `Planned integration`
- `Pending backend`

### Draft or Preliminary State

- `Draft`
- `Preliminary`
- `Preliminary support`
- `Pending review`

### API-Ready but Not Integrated

- `API-ready shell`
- `API-ready route`
- `Backend wiring pending`

### No Final Decision

- `No final technical decision`
- `Not a final operational decision`
- `Review required before use`

## Forbidden Wording

Unless explicitly qualified as reviewed or approved by an authorized role — which is not implemented at this stage — the following wording MUST NOT appear in RoutePageShell or future industrial console pages:

- `fit for operation`
- `safe to operate`
- `layak operasi`
- `certified`
- `approved final`
- `compliant final`
- `RBI final`
- `PLO ready final`
- `legal interpretation final`
- `production-ready`
- `final certification-ready`

Qualified wording MUST include the authorizing role and review state, which is a future backend and RBAC concern.

## Preferred Terms

Use these terms consistently:

- `Draft`
- `Preliminary`
- `Pending Review`
- `API-ready shell`
- `Mock data`
- `Planned integration`
- `Evidence pending`
- `Review required`
- `Access boundary not enforced at persistence layer`
- `Data gap`
- `Limited basis`
- `Needs RBAC review`

## Status Taxonomy

### Route Readiness

- `Mock`
- `API-ready`
- `Pending backend`
- `Planned`
- `Disabled`
- `Needs review`

### Implementation Maturity

- `Placeholder`
- `Shell only`
- `Partial`
- `Controlled`

### Data Basis

- `Mock data`
- `API-ready shell`
- `Production-ready`
- `Data gap`
- `Limited basis`

### Evidence State

- `Complete`
- `Missing`
- `Partial`
- `Pending review`
- `Rejected`

### Review State

- `Draft`
- `Pending review`
- `Revision required`
- `Approved for export`
- `Rejected`

### Access Boundary

- `Full access`
- `Read-only`
- `Needs RBAC review`
- `Access denied`
- `Access boundary not enforced at persistence layer`

### Export State

- `Export ready`
- `Export warning`
- `Blocked`
- `Pending approval`