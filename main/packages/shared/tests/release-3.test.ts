import { describe, expect, it } from 'vitest';
import {
  defaultTenantScope,
  release0PlatformAdmin,
  Release3BusinessFoundation,
  type ActorContext
} from '../src/index.js';

const certificationActor: ActorContext = {
  actorId: 'actor-certification-team',
  displayName: 'Certification Team',
  roles: ['certification_team'],
  scope: defaultTenantScope
};

const inspectorActor: ActorContext = {
  actorId: 'actor-inspector',
  displayName: 'Inspector',
  roles: ['inspector'],
  scope: defaultTenantScope
};

describe('Release 3 business foundation', () => {
  it('lists inspection due records with preliminary review boundaries', () => {
    const service = new Release3BusinessFoundation();
    const result = service.listInspectionDue(inspectorActor, defaultTenantScope, { dueStatus: 'overdue' });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]?.inspectionStatus).toBe('pending_review');
    expect(result.data[0]?.decisionBoundary).toBe('draft_preliminary_only');
    expect(result.data[0]?.nextAction.toLowerCase()).toContain('preliminary');
  });

  it('blocks Release 3 business reads outside actor tenant scope', () => {
    const service = new Release3BusinessFoundation();

    expect(() => service.listInspectionDue(inspectorActor, { tenantId: 'other-tenant' })).toThrow(/Tenant isolation/);
  });

  it('returns workpack skeleton steps without closing technical decisions', () => {
    const service = new Release3BusinessFoundation();
    const result = service.listWorkpacks(release0PlatformAdmin, defaultTenantScope, { workpackStatus: 'pending_review' });

    expect(result.data[0]?.steps.map((step) => step.label)).toEqual(expect.arrayContaining(['Field execution record', 'Reviewer check']));
    expect(result.data[0]?.draftFindings[0]).toContain('Draft');
    expect(result.data[0]?.decisionBoundary).toBe('draft_preliminary_only');
  });

  it('filters certification register by readiness without issuing certification decisions', () => {
    const service = new Release3BusinessFoundation();
    const result = service.listCertificationRegister(certificationActor, defaultTenantScope, { readinessStatus: 'data_gap' });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]?.certificationStatus).toBe('evidence_gap');
    expect(result.data[0]?.submissionLogStatus).toBe('not_started');
    expect(result.data[0]?.decisionBoundary).toBe('draft_preliminary_only');
  });

  it('tracks evidence checklist gaps and reusable document references', () => {
    const service = new Release3BusinessFoundation();
    const result = service.listEvidenceChecklists(release0PlatformAdmin, defaultTenantScope, { evidenceStatus: 'gap_found' });

    expect(result.data.length).toBeGreaterThanOrEqual(2);
    expect(result.data[0]?.items.some((item) => item.reuseAllowed && item.documentCode === 'DOC-ASSET-REG-001')).toBe(true);
    expect(result.data.every((item) => item.gapCount > 0)).toBe(true);
  });

  it('builds an evidence pack preview that remains not ready when required evidence is missing', () => {
    const service = new Release3BusinessFoundation();
    const result = service.buildEvidencePack(release0PlatformAdmin, defaultTenantScope, {
      ...defaultTenantScope,
      contextType: 'inspection',
      contextId: 'inspection-due-v-001-statutory-2026',
      checklistId: 'checklist-inspection-v-001',
      sourceBasis: 'R3-09 test source basis'
    });

    expect(result.data.evidencePack.status).toBe('completeness_check');
    expect(result.data.evidencePack.exportReadyStatus).toBe('not_ready');
    expect(result.data.evidencePack.missingItemCount).toBe(1);
    expect(result.data.auditEvent.decisionBoundary).toBe('draft_preliminary_only');
  });

  it('creates business KPI cards that route dashboard users into action lists', () => {
    const service = new Release3BusinessFoundation();
    const result = service.listBusinessKpis(release0PlatformAdmin, defaultTenantScope);

    expect(result.data.map((card) => card.id)).toEqual(expect.arrayContaining(['inspection_overdue', 'certification_due', 'evidence_gaps', 'workpack_pending_review']));
    expect(result.data.every((card) => card.routeHint.startsWith('/business/'))).toBe(true);
    expect(result.data.every((card) => card.decisionBoundary === 'draft_preliminary_only')).toBe(true);
  });
});
