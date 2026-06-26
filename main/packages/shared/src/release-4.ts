import { ok, pagination, type ApiSuccess, type PaginationInput } from './api.js';
import { buildAuditEvent, InMemoryAuditSink } from './audit.js';
import { decisionBoundaryNotice } from './domain-guardrails.js';
import { assertNotFinalDecision, hasPermission, type Permission } from './rbac.js';
import { defaultTenantScope } from './tenant-context.js';
import type { ActorContext, AuditEvent, TenantScope } from './types.js';

// ── RBI Candidate ──────────────────────────────────────────────────────────
export type RbiCandidateStatus = 'not_scoped' | 'scoped_for_rbi' | 'assessment_in_progress' | 'assessment_draft' | 'pending_review' | 'reviewed_preliminary';
export type RbiScopingBasis = 'statutory' | 'criticality' | 'client_request' | 'risk_indicator' | 'sme_recommendation';

export interface RbiCandidateRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  assetId: string;
  equipmentTag: string;
  equipmentName: string;
  equipmentType: string;
  scopingBasis: RbiScopingBasis;
  scopingNotes: string;
  status: RbiCandidateStatus;
  assignedRbiEngineerRole: 'rbi_engineer';
  assessmentId?: string;
  linkedActionId?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  dataQualityStatus: 'draft' | 'pending_validation' | 'validated' | 'data_gap';
  reviewStatus: 'draft' | 'pending_review' | 'reviewed_preliminary';
  nextAction: string;
  sourceBasis: string;
  decisionBoundary: 'draft_preliminary_only';
}

// ── RBI Assessment Shell ────────────────────────────────────────────────────
export type RbiAssessmentStatus = 'draft' | 'data_gathering' | 'operating_data_input' | 'damage_mechanism_review' | 'pof_cof_helper' | 'risk_ranking' | 'pending_review' | 'reviewed_preliminary' | 'approved_preliminary';
export type RbiMethodologyStatus = 'tbd_sme_approval' | 'draft_methodology' | 'under_review' | 'approved_baseline';

export interface RbiAssessmentRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  candidateId: string;
  assetId: string;
  equipmentTag: string;
  assessmentCode: string;
  title: string;
  status: RbiAssessmentStatus;
  methodologyStatus: RbiMethodologyStatus;
  methodologyNotes: string;
  operatingDataStatus: 'not_started' | 'in_progress' | 'complete_preliminary';
  damageMechanismStatus: 'not_started' | 'placeholder_sme_input' | 'reviewed_preliminary';
  pofCofStatus: 'not_started' | 'helper_input_draft' | 'reviewed_preliminary';
  riskRankingStatus: 'not_started' | 'draft_ranking' | 'reviewed_preliminary';
  evidencePackId?: string;
  linkedActionId?: string;
  reviewerRole: 'qc_reviewer' | 'rbi_engineer' | 'sme_reviewer';
  sourceBasis: string;
  updatedAt: string;
  decisionBoundary: 'draft_preliminary_only';
}

// ── Operating Data Input ────────────────────────────────────────────────────
export type OperatingDataStatus = 'draft' | 'pending_validation' | 'validated' | 'data_gap';
export type OperatingParameterUnit = 'barg' | 'degc' | 'mm' | 'kg_per_h' | 'm3_per_h' | 'percent' | 'ppm' | 'ph' | 'tbd';

export interface OperatingDataRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  assessmentId: string;
  assetId: string;
  parameterName: string;
  parameterValue: string;
  unit: OperatingParameterUnit;
  dataSource: string;
  dataQualityStatus: OperatingDataStatus;
  reviewStatus: 'draft' | 'pending_review' | 'reviewed_preliminary';
  sourceBasis: string;
  decisionBoundary: 'draft_preliminary_only';
}

