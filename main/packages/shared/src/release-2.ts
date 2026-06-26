import { ok, pagination, type ApiSuccess, type PaginationInput } from './api.js';
import { buildAuditEvent, InMemoryAuditSink } from './audit.js';
import { assertNotFinalDecision, hasPermission, type Permission } from './rbac.js';
import { defaultTenantScope } from './tenant-context.js';
import type { ActorContext, AuditAction, AuditEvent, TenantScope } from './types.js';

export type ActionModule = 'data_foundation' | 'document_control' | 'validation' | 'governance';
export type ActionPriority = 'critical' | 'high' | 'medium' | 'low';
export type ActionStatus = 'open' | 'in_progress' | 'pending_review' | 'revision_requested' | 'approved_for_next_step' | 'rejected' | 'delegated' | 'escalated' | 'closed';
export type DueState = 'overdue' | 'due_soon' | 'normal' | 'no_due_date';
export type PreliminaryRiskLevel = 'not_assessed' | 'preliminary_low' | 'preliminary_medium' | 'preliminary_high';
export type GenericAuthority = 'document_controller' | 'qc_reviewer' | 'legal_reviewer' | 'management_reviewer' | 'platform_administrator';
export type ApprovalWorkflowStatus = 'pending_review' | 'revision_requested' | 'approved_for_next_step' | 'rejected' | 'delegated' | 'escalated';
export type ApprovalTransitionAction = 'approve' | 'reject' | 'request_revision' | 'delegate' | 'escalate';
export type NotificationDigestType = 'daily_action_digest' | 'review_digest' | 'escalation_digest';
export type NotificationDigestStatus = 'draft' | 'ready';
export type DashboardActionFilter = 'my_work' | 'pending_review' | 'overdue' | 'missing_evidence' | 'escalated' | 'exports_pending_review';
export type ExportType = 'report' | 'evidence_pack_placeholder' | 'data_extract';
export type ExportApprovalStatus = 'not_required' | 'pending_review' | 'approved_for_export' | 'rejected';

export interface LinkedObjectRef {
  objectType: string;
  objectId: string;
  display: string;
}

export interface ActionItemRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  module: ActionModule;
  title: string;
  summary: string;
  priority: ActionPriority;
  status: ActionStatus;
  dueAt?: string;
  ownerActorId?: string;
  ownerRole: GenericAuthority;
  requiredAuthority: GenericAuthority;
  linkedObject: LinkedObjectRef;
  preliminaryRiskLevel: PreliminaryRiskLevel;
  missingEvidenceCount: number;
  sourceBasis: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewerWorkQueueItem extends ActionItemRecord {
  ageDays: number;
  dueState: DueState;
  evidencePreview: string[];
  comments: string[];
  history: string[];
}

export interface ApprovalWorkflowRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  actionItemId: string;
  linkedObject: LinkedObjectRef;
  status: ApprovalWorkflowStatus;
  requiredAuthority: GenericAuthority;
  currentReviewerRole: GenericAuthority;
  decisionBoundary: 'draft_preliminary_only';
  sourceBasis: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalTransitionRequest {
  tenantId: string;
  projectId: string;
  siteId: string;
  workflowId: string;
  action: ApprovalTransitionAction;
  comment: string;
  delegateToRole?: GenericAuthority;
}

export interface ApprovalTransitionResult {
  workflow: ApprovalWorkflowRecord;
  actionItem: ActionItemRecord;
  auditEvent: AuditEvent;
  decisionBoundary: 'draft_preliminary_only';
}

export interface NotificationDigestItem {
  id: string;
  actionItemId: string;
  groupKey: 'overdue' | 'due_soon' | 'missing_evidence' | 'pending_review' | 'escalated';
  severity: 'info' | 'warning' | 'critical';
  reason: string;
}

export interface NotificationDigestRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  digestType: NotificationDigestType;
  recipientRole: GenericAuthority;
  status: NotificationDigestStatus;
  generatedAt: string;
  groupedItemCount: number;
  dueItemCount: number;
  overdueItemCount: number;
  escalationCount: number;
  sourceBasis: string;
  items: NotificationDigestItem[];
}

