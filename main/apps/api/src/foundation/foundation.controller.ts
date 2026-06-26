import { Controller, Get, Headers } from '@nestjs/common';
import { defaultTenantScope, normalizeTenantScope, type TenantScope } from '@aim-platform/shared';
import { FoundationService } from './foundation.service.js';

@Controller()
export class FoundationController {
  constructor(private readonly foundation: FoundationService) {}

  @Get('healthz')
  health() {
    return this.foundation.getHealth();
  }

  @Get('foundation/context')
  context(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.foundation.getContext(this.scopeFromHeaders(headers));
  }

  @Get('foundation/permissions')
  permissions(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.foundation.getPermissions(this.scopeFromHeaders(headers));
  }

  @Get('foundation/audit-events')
  auditEvents(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.foundation.getAuditEvents(this.scopeFromHeaders(headers));
  }

  private scopeFromHeaders(headers: Record<string, string | string[] | undefined>): TenantScope {
    const read = (name: string): string | undefined => {
      const value = headers[name] ?? headers[name.toLowerCase()];
      return Array.isArray(value) ? value[0] : value;
    };
    return normalizeTenantScope({
      tenantId: read('x-tenant-id') ?? defaultTenantScope.tenantId,
      projectId: read('x-project-id') ?? defaultTenantScope.projectId,
      siteId: read('x-site-id') ?? defaultTenantScope.siteId
    });
  }
}
