import { describe, expect, it } from 'vitest';
import { buildAuditEvent, defaultTenantScope, hasPermission, release0PlatformAdmin, seedSpm01, assertNotFinalDecision } from '../src/index.js';

describe('Release 0 foundation primitives', () => {
  it('allows a platform administrator inside the same tenant scope', () => {
    const result = hasPermission(release0PlatformAdmin, 'tenant.configure', defaultTenantScope);
    expect(result.allowed).toBe(true);
  });

  it('blocks cross-tenant access', () => {
    const result = hasPermission(release0PlatformAdmin, 'tenant.configure', { tenantId: 'other-tenant' });
    expect(result.allowed).toBe(false);
  });

  it('tags audit events as draft/preliminary only', () => {
    const event = buildAuditEvent({ actor: release0PlatformAdmin, scope: defaultTenantScope, action: 'configure', objectType: 'tenant', objectId: seedSpm01.tenant.id, sourceBasis: 'R0-06' });
    expect(event.decisionBoundary).toBe('draft_preliminary_only');
  });

  it('rejects unsupported final decision actions', () => {
    expect(() => assertNotFinalDecision('declare_fit_for_operation')).toThrow(/Unsupported final decision/);
  });
});
