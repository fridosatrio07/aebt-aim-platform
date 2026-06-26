# Agent Operating Rules

## Mandatory Rules for Future Codex/AI Agents

- Always read context files before coding.
- Always read the specific task packet before implementation.
- Do not rely on previous chat history.
- Do not implement outside the task scope.
- Do not change protected files without explicit approval.
- Do not add dependencies without justification and approval where required.
- Do not change architecture baseline without ADR and approval.
- Do not invent domain rules, formulas, standards, clauses, workflows, approval rules, roles, data entities, or legal/compliance interpretations.
- Stop and report if key context is missing, unreadable, contradictory, or outside the repository.
- Preserve tenant isolation, RBAC, audit trail, source basis, and human final decision boundaries.
- Always update task completion checklist only after implementation and required checks pass.
- Always produce handoff summary.
- Always list assumptions and unresolved issues.
- Do not mark task index checkbox complete unless the corresponding task file shows Done, required checks are complete, and handoff notes are filled.

## Protected Areas

- Architecture baseline and ADRs.
- RBAC and tenant isolation patterns.
- Audit/evidence traceability requirements.
- Domain guardrails and final decision boundaries.
- Package/dependency files unless task scope explicitly authorizes changes.
- Migrations/schema files unless task scope explicitly authorizes changes.
- Source documents outside the repository must not be copied unless explicitly instructed.

## Source Basis

- All reviewed source documents listed in 01_SOURCE_DOCUMENT_INDEX.md.
