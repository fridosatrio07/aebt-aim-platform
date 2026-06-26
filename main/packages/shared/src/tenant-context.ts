import type { TenantScope } from './types.js';

export const defaultTenantScope: Required<TenantScope> = {
  tenantId: 'tenant-spm-01',
  projectId: 'project-spm-01',
  siteId: 'site-spm-01'
};

export function normalizeTenantScope(scope: TenantScope): TenantScope {
  if (!scope.tenantId || scope.tenantId.trim().length === 0) {
    throw new Error('tenantId is required for every scoped request');
  }
  const normalized: TenantScope = { tenantId: scope.tenantId.trim() };
  const projectId = scope.projectId?.trim();
  const siteId = scope.siteId?.trim();
  if (projectId) normalized.projectId = projectId;
  if (siteId) normalized.siteId = siteId;
  return normalized;
}

export function assertSameTenant(requested: TenantScope, actor: TenantScope): void {
  const normalizedRequested = normalizeTenantScope(requested);
  const normalizedActor = normalizeTenantScope(actor);
  if (normalizedRequested.tenantId !== normalizedActor.tenantId) {
    throw new Error('Tenant isolation violation: requested tenant is outside actor scope');
  }
  if (normalizedRequested.projectId && normalizedActor.projectId && normalizedRequested.projectId !== normalizedActor.projectId) {
    throw new Error('Project isolation violation: requested project is outside actor scope');
  }
  if (normalizedRequested.siteId && normalizedActor.siteId && normalizedRequested.siteId !== normalizedActor.siteId) {
    throw new Error('Site isolation violation: requested site is outside actor scope');
  }
}

export function scopeKey(scope: TenantScope): string {
  const s = normalizeTenantScope(scope);
  return [s.tenantId, s.projectId ?? '*', s.siteId ?? '*'].join(':');
}
