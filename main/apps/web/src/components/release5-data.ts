import {
  decisionBoundaryNotice,
  defaultTenantScope,
  release0PlatformAdmin,
  Release1DataFoundation,
  Release2WorkflowFoundation,
  Release3BusinessFoundation,
  Release4IntegrityFoundation,
  type ActionItemRecord,
  type AssetRecord,
  type BusinessKpiCard,
  type CertificationRecord,
  type DashboardActionCard,
  type DocumentRecord,
  type EvidenceChecklistRecord,
  type EvidencePackRecord,
  type ExportLogRecord,
  type InspectionDueRecord,
  type OperatingDataRecord,
  type DamageMechanismRecord,
  type PofCofHelperRecord,
  type ReviewerWorkQueueItem,
  type RbiAssessmentRecord,
  type RbiCandidateRecord,
  type RiskRankingRecord,
  type RiskRegisterItemRecord,
  type ValidationQueueItem,
  type WorkpackRecord
} from '@aim-platform/shared';

const dataFoundation = new Release1DataFoundation();
const workflowFoundation = new Release2WorkflowFoundation();
const businessFoundation = new Release3BusinessFoundation();
const integrityFoundation = new Release4IntegrityFoundation();

export interface RouteItem {
  id: string;
  route: string;
  label: string;
  module: string;
  roles: string;
  dataStatus: 'Mock' | 'Static' | 'API-ready' | 'Pending backend' | 'TBD';
  permissionNote: string;
  status: 'Implemented' | 'Partial' | 'Planned' | 'TBD';
}

export interface PageSummary {
  id: string;
  page: string;
  purpose: string;
  primaryUsers: string;
  status: string;
  guardrail: string;
}

export interface InteractionStateItem {
  label: string;
  state: string;
  behavior: string;
  guardrail: string;
}

export interface BoundaryItem {
  area: string;
  boundary: string;
  blocker: string;
}

export interface ComponentContractItem {
  name: string;
  purpose: string;
  status: string;
  forbiddenUse: string;
}

export interface AcceptanceItem {
  label: string;
  status: 'Implemented' | 'Covered' | 'Needs review';
}

const scope = defaultTenantScope;
const actor = release0PlatformAdmin;

const assets = dataFoundation.listAssets(actor, scope, { pageSize: 25 }).data;
const documents = dataFoundation.listDocuments(actor, scope, { pageSize: 25 }).data;
const validationQueue = dataFoundation.listValidationQueue(actor, scope, { pageSize: 25 }).data;
const dashboardActions = workflowFoundation.listDashboardActionCards(actor, scope).data;
const myWork = workflowFoundation.listMyWork(actor, scope, { pageSize: 25 }).data;
const reviewerQueue = workflowFoundation.listReviewerQueue(actor, scope, { pageSize: 25 }).data;
const exportLogs = workflowFoundation.listExportLogs(actor, scope, { pageSize: 25 }).data;
const inspections = businessFoundation.listInspectionDue(actor, scope, { pageSize: 25 }).data;
const workpacks = businessFoundation.listWorkpacks(actor, scope, { pageSize: 25 }).data;
const certifications = businessFoundation.listCertificationRegister(actor, scope, { pageSize: 25 }).data;
const evidenceChecklists = businessFoundation.listEvidenceChecklists(actor, scope, { pageSize: 25 }).data;
const evidencePacks = businessFoundation.listEvidencePacks(actor, scope, { pageSize: 25 }).data;
const businessKpis = businessFoundation.listBusinessKpis(actor, scope).data;
const rbiCandidates = integrityFoundation.listRbiCandidates(actor, scope, { pageSize: 25 }).data;
const rbiAssessments = integrityFoundation.listAssessments(actor, scope, { pageSize: 25 }).data;
const firstAssessmentId = rbiAssessments[0]?.id;
const operatingData = firstAssessmentId ? integrityFoundation.listOperatingData(actor, scope, firstAssessmentId).data : [];
const damageMechanisms = firstAssessmentId ? integrityFoundation.listDamageMechanisms(actor, scope, firstAssessmentId).data : [];
const pofCofHelper = firstAssessmentId ? integrityFoundation.getPofCofHelper(actor, scope, firstAssessmentId).data : null;
const riskRanking = firstAssessmentId ? integrityFoundation.getRiskRanking(actor, scope, firstAssessmentId).data : null;
const riskRegisterItems = firstAssessmentId ? integrityFoundation.listRiskRegisterItems(actor, scope, firstAssessmentId).data : [];

