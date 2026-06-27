# Asset Registry Component Behavior Spec

## Source Basis

Asset Registry MBS section K and Release 7/8 component guidance.

## Table Behavior

- Default view shows active assets with operational columns.
- Active filters MUST be visible and resettable.
- Sorting minimum: tag number, equipment class, due status, risk level, data quality, owner, last updated.
- Row click opens Asset Detail.
- Quick view opens drawer.
- Bulk action is allowed only for safe administrative actions based on permission.
- Bulk technical approval is prohibited unless explicitly allowed by rule and authority.

## Badge Behavior

- Data Quality badge MUST be visible on list and detail.
- Risk badge MUST distinguish Low, Medium, High, Critical.
- Due badge MUST distinguish Not Due, Due Soon, Due, Overdue, Completed, Not Applicable.
- Certificate badge MUST distinguish Valid, Due Soon, Expired, Suspended, Superseded, Not Available, Not Applicable.
- Draft/Preliminary watermark MUST appear when unapproved data enters report/export.
- Status MUST NOT rely on color only.

## Drawer Behavior

Quick drawer MUST show identity, hierarchy, data readiness, inspection due, certificate status, risk summary, latest inspection, linked documents, pending review, and next action.

Drawer MUST NOT become final critical technical approval surface unless evidence preview, change diff, comment, and approval authority check exist.

## Import Behavior

- Import result enters staging.
- Validation errors are grouped by issue.
- Duplicate candidate shows conflicting fields and resolution action.
- Rejected batch does not update baseline.
- Approved import creates import log, data quality report, change log, and audit event.

## Export Behavior

- Export requires purpose, scope, filter, row count, version, data timestamp, user, role, and file hash.
- Export warns for Data Gap, Limited Basis, Pending Validation, draft record, sensitive field, or out-of-scope selection.
- Formal/external export follows approval rule.
- Export cannot bypass audit trail.

## Empty/Error/Loading/Access-Denied Behavior

- Empty state must explain whether no records exist or filters hide results.
- Loading state must not shift table layout heavily.
- Error state must identify field/action and corrective path.
- Access denied state must not reveal hidden object data.

## Review/Approval Panel Behavior

Review panel must show reviewer role, source basis, change diff, comment, status, approval rule, and audit placeholder. Self-approval must be blocked for sensitive action.

## Comment/Change-Diff Behavior

Sensitive changes require old value, new value, reason, actor, timestamp, reviewer/approver, and status. Final UI diff details are future implementation work.