# Asset Registry Error Exception Edge Case Spec

## Source Basis

Asset Registry MBS section N.

## Edge Case Matrix

| Edge case | Trigger | Expected UI behavior | Future API/control behavior | Audit event | Outcome |
| --- | --- | --- | --- | --- | --- |
| Permission denied | User lacks permission/scope | Access denied state; do not reveal restricted object data | Deny request server-side | failed_authorization | Blocked |
| Duplicate asset | Duplicate tag candidate found | Show duplicate candidate, conflicting fields, confidence, resolution choices | Prevent baseline approval until resolved | trigger_validation_queue | Routed to review |
| Missing parent hierarchy | Parent level absent/invalid | Row enters validation queue | Block baseline | trigger_validation_queue | Blocked |
| Unknown equipment class | Class not in active taxonomy | Mapping review state | Prevent Validated status | trigger_validation_queue | Routed to review |
| Missing mandatory field | Required L0-L3 field absent | Highlight field and severity | Block or route based on severity | trigger_validation_queue | Blocked/review |
| Invalid unit | Unit not recognized | Field error or warning | Reject or warn per rule | update_record or trigger_validation_queue | Blocked/warning |
| Technical data without source | Source document/basis missing | Data Gap or Limited Basis badge | Prevent direct approval where required | update_record | Routed to review |
| Archived/superseded source document | Linked source archived/superseded | Warning on linked object | Preserve reference history | update_record | Warning |
| Linked document superseded | Newer version exists | Show latest version and history | Preserve prior relation | update_record | Warning |
| Partial import failure | Some rows fail validation | Split valid and invalid rows | Do not update baseline for failed rows | import_data / reject_import | Partial, controlled |
| Self-approval attempt | Submitter approves same sensitive record | Show self-approval blocked message | Reject approval | failed_authorization | Blocked |
| Approved asset changed | Approved baseline field changed | Revision Required or Pending Review | Create revision/version | update_record / submit_for_review | Routed to review |
| Export with unvalidated data | Export includes Data Gap/Pending Validation | Warning and confirmation/approval prompt | Enforce export policy | asset_register_export | Warning/approval |
| Audit log write failure | Sensitive event cannot be logged | System alert/blocked sensitive action | Fail closed where feasible | system alert target TBD | Blocked where feasible |
| Archive with open linked action | Asset has open inspection/certificate/risk/action | Impact review required | Block archive until approval | delete_archive_record | Routed to review |
| Low risk with statutory due/expired obligation | Low risk but compliance obligation exists | Show priority/routing indicator | Route to compliance/inspection queue | update_record | Routed |
| Cross-tenant/project export attempt | Export crosses allowed scope | Denied/export blocked | Enforce tenant/project/site scope | failed_authorization | Blocked |
| Direct API bypass attempt | User bypasses UI URL/API | Access denied state if surfaced | Deny request and log | failed_authorization | Blocked |

## User-Facing Message Style

Messages MUST be concise, operational, and corrective. They SHOULD state what is wrong, what status is applied, and what role/action is needed. Messages MUST NOT use final legal, certification, safety, or fit-for-operation language.