export const release5Scenario = {
  tenant: 'SBU AEBT Demo Tenant',
  client: 'SPM Demo Client - Needs Project Owner Review',
  project: 'SPM-01 Demo Project',
  site: 'SPM-01 Demo Site / Facility A',
  dataSourceStatus: 'Mock/static data synchronized from R1-R4 shared foundations',
  decisionBoundary: decisionBoundaryNotice
};

export const release5Data: {
  assets: AssetRecord[];
  documents: DocumentRecord[];
  validationQueue: ValidationQueueItem[];
  dashboardActions: DashboardActionCard[];
  myWork: ActionItemRecord[];
  reviewerQueue: ReviewerWorkQueueItem[];
  exportLogs: ExportLogRecord[];
  inspections: InspectionDueRecord[];
  workpacks: WorkpackRecord[];
  certifications: CertificationRecord[];
  evidenceChecklists: EvidenceChecklistRecord[];
  evidencePacks: EvidencePackRecord[];
  businessKpis: BusinessKpiCard[];
  rbiCandidates: RbiCandidateRecord[];
  rbiAssessments: RbiAssessmentRecord[];
  operatingData: OperatingDataRecord[];
  damageMechanisms: DamageMechanismRecord[];
  pofCofHelper: PofCofHelperRecord | null;
  riskRanking: RiskRankingRecord | null;
  riskRegisterItems: RiskRegisterItemRecord[];
} = {
  assets,
  documents,
  validationQueue,
  dashboardActions,
  myWork,
  reviewerQueue,
  exportLogs,
  inspections,
  workpacks,
  certifications,
  evidenceChecklists,
  evidencePacks,
  businessKpis,
  rbiCandidates,
  rbiAssessments,
  operatingData,
  damageMechanisms,
  pofCofHelper,
  riskRanking,
  riskRegisterItems
};

export const routeItems: RouteItem[] = [
  { id: 'dashboard', route: '/dashboard', label: 'Dashboard', module: 'Cross-module', roles: 'Management, reviewers, scoped users', dataStatus: 'Mock', permissionNote: 'Needs RBAC Review', status: 'Partial' },
  { id: 'my-work', route: '/my-work', label: 'My Work', module: 'Workflow', roles: 'All scoped users', dataStatus: 'Mock', permissionNote: 'Needs RBAC Review', status: 'Partial' },
  { id: 'assets', route: '/assets', label: 'Asset Registry', module: 'Asset Registry', roles: 'Inspector, engineer, client scoped users', dataStatus: 'API-ready', permissionNote: 'Needs RBAC Review', status: 'Partial' },
  { id: 'documents', route: '/documents', label: 'Document Repository', module: 'Documents/Evidence', roles: 'Document controller, reviewers', dataStatus: 'Pending backend', permissionNote: 'Needs UBT/IT Review', status: 'Partial' },
  { id: 'validation', route: '/validation-queue', label: 'Validation Queue', module: 'Data Quality', roles: 'Data analyst, document controller, reviewer', dataStatus: 'API-ready', permissionNote: 'Needs RBAC Review', status: 'Partial' },
  { id: 'inspection', route: '/inspections', label: 'Inspection Tracking', module: 'Inspection', roles: 'Inspector, engineer, reviewer', dataStatus: 'API-ready', permissionNote: 'Needs Engineer/Inspector Review', status: 'Partial' },
  { id: 'certification', route: '/certifications', label: 'Certification Register', module: 'Certification Support', roles: 'Certification team, document controller', dataStatus: 'API-ready', permissionNote: 'Needs Legal/Q&C Review', status: 'Partial' },
  { id: 'evidence', route: '/evidence-packs', label: 'Evidence Packs', module: 'Evidence', roles: 'Document controller, reviewers', dataStatus: 'Pending backend', permissionNote: 'Needs Q&C/Legal Review', status: 'Partial' },
  { id: 'reviewer', route: '/reviewer-queue', label: 'Reviewer Queue', module: 'Review Workflow', roles: 'Q&C, Legal, SME, management reviewers', dataStatus: 'API-ready', permissionNote: 'Needs authority review', status: 'Partial' },
  { id: 'rbi', route: '/integrity/rbi', label: 'Integrity / RBI', module: 'RBI/Risk', roles: 'RBI engineer, SME, reviewer', dataStatus: 'API-ready', permissionNote: 'Needs SME Review', status: 'Partial' },
  { id: 'risk', route: '/risk-register', label: 'Risk Register', module: 'Risk Management', roles: 'RBI engineer, reviewer, management', dataStatus: 'API-ready', permissionNote: 'Needs SME/Q&C Review', status: 'Partial' },
  { id: 'admin', route: '/admin', label: 'Administration', module: 'Governance/Admin', roles: 'Platform admin, system admin', dataStatus: 'Pending backend', permissionNote: 'Needs UBT/IT Review', status: 'Planned' },
  { id: 'helpdesk', route: '/helpdesk', label: 'Helpdesk / Bug Log', module: 'Support', roles: 'All users, helpdesk', dataStatus: 'Mock', permissionNote: 'Needs Project Owner Review', status: 'Partial' }
];

export const pageSummaries: PageSummary[] = [
  { id: 'dashboard', page: 'Dashboard', purpose: 'Cross-module KPI and action overview', primaryUsers: 'Management, reviewers, scoped users', status: 'Mock/API-ready', guardrail: 'KPI counts do not mean final compliance.' },
  { id: 'my-work', page: 'My Work / Action Inbox', purpose: 'Role-based daily work queue', primaryUsers: 'All scoped users', status: 'Mock/API-ready', guardrail: 'Submit/review is not final approval.' },
  { id: 'asset-data', page: 'Asset, Document & Validation', purpose: 'Data quality, document linkage, and validation queue', primaryUsers: 'Inspector, document controller, data analyst', status: 'API-ready/storage pending', guardrail: 'Staged data is not promoted silently.' },
  { id: 'business', page: 'Inspection, Certification & Evidence', purpose: 'Due tracking, certification support, evidence pack readiness', primaryUsers: 'Inspector, certification team, reviewers', status: 'API-ready/storage pending', guardrail: 'No certificate/PLO or fit-for-operation decision.' },
  { id: 'integrity', page: 'RBI, Risk & Reviewer Queue', purpose: 'Controlled integrity skeleton and preliminary risk review', primaryUsers: 'RBI engineer, SME, reviewers', status: 'API-ready/SME pending', guardrail: 'No final RBI/RLA/FFS or interval extension.' },
  { id: 'admin-support', page: 'Administration & Helpdesk', purpose: 'Governance, access boundary, support intake', primaryUsers: 'Admin, helpdesk, all users', status: 'Backend pending', guardrail: 'No final authority matrix until review.' }
];

export const interactionStates: InteractionStateItem[] = [
  { label: 'Primary action', state: 'API-ready', behavior: 'Shows exact route/action target and disabled fallback where backend is pending.', guardrail: 'No final decision action.' },
  { label: 'Drawer', state: 'Local state only', behavior: 'Opens detail context without losing table position.', guardrail: 'Review/evidence/audit context remains visible.' },
  { label: 'Bulk action', state: 'Disabled', behavior: 'Visible but disabled until RBAC and backend persistence are approved.', guardrail: 'No batch final technical approval.' },
  { label: 'Export', state: 'Pending backend', behavior: 'Shows export warning, approval status, and export log dependency.', guardrail: 'Export is not legal/certification approval.' },
  { label: 'Validation resolution', state: 'API-ready', behavior: 'Shows issue history and data quality status.', guardrail: 'Data Gap/Limited Basis remains visible.' },
  { label: 'Approve/reject/revision', state: 'Needs authority review', behavior: 'Reviewer actions are labelled preliminary and authority TBD.', guardrail: 'No final compliance/RBI/certification approval.' }
];

