# Mock Data Scenario Contract

## Scenario Rule

Release 5 pages must use one consistent dummy/pilot scenario. Do not create inconsistent per-page records. Mock data must never imply final fit-for-operation, final certification/PLO, final RBI approval, legal compliance finality, interval extension approval, or risk acceptance.

## Scenario Identity

- Tenant: SBU AEBT Demo Tenant.
- Client: SPM Demo Client, Needs Project Owner Review.
- Project: SPM-01 Demo Project.
- Site/facility: SPM-01 Demo Site / Facility A.
- Data source status: mock/static until Release 6 persistence/API/storage integration readiness.

## Object Set

| Domain | Required mock objects | Required relationships | Allowed statuses |
| --- | --- | --- | --- |
| Tenant/client/project/site | tenant, client, project, site, facility | Tenant > client > project > site > facility | Active, Draft, Pending Review |
| Equipment/assets | pressure vessel, tank, piping segment, rotating equipment as needed | Facility/system/subsystem/equipment; linked docs, inspections, certificates, risk | Minimum Registry, Compliance Tracking Ready, Data Gap, Limited Basis |
| Documents | datasheet, certificate, inspection report, thickness/CML/TML report, calculation attachment | Link to asset, inspection, certificate, RBI assessment, evidence pack | Draft, Pending Review, Approved for Export, Revision Required, Missing Evidence |
| Inspections | due, overdue, scheduled, workpack-ready items | Link asset, workpack, evidence, findings/actions | Due Soon, Overdue, Scheduled, Pending Review, Revision Required |
| Certificates | register rows and renewal support records | Link asset, document checklist, evidence pack, submission log | Due Soon, Expired, Missing Evidence, Pending Review, Draft |
| RBI assessments | candidates, assessment shells, operating data, damage mechanism placeholders | Link asset, evidence, reviewer queue, risk register | Draft, Data Gathering, Preliminary, Pending SME Review, Revision Required |
| Risk register items | linked risk items and actions | Link RBI assessment, asset, action owner, evidence | Preliminary, Limited Basis, Data Gap, Pending Review |
| Recommendations/anomalies/actions | action items and assigned tasks | Link inspection/RBI/risk/document records | Open, Pending Review, Revision Required, Closed only for non-final admin actions |
| Evidence packs | reusable evidence pack previews | Link documents across modules; export log where applicable | Draft, Pending Review, Missing Evidence, Approved for Export |
| Reviewer queue items | Q&C, Legal, SME, engineer/inspector review items | Link source object, evidence, audit trail | Pending Review, Revision Required, Rejected, Approved for Export where appropriate |
| Audit trail items | create/update/review/export events | Link actor, timestamp, object, action, tenant scope | Recorded, Pending Persistence |
| Notifications | digest items | Link action queue and object route | New, Digest Pending, Acknowledged |
| Helpdesk tickets | UX/data/access issues | Link user, route, object, screenshot/reference | Open, In Progress, Resolved, Deferred |

## Required Labels

Use clear labels such as Draft, Pending Review, Preliminary, Data Gap, Limited Basis, Missing Evidence, Due Soon, Overdue, Rejected, Revision Required, and Approved for Export only where appropriate. If a status is unclear, mark TBD or Needs Review.

## Synchronization Rule

Future implementation must keep UI mock data, shared test data, seed files, and API fixtures synchronized. Until Release 6, page-level mock data should be treated as demonstration data only.
