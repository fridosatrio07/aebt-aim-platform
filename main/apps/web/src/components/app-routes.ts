export type RouteFunctionalStatus = 'Mock' | 'API-ready' | 'Pending Backend' | 'Disabled' | 'Needs Review' | 'Planned' | 'Partial';

export type WorkbenchTabId = 'dashboard' | 'my-work' | 'asset-data' | 'business' | 'integrity' | 'state-lab' | 'admin-support';

export type AppRouteId =
  | 'dashboard'
  | 'my-work'
  | 'projects'
  | 'assets'
  | 'asset-detail'
  | 'documents'
  | 'document-detail'
  | 'validation'
  | 'inspections'
  | 'inspection-workpacks'
  | 'certification'
  | 'evidence-packs'
  | 'evidence-pack-detail'
  | 'integrity'
  | 'integrity-rbi'
  | 'integrity-rbi-detail'
  | 'risk-register'
  | 'reviewer-queue'
  | 'administration'
  | 'helpdesk'
  | 'state-matrix';

export interface AppRouteDefinition {
  id: AppRouteId;
  path: string;
  label: string;
  pageTitle: string;
  module: string;
  status: RouteFunctionalStatus;
  dataStatus: RouteFunctionalStatus;
  permissionNote: string;
  guardrail: string;
  breadcrumb: string[];
  workbenchTab?: WorkbenchTabId;
  parentId?: AppRouteId;
}