export const boundaryItems: BoundaryItem[] = [
  { area: 'Current workbench', boundary: 'Mock functional/static demo', blocker: 'Single route; no persistence.' },
  { area: 'Document upload/download', boundary: 'Requires object storage', blocker: 'MinIO/S3 provider and access controls pending.' },
  { area: 'Workflow transitions', boundary: 'API-ready', blocker: 'Persistent workflow/audit log pending Release 6.' },
  { area: 'Certification readiness', boundary: 'Requires Legal/Q&C review', blocker: 'No certificate/PLO issuance logic allowed.' },
  { area: 'RBI assessment', boundary: 'Requires SME review', blocker: 'RBI methodology/formulas remain TBD.' },
  { area: 'Administration', boundary: 'Requires RBAC/OIDC finalization', blocker: 'Final role matrix and Keycloak/OIDC integration pending.' }
];

export const componentContracts: ComponentContractItem[] = [
  { name: 'AppShell', purpose: 'Global scope and route frame', status: 'Implemented partial', forbiddenUse: 'Do not hide tenant/project/site context.' },
  { name: 'PageHeader', purpose: 'Breadcrumb, title, boundary status', status: 'Implemented', forbiddenUse: 'Do not use marketing hero layout.' },
  { name: 'KPIActionCard', purpose: 'Dashboard-to-action indicators', status: 'Implemented', forbiddenUse: 'Do not show KPI as final compliance.' },
  { name: 'DataTable', purpose: 'High-volume list surface', status: 'Implemented', forbiddenUse: 'Do not hide status meaning in color only.' },
  { name: 'QuickDrawer', purpose: 'Detail preview and traceability panel', status: 'Implemented', forbiddenUse: 'Do not replace required review record.' },
  { name: 'ReviewDrawer', purpose: 'Authority-aware review panel', status: 'Implemented partial', forbiddenUse: 'Do not imply final approval authority.' },
  { name: 'Status/Risk/Evidence/DataQuality badges', purpose: 'Consistent state semantics', status: 'Implemented', forbiddenUse: 'Do not present preliminary risk as final.' },
  { name: 'Empty/Loading/Error/AccessDenied states', purpose: 'Required UI state handling', status: 'Implemented', forbiddenUse: 'Do not leak restricted data.' },
  { name: 'ExportWarningPanel', purpose: 'Evidence/export boundary warning', status: 'Implemented', forbiddenUse: 'Do not imply legal/certification acceptance.' }
];

export const acceptanceItems: AcceptanceItem[] = [
  { label: 'App shell consistency', status: 'Implemented' },
  { label: 'Navigation and breadcrumb consistency', status: 'Implemented' },
  { label: 'Role-aware menu labels and review notes', status: 'Covered' },
  { label: 'Table density and readability', status: 'Implemented' },
  { label: 'Status/risk/evidence/data-quality badges', status: 'Implemented' },
  { label: 'Draft/preliminary labels on technical outputs', status: 'Implemented' },
  { label: 'Empty/loading/error/access denied states', status: 'Implemented' },
  { label: 'Drawer/detail behavior', status: 'Implemented' },
  { label: 'Dashboard-to-action behavior', status: 'Implemented' },
  { label: 'Mock data consistency', status: 'Covered' },
  { label: 'No misleading final decision language', status: 'Covered' },
  { label: 'Manual Project Owner/UBT/IT/Legal/Q&C/SME review', status: 'Needs review' }
];
