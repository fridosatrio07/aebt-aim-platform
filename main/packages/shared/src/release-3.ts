import { ok, pagination, type ApiSuccess, type PaginationInput } from './api.js';
import { buildAuditEvent, InMemoryAuditSink } from './audit.js';
import { decisionBoundaryNotice } from './domain-guardrails.js';
import { assertNotFinalDecision, hasPermission, type Permission } from './rbac.js';
import { defaultTenantScope } from './tenant-context.js';
import type { ActorContext, AuditEvent, TenantScope } from './types.js';

export type InspectionDueStatus = 'overdue' | 'due_soon' | 'scheduled' | 'completed' | 'not_due';
export type InspectionTrackingStatus = 'planned' | 'scheduled' | 'in_progress' | 'pending_review' | 'completed_preliminary' | 'deferred_needs_review';
export type WorkpackStatus = 'draft' | 'scheduled' | 'field_execution' | 'pending_review' | 'closed_preliminary';
export type WorkpackStepStatus = 'not_started' | 'ready' | 'in_progress' | 'pending_review' | 'complete_preliminary';
export type CertificationRegisterStatus = 'active' | 'due_soon' | 'expired' | 'pending_submission' | 'submitted' | 'evidence_gap' | 'under_review';
export type CertificationReadinessStatus = 'not_ready' | 'data_gap' | 'evidence_pending' | 'ready_for_review' | 'submitted' | 'reviewed_preliminary';
export type EvidenceContextType = 'asset' | 'inspection' | 'certification' | 'workpack' | 'risk' | 'anomaly' | 'recommendation' | 'compliance_export';
export type EvidenceChecklistItemStatus = 'available' | 'missing' | 'needs_review';
export type EvidenceChecklistStatus = 'not_started' | 'in_progress' | 'complete_pending_review' | 'gap_found' | 'reviewed_preliminary';
export type EvidencePackStatus = 'draft' | 'completeness_check' | 'ready_for_review' | 'revision_requested' | 'export_logged_preliminary';
export type EvidenceExportReadyStatus = 'not_ready' | 'ready_for_review' | 'export_logged_preliminary';
export type BusinessKpiFilter = 'inspection_overdue' | 'inspection_due_soon' | 'certification_due' | 'certification_expired' | 'evidence_gaps' | 'workpack_pending_review';
export type BusinessKpiSeverity = 'info' | 'warning' | 'critical';

type DataQuality = 'draft' | 'pending_validation' | 'validated' | 'data_gap';
type ReviewState = 'draft' | 'pending_review' | 'reviewed_preliminary';
interface ScopedBusinessRecord { tenantId: string; projectId: string; siteId: string; }

