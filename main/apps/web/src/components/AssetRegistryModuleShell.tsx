'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { AlertTriangle, ArrowUpRight, ClipboardCheck, Database, FileText, Filter, Gauge, History, Layers3, ListChecks, PackageCheck, Search, ShieldCheck } from 'lucide-react';
import {
  release1Dataset,
  type ActionItemRecord,
  type AssetDetail,
  type AssetRecord,
  type CertificationRecord,
  type EvidenceChecklistRecord,
  type EvidencePackRecord,
  type InspectionDueRecord,
  type RbiAssessmentRecord,
  type RbiCandidateRecord,
  type RiskRegisterItemRecord,
  type ValidationQueueItem,
  type WorkpackRecord
} from '@aim-platform/shared';
import { AppSidebar, AppTopbar } from './app-shell-chrome';
import { routeById } from './app-routes';
import { release5Data, release5Scenario } from './release5-data';
import { BoundaryBanner, DetailRow, EmptyState, StatusBadge, formatDate, labelize, toneForStatus } from './release5-ui';

interface AssetRegistryModuleShellProps { mode: 'list' | 'detail'; assetId?: string | undefined; }
type Asset360Tab = 'overview' | 'evidence' | 'inspection' | 'integrity' | 'review' | 'validation' | 'import';
type MetricTone = 'info' | 'success' | 'warning' | 'review';

interface AssetRegistryRow {
  id: string; href: string; tag: string; name: string; hierarchyPath: string; equipmentType: string; service: string; location: string;
  criticality: string; inspectionStatus: string; certificationStatus: string; riskStatus: string; dataQualityStatus: string; reviewStatus: string;
  documentStatus: string; owner: string; updatedAt: string; validationIssueCount: number; sourceBasis: string;
}

interface Asset360Context {
  asset: AssetDetail; row: AssetRegistryRow; inspections: InspectionDueRecord[]; workpacks: WorkpackRecord[]; certifications: CertificationRecord[];
  evidenceChecklists: EvidenceChecklistRecord[]; evidencePacks: EvidencePackRecord[]; rbiCandidates: RbiCandidateRecord[]; rbiAssessments: RbiAssessmentRecord[];
  riskRegisterItems: RiskRegisterItemRecord[]; validationItems: ValidationQueueItem[]; actionItems: ActionItemRecord[];
}

export function AssetRegistryModuleShell({ mode, assetId }: AssetRegistryModuleShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | undefined>(assetId);
  const [activeTab, setActiveTab] = useState<Asset360Tab>('overview');
  const assetDetails = useMemo(() => release1Dataset.assets as AssetDetail[], []);
  const rows = useMemo(() => assetDetails.map((asset) => buildAssetRow(asset)), [assetDetails]);
  const selectedAsset = assetDetails.find((asset) => asset.id === (selectedAssetId ?? rows[0]?.id)) ?? assetDetails[0];
  const requestedAsset = mode === 'detail' ? resolveAsset(assetDetails, assetId) : selectedAsset;
  const context = requestedAsset ? buildAsset360Context(requestedAsset, rows) : null;
  const route = routeById(mode === 'detail' ? 'asset-detail' : 'assets');
  const breadcrumbs = context ? ['Assets', context.asset.equipmentTag, mode === 'detail' ? 'Asset 360' : 'Quick View'] : route.breadcrumb;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-[auto_1fr] max-xl:block">
        <AppSidebar activeRouteId="assets" collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((value) => !value)} />
        <div className="min-w-0">
          <AppTopbar activeRoute={route} breadcrumbs={breadcrumbs} />
          <main className="space-y-5 px-5 py-5">
            {mode === 'detail'
              ? context ? <Asset360Detail context={context} activeTab={activeTab} onTabChange={setActiveTab} /> : <AssetNotFound assetId={assetId} />
              : <AssetRegistryList rows={rows} selectedAssetId={selectedAsset?.id} onSelectAsset={setSelectedAssetId} selectedContext={context} />}
          </main>
        </div>
      </div>
    </div>
  );
}

