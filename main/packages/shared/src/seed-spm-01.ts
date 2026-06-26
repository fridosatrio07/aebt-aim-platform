import type { ActorContext } from './types.js';
import { defaultTenantScope } from './tenant-context.js';
import { decisionBoundaryNotice } from './domain-guardrails.js';

export const seedSpm01 = {
  seedId: 'SPM-01',
  status: 'dummy_for_release_0_only',
  tenant: { id: defaultTenantScope.tenantId, code: 'SPM', name: 'SPM Dummy Tenant', status: 'active' },
  client: { id: 'client-spm-01', code: 'SPM-CLIENT', name: 'SPM Dummy Client', industrySector: 'pilot_dummy' },
  project: { id: defaultTenantScope.projectId, code: 'SPM-01', name: 'SPM-01 Dummy AIM Pilot Project', status: 'draft_preliminary' },
  site: { id: defaultTenantScope.siteId, code: 'SPM-SITE-01', name: 'SPM Dummy Site 01', status: 'draft_preliminary' },
  roles: Object.freeze([
    'platform_administrator',
    'system_administrator',
    'inspector',
    'rbi_engineer',
    'certification_team',
    'document_controller',
    'qc_reviewer',
    'legal_reviewer',
    'management_reviewer',
    'client_user',
    'auditor_viewer',
    'helpdesk_support'
  ]),
  disclaimer: decisionBoundaryNotice
} as const;

export const release0PlatformAdmin: ActorContext = {
  actorId: 'user-platform-admin-spm-01',
  displayName: 'Release 0 Platform Administrator',
  roles: ['platform_administrator'],
  scope: defaultTenantScope
};