export interface DashboardActionCard {
  id: DashboardActionFilter;
  label: string;
  count: number;
  filter: {
    status?: ActionStatus;
    dueState?: DueState;
    missingEvidence?: boolean;
    approvalStatus?: ExportApprovalStatus;
  };
  routeHint: string;
}

export interface ExportLogRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  exportType: ExportType;
  objectType: string;
  objectId: string;
  purpose: string;
  requestedBy: string;
  approvalStatus: ExportApprovalStatus;
  version: number;
  createdAt: string;
  sourceBasis: string;
  decisionBoundary: 'draft_preliminary_only';
}

export interface CreateExportLogRequest {
  tenantId: string;
  projectId: string;
  siteId: string;
  exportType: ExportType;
  objectType: string;
  objectId: string;
  purpose: string;
  sourceBasis: string;
}

export interface ExportLogResult {
  exportLog: ExportLogRecord;
  auditEvent: AuditEvent;
}

export interface WorkflowListQuery extends PaginationInput {
  search?: string;
  status?: ActionStatus;
  module?: ActionModule;
  priority?: ActionPriority;
  ownerRole?: GenericAuthority;
  dueState?: DueState;
  sort?: 'priority' | 'dueAt' | 'updatedAt' | 'ageDays';
  direction?: 'asc' | 'desc';
}

interface Release2Dataset {
  actionItems: ActionItemRecord[];
  reviewerEvidence: Record<string, string[]>;
  reviewerComments: Record<string, string[]>;
  reviewerHistory: Record<string, string[]>;
  approvalWorkflows: ApprovalWorkflowRecord[];
  notificationDigests: NotificationDigestRecord[];
  exportLogs: ExportLogRecord[];
}

const sourceBasis = 'Master BPMN Workflow Pack/Addendum MVP+/UI UX Design Pack/Master FRD SRS Rev. 1';
const now = '2026-06-26T00:00:00.000Z';

