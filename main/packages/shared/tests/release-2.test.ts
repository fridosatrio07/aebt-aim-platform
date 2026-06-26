import { describe, expect, it } from 'vitest';
import {
  defaultTenantScope,
  dueState,
  release0PlatformAdmin,
  Release2WorkflowFoundation,
  type ActorContext
} from '../src/index.js';

const documentController: ActorContext = {
  actorId: 'actor-document-controller',
  displayName: 'Document Controller',
  roles: ['document_controller'],
  scope: defaultTenantScope
};

const qcReviewer: ActorContext = {
  actorId: 'actor-qc-reviewer',
  displayName: 'Q&C Reviewer',
  roles: ['qc_reviewer'],
  scope: defaultTenantScope
};

describe('Release 2 workflow foundation', () => {
  it('lists role-scoped My Work action items', () => {
    const service = new Release2WorkflowFoundation();
    const result = service.listMyWork(documentController, defaultTenantScope);

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((item) => item.ownerRole === 'document_controller')).toBe(true);
    expect(result.meta.pagination?.totalItems).toBe(result.data.length);
  });

  it('blocks My Work access outside actor tenant scope', () => {
    const service = new Release2WorkflowFoundation();

    expect(() => service.listMyWork(documentController, { tenantId: 'other-tenant' })).toThrow(/Tenant isolation/);
  });

  it('aggregates reviewer queue items for matching reviewer authority', () => {
    const service = new Release2WorkflowFoundation();
    const result = service.listReviewerQueue(qcReviewer, defaultTenantScope);

    expect(result.data.map((item) => item.requiredAuthority)).toContain('qc_reviewer');
    expect(result.data[0]?.dueState).toBeDefined();
    expect(result.data[0]?.history.length).toBeGreaterThan(0);
  });

  it('approves a generic workflow only for next step, not final domain decision', () => {
    const service = new Release2WorkflowFoundation();
    const result = service.transitionApproval(qcReviewer, defaultTenantScope, {
      ...defaultTenantScope,
      workflowId: 'workflow-r2-duplicate-review',
      action: 'approve',
      comment: 'Source data reviewed for next workflow step only.'
    });

    expect(result.data.workflow.status).toBe('approved_for_next_step');
    expect(result.data.decisionBoundary).toBe('draft_preliminary_only');
    expect(result.data.auditEvent.action).toBe('approve');
  });

  it('groups notification digest items instead of creating one notification per equipment', () => {
    const service = new Release2WorkflowFoundation();
    const result = service.buildNotificationDigest(release0PlatformAdmin, defaultTenantScope);

    expect(result.data.groupedItemCount).toBe(result.data.items.length);
    expect(result.data.overdueItemCount).toBeGreaterThan(0);
    expect(new Set(result.data.items.map((item) => item.groupKey))).toContain('missing_evidence');
  });

  it('creates dashboard cards with route hints into filtered action lists', () => {
    const service = new Release2WorkflowFoundation();
    const result = service.listDashboardActionCards(release0PlatformAdmin, defaultTenantScope);

    expect(result.data.map((card) => card.id)).toEqual(expect.arrayContaining(['my_work', 'pending_review', 'overdue', 'exports_pending_review']));
    expect(result.data.every((card) => card.routeHint.startsWith('/workflow/'))).toBe(true);
  });

  it('creates auditable export logs without generating final reports', () => {
    const service = new Release2WorkflowFoundation();
    const result = service.createExportLog(release0PlatformAdmin, defaultTenantScope, {
      ...defaultTenantScope,
      exportType: 'evidence_pack_placeholder',
      objectType: 'document_set',
      objectId: 'spm-01-demo-documents',
      purpose: 'Draft evidence package review only',
      sourceBasis: 'R2-09 test source basis'
    });

    expect(result.data.exportLog.approvalStatus).toBe('pending_review');
    expect(result.data.exportLog.decisionBoundary).toBe('draft_preliminary_only');
    expect(result.data.auditEvent.action).toBe('export');
  });

  it('calculates due state from the controlled Release 2 clock', () => {
    expect(dueState({
      id: 'due-state-test',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      module: 'validation',
      title: 'Due state test',
      summary: 'No domain decision.',
      priority: 'low',
      status: 'open',
      dueAt: '2026-06-25T00:00:00.000Z',
      ownerRole: 'document_controller',
      requiredAuthority: 'document_controller',
      linkedObject: { objectType: 'test', objectId: 'test', display: 'test' },
      preliminaryRiskLevel: 'not_assessed',
      missingEvidenceCount: 0,
      sourceBasis: 'test',
      createdAt: '2026-06-24T00:00:00.000Z',
      updatedAt: '2026-06-26T00:00:00.000Z'
    })).toBe('overdue');
  });
});
