export type TenantId = string;
export type ProjectId = string;
export type SiteId = string;

export type ScopeLevel = 'tenant' | 'project' | 'site';

export interface TenantScope {
  tenantId: TenantId;
  projectId?: ProjectId;
  siteId?: SiteId;
}

export interface ActorContext {
  actorId: string;
  displayName: string;
  roles: string[];
  scope: TenantScope;
}

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'read_sensitive'
  | 'review'
  | 'approve'
  | 'reject'
  | 'request_revision'
  | 'delegate'
  | 'escalate'
  | 'upload'
  | 'export'
  | 'notify'
  | 'configure'
  | 'system_check';

export interface AuditEvent {
  id: string;
  occurredAt: string;
  actorId: string;
  tenantId: string;
  projectId?: string;
  siteId?: string;
  action: AuditAction;
  objectType: string;
  objectId: string;
  sourceBasis: string;
  decisionBoundary: 'draft_preliminary_only';
  previousValue?: unknown;
  newValue?: unknown;
}
