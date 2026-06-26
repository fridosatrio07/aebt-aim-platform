import { ok, pagination, type ApiSuccess, type PaginationInput } from './api.js';
import { buildAuditEvent, InMemoryAuditSink } from './audit.js';
import { assertNotFinalDecision, hasPermission, type Permission } from './rbac.js';
import { assertSameTenant, defaultTenantScope } from './tenant-context.js';
import type { ActorContext, AuditEvent, TenantScope } from './types.js';

export type DataQualityStatus = 'draft' | 'imported' | 'pending_validation' | 'data_gap' | 'validated' | 'limited_basis';
export type ReviewStatus = 'draft' | 'pending_validation' | 'in_review' | 'approved_baseline' | 'rejected' | 'needs_revision';
export type DocumentStatus = 'draft' | 'controlled' | 'approved' | 'superseded' | 'archived' | 'rejected';
export type ConfidentialityLevel = 'public_internal' | 'restricted' | 'confidential';
export type ImportStatus = 'uploaded' | 'mapped' | 'validation_failed' | 'pending_approval' | 'baseline_approved' | 'rejected';
export type ImportRowStatus = 'pending_validation' | 'valid' | 'data_gap' | 'duplicate_candidate' | 'rejected';
export type ValidationIssueSeverity = 'info' | 'warning' | 'error';
export type ValidationIssueStatus = 'open' | 'accepted_with_limitation' | 'resolved' | 'rejected';
export type ImportObjectType = 'asset_registry' | 'document_metadata';

export interface AssetHierarchyPath {
  facilityCode: string;
  systemCode: string;
  subsystemCode: string;
  equipmentTag: string;
}

export interface AssetRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  facilityCode: string;
  systemCode: string;
  subsystemCode: string;
  equipmentTag: string;
  equipmentName: string;
  equipmentType: string;
  service: string;
  componentCount: number;
  cmlTmlCount: number;
  documentCount: number;
  pendingValidationIssues: number;
  dataQualityStatus: DataQualityStatus;
  reviewStatus: ReviewStatus;
  sourceBasis: string;
  updatedAt: string;
}

export interface AssetComponentRecord {
  id: string;
  equipmentId: string;
  componentTag: string;
  componentType: string;
  material: string;
  dataQualityStatus: DataQualityStatus;
  sourceBasis: string;
}

export interface CmlTmlPointRecord {
  id: string;
  equipmentId: string;
  componentId?: string;
  pointCode: string;
  locationDescription: string;
  dataQualityStatus: DataQualityStatus;
  sourceBasis: string;
}

export interface AssetDetail extends AssetRecord {
  hierarchy: AssetHierarchyPath;
  components: AssetComponentRecord[];
  cmlTmlPoints: CmlTmlPointRecord[];
  linkedDocuments: DocumentLinkSummary[];
  pendingReviewSummary: string[];
  modulePlaceholders: Array<{ module: string; status: string }>;
  auditSummary: string[];
}

export interface DocumentVersionRecord {
  id: string;
  documentId: string;
  versionNumber: number;
  fileName: string;
  mimeType: string;
  objectKey: string;
  sizeBytes: number;
  checksum?: string;
  status: DocumentStatus;
  uploadedBy: string;
  uploadedAt: string;
}

export interface DocumentRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  documentCode: string;
  title: string;
  documentType: string;
  status: DocumentStatus;
  confidentiality: ConfidentialityLevel;
  sourceBasis: string;
  currentVersion: number;
  linkedObjectCount: number;
  updatedAt: string;
  versions: DocumentVersionRecord[];
}

export interface DocumentLinkSummary {
  documentId: string;
  documentCode: string;
  title: string;
  linkedObjectType: string;
  linkedObjectId: string;
  relationship: string;
  evidenceUse: 'draft_support' | 'validation_support' | 'controlled_reference';
}

export interface DocumentUploadRequest {
  tenantId: string;
  projectId: string;
  siteId: string;
  documentCode: string;
  title: string;
  documentType: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  sourceBasis: string;
  confidentiality?: ConfidentialityLevel;
}

export interface DocumentUploadIntent {
  documentId: string;
  versionId: string;
  storageProvider: 's3_compatible';
  bucket: string;
  objectKey: string;
  uploadMode: 'metadata_validated_object_key';
  requiredMetadata: string[];
  auditEvent: AuditEvent;
  decisionBoundary: 'draft_preliminary_only';
}

