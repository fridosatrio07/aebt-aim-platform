import { describe, expect, it } from 'vitest';
import {
  defaultTenantScope,
  Release4IntegrityFoundation,
  type ActorContext
} from '../src/index.js';

const rbiEngineerActor: ActorContext = {
  actorId: 'actor-rbi-engineer',
  displayName: 'RBI Engineer',
  roles: ['rbi_engineer'],
  scope: defaultTenantScope
};

const platformAdminActor: ActorContext = {
  actorId: 'actor-platform-admin',
  displayName: 'Platform Admin',
  roles: ['platform_administrator'],
  scope: defaultTenantScope
};

describe('Release 4 integrity foundation', () => {
  it('lists RBI candidates with draft/preliminary boundaries', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.listRbiCandidates(rbiEngineerActor, defaultTenantScope, { rbiCandidateStatus: 'assessment_in_progress' });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]?.status).toBe('assessment_in_progress');
    expect(result.data[0]?.decisionBoundary).toBe('draft_preliminary_only');
    expect(result.data[0]?.nextAction.toLowerCase()).toContain('assessment');
  });

  it('blocks Release 4 reads outside actor tenant scope', () => {
    const service = new Release4IntegrityFoundation();

    expect(() => service.listRbiCandidates(rbiEngineerActor, { tenantId: 'other-tenant' })).toThrow(/Tenant isolation/);
  });

  it('gets RBI candidate detail with scoping basis', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.getRbiCandidate(platformAdminActor, defaultTenantScope, 'rbi-cand-v-001');

    expect(result.data.equipmentTag).toBe('V-001');
    expect(result.data.scopingBasis).toBe('criticality');
    expect(result.data.decisionBoundary).toBe('draft_preliminary_only');
  });

  it('lists assessments with methodology status TBD SME', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.listAssessments(rbiEngineerActor, defaultTenantScope, { assessmentStatus: 'data_gathering' });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]?.methodologyStatus).toBe('tbd_sme_approval');
    expect(result.data[0]?.decisionBoundary).toBe('draft_preliminary_only');
  });

  it('lists operating data for an assessment', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.listOperatingData(rbiEngineerActor, defaultTenantScope, 'rbi-assess-v-001');

    expect(result.data.length).toBeGreaterThanOrEqual(2);
    expect(result.data.every((item) => item.decisionBoundary === 'draft_preliminary_only')).toBe(true);
  });

  it('lists damage mechanism placeholders requiring SME input', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.listDamageMechanisms(rbiEngineerActor, defaultTenantScope, 'rbi-assess-v-001');

    expect(result.data.length).toBeGreaterThanOrEqual(1);
    expect(result.data.every((item) => item.susceptible === 'tbd_sme')).toBe(true);
    expect(result.data.every((item) => item.status === 'placeholder_sme_input')).toBe(true);
  });

  it('returns PoF/CoF helper with draft status and methodology TBD', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.getPofCofHelper(rbiEngineerActor, defaultTenantScope, 'rbi-assess-v-001');

    expect(result.data).not.toBeNull();
    expect(result.data?.pofResult).toBe('tbd_sme');
    expect(result.data?.pofMethodologyRef).toContain('TBD');
    expect(result.data?.status).toBe('draft_helper');
  });

  it('returns preliminary risk ranking with TBD risk level', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.getRiskRanking(rbiEngineerActor, defaultTenantScope, 'rbi-assess-v-001');

    expect(result.data).not.toBeNull();
    expect(result.data?.overallRiskLevel).toBe('tbd_sme');
    expect(result.data?.status).toBe('draft_ranking');
  });

  it('submits assessment for review and blocks final decision', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.submitForReview(rbiEngineerActor, defaultTenantScope, 'rbi-assess-p-101');

    expect(result.data.assessment.status).toBe('pending_review');
    expect(result.data.auditEvent.action).toBe('review');
    expect(result.data.auditEvent.decisionBoundary).toBe('draft_preliminary_only');
  });

  it('approves assessment as preliminary (not final)', () => {
    const service = new Release4IntegrityFoundation();
    // First submit for review
    service.submitForReview(rbiEngineerActor, defaultTenantScope, 'rbi-assess-p-101');
    // Then approve
    const result = service.approveAssessment(platformAdminActor, defaultTenantScope, 'rbi-assess-p-101');

    expect(result.data.assessment.status).toBe('approved_preliminary');
    expect(result.data.auditEvent.action).toBe('approve');
    expect(result.data.assessment.decisionBoundary).toBe('draft_preliminary_only');
  });

  it('rejects assessment back to data gathering state', () => {
    const service = new Release4IntegrityFoundation();
    // Use the other assessment that starts in draft
    const submitResult = service.submitForReview(rbiEngineerActor, defaultTenantScope, 'rbi-assess-p-101');
    expect(submitResult.data.assessment.status).toBe('pending_review');

    const result = service.rejectAssessment(platformAdminActor, defaultTenantScope, 'rbi-assess-p-101', 'Insufficient operating data');

    expect(result.data.assessment.status).toBe('data_gathering');
    expect(result.data.auditEvent.action).toBe('reject');
  });

  it('lists risk register items linked to an assessment', () => {
    const service = new Release4IntegrityFoundation();
    const result = service.listRiskRegisterItems(platformAdminActor, defaultTenantScope, 'rbi-assess-v-001');

    expect(result.data.length).toBeGreaterThanOrEqual(1);
    expect(result.data[0]?.category).toBe('safety');
    expect(result.data.every((item) => item.decisionBoundary === 'draft_preliminary_only')).toBe(true);
  });
});