export interface InspectionDueRecord extends ScopedBusinessRecord { id: string; assetId: string; equipmentTag: string; equipmentName: string; equipmentType: string; statutoryBasis: string; dueDate: string; dueStatus: InspectionDueStatus; inspectionStatus: InspectionTrackingStatus; assignedInspectorRole: 'inspector'; workpackId?: string; evidencePackId?: string; linkedActionId?: string; priority: 'critical' | 'high' | 'medium' | 'low'; dataQualityStatus: DataQuality; reviewStatus: ReviewState; nextAction: string; sourceBasis: string; decisionBoundary: 'draft_preliminary_only'; }
export interface WorkpackStepRecord { id: string; label: string; ownerRole: string; status: WorkpackStepStatus; evidenceRequired: boolean; }
export interface WorkpackRecord extends ScopedBusinessRecord { id: string; workpackCode: string; title: string; inspectionDueId: string; assetId: string; equipmentTag: string; scopeSummary: string; scheduledStart: string; scheduledEnd: string; status: WorkpackStatus; steps: WorkpackStepRecord[]; evidenceDocumentCodes: string[]; draftFindings: string[]; reviewerRole: 'qc_reviewer'; sourceBasis: string; updatedAt: string; decisionBoundary: 'draft_preliminary_only'; }
export interface CertificationRecord extends ScopedBusinessRecord { id: string; certificateCode: string; certificateType: string; assetId: string; equipmentTag: string; equipmentName: string; expiryDate: string; renewalDueDate: string; certificationStatus: CertificationRegisterStatus; readinessStatus: CertificationReadinessStatus; checklistId: string; requiredEvidenceCount: number; availableEvidenceCount: number; gapCount: number; submissionLogStatus: 'not_started' | 'draft' | 'submitted_preliminary' | 'revision_requested'; evidencePackId?: string; linkedActionId?: string; nextAction: string; sourceBasis: string; decisionBoundary: 'draft_preliminary_only'; }
export interface EvidenceChecklistItemRecord { id: string; label: string; required: boolean; status: EvidenceChecklistItemStatus; documentId?: string; documentCode?: string; reuseAllowed: boolean; notes: string; }
export interface EvidenceChecklistRecord extends ScopedBusinessRecord { id: string; contextType: EvidenceContextType; contextId: string; title: string; status: EvidenceChecklistStatus; requiredCount: number; availableCount: number; gapCount: number; reviewerRole: string; items: EvidenceChecklistItemRecord[]; sourceBasis: string; decisionBoundary: 'draft_preliminary_only'; }
export interface EvidencePackRecord extends ScopedBusinessRecord { id: string; packCode: string; contextType: EvidenceContextType; contextId: string; title: string; status: EvidencePackStatus; checklistId: string; completenessPercent: number; requiredItemCount: number; availableItemCount: number; missingItemCount: number; documentCodes: string[]; reviewStatus: 'draft' | 'pending_review' | 'revision_requested' | 'reviewed_preliminary'; exportReadyStatus: EvidenceExportReadyStatus; updatedAt: string; sourceBasis: string; decisionBoundary: 'draft_preliminary_only'; }
export interface BusinessKpiCard { id: BusinessKpiFilter; label: string; count: number; severity: BusinessKpiSeverity; routeHint: string; filter: Record<string, string>; decisionBoundary: 'draft_preliminary_only'; }
export interface Release3ListQuery extends PaginationInput { search?: string; dueStatus?: InspectionDueStatus; inspectionStatus?: InspectionTrackingStatus; workpackStatus?: WorkpackStatus; certificationStatus?: CertificationRegisterStatus; readinessStatus?: CertificationReadinessStatus; evidenceStatus?: EvidenceChecklistStatus | EvidencePackStatus; kpi?: BusinessKpiFilter; direction?: 'asc' | 'desc'; }
export interface EvidencePackBuildRequest extends TenantScope { contextType: EvidenceContextType; contextId: string; checklistId: string; title?: string; sourceBasis: string; }
export interface EvidencePackBuildResult { evidencePack: EvidencePackRecord; auditEvent: AuditEvent; warning: string; }
interface Release3Dataset { inspectionDue: InspectionDueRecord[]; workpacks: WorkpackRecord[]; certifications: CertificationRecord[]; evidenceChecklists: EvidenceChecklistRecord[]; evidencePacks: EvidencePackRecord[]; }
const sourceBasis = 'Master FRD SRS/Master BPMN Workflow Pack/UI UX Design Pack/Data Model Pack/Addendum MVP+ Rev. 1';
const now = '2026-06-26T00:00:00.000Z';
const boundary: 'draft_preliminary_only' = 'draft_preliminary_only';
const scope = defaultTenantScope;