export interface ImportBatchRecord {
  id: string;
  tenantId: string;
  projectId: string;
  siteId: string;
  importType: ImportObjectType;
  sourceFileName: string;
  status: ImportStatus;
  rowCount: number;
  issueCount: number;
  sourceBasis: string;
  createdBy: string;
  createdAt: string;
}

export interface ImportRowRecord {
  id: string;
  batchId: string;
  rowNumber: number;
  rawPayload: Record<string, string>;
  mappedPayload: Partial<AssetHierarchyPath> & Record<string, string | undefined>;
  status: ImportRowStatus;
  duplicateCandidateKey?: string;
}

export interface ValidationIssueRecord {
  id: string;
  batchId: string;
  rowId: string;
  rowNumber: number;
  severity: ValidationIssueSeverity;
  code: string;
  field: string;
  message: string;
  status: ValidationIssueStatus;
}

export interface ValidationQueueItem {
  id: string;
  batchId: string;
  rowNumber: number;
  objectType: ImportObjectType;
  severity: ValidationIssueSeverity;
  issueCode: string;
  field: string;
  message: string;
  status: ValidationIssueStatus;
  sourceFileName: string;
  assigneeRole: string;
  baselineWriteBlocked: boolean;
}

export interface ImportParseRequest {
  tenantId: string;
  projectId: string;
  siteId: string;
  sourceFileName: string;
  importType: ImportObjectType;
  sourceBasis: string;
  content?: string;
  rows?: Record<string, string>[];
  format?: 'csv' | 'tsv' | 'excel_rows';
  delimiter?: ',' | ';' | '\t';
}

export interface ImportParseResult {
  batch: ImportBatchRecord;
  rows: ImportRowRecord[];
  issues: ValidationIssueRecord[];
  auditEvent: AuditEvent;
  baselineWriteBlocked: true;
}

export interface ListQuery extends PaginationInput {
  search?: string;
  status?: string;
  sort?: 'equipmentTag' | 'updatedAt' | 'documentCode' | 'title';
  direction?: 'asc' | 'desc';
}

interface Release1Dataset {
  assets: AssetDetail[];
  documents: DocumentRecord[];
  documentLinks: DocumentLinkSummary[];
  importBatches: ImportBatchRecord[];
  importRows: ImportRowRecord[];
  validationIssues: ValidationIssueRecord[];
}

const sourceBasis = 'Data Model Pack/PRD URS/UI UX Design Pack/Addendum MVP+ Rev. 1';
const now = '2026-06-26T00:00:00.000Z';