export const release2Dataset: Release2Dataset = {
  actionItems: [
    {
      id: 'action-r2-missing-parent',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      module: 'validation',
      title: 'Resolve missing facility code',
      summary: 'Import row cannot move from staging until parent hierarchy is completed.',
      priority: 'high',
      status: 'open',
      dueAt: '2026-06-25T17:00:00.000Z',
      ownerRole: 'document_controller',
      requiredAuthority: 'document_controller',
      linkedObject: {
        objectType: 'validation_issue',
        objectId: 'issue-spm-01-missing-facility',
        display: 'SPM-01 import row 2'
      },
      preliminaryRiskLevel: 'not_assessed',
      missingEvidenceCount: 1,
      sourceBasis,
      createdAt: '2026-06-24T09:00:00.000Z',
      updatedAt: now
    },
    {
      id: 'action-r2-duplicate-review',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      module: 'validation',
      title: 'Review duplicate equipment candidate',
      summary: 'Duplicate candidate V-001 needs reviewer confirmation before any baseline action.',
      priority: 'medium',
      status: 'pending_review',
      dueAt: '2026-06-27T17:00:00.000Z',
      ownerRole: 'qc_reviewer',
      requiredAuthority: 'qc_reviewer',
      linkedObject: {
        objectType: 'validation_issue',
        objectId: 'issue-spm-01-duplicate-v001',
        display: 'V-001 duplicate candidate'
      },
      preliminaryRiskLevel: 'not_assessed',
      missingEvidenceCount: 0,
      sourceBasis,
      createdAt: '2026-06-24T10:30:00.000Z',
      updatedAt: now
    },
    {
      id: 'action-r2-document-metadata',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      module: 'document_control',
      title: 'Complete drawing metadata',
      summary: 'Document controller must confirm confidentiality and linkage before reuse.',
      priority: 'medium',
      status: 'in_progress',
      dueAt: '2026-06-28T17:00:00.000Z',
      ownerRole: 'document_controller',
      requiredAuthority: 'document_controller',
      linkedObject: {
        objectType: 'document',
        objectId: 'doc-spm-01-drawing',
        display: 'DOC-DWG-001'
      },
      preliminaryRiskLevel: 'not_assessed',
      missingEvidenceCount: 0,
      sourceBasis,
      createdAt: '2026-06-25T08:00:00.000Z',
      updatedAt: now
    },
    {
      id: 'action-r2-management-escalation',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      module: 'governance',
      title: 'Review unresolved import blocker',
      summary: 'Aged validation issue needs management visibility; no technical acceptance is implied.',
      priority: 'critical',
      status: 'escalated',
      dueAt: '2026-06-26T12:00:00.000Z',
      ownerRole: 'management_reviewer',
      requiredAuthority: 'management_reviewer',
      linkedObject: {
        objectType: 'import_batch',
        objectId: 'import-spm-01-assets-001',
        display: 'SPM-01 asset import batch'
      },
      preliminaryRiskLevel: 'preliminary_medium',
      missingEvidenceCount: 1,
      sourceBasis,
      createdAt: '2026-06-23T07:45:00.000Z',
      updatedAt: now
    },
    {
      id: 'action-r2-export-review',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      module: 'document_control',
      title: 'Review export purpose',
      summary: 'Draft export package requires purpose and approval status logging before generation.',
      priority: 'low',
      status: 'pending_review',
      dueAt: '2026-06-29T17:00:00.000Z',
      ownerRole: 'management_reviewer',
      requiredAuthority: 'management_reviewer',
      linkedObject: {
        objectType: 'export_log',
        objectId: 'export-r2-demo-001',
        display: 'Draft data extract export'
      },
      preliminaryRiskLevel: 'not_assessed',
      missingEvidenceCount: 0,
      sourceBasis,
      createdAt: '2026-06-25T11:00:00.000Z',
      updatedAt: now
    }
  ],
  reviewerEvidence: {
    'action-r2-duplicate-review': ['DOC-ASSET-REG-001', 'Import row 1 raw payload'],
    'action-r2-management-escalation': ['Import batch issue summary', 'Validation queue history'],
    'action-r2-export-review': ['Export purpose statement', 'Scope selector snapshot']
  },
  reviewerComments: {
    'action-r2-duplicate-review': ['Confirm duplicate candidate against controlled asset register.'],
    'action-r2-management-escalation': ['Escalated for workload visibility only.'],
    'action-r2-export-review': ['Export is draft until approval status is recorded.']
  },
  reviewerHistory: {
    'action-r2-duplicate-review': ['Created from validation queue', 'Assigned to Q&C reviewer'],
    'action-r2-management-escalation': ['Overdue digest grouped', 'Escalated to management reviewer'],
    'action-r2-export-review': ['Created from export log foundation']
  },
  approvalWorkflows: [
    {
      id: 'workflow-r2-duplicate-review',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      actionItemId: 'action-r2-duplicate-review',
      linkedObject: {
        objectType: 'validation_issue',
        objectId: 'issue-spm-01-duplicate-v001',
        display: 'V-001 duplicate candidate'
      },
      status: 'pending_review',
      requiredAuthority: 'qc_reviewer',
      currentReviewerRole: 'qc_reviewer',
      decisionBoundary: 'draft_preliminary_only',
      sourceBasis,
      createdBy: 'agent-release-2',
      createdAt: '2026-06-24T10:30:00.000Z',
      updatedAt: now
    },
    {
      id: 'workflow-r2-export-review',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      actionItemId: 'action-r2-export-review',
      linkedObject: {
        objectType: 'export_log',
        objectId: 'export-r2-demo-001',
        display: 'Draft data extract export'
      },
      status: 'pending_review',
      requiredAuthority: 'management_reviewer',
      currentReviewerRole: 'management_reviewer',
      decisionBoundary: 'draft_preliminary_only',
      sourceBasis,
      createdBy: 'agent-release-2',
      createdAt: '2026-06-25T11:00:00.000Z',
      updatedAt: now
    }
  ],
  notificationDigests: [],
  exportLogs: [
    {
      id: 'export-r2-demo-001',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      exportType: 'data_extract',
      objectType: 'asset_registry',
      objectId: 'release-1-demo-scope',
      purpose: 'Draft reviewer packet for SPM-01 data quality review',
      requestedBy: 'agent-release-2',
      approvalStatus: 'pending_review',
      version: 1,
      createdAt: now,
      sourceBasis,
      decisionBoundary: 'draft_preliminary_only'
    }
  ]
};

