import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const schema = readFileSync(resolve(root, 'packages/database/prisma/schema.prisma'), 'utf8');

const requiredFoundationModels = ['Tenant', 'Project', 'Site', 'UserProfile', 'Role', 'Permission', 'AuditLog'];
const requiredRelease1Models = ['Facility', 'AssetSystem', 'AssetSubsystem', 'Equipment', 'Component', 'CmlTmlPoint', 'ThicknessReading', 'Document', 'DocumentVersion', 'DocumentLink', 'ImportBatch', 'ImportRow', 'ValidationIssue'];
const requiredRelease2Models = ['ActionItem', 'GenericApprovalWorkflow', 'WorkflowTransition', 'NotificationDigest', 'NotificationDigestItem', 'ExportLog'];
const requiredRelease3Models = ['InspectionDue', 'Workpack', 'WorkpackStep', 'CertificationRegister', 'CertificationChecklistItem', 'CertificationSubmissionLog', 'EvidenceChecklist', 'EvidenceChecklistItem', 'EvidencePack', 'EvidencePackItem', 'BusinessKpiSnapshot'];
const forbiddenRelease4Models = ['RbiAssessment', 'DamageMechanism', 'RiskRankingRecord', 'RiskRegister', 'AnomalyAction', 'RbiCandidateRouting', 'RbiReviewApproval'];

for (const model of [...requiredFoundationModels, ...requiredRelease1Models, ...requiredRelease2Models, ...requiredRelease3Models]) {
  if (!new RegExp(`model\\s+${model}\\b`).test(schema)) {
    console.error(`Missing required Release 3 schema model: ${model}`);
    process.exit(1);
  }
}

const violations = forbiddenRelease4Models.filter((model) => new RegExp(`model\\s+${model}\\b`).test(schema));
if (violations.length > 0) {
  console.error(`Release 3 schema contains out-of-scope later-release models: ${violations.join(', ')}`);
  process.exit(1);
}

for (const enumName of [
  'DataQualityStatus',
  'ReviewStatus',
  'DocumentStatus',
  'ImportStatus',
  'ValidationIssueStatus',
  'ActionModule',
  'ActionPriority',
  'ActionStatus',
  'ApprovalWorkflowStatus',
  'WorkflowTransitionAction',
  'NotificationDigestType',
  'ExportApprovalStatus',
  'InspectionDueStatus',
  'InspectionTrackingStatus',
  'WorkpackStatus',
  'WorkpackStepStatus',
  'CertificationRegisterStatus',
  'CertificationReadinessStatus',
  'EvidenceContextType',
  'EvidenceChecklistStatus',
  'EvidenceChecklistState',
  'EvidencePackStatus',
  'EvidenceExportReadyStatus'
]) {
  if (!new RegExp(`enum\\s+${enumName}\\b`).test(schema)) {
    console.error(`Missing required Release 3 enum: ${enumName}`);
    process.exit(1);
  }
}

console.log('Release 3 migration check passed');
