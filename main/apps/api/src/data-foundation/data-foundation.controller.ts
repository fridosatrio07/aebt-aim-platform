import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { defaultTenantScope, type DocumentUploadRequest, type ImportParseRequest, type TenantScope } from '@aim-platform/shared';
import { DataFoundationService } from './data-foundation.service.js';

@Controller('data-foundation')
export class DataFoundationController {
  constructor(private readonly dataFoundation: DataFoundationService) {}

  @Get('assets')
  assets(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.dataFoundation.listAssets(this.scopeFromHeaders(headers), query);
  }

  @Get('assets/:assetId')
  assetDetail(@Headers() headers: Record<string, string | string[] | undefined>, @Param('assetId') assetId: string) {
    return this.dataFoundation.getAssetDetail(this.scopeFromHeaders(headers), assetId);
  }

  @Get('documents')
  documents(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.dataFoundation.listDocuments(this.scopeFromHeaders(headers), query);
  }

  @Post('documents/upload-intent')
  documentUploadIntent(@Headers() headers: Record<string, string | string[] | undefined>, @Body() body: DocumentUploadRequest) {
    return this.dataFoundation.createDocumentUploadIntent(this.scopeFromHeaders(headers), body);
  }

  @Post('imports/parse-preview')
  importParsePreview(@Headers() headers: Record<string, string | string[] | undefined>, @Body() body: ImportParseRequest) {
    return this.dataFoundation.parseImport(this.scopeFromHeaders(headers), body);
  }

  @Get('imports/validation-queue')
  validationQueue(@Headers() headers: Record<string, string | string[] | undefined>, @Query() query: Record<string, string | undefined>) {
    return this.dataFoundation.listValidationQueue(this.scopeFromHeaders(headers), query);
  }

  private scopeFromHeaders(headers: Record<string, string | string[] | undefined>): TenantScope {
    const read = (name: string): string | undefined => {
      const value = headers[name] ?? headers[name.toLowerCase()];
      return Array.isArray(value) ? value[0] : value;
    };
    return this.dataFoundation.normalizeScope({
      tenantId: read('x-tenant-id') ?? defaultTenantScope.tenantId,
      projectId: read('x-project-id') ?? defaultTenantScope.projectId,
      siteId: read('x-site-id') ?? defaultTenantScope.siteId
    });
  }
}
