# Test and Acceptance Rules

## Required Quality Gates

Future implementation tasks must define and run applicable checks:

- Lint.
- Typecheck.
- Unit test.
- Integration test where applicable.
- Migration check.
- Build.
- RBAC test.
- Tenant isolation test.
- Audit log test.
- Validation queue test.
- No unsupported final decision test.
- UI empty/loading/error/access denied state check.
- Manual review checklist.

## Definition of Ready

A task is ready only when:

- The agent has read relevant docs/ai-context files.
- The agent has read the specific task packet.
- Source basis is identified.
- Scope and out-of-scope boundaries are clear.
- Allowed/protected files are clear.
- Required SME/Legal/Q&C/UBT/IT decisions are identified or marked TBD.
- Acceptance criteria and required checks are understood.

## Definition of Done

A task is done only when:

- Implementation matches the task scope.
- No out-of-scope feature was added.
- Lint/typecheck/tests/build/migration checks required by the task passed or are documented as not applicable with reason.
- Tenant isolation and RBAC behavior were checked where applicable.
- Audit log behavior was checked where applicable.
- UI required states were checked where applicable.
- No unsupported compliance/RBI/legal/certification/final technical logic was introduced.
- Task packet status is updated to Done only after required checks pass.
- docs/handoff/TASK_COMPLETION_LOG.md and handoff notes are updated.

## Source Basis

- Master FRD SRS Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Master BPMN Workflow Pack Pengembangan AIM Platform SBU AEBT, Rev. 1.