export const release1Dataset: Release1Dataset = {
  assets: [
    {
      id: 'asset-eq-spm-01-v-001',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      facilityCode: 'FAC-SPM-01',
      systemCode: 'SYS-PROCESS',
      subsystemCode: 'SUB-PIPING',
      equipmentTag: 'V-001',
      equipmentName: 'Demo Pressure Vessel V-001',
      equipmentType: 'Pressure Vessel',
      service: 'Demo process service',
      componentCount: 2,
      cmlTmlCount: 4,
      documentCount: 2,
      pendingValidationIssues: 1,
      dataQualityStatus: 'pending_validation',
      reviewStatus: 'pending_validation',
      sourceBasis,
      updatedAt: now,
      hierarchy: {
        facilityCode: 'FAC-SPM-01',
        systemCode: 'SYS-PROCESS',
        subsystemCode: 'SUB-PIPING',
        equipmentTag: 'V-001'
      },
      components: [
        {
          id: 'component-v-001-shell',
          equipmentId: 'asset-eq-spm-01-v-001',
          componentTag: 'V-001-SHELL',
          componentType: 'Shell',
          material: 'TBD',
          dataQualityStatus: 'data_gap',
          sourceBasis
        },
        {
          id: 'component-v-001-head',
          equipmentId: 'asset-eq-spm-01-v-001',
          componentTag: 'V-001-HEAD',
          componentType: 'Head',
          material: 'TBD',
          dataQualityStatus: 'data_gap',
          sourceBasis
        }
      ],
      cmlTmlPoints: [
        {
          id: 'cml-v-001-001',
          equipmentId: 'asset-eq-spm-01-v-001',
          componentId: 'component-v-001-shell',
          pointCode: 'CML-001',
          locationDescription: 'Shell course demo point',
          dataQualityStatus: 'pending_validation',
          sourceBasis
        },
        {
          id: 'cml-v-001-002',
          equipmentId: 'asset-eq-spm-01-v-001',
          componentId: 'component-v-001-head',
          pointCode: 'CML-002',
          locationDescription: 'Head demo point',
          dataQualityStatus: 'pending_validation',
          sourceBasis
        }
      ],
      linkedDocuments: [
        {
          documentId: 'doc-spm-01-asset-register',
          documentCode: 'DOC-ASSET-REG-001',
          title: 'SPM-01 Demo Asset Register Extract',
          linkedObjectType: 'equipment',
          linkedObjectId: 'asset-eq-spm-01-v-001',
          relationship: 'source_register',
          evidenceUse: 'validation_support'
        },
        {
          documentId: 'doc-spm-01-drawing',
          documentCode: 'DOC-DWG-001',
          title: 'SPM-01 Demo Piping and Vessel Drawing',
          linkedObjectType: 'equipment',
          linkedObjectId: 'asset-eq-spm-01-v-001',
          relationship: 'reference_drawing',
          evidenceUse: 'draft_support'
        }
      ],
      pendingReviewSummary: ['Material basis requires SME review', 'Parent hierarchy imported and pending validation'],
      modulePlaceholders: [
        { module: 'Inspection', status: 'Release 3 placeholder only' },
        { module: 'Certification', status: 'Release 3 placeholder only' },
        { module: 'RBI/Risk', status: 'Release 4 placeholder only' }
      ],
      auditSummary: ['Created from staged demo import', 'No final technical decision recorded']
    },
    {
      id: 'asset-eq-spm-01-p-101',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      facilityCode: 'FAC-SPM-01',
      systemCode: 'SYS-UTILITY',
      subsystemCode: 'SUB-PUMPING',
      equipmentTag: 'P-101',
      equipmentName: 'Demo Transfer Pump P-101',
      equipmentType: 'Pump',
      service: 'Demo utility service',
      componentCount: 1,
      cmlTmlCount: 0,
      documentCount: 1,
      pendingValidationIssues: 0,
      dataQualityStatus: 'validated',
      reviewStatus: 'in_review',
      sourceBasis,
      updatedAt: now,
      hierarchy: {
        facilityCode: 'FAC-SPM-01',
        systemCode: 'SYS-UTILITY',
        subsystemCode: 'SUB-PUMPING',
        equipmentTag: 'P-101'
      },
      components: [
        {
          id: 'component-p-101-casing',
          equipmentId: 'asset-eq-spm-01-p-101',
          componentTag: 'P-101-CASING',
          componentType: 'Casing',
          material: 'TBD',
          dataQualityStatus: 'limited_basis',
          sourceBasis
        }
      ],
      cmlTmlPoints: [],
      linkedDocuments: [
        {
          documentId: 'doc-spm-01-asset-register',
          documentCode: 'DOC-ASSET-REG-001',
          title: 'SPM-01 Demo Asset Register Extract',
          linkedObjectType: 'equipment',
          linkedObjectId: 'asset-eq-spm-01-p-101',
          relationship: 'source_register',
          evidenceUse: 'validation_support'
        }
      ],
      pendingReviewSummary: ['Rotating equipment detail remains limited basis'],
      modulePlaceholders: [
        { module: 'Inspection', status: 'Release 3 placeholder only' },
        { module: 'Certification', status: 'Release 3 placeholder only' },
        { module: 'RBI/Risk', status: 'Release 4 placeholder only' }
      ],
      auditSummary: ['Controlled baseline write not performed by import parser']
    }
  ],
  documents: [
    {
      id: 'doc-spm-01-asset-register',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      documentCode: 'DOC-ASSET-REG-001',
      title: 'SPM-01 Demo Asset Register Extract',
      documentType: 'Asset register',
      status: 'controlled',
      confidentiality: 'restricted',
      sourceBasis,
      currentVersion: 1,
      linkedObjectCount: 2,
      updatedAt: now,
      versions: [
        {
          id: 'docver-spm-01-asset-register-v1',
          documentId: 'doc-spm-01-asset-register',
          versionNumber: 1,
          fileName: 'spm-01-demo-asset-register.csv',
          mimeType: 'text/csv',
          objectKey: 'tenant-spm-01/project-spm-01/site-spm-01/doc-spm-01-asset-register/v1/spm-01-demo-asset-register.csv',
          sizeBytes: 1824,
          status: 'controlled',
          uploadedBy: 'agent-release-1',
          uploadedAt: now
        }
      ]
    },
    {
      id: 'doc-spm-01-drawing',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      documentCode: 'DOC-DWG-001',
      title: 'SPM-01 Demo Piping and Vessel Drawing',
      documentType: 'Drawing',
      status: 'draft',
      confidentiality: 'confidential',
      sourceBasis,
      currentVersion: 1,
      linkedObjectCount: 1,
      updatedAt: now,
      versions: [
        {
          id: 'docver-spm-01-drawing-v1',
          documentId: 'doc-spm-01-drawing',
          versionNumber: 1,
          fileName: 'spm-01-demo-drawing.pdf',
          mimeType: 'application/pdf',
          objectKey: 'tenant-spm-01/project-spm-01/site-spm-01/doc-spm-01-drawing/v1/spm-01-demo-drawing.pdf',
          sizeBytes: 4096,
          status: 'draft',
          uploadedBy: 'agent-release-1',
          uploadedAt: now
        }
      ]
    }
  ],
  documentLinks: [],
  importBatches: [
    {
      id: 'import-spm-01-assets-001',
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      importType: 'asset_registry',
      sourceFileName: 'spm-01-demo-asset-register.csv',
      status: 'validation_failed',
      rowCount: 3,
      issueCount: 2,
      sourceBasis,
      createdBy: 'agent-release-1',
      createdAt: now
    }
  ],
  importRows: [
    {
      id: 'import-row-spm-01-1',
      batchId: 'import-spm-01-assets-001',
      rowNumber: 1,
      rawPayload: {
        facilityCode: 'FAC-SPM-01',
        systemCode: 'SYS-PROCESS',
        subsystemCode: 'SUB-PIPING',
        equipmentTag: 'V-001',
        equipmentName: 'Demo Pressure Vessel V-001',
        sourceBasis
      },
      mappedPayload: {
        facilityCode: 'FAC-SPM-01',
        systemCode: 'SYS-PROCESS',
        subsystemCode: 'SUB-PIPING',
        equipmentTag: 'V-001'
      },
      status: 'duplicate_candidate',
      duplicateCandidateKey: 'V-001'
    },
    {
      id: 'import-row-spm-01-2',
      batchId: 'import-spm-01-assets-001',
      rowNumber: 2,
      rawPayload: {
        facilityCode: '',
        systemCode: 'SYS-UTILITY',
        subsystemCode: 'SUB-PUMPING',
        equipmentTag: 'P-101',
        equipmentName: 'Demo Transfer Pump P-101',
        sourceBasis
      },
      mappedPayload: {
        facilityCode: '',
        systemCode: 'SYS-UTILITY',
        subsystemCode: 'SUB-PUMPING',
        equipmentTag: 'P-101'
      },
      status: 'data_gap'
    }
  ],
  validationIssues: [
    {
      id: 'issue-spm-01-duplicate-v001',
      batchId: 'import-spm-01-assets-001',
      rowId: 'import-row-spm-01-1',
      rowNumber: 1,
      severity: 'warning',
      code: 'duplicate_candidate',
      field: 'equipmentTag',
      message: 'Equipment tag matches an existing staged/baseline candidate and requires reviewer confirmation.',
      status: 'open'
    },
    {
      id: 'issue-spm-01-missing-facility',
      batchId: 'import-spm-01-assets-001',
      rowId: 'import-row-spm-01-2',
      rowNumber: 2,
      severity: 'error',
      code: 'missing_parent',
      field: 'facilityCode',
      message: 'Facility code is required before this row can be promoted from staging.',
      status: 'open'
    }
  ]
};

