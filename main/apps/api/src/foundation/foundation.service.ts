import { Injectable } from '@nestjs/common';
import {
  buildAuditEvent,
  defaultTenantScope,
  decisionBoundaryNotice,
  hasPermission,
  InMemoryAuditSink,
  ok,
  release0PlatformAdmin,
  rolePermissions,
  seedSpm01,
  type ActorContext,
  type TenantScope
} from '@aim-platform/shared';

@Injectable()
export class FoundationService {
  private readonly auditSink = new InMemoryAuditSink();

  getHealth() {
    return ok({ status: 'ok', release: '3', decisionBoundary: decisionBoundaryNotice }, { requestId: 'healthz' });
  }

  getContext(scope: TenantScope) {
    const actor = this.actor(scope);
    const permission = hasPermission(actor, 'foundation.read', scope);
    const audit = this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'foundation_context', objectId: 'release-0', sourceBasis: 'R0-04/R0-05/R0-06' }));
    return ok({ scope, permission, audit, seed: seedSpm01, decisionBoundary: decisionBoundaryNotice }, { requestId: 'foundation-context', tenant: scope });
  }

  getPermissions(scope: TenantScope) {
    const actor = this.actor(scope);
    const permission = hasPermission(actor, 'rbac.manage', scope);
    return ok({ allowed: permission.allowed, reason: permission.reason, rolePermissions }, { requestId: 'foundation-permissions', tenant: scope });
  }

  getAuditEvents(scope: TenantScope) {
    const actor = this.actor(scope);
    const permission = hasPermission(actor, 'audit.read', scope);
    return ok({ allowed: permission.allowed, reason: permission.reason, events: this.auditSink.list(scope) }, { requestId: 'foundation-audit', tenant: scope });
  }

  private actor(scope: TenantScope): ActorContext {
    return { ...release0PlatformAdmin, scope: { ...defaultTenantScope, ...scope } };
  }
}

