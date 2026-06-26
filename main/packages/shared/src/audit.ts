import type { ActorContext, AuditAction, AuditEvent, TenantScope } from './types.js';
import { assertSameTenant } from './tenant-context.js';

export interface BuildAuditEventInput {
  actor: ActorContext;
  scope: TenantScope;
  action: AuditAction;
  objectType: string;
  objectId: string;
  sourceBasis: string;
  previousValue?: unknown;
  newValue?: unknown;
}

export function buildAuditEvent(input: BuildAuditEventInput): AuditEvent {
  assertSameTenant(input.scope, input.actor.scope);
  const event: AuditEvent = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    occurredAt: new Date().toISOString(),
    actorId: input.actor.actorId,
    tenantId: input.scope.tenantId,
    action: input.action,
    objectType: input.objectType,
    objectId: input.objectId,
    sourceBasis: input.sourceBasis,
    decisionBoundary: 'draft_preliminary_only'
  };
  if (input.scope.projectId) event.projectId = input.scope.projectId;
  if (input.scope.siteId) event.siteId = input.scope.siteId;
  if ('previousValue' in input) event.previousValue = input.previousValue;
  if ('newValue' in input) event.newValue = input.newValue;
  return event;
}

export class InMemoryAuditSink {
  private readonly events: AuditEvent[] = [];

  append(event: AuditEvent): AuditEvent {
    this.events.push(event);
    return event;
  }

  list(scope: TenantScope): AuditEvent[] {
    return this.events.filter((event) => event.tenantId === scope.tenantId && (!scope.projectId || event.projectId === scope.projectId) && (!scope.siteId || event.siteId === scope.siteId));
  }
}
