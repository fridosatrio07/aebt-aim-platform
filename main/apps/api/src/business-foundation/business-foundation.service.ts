import { Injectable } from '@nestjs/common';
import {
  defaultTenantScope,
  normalizeTenantScope,
  release0PlatformAdmin,
  Release3BusinessFoundation,
  type ActorContext,
  type EvidencePackBuildRequest,
  type Release3ListQuery,
  type TenantScope
} from '@aim-platform/shared';

@Injectable()
export class BusinessFoundationService {
  private readonly businessFoundation = new Release3BusinessFoundation();

  listInspectionDue(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.businessFoundation.listInspectionDue(this.actor(scope), scope, this.toBusinessQuery(query));
  }

  listWorkpacks(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.businessFoundation.listWorkpacks(this.actor(scope), scope, this.toBusinessQuery(query));
  }

  listCertifications(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.businessFoundation.listCertificationRegister(this.actor(scope), scope, this.toBusinessQuery(query));
  }

  listEvidenceChecklists(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.businessFoundation.listEvidenceChecklists(this.actor(scope), scope, this.toBusinessQuery(query));
  }

  listEvidencePacks(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.businessFoundation.listEvidencePacks(this.actor(scope), scope, this.toBusinessQuery(query));
  }

  buildEvidencePack(scope: TenantScope, request: EvidencePackBuildRequest) {
    return this.businessFoundation.buildEvidencePack(this.actor(scope), scope, request);
  }

  businessKpis(scope: TenantScope) {
    return this.businessFoundation.listBusinessKpis(this.actor(scope), scope);
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

  private toBusinessQuery(query: Record<string, string | undefined>): Release3ListQuery {
    const businessQuery: Release3ListQuery = {};
    if (query.search) businessQuery.search = query.search;
    if (query.dueStatus && ['overdue', 'due_soon', 'scheduled', 'completed', 'not_due'].includes(query.dueStatus)) businessQuery.dueStatus = query.dueStatus as NonNullable<Release3ListQuery['dueStatus']>;
    if (query.inspectionStatus && ['planned', 'scheduled', 'in_progress', 'pending_review', 'completed_preliminary', 'deferred_needs_review'].includes(query.inspectionStatus)) businessQuery.inspectionStatus = query.inspectionStatus as NonNullable<Release3ListQuery['inspectionStatus']>;
    if (query.workpackStatus && ['draft', 'scheduled', 'field_execution', 'pending_review', 'closed_preliminary'].includes(query.workpackStatus)) businessQuery.workpackStatus = query.workpackStatus as NonNullable<Release3ListQuery['workpackStatus']>;
    if (query.certificationStatus && ['active', 'due_soon', 'expired', 'pending_submission', 'submitted', 'evidence_gap', 'under_review'].includes(query.certificationStatus)) businessQuery.certificationStatus = query.certificationStatus as NonNullable<Release3ListQuery['certificationStatus']>;
    if (query.readinessStatus && ['not_ready', 'data_gap', 'evidence_pending', 'ready_for_review', 'submitted', 'reviewed_preliminary'].includes(query.readinessStatus)) businessQuery.readinessStatus = query.readinessStatus as NonNullable<Release3ListQuery['readinessStatus']>;
    if (query.evidenceStatus && ['not_started', 'in_progress', 'complete_pending_review', 'gap_found', 'reviewed_preliminary', 'draft', 'completeness_check', 'ready_for_review', 'revision_requested', 'export_logged_preliminary'].includes(query.evidenceStatus)) businessQuery.evidenceStatus = query.evidenceStatus as NonNullable<Release3ListQuery['evidenceStatus']>;
    if (query.direction === 'asc' || query.direction === 'desc') businessQuery.direction = query.direction;
    const page = Number.parseInt(query.page ?? '', 10);
    const pageSize = Number.parseInt(query.pageSize ?? '', 10);
    if (Number.isFinite(page)) businessQuery.page = page;
    if (Number.isFinite(pageSize)) businessQuery.pageSize = pageSize;
    return businessQuery;
  }
}
