import type { ActorContext, TenantScope } from './types.js';
import { isProhibitedFinalDecision } from './domain-guardrails.js';
import { assertSameTenant } from './tenant-context.js';

export type Permission =
  | 'tenant.configure'
  | 'user.manage'
  | 'rbac.manage'
  | 'audit.read'
  | 'audit.write'
  | 'ui.shell.view'
  | 'seed.read'
  | 'seed.apply'
  | 'foundation.read'
  | 'foundation.export'
  | 'asset.read'
  | 'asset.write'
  | 'document.read'
  | 'document.upload'
  | 'import.stage'
  | 'validation.review'
  | 'action.read'
  | 'action.manage'
  | 'review.queue.read'
  | 'workflow.transition'
  | 'notification.digest.read'
  | 'dashboard.read'
  | 'export.create'
  | 'export.read'
  | 'inspection.read'
  | 'inspection.manage'
  | 'workpack.read'
  | 'workpack.manage'
  | 'certification.read'
  | 'certification.manage'
  | 'evidence.read'
  | 'evidence.build'
  | 'business.kpi.read'
  | 'rbi.candidate.read'
  | 'rbi.candidate.manage'
  | 'rbi.assessment.read'
  | 'rbi.assessment.manage'
  | 'rbi.assessment.approve'
  | 'rbi.operatingdata.read'
  | 'rbi.damagemechanism.read'
  | 'rbi.pofcof.read'
  | 'rbi.riskranking.read'
  | 'rbi.riskregister.read';

export const rolePermissions: Record<string, Permission[]> = {
  platform_administrator: ['tenant.configure', 'user.manage', 'rbac.manage', 'audit.read', 'audit.write', 'ui.shell.view', 'seed.read', 'seed.apply', 'foundation.read', 'foundation.export', 'asset.read', 'asset.write', 'document.read', 'document.upload', 'import.stage', 'validation.review', 'action.read', 'action.manage', 'review.queue.read', 'workflow.transition', 'notification.digest.read', 'dashboard.read', 'export.create', 'export.read', 'inspection.read', 'inspection.manage', 'workpack.read', 'workpack.manage', 'certification.read', 'certification.manage', 'evidence.read', 'evidence.build', 'business.kpi.read', 'rbi.candidate.read', 'rbi.candidate.manage', 'rbi.assessment.read', 'rbi.assessment.manage', 'rbi.assessment.approve', 'rbi.operatingdata.read', 'rbi.damagemechanism.read', 'rbi.pofcof.read', 'rbi.riskranking.read', 'rbi.riskregister.read'],
  system_administrator: ['tenant.configure', 'audit.read', 'audit.write', 'ui.shell.view', 'foundation.read', 'asset.read', 'document.read', 'validation.review', 'action.read', 'review.queue.read', 'notification.digest.read', 'dashboard.read', 'export.read'],
  inspector: ['ui.shell.view', 'foundation.read', 'audit.write', 'asset.read', 'document.read', 'action.read', 'workflow.transition', 'dashboard.read', 'inspection.read', 'inspection.manage', 'workpack.read', 'workpack.manage', 'evidence.read', 'business.kpi.read'],
  rbi_engineer: ['ui.shell.view', 'foundation.read', 'audit.write', 'asset.read', 'document.read', 'validation.review', 'action.read', 'review.queue.read', 'workflow.transition', 'notification.digest.read', 'dashboard.read', 'export.read', 'rbi.candidate.read', 'rbi.candidate.manage', 'rbi.assessment.read', 'rbi.assessment.manage', 'rbi.operatingdata.read', 'rbi.damagemechanism.read', 'rbi.pofcof.read', 'rbi.riskranking.read', 'rbi.riskregister.read'],
  certification_team: ['ui.shell.view', 'foundation.read', 'audit.write', 'asset.read', 'document.read', 'validation.review', 'action.read', 'review.queue.read', 'workflow.transition', 'notification.digest.read', 'dashboard.read', 'export.read', 'certification.read', 'certification.manage', 'evidence.read', 'evidence.build', 'business.kpi.read'],
  document_controller: ['ui.shell.view', 'foundation.read', 'foundation.export', 'audit.write', 'asset.read', 'document.read', 'document.upload', 'import.stage', 'validation.review', 'action.read', 'action.manage', 'review.queue.read', 'workflow.transition', 'notification.digest.read', 'dashboard.read', 'export.create', 'export.read', 'evidence.read', 'evidence.build', 'workpack.read', 'business.kpi.read'],
  qc_reviewer: ['ui.shell.view', 'foundation.read', 'audit.read', 'audit.write', 'asset.read', 'document.read', 'validation.review', 'action.read', 'review.queue.read', 'workflow.transition', 'notification.digest.read', 'dashboard.read', 'export.read', 'inspection.read', 'workpack.read', 'certification.read', 'evidence.read', 'business.kpi.read', 'rbi.assessment.read', 'rbi.assessment.approve', 'rbi.riskregister.read'],
  legal_reviewer: ['ui.shell.view', 'foundation.read', 'audit.read', 'audit.write', 'document.read', 'validation.review', 'action.read', 'review.queue.read', 'workflow.transition', 'notification.digest.read', 'dashboard.read', 'export.read'],
  management_reviewer: ['ui.shell.view', 'foundation.read', 'audit.read', 'foundation.export', 'asset.read', 'document.read', 'action.read', 'review.queue.read', 'workflow.transition', 'notification.digest.read', 'dashboard.read', 'export.create', 'export.read', 'inspection.read', 'workpack.read', 'certification.read', 'evidence.read', 'business.kpi.read', 'rbi.assessment.read', 'rbi.assessment.approve', 'rbi.riskregister.read'],
  client_user: ['ui.shell.view', 'foundation.read', 'asset.read', 'document.read', 'action.read', 'dashboard.read', 'inspection.read', 'certification.read', 'evidence.read', 'business.kpi.read'],
  auditor_viewer: ['ui.shell.view', 'foundation.read', 'audit.read', 'asset.read', 'document.read', 'action.read', 'review.queue.read', 'dashboard.read', 'export.read', 'inspection.read', 'workpack.read', 'certification.read', 'evidence.read', 'business.kpi.read'],
  helpdesk_support: ['ui.shell.view', 'foundation.read', 'audit.write', 'asset.read', 'document.read', 'action.read', 'action.manage', 'notification.digest.read', 'dashboard.read']
};

export interface PermissionCheck {
  allowed: boolean;
  reason: string;
}

export function hasPermission(actor: ActorContext, permission: Permission, requestedScope: TenantScope): PermissionCheck {
  try {
    assertSameTenant(requestedScope, actor.scope);
  } catch (error) {
    return { allowed: false, reason: error instanceof Error ? error.message : 'scope check failed' };
  }

  const permissions = new Set(actor.roles.flatMap((role) => rolePermissions[role] ?? []));
  if (!permissions.has(permission)) {
    return { allowed: false, reason: `missing permission ${permission}` };
  }
  return { allowed: true, reason: 'allowed by role permission and tenant scope' };
}

export function assertNotFinalDecision(action: string): void {
  if (isProhibitedFinalDecision(action)) {
    throw new Error(`Unsupported final decision action: ${action}`);
  }
}

