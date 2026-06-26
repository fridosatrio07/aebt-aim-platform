import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import {
  defaultTenantScope,
  type ApprovalTransitionRequest,
  type CreateExportLogRequest,
  type NotificationDigestType,
  type TenantScope
} from '@aim-platform/shared';
import { WorkflowFoundationService } from './workflow-foundation.service.js';

@Controller('workflow')
export class WorkflowFoundationController {
  constructor(private readonly workflowFoundation: WorkflowFoundationService) {}

  @Get('my-work')
  myWork(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.workflowFoundation.listMyWork(this.scopeFromHeaders(headers), query);
  }

  @Get('reviewer-queue')
  reviewerQueue(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.workflowFoundation.listReviewerQueue(this.scopeFromHeaders(headers), query);
  }

  @Post('approval-transition')
  approvalTransition(@Headers() headers: Record<string, string | string[] | undefined>, @Body() body: ApprovalTransitionRequest) {
    return this.workflowFoundation.transitionApproval(this.scopeFromHeaders(headers), body);
  }

  @Get('notification-digest')
  notificationDigest(@Headers() headers: Record<string, string | string[] | undefined>, @Query('digestType') digestType?: NotificationDigestType) {
    return this.workflowFoundation.notificationDigest(this.scopeFromHeaders(headers), digestType);
  }

  @Get('dashboard-actions')
  dashboardActions(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.workflowFoundation.dashboardActions(this.scopeFromHeaders(headers));
  }

  @Post('export-logs')
  createExportLog(@Headers() headers: Record<string, string | string[] | undefined>, @Body() body: CreateExportLogRequest) {
    return this.workflowFoundation.createExportLog(this.scopeFromHeaders(headers), body);
  }

  @Get('export-logs')
  exportLogs(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.workflowFoundation.listExportLogs(this.scopeFromHeaders(headers), query);
  }

  private scopeFromHeaders(headers: Record<string, string | string[] | undefined>): TenantScope {
    const read = (name: string): string | undefined => {
      const value = headers[name] ?? headers[name.toLowerCase()];
      return Array.isArray(value) ? value[0] : value;
    };
    return this.workflowFoundation.normalizeScope({
      tenantId: read('x-tenant-id') ?? defaultTenantScope.tenantId,
      projectId: read('x-project-id') ?? defaultTenantScope.projectId,
      siteId: read('x-site-id') ?? defaultTenantScope.siteId
    });
  }
}
