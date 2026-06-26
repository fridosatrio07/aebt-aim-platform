import { describe, expect, it } from 'vitest';
import {
  defaultTenantScope,
  parseDelimitedRows,
  release0PlatformAdmin,
  Release1DataFoundation
} from '../src/index.js';

describe('Release 1 data and document foundation', () => {
  it('lists tenant-scoped assets with pagination metadata', () => {
    const service = new Release1DataFoundation();
    const result = service.listAssets(release0PlatformAdmin, defaultTenantScope, { page: 1, pageSize: 1 });

    expect(result.data).toHaveLength(1);
    expect(result.meta.pagination?.totalItems).toBeGreaterThanOrEqual(2);
    expect(result.data[0]?.tenantId).toBe(defaultTenantScope.tenantId);
  });

  it('blocks asset registry access outside actor tenant scope', () => {
    const service = new Release1DataFoundation();

    expect(() => service.listAssets(release0PlatformAdmin, { tenantId: 'other-tenant' })).toThrow(/Tenant isolation/);
  });

  it('creates document upload intent without claiming final approval', () => {
    const service = new Release1DataFoundation();
    const result = service.createDocumentUploadIntent(release0PlatformAdmin, defaultTenantScope, {
      tenantId: defaultTenantScope.tenantId,
      projectId: defaultTenantScope.projectId,
      siteId: defaultTenantScope.siteId,
      documentCode: 'DOC-NEW-001',
      title: 'Demo controlled upload metadata',
      documentType: 'Inspection support',
      fileName: 'demo-upload.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 2048,
      sourceBasis: 'R1-06 test source basis'
    });

    expect(result.data.objectKey).toContain(defaultTenantScope.tenantId);
    expect(result.data.storageProvider).toBe('s3_compatible');
    expect(result.data.uploadMode).toBe('metadata_validated_object_key');
    expect(result.data.decisionBoundary).toBe('draft_preliminary_only');
    expect(result.data.auditEvent.action).toBe('upload');
  });

  it('parses CSV imports into staged rows and validation issues', () => {
    const service = new Release1DataFoundation();
    const result = service.parseImport(release0PlatformAdmin, defaultTenantScope, {
      ...defaultTenantScope,
      importType: 'asset_registry',
      sourceFileName: 'r1-test-assets.csv',
      sourceBasis: 'R1-09 test source basis',
      content: [
        'facilityCode,systemCode,subsystemCode,equipmentTag,equipmentName,sourceBasis',
        'FAC-SPM-01,SYS-PROCESS,SUB-PIPING,V-001,Duplicate vessel,R1-09 test',
        ',SYS-UTILITY,SUB-PUMPING,P-102,Missing facility,R1-09 test'
      ].join('\n')
    });

    expect(result.data.batch.status).toBe('validation_failed');
    expect(result.data.rows).toHaveLength(2);
    expect(result.data.issues.map((issue) => issue.code)).toEqual(expect.arrayContaining(['duplicate_candidate', 'missing_parent']));
    expect(result.data.baselineWriteBlocked).toBe(true);
  });

  it('parses quoted CSV values without adding dependencies', () => {
    const rows = parseDelimitedRows('equipmentTag,equipmentName\nV-002,"Demo, quoted vessel"');

    expect(rows[0]?.equipmentName).toBe('Demo, quoted vessel');
  });

  it('accepts normalized Excel row data into staging without baseline write', () => {
    const service = new Release1DataFoundation();
    const result = service.parseImport(release0PlatformAdmin, defaultTenantScope, {
      ...defaultTenantScope,
      importType: 'asset_registry',
      sourceFileName: 'r1-test-assets.xlsx',
      sourceBasis: 'R1-09 normalized Excel row test',
      format: 'excel_rows',
      rows: [
        {
          facilityCode: 'FAC-SPM-01',
          systemCode: 'SYS-UTILITY',
          subsystemCode: 'SUB-PUMPING',
          equipmentTag: 'P-202',
          equipmentName: 'Excel row pump',
          sourceBasis: 'R1-09 test'
        }
      ]
    });

    expect(result.data.rows).toHaveLength(1);
    expect(result.data.baselineWriteBlocked).toBe(true);
  });

  it('returns validation queue items that block baseline write', () => {
    const service = new Release1DataFoundation();
    const result = service.listValidationQueue(release0PlatformAdmin, defaultTenantScope);

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((item) => item.baselineWriteBlocked)).toBe(true);
  });
});
