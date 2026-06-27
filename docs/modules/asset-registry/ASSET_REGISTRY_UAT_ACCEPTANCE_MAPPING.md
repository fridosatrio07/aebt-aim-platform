# Asset Registry UAT Acceptance Mapping

## Source Basis

Asset Registry MBS section O.

## UAT Mapping

| UAT ID | Scenario | Expected result | Related requirement | Related screen | Related permission | Related audit event | Evidence/output | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UAT-AR-001 | User with permission opens Asset Registry List | Data appears by tenant/project/site scope; filter and saved view active | MBS-AR-FR-001, 004 | Asset Registry List | View | none/read audit if configured | List screenshot/query result | P0 | Guidance only |
| UAT-AR-002 | User searches by tag, class, location, owner | Results match filter and do not show out-of-scope data | MBS-AR-FR-004 | Asset Registry List | View | none/read audit if configured | Filtered result | P0 | Guidance only |
| UAT-AR-003 | User opens Asset Detail | Header, tabs, linked objects, data quality, badges, actions display by permission | MBS-AR-FR-005 | Asset Detail / Asset 360 | View | none/read audit if configured | Detail screen | P0 | Guidance only |
| UAT-AR-004 | Data Analyst uploads asset import template | Import batch created, mapping read, rows enter staging | MBS-AR-FR-006 | Data Import Mapping | Create/import | import_data | Import batch record | P0 | Guidance only |
| UAT-AR-005 | Import has duplicate tag | Duplicate candidate shown; baseline approval blocked until resolution | MBS-AR-FR-007 | Data Import Mapping / Validation Queue | Import/review | trigger_validation_queue | Duplicate report | P0 | Guidance only |
| UAT-AR-006 | Import has missing parent hierarchy | Row enters validation queue and does not become Validated | MBS-AR-FR-007 | Validation Queue | Import/review | trigger_validation_queue | Validation issue | P0 | Guidance only |
| UAT-AR-007 | Data Owner approves baseline import | Status changes to Validated/Approved per rule; audit trail recorded | MBS-AR-FR-008, 013 | Review/Baseline Approval | Approve | approve | Approval trail | P0 | Guidance only |
| UAT-AR-008 | Inspector edits sensitive technical field without authority | System rejects or routes to review; audit event recorded | MBS-AR-FR-013, 014 | Asset Detail | Edit/review | failed_authorization or submit_for_review | Error/review item | P0 | Guidance only |
| UAT-AR-009 | User changes equipment class on approved asset | Revision created, reason required, review triggered if technical impact | MBS-AR-FR-002, 013 | Asset Detail | Edit/review | update_record / submit_for_review | Revision record | P0 | Guidance only |
| UAT-AR-010 | User links existing document to asset | Document linked without duplicate upload; linked object and audit updated | MBS-AR-FR-010 | Asset Detail / Documents | Link evidence | link_evidence | Linked document | P0 | Guidance only |
| UAT-AR-011 | User exports asset register | Export includes purpose, scope, filter, timestamp, version, file hash, data gap warning if present | MBS-AR-FR-012 | Asset Registry List | Export | asset_register_export | Export log | P0 | Guidance only |
| UAT-AR-012 | Auditor/Viewer tries edit | Action denied, no data changed, failed authorization recorded | MBS section D | Asset Detail/List | Read-only | failed_authorization | Denied event | P0 | Guidance only |
| UAT-AR-013 | User views asset with Data Gap | Data Gap badge visible in list, detail, drawer, export warning, review queue | MBS-AR-FR-008 | List/Detail/Drawer/Export/Review | View | none/update if status change | Visible badge | P0 | Guidance only |
| UAT-AR-014 | Asset has expired certificate and high risk | Priority/routing indicator and linked action to Certification/Risk/Inspection per scope | MBS-AR-FR-011 | Asset Detail / linked panel | View/routing | update_record if routed | Routing indicator | P0 | Guidance only |
| UAT-AR-015 | Archive asset with open action | Impact review and approval required; archive blocked without approval | MBS section N/M | Asset Detail | Archive/approve | delete_archive_record / submit_for_review | Impact review item | P0 | Guidance only |

## Pilot Readiness Criteria

- All P0 UAT pass in future implementation.
- No critical authorization defect.
- Import baseline approval works.
- Audit trail is recorded.
- Export cannot bypass permission.
- Data Gap is visible in list, detail, drawer, export warning, and review queue.
- Asset with expired certificate/high risk routes to downstream action.
- Archive with open action requires impact review and approval.