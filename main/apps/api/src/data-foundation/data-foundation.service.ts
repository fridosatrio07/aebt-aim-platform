import { Injectable } from '@nestjs/common';
import {
  defaultTenantScope,
  normalizeTenantScope,
  Release1DataFoundation,
  release0PlatformAdmin,
  type ActorContext,
  type DocumentUploadRequest,
  type ImportParseRequest,
  type ListQuery,
  type TenantScope
} from '@aim-platform/shared';

@Injectable()
export class DataFoundationService {
  private readonly dataFoundation = new Release1DataFoundation();

  listAssets(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.dataFoundation.listAssets(this.actor(scope), scope, this.toListQuery(query));
  }

  getAssetDetail(scope: TenantScope, assetId: string) {
    return this.dataFoundation.getAssetDetail(this.actor(scope), scope, assetId);
  }

  listDocuments(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.dataFoundation.listDocuments(this.actor(scope), scope, this.toListQuery(query));
  }

  createDocumentUploadIntent(scope: TenantScope, request: DocumentUploadRequest) {
    return this.dataFoundation.createDocumentUploadIntent(this.actor(scope), scope, request);
  }

  parseImport(scope: TenantScope, request: ImportParseRequest) {
    return this.dataFoundation.parseImport(this.actor(scope), scope, request);
  }

  listValidationQueue(scope: TenantScope, query: Record<string, string | undefined>) {
    return this.dataFoundation.listValidationQueue(this.actor(scope), scope, this.toListQuery(query));
  }

  auditEvents(scope: TenantScope) {
    return this.dataFoundation.auditEvents(scope);
  }

  normalizeScope(input: TenantScope): TenantScope {
    return normalizeTenantScope({
      tenantId: input.tenantId || defaultTenantScope.tenantId,
      projectId: input.projectId || defaultTenantScope.projectId,
      siteId: input.siteId || defaultTenantScope.siteId
    });
  }

  private actor(scope: TenantScope): ActorContext {
    return { ...release0PlatformAdmin, scope: { ...defaultTenantScope, ...scope } };
  }

  private toListQuery(query: Record<string, string | undefined>): ListQuery {
    const listQuery: ListQuery = {};
    if (query.search) listQuery.search = query.search;
    if (query.status) listQuery.status = query.status;
    if (query.sort === 'equipmentTag' || query.sort === 'updatedAt' || query.sort === 'documentCode' || query.sort === 'title') listQuery.sort = query.sort;
    if (query.direction === 'asc' || query.direction === 'desc') listQuery.direction = query.direction;
    const page = Number.parseInt(query.page ?? '', 10);
    const pageSize = Number.parseInt(query.pageSize ?? '', 10);
    if (Number.isFinite(page)) listQuery.page = page;
    if (Number.isFinite(pageSize)) listQuery.pageSize = pageSize;
    return listQuery;
  }
}