export const appRoutes: AppRouteDefinition[] = [
  { id: 'dashboard', path: '/dashboard', label: 'Dashboard', pageTitle: 'Dashboard', module: 'Command Center', status: 'Mock', dataStatus: 'Mock', permissionNote: 'Role visibility planning only; final access requires RBAC review.', guardrail: 'Dashboard cards open action context only; not final compliance results.', breadcrumb: ['Dashboard'], workbenchTab: 'dashboard' },
  { id: 'my-work', path: '/my-work', label: 'My Work', pageTitle: 'My Work / Action Inbox', module: 'Operational Flow', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'User and role queue visibility remains Needs RBAC Review.', guardrail: 'Task states are workflow support only until reviewed by authorized personnel.', breadcrumb: ['My Work'], workbenchTab: 'my-work' },
  { id: 'projects', path: '/projects', label: 'Projects', pageTitle: 'Project & Data Intake', module: 'Data Intake', status: 'Planned', dataStatus: 'Pending Backend', permissionNote: 'Project creation/edit authority remains Needs Project Owner and UBT/IT Review.', guardrail: 'Scope selector is a placeholder and does not persist context.', breadcrumb: ['Projects'] },
  { id: 'assets', path: '/assets', label: 'Assets', pageTitle: 'Asset Registry', module: 'Asset Registry', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'Asset visibility remains tenant/project/site scoped and Needs RBAC Review.', guardrail: 'Asset status is registry support only; no fit-for-operation decision.', breadcrumb: ['Assets'], workbenchTab: 'asset-data' },
  { id: 'asset-detail', path: '/assets/[assetId]', label: 'Asset Detail', pageTitle: 'Asset Detail', module: 'Asset Registry', status: 'Planned', dataStatus: 'Pending Backend', permissionNote: 'Detail route authority remains Needs RBAC Review.', guardrail: 'Detail facts require source evidence and authorized review.', breadcrumb: ['Assets', '[assetId]'], parentId: 'assets' },
  { id: 'documents', path: '/documents', label: 'Documents', pageTitle: 'Document Repository', module: 'Document & Evidence', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'Document access and export controls remain Needs RBAC Review.', guardrail: 'Repository metadata is support data; storage integration remains pending.', breadcrumb: ['Documents'], workbenchTab: 'asset-data' },
  { id: 'document-detail', path: '/documents/[documentId]', label: 'Document Detail', pageTitle: 'Document Detail', module: 'Document & Evidence', status: 'Planned', dataStatus: 'Pending Backend', permissionNote: 'Object storage and access rules remain pending.', guardrail: 'Document evidence is not final legal or certification interpretation.', breadcrumb: ['Documents', '[documentId]'], parentId: 'documents' },
  { id: 'validation', path: '/validation', label: 'Validation', pageTitle: 'Validation Queue', module: 'Data Quality', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'Validation ownership and escalation remain Needs RBAC Review.', guardrail: 'Validation outcomes are data-quality workflow states only.', breadcrumb: ['Validation'], workbenchTab: 'asset-data' },
  { id: 'inspections', path: '/inspections', label: 'Inspections', pageTitle: 'Inspection Tracking', module: 'Inspection Management', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'Inspection authority remains Needs Engineer/Inspector/SME Review.', guardrail: 'Due states and readiness flags are preliminary support only.', breadcrumb: ['Inspections'], workbenchTab: 'business' },
  { id: 'inspection-workpacks', path: '/inspections/workpacks', label: 'Workpacks', pageTitle: 'Workpack Skeletons', module: 'Inspection Management', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'Workpack approval remains Needs RBAC and SME Review.', guardrail: 'Workpack content requires authorized review before field use.', breadcrumb: ['Inspections', 'Workpacks'], parentId: 'inspections' },
  { id: 'certification', path: '/certification', label: 'Certification', pageTitle: 'Certification Register', module: 'Certification Support', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'Certification authority remains Legal/Q&C and authorized-role controlled.', guardrail: 'No final certification readiness or PLO decision is produced by the UI.', breadcrumb: ['Certification'], workbenchTab: 'business' },
  { id: 'evidence-packs', path: '/evidence-packs', label: 'Evidence Packs', pageTitle: 'Evidence Pack Builder', module: 'Evidence', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'Evidence pack export/review authority remains Needs RBAC Review.', guardrail: 'Evidence packs support review and are not final approvals.', breadcrumb: ['Evidence Packs'], workbenchTab: 'business' },
  { id: 'evidence-pack-detail', path: '/evidence-packs/[evidencePackId]', label: 'Evidence Pack Detail', pageTitle: 'Evidence Pack Detail', module: 'Evidence', status: 'Planned', dataStatus: 'Pending Backend', permissionNote: 'Export and object storage authority remains pending.', guardrail: 'Evidence review remains human-controlled.', breadcrumb: ['Evidence Packs', '[evidencePackId]'], parentId: 'evidence-packs' },
  { id: 'integrity', path: '/integrity', label: 'Integrity', pageTitle: 'Integrity Dashboard', module: 'Integrity/RBI', status: 'Needs Review', dataStatus: 'Mock', permissionNote: 'Integrity decisions remain Engineer/Inspector/SME controlled.', guardrail: 'Integrity outputs remain draft/preliminary until authorized approval.', breadcrumb: ['Integrity'], workbenchTab: 'integrity' },
  { id: 'integrity-rbi', path: '/integrity/rbi', label: 'RBI Assessments', pageTitle: 'RBI Assessment List', module: 'Integrity/RBI', status: 'Needs Review', dataStatus: 'Mock', permissionNote: 'RBI methodology and approval authority require SME review.', guardrail: 'RBI rankings are preliminary records, not final RBI decisions.', breadcrumb: ['Integrity', 'RBI'], parentId: 'integrity', workbenchTab: 'integrity' },
  { id: 'integrity-rbi-detail', path: '/integrity/rbi/[assessmentId]', label: 'RBI Assessment Detail', pageTitle: 'RBI Assessment Detail', module: 'Integrity/RBI', status: 'Planned', dataStatus: 'Pending Backend', permissionNote: 'Assessment edit/review authority requires SME and RBAC review.', guardrail: 'Assessment detail must stay draft/preliminary until authorized approval.', breadcrumb: ['Integrity', 'RBI', '[assessmentId]'], parentId: 'integrity-rbi' },
  { id: 'risk-register', path: '/risk-register', label: 'Risk Register', pageTitle: 'Risk Register', module: 'Integrity/Risk', status: 'Needs Review', dataStatus: 'Mock', permissionNote: 'Risk acceptance and criteria authority are not implemented.', guardrail: 'Risk records are linkage/support items, not final acceptance decisions.', breadcrumb: ['Risk Register'], workbenchTab: 'integrity' },
  { id: 'reviewer-queue', path: '/reviewer-queue', label: 'Reviewer Queue', pageTitle: 'Reviewer Work Queue', module: 'Operational Flow', status: 'API-ready', dataStatus: 'Mock', permissionNote: 'Reviewer authority remains Needs RBAC Review.', guardrail: 'Review actions remain workflow placeholders until final authority matrix is approved.', breadcrumb: ['Reviewer Queue'], workbenchTab: 'my-work' },
  { id: 'administration', path: '/administration', label: 'Administration', pageTitle: 'Administration', module: 'Governance', status: 'Pending Backend', dataStatus: 'Pending Backend', permissionNote: 'Administrative authority remains Needs UBT/IT Review.', guardrail: 'Administrative controls are placeholders only in Release 6.', breadcrumb: ['Administration'], workbenchTab: 'admin-support' },
  { id: 'helpdesk', path: '/helpdesk', label: 'Helpdesk', pageTitle: 'Helpdesk / Bug Log', module: 'Support', status: 'Pending Backend', dataStatus: 'Mock', permissionNote: 'Ticket ownership and SLAs remain TBD.', guardrail: 'Helpdesk entries are local/mock support records only.', breadcrumb: ['Helpdesk'], workbenchTab: 'admin-support' },
  { id: 'state-matrix', path: '/state-matrix', label: 'State Matrix', pageTitle: 'UI State Matrix', module: 'Front-End Control', status: 'Mock', dataStatus: 'Mock', permissionNote: 'Visible for implementation review; final exposure needs Product Owner review.', guardrail: 'State matrix documents UI boundaries, not operational authority.', breadcrumb: ['State Matrix'], workbenchTab: 'state-lab' }
];

export const workbenchRouteMap: Record<WorkbenchTabId, AppRouteId> = {
  dashboard: 'dashboard',
  'my-work': 'my-work',
  'asset-data': 'assets',
  business: 'inspections',
  integrity: 'integrity',
  'state-lab': 'state-matrix',
  'admin-support': 'administration'
};

export function routeById(routeId: AppRouteId): AppRouteDefinition {
  return appRoutes.find((route) => route.id === routeId) ?? appRoutes[0]!;
}

export function routeForWorkbenchTab(tab: WorkbenchTabId): AppRouteDefinition {
  return routeById(workbenchRouteMap[tab]);
}

export function breadcrumbForRoute(routeId: AppRouteId): string[] {
  return routeById(routeId).breadcrumb;
}
