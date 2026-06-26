import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { defaultTenantScope, type EvidencePackBuildRequest, type TenantScope } from '@aim-platform/shared';
import { BusinessFoundationService } from './business-foundation.service.js';

@Controller('business')
export class BusinessFoundationController {
  constructor(private readonly businessFoundation: BusinessFoundationService) {}

  @Get('inspection-due')
  inspectionDue(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.businessFoundation.listInspectionDue(this.scopeFromHeaders(headers), query);
  }

  @Get('workpacks')
  workpacks(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.businessFoundation.listWorkpacks(this.scopeFromHeaders(headers), query);
  }

  @Get('certifications')
  certifications(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.businessFoundation.listCertifications(this.scopeFromHeaders(headers), query);
  }

  @Get('evidence-checklists')
  evidenceChecklists(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.businessFoundation.listEvidenceChecklists(this.scopeFromHeaders(headers), query);
  }

  @Get('evidence-packs')
  evidencePacks(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.businessFoundation.listEvidencePacks(this.scopeFromHeaders(headers), query);
  }

  @Post('evidence-packs/build-preview')
  buildEvidencePack(@Headers() headers: Record<string, string | string[] | undefined>, @Body() body: EvidencePackBuildRequest) {
    return this.businessFoundation.buildEvidencePack(this.scopeFromHeaders(headers), body);
  }

  @Get('dashboard-kpis')
  dashboardKpis(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.businessFoundation.businessKpis(this.scopeFromHeaders(headers));
  }

  private scopeFromHeaders(headers: Record<string, string | string[] | undefined>): TenantScope {
    const read = (name: string): string | undefined => {
      const value = headers[name] ?? headers[name.toLowerCase()];
      return Array.isArray(value) ? value[0] : value;
    };
    return this.businessFoundation.normalizeScope({
      tenantId: read('x-tenant-id') ?? defaultTenantScope.tenantId,
      projectId: read('x-project-id') ?? defaultTenantScope.projectId,
      siteId: read('x-site-id') ?? defaultTenantScope.siteId
    });
  }
}
