# RBAC and Permission Rules

Final permission matrix details are marked Needs UBT/IT + Project Owner Review unless explicitly defined in source documents. Least privilege, tenant/project/site scoping, and auditability are mandatory.

| Role name | Purpose | Allowed actions | Restricted actions | Approval authority notes | Tenant/project/site scope | Audit requirement |
| --- | --- | --- | --- | --- | --- | --- |
| Platform Administrator | Manage tenant, client, project, site, user, role, permission, approval workflow, notification, regulatory library, asset taxonomy, template, import mapping, logs, configuration baseline | Configure approved platform baseline | No final technical/legal/certification decision | Configuration authority only; final authority TBD | Tenant/project/site scoped | Required |
| System Administrator | Operate technical environment, access, backup, logging, support readiness | Manage technical configuration where approved | No domain final decision | Needs UBT/IT Review | Environment and tenant scoped | Required |
| Inspector | Work with inspection plans/workpacks, events, reports, photos, findings, draft recommendations | Inspection data entry and evidence linking | No final fit-for-operation or layak operasi declaration | Technical authority TBD | Project/site/equipment scoped | Required |
| RBI Engineer | Create draft assessment basis, operating data, damage mechanism notes, PoF/CoF/risk ranking records, inspection/mitigation/revalidation basis, IOW/MOC trigger | Draft/preliminary RBI workflow actions | No automatic final RBI/RLA/FFS/risk acceptance decision | Needs SME/Project Owner Review | Project/site/equipment scoped | Required |
| Certification Team | Manage certificate register, renewal tracker, PLO/certification readiness, checklist, submission log, approval log, evidence pack | Certification support and readiness tracking | Must not issue certificate/PLO automatically | Certification authority external/authorized only | Project/site/equipment scoped | Required |
| Document Controller | Manage repository, metadata, versioning, links, evidence tagging, controlled access, export package, document status | Document/evidence control | No legal/technical final decision | Controlled document authority TBD | Tenant/project/site scoped | Required |
| Q&C Reviewer | Review compliance matrix, SOP, approval trail, evidence completeness, compliance interpretation | Review quality/compliance items where authorized | No unsupported legal final interpretation | Needs Q&C Review | Governance/project/site scoped | Required |
| Legal Reviewer | Review legal/compliance interpretation and disclaimer-sensitive items | Legal review where authorized | No automated legal final interpretation | Needs Legal Review | Governance/project/site scoped | Required |
| Management Reviewer | View dashboard and escalated management status | Management review and decision gates where authorized | No technical final decision unless authorized | Needs Project Owner Review | Tenant/project/site/portfolio scoped | Required |
| Data Analyst / Reporting Analyst | Support data quality checks, dashboards, reporting, platform usage analysis | Data quality/reporting work | No final domain decision | Needs Review | Tenant/project/site scoped | Required |
| Client User / Asset Owner Representative | View scoped assets, inspection/certification status, risk summary, recommendations, evidence readiness, reports, dashboard, actions | Client-scoped view/action updates | No access beyond client scope | Needs Project Owner + Client Review | Tenant/client/project/site scoped | Required |
| Auditor / Viewer | Read-only access to data, documents, evidence packs, report exports, audit trail, compliance status | View approved scope only | No edit/export unless explicitly permitted | Read-only unless approved | Approved audit/review scope | Required |
| Helpdesk / Customer Support | Ticketing, onboarding support, first-level troubleshooting, escalation | Support actions | No data/domain final decision | Needs Review | Tenant/project/site support scope | Required |

## Permission Principles

- Every role must be scoped by tenant/project/site/facility where applicable.
- Review, approval, final status change, export, delete, configuration, and sensitive data access must be restricted and audited.
- Client users must not access other tenants or other client scopes.
- External parties require explicit approved scope.
- Role templates are allowed for onboarding but must remain reviewable.

## Source Basis

- PRD URS Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Master BPMN Workflow Pack Pengembangan AIM Platform SBU AEBT, Rev. 1.
- Kajian Analisis Pengembangan AIM Platform SBU AEBT, Rev. A.
- Technical Design Solution Architecture Pengembangan AIM Platform SBU AEBT, Rev. 1.
