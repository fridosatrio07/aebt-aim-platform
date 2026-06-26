import { Injectable } from '@nestjs/common';
import {
  defaultTenantScope,
  normalizeTenantScope,
  release0PlatformAdmin,
  Release4IntegrityFoundation,
  type ActorContext,
  type Release4ListQuery,
  type TenantScope
} from '@aim-platform/shared';

@Injectable()
export class IntegrityFoundationService {
  private readonly integrityFoundation = new Release4IntegrityFoundation();

  listRbiCandidates(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.integrityFoundation.listRbiCandidates(this.actor(scope), scope, this.toIntegrityQuery(query));
  }

  getRbiCandidate(scope: TenantScope, candidateId: string) {
    return this.integrityFoundation.getRbiCandidate(this.actor(scope), scope, candidateId);
  }

  listAssessments(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.integrityFoundation.listAssessments(this.actor(scope), scope, this.toIntegrityQuery(query));
  }

  getAssessment(scope: TenantScope, assessmentId: string) {
    return this.integrityFoundation.getAssessment(this.actor(scope), scope, assessmentId);
  }

  listOperatingData(scope: TenantScope, assessmentId: string) {
    return this.integrityFoundation.listOperatingData(this.actor(scope), scope, assessmentId);
  }

  listDamageMechanisms(scope: TenantScope, assessmentId: string) {
    return this.integrityFoundation.listDamageMechanisms(this.actor(scope), scope, assessmentId);
  }

  getPofCofHelper(scope: TenantScope, assessmentId: string) {
    return this.integrityFoundation.getPofCofHelper(this.actor(scope), scope, assessmentId);
  }

  getRiskRanking(scope: TenantScope, assessmentId: string) {
    return this.integrityFoundation.getRiskRanking(this.actor(scope), scope, assessmentId);
  }

  submitForReview(scope: TenantScope, assessmentId: string) {
    return this.integrityFoundation.submitForReview(this.actor(scope), scope, assessmentId);
  }

  approveAssessment(scope: TenantScope, assessmentId: string) {
    return this.integrityFoundation.approveAssessment(this.actor(scope), scope, assessmentId);
  }

  rejectAssessment(scope: TenantScope, assessmentId: string, reason: string) {
    return this.integrityFoundation.rejectAssessment(this.actor(scope), scope, assessmentId, reason);
  }

  listRiskRegisterItems(scope: TenantScope, assessmentId: string) {
    return this.integrityFoundation.listRiskRegisterItems(this.actor(scope), scope, assessmentId);
  }

  auditEvents(scope: TenantScope) {
    return this.integrityFoundation.auditEvents(scope);
  }

  normalizeScope(input: TenantScope): TenantScope {
    return normalizeTenantScope({
      tenantId: input.tenantId || defaultTenantScope.tenantId,
      projectId: input.projectId || defaultTenantScope.projectId,
      siteId: input.siteId || defaultTenantScope.siteId
    });
  }

  private actor(scope: TenantScope): ActorContext {
    return { ...release0PlatformAdmin, scope: { ...defaultTenantScope, ...scope } };
  }

  private toIntegrityQuery(query: Record<string, string | undefined>): Release4ListQuery {
    const integrityQuery: Release4ListQuery = {};
    if (query.search) integrityQuery.search = query.search;
    if (query.rbiCandidateStatus && ['not_scoped', 'scoped_for_rbi', 'assessment_in_progress', 'assessment_draft', 'pending_review', 'reviewed_preliminary'].includes(query.rbiCandidateStatus)) {
      integrityQuery.rbiCandidateStatus = query.rbiCandidateStatus as NonNullable<Release4ListQuery['rbiCandidateStatus']>;
    }
    if (query.assessmentStatus && ['draft', 'data_gathering', 'operating_data_input', 'damage_mechanism_review', 'pof_cof_helper', 'risk_ranking', 'pending_review', 'reviewed_preliminary', 'approved_preliminary'].includes(query.assessmentStatus)) {
      integrityQuery.assessmentStatus = query.assessmentStatus as NonNullable<Release4ListQuery['assessmentStatus']>;
    }
    if (query.riskLevel && ['low', 'medium', 'high', 'critical', 'tbd_sme'].includes(query.riskLevel)) {
      integrityQuery.riskLevel = query.riskLevel as NonNullable<Release4ListQuery['riskLevel']>;
    }
    if (query.direction === 'asc' || query.direction === 'desc') integrityQuery.direction = query.direction;
    const page = Number.parseInt(query.page ?? '', 10);
    const pageSize = Number.parseInt(query.pageSize ?? '', 10);
    if (Number.isFinite(page)) integrityQuery.page = page;
    if (Number.isFinite(pageSize)) integrityQuery.pageSize = pageSize;
    return integrityQuery;
  }
}