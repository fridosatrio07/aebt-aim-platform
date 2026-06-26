import { Injectable } from '@nestjs/common';
import {
  defaultTenantScope,
  normalizeTenantScope,
  release0PlatformAdmin,
  Release2WorkflowFoundation,
  type ActorContext,
  type ApprovalTransitionRequest,
  type CreateExportLogRequest,
  type NotificationDigestType,
  type TenantScope,
  type WorkflowListQuery
} from '@aim-platform/shared';

@Injectable()
export class WorkflowFoundationService {
  private readonly workflowFoundation = new Release2WorkflowFoundation();

  listMyWork(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.workflowFoundation.listMyWork(this.actor(scope), scope, this.toWorkflowQuery(query));
  }

  listReviewerQueue(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.workflowFoundation.listReviewerQueue(this.actor(scope), scope, this.toWorkflowQuery(query));
  }

  transitionApproval(scope: TenantScope, request: ApprovalTransitionRequest) {
    return this.workflowFoundation.transitionApproval(this.actor(scope), scope, request);
  }

  notificationDigest(scope: TenantScope, digestType?: NotificationDigestType) {
    return this.workflowFoundation.buildNotificationDigest(this.actor(scope), scope, digestType);
  }

  dashboardActions(scope: TenantScope) {
    return this.workflowFoundation.listDashboardActionCards(this.actor(scope), scope);
  }

  createExportLog(scope: TenantScope, request: CreateExportLogRequest) {
    return this.workflowFoundation.createExportLog(this.actor(scope), scope, request);
  }

  listExportLogs(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.workflowFoundation.listExportLogs(this.actor(scope), scope, this.toWorkflowQuery(query));
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

  private toWorkflowQuery(query: Record<string, string | undefined>): WorkflowListQuery {
    const workflowQuery: WorkflowListQuery = {};
    if (query.search) workflowQuery.search = query.search;
    if (query.status && ['open', 'in_progress', 'pending_review', 'revision_requested', 'approved_for_next_step', 'rejected', 'delegated', 'escalated', 'closed'].includes(query.status)) workflowQuery.status = query.status as NonNullable<WorkflowListQuery['status']>;
    if (query.module && ['data_foundation', 'document_control', 'validation', 'governance'].includes(query.module)) workflowQuery.module = query.module as NonNullable<WorkflowListQuery['module']>;
    if (query.priority && ['critical', 'high', 'medium', 'low'].includes(query.priority)) workflowQuery.priority = query.priority as NonNullable<WorkflowListQuery['priority']>;
    if (query.ownerRole && ['document_controller', 'qc_reviewer', 'legal_reviewer', 'management_reviewer', 'platform_administrator'].includes(query.ownerRole)) workflowQuery.ownerRole = query.ownerRole as NonNullable<WorkflowListQuery['ownerRole']>;
    if (query.dueState && ['overdue', 'due_soon', 'normal', 'no_due_date'].includes(query.dueState)) workflowQuery.dueState = query.dueState as NonNullable<WorkflowListQuery['dueState']>;
    if (query.sort && ['priority', 'dueAt', 'updatedAt', 'ageDays'].includes(query.sort)) workflowQuery.sort = query.sort as NonNullable<WorkflowListQuery['sort']>;
    if (query.direction === 'asc' || query.direction === 'desc') workflowQuery.direction = query.direction;
    const page = Number.parseInt(query.page ?? '', 10);
    const pageSize = Number.parseInt(query.pageSize ?? '', 10);
    if (Number.isFinite(page)) workflowQuery.page = page;
    if (Number.isFinite(pageSize)) workflowQuery.pageSize = pageSize;
    return workflowQuery;
  }
}