// ── Damage Mechanism Review Placeholder ─────────────────────────────────────
export type DamageMechanismCategory = 'thinning' | 'cracking' | 'environmental' | 'mechanical' | 'other_tbd_sme';
export type DamageMechanismStatus = 'placeholder_sme_input' | 'sme_reviewed_preliminary';

export interface DamageMechanismRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  assessmentId: string;
  assetId: string;
  mechanismName: string;
  category: DamageMechanismCategory;
  susceptible: 'tbd_sme' | 'suspected' | 'not_suspected' | 'confirmed_sme';
  notes: string;
  status: DamageMechanismStatus;
  sourceBasis: string;
  decisionBoundary: 'draft_preliminary_only';
}

// ── PoF/CoF Helper Interface ────────────────────────────────────────────────
export type PofCofHelperStatus = 'draft_helper' | 'reviewed_preliminary';
export type PofLevel = 'low' | 'medium' | 'high' | 'tbd_sme';
export type CofLevel = 'low' | 'medium' | 'high' | 'tbd_sme';

export interface PofCofHelperRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  assessmentId: string;
  assetId: string;
  pofInputSummary: string;
  pofResult: PofLevel;
  pofMethodologyRef: string;
  cofInputSummary: string;
  cofResult: CofLevel;
  cofMethodologyRef: string;
  helperNotes: string;
  status: PofCofHelperStatus;
  sourceBasis: string;
  decisionBoundary: 'draft_preliminary_only';
}

// ── Preliminary Risk Ranking Record ─────────────────────────────────────────
export type RiskRankingStatus = 'draft_ranking' | 'pending_review' | 'reviewed_preliminary' | 'approved_preliminary';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical' | 'tbd_sme';

export interface RiskRankingRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  assessmentId: string;
  assetId: string;
  pofLevel: PofLevel;
  cofLevel: CofLevel;
  overallRiskLevel: RiskLevel;
  riskRankingNotes: string;
  status: RiskRankingStatus;
  reviewerRole: 'qc_reviewer' | 'sme_reviewer';
  reviewNotes: string;
  sourceBasis: string;
  decisionBoundary: 'draft_preliminary_only';
}

// ── Risk Register Linkage ───────────────────────────────────────────────────
export type RiskRegisterItemStatus = 'identified' | 'assessed_preliminary' | 'mitigation_planned' | 'mitigation_in_progress' | 'closed_preliminary';
export type RiskRegisterCategory = 'technical' | 'safety' | 'environmental' | 'compliance' | 'operational' | 'reputation';

export interface RiskRegisterItemRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  assessmentId: string;
  assetId: string;
  equipmentTag: string;
  riskTitle: string;
  riskDescription: string;
  category: RiskRegisterCategory;
  pofLevel: PofLevel;
  cofLevel: CofLevel;
  overallRiskLevel: RiskLevel;
  status: RiskRegisterItemStatus;
  linkedActionId?: string;
  evidencePackId?: string;
  mitigationSummary: string;
  actionOwnerRole: string;
  dueDate: string;
  sourceBasis: string;
  decisionBoundary: 'draft_preliminary_only';
}

// ── Query Types ─────────────────────────────────────────────────────────────
export interface Release4ListQuery extends PaginationInput {
  search?: string;
  rbiCandidateStatus?: RbiCandidateStatus;
  assessmentStatus?: RbiAssessmentStatus;
  riskLevel?: RiskLevel;
  direction?: 'asc' | 'desc';
}

// ── Dataset ─────────────────────────────────────────────────────────────────
interface Release4Dataset {
  rbiCandidates: RbiCandidateRecord[];
  assessments: RbiAssessmentRecord[];
  operatingData: OperatingDataRecord[];
  damageMechanisms: DamageMechanismRecord[];
  pofCofHelpers: PofCofHelperRecord[];
  riskRankings: RiskRankingRecord[];
  riskRegisterItems: RiskRegisterItemRecord[];
}