function AssetRegistryList({ rows, selectedAssetId, onSelectAsset, selectedContext }: { rows: AssetRegistryRow[]; selectedAssetId?: string | undefined; onSelectAsset: (assetId: string) => void; selectedContext: Asset360Context | null }) {
  const dataGapCount = rows.filter((row) => row.dataQualityStatus.toLowerCase().includes('gap') || row.validationIssueCount > 0).length;
  const evidenceGapCount = rows.filter((row) => row.documentStatus.toLowerCase().includes('missing') || row.documentStatus.toLowerCase().includes('gap')).length;
  const reviewCount = rows.filter((row) => row.reviewStatus.toLowerCase().includes('review') || row.reviewStatus.toLowerCase().includes('validation')).length;

  return (
    <div className="space-y-5">
      <AssetRegistryHeader title="Asset Registry" description="Mock/API-ready registry shell for equipment, hierarchy, document linkage, validation status, and Asset 360 drill-down. This page supports data quality and review workflow only." />
      <BoundaryBanner>Asset Registry outputs remain draft/preliminary support data. This module does not declare assets safe, fit for operation, certification-ready final, RBI final, or legally compliant final.</BoundaryBanner>
      <div className="grid gap-3 md:grid-cols-4">
        <Metric label="Equipment records" value={rows.length} detail="Demo SPM-01 scope from shared R1-R4 mock foundations." tone="info" />
        <Metric label="Data gaps" value={dataGapCount} detail="Rows requiring validation before baseline promotion." tone={dataGapCount > 0 ? 'warning' : 'success'} />
        <Metric label="Evidence gaps" value={evidenceGapCount} detail="Document and evidence linkage remains review-gated." tone={evidenceGapCount > 0 ? 'warning' : 'success'} />
        <Metric label="Reviewer attention" value={reviewCount} detail="No final approval authority is implemented in the UI." tone="review" />
      </div>
      <section className="border border-border-subtle bg-surface-1">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-4 py-3">
          <div><h2 className="text-base font-semibold text-foreground">Asset Registry List</h2><p className="mt-1 text-xs text-text-muted">Table-led, batch-friendly view with Asset 360 quick access and API-ready action labels.</p></div>
          <div className="flex flex-wrap gap-2">
            <PlaceholderAction icon={<Filter aria-hidden size={15} />} label="Saved view" status="Mock" />
            <PlaceholderAction icon={<Search aria-hidden size={15} />} label="Search" status="Local mock" />
            <PlaceholderAction icon={<Database aria-hidden size={15} />} label="Import staging" status="Pending backend" />
            <PlaceholderAction icon={<PackageCheck aria-hidden size={15} />} label="Formal export" status="Disabled" />
          </div>
        </div>
        <div className="space-y-4 p-4">
          <div className="flex flex-wrap gap-2" aria-label="Asset registry saved views and active filters">
            {['SPM-01 scope', 'Pressure equipment', 'Data gap first', 'Evidence missing', 'Pending reviewer action', 'API-ready'].map((chip) => <span key={chip} className="rounded-md border border-border-subtle bg-surface-2 px-2 py-1 text-xs font-medium text-text-muted">{chip}</span>)}
          </div>
          <AssetTable rows={rows} selectedAssetId={selectedAssetId} onSelectAsset={onSelectAsset} />
        </div>
      </section>
      {selectedContext ? <AssetQuickPanel context={selectedContext} /> : null}
    </div>
  );
}