export class Release2WorkflowFoundation {
  private readonly auditSink = new InMemoryAuditSink();
  private readonly dataset: Release2Dataset;

  constructor(dataset: Release2Dataset = release2Dataset) {
    this.dataset = cloneDataset(dataset);
  }

  listMyWork(actor: ActorContext, scope: TenantScope, query: WorkflowListQuery = {}): ApiSuccess<ActionItemRecord[]> {
    this.requirePermission(actor, scope, 'action.read');
    const items = this.scopedActionItems(scope).filter((item) => this.visibleToActor(item, actor));
    const filtered = this.filterActions(items, query);
    const sorted = this.sortActions(filtered, query);
    const page = pagination(query, sorted.length);
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'my_work', objectId: 'list', sourceBasis: 'R2-02' }));
    return ok(this.pageItems(sorted, page.page, page.pageSize), { requestId: 'r2-my-work', tenant: scope, pagination: page });
  }

  listReviewerQueue(actor: ActorContext, scope: TenantScope, query: WorkflowListQuery = {}): ApiSuccess<ReviewerWorkQueueItem[]> {
    this.requirePermission(actor, scope, 'review.queue.read');
    const reviewerItems = this.scopedActionItems(scope)
      .filter((item) => ['pending_review', 'revision_requested', 'escalated'].includes(item.status))
      .filter((item) => actor.roles.includes('platform_administrator') || actor.roles.includes(item.requiredAuthority))
      .map((item) => this.toReviewerQueueItem(item));
    const filtered = this.filterActions(reviewerItems, query);
    const sorted = this.sortActions(filtered, query);
    const page = pagination(query, sorted.length);
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'reviewer_work_queue', objectId: 'list', sourceBasis: 'R2-04' }));
    return ok(this.pageItems(sorted, page.page, page.pageSize), { requestId: 'r2-reviewer-queue', tenant: scope, pagination: page });
  }

  transitionApproval(actor: ActorContext, scope: TenantScope, request: ApprovalTransitionRequest): ApiSuccess<ApprovalTransitionResult> {
    this.requirePermission(actor, scope, 'workflow.transition');
    this.assertRequestScope(request, scope);
    assertNotFinalDecision(`generic_workflow_${request.action}`);
    const workflow = this.dataset.approvalWorkflows.find((item) => item.id === request.workflowId && item.tenantId === scope.tenantId);
    if (!workflow) throw new Error('Approval workflow not found inside requested tenant scope');
    if (!actor.roles.includes('platform_administrator') && !actor.roles.includes(workflow.currentReviewerRole)) {
      throw new Error(`missing required authority ${workflow.currentReviewerRole}`);
    }
    const actionItem = this.dataset.actionItems.find((item) => item.id === workflow.actionItemId);
    if (!actionItem) throw new Error('Linked action item not found for workflow');
    const next = nextWorkflowStatus(workflow.status, request.action);
    const updatedWorkflow: ApprovalWorkflowRecord = {
      ...workflow,
      status: next.workflowStatus,
      currentReviewerRole: request.action === 'delegate' ? (request.delegateToRole ?? workflow.currentReviewerRole) : workflow.currentReviewerRole,
      updatedAt: new Date().toISOString()
    };
    const updatedAction: ActionItemRecord = {
      ...actionItem,
      status: next.actionStatus,
      ownerRole: request.action === 'delegate' ? (request.delegateToRole ?? actionItem.ownerRole) : actionItem.ownerRole,
      updatedAt: updatedWorkflow.updatedAt
    };
    this.replaceWorkflow(updatedWorkflow);
    this.replaceAction(updatedAction);
    const auditEvent = this.auditSink.append(buildAuditEvent({
      actor,
      scope,
      action: auditActionForTransition(request.action),
      objectType: 'generic_approval_workflow',
      objectId: workflow.id,
      sourceBasis: 'R2-06',
      previousValue: { status: workflow.status },
      newValue: { status: updatedWorkflow.status, comment: request.comment, delegateToRole: request.delegateToRole }
    }));
    return ok({ workflow: updatedWorkflow, actionItem: updatedAction, auditEvent, decisionBoundary: 'draft_preliminary_only' }, { requestId: 'r2-approval-transition', tenant: scope });
  }

  buildNotificationDigest(actor: ActorContext, scope: TenantScope, digestType: NotificationDigestType = 'daily_action_digest'): ApiSuccess<NotificationDigestRecord> {
    this.requirePermission(actor, scope, 'notification.digest.read');
    const items = this.scopedActionItems(scope).flatMap((item) => digestItemsForAction(item));
    const digest: NotificationDigestRecord = {
      id: `digest-${digestType}-${scope.tenantId}`,
      tenantId: scope.tenantId,
      projectId: scope.projectId ?? defaultTenantScope.projectId,
      siteId: scope.siteId ?? defaultTenantScope.siteId,
      digestType,
      recipientRole: 'management_reviewer',
      status: 'ready',
      generatedAt: new Date().toISOString(),
      groupedItemCount: items.length,
      dueItemCount: items.filter((item) => item.groupKey === 'due_soon').length,
      overdueItemCount: items.filter((item) => item.groupKey === 'overdue').length,
      escalationCount: items.filter((item) => item.groupKey === 'escalated').length,
      sourceBasis: 'R2-07',
      items
    };
    this.dataset.notificationDigests = [digest];
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'notify', objectType: 'notification_digest', objectId: digest.id, sourceBasis: 'R2-07' }));
    return ok(digest, { requestId: 'r2-notification-digest', tenant: scope });
  }

  listDashboardActionCards(actor: ActorContext, scope: TenantScope): ApiSuccess<DashboardActionCard[]> {
    this.requirePermission(actor, scope, 'dashboard.read');
    const items = this.scopedActionItems(scope);
    const exportPending = this.dataset.exportLogs.filter((log) => log.tenantId === scope.tenantId && log.approvalStatus === 'pending_review').length;
    const cards: DashboardActionCard[] = [
      { id: 'my_work', label: 'My Work', count: items.filter((item) => this.visibleToActor(item, actor)).length, filter: {}, routeHint: '/workflow/my-work' },
      { id: 'pending_review', label: 'Pending Review', count: items.filter((item) => item.status === 'pending_review').length, filter: { status: 'pending_review' }, routeHint: '/workflow/reviewer-queue?status=pending_review' },
      { id: 'overdue', label: 'Overdue', count: items.filter((item) => dueState(item) === 'overdue').length, filter: { dueState: 'overdue' }, routeHint: '/workflow/my-work?dueState=overdue' },
      { id: 'missing_evidence', label: 'Missing Evidence', count: items.filter((item) => item.missingEvidenceCount > 0).length, filter: { missingEvidence: true }, routeHint: '/workflow/my-work?missingEvidence=true' },
      { id: 'escalated', label: 'Escalated', count: items.filter((item) => item.status === 'escalated').length, filter: { status: 'escalated' }, routeHint: '/workflow/reviewer-queue?status=escalated' },
      { id: 'exports_pending_review', label: 'Exports Pending Review', count: exportPending, filter: { approvalStatus: 'pending_review' }, routeHint: '/workflow/export-logs?approvalStatus=pending_review' }
    ];
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'dashboard_action_shell', objectId: 'cards', sourceBasis: 'R2-08' }));
    return ok(cards, { requestId: 'r2-dashboard-actions', tenant: scope });
  }

  createExportLog(actor: ActorContext, scope: TenantScope, request: CreateExportLogRequest): ApiSuccess<ExportLogResult> {
    this.requirePermission(actor, scope, 'export.create');
    this.assertRequestScope(request, scope);
    assertNotFinalDecision('create_export_log');
    if (!request.purpose.trim()) throw new Error('export purpose is required');
    const exportLog: ExportLogRecord = {
      id: `export-${Date.now()}`,
      tenantId: scope.tenantId,
      projectId: scope.projectId ?? defaultTenantScope.projectId,
      siteId: scope.siteId ?? defaultTenantScope.siteId,
      exportType: request.exportType,
      objectType: request.objectType,
      objectId: request.objectId,
      purpose: request.purpose,
      requestedBy: actor.actorId,
      approvalStatus: request.exportType === 'data_extract' ? 'not_required' : 'pending_review',
      version: 1,
      createdAt: new Date().toISOString(),
      sourceBasis: request.sourceBasis,
      decisionBoundary: 'draft_preliminary_only'
    };
    this.dataset.exportLogs.push(exportLog);
    const auditEvent = this.auditSink.append(buildAuditEvent({
      actor,
      scope,
      action: 'export',
      objectType: 'export_log',
      objectId: exportLog.id,
      sourceBasis: 'R2-09',
      newValue: { exportType: exportLog.exportType, approvalStatus: exportLog.approvalStatus, purpose: exportLog.purpose }
    }));
    return ok({ exportLog, auditEvent }, { requestId: 'r2-export-log-create', tenant: scope });
  }

  listExportLogs(actor: ActorContext, scope: TenantScope, query: WorkflowListQuery = {}): ApiSuccess<ExportLogRecord[]> {
    this.requirePermission(actor, scope, 'export.read');
    const logs = this.dataset.exportLogs.filter((log) => log.tenantId === scope.tenantId);
    const search = query.search?.trim().toLowerCase();
    const filtered = logs.filter((log) => !search || [log.exportType, log.objectType, log.objectId, log.purpose].some((value) => value.toLowerCase().includes(search)));
    const page = pagination(query, filtered.length);
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'export_log', objectId: 'list', sourceBasis: 'R2-09' }));
    return ok(this.pageItems(filtered, page.page, page.pageSize), { requestId: 'r2-export-logs', tenant: scope, pagination: page });
  }

  auditEvents(scope: TenantScope): AuditEvent[] {
    return this.auditSink.list(scope);
  }

  private scopedActionItems(scope: TenantScope): ActionItemRecord[] {
    return this.dataset.actionItems.filter((item) => item.tenantId === scope.tenantId && (!scope.projectId || item.projectId === scope.projectId) && (!scope.siteId || item.siteId === scope.siteId));
  }

  private filterActions<T extends ActionItemRecord>(items: T[], query: WorkflowListQuery): T[] {
    const search = query.search?.trim().toLowerCase();
    return items.filter((item) => {
      const searchMatches = !search || [item.title, item.summary, item.linkedObject.display, item.linkedObject.objectType].some((value) => value.toLowerCase().includes(search));
      const statusMatches = !query.status || item.status === query.status;
      const moduleMatches = !query.module || item.module === query.module;
      const priorityMatches = !query.priority || item.priority === query.priority;
      const ownerMatches = !query.ownerRole || item.ownerRole === query.ownerRole;
      const dueMatches = !query.dueState || dueState(item) === query.dueState;
      return searchMatches && statusMatches && moduleMatches && priorityMatches && ownerMatches && dueMatches;
    });
  }

  private sortActions<T extends ActionItemRecord>(items: T[], query: WorkflowListQuery): T[] {
    const direction = query.direction === 'asc' ? 1 : -1;
    const sort = query.sort ?? 'priority';
    return [...items].sort((a, b) => {
      if (sort === 'priority') return (priorityRank(a.priority) - priorityRank(b.priority)) * direction;
      if (sort === 'dueAt') return compareText(a.dueAt ?? '9999', b.dueAt ?? '9999') * (query.direction === 'desc' ? -1 : 1);
      if (sort === 'ageDays') return (ageDays(a.createdAt) - ageDays(b.createdAt)) * direction;
      return compareText(a.updatedAt, b.updatedAt) * direction;
    });
  }

  private pageItems<T>(items: T[], page: number, pageSize: number): T[] {
    return items.slice((page - 1) * pageSize, page * pageSize);
  }

  private visibleToActor(item: ActionItemRecord, actor: ActorContext): boolean {
    return actor.roles.includes('platform_administrator') || actor.actorId === item.ownerActorId || actor.roles.includes(item.ownerRole);
  }

  private toReviewerQueueItem(item: ActionItemRecord): ReviewerWorkQueueItem {
    return {
      ...item,
      ageDays: ageDays(item.createdAt),
      dueState: dueState(item),
      evidencePreview: this.dataset.reviewerEvidence[item.id] ?? [],
      comments: this.dataset.reviewerComments[item.id] ?? [],
      history: this.dataset.reviewerHistory[item.id] ?? []
    };
  }

  private requirePermission(actor: ActorContext, scope: TenantScope, permission: Permission): void {
    const result = hasPermission(actor, permission, scope);
    if (!result.allowed) throw new Error(result.reason);
  }

  private assertRequestScope(request: TenantScope, scope: TenantScope): void {
    if (request.tenantId !== scope.tenantId) throw new Error('Tenant isolation violation: requested tenant is outside request scope');
    if (request.projectId && scope.projectId && request.projectId !== scope.projectId) throw new Error('Project isolation violation: requested project is outside request scope');
    if (request.siteId && scope.siteId && request.siteId !== scope.siteId) throw new Error('Site isolation violation: requested site is outside request scope');
  }

  private replaceWorkflow(workflow: ApprovalWorkflowRecord): void {
    this.dataset.approvalWorkflows = this.dataset.approvalWorkflows.map((item) => item.id === workflow.id ? workflow : item);
  }

  private replaceAction(actionItem: ActionItemRecord): void {
    this.dataset.actionItems = this.dataset.actionItems.map((item) => item.id === actionItem.id ? actionItem : item);
  }
}