const sourceBasis = 'Master FRD SRS/Master BPMN Workflow Pack/Data Model Pack/Addendum MVP+ Rev. 1';
const now = '2026-06-26T00:00:00.000Z';
const boundary: 'draft_preliminary_only' = 'draft_preliminary_only';
const scope = defaultTenantScope;

export const release4Dataset: Release4Dataset = {
  rbiCandidates: [
    {
      id: 'rbi-cand-v-001', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assetId: 'asset-eq-spm-01-v-001', equipmentTag: 'V-001', equipmentName: 'Demo Pressure Vessel V-001', equipmentType: 'Pressure Vessel',
      scopingBasis: 'criticality', scopingNotes: 'Routed for RBI assessment based on criticality ranking and statutory obligation.',
      status: 'assessment_in_progress', assignedRbiEngineerRole: 'rbi_engineer',
      assessmentId: 'rbi-assess-v-001', linkedActionId: 'action-r4-v001-rbi-proceed',
      priority: 'critical', dataQualityStatus: 'pending_validation', reviewStatus: 'draft',
      nextAction: 'Proceed to RBI assessment shell for data gathering and operating data input.',
      sourceBasis, decisionBoundary: boundary
    },
    {
      id: 'rbi-cand-p-101', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assetId: 'asset-eq-spm-01-p-101', equipmentTag: 'P-101', equipmentName: 'Demo Transfer Pump P-101', equipmentType: 'Pump',
      scopingBasis: 'risk_indicator', scopingNotes: 'Candidate identified via risk indicator; scoping confirmation pending SME review.',
      status: 'scoped_for_rbi', assignedRbiEngineerRole: 'rbi_engineer',
      assessmentId: 'rbi-assess-p-101',
      priority: 'medium', dataQualityStatus: 'validated', reviewStatus: 'draft',
      nextAction: 'Confirm scoping basis and initiate assessment shell.',
      sourceBasis, decisionBoundary: boundary
    }
  ],
  assessments: [
    {
      id: 'rbi-assess-v-001', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      candidateId: 'rbi-cand-v-001', assetId: 'asset-eq-spm-01-v-001', equipmentTag: 'V-001',
      assessmentCode: 'RBI-SPM-V001-2026', title: 'V-001 RBI Assessment Skeleton',
      status: 'data_gathering', methodologyStatus: 'tbd_sme_approval',
      methodologyNotes: 'RBI methodology baseline is TBD until SME-approved. Current assessment uses placeholder structure only.',
      operatingDataStatus: 'not_started', damageMechanismStatus: 'not_started',
      pofCofStatus: 'not_started', riskRankingStatus: 'not_started',
      reviewerRole: 'qc_reviewer', sourceBasis, updatedAt: now, decisionBoundary: boundary
    },
    {
      id: 'rbi-assess-p-101', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      candidateId: 'rbi-cand-p-101', assetId: 'asset-eq-spm-01-p-101', equipmentTag: 'P-101',
      assessmentCode: 'RBI-SPM-P101-2026', title: 'P-101 RBI Assessment Skeleton',
      status: 'draft', methodologyStatus: 'tbd_sme_approval',
      methodologyNotes: 'RBI methodology baseline is TBD until SME-approved. Current assessment uses placeholder structure only.',
      operatingDataStatus: 'not_started', damageMechanismStatus: 'not_started',
      pofCofStatus: 'not_started', riskRankingStatus: 'not_started',
      reviewerRole: 'qc_reviewer', sourceBasis, updatedAt: now, decisionBoundary: boundary
    }
  ],
  operatingData: [
    {
      id: 'opdata-v-001-pressure', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assessmentId: 'rbi-assess-v-001', assetId: 'asset-eq-spm-01-v-001',
      parameterName: 'Operating Pressure', parameterValue: '12.5', unit: 'barg',
      dataSource: 'P&ID reference / field estimate', dataQualityStatus: 'pending_validation',
      reviewStatus: 'draft', sourceBasis, decisionBoundary: boundary
    },
    {
      id: 'opdata-v-001-temperature', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assessmentId: 'rbi-assess-v-001', assetId: 'asset-eq-spm-01-v-001',
      parameterName: 'Operating Temperature', parameterValue: '85', unit: 'degc',
      dataSource: 'P&ID reference / field estimate', dataQualityStatus: 'pending_validation',
      reviewStatus: 'draft', sourceBasis, decisionBoundary: boundary
    }
  ],
  damageMechanisms: [
    {
      id: 'dm-v-001-thinning', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assessmentId: 'rbi-assess-v-001', assetId: 'asset-eq-spm-01-v-001',
      mechanismName: 'General Thinning / Corrosion', category: 'thinning',
      susceptible: 'tbd_sme', notes: 'SME input required to confirm susceptibility and rate.',
      status: 'placeholder_sme_input', sourceBasis, decisionBoundary: boundary
    },
    {
      id: 'dm-v-001-cracking', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assessmentId: 'rbi-assess-v-001', assetId: 'asset-eq-spm-01-v-001',
      mechanismName: 'Stress Corrosion Cracking', category: 'cracking',
      susceptible: 'tbd_sme', notes: 'SME input required; material/environment data pending.',
      status: 'placeholder_sme_input', sourceBasis, decisionBoundary: boundary
    }
  ],
  pofCofHelpers: [
    {
      id: 'pofcof-v-001', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assessmentId: 'rbi-assess-v-001', assetId: 'asset-eq-spm-01-v-001',
      pofInputSummary: 'Operating pressure, temperature, wall thickness, corrosion rate placeholder data.',
      pofResult: 'tbd_sme', pofMethodologyRef: 'TBD - SME-approved RBI methodology baseline required.',
      cofInputSummary: 'Fluid type, inventory, detection/mitigation systems placeholder data.',
      cofResult: 'tbd_sme', cofMethodologyRef: 'TBD - SME-approved RBI methodology baseline required.',
      helperNotes: 'PoF/CoF helper interface records draft inputs only. No final calculation is performed.',
      status: 'draft_helper', sourceBasis, decisionBoundary: boundary
    }
  ],
  riskRankings: [
    {
      id: 'riskrank-v-001', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assessmentId: 'rbi-assess-v-001', assetId: 'asset-eq-spm-01-v-001',
      pofLevel: 'tbd_sme', cofLevel: 'tbd_sme', overallRiskLevel: 'tbd_sme',
      riskRankingNotes: 'Preliminary risk ranking is TBD until PoF/CoF helper inputs are reviewed and SME-approved methodology is applied.',
      status: 'draft_ranking', reviewerRole: 'sme_reviewer', reviewNotes: '',
      sourceBasis, decisionBoundary: boundary
    }
  ],
  riskRegisterItems: [
    {
      id: 'riskreg-v-001-pressure-vessel', tenantId: scope.tenantId, projectId: scope.projectId, siteId: scope.siteId,
      assessmentId: 'rbi-assess-v-001', assetId: 'asset-eq-spm-01-v-001', equipmentTag: 'V-001',
      riskTitle: 'Pressure Vessel V-001 Integrity Risk',
      riskDescription: 'Preliminary risk register item linked to RBI assessment for V-001. Risk level TBD until SME review.',
      category: 'safety', pofLevel: 'tbd_sme', cofLevel: 'tbd_sme', overallRiskLevel: 'tbd_sme',
      status: 'assessed_preliminary', mitigationSummary: 'Mitigation plan TBD pending risk ranking review.',
      actionOwnerRole: 'rbi_engineer', dueDate: '2026-08-30T17:00:00.000Z',
      sourceBasis, decisionBoundary: boundary
    }
  ]
};

