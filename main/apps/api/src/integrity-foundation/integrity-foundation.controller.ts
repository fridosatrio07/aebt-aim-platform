import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { defaultTenantScope, type TenantScope } from '@aim-platform/shared';
import { IntegrityFoundationService } from './integrity-foundation.service.js';

@Controller('integrity')
export class IntegrityFoundationController {
  constructor(private readonly integrityFoundation: IntegrityFoundationService) {}

  @Get('rbi-candidates')
  rbiCandidates(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.integrityFoundation.listRbiCandidates(this.scopeFromHeaders(headers), query);
  }

  @Get('rbi-candidates/:id')
  rbiCandidateDetail(@Headers() headers: Record<string, string | string[] | undefined>, @Param('id') id: string) {
    return this.integrityFoundation.getRbiCandidate(this.scopeFromHeaders(headers), id);
  }

  @Get('assessments')
  assessments(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.integrityFoundation.listAssessments(this.scopeFromHeaders(headers), query);
  }

  @Get('assessments/:id')
  assessmentDetail(@Headers() headers: Record<string, string | string[] | undefined>, @Param('id') id: string) {
    return this.integrityFoundation.getAssessment(this.scopeFromHeaders(headers), id);
  }

  @Get('assessments/:assessmentId/operating-data')
  operatingData(@Headers() headers: Record<string, string | string[] | undefined>, @Param('assessmentId') assessmentId: string) {
    return this.integrityFoundation.listOperatingData(this.scopeFromHeaders(headers), assessmentId);
  }

  @Get('assessments/:assessmentId/damage-mechanisms')
  damageMechanisms(@Headers() headers: Record<string, string | string[] | undefined>, @Param('assessmentId') assessmentId: string) {
    return this.integrityFoundation.listDamageMechanisms(this.scopeFromHeaders(headers), assessmentId);
  }

  @Get('assessments/:assessmentId/pof-cof-helper')
  pofCofHelper(@Headers() headers: Record<string, string | string[] | undefined>, @Param('assessmentId') assessmentId: string) {
    return this.integrityFoundation.getPofCofHelper(this.scopeFromHeaders(headers), assessmentId);
  }

  @Get('assessments/:assessmentId/risk-ranking')
  riskRanking(@Headers() headers: Record<string, string | string[] | undefined>, @Param('assessmentId') assessmentId: string) {
    return this.integrityFoundation.getRiskRanking(this.scopeFromHeaders(headers), assessmentId);
  }

  @Post('assessments/:assessmentId/submit-review')
  submitForReview(@Headers() headers: Record<string, string | string[] | undefined>, @Param('assessmentId') assessmentId: string) {
    return this.integrityFoundation.submitForReview(this.scopeFromHeaders(headers), assessmentId);
  }

  @Post('assessments/:assessmentId/approve')
  approveAssessment(@Headers() headers: Record<string, string | string[] | undefined>, @Param('assessmentId') assessmentId: string) {
    return this.integrityFoundation.approveAssessment(this.scopeFromHeaders(headers), assessmentId);
  }

  @Post('assessments/:assessmentId/reject')
  rejectAssessment(
    @Headers() headers: Record<string, string | string[] | undefined>,
    @Param('assessmentId') assessmentId: string,
    @Body() body: { reason: string }
  ) {
    return this.integrityFoundation.rejectAssessment(this.scopeFromHeaders(headers), assessmentId, body.reason);
  }

  @Get('assessments/:assessmentId/risk-register')
  riskRegisterItems(@Headers() headers: Record<string, string | string[] | undefined>, @Param('assessmentId') assessmentId: string) {
    return this.integrityFoundation.listRiskRegisterItems(this.scopeFromHeaders(headers), assessmentId);
  }

  @Get('integrity-audit-events')
  auditEvents(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.integrityFoundation.auditEvents(this.scopeFromHeaders(headers));
  }

  private scopeFromHeaders(headers: Record<string, string | string[] | undefined>): TenantScope {
    const read = (name: string): string | undefined => {
      const value = headers[name] ?? headers[name.toLowerCase()];
      return Array.isArray(value) ? value[0] : value;
    };
    return this.integrityFoundation.normalizeScope({
      tenantId: read('x-tenant-id') ?? defaultTenantScope.tenantId,
      projectId: read('x-project-id') ?? defaultTenantScope.projectId,
      siteId: read('x-site-id') ?? defaultTenantScope.siteId
    });
  }
}