export const release3Dataset: Release3Dataset = {
  inspectionDue: [
    { id: 'inspection-due-v-001-statutory-2026', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, assetId: 'asset-eq-spm-01-v-001', equipmentTag: 'V-001', equipmentName: 'Demo Pressure Vessel V-001', equipmentType: 'Pressure Vessel', statutoryBasis: 'Statutory inspection tracking basis from AIM source documents; clause-level validation remains TBD Legal/Q&C/SME review.', dueDate: '2026-06-20T17:00:00.000Z', dueStatus: 'overdue', inspectionStatus: 'pending_review', assignedInspectorRole: 'inspector', workpackId: 'workpack-spm-01-v-001-2026', evidencePackId: 'epack-spm-01-v-001-statutory', linkedActionId: 'action-r3-v001-inspection-review', priority: 'critical', dataQualityStatus: 'pending_validation', reviewStatus: 'pending_review', nextAction: 'Route completed field evidence to reviewer queue for preliminary review.', sourceBasis, decisionBoundary: boundary },
    { id: 'inspection-due-p-101-routine-2026', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, assetId: 'asset-eq-spm-01-p-101', equipmentTag: 'P-101', equipmentName: 'Demo Transfer Pump P-101', equipmentType: 'Pump', statutoryBasis: 'Inspection tracking requirement from AIM source documents; method and interval rules remain TBD SME review.', dueDate: '2026-07-05T17:00:00.000Z', dueStatus: 'due_soon', inspectionStatus: 'scheduled', assignedInspectorRole: 'inspector', workpackId: 'workpack-spm-01-p-101-2026', linkedActionId: 'action-r3-p101-inspection-schedule', priority: 'medium', dataQualityStatus: 'validated', reviewStatus: 'draft', nextAction: 'Confirm schedule and attach reusable reference documents before field execution.', sourceBasis, decisionBoundary: boundary }
  ],
  workpacks: [
    { id: 'workpack-spm-01-v-001-2026', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, workpackCode: 'WP-SPM-001-V001', title: 'V-001 statutory inspection workpack skeleton', inspectionDueId: 'inspection-due-v-001-statutory-2026', assetId: 'asset-eq-spm-01-v-001', equipmentTag: 'V-001', scopeSummary: 'Scope, schedule, field execution, finding capture, evidence attachment, review, and close-out placeholders only.', scheduledStart: '2026-06-19T08:00:00.000Z', scheduledEnd: '2026-06-20T17:00:00.000Z', status: 'pending_review', steps: [
      { id: 'wp-v001-scope', label: 'Scope confirmation', ownerRole: 'inspector', status: 'complete_preliminary', evidenceRequired: false },
      { id: 'wp-v001-schedule', label: 'Schedule confirmation', ownerRole: 'inspector', status: 'complete_preliminary', evidenceRequired: false },
      { id: 'wp-v001-field', label: 'Field execution record', ownerRole: 'inspector', status: 'complete_preliminary', evidenceRequired: true },
      { id: 'wp-v001-findings', label: 'Draft finding capture', ownerRole: 'inspector', status: 'pending_review', evidenceRequired: true },
      { id: 'wp-v001-evidence', label: 'Evidence attachment', ownerRole: 'document_controller', status: 'pending_review', evidenceRequired: true },
      { id: 'wp-v001-review', label: 'Reviewer check', ownerRole: 'qc_reviewer', status: 'pending_review', evidenceRequired: false }
    ], evidenceDocumentCodes: ['DOC-ASSET-REG-001', 'DOC-DWG-001'], draftFindings: ['Draft evidence gap: inspection report attachment is still missing reviewer confirmation.'], reviewerRole: 'qc_reviewer', sourceBasis, updatedAt: now, decisionBoundary: boundary },
    { id: 'workpack-spm-01-p-101-2026', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, workpackCode: 'WP-SPM-001-P101', title: 'P-101 scheduled inspection workpack skeleton', inspectionDueId: 'inspection-due-p-101-routine-2026', assetId: 'asset-eq-spm-01-p-101', equipmentTag: 'P-101', scopeSummary: 'Schedule and reusable document collection for upcoming inspection campaign.', scheduledStart: '2026-07-03T08:00:00.000Z', scheduledEnd: '2026-07-05T17:00:00.000Z', status: 'scheduled', steps: [
      { id: 'wp-p101-scope', label: 'Scope confirmation', ownerRole: 'inspector', status: 'ready', evidenceRequired: false },
      { id: 'wp-p101-schedule', label: 'Schedule confirmation', ownerRole: 'inspector', status: 'ready', evidenceRequired: false },
      { id: 'wp-p101-field', label: 'Field execution record', ownerRole: 'inspector', status: 'not_started', evidenceRequired: true },
      { id: 'wp-p101-evidence', label: 'Evidence attachment', ownerRole: 'document_controller', status: 'not_started', evidenceRequired: true }
    ], evidenceDocumentCodes: ['DOC-ASSET-REG-001'], draftFindings: [], reviewerRole: 'qc_reviewer', sourceBasis, updatedAt: now, decisionBoundary: boundary }
  ],
  certifications: [
    { id: 'cert-reg-spm-01-v-001', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, certificateCode: 'CERT-SPM-V001-DEMO', certificateType: 'Statutory certificate tracker', assetId: 'asset-eq-spm-01-v-001', equipmentTag: 'V-001', equipmentName: 'Demo Pressure Vessel V-001', expiryDate: '2026-07-15T17:00:00.000Z', renewalDueDate: '2026-06-30T17:00:00.000Z', certificationStatus: 'due_soon', readinessStatus: 'evidence_pending', checklistId: 'checklist-cert-v-001', requiredEvidenceCount: 4, availableEvidenceCount: 3, gapCount: 1, submissionLogStatus: 'draft', evidencePackId: 'epack-spm-01-v-001-cert', linkedActionId: 'action-r3-v001-cert-evidence', nextAction: 'Complete missing evidence and route package for certification support review.', sourceBasis, decisionBoundary: boundary },
    { id: 'cert-reg-spm-01-p-101', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, certificateCode: 'CERT-SPM-P101-DEMO', certificateType: 'Certification support tracker', assetId: 'asset-eq-spm-01-p-101', equipmentTag: 'P-101', equipmentName: 'Demo Transfer Pump P-101', expiryDate: '2026-06-10T17:00:00.000Z', renewalDueDate: '2026-06-01T17:00:00.000Z', certificationStatus: 'evidence_gap', readinessStatus: 'data_gap', checklistId: 'checklist-cert-p-101', requiredEvidenceCount: 3, availableEvidenceCount: 1, gapCount: 2, submissionLogStatus: 'not_started', linkedActionId: 'action-r3-p101-cert-data-gap', nextAction: 'Resolve data gap before any submission package can be prepared.', sourceBasis, decisionBoundary: boundary }
  ],
  evidenceChecklists: [
    { id: 'checklist-inspection-v-001', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, contextType: 'inspection', contextId: 'inspection-due-v-001-statutory-2026', title: 'V-001 inspection evidence checklist', status: 'gap_found', requiredCount: 4, availableCount: 3, gapCount: 1, reviewerRole: 'qc_reviewer', items: [
      { id: 'chk-v001-asset-register', label: 'Asset registry extract', required: true, status: 'available', documentId: 'doc-spm-01-asset-register', documentCode: 'DOC-ASSET-REG-001', reuseAllowed: true, notes: 'Reusable controlled metadata from Release 1.' },
      { id: 'chk-v001-drawing', label: 'Reference drawing', required: true, status: 'needs_review', documentId: 'doc-spm-01-drawing', documentCode: 'DOC-DWG-001', reuseAllowed: true, notes: 'Draft drawing requires document controller confirmation before reuse.' },
      { id: 'chk-v001-field-report', label: 'Field inspection report', required: true, status: 'missing', reuseAllowed: false, notes: 'Missing attachment; package remains not ready.' },
      { id: 'chk-v001-photo-log', label: 'Photo or evidence log', required: true, status: 'available', documentId: 'doc-spm-01-photo-log-demo', documentCode: 'DOC-PHOTO-DEMO-001', reuseAllowed: false, notes: 'Demo metadata only; object storage key is TBD.' }
    ], sourceBasis, decisionBoundary: boundary },
    { id: 'checklist-cert-v-001', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, contextType: 'certification', contextId: 'cert-reg-spm-01-v-001', title: 'V-001 certification support checklist', status: 'gap_found', requiredCount: 4, availableCount: 3, gapCount: 1, reviewerRole: 'certification_team', items: [
      { id: 'cert-v001-register', label: 'Asset registry reference', required: true, status: 'available', documentId: 'doc-spm-01-asset-register', documentCode: 'DOC-ASSET-REG-001', reuseAllowed: true, notes: 'Reuse from Release 1 document repository.' },
      { id: 'cert-v001-drawing', label: 'Reference drawing', required: true, status: 'needs_review', documentId: 'doc-spm-01-drawing', documentCode: 'DOC-DWG-001', reuseAllowed: true, notes: 'Requires document controller confirmation.' },
      { id: 'cert-v001-inspection', label: 'Latest inspection record', required: true, status: 'missing', reuseAllowed: false, notes: 'Pending reviewer work queue item.' },
      { id: 'cert-v001-cover', label: 'Draft submission cover sheet', required: true, status: 'available', documentId: 'doc-spm-01-cert-cover-demo', documentCode: 'DOC-CERT-COVER-DEMO', reuseAllowed: false, notes: 'Support document only; no certificate issuance.' }
    ], sourceBasis, decisionBoundary: boundary },
    { id: 'checklist-cert-p-101', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, contextType: 'certification', contextId: 'cert-reg-spm-01-p-101', title: 'P-101 certification support checklist', status: 'gap_found', requiredCount: 3, availableCount: 1, gapCount: 2, reviewerRole: 'certification_team', items: [
      { id: 'cert-p101-register', label: 'Asset registry reference', required: true, status: 'available', documentId: 'doc-spm-01-asset-register', documentCode: 'DOC-ASSET-REG-001', reuseAllowed: true, notes: 'Reusable controlled metadata from Release 1.' },
      { id: 'cert-p101-inspection', label: 'Inspection evidence', required: true, status: 'missing', reuseAllowed: false, notes: 'Inspection evidence not attached.' },
      { id: 'cert-p101-submission', label: 'Draft submission metadata', required: true, status: 'missing', reuseAllowed: false, notes: 'Submission log not started.' }
    ], sourceBasis, decisionBoundary: boundary }
  ],
  evidencePacks: [
    { id: 'epack-spm-01-v-001-statutory', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, packCode: 'EP-SPM-V001-INSPECTION', contextType: 'inspection', contextId: 'inspection-due-v-001-statutory-2026', title: 'V-001 inspection evidence pack preview', status: 'completeness_check', checklistId: 'checklist-inspection-v-001', completenessPercent: 75, requiredItemCount: 4, availableItemCount: 3, missingItemCount: 1, documentCodes: ['DOC-ASSET-REG-001', 'DOC-DWG-001', 'DOC-PHOTO-DEMO-001'], reviewStatus: 'pending_review', exportReadyStatus: 'not_ready', updatedAt: now, sourceBasis, decisionBoundary: boundary },
    { id: 'epack-spm-01-v-001-cert', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId, packCode: 'EP-SPM-V001-CERT', contextType: 'certification', contextId: 'cert-reg-spm-01-v-001', title: 'V-001 certification support evidence pack preview', status: 'completeness_check', checklistId: 'checklist-cert-v-001', completenessPercent: 75, requiredItemCount: 4, availableItemCount: 3, missingItemCount: 1, documentCodes: ['DOC-ASSET-REG-001', 'DOC-DWG-001', 'DOC-CERT-COVER-DEMO'], reviewStatus: 'draft', exportReadyStatus: 'not_ready', updatedAt: now, sourceBasis, decisionBoundary: boundary }
  ]
};