export function dueState(item: ActionItemRecord): DueState {
  if (!item.dueAt) return 'no_due_date';
  const due = Date.parse(item.dueAt);
  const current = Date.parse(now);
  if (due < current) return 'overdue';
  if (due - current <= 2 * 24 * 60 * 60 * 1000) return 'due_soon';
  return 'normal';
}

function digestItemsForAction(item: ActionItemRecord): NotificationDigestItem[] {
  const groups: NotificationDigestItem[] = [];
  const state = dueState(item);
  if (state === 'overdue' || state === 'due_soon') {
    groups.push({ id: `${item.id}-${state}`, actionItemId: item.id, groupKey: state, severity: state === 'overdue' ? 'critical' : 'warning', reason: `${item.title} is ${state.replace('_', ' ')}.` });
  }
  if (item.missingEvidenceCount > 0) {
    groups.push({ id: `${item.id}-missing-evidence`, actionItemId: item.id, groupKey: 'missing_evidence', severity: 'warning', reason: `${item.missingEvidenceCount} evidence item(s) require attention.` });
  }
  if (item.status === 'pending_review') {
    groups.push({ id: `${item.id}-pending-review`, actionItemId: item.id, groupKey: 'pending_review', severity: 'info', reason: `${item.title} is pending reviewer action.` });
  }
  if (item.status === 'escalated') {
    groups.push({ id: `${item.id}-escalated`, actionItemId: item.id, groupKey: 'escalated', severity: 'critical', reason: `${item.title} has been escalated.` });
  }
  return groups;
}