release1Dataset.documentLinks = release1Dataset.assets.flatMap((asset) => asset.linkedDocuments);

const requiredUploadMetadata = ['tenantId', 'projectId', 'siteId', 'documentCode', 'title', 'documentType', 'fileName', 'mimeType', 'sizeBytes', 'sourceBasis'];
const assetImportHeaders = ['facilityCode', 'systemCode', 'subsystemCode', 'equipmentTag', 'equipmentName', 'sourceBasis'];

export class Release1DataFoundation {
  private readonly auditSink = new InMemoryAuditSink();

  constructor(private readonly dataset: Release1Dataset = release1Dataset) {}

  listAssets(actor: ActorContext, scope: TenantScope, query: ListQuery = {}): ApiSuccess<AssetRecord[]> {
    this.requirePermission(actor, scope, 'asset.read');
    const records = this.dataset.assets.map((asset) => this.toAssetRecord(asset));
    const filtered = this.filterAssets(records, query);
    const sorted = this.sortAssets(filtered, query);
    const page = pagination(query, sorted.length);
    const paged = sorted.slice((page.page - 1) * page.pageSize, page.page * page.pageSize);
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'asset_registry', objectId: 'list', sourceBasis: 'R1-02' }));
    return ok(paged, { requestId: 'r1-assets-list', tenant: scope, pagination: page });
  }

  getAssetDetail(actor: ActorContext, scope: TenantScope, assetId: string): ApiSuccess<AssetDetail> {
    this.requirePermission(actor, scope, 'asset.read');
    const asset = this.dataset.assets.find((item) => item.id === assetId && item.tenantId === scope.tenantId);
    if (!asset) {
      throw new Error('Asset not found inside requested tenant scope');
    }
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'asset_detail', objectId: assetId, sourceBasis: 'R1-04' }));
    return ok(asset, { requestId: 'r1-asset-detail', tenant: scope });
  }

  listDocuments(actor: ActorContext, scope: TenantScope, query: ListQuery = {}): ApiSuccess<DocumentRecord[]> {
    this.requirePermission(actor, scope, 'document.read');
    const scoped = this.dataset.documents.filter((document) => document.tenantId === scope.tenantId);
    const search = query.search?.trim().toLowerCase();
    const filtered = scoped.filter((document) => {
      const statusMatches = !query.status || document.status === query.status;
      const searchMatches = !search || [document.documentCode, document.title, document.documentType].some((value) => value.toLowerCase().includes(search));
      return statusMatches && searchMatches;
    });
    const sorted = this.sortDocuments(filtered, query);
    const page = pagination(query, sorted.length);
    const paged = sorted.slice((page.page - 1) * page.pageSize, page.page * page.pageSize);
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'document_repository', objectId: 'list', sourceBasis: 'R1-07' }));
    return ok(paged, { requestId: 'r1-documents-list', tenant: scope, pagination: page });
  }

  createDocumentUploadIntent(actor: ActorContext, scope: TenantScope, request: DocumentUploadRequest): ApiSuccess<DocumentUploadIntent> {
    this.requirePermission(actor, scope, 'document.upload');
    assertSameTenant(request, scope);
    const missing = requiredUploadMetadata.filter((field) => {
      const value = request[field as keyof DocumentUploadRequest];
      return value === undefined || value === null || `${value}`.trim().length === 0;
    });
    if (missing.length > 0) {
      throw new Error(`Missing document metadata: ${missing.join(', ')}`);
    }
    const documentId = `doc-${request.documentCode.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const versionId = `${documentId}-v1`;
    const objectKey = `${request.tenantId}/${request.projectId}/${request.siteId}/${documentId}/v1/${request.fileName}`;
    const auditEvent = this.auditSink.append(buildAuditEvent({
      actor,
      scope,
      action: 'upload',
      objectType: 'document',
      objectId: documentId,
      sourceBasis: 'R1-06',
      newValue: { documentCode: request.documentCode, title: request.title, status: 'draft' }
    }));
    return ok({
      documentId,
      versionId,
      storageProvider: 's3_compatible',
      bucket: 'aim-platform-documents',
      objectKey,
      uploadMode: 'metadata_validated_object_key',
      requiredMetadata: requiredUploadMetadata,
      auditEvent,
      decisionBoundary: 'draft_preliminary_only'
    }, { requestId: 'r1-document-upload-intent', tenant: scope });
  }

  parseImport(actor: ActorContext, scope: TenantScope, request: ImportParseRequest): ApiSuccess<ImportParseResult> {
    this.requirePermission(actor, scope, 'import.stage');
    assertSameTenant(request, scope);
    assertNotFinalDecision('stage_import_preview');
    const rows = request.rows ?? parseDelimitedRows(request.content ?? '', request.delimiter ?? (request.format === 'tsv' ? '\t' : ','));
    const result = this.createStagedImport(actor, scope, request, rows);
    return ok(result, { requestId: 'r1-import-parse-preview', tenant: scope });
  }

  listValidationQueue(actor: ActorContext, scope: TenantScope, query: ListQuery = {}): ApiSuccess<ValidationQueueItem[]> {
    this.requirePermission(actor, scope, 'validation.review');
    const items = this.dataset.validationIssues
      .filter((issue) => issue.status === 'open')
      .map((issue) => this.toValidationQueueItem(issue));
    const search = query.search?.trim().toLowerCase();
    const filtered = items.filter((item) => !search || [item.issueCode, item.field, item.message, item.sourceFileName].some((value) => value.toLowerCase().includes(search)));
    const page = pagination(query, filtered.length);
    const paged = filtered.slice((page.page - 1) * page.pageSize, page.page * page.pageSize);
    this.auditSink.append(buildAuditEvent({ actor, scope, action: 'read_sensitive', objectType: 'validation_queue', objectId: 'list', sourceBasis: 'R1-10' }));
    return ok(paged, { requestId: 'r1-validation-queue', tenant: scope, pagination: page });
  }

  auditEvents(scope: TenantScope): AuditEvent[] {
    return this.auditSink.list(scope);
  }

  private createStagedImport(actor: ActorContext, scope: TenantScope, request: ImportParseRequest, parsedRows: Record<string, string>[]): ImportParseResult {
    const batchId = `import-${Date.now()}`;
    const rows: ImportRowRecord[] = [];
    const issues: ValidationIssueRecord[] = [];
    const seenTags = new Set(this.dataset.assets.map((asset) => asset.equipmentTag.toLowerCase()));

    parsedRows.forEach((rawPayload, index) => {
      const rowNumber = index + 1;
      const equipmentTag = rawPayload.equipmentTag?.trim() ?? '';
      const mappedPayload = mapAssetImportPayload(rawPayload);
      const rowIssues = validateAssetImportRow(rawPayload, seenTags);
      const status: ImportRowStatus = rowIssues.some((issue) => issue.code === 'missing_required' || issue.code === 'missing_parent')
        ? 'data_gap'
        : rowIssues.some((issue) => issue.code === 'duplicate_candidate')
          ? 'duplicate_candidate'
          : 'valid';
      const row: ImportRowRecord = {
        id: `${batchId}-row-${rowNumber}`,
        batchId,
        rowNumber,
        rawPayload,
        mappedPayload,
        status
      };
      if (equipmentTag && seenTags.has(equipmentTag.toLowerCase())) {
        row.duplicateCandidateKey = equipmentTag;
      }
      rows.push(row);
      for (const issue of rowIssues) {
        issues.push({
          id: `${row.id}-${issue.code}-${issue.field}`,
          batchId,
          rowId: row.id,
          rowNumber,
          severity: issue.severity,
          code: issue.code,
          field: issue.field,
          message: issue.message,
          status: 'open'
        });
      }
      if (equipmentTag) seenTags.add(equipmentTag.toLowerCase());
    });

    const batch: ImportBatchRecord = {
      id: batchId,
      tenantId: scope.tenantId,
      projectId: scope.projectId ?? defaultTenantScope.projectId,
      siteId: scope.siteId ?? defaultTenantScope.siteId,
      importType: request.importType,
      sourceFileName: request.sourceFileName,
      status: issues.length > 0 ? 'validation_failed' : 'mapped',
      rowCount: rows.length,
      issueCount: issues.length,
      sourceBasis: request.sourceBasis,
      createdBy: actor.actorId,
      createdAt: new Date().toISOString()
    };
    const auditEvent = this.auditSink.append(buildAuditEvent({
      actor,
      scope,
      action: 'create',
      objectType: 'import_batch',
      objectId: batchId,
      sourceBasis: 'R1-09',
      newValue: { rowCount: batch.rowCount, issueCount: batch.issueCount, status: batch.status }
    }));
    return { batch, rows, issues, auditEvent, baselineWriteBlocked: true };
  }

  private requirePermission(actor: ActorContext, scope: TenantScope, permission: Permission): void {
    const result = hasPermission(actor, permission, scope);
    if (!result.allowed) {
      throw new Error(result.reason);
    }
  }

  private toAssetRecord(asset: AssetDetail): AssetRecord {
    const {
      hierarchy: _hierarchy,
      components: _components,
      cmlTmlPoints: _cmlTmlPoints,
      linkedDocuments: _linkedDocuments,
      pendingReviewSummary: _pendingReviewSummary,
      modulePlaceholders: _modulePlaceholders,
      auditSummary: _auditSummary,
      ...record
    } = asset;
    return record;
  }

  private filterAssets(records: AssetRecord[], query: ListQuery): AssetRecord[] {
    const search = query.search?.trim().toLowerCase();
    return records.filter((asset) => {
      const scopeMatches = asset.tenantId === defaultTenantScope.tenantId;
      const statusMatches = !query.status || asset.dataQualityStatus === query.status || asset.reviewStatus === query.status;
      const searchMatches = !search || [asset.equipmentTag, asset.equipmentName, asset.facilityCode, asset.systemCode, asset.subsystemCode, asset.equipmentType].some((value) => value.toLowerCase().includes(search));
      return scopeMatches && statusMatches && searchMatches;
    });
  }

  private sortAssets(records: AssetRecord[], query: ListQuery): AssetRecord[] {
    const direction = query.direction === 'desc' ? -1 : 1;
    const key = query.sort === 'updatedAt' ? 'updatedAt' : 'equipmentTag';
    return [...records].sort((a, b) => `${a[key]}`.localeCompare(`${b[key]}`) * direction);
  }

  private sortDocuments(records: DocumentRecord[], query: ListQuery): DocumentRecord[] {
    const direction = query.direction === 'desc' ? -1 : 1;
    const key = query.sort === 'title' ? 'title' : 'documentCode';
    return [...records].sort((a, b) => `${a[key]}`.localeCompare(`${b[key]}`) * direction);
  }

  private toValidationQueueItem(issue: ValidationIssueRecord): ValidationQueueItem {
    const batch = this.dataset.importBatches.find((item) => item.id === issue.batchId);
    return {
      id: issue.id,
      batchId: issue.batchId,
      rowNumber: issue.rowNumber,
      objectType: batch?.importType ?? 'asset_registry',
      severity: issue.severity,
      issueCode: issue.code,
      field: issue.field,
      message: issue.message,
      status: issue.status,
      sourceFileName: batch?.sourceFileName ?? 'unknown',
      assigneeRole: issue.severity === 'error' ? 'document_controller' : 'qc_reviewer',
      baselineWriteBlocked: true
    };
  }
}

export function parseDelimitedRows(content: string, delimiter: ',' | ';' | '\t' = ','): Record<string, string>[] {
  const lines = content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = splitDelimitedLine(lines[0] ?? '', delimiter).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const cells = splitDelimitedLine(line, delimiter);
    return headers.reduce<Record<string, string>>((row, header, index) => {
      row[header] = cells[index]?.trim() ?? '';
      return row;
    }, {});
  });
}

export function mapAssetImportPayload(row: Record<string, string>): Partial<AssetHierarchyPath> & Record<string, string | undefined> {
  return assetImportHeaders.reduce<Partial<AssetHierarchyPath> & Record<string, string | undefined>>((mapped, header) => {
    mapped[header] = row[header]?.trim();
    return mapped;
  }, {});
}

function validateAssetImportRow(row: Record<string, string>, seenEquipmentTags: Set<string>): Array<{ severity: ValidationIssueSeverity; code: string; field: string; message: string }> {
  const issues: Array<{ severity: ValidationIssueSeverity; code: string; field: string; message: string }> = [];
  for (const field of ['equipmentTag', 'equipmentName', 'sourceBasis']) {
    if (!row[field]?.trim()) {
      issues.push({ severity: 'error', code: 'missing_required', field, message: `${field} is required for staged import validation.` });
    }
  }
  for (const field of ['facilityCode', 'systemCode', 'subsystemCode']) {
    if (!row[field]?.trim()) {
      issues.push({ severity: 'error', code: 'missing_parent', field, message: `${field} is required to preserve the asset hierarchy.` });
    }
  }
  const equipmentTag = row.equipmentTag?.trim().toLowerCase();
  if (equipmentTag && seenEquipmentTags.has(equipmentTag)) {
    issues.push({ severity: 'warning', code: 'duplicate_candidate', field: 'equipmentTag', message: 'Equipment tag is a duplicate candidate and requires reviewer confirmation.' });
  }
  return issues;
}

function splitDelimitedLine(line: string, delimiter: ',' | ';' | '\t'): string[] {
  const cells: string[] = [];
  let current = '';
  let quoted = false;
  for (const char of line) {
    if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      cells.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells.map((cell) => cell.replace(/^"|"$/g, '').replace(/""/g, '"'));
}