export class Release3BusinessFoundation {
  private readonly auditSink = new InMemoryAuditSink();
  private readonly dataset: Release3Dataset;

  constructor(dataset: Release3Dataset = release3Dataset) { this.dataset = cloneDataset(dataset); }

  listInspectionDue(actor: ActorContext, requestScope: TenantScope, query: Release3ListQuery = {}): ApiSuccess<InspectionDueRecord[]> {
    this.requirePermission(actor, requestScope, 'inspection.read');
    const filtered = this.scoped(this.dataset.inspectionDue, requestScope).filter((item) => this.matchesSearch(query.search, [item.equipmentTag, item.equipmentName, item.equipmentType, item.nextAction]) && (!query.dueStatus || item.dueStatus === query.dueStatus) && (!query.inspectionStatus || item.inspectionStatus === query.inspectionStatus));
    const sorted = this.sortByDate(filtered, 'dueDate', query.direction);
    const page = pagination(query, sorted.length);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'inspection_due', objectId: 'list', sourceBasis: 'R3-02' }));
    return ok(this.pageItems(sorted, page.page, page.pageSize), { requestId: 'r3-inspection-due', tenant: requestScope, pagination: page, warnings: [decisionBoundaryNotice] });
  }

  listWorkpacks(actor: ActorContext, requestScope: TenantScope, query: Release3ListQuery = {}): ApiSuccess<WorkpackRecord[]> {
    this.requirePermission(actor, requestScope, 'workpack.read');
    const filtered = this.scoped(this.dataset.workpacks, requestScope).filter((item) => this.matchesSearch(query.search, [item.workpackCode, item.title, item.equipmentTag, item.scopeSummary]) && (!query.workpackStatus || item.status === query.workpackStatus));
    const sorted = this.sortByDate(filtered, 'scheduledStart', query.direction);
    const page = pagination(query, sorted.length);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'workpack', objectId: 'list', sourceBasis: 'R3-04' }));
    return ok(this.pageItems(sorted, page.page, page.pageSize), { requestId: 'r3-workpacks', tenant: requestScope, pagination: page, warnings: [decisionBoundaryNotice] });
  }

  listCertificationRegister(actor: ActorContext, requestScope: TenantScope, query: Release3ListQuery = {}): ApiSuccess<CertificationRecord[]> {
    this.requirePermission(actor, requestScope, 'certification.read');
    const filtered = this.scoped(this.dataset.certifications, requestScope).filter((item) => this.matchesSearch(query.search, [item.certificateCode, item.certificateType, item.equipmentTag, item.nextAction]) && (!query.certificationStatus || item.certificationStatus === query.certificationStatus) && (!query.readinessStatus || item.readinessStatus === query.readinessStatus));
    const sorted = this.sortByDate(filtered, 'renewalDueDate', query.direction);
    const page = pagination(query, sorted.length);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'certification_register', objectId: 'list', sourceBasis: 'R3-06' }));
    return ok(this.pageItems(sorted, page.page, page.pageSize), { requestId: 'r3-certification-register', tenant: requestScope, pagination: page, warnings: [decisionBoundaryNotice] });
  }

  listEvidenceChecklists(actor: ActorContext, requestScope: TenantScope, query: Release3ListQuery = {}): ApiSuccess<EvidenceChecklistRecord[]> {
    this.requirePermission(actor, requestScope, 'evidence.read');
    const filtered = this.scoped(this.dataset.evidenceChecklists, requestScope).filter((item) => this.matchesSearch(query.search, [item.title, item.contextType, item.contextId]) && (!query.evidenceStatus || item.status === query.evidenceStatus));
    const page = pagination(query, filtered.length);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'evidence_checklist', objectId: 'list', sourceBasis: 'R3-08' }));
    return ok(this.pageItems(filtered, page.page, page.pageSize), { requestId: 'r3-evidence-checklists', tenant: requestScope, pagination: page, warnings: [decisionBoundaryNotice] });
  }

  listEvidencePacks(actor: ActorContext, requestScope: TenantScope, query: Release3ListQuery = {}): ApiSuccess<EvidencePackRecord[]> {
    this.requirePermission(actor, requestScope, 'evidence.read');
    const filtered = this.scoped(this.dataset.evidencePacks, requestScope).filter((item) => this.matchesSearch(query.search, [item.packCode, item.title, item.contextType, item.contextId]) && (!query.evidenceStatus || item.status === query.evidenceStatus));
    const sorted = this.sortByDate(filtered, 'updatedAt', query.direction);
    const page = pagination(query, sorted.length);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'evidence_pack', objectId: 'list', sourceBasis: 'R3-09' }));
    return ok(this.pageItems(sorted, page.page, page.pageSize), { requestId: 'r3-evidence-packs', tenant: requestScope, pagination: page, warnings: [decisionBoundaryNotice] });
  }

  buildEvidencePack(actor: ActorContext, requestScope: TenantScope, request: EvidencePackBuildRequest): ApiSuccess<EvidencePackBuildResult> {
    this.requirePermission(actor, requestScope, 'evidence.build');
    this.assertRequestScope(request, requestScope);
    assertNotFinalDecision('build_evidence_pack');
    const checklist = this.dataset.evidenceChecklists.find((item) => item.id === request.checklistId && this.inScope(item, requestScope));
    if (!checklist) throw new Error('Evidence checklist not found inside requested tenant scope');
    if (checklist.contextType !== request.contextType || checklist.contextId !== request.contextId) throw new Error('Evidence checklist context does not match requested package context');
    const requiredItems = checklist.items.filter((item) => item.required);
    const availableItems = requiredItems.filter((item) => item.status === 'available' || item.status === 'needs_review');
    const missingItems = requiredItems.filter((item) => item.status === 'missing');
    const completenessPercent = requiredItems.length === 0 ? 100 : Math.round((availableItems.length / requiredItems.length) * 100);
    const documentCodes = checklist.items.map((item) => item.documentCode).filter((value): value is string => typeof value === 'string' && value.length > 0);
    const evidencePack: EvidencePackRecord = {
      id: `epack-${request.contextType}-${request.contextId}`,
      tenantId: requestScope.tenantId,
      projectId: requestScope.projectId ?? defaultTenantScope.projectId,
      siteId: requestScope.siteId ?? defaultTenantScope.siteId,
      packCode: `EP-${request.contextType.toUpperCase()}-${request.contextId.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}`.slice(0, 80),
      contextType: request.contextType,
      contextId: request.contextId,
      title: request.title ?? `${checklist.title} package preview`,
      status: missingItems.length > 0 ? 'completeness_check' : 'ready_for_review',
      checklistId: checklist.id,
      completenessPercent,
      requiredItemCount: requiredItems.length,
      availableItemCount: availableItems.length,
      missingItemCount: missingItems.length,
      documentCodes,
      reviewStatus: missingItems.length > 0 ? 'draft' : 'pending_review',
      exportReadyStatus: missingItems.length > 0 ? 'not_ready' : 'ready_for_review',
      updatedAt: new Date().toISOString(),
      sourceBasis: request.sourceBasis,
      decisionBoundary: boundary
    };
    this.dataset.evidencePacks = [...this.dataset.evidencePacks.filter((item) => item.id !== evidencePack.id), evidencePack];
    const auditEvent = this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'create', objectType: 'evidence_pack', objectId: evidencePack.id, sourceBasis: 'R3-09', newValue: { status: evidencePack.status, completenessPercent, exportReadyStatus: evidencePack.exportReadyStatus } }));
    return ok({ evidencePack, auditEvent, warning: decisionBoundaryNotice }, { requestId: 'r3-evidence-pack-build', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  listBusinessKpis(actor: ActorContext, requestScope: TenantScope): ApiSuccess<BusinessKpiCard[]> {
    this.requirePermission(actor, requestScope, 'business.kpi.read');
    const inspections = this.scoped(this.dataset.inspectionDue, requestScope);
    const certifications = this.scoped(this.dataset.certifications, requestScope);
    const workpacks = this.scoped(this.dataset.workpacks, requestScope);
    const checklists = this.scoped(this.dataset.evidenceChecklists, requestScope);
    const cards: BusinessKpiCard[] = [
      this.kpi('inspection_overdue', 'Inspection Overdue', inspections.filter((item) => item.dueStatus === 'overdue').length, 'critical', '/business/inspection-due?dueStatus=overdue', { dueStatus: 'overdue' }),
      this.kpi('inspection_due_soon', 'Inspection Due Soon', inspections.filter((item) => item.dueStatus === 'due_soon').length, 'warning', '/business/inspection-due?dueStatus=due_soon', { dueStatus: 'due_soon' }),
      this.kpi('certification_due', 'Certification Due', certifications.filter((item) => item.certificationStatus === 'due_soon').length, 'warning', '/business/certifications?certificationStatus=due_soon', { certificationStatus: 'due_soon' }),
      this.kpi('certification_expired', 'Certification Evidence Gap', certifications.filter((item) => item.certificationStatus === 'evidence_gap' || item.certificationStatus === 'expired').length, 'critical', '/business/certifications?readinessStatus=data_gap', { readinessStatus: 'data_gap' }),
      this.kpi('evidence_gaps', 'Evidence Gaps', checklists.filter((item) => item.gapCount > 0).length, 'warning', '/business/evidence-checklists?evidenceStatus=gap_found', { evidenceStatus: 'gap_found' }),
      this.kpi('workpack_pending_review', 'Workpacks Pending Review', workpacks.filter((item) => item.status === 'pending_review').length, 'info', '/business/workpacks?workpackStatus=pending_review', { workpackStatus: 'pending_review' })
    ];
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'business_kpi', objectId: 'cards', sourceBasis: 'R3-10' }));
    return ok(cards, { requestId: 'r3-business-kpis', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  auditEvents(requestScope: TenantScope): AuditEvent[] { return this.auditSink.list(requestScope); }
  private kpi(id: BusinessKpiFilter, label: string, count: number, severity: BusinessKpiSeverity, routeHint: string, filter: Record<string, string>): BusinessKpiCard { return { id, label, count, severity, routeHint, filter, decisionBoundary: boundary }; }
  private scoped<T extends ScopedBusinessRecord>(records: T[], requestScope: TenantScope): T[] { return records.filter((item) => this.inScope(item, requestScope)); }
  private inScope(record: ScopedBusinessRecord, requestScope: TenantScope): boolean { return record.tenantId === requestScope.tenantId && (!requestScope.projectId || record.projectId === requestScope.projectId) && (!requestScope.siteId || record.siteId === requestScope.siteId); }
  private matchesSearch(search: string | undefined, values: string[]): boolean { const needle = search?.trim().toLowerCase(); return !needle || values.some((value) => value.toLowerCase().includes(needle)); }
  private sortByDate<T>(records: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] { const multiplier = direction === 'desc' ? -1 : 1; return [...records].sort((a, b) => String(a[key]).localeCompare(String(b[key])) * multiplier); }
  private pageItems<T>(items: T[], page: number, pageSize: number): T[] { return items.slice((page - 1) * pageSize, page * pageSize); }
  private requirePermission(actor: ActorContext, requestScope: TenantScope, permission: Permission): void { const result = hasPermission(actor, permission, requestScope); if (!result.allowed) throw new Error(result.reason); }
  private assertRequestScope(request: TenantScope, requestScope: TenantScope): void { if (request.tenantId !== requestScope.tenantId) throw new Error('Tenant isolation violation: requested tenant is outside request scope'); if (request.projectId && requestScope.projectId && request.projectId !== requestScope.projectId) throw new Error('Project isolation violation: requested project is outside request scope'); if (request.siteId && requestScope.siteId && request.siteId !== requestScope.siteId) throw new Error('Site isolation violation: requested site is outside request scope'); }
}

function cloneDataset(dataset: Release3Dataset): Release3Dataset { return JSON.parse(JSON.stringify(dataset)) as Release3Dataset; }