function nextWorkflowStatus(current: ApprovalWorkflowStatus, action: ApprovalTransitionAction): { workflowStatus: ApprovalWorkflowStatus; actionStatus: ActionStatus } {
  if (action === 'approve') {
    if (current !== 'pending_review') throw new Error('Only pending review workflow can be approved for next step');
    return { workflowStatus: 'approved_for_next_step', actionStatus: 'approved_for_next_step' };
  }
  if (action === 'reject') return { workflowStatus: 'rejected', actionStatus: 'rejected' };
  if (action === 'request_revision') return { workflowStatus: 'revision_requested', actionStatus: 'revision_requested' };
  if (action === 'delegate') return { workflowStatus: 'delegated', actionStatus: 'delegated' };
  return { workflowStatus: 'escalated', actionStatus: 'escalated' };
}

function auditActionForTransition(action: ApprovalTransitionAction): AuditAction {
  if (action === 'approve') return 'approve';
  if (action === 'reject') return 'reject';
  if (action === 'request_revision') return 'request_revision';
  if (action === 'delegate') return 'delegate';
  return 'escalate';
}

function priorityRank(priority: ActionPriority): number {
  return { critical: 4, high: 3, medium: 2, low: 1 }[priority];
}

function ageDays(createdAt: string): number {
  return Math.max(0, Math.floor((Date.parse(now) - Date.parse(createdAt)) / (24 * 60 * 60 * 1000)));
}

function compareText(a: string, b: string): number {
  return a.localeCompare(b);
}

function cloneDataset(dataset: Release2Dataset): Release2Dataset {
  return JSON.parse(JSON.stringify(dataset)) as Release2Dataset;
}