function Asset360Detail({ context, activeTab, onTabChange }: { context: Asset360Context; activeTab: Asset360Tab; onTabChange: (tab: Asset360Tab) => void }) {
  const tabs: Array<{ id: Asset360Tab; label: string; count?: number }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'evidence', label: 'Evidence', count: context.evidenceChecklists.reduce((total, item) => total + item.gapCount, 0) },
    { id: 'inspection', label: 'Inspection & Certification', count: context.inspections.length + context.certifications.length },
    { id: 'integrity', label: 'Integrity / RBI', count: context.rbiAssessments.length + context.riskRegisterItems.length },
    { id: 'review', label: 'Review Trail', count: context.actionItems.length + context.validationItems.length },
    { id: 'validation', label: 'Validation Queue', count: context.validationItems.length },
    { id: 'import', label: 'Import Mapping', count: 0 }
  ];

  return (
    <div className="space-y-5">
      <AssetRegistryHeader title={`${context.asset.equipmentTag} Asset 360`} description="Mock/API-ready Asset 360 shell linking registry facts, hierarchy, evidence, inspection, certification, RBI, risk, validation, and reviewer context." assetHref="/assets" />
      <BoundaryBanner>Asset 360 is a decision-support workspace only. Draft/preliminary labels, data gaps, evidence gaps, and review status must remain visible until authorized personnel complete review.</BoundaryBanner>
      <section className="border border-border-subtle bg-surface-1">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4 p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase text-integrity-teal">Asset object header</p><h2 className="mt-1 text-2xl font-semibold text-foreground">{context.asset.equipmentName}</h2><p className="mt-1 text-sm text-text-muted">{context.row.hierarchyPath}</p></div>
              <div className="flex flex-wrap gap-2"><StatusBadge label={context.row.dataQualityStatus} /><StatusBadge label={context.row.reviewStatus} /><StatusBadge label="Mock/API-ready" tone="draft" /><StatusBadge label="Needs RBAC Review" tone="review" /></div>
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              <Metric label="Components" value={context.asset.componentCount} detail="Component-level detail is mock sourced." tone="info" />
              <Metric label="CML/TML" value={context.asset.cmlTmlCount} detail="Thickness monitoring points require validation." tone="review" />
              <Metric label="Documents" value={context.asset.documentCount} detail={context.row.documentStatus} tone={context.asset.documentCount > 0 ? 'success' : 'warning'} />
              <Metric label="Open validation" value={context.asset.pendingValidationIssues} detail="Baseline writes remain blocked until review." tone={context.asset.pendingValidationIssues > 0 ? 'warning' : 'success'} />
            </div>
          </div>
          <aside className="border-l border-border-subtle bg-surface-2 p-4 max-lg:border-l-0 max-lg:border-t">
            <h3 className="text-sm font-semibold text-foreground">Status rail</h3>
            <div className="mt-3 space-y-2">
              <DetailRow label="Criticality signal" value={<StatusBadge label={context.row.criticality} tone="review" />} />
              <DetailRow label="Inspection due" value={<StatusBadge label={context.row.inspectionStatus} />} />
              <DetailRow label="Certification" value={<StatusBadge label={context.row.certificationStatus} />} />
              <DetailRow label="Risk" value={<StatusBadge label={context.row.riskStatus} tone="review" />} />
              <DetailRow label="Owner" value={context.row.owner} />
              <DetailRow label="Updated" value={formatDate(context.row.updatedAt)} />
            </div>
          </aside>
        </div>
      </section>
      <section className="border border-border-subtle bg-surface-1">
        <div className="flex flex-wrap gap-2 border-b border-border-subtle px-4 py-3" role="tablist" aria-label="Asset 360 sections">
          {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => onTabChange(tab.id)} className={`rounded-md border px-3 py-2 text-sm font-medium ${activeTab === tab.id ? 'border-integrity-teal bg-surface-2 text-foreground' : 'border-border-subtle bg-surface-1 text-text-muted hover:bg-surface-2'}`}>{tab.label}{typeof tab.count === 'number' ? ` (${tab.count})` : ''}</button>)}
        </div>
        <div className="p-4">
          {activeTab === 'overview' ? <OverviewTab context={context} /> : null}
          {activeTab === 'evidence' ? <EvidenceTab context={context} /> : null}
          {activeTab === 'inspection' ? <InspectionTab context={context} /> : null}
          {activeTab === 'integrity' ? <IntegrityTab context={context} /> : null}
          {activeTab === 'review' ? <ReviewTab context={context} /> : null}
          {activeTab === 'validation' ? <ValidationTab context={context} /> : null}
          {activeTab === 'import' ? <ImportTab /> : null}
        </div>
      </section>
    </div>
  );
}

function AssetRegistryHeader({ title, description, assetHref }: { title: string; description: string; assetHref?: string | undefined }) {
  return (
    <header className="border border-border-subtle bg-surface-1 px-5 py-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0"><p className="text-xs font-semibold uppercase text-integrity-teal">Release 9 Step 1 - Asset Registry Module Shell</p><h1 className="mt-1 text-2xl font-semibold text-foreground">{title}</h1><p className="mt-1 max-w-4xl text-sm leading-6 text-text-muted">{description}</p><div className="mt-3 flex flex-wrap gap-2"><StatusBadge label="Mock data" tone="draft" /><StatusBadge label="API-ready boundary" tone="info" /><StatusBadge label="Draft/preliminary" tone="review" /><StatusBadge label={release5Scenario.site} tone="neutral" /></div></div>
        <div className="flex flex-wrap gap-2">{assetHref ? <a href={assetHref} className="rounded-md border border-border-subtle bg-surface-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-3">Back to registry</a> : null}<PlaceholderAction icon={<ShieldCheck aria-hidden size={15} />} label="Access boundary" status="Visible" /><PlaceholderAction icon={<ClipboardCheck aria-hidden size={15} />} label="Submit review" status="Disabled" /></div>
      </div>
    </header>
  );
}

