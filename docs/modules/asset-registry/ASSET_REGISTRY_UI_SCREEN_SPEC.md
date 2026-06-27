# Asset Registry UI Screen Spec

## Source Basis

Asset Registry MBS section J, with Release 7 and Release 8 frontend guidance.

## Global Screen Requirements

Every Asset Registry screen MUST show where applicable:

- breadcrumb;
- tenant/project/site/facility context;
- role/access scope;
- saved view;
- search;
- filter chip/filter drawer;
- primary action;
- secondary action;
- export action based on permission;
- loading state;
- empty state;
- error state;
- access denied state;
- audit trail link where permitted;
- draft/preliminary or data-quality boundary if output is not approved.

## Asset Registry List

The list MUST be a dense operational table with toolbar.

Toolbar:

- search
- saved view
- filter chip
- column setting
- import asset
- create asset
- export register
- bulk action
- send selected to validation
- link document
- open quick drawer

Default columns:

- Tag Number
- Asset Name
- Hierarchy Path
- Equipment Class
- Service
- Location
- Criticality
- Inspection Due Status
- Certificate Status
- Risk Level
- Data Quality
- Document Status
- Owner
- Last Updated

Filters:

- tenant/project/site/facility
- equipment class
- criticality
- due status
- certificate status
- risk level
- data quality
- document status
- owner
- workflow route
- readiness stage

Row click opens Asset Detail. Quick view opens drawer. List must keep filter context when navigating.

## Asset Detail / Asset 360

Header MUST show:

- tag number
- asset name
- hierarchy breadcrumb
- asset status
- risk badge
- due badge
- certificate badge
- data quality badge
- workflow route
- owner
- primary action

Tabs:

- Overview
- Datasheet
- Operating Data
- CML/TML & Thickness
- Inspection History
- Risk Summary
- Documents
- Certification
- Change Log

Linked object panel:

- linked documents
- active certificate
- latest inspection
- latest finding
- open recommendation
- open anomaly
- active RBI assessment
- linked risk register
- evidence readiness
- pending review
- audit trail access

## Data Import Mapping Screen

Stepper:

- template selection
- file upload
- field mapping
- duplicate detection
- validation queue
- data quality review
- baseline approval

Fields:

- import batch ID
- source file
- source column
- target field
- mandatory flag
- validation rule
- mapping confidence
- error count
- duplicate candidate
- resolution status
- owner
- review status

Actions:

- upload file
- download template
- save mapping template
- run validation
- resolve duplicate
- assign owner
- approve baseline
- reject batch
- export error report

## Navigation Requirement

Asset Registry list MUST be reachable from the left sidebar. Asset Detail/Asset 360 MUST use route/breadcrumb/detail context and SHOULD NOT become a duplicate top-level sidebar item.

## Guardrails

- No screen may imply production data when still mock/API-ready.
- No screen may imply final technical, legal, certification, safety, or RBI/RLA/FFS approval.
- Export and approval actions must remain disabled/API-ready until permission and audit controls exist.