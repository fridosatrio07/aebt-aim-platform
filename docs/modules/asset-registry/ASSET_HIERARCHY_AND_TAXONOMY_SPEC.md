# Asset Hierarchy And Taxonomy Spec

## Source Basis

Asset Registry MBS sections B, F, G, I, P, and Q.

## Configurable Hierarchy

The Asset Registry MUST support configurable hierarchy up to 9 levels. The MBS minimum structure is:

1. tenant
2. client
3. project
4. site
5. facility
6. system
7. subsystem
8. equipment
9. component / CML / TML

## Mandatory Levels For MVP+

The MBS requires minimum structure but keeps final level naming and mandatory-level detail open before implementation sprint. For guidance:

- tenant, client, project, site, tag number, equipment class, basic location/hierarchy, asset status, and data owner are part of L0 mandatory validation.
- facility or agreed parent level is required before equipment can become baseline.
- final mandatory hierarchy level rules MUST be confirmed before production baseline.

## Optional Or Conditional Levels

System, subsystem, component, CML, and TML may be required depending on equipment class, site complexity, inspection use case, RBI readiness, and CML/TML import scope. Do not hard-code all levels as mandatory for every asset until final taxonomy approval.

## Parent-Child Validation Rules

- Parent hierarchy must be valid.
- Equipment must not stand without project/site/facility or an agreed parent level.
- Missing parent hierarchy sends the row to validation queue and blocks baseline.
- Hierarchy changes with technical/compliance impact require justification, approval, versioning, and audit.

## Hierarchy Path Display Rules

- List and detail views MUST show hierarchy path.
- Asset Detail MUST show hierarchy breadcrumb.
- Detail routes should use breadcrumb/detail context rather than duplicate top-level navigation items.

## Hierarchy Inheritance Rules

- Tenant/project/site scope applies to assets and linked objects.
- Facility/system/subsystem context MAY feed filters, batch routing, import mapping, and downstream module scoping.
- Changes that affect inspection, certification, RBI, risk, evidence, or compliance MUST be versioned and approval-controlled.

## Equipment Class Mapping Rules

- Equipment class must come from active taxonomy library or enter mapping review.
- Unknown equipment class must not become Validated directly.
- Mandatory field expectations may differ by equipment class; final per-class mandatory fields are open.

## Taxonomy Library Dependency

Final asset taxonomy library and equipment class mapping are explicit dependencies before sprint build. Platform Administrator may manage taxonomy/configuration, but technical approval authority remains governed by role and approval rules.

## Open Issues

- Final 9-level hierarchy naming.
- Which hierarchy levels are mandatory for MVP+ by equipment class/site complexity.
- Final tag uniqueness scope across tenant/project/site/facility/hierarchy.
- Final taxonomy owner and approval workflow.