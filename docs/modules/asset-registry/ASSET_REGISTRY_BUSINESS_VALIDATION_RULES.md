# Asset Registry Business And Validation Rules

## Source Basis

Asset Registry MBS section G.

## Business Rules

- Asset Registry MUST be the master reference. Other modules MUST reference Asset Registry instead of creating uncontrolled asset copies.
- Tag number uniqueness MUST be enforced within the agreed tenant/project/site/hierarchy scope.
- Manual entry is for individual additions or minor correction only; onboarding MUST be batch-first.
- L0 data is enough for registry display but not enough for RBI or advanced assessment.
- Imported, extracted, reconstructed, interview-based, or assumption-based data MUST have source document or source basis.
- Assets with statutory obligation, due/overdue inspection, expired certificate, high-risk indicator, high criticality, or client request MUST enter priority/routing queue.
- Evidence/document MUST be reusable.
- Duplicate document upload MUST show warning or link-existing option.
- Archive MUST use soft delete by default.
- Sensitive field changes MUST be versioned, reasoned, approved, and audited.
- Technical output related to risk, RBI, inspection interval, remaining life, certification readiness, or fitness MUST remain draft/preliminary until authorized review.

## Validation Rules

- L0 mandatory fields: client, project, site, tag number, equipment class, basic location/hierarchy, asset status, data owner.
- L1 mandatory fields: applicable obligation or not applicable reason, due date if available, certificate status if available, due status.
- L2 mandatory fields: minimum inspection history if available, certificate record, document checklist, minimum evidence.
- L3 mandatory fields: operating data, design basis, material, relevant inspection history, damage mechanism basis, assumption/source basis.
- Parent hierarchy MUST be valid.
- Equipment MUST NOT stand without project/site/facility or agreed parent level.
- Equipment class MUST come from active taxonomy library or enter mapping review.
- Issue date MUST NOT be later than expiry date.
- Operating pressure over design pressure MUST trigger warning and reviewer flag.
- Thickness reading MUST NOT be negative or unreasonable.
- Negative or outlier corrosion rate MUST trigger warning and MUST NOT be automatically used as final basis.
- Data quality override MUST have reason, approver, timestamp, and audit event.
- Import batch cannot become Validated if duplicate conflict, missing source, invalid unit, invalid date, missing parent, or mandatory field issues remain.

## Out Of Scope

- Final formula/calculation implementation.
- Final per-equipment-class mandatory-field matrix.
- Final regulatory interpretation.
- Runtime validation code in this docs-first task.