function AssetTable({ rows, selectedAssetId, onSelectAsset }: { rows: AssetRegistryRow[]; selectedAssetId?: string | undefined; onSelectAsset: (assetId: string) => void }) {
  if (rows.length === 0) return <EmptyState title="No asset records" detail="No mock/API-ready asset records are available for this tenant/project/site scope." />;
  return (
    <div className="overflow-x-auto border border-border-subtle bg-surface-1">
      <table className="w-full min-w-[1260px] border-collapse text-left text-sm">
        <thead className="bg-surface-2 text-xs uppercase text-text-muted"><tr>{['Tag', 'Asset / hierarchy', 'Class / service', 'Criticality', 'Inspection', 'Certification', 'Risk', 'Data quality', 'Evidence', 'Owner', 'Actions'].map((heading) => <th key={heading} className="px-3 py-3 font-semibold">{heading}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={`border-t border-border-subtle hover:bg-surface-2 ${selectedAssetId === row.id ? 'bg-surface-2' : ''}`}>
              <td className="px-3 py-3 align-top font-semibold text-foreground"><a href={row.href} className="inline-flex items-center gap-1 text-integrity-teal hover:underline">{row.tag}<ArrowUpRight aria-hidden size={13} /></a></td>
              <td className="px-3 py-3 align-top"><p className="font-medium text-foreground">{row.name}</p><p className="mt-1 text-xs text-text-muted">{row.hierarchyPath}</p></td>
              <td className="px-3 py-3 align-top text-text-muted"><p>{row.equipmentType}</p><p className="mt-1 text-xs">{row.service}</p></td>
              <td className="px-3 py-3 align-top"><StatusBadge label={row.criticality} tone="review" /></td>
              <td className="px-3 py-3 align-top"><StatusBadge label={row.inspectionStatus} /></td>
              <td className="px-3 py-3 align-top"><StatusBadge label={row.certificationStatus} /></td>
              <td className="px-3 py-3 align-top"><StatusBadge label={row.riskStatus} tone="review" /></td>
              <td className="px-3 py-3 align-top"><StatusBadge label={row.dataQualityStatus} /></td>
              <td className="px-3 py-3 align-top"><StatusBadge label={row.documentStatus} tone={row.documentStatus.toLowerCase().includes('missing') ? 'warning' : 'success'} /></td>
              <td className="px-3 py-3 align-top text-text-muted">{row.owner}</td>
              <td className="px-3 py-3 align-top"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => onSelectAsset(row.id)} className="rounded-md border border-border-subtle bg-surface-1 px-2 py-1 text-xs font-medium text-integrity-teal hover:bg-surface-2">Quick view</button><a href={row.href} className="rounded-md border border-border-subtle bg-surface-1 px-2 py-1 text-xs font-medium text-foreground hover:bg-surface-2">Asset 360</a></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AssetQuickPanel({ context }: { context: Asset360Context }) {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="border border-border-subtle bg-surface-1 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase text-integrity-teal">Asset 360 quick view</p><h2 className="mt-1 text-lg font-semibold text-foreground">{context.asset.equipmentTag} - {context.asset.equipmentName}</h2><p className="mt-1 text-sm text-text-muted">Quick drawer equivalent for high-volume list work. Full detail opens in the route-based Asset 360 page.</p></div><a href={context.row.href} className="rounded-md border border-border-subtle bg-surface-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-3">Open Asset 360</a></div>
        <div className="mt-4 grid gap-3 md:grid-cols-3"><LinkedObjectCard icon={<FileText aria-hidden size={17} />} title="Linked documents" count={context.asset.linkedDocuments.length} detail={context.row.documentStatus} /><LinkedObjectCard icon={<ListChecks aria-hidden size={17} />} title="Validation issues" count={context.validationItems.length + context.asset.pendingValidationIssues} detail="Baseline write remains review-gated." /><LinkedObjectCard icon={<Gauge aria-hidden size={17} />} title="Integrity links" count={context.rbiAssessments.length + context.riskRegisterItems.length} detail="RBI/risk outputs remain preliminary." /></div>
      </div>
      <aside className="border border-border-subtle bg-surface-1 p-4"><h3 className="text-sm font-semibold text-foreground">High-volume action boundary</h3><div className="mt-3 space-y-2"><PlaceholderAction fullWidth icon={<Database aria-hidden size={15} />} label="Batch edit" status="Disabled" /><PlaceholderAction fullWidth icon={<PackageCheck aria-hidden size={15} />} label="Build evidence pack" status="API-ready" /><PlaceholderAction fullWidth icon={<ClipboardCheck aria-hidden size={15} />} label="Route to reviewer" status="Pending RBAC" /><PlaceholderAction fullWidth icon={<History aria-hidden size={15} />} label="Audit trail" status="Mock preview" /></div></aside>
    </section>
  );
}

function OverviewTab({ context }: { context: Asset360Context }) {
  return <div className="grid gap-4 lg:grid-cols-2"><Panel title="Registry baseline" icon={<Database aria-hidden size={17} />}><DetailRow label="Equipment tag" value={context.asset.equipmentTag} /><DetailRow label="Equipment name" value={context.asset.equipmentName} /><DetailRow label="Equipment type" value={context.asset.equipmentType} /><DetailRow label="Service" value={context.asset.service} /><DetailRow label="Hierarchy" value={context.row.hierarchyPath} /><DetailRow label="Source basis" value={context.asset.sourceBasis} /></Panel><Panel title="Hierarchy and technical object summary" icon={<Layers3 aria-hidden size={17} />}><DetailRow label="Facility" value={context.asset.facilityCode} /><DetailRow label="System" value={context.asset.systemCode} /><DetailRow label="Subsystem" value={context.asset.subsystemCode} /><DetailRow label="Components" value={context.asset.components.length} /><DetailRow label="CML/TML points" value={context.asset.cmlTmlPoints.length} /><DetailRow label="Review notes" value={context.asset.pendingReviewSummary.join('; ')} /></Panel></div>;
}

function EvidenceTab({ context }: { context: Asset360Context }) {
  return <div className="space-y-4"><Panel title="Linked evidence and document basis" icon={<FileText aria-hidden size={17} />}><ObjectList empty="No linked document metadata is available for this asset.">{context.asset.linkedDocuments.map((document) => <ObjectListItem key={`${document.documentId}-${document.relationship}`} title={`${document.documentCode} - ${document.title}`} meta={`${labelize(document.relationship)} / ${labelize(document.evidenceUse)}`} status="Evidence support" />)}</ObjectList></Panel><Panel title="Evidence checklist and pack readiness" icon={<PackageCheck aria-hidden size={17} />}><ObjectList empty="No evidence checklist is linked to this asset in the mock dataset.">{context.evidenceChecklists.map((checklist) => <ObjectListItem key={checklist.id} title={checklist.title} meta={`${checklist.availableCount}/${checklist.requiredCount} available, ${checklist.gapCount} gap(s)`} status={labelize(checklist.status)} />)}{context.evidencePacks.map((pack) => <ObjectListItem key={pack.id} title={pack.title} meta={`${pack.completenessPercent}% completeness, export ${labelize(pack.exportReadyStatus)}`} status={labelize(pack.reviewStatus)} />)}</ObjectList></Panel></div>;
}

function InspectionTab({ context }: { context: Asset360Context }) {
  return <div className="grid gap-4 lg:grid-cols-2"><Panel title="Inspection tracking" icon={<ListChecks aria-hidden size={17} />}><ObjectList empty="No inspection tracking mock record is linked to this asset.">{context.inspections.map((inspection) => <ObjectListItem key={inspection.id} title={`${inspection.equipmentTag} - ${labelize(inspection.inspectionStatus)}`} meta={`Due ${formatDate(inspection.dueDate)} / ${inspection.nextAction}`} status={labelize(inspection.dueStatus)} />)}{context.workpacks.map((workpack) => <ObjectListItem key={workpack.id} title={workpack.workpackCode} meta={workpack.scopeSummary} status={labelize(workpack.status)} />)}</ObjectList></Panel><Panel title="Certification support" icon={<ClipboardCheck aria-hidden size={17} />}><ObjectList empty="No certification support mock record is linked to this asset.">{context.certifications.map((certificate) => <ObjectListItem key={certificate.id} title={`${certificate.certificateCode} - ${certificate.certificateType}`} meta={`${certificate.availableEvidenceCount}/${certificate.requiredEvidenceCount} evidence available; ${certificate.nextAction}`} status={labelize(certificate.readinessStatus)} />)}</ObjectList></Panel></div>;
}

function IntegrityTab({ context }: { context: Asset360Context }) {
  return <div className="space-y-4"><BoundaryBanner>Integrity and RBI records shown here are preliminary skeletons. Methodology, PoF/CoF, risk ranking, interval, and risk acceptance decisions require authorized SME review.</BoundaryBanner><div className="grid gap-4 lg:grid-cols-2"><Panel title="RBI assessment linkage" icon={<Gauge aria-hidden size={17} />}><ObjectList empty="No RBI assessment mock record is linked to this asset.">{context.rbiCandidates.map((candidate) => <ObjectListItem key={candidate.id} title={`${candidate.equipmentTag} candidate`} meta={candidate.scopingNotes} status={labelize(candidate.status)} />)}{context.rbiAssessments.map((assessment) => <ObjectListItem key={assessment.id} title={assessment.assessmentCode} meta={assessment.methodologyNotes} status={labelize(assessment.status)} />)}</ObjectList></Panel><Panel title="Risk register linkage" icon={<AlertTriangle aria-hidden size={17} />}><ObjectList empty="No risk register mock record is linked to this asset.">{context.riskRegisterItems.map((risk) => <ObjectListItem key={risk.id} title={risk.riskTitle} meta={risk.mitigationSummary} status={`Preliminary ${labelize(risk.overallRiskLevel)}`} />)}</ObjectList></Panel></div></div>;
}

function ReviewTab({ context }: { context: Asset360Context }) {
  return <div className="grid gap-4 lg:grid-cols-2"><Panel title="Validation queue context" icon={<ListChecks aria-hidden size={17} />}><ObjectList empty="No open validation queue item is linked to this asset.">{context.validationItems.map((item) => <ObjectListItem key={item.id} title={`${labelize(item.severity)} - ${item.field}`} meta={item.message} status={labelize(item.status)} />)}</ObjectList></Panel><Panel title="Action, approval, and audit trail preview" icon={<History aria-hidden size={17} />}><ObjectList empty="No action queue item is linked to this asset.">{context.actionItems.map((item) => <ObjectListItem key={item.id} title={item.title} meta={`${item.summary} Required authority: ${labelize(item.requiredAuthority)}`} status={labelize(item.status)} />)}{context.asset.auditSummary.map((entry) => <ObjectListItem key={entry} title="Audit summary" meta={entry} status="Mock audit" />)}</ObjectList></Panel></div>;
}

function Panel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return <section className="border border-border-subtle bg-surface-1"><div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3"><span className="text-integrity-teal">{icon}</span><h3 className="text-base font-semibold text-foreground">{title}</h3></div><div className="p-4">{children}</div></section>;
}

function ObjectList({ empty, children }: { empty: string; children: ReactNode }) {
  const items = Array.isArray(children) ? children.filter(Boolean) : children;
  if (Array.isArray(items) && items.length === 0) return <EmptyState title="No linked item" detail={empty} />;
  if (!items) return <EmptyState title="No linked item" detail={empty} />;
  return <div className="space-y-2">{children}</div>;
}

function ObjectListItem({ title, meta, status }: { title: string; meta: string; status: string }) {
  return <div className="border border-border-subtle bg-surface-2 px-3 py-3"><div className="flex flex-wrap items-start justify-between gap-2"><p className="font-medium text-foreground">{title}</p><StatusBadge label={status} tone={toneForStatus(status.toLowerCase())} /></div><p className="mt-1 text-sm leading-6 text-text-muted">{meta}</p></div>;
}

function LinkedObjectCard({ icon, title, count, detail }: { icon: ReactNode; title: string; count: number; detail: string }) {
  return <div className="border border-border-subtle bg-surface-2 p-3"><div className="flex items-center justify-between gap-3"><span className="text-integrity-teal">{icon}</span><span className="text-xl font-semibold text-foreground">{count}</span></div><p className="mt-2 text-sm font-semibold text-foreground">{title}</p><p className="mt-1 text-xs leading-5 text-text-muted">{detail}</p></div>;
}

function Metric({ label, value, detail, tone }: { label: string; value: number | string; detail: string; tone: MetricTone }) {
  return <div className="min-h-28 border border-border-subtle bg-surface-1 px-4 py-3"><div className="flex items-start justify-between gap-3"><p className="text-xs font-semibold uppercase text-text-muted">{label}</p><StatusBadge label={labelize(tone)} tone={tone} /></div><p className="mt-3 text-2xl font-semibold text-foreground">{value}</p><p className="mt-2 text-xs leading-5 text-text-muted">{detail}</p></div>;
}

function PlaceholderAction({ icon, label, status, fullWidth }: { icon: ReactNode; label: string; status: string; fullWidth?: boolean | undefined }) {
  return <button type="button" disabled className={`${fullWidth ? 'w-full justify-between' : ''} inline-flex min-h-9 items-center gap-2 rounded-md border border-border-subtle bg-surface-2 px-3 text-xs font-medium text-text-muted disabled:cursor-not-allowed`} title={`${label} - ${status}`}><span className="text-integrity-teal">{icon}</span><span>{label}</span><StatusBadge label={status} tone={toneForStatus(status.toLowerCase())} /></button>;
}

function AssetNotFound({ assetId }: { assetId?: string | undefined }) {
  return <div className="space-y-4"><AssetRegistryHeader title="Asset 360 not found" description="The requested asset route does not match the current mock/API-ready SPM-01 dataset." assetHref="/assets" /><EmptyState title="Asset not available in mock scope" detail={`Requested asset: ${assetId ?? 'TBD'}. Check the Asset Registry List or backend integration plan before treating this as a production result.`} /></div>;
}

function buildAssetRow(asset: AssetDetail): AssetRegistryRow {
  const inspection = firstForAsset(release5Data.inspections, asset);
  const certification = firstForAsset(release5Data.certifications, asset);
  const candidate = firstForAsset(release5Data.rbiCandidates, asset);
  const risk = firstForAsset(release5Data.riskRegisterItems, asset);
  const linkedDocumentCount = asset.linkedDocuments.length || asset.documentCount;
  const hasRoleOwner = Boolean(candidate?.assignedRbiEngineerRole || inspection?.assignedInspectorRole || certification);
  return {
    id: asset.id,
    href: `/assets/${encodeURIComponent(asset.id)}`,
    tag: asset.equipmentTag,
    name: asset.equipmentName,
    hierarchyPath: [asset.facilityCode, asset.systemCode, asset.subsystemCode, asset.equipmentTag].join(' / '),
    equipmentType: asset.equipmentType,
    service: asset.service,
    location: asset.facilityCode,
    criticality: candidate ? `Preliminary ${labelize(candidate.priority)}` : 'TBD SME Review',
    inspectionStatus: inspection ? labelize(inspection.dueStatus) : 'Pending Backend',
    certificationStatus: certification ? labelize(certification.readinessStatus) : 'Pending Backend',
    riskStatus: risk ? `Preliminary ${labelize(risk.overallRiskLevel)}` : 'TBD SME Review',
    dataQualityStatus: labelize(asset.dataQualityStatus),
    reviewStatus: labelize(asset.reviewStatus),
    documentStatus: linkedDocumentCount > 0 ? `${linkedDocumentCount} linked` : 'Missing Evidence',
    owner: hasRoleOwner ? 'Role owner pending RBAC' : 'TBD',
    updatedAt: asset.updatedAt,
    validationIssueCount: asset.pendingValidationIssues,
    sourceBasis: asset.sourceBasis
  };
}

function buildAsset360Context(asset: AssetDetail, rows: AssetRegistryRow[]): Asset360Context {
  const row = rows.find((item) => item.id === asset.id) ?? buildAssetRow(asset);
  const mergedActions = [...release5Data.myWork, ...release5Data.reviewerQueue].filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
  return {
    asset,
    row,
    inspections: release5Data.inspections.filter((item) => matchesAsset(asset, item)),
    workpacks: release5Data.workpacks.filter((item) => matchesAsset(asset, item)),
    certifications: release5Data.certifications.filter((item) => matchesAsset(asset, item)),
    evidenceChecklists: release5Data.evidenceChecklists.filter((item) => evidenceMatchesAsset(asset, item)),
    evidencePacks: release5Data.evidencePacks.filter((item) => evidenceMatchesAsset(asset, item)),
    rbiCandidates: release5Data.rbiCandidates.filter((item) => matchesAsset(asset, item)),
    rbiAssessments: release5Data.rbiAssessments.filter((item) => matchesAsset(asset, item)),
    riskRegisterItems: release5Data.riskRegisterItems.filter((item) => matchesAsset(asset, item)),
    validationItems: release5Data.validationQueue.filter((item) => validationMatchesAsset(asset, item)),
    actionItems: mergedActions.filter((item) => actionMatchesAsset(asset, item))
  };
}

function ValidationTab({ context }: { context: Asset360Context }) {
  const items = context.validationItems;
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  if (items.length === 0) return <EmptyState title="No validation issues" detail="This asset currently has no matching validation queue items in the shared mock foundation." />;

  const unresolved = items.filter((item) => !resolvedIds.includes(item.id));
  const resolved = items.filter((item) => resolvedIds.includes(item.id));

  return (
    <div className="space-y-4">
      <div className="border border-border-subtle bg-surface-1 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Validation queue workflow</h3>
            <p className="mt-1 text-xs text-text-muted">Validation items for this asset remain review-gated. Baseline promotion and field corrections are disabled until authorized review.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PlaceholderAction icon={<ClipboardCheck aria-hidden size={15} />} label="Batch approve" status="Mock sequence" />
            <PlaceholderAction icon={<History aria-hidden size={15} />} label="Re-evaluate" status="Pending backend" />
          </div>
        </div>
        {unresolved.length > 0 ? (
          <div className="mt-4 space-y-2">
            {unresolved.map((item) => (
              <div key={item.id} className="border border-border-subtle bg-surface-2 px-3 py-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-medium text-foreground">{item.message}</p>
                  <StatusBadge label={item.severity} tone={toneForStatus(item.severity.toLowerCase())} />
                </div>
                <p className="mt-1 text-xs text-text-muted">Source: {item.sourceFileName} · Owner: {item.owner ?? 'Unassigned'}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setResolvedIds((ids) => [...ids, item.id])} className="rounded-md border border-border-subtle bg-surface-1 px-2 py-1 text-xs font-medium text-foreground hover:bg-surface-3">Mark resolved</button>
                  <PlaceholderAction icon={<ArrowUpRight aria-hidden size={15} />} label="Navigate to source" status="API-ready" />
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {resolved.length > 0 ? (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold uppercase text-text-muted">Resolved</p>
            {resolved.map((item) => (
              <div key={item.id} className="border border-border-subtle bg-surface-2 px-3 py-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-medium text-foreground">{item.message}</p>
                  <StatusBadge label="Resolved" tone="success" />
                </div>
                <p className="mt-1 text-xs text-text-muted">Source: {item.sourceFileName} · Owner: {item.owner ?? 'Unassigned'}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ImportTab() {
  return (
    <div className="space-y-4">
      <div className="border border-border-subtle bg-surface-1 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Import mapping placeholder</h3>
            <p className="mt-1 text-xs text-text-muted">Batch import and smart mapping remain pending backend and authorized review. No baseline data is written in this placeholder pass.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PlaceholderAction icon={<FileText aria-hidden size={15} />} label="Upload template" status="Pending backend" />
            <PlaceholderAction icon={<ClipboardCheck aria-hidden size={15} />} label="Run mapping" status="Disabled" />
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="border border-border-subtle bg-surface-2 p-3">
            <p className="text-sm font-semibold text-foreground">Staging queue</p>
            <p className="mt-1 text-xs text-text-muted">Import files are not parsed in this Step 2 placeholder pass.</p>
          </div>
          <div className="border border-border-subtle bg-surface-2 p-3">
            <p className="text-sm font-semibold text-foreground">Field mapping</p>
            <p className="mt-1 text-xs text-text-muted">MBS equipment-class mapping remains a future implementation decision.</p>
          </div>
          <div className="border border-border-subtle bg-surface-2 p-3">
            <p className="text-sm font-semibold text-foreground">Validation gate</p>
            <p className="mt-1 text-xs text-text-muted">Duplicate detection and mandatory-field checks are review-gated placeholders only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function resolveAsset(assetDetails: AssetDetail[], assetId?: string | undefined): AssetDetail | null {
  if (!assetId) return null;
  const normalized = decodeURIComponent(assetId).toLowerCase();
  return assetDetails.find((asset) => [asset.id.toLowerCase(), asset.equipmentTag.toLowerCase(), asset.equipmentTag.toLowerCase().replace(/[^a-z0-9]+/g, '-')].includes(normalized)) ?? null;
}

function firstForAsset<T extends { assetId?: string | undefined; equipmentTag?: string | undefined }>(records: T[], asset: AssetRecord): T | undefined {
  return records.find((item) => matchesAsset(asset, item));
}

function matchesAsset(asset: AssetRecord, item: { assetId?: string | undefined; equipmentTag?: string | undefined }): boolean {
  return item.assetId === asset.id || item.equipmentTag === asset.equipmentTag;
}

function evidenceMatchesAsset(asset: AssetDetail, item: { contextId?: string | undefined; title?: string | undefined; documentCodes?: string[] | undefined }): boolean {
  return item.contextId === asset.id || Boolean(item.title?.includes(asset.equipmentTag)) || Boolean(item.documentCodes?.some((code) => asset.linkedDocuments.some((document) => document.documentCode === code)));
}

function validationMatchesAsset(asset: AssetDetail, item: ValidationQueueItem): boolean {
  return item.message.includes(asset.equipmentTag) || item.sourceFileName.toLowerCase().includes('asset');
}

function actionMatchesAsset(asset: AssetDetail, item: ActionItemRecord): boolean {
  const text = `${item.title} ${item.summary} ${item.linkedObject.display}`.toLowerCase();
  return text.includes(asset.equipmentTag.toLowerCase()) || text.includes(asset.equipmentName.toLowerCase());
}
