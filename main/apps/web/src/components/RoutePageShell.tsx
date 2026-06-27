'use client';

import { useState } from 'react';
import { AlertTriangle, ArrowRight, ClipboardList, LockKeyhole } from 'lucide-react';
import { breadcrumbForRoute, routeById, type AppRouteId } from './app-routes';
import { AppSidebar, AppTopbar } from './app-shell-chrome';
import { boundaryItems, interactionStates, release5Data, release5Scenario } from './release5-data';
import { BoundaryBanner, DetailRow, EmptyState, PageHeader, SectionPanel, StatusBadge, toneForStatus } from './release5-ui';

interface RoutePageShellProps {
  routeId: AppRouteId;
  detailLabel?: string;
}

interface PreviewRow {
  id: string;
  primary: string;
  secondary: string;
  state: string;
  boundary: string;
}

export function RoutePageShell({ routeId, detailLabel }: RoutePageShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const route = routeById(routeId);
  const breadcrumbs = detailLabel ? [...breadcrumbForRoute(route.id).slice(0, -1), detailLabel] : breadcrumbForRoute(route.id);
  const previewRows = buildPreviewRows(route.id, detailLabel);

  return (
    <main className="min-h-screen bg-aim-field text-aim-ink">
      <div className={`grid min-h-screen ${sidebarCollapsed ? 'grid-cols-[88px_1fr]' : 'grid-cols-[300px_1fr]'} max-xl:grid-cols-1`}>
        <AppSidebar activeRouteId={route.id} collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((value) => !value)} />

        <section className="min-w-0">
          <AppTopbar activeRoute={route} breadcrumbs={breadcrumbs} />
          <PageHeader eyebrow="Release 6 route shell" title={detailLabel ?? route.pageTitle} description={`${route.path} - ${route.guardrail}`}>
            <StatusBadge label={route.status} tone={toneForStatus(route.status.toLowerCase())} />
            <StatusBadge label={route.dataStatus} tone={toneForStatus(route.dataStatus.toLowerCase())} />
            <StatusBadge label="Draft/preliminary" tone="warning" />
          </PageHeader>

          <div className="grid gap-4 p-4 2xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0 space-y-4">
              <SectionPanel title="Route-Based Page Shell" kicker="Controlled Release 6 placeholder">
                <div className="grid gap-3 lg:grid-cols-3">
                  <DetailRow label="Module" value={route.module} />
                  <DetailRow label="Data source" value={route.dataStatus} />
                  <DetailRow label="Permission note" value={route.permissionNote} />
                </div>
                <div className="mt-3 grid gap-3 lg:grid-cols-3">
                  <BoundaryBanner>Mock/API-ready page shell only. Real persistence, object storage, OIDC, and production API wiring remain pending.</BoundaryBanner>
                  <BoundaryBanner>All technical outputs remain draft/preliminary until reviewed by authorized personnel.</BoundaryBanner>
                  <BoundaryBanner>Route page is usable for navigation and review planning, not for final operational decisions.</BoundaryBanner>
                </div>
              </SectionPanel>

              <SectionPanel title="Shared Scenario Preview" kicker={release5Scenario.project} actions={<StatusBadge label="Uses Release 5 shared data" tone="draft" />}>
                {previewRows.length > 0 ? <RoutePreviewTable rows={previewRows} /> : <EmptyState title="No preview rows" detail="This route is a shell placeholder pending backend and SME/UBT/IT review." />}
              </SectionPanel>

              <SectionPanel title="Action Boundary" kicker="Disabled or API-ready until future implementation">
                <div className="grid gap-3 md:grid-cols-3">
                  <BoundaryAction label="Open filtered workbench" status="Mock" detail="Use current route context only; no persistent route state." />
                  <BoundaryAction label="Submit for review" status="API-ready" detail="Requires final workflow authority and backend persistence." />
                  <BoundaryAction label="Export evidence" status="Pending Backend" detail="Requires object storage, export log, and authority review." />
                </div>
              </SectionPanel>
            </div>

            <aside className="space-y-4">
              <SectionPanel title="Access Boundary" kicker="Planning-only role visibility">
                <div className="space-y-3 text-sm">
                  <p className="flex items-start gap-2 text-slate-700"><LockKeyhole aria-hidden className="mt-0.5" size={16} />Final RBAC enforcement remains Needs RBAC Review.</p>
                  <p className="flex items-start gap-2 text-slate-700"><AlertTriangle aria-hidden className="mt-0.5" size={16} />No route grants final approval, legal interpretation, or asset safety authority.</p>
                  <p className="flex items-start gap-2 text-slate-700"><ClipboardList aria-hidden className="mt-0.5" size={16} />Audit and evidence concepts are visible, but persistence is pending backend integration.</p>
                </div>
              </SectionPanel>

              <SectionPanel title="Functional Labels" kicker="Release 6 control state">
                <div className="space-y-2">
                  {['Mock', 'API-ready', 'Pending Backend', 'Disabled', 'Needs Review', 'Draft/preliminary'].map((label) => (
                    <div key={label} className="flex items-center justify-between gap-3 border-b border-aim-line py-2 text-sm last:border-b-0">
                      <span>{label}</span>
                      <StatusBadge label="Visible" tone={toneForStatus(label.toLowerCase())} />
                    </div>
                  ))}
                </div>
              </SectionPanel>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function BoundaryAction({ label, status, detail }: { label: string; status: string; detail: string }) {
  return (
    <button type="button" disabled className="min-h-28 border border-aim-line bg-aim-field px-4 py-3 text-left text-sm text-slate-600" title={`${label} - ${status}`}>
      <span className="flex items-center justify-between gap-3">
        <span className="font-semibold text-aim-ink">{label}</span>
        <StatusBadge label={status} tone={toneForStatus(status.toLowerCase())} />
      </span>
      <span className="mt-2 flex items-start gap-2 text-xs leading-5"><ArrowRight aria-hidden className="mt-0.5" size={14} />{detail}</span>
    </button>
  );
}

function RoutePreviewTable({ rows }: { rows: PreviewRow[] }) {
  return (
    <div className="overflow-x-auto border border-aim-line bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-aim-field text-xs uppercase text-slate-600">
          <tr>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2">Context</th>
            <th className="px-3 py-2">State</th>
            <th className="px-3 py-2">Boundary</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-aim-line">
              <td className="px-3 py-2 font-medium text-aim-ink">{row.primary}</td>
              <td className="px-3 py-2 text-slate-600">{row.secondary}</td>
              <td className="px-3 py-2"><StatusBadge label={row.state} tone={toneForStatus(row.state.toLowerCase())} /></td>
              <td className="px-3 py-2 text-slate-600">{row.boundary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function buildPreviewRows(routeId: AppRouteId, detailLabel: string | undefined): PreviewRow[] {
  if (routeId === 'projects') return [{ id: 'spm-01', primary: release5Scenario.project, secondary: release5Scenario.site, state: 'Mock', boundary: 'Scope selector placeholder only.' }];
  if (routeId === 'dashboard') return rowsFromRecords(release5Data.businessKpis, ['label'], ['count', 'severity'], ['severity'], 'KPI is action context, not final compliance.');
  if (routeId === 'my-work') return rowsFromRecords(release5Data.myWork, ['title', 'label', 'id'], ['objectType', 'dueDate', 'priority'], ['status', 'priority'], 'Workflow support only.');
  if (routeId === 'reviewer-queue') return rowsFromRecords(release5Data.reviewerQueue, ['title', 'label', 'id'], ['objectType', 'ageDays', 'authority'], ['status', 'priority'], 'Review authority remains TBD.');
  if (routeId === 'assets') return rowsFromRecords(release5Data.assets, ['tagNumber', 'equipmentTag', 'name', 'id'], ['description', 'system', 'location'], ['dataQualityStatus', 'status'], 'Registry support only.');
  if (routeId === 'asset-detail') return rowsFromRecords(release5Data.assets.slice(0, 1), ['tagNumber', 'equipmentTag', 'name', 'id'], ['description', 'system', 'location'], ['dataQualityStatus', 'status'], detailLabel ?? 'Dynamic asset route placeholder.');
  if (routeId === 'documents') return rowsFromRecords(release5Data.documents, ['title', 'documentNo', 'name', 'id'], ['documentType', 'assetTag', 'revision'], ['status', 'dataQualityStatus'], 'Object storage pending.');
  if (routeId === 'document-detail') return rowsFromRecords(release5Data.documents.slice(0, 1), ['title', 'documentNo', 'name', 'id'], ['documentType', 'assetTag', 'revision'], ['status', 'dataQualityStatus'], detailLabel ?? 'Dynamic document route placeholder.');
  if (routeId === 'validation') return rowsFromRecords(release5Data.validationQueue, ['issue', 'field', 'id'], ['assetTag', 'source', 'severity'], ['status', 'severity'], 'Data quality workflow only.');
  if (routeId === 'inspections') return rowsFromRecords(release5Data.inspections, ['assetTag', 'equipmentTag', 'id'], ['inspectionType', 'dueDate', 'basis'], ['dueState', 'status'], 'Due state is preliminary support.');
  if (routeId === 'inspection-workpacks') return rowsFromRecords(release5Data.workpacks, ['title', 'workpackNo', 'id'], ['scope', 'assetCount', 'dueDate'], ['status', 'readiness'], 'Workpack requires authorized review.');
  if (routeId === 'certification') return rowsFromRecords(release5Data.certifications, ['certificateNo', 'assetTag', 'id'], ['certificateType', 'expiryDate', 'authority'], ['status', 'readiness'], 'Certification support only.');
  if (routeId === 'evidence-packs') return rowsFromRecords(release5Data.evidencePacks, ['title', 'evidencePackNo', 'id'], ['linkedObjectType', 'evidenceCount', 'reviewStatus'], ['status', 'reviewStatus'], 'Evidence pack is not final approval.');
  if (routeId === 'evidence-pack-detail') return rowsFromRecords(release5Data.evidencePacks.slice(0, 1), ['title', 'evidencePackNo', 'id'], ['linkedObjectType', 'evidenceCount', 'reviewStatus'], ['status', 'reviewStatus'], detailLabel ?? 'Dynamic evidence route placeholder.');
  if (routeId === 'integrity') return rowsFromRecords(release5Data.rbiCandidates, ['assetTag', 'equipmentTag', 'id'], ['candidateReason', 'basis', 'priority'], ['status', 'preliminaryRisk'], 'Integrity output remains preliminary.');
  if (routeId === 'integrity-rbi') return rowsFromRecords(release5Data.rbiAssessments, ['assessmentNo', 'assetTag', 'id'], ['assessmentType', 'basis', 'reviewStatus'], ['status', 'preliminaryRisk'], 'RBI methodology needs SME review.');
  if (routeId === 'integrity-rbi-detail') return rowsFromRecords(release5Data.rbiAssessments.slice(0, 1), ['assessmentNo', 'assetTag', 'id'], ['assessmentType', 'basis', 'reviewStatus'], ['status', 'preliminaryRisk'], detailLabel ?? 'Dynamic RBI route placeholder.');
  if (routeId === 'risk-register') return rowsFromRecords(release5Data.riskRegisterItems, ['riskTitle', 'assetTag', 'id'], ['riskSource', 'linkedAssessmentId', 'owner'], ['status', 'riskLevel'], 'Risk acceptance is not implemented.');
  if (routeId === 'administration') return rowsFromRecords(boundaryItems, ['area'], ['boundary'], ['blocker'], 'Governance placeholder.');
  if (routeId === 'helpdesk') return rowsFromRecords(interactionStates, ['label'], ['behavior'], ['state'], 'Support intake placeholder.');
  if (routeId === 'state-matrix') return rowsFromRecords(interactionStates, ['label'], ['behavior'], ['state'], 'UI behavior matrix only.');
  return [];
}

function rowsFromRecords(records: unknown[], primaryKeys: string[], secondaryKeys: string[], stateKeys: string[], fallbackBoundary: string): PreviewRow[] {
  return records.slice(0, 6).map((record, index) => {
    const item = record as Record<string, unknown>;
    return {
      id: pickValue(item, ['id']) || `${index}`,
      primary: pickValue(item, primaryKeys) || `Preview item ${index + 1}`,
      secondary: pickValue(item, secondaryKeys) || release5Scenario.dataSourceStatus,
      state: pickValue(item, stateKeys) || 'Mock',
      boundary: pickValue(item, ['guardrail', 'boundary']) || fallbackBoundary
    };
  });
}

function pickValue(record: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (value !== null && value !== undefined && value !== '') return String(value);
  }
  return '';
}