// ── Integrity Foundation Class ──────────────────────────────────────────────
export class Release4IntegrityFoundation {
  private readonly auditSink = new InMemoryAuditSink();
  private readonly dataset: Release4Dataset;

  constructor(dataset: Release4Dataset = release4Dataset) { this.dataset = cloneDataset(dataset); }

  // R4-01: RBI Candidate Routing
  listRbiCandidates(actor: ActorContext, requestScope: TenantScope, query: Release4ListQuery = {}): ApiSuccess<RbiCandidateRecord[]> {
    this.requirePermission(actor, requestScope, 'rbi.candidate.read');
    const filtered = this.scoped(this.dataset.rbiCandidates, requestScope).filter((item) =>
      this.matchesSearch(query.search, [item.equipmentTag, item.equipmentName, item.equipmentType, item.scopingNotes, item.nextAction]) &&
      (!query.rbiCandidateStatus || item.status === query.rbiCandidateStatus)
    );
    const sorted = this.sortByDate(filtered, 'priority', query.direction);
    const page = pagination(query, sorted.length);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'rbi_candidate', objectId: 'list', sourceBasis: 'R4-01' }));
    return ok(this.pageItems(sorted, page.page, page.pageSize), { requestId: 'r4-rbi-candidates', tenant: requestScope, pagination: page, warnings: [decisionBoundaryNotice] });
  }

  getRbiCandidate(actor: ActorContext, requestScope: TenantScope, candidateId: string): ApiSuccess<RbiCandidateRecord> {
    this.requirePermission(actor, requestScope, 'rbi.candidate.read');
    const record = this.dataset.rbiCandidates.find((item) => item.id === candidateId && this.inScope(item, requestScope));
    if (!record) throw new Error('RBI candidate not found inside requested tenant scope');
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'rbi_candidate', objectId: candidateId, sourceBasis: 'R4-01' }));
    return ok(record, { requestId: 'r4-rbi-candidate-detail', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  // R4-03: RBI Assessment Shell
  listAssessments(actor: ActorContext, requestScope: TenantScope, query: Release4ListQuery = {}): ApiSuccess<RbiAssessmentRecord[]> {
    this.requirePermission(actor, requestScope, 'rbi.assessment.read');
    const filtered = this.scoped(this.dataset.assessments, requestScope).filter((item) =>
      this.matchesSearch(query.search, [item.assessmentCode, item.title, item.equipmentTag]) &&
      (!query.assessmentStatus || item.status === query.assessmentStatus)
    );
    const sorted = this.sortByDate(filtered, 'updatedAt', query.direction);
    const page = pagination(query, sorted.length);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'rbi_assessment', objectId: 'list', sourceBasis: 'R4-03' }));
    return ok(this.pageItems(sorted, page.page, page.pageSize), { requestId: 'r4-assessments', tenant: requestScope, pagination: page, warnings: [decisionBoundaryNotice] });
  }

  getAssessment(actor: ActorContext, requestScope: TenantScope, assessmentId: string): ApiSuccess<RbiAssessmentRecord> {
    this.requirePermission(actor, requestScope, 'rbi.assessment.read');
    const record = this.dataset.assessments.find((item) => item.id === assessmentId && this.inScope(item, requestScope));
    if (!record) throw new Error('RBI assessment not found inside requested tenant scope');
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'rbi_assessment', objectId: assessmentId, sourceBasis: 'R4-03' }));
    return ok(record, { requestId: 'r4-assessment-detail', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  // R4-05: Operating Data Input
  listOperatingData(actor: ActorContext, requestScope: TenantScope, assessmentId: string): ApiSuccess<OperatingDataRecord[]> {
    this.requirePermission(actor, requestScope, 'rbi.operatingdata.read');
    const records = this.scoped(this.dataset.operatingData, requestScope).filter((item) => item.assessmentId === assessmentId);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'operating_data', objectId: `assessment:${assessmentId}`, sourceBasis: 'R4-05' }));
    return ok(records, { requestId: 'r4-operating-data', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  // R4-06: Damage Mechanism Review Placeholder
  listDamageMechanisms(actor: ActorContext, requestScope: TenantScope, assessmentId: string): ApiSuccess<DamageMechanismRecord[]> {
    this.requirePermission(actor, requestScope, 'rbi.damagemechanism.read');
    const records = this.scoped(this.dataset.damageMechanisms, requestScope).filter((item) => item.assessmentId === assessmentId);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'damage_mechanism', objectId: `assessment:${assessmentId}`, sourceBasis: 'R4-06' }));
    return ok(records, { requestId: 'r4-damage-mechanisms', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  // R4-07: PoF/CoF Helper Interface
  getPofCofHelper(actor: ActorContext, requestScope: TenantScope, assessmentId: string): ApiSuccess<PofCofHelperRecord | null> {
    this.requirePermission(actor, requestScope, 'rbi.pofcof.read');
    const record = this.scoped(this.dataset.pofCofHelpers, requestScope).find((item) => item.assessmentId === assessmentId) ?? null;
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'pof_cof_helper', objectId: `assessment:${assessmentId}`, sourceBasis: 'R4-07' }));
    return ok(record, { requestId: 'r4-pofcof-helper', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  // R4-08: Preliminary Risk Ranking Record
  getRiskRanking(actor: ActorContext, requestScope: TenantScope, assessmentId: string): ApiSuccess<RiskRankingRecord | null> {
    this.requirePermission(actor, requestScope, 'rbi.riskranking.read');
    const record = this.scoped(this.dataset.riskRankings, requestScope).find((item) => item.assessmentId === assessmentId) ?? null;
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'risk_ranking', objectId: `assessment:${assessmentId}`, sourceBasis: 'R4-08' }));
    return ok(record, { requestId: 'r4-risk-ranking', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  // R4-09: RBI Review and Approval
  submitForReview(actor: ActorContext, requestScope: TenantScope, assessmentId: string): ApiSuccess<{ assessment: RbiAssessmentRecord; auditEvent: AuditEvent }> {
    this.requirePermission(actor, requestScope, 'rbi.assessment.manage');
    assertNotFinalDecision('rbi_submit_for_review');
    const assessment = this.dataset.assessments.find((item) => item.id === assessmentId && this.inScope(item, requestScope));
    if (!assessment) throw new Error('RBI assessment not found inside requested tenant scope');
    if (assessment.status === 'pending_review' || assessment.status === 'reviewed_preliminary' || assessment.status === 'approved_preliminary') {
      throw new Error('Assessment is already in review or completed state');
    }
    const updated: RbiAssessmentRecord = { ...assessment, status: 'pending_review', updatedAt: new Date().toISOString() };
    this.dataset.assessments = this.dataset.assessments.map((item) => item.id === assessmentId ? updated : item);
    const auditEvent = this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'review', objectType: 'rbi_assessment', objectId: assessmentId, sourceBasis: 'R4-09', newValue: { status: updated.status } }));
    return ok({ assessment: updated, auditEvent }, { requestId: 'r4-assessment-submit-review', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  approveAssessment(actor: ActorContext, requestScope: TenantScope, assessmentId: string): ApiSuccess<{ assessment: RbiAssessmentRecord; auditEvent: AuditEvent }> {
    this.requirePermission(actor, requestScope, 'rbi.assessment.approve');
    assertNotFinalDecision('rbi_approve_assessment');
    const assessment = this.dataset.assessments.find((item) => item.id === assessmentId && this.inScope(item, requestScope));
    if (!assessment) throw new Error('RBI assessment not found inside requested tenant scope');
    if (assessment.status !== 'pending_review') throw new Error('Assessment must be in pending_review state before approval');
    const updated: RbiAssessmentRecord = { ...assessment, status: 'approved_preliminary', updatedAt: new Date().toISOString() };
    this.dataset.assessments = this.dataset.assessments.map((item) => item.id === assessmentId ? updated : item);
    const auditEvent = this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'approve', objectType: 'rbi_assessment', objectId: assessmentId, sourceBasis: 'R4-09', newValue: { status: updated.status } }));
    return ok({ assessment: updated, auditEvent }, { requestId: 'r4-assessment-approve', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  rejectAssessment(actor: ActorContext, requestScope: TenantScope, assessmentId: string, reason: string): ApiSuccess<{ assessment: RbiAssessmentRecord; auditEvent: AuditEvent }> {
    this.requirePermission(actor, requestScope, 'rbi.assessment.approve');
    assertNotFinalDecision('rbi_reject_assessment');
    const assessment = this.dataset.assessments.find((item) => item.id === assessmentId && this.inScope(item, requestScope));
    if (!assessment) throw new Error('RBI assessment not found inside requested tenant scope');
    if (assessment.status !== 'pending_review') throw new Error('Assessment must be in pending_review state before rejection');
    const updated: RbiAssessmentRecord = { ...assessment, status: 'data_gathering', updatedAt: new Date().toISOString() };
    this.dataset.assessments = this.dataset.assessments.map((item) => item.id === assessmentId ? updated : item);
    const auditEvent = this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'reject', objectType: 'rbi_assessment', objectId: assessmentId, sourceBasis: 'R4-09', newValue: { status: updated.status, reason } }));
    return ok({ assessment: updated, auditEvent }, { requestId: 'r4-assessment-reject', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  // R4-10: Risk Register Linkage
  listRiskRegisterItems(actor: ActorContext, requestScope: TenantScope, assessmentId: string): ApiSuccess<RiskRegisterItemRecord[]> {
    this.requirePermission(actor, requestScope, 'rbi.riskregister.read');
    const records = this.scoped(this.dataset.riskRegisterItems, requestScope).filter((item) => item.assessmentId === assessmentId);
    this.auditSink.append(buildAuditEvent({ actor, scope: requestScope, action: 'read_sensitive', objectType: 'risk_register_item', objectId: `assessment:${assessmentId}`, sourceBasis: 'R4-10' }));
    return ok(records, { requestId: 'r4-risk-register-items', tenant: requestScope, warnings: [decisionBoundaryNotice] });
  }

  // Audit
  auditEvents(requestScope: TenantScope): AuditEvent[] { return this.auditSink.list(requestScope); }

  // Helpers
  private kpi(id: string, label: string, count: number, severity: 'info' | 'warning' | 'critical', routeHint: string, filter: Record<string, string>) {
    return { id, label, count, severity, routeHint, filter, decisionBoundary: boundary };
  }
  private scoped<T extends { tenantId: string; projectId: string; siteId: string }>(records: T[], requestScope: TenantScope): T[] {
    return records.filter((item) => this.inScope(item, requestScope));
  }
  private inScope(record: { tenantId: string; projectId: string; siteId: string }, requestScope: TenantScope): boolean {
    return record.tenantId === requestScope.tenantId && (!requestScope.projectId || record.projectId === requestScope.projectId) && (!requestScope.siteId || record.siteId === requestScope.siteId);
  }
  private matchesSearch(search: string | undefined, values: string[]): boolean {
    const needle = search?.trim().toLowerCase();
    return !needle || values.some((value) => value.toLowerCase().includes(needle));
  }
  private sortByDate<T>(records: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    const multiplier = direction === 'desc' ? -1 : 1;
    return [...records].sort((a, b) => String(a[key]).localeCompare(String(b[key])) * multiplier);
  }
  private pageItems<T>(items: T[], page: number, pageSize: number): T[] {
    return items.slice((page - 1) * pageSize, page * pageSize);
  }
  private requirePermission(actor: ActorContext, requestScope: TenantScope, permission: Permission): void {
    const result = hasPermission(actor, permission, requestScope);
    if (!result.allowed) throw new Error(result.reason);
  }
}

function cloneDataset(dataset: Release4Dataset): Release4Dataset {
  return JSON.parse(JSON.stringify(dataset)) as Release4Dataset;
}