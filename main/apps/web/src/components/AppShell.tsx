'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Layers3,
  Search,
} from 'lucide-react';
import type {
  ActionItemRecord,
  AssetRecord,
  BusinessKpiCard,
  CertificationRecord,
  DashboardActionCard,
  DocumentRecord,
  EvidenceChecklistRecord,
  EvidencePackRecord,
  ExportLogRecord,
  InspectionDueRecord,
  ReviewerWorkQueueItem,
  RbiAssessmentRecord,
  RbiCandidateRecord,
  RiskRegisterItemRecord,
  ValidationQueueItem
} from '@aim-platform/shared';
import {
  acceptanceItems,
  boundaryItems,
  componentContracts,
  interactionStates,
  pageSummaries,
  release5Data,
  release5Scenario,
  routeItems,
  type BoundaryItem,
  type ComponentContractItem,
  type InteractionStateItem,
  type PageSummary,
  type RouteItem
} from './release5-data';
import {
  AccessDeniedState,
  BoundaryBanner,
  DataTable,
  DetailRow,
  DrawerShell,
  EmptyState,
  ErrorState,
  FilterChips,
  formatDate,
  labelize,
  LoadingState,
  MetricCard,
  PageHeader,
  ProgressBar,
  SectionPanel,
  StatusBadge,
  toneForStatus
} from './release5-ui';
import { AppSidebar, AppTopbar } from './app-shell-chrome';
import { breadcrumbForRoute, routeForWorkbenchTab, type WorkbenchTabId } from './app-routes';

type WorkbenchTab = WorkbenchTabId;

interface DrawerState {
  title: string;
  subtitle: string;
  rows: Array<{ label: string; value: string }>;
  warnings: string[];
}

const defaultDrawer: DrawerState = {
  title: 'Release 5 Boundary Drawer',
  subtitle: 'Local state only. Uses mock/static data from the shared SPM-01 scenario.',
  rows: [
    { label: 'Tenant', value: release5Scenario.tenant },
    { label: 'Project', value: release5Scenario.project },
    { label: 'Data source', value: release5Scenario.dataSourceStatus }
  ],
  warnings: [release5Scenario.decisionBoundary]
};


export function AppShell() {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawer, setDrawer] = useState<DrawerState>(defaultDrawer);
  const selectedPage = pageSummaries.find((item) => item.id === activeTab) ?? pageSummaries[0]!;
  const selectedRoute = routeForWorkbenchTab(activeTab);
  const breadcrumbs = breadcrumbForRoute(selectedRoute.id);

  function openDrawer(next: DrawerState) {
    setDrawer(next);
    setDrawerOpen(true);
  }

  return (
    <main className="min-h-screen bg-aim-field text-aim-ink">
      <div className={`grid min-h-screen ${sidebarCollapsed ? 'grid-cols-[88px_1fr]' : 'grid-cols-[300px_1fr]'} max-xl:grid-cols-1`}>
        <AppSidebar
          activeTab={activeTab}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((value) => !value)}
          onSelectTab={(tab) => tab && setActiveTab(tab)}
        />

        <section className="min-w-0">
          <AppTopbar activeRoute={selectedRoute} breadcrumbs={breadcrumbs} />
          <PageHeader eyebrow="SPM-01 Demo Scope" title={selectedPage.page} description={`${selectedRoute.path} - ${selectedPage.purpose}`}>
            <StatusBadge label={selectedPage.status} tone={toneForStatus(selectedPage.status.toLowerCase())} />
            <StatusBadge label="Draft/preliminary" tone="warning" />
          </PageHeader>

          <div className="grid gap-4 p-4 2xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="min-w-0 space-y-4">
              <GuardrailStrip page={selectedPage} />
              {renderActiveTab(activeTab, openDrawer)}
            </div>
            <DrawerShell title={drawer.title} subtitle={drawer.subtitle} open={drawerOpen} onClose={() => setDrawerOpen((value) => !value)}>
              {drawer.rows.map((row) => (
                <DetailRow key={row.label} label={row.label} value={row.value} />
              ))}
              <div className="space-y-2">
                {drawer.warnings.map((warning) => (
                  <BoundaryBanner key={warning}>{warning}</BoundaryBanner>
                ))}
              </div>
            </DrawerShell>
          </div>
        </section>
      </div>
    </main>
  );
}

function GuardrailStrip({ page }: { page: PageSummary }) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <MetricCard label="Data source" value="Mock" detail="Shared SPM-01 scenario; no production persistence." tone="draft" />
      <MetricCard label="Boundary" value="API-ready" detail={page.guardrail} tone="warning" />
      <MetricCard label="Review" value="TBD" detail="RBAC, Legal/Q&C, UBT/IT, and SME review remain open where applicable." tone="review" />
    </div>
  );
}

function renderActiveTab(activeTab: WorkbenchTab, openDrawer: (drawer: DrawerState) => void) {
  if (activeTab === 'dashboard') return <DashboardPage openDrawer={openDrawer} />;
  if (activeTab === 'my-work') return <MyWorkPage openDrawer={openDrawer} />;
  if (activeTab === 'asset-data') return <AssetDataPage openDrawer={openDrawer} />;
  if (activeTab === 'business') return <BusinessPage openDrawer={openDrawer} />;
  if (activeTab === 'integrity') return <IntegrityPage openDrawer={openDrawer} />;
  if (activeTab === 'admin-support') return <AdminSupportPage openDrawer={openDrawer} />;
  return <StateMatrixPage openDrawer={openDrawer} />;
}
function DashboardPage({ openDrawer }: { openDrawer: (drawer: DrawerState) => void }) {
  return (
    <>
      <section className="grid gap-3 lg:grid-cols-3 2xl:grid-cols-6">
        {release5Data.businessKpis.map((card) => (
          <MetricCard
            key={card.id}
            label={card.label}
            value={card.count}
            detail="Opens filtered action context; not a final compliance result."
            tone={card.severity === 'critical' ? 'danger' : card.severity === 'warning' ? 'warning' : 'info'}
            onClick={() => openDrawer({
              title: card.label,
              subtitle: 'Dashboard-to-action local drawer. Filter target is API-ready.',
              rows: [
                { label: 'Count', value: String(card.count) },
                { label: 'Route hint', value: card.routeHint },
                { label: 'Boundary', value: labelize(card.decisionBoundary) }
              ],
              warnings: ['KPI counts are operational indicators only and do not represent final compliance or safety decisions.']
            })}
          />
        ))}
      </section>

      <SectionPanel title="Dashboard-to-Action Matrix" kicker="R5-05 - mock/API-ready action cards" actions={<Toolbar label="Saved views" />}>
        <FilterChips chips={['My role', 'Overdue', 'Missing evidence', 'Pending review', 'Exports pending review']} />
        <DataTable
          rows={release5Data.dashboardActions}
          emptyLabel="No dashboard actions"
          columns={[
            { key: 'label', header: 'Action card', render: (item: DashboardActionCard) => <span className="font-medium text-slate-900">{item.label}</span> },
            { key: 'count', header: 'Count', render: (item: DashboardActionCard) => item.count },
            { key: 'route', header: 'Route hint', render: (item: DashboardActionCard) => <span className="font-mono text-xs">{item.routeHint}</span> },
            { key: 'status', header: 'Status', render: () => <StatusBadge label="API-ready mock" tone="draft" /> }
          ]}
          onOpen={(item) => openDrawer({
            title: item.label,
            subtitle: item.routeHint,
            rows: [
              { label: 'Filter', value: JSON.stringify(item.filter) },
              { label: 'Data source', value: 'Release 2 workflow foundation' },
              { label: 'Status', value: 'API-ready mock' }
            ],
            warnings: ['Dashboard action opens a filtered work list only; final workflow authority remains TBD.']
          })}
        />
      </SectionPanel>

      <SectionPanel title="Page Build Specification Coverage" kicker="R5-05 through R5-08 - route/page summary">
        <DataTable
          rows={pageSummaries}
          emptyLabel="No page summaries"
          columns={[
            { key: 'page', header: 'Page', render: (item: PageSummary) => <span className="font-medium text-slate-900">{item.page}</span> },
            { key: 'users', header: 'Primary users', render: (item: PageSummary) => item.primaryUsers },
            { key: 'status', header: 'Boundary', render: (item: PageSummary) => <StatusBadge label={item.status} tone={toneForStatus(item.status.toLowerCase())} /> },
            { key: 'guardrail', header: 'Guardrail', render: (item: PageSummary) => item.guardrail }
          ]}
        />
      </SectionPanel>
    </>
  );
}

function MyWorkPage({ openDrawer }: { openDrawer: (drawer: DrawerState) => void }) {
  return (
    <>
      <SectionPanel title="My Work / Action Inbox" kicker="R5-05 - task-first, role-scoped queue" actions={<Toolbar label="Batch action disabled" disabled />}>
        <FilterChips chips={['Assigned to me', 'Due soon', 'Overdue', 'Revision required', 'Missing evidence']} />
        <DataTable
          rows={release5Data.myWork}
          emptyLabel="No action items"
          columns={[
            { key: 'priority', header: 'Priority', render: (item: ActionItemRecord) => <StatusBadge label={labelize(item.priority)} tone={toneForStatus(item.priority)} /> },
            { key: 'title', header: 'Action', render: (item: ActionItemRecord) => <span className="font-medium text-slate-900">{item.title}</span> },
            { key: 'module', header: 'Module', render: (item: ActionItemRecord) => labelize(item.module) },
            { key: 'due', header: 'Due', render: (item: ActionItemRecord) => formatDate(item.dueAt) },
            { key: 'status', header: 'Status', render: (item: ActionItemRecord) => <StatusBadge label={labelize(item.status)} /> },
            { key: 'evidence', header: 'Evidence gap', render: (item: ActionItemRecord) => item.missingEvidenceCount }
          ]}
          onOpen={(item) => openDrawer({
            title: item.title,
            subtitle: item.linkedObject.display,
            rows: [
              { label: 'Owner role', value: labelize(item.ownerRole) },
              { label: 'Required authority', value: labelize(item.requiredAuthority) },
              { label: 'Status', value: labelize(item.status) },
              { label: 'Due', value: formatDate(item.dueAt) }
            ],
            warnings: ['Submit, approve, reject, and revision actions remain preliminary and authority-gated.']
          })}
        />
      </SectionPanel>

      <SectionPanel title="Reviewer Work Queue" kicker="R5-08 - approval by exception" actions={<Toolbar label="Authority TBD" disabled />}>
        <FilterChips chips={['Pending review', 'Escalated', 'Revision required', 'Q&C', 'Legal', 'SME']} />
        <DataTable
          rows={release5Data.reviewerQueue}
          emptyLabel="No reviewer queue items"
          columns={[
            { key: 'priority', header: 'Priority', render: (item: ReviewerWorkQueueItem) => <StatusBadge label={labelize(item.priority)} tone={toneForStatus(item.priority)} /> },
            { key: 'title', header: 'Review item', render: (item: ReviewerWorkQueueItem) => <span className="font-medium text-slate-900">{item.title}</span> },
            { key: 'authority', header: 'Authority', render: (item: ReviewerWorkQueueItem) => labelize(item.requiredAuthority) },
            { key: 'age', header: 'Age', render: (item: ReviewerWorkQueueItem) => `${item.ageDays} days` },
            { key: 'risk', header: 'Risk', render: (item: ReviewerWorkQueueItem) => <StatusBadge label={labelize(item.preliminaryRiskLevel)} tone="review" /> },
            { key: 'status', header: 'Status', render: (item: ReviewerWorkQueueItem) => <StatusBadge label={labelize(item.status)} /> }
          ]}
          onOpen={(item) => openDrawer({
            title: item.title,
            subtitle: 'Review drawer - local state only',
            rows: [
              { label: 'Authority', value: labelize(item.requiredAuthority) },
              { label: 'Evidence preview', value: item.evidencePreview.join(', ') || 'TBD' },
              { label: 'History', value: item.history.join(' / ') || 'TBD' },
              { label: 'Status', value: labelize(item.status) }
            ],
            warnings: ['Reviewer action labels are not final legal, certification, RBI, or technical approvals.']
          })}
        />
      </SectionPanel>
    </>
  );
}

function AssetDataPage({ openDrawer }: { openDrawer: (drawer: DrawerState) => void }) {
  return (
    <>
      <SectionPanel title="Asset Registry" kicker="R5-06 - high-volume table plus drawer pattern" actions={<Toolbar label="Import pending" disabled />}>
        <FilterChips chips={['Minimum registry', 'Data gap', 'Pending validation', 'Linked documents', 'RBI candidate']} />
        <DataTable
          rows={release5Data.assets}
          emptyLabel="No assets"
          columns={[
            { key: 'tag', header: 'Tag', render: (item: AssetRecord) => <span className="font-medium text-slate-900">{item.equipmentTag}</span> },
            { key: 'type', header: 'Type', render: (item: AssetRecord) => item.equipmentType },
            { key: 'service', header: 'Service', render: (item: AssetRecord) => item.service },
            { key: 'quality', header: 'Data quality', render: (item: AssetRecord) => <StatusBadge label={labelize(item.dataQualityStatus)} /> },
            { key: 'review', header: 'Review', render: (item: AssetRecord) => <StatusBadge label={labelize(item.reviewStatus)} /> },
            { key: 'docs', header: 'Docs', render: (item: AssetRecord) => item.documentCount }
          ]}
          onOpen={(item) => openDrawer({
            title: `${item.equipmentTag} - ${item.equipmentName}`,
            subtitle: 'Asset detail shell - API-ready mock',
            rows: [
              { label: 'Hierarchy', value: `${item.facilityCode} / ${item.systemCode} / ${item.subsystemCode}` },
              { label: 'Components', value: String(item.componentCount) },
              { label: 'CML/TML', value: String(item.cmlTmlCount) },
              { label: 'Pending validation', value: String(item.pendingValidationIssues) }
            ],
            warnings: ['Asset status does not declare safe, fit-for-operation, or layak operasi.']
          })}
        />
      </SectionPanel>

      <SectionPanel title="Document Repository" kicker="R5-06 - evidence-first document metadata" actions={<Toolbar label="Upload pending storage" disabled />}>
        <FilterChips chips={['Controlled', 'Draft', 'Confidential', 'Reusable evidence', 'Object storage pending']} />
        <DataTable
          rows={release5Data.documents}
          emptyLabel="No documents"
          columns={[
            { key: 'code', header: 'Document', render: (item: DocumentRecord) => <span className="font-medium text-slate-900">{item.documentCode}</span> },
            { key: 'title', header: 'Title', render: (item: DocumentRecord) => item.title },
            { key: 'type', header: 'Type', render: (item: DocumentRecord) => item.documentType },
            { key: 'status', header: 'Status', render: (item: DocumentRecord) => <StatusBadge label={labelize(item.status)} /> },
            { key: 'links', header: 'Links', render: (item: DocumentRecord) => item.linkedObjectCount },
            { key: 'version', header: 'Version', render: (item: DocumentRecord) => `v${item.currentVersion}` }
          ]}
          onOpen={(item) => openDrawer({
            title: item.documentCode,
            subtitle: item.title,
            rows: [
              { label: 'Status', value: labelize(item.status) },
              { label: 'Confidentiality', value: labelize(item.confidentiality) },
              { label: 'Versions', value: String(item.versions.length) },
              { label: 'Storage', value: 'S3-compatible object storage pending' }
            ],
            warnings: ['Document/evidence export does not imply legal, certification, or technical acceptance.']
          })}
        />
      </SectionPanel>

      <SectionPanel title="Validation Queue" kicker="R5-06 - staged data quality controls">
        <DataTable
          rows={release5Data.validationQueue}
          emptyLabel="No validation issues"
          columns={[
            { key: 'severity', header: 'Severity', render: (item: ValidationQueueItem) => <StatusBadge label={labelize(item.severity)} /> },
            { key: 'object', header: 'Object', render: (item: ValidationQueueItem) => labelize(item.objectType) },
            { key: 'field', header: 'Field', render: (item: ValidationQueueItem) => item.field },
            { key: 'message', header: 'Message', render: (item: ValidationQueueItem) => item.message },
            { key: 'status', header: 'Status', render: (item: ValidationQueueItem) => <StatusBadge label={labelize(item.status)} /> },
            { key: 'blocked', header: 'Baseline write', render: (item: ValidationQueueItem) => item.baselineWriteBlocked ? <StatusBadge label="Blocked" tone="warning" /> : <StatusBadge label="Allowed" tone="success" /> }
          ]}
          onOpen={(item) => openDrawer({
            title: item.issueCode,
            subtitle: item.sourceFileName,
            rows: [
              { label: 'Row', value: String(item.rowNumber) },
              { label: 'Field', value: item.field },
              { label: 'Assignee role', value: labelize(item.assigneeRole) },
              { label: 'Baseline write', value: item.baselineWriteBlocked ? 'Blocked until validation' : 'Allowed' }
            ],
            warnings: ['Staged/imported data remains Data Gap or Pending Validation until reviewed.']
          })}
        />
      </SectionPanel>
    </>
  );
}
function BusinessPage({ openDrawer }: { openDrawer: (drawer: DrawerState) => void }) {
  return (
    <>
      <SectionPanel title="Inspection Tracking" kicker="R5-07 - due/overdue list with workpack drawer" actions={<Toolbar label="Schedule API-ready" />}>
        <FilterChips chips={['Overdue', 'Due soon', 'Scheduled', 'Pending review', 'Evidence gap']} />
        <DataTable
          rows={release5Data.inspections}
          emptyLabel="No inspection records"
          columns={[
            { key: 'priority', header: 'Priority', render: (item: InspectionDueRecord) => <StatusBadge label={labelize(item.priority)} tone={toneForStatus(item.priority)} /> },
            { key: 'equipment', header: 'Equipment', render: (item: InspectionDueRecord) => <span className="font-medium text-slate-900">{item.equipmentTag}</span> },
            { key: 'due', header: 'Due date', render: (item: InspectionDueRecord) => formatDate(item.dueDate) },
            { key: 'dueStatus', header: 'Due status', render: (item: InspectionDueRecord) => <StatusBadge label={labelize(item.dueStatus)} /> },
            { key: 'status', header: 'Inspection status', render: (item: InspectionDueRecord) => <StatusBadge label={labelize(item.inspectionStatus)} /> },
            { key: 'next', header: 'Next action', render: (item: InspectionDueRecord) => item.nextAction }
          ]}
          onOpen={(item) => {
            const workpack = release5Data.workpacks.find((candidate) => candidate.id === item.workpackId);
            openDrawer({
              title: `${item.equipmentTag} inspection`,
              subtitle: workpack?.workpackCode ?? 'Workpack pending',
              rows: [
                { label: 'Basis', value: item.statutoryBasis },
                { label: 'Assigned role', value: labelize(item.assignedInspectorRole) },
                { label: 'Workpack status', value: labelize(workpack?.status) },
                { label: 'Review status', value: labelize(item.reviewStatus) }
              ],
              warnings: ['Inspection tracking supports due and evidence workflow only. It does not declare layak operasi or fit-for-operation.']
            });
          }}
        />
      </SectionPanel>

      <SectionPanel title="Certification Register" kicker="R5-07 - certification support, not certificate issuance" actions={<Toolbar label="Submission disabled" disabled />}>
        <FilterChips chips={['Due', 'Evidence pending', 'Data gap', 'Submission log', 'No PLO issuance']} />
        <DataTable
          rows={release5Data.certifications}
          emptyLabel="No certification records"
          columns={[
            { key: 'code', header: 'Certificate', render: (item: CertificationRecord) => <span className="font-medium text-slate-900">{item.certificateCode}</span> },
            { key: 'equipment', header: 'Equipment', render: (item: CertificationRecord) => item.equipmentTag },
            { key: 'renewal', header: 'Renewal due', render: (item: CertificationRecord) => formatDate(item.renewalDueDate) },
            { key: 'status', header: 'Register status', render: (item: CertificationRecord) => <StatusBadge label={labelize(item.certificationStatus)} /> },
            { key: 'ready', header: 'Readiness', render: (item: CertificationRecord) => <StatusBadge label={labelize(item.readinessStatus)} /> },
            { key: 'evidence', header: 'Evidence', render: (item: CertificationRecord) => `${item.availableEvidenceCount}/${item.requiredEvidenceCount}` }
          ]}
          onOpen={(item) => openDrawer({
            title: item.certificateCode,
            subtitle: 'Certification support drawer',
            rows: [
              { label: 'Type', value: item.certificateType },
              { label: 'Submission log', value: labelize(item.submissionLogStatus) },
              { label: 'Gap count', value: String(item.gapCount) },
              { label: 'Next action', value: item.nextAction }
            ],
            warnings: ['This register supports readiness tracking only. It does not create certificates or PLO.']
          })}
        />
      </SectionPanel>

      <section className="grid gap-4 xl:grid-cols-2">
        <SectionPanel title="Evidence Pack Builder" kicker="R5-07 - reusable evidence and export warning">
          <div className="space-y-4">
            {release5Data.evidencePacks.map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => openDrawer({
                  title: pack.packCode,
                  subtitle: pack.title,
                  rows: [
                    { label: 'Context', value: labelize(pack.contextType) },
                    { label: 'Completeness', value: `${pack.completenessPercent}%` },
                    { label: 'Missing', value: String(pack.missingItemCount) },
                    { label: 'Export', value: labelize(pack.exportReadyStatus) }
                  ],
                  warnings: ['Evidence pack export readiness is a review state, not final acceptance.']
                })}
                className="w-full border border-aim-line bg-white p-4 text-left hover:bg-aim-field"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{pack.packCode}</p>
                    <p className="mt-1 text-sm text-slate-600">{pack.title}</p>
                  </div>
                  <StatusBadge label={labelize(pack.reviewStatus)} />
                </div>
                <div className="mt-3">
                  <ProgressBar value={pack.completenessPercent} label="Completeness check" />
                </div>
              </button>
            ))}
          </div>
        </SectionPanel>

        <SectionPanel title="Evidence Checklist" kicker="R5-07 - gaps remain visible">
          <DataTable
            rows={release5Data.evidenceChecklists}
            emptyLabel="No evidence checklists"
            columns={[
              { key: 'title', header: 'Checklist', render: (item: EvidenceChecklistRecord) => <span className="font-medium text-slate-900">{item.title}</span> },
              { key: 'context', header: 'Context', render: (item: EvidenceChecklistRecord) => labelize(item.contextType) },
              { key: 'status', header: 'Status', render: (item: EvidenceChecklistRecord) => <StatusBadge label={labelize(item.status)} /> },
              { key: 'available', header: 'Available', render: (item: EvidenceChecklistRecord) => `${item.availableCount}/${item.requiredCount}` },
              { key: 'gaps', header: 'Gaps', render: (item: EvidenceChecklistRecord) => item.gapCount }
            ]}
          />
        </SectionPanel>
      </section>
    </>
  );
}

function IntegrityPage({ openDrawer }: { openDrawer: (drawer: DrawerState) => void }) {
  return (
    <>
      <SectionPanel title="Integrity Dashboard" kicker="Release 4 Integrity Workbench surfaces retained under Release 5">
        <FilterChips chips={['RBI Candidates', 'RBI Assessment', 'Operating Data', 'Damage Mechanism', 'PoF/CoF Helper', 'Preliminary Risk Ranking', 'Risk Register', 'Integrity Dashboard']} />
        <div className="grid gap-3 md:grid-cols-4">
          <MetricCard label="RBI Candidates" value={release5Data.rbiCandidates.length} detail="Candidate routing remains controlled and preliminary." tone="review" />
          <MetricCard label="RBI Assessment" value={release5Data.rbiAssessments.length} detail="Assessment shells use draft/preliminary labels." tone="warning" />
          <MetricCard label="Risk Register" value={release5Data.riskRegisterItems.length} detail="Risk items remain linked and preliminary." tone="review" />
          <MetricCard label="SME Gate" value="TBD" detail="RBI methodology and standard-version decisions remain open." tone="warning" />
        </div>
      </SectionPanel>

      <SectionPanel title="RBI Candidate Routing" kicker="R5-08 - controlled candidate list" actions={<Toolbar label="Route API-ready" />}>
        <FilterChips chips={['Scoped for RBI', 'SME basis TBD', 'Data gap', 'Assessment in progress', 'No final ranking']} />
        <DataTable
          rows={release5Data.rbiCandidates}
          emptyLabel="No RBI candidates"
          columns={[
            { key: 'priority', header: 'Priority', render: (item: RbiCandidateRecord) => <StatusBadge label={labelize(item.priority)} tone={toneForStatus(item.priority)} /> },
            { key: 'equipment', header: 'Equipment', render: (item: RbiCandidateRecord) => <span className="font-medium text-slate-900">{item.equipmentTag}</span> },
            { key: 'basis', header: 'Basis', render: (item: RbiCandidateRecord) => labelize(item.scopingBasis) },
            { key: 'status', header: 'Status', render: (item: RbiCandidateRecord) => <StatusBadge label={labelize(item.status)} /> },
            { key: 'quality', header: 'Data quality', render: (item: RbiCandidateRecord) => <StatusBadge label={labelize(item.dataQualityStatus)} /> },
            { key: 'next', header: 'Next action', render: (item: RbiCandidateRecord) => item.nextAction }
          ]}
          onOpen={(item) => openDrawer({
            title: `${item.equipmentTag} RBI candidate`,
            subtitle: 'Candidate routing drawer',
            rows: [
              { label: 'Scoping basis', value: labelize(item.scopingBasis) },
              { label: 'Status', value: labelize(item.status) },
              { label: 'Data quality', value: labelize(item.dataQualityStatus) },
              { label: 'Notes', value: item.scopingNotes }
            ],
            warnings: ['RBI candidate routing does not create final RBI, RLA, FFS, or interval decisions.']
          })}
        />
      </SectionPanel>

      <SectionPanel title="RBI Assessment Stepper" kicker="R5-08 - draft/preliminary assessment detail">
        <DataTable
          rows={release5Data.rbiAssessments}
          emptyLabel="No RBI assessments"
          columns={[
            { key: 'code', header: 'Assessment', render: (item: RbiAssessmentRecord) => <span className="font-medium text-slate-900">{item.assessmentCode}</span> },
            { key: 'equipment', header: 'Equipment', render: (item: RbiAssessmentRecord) => item.equipmentTag },
            { key: 'status', header: 'Status', render: (item: RbiAssessmentRecord) => <StatusBadge label={labelize(item.status)} /> },
            { key: 'method', header: 'Methodology', render: (item: RbiAssessmentRecord) => <StatusBadge label={labelize(item.methodologyStatus)} tone="review" /> },
            { key: 'opdata', header: 'Operating data', render: (item: RbiAssessmentRecord) => <StatusBadge label={labelize(item.operatingDataStatus)} /> },
            { key: 'reviewer', header: 'Reviewer', render: (item: RbiAssessmentRecord) => labelize(item.reviewerRole) }
          ]}
          onOpen={(item) => openDrawer({
            title: item.assessmentCode,
            subtitle: item.title,
            rows: [
              { label: 'Current step', value: labelize(item.status) },
              { label: 'Methodology', value: labelize(item.methodologyStatus) },
              { label: 'Evidence pack', value: item.evidencePackId ?? 'TBD' },
              { label: 'Reviewer', value: labelize(item.reviewerRole) }
            ],
            warnings: ['Assessment output is draft/preliminary. SME-approved methodology remains TBD.']
          })}
        />
      </SectionPanel>

      <section className="grid gap-4 xl:grid-cols-2">
        <SectionPanel title="Operating Data & Damage Mechanism" kicker="R5-08 - data gaps stay visible">
          <div className="space-y-4">
            <DataTable
              rows={release5Data.operatingData}
              emptyLabel="No operating data"
              columns={[
                { key: 'parameter', header: 'Parameter', render: (item) => <span className="font-medium text-slate-900">{item.parameterName}</span> },
                { key: 'value', header: 'Value', render: (item) => `${item.parameterValue} ${labelize(item.unit)}` },
                { key: 'source', header: 'Source', render: (item) => item.dataSource },
                { key: 'quality', header: 'Quality', render: (item) => <StatusBadge label={labelize(item.dataQualityStatus)} /> }
              ]}
            />
            <DataTable
              rows={release5Data.damageMechanisms}
              emptyLabel="No damage mechanisms"
              columns={[
                { key: 'mechanism', header: 'Mechanism', render: (item) => <span className="font-medium text-slate-900">{item.mechanismName}</span> },
                { key: 'category', header: 'Category', render: (item) => labelize(item.category) },
                { key: 'susceptible', header: 'Susceptible', render: (item) => <StatusBadge label={labelize(item.susceptible)} tone="review" /> },
                { key: 'status', header: 'Status', render: (item) => <StatusBadge label={labelize(item.status)} /> }
              ]}
            />
          </div>
        </SectionPanel>

        <SectionPanel title="PoF/CoF Helper & Preliminary Risk" kicker="R5-08 - no formula engine">
          <div className="space-y-4 text-sm">
            <BoundaryBanner>PoF/CoF helper records draft inputs only. Final methodology and formulas require SME approval.</BoundaryBanner>
            <DetailRow label="PoF helper" value={labelize(release5Data.pofCofHelper?.pofResult)} />
            <DetailRow label="CoF helper" value={labelize(release5Data.pofCofHelper?.cofResult)} />
            <DetailRow label="Risk ranking" value={labelize(release5Data.riskRanking?.overallRiskLevel)} />
            <DetailRow label="Ranking status" value={labelize(release5Data.riskRanking?.status)} />
            <DataTable
              rows={release5Data.riskRegisterItems}
              emptyLabel="No risk register items"
              columns={[
                { key: 'equipment', header: 'Equipment', render: (item: RiskRegisterItemRecord) => <span className="font-medium text-slate-900">{item.equipmentTag}</span> },
                { key: 'risk', header: 'Risk', render: (item: RiskRegisterItemRecord) => item.riskTitle },
                { key: 'level', header: 'Level', render: (item: RiskRegisterItemRecord) => <StatusBadge label={labelize(item.overallRiskLevel)} tone="review" /> },
                { key: 'status', header: 'Status', render: (item: RiskRegisterItemRecord) => <StatusBadge label={labelize(item.status)} /> }
              ]}
            />
          </div>
        </SectionPanel>
      </section>
    </>
  );
}
function StateMatrixPage({ openDrawer }: { openDrawer: (drawer: DrawerState) => void }) {
  return (
    <>
      <SectionPanel title="Route Navigation Matrix" kicker="R5-02 - planned routes visible without fake production routing">
        <DataTable
          rows={routeItems}
          emptyLabel="No routes"
          columns={[
            { key: 'route', header: 'Route', render: (item: RouteItem) => <span className="font-mono text-xs text-slate-900">{item.route}</span> },
            { key: 'label', header: 'Page', render: (item: RouteItem) => <span className="font-medium text-slate-900">{item.label}</span> },
            { key: 'module', header: 'Module', render: (item: RouteItem) => item.module },
            { key: 'roles', header: 'Roles', render: (item: RouteItem) => item.roles },
            { key: 'data', header: 'Data source', render: (item: RouteItem) => <StatusBadge label={item.dataStatus} tone={toneForStatus(item.dataStatus.toLowerCase())} /> },
            { key: 'status', header: 'Status', render: (item: RouteItem) => <StatusBadge label={item.status} tone={toneForStatus(item.status.toLowerCase())} /> }
          ]}
          onOpen={(item) => openDrawer({
            title: item.label,
            subtitle: item.route,
            rows: [
              { label: 'Module', value: item.module },
              { label: 'Roles', value: item.roles },
              { label: 'Data source', value: item.dataStatus },
              { label: 'Permission note', value: item.permissionNote }
            ],
            warnings: ['Route visibility is a planning/UX boundary until final RBAC and routing implementation are approved.']
          })}
        />
      </SectionPanel>

      <section className="grid gap-4 xl:grid-cols-2">
        <SectionPanel title="Reusable Component Contract" kicker="R5-03 - implemented primitives and forbidden use">
          <DataTable
            rows={componentContracts.map((item, index) => ({ id: `${index}-${item.name}`, ...item }))}
            emptyLabel="No component contract items"
            columns={[
              { key: 'name', header: 'Component', render: (item: ComponentContractItem & { id: string }) => <span className="font-medium text-slate-900">{item.name}</span> },
              { key: 'purpose', header: 'Purpose', render: (item: ComponentContractItem & { id: string }) => item.purpose },
              { key: 'status', header: 'Status', render: (item: ComponentContractItem & { id: string }) => <StatusBadge label={item.status} /> },
              { key: 'forbidden', header: 'Forbidden use', render: (item: ComponentContractItem & { id: string }) => item.forbiddenUse }
            ]}
          />
        </SectionPanel>

        <SectionPanel title="Interaction State Matrix" kicker="R5-09 - API-ready, disabled, and pending backend behavior">
          <DataTable
            rows={interactionStates.map((item, index) => ({ id: `${index}-${item.label}`, ...item }))}
            emptyLabel="No interaction states"
            columns={[
              { key: 'label', header: 'Interaction', render: (item: InteractionStateItem & { id: string }) => <span className="font-medium text-slate-900">{item.label}</span> },
              { key: 'state', header: 'State', render: (item: InteractionStateItem & { id: string }) => <StatusBadge label={item.state} /> },
              { key: 'behavior', header: 'Behavior', render: (item: InteractionStateItem & { id: string }) => item.behavior },
              { key: 'guardrail', header: 'Guardrail', render: (item: InteractionStateItem & { id: string }) => item.guardrail }
            ]}
          />
        </SectionPanel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <SectionPanel title="Functional Boundary Map" kicker="R5-09 - what is visual, mock, API-ready, or blocked">
          <DataTable
            rows={boundaryItems.map((item, index) => ({ id: `${index}-${item.area}`, ...item }))}
            emptyLabel="No boundary items"
            columns={[
              { key: 'area', header: 'Area', render: (item: BoundaryItem & { id: string }) => <span className="font-medium text-slate-900">{item.area}</span> },
              { key: 'boundary', header: 'Boundary', render: (item: BoundaryItem & { id: string }) => <StatusBadge label={item.boundary} tone={toneForStatus(item.boundary.toLowerCase())} /> },
              { key: 'blocker', header: 'Blocker', render: (item: BoundaryItem & { id: string }) => item.blocker }
            ]}
          />
        </SectionPanel>

        <SectionPanel title="Required UI States" kicker="R5-10 - empty, loading, error, and access denied">
          <div className="space-y-4">
            <EmptyState title="Empty state" detail="No records for the selected scope; safe next action remains visible." />
            <LoadingState />
            <ErrorState />
            <AccessDeniedState />
          </div>
        </SectionPanel>
      </section>
    </>
  );
}

function AdminSupportPage({ openDrawer }: { openDrawer: (drawer: DrawerState) => void }) {
  const adminRoutes = routeItems.filter((item) => item.id === 'admin' || item.id === 'helpdesk');
  return (
    <>
      <section className="grid gap-3 lg:grid-cols-3">
        <MetricCard label="RBAC matrix" value="TBD" detail="Final role-to-navigation visibility remains Needs UBT/IT + Project Owner Review." tone="review" />
        <MetricCard label="OIDC/Auth" value="Pending" detail="Authentication integration is out of Release 5 scope." tone="warning" />
        <MetricCard label="Helpdesk" value="Mock" detail="Support and bug-log route is UI-ready, backend pending." tone="draft" />
      </section>

      <SectionPanel title="Administration & Helpdesk Route Plan" kicker="R5-05/R5-10 - support and access boundaries">
        <DataTable
          rows={adminRoutes}
          emptyLabel="No admin/support routes"
          columns={[
            { key: 'route', header: 'Route', render: (item: RouteItem) => <span className="font-mono text-xs">{item.route}</span> },
            { key: 'label', header: 'Page', render: (item: RouteItem) => <span className="font-medium text-slate-900">{item.label}</span> },
            { key: 'roles', header: 'Roles', render: (item: RouteItem) => item.roles },
            { key: 'data', header: 'Data', render: (item: RouteItem) => <StatusBadge label={item.dataStatus} /> },
            { key: 'note', header: 'Permission note', render: (item: RouteItem) => item.permissionNote }
          ]}
          onOpen={(item) => openDrawer({
            title: item.label,
            subtitle: item.route,
            rows: [
              { label: 'Status', value: item.status },
              { label: 'Data source', value: item.dataStatus },
              { label: 'Roles', value: item.roles },
              { label: 'Review', value: item.permissionNote }
            ],
            warnings: ['Administration and helpdesk screens must not grant final technical, legal, or certification authority.']
          })}
        />
      </SectionPanel>

      <section className="grid gap-4 xl:grid-cols-2">
        <SectionPanel title="Acceptance Checklist Snapshot" kicker="R5-10 - visual readiness controls">
          <div className="space-y-2">
            {acceptanceItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 border-b border-aim-line py-2 text-sm last:border-b-0">
                <span>{item.label}</span>
                <StatusBadge label={item.status} tone={item.status === 'Needs review' ? 'review' : 'success'} />
              </div>
            ))}
          </div>
        </SectionPanel>

        <SectionPanel title="Export Warning Panel" kicker="R5-09 - export behavior remains approval/audit-bound">
          <div className="space-y-4">
            {release5Data.exportLogs.map((log: ExportLogRecord) => (
              <button
                key={log.id}
                type="button"
                onClick={() => openDrawer({
                  title: log.exportType,
                  subtitle: log.purpose,
                  rows: [
                    { label: 'Object', value: `${log.objectType} / ${log.objectId}` },
                    { label: 'Approval status', value: labelize(log.approvalStatus) },
                    { label: 'Version', value: String(log.version) },
                    { label: 'Boundary', value: labelize(log.decisionBoundary) }
                  ],
                  warnings: ['Export log readiness is not legal, certification, or technical approval.']
                })}
                className="w-full border border-amber-300 bg-amber-50 p-4 text-left text-sm text-amber-950 hover:bg-amber-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold">{labelize(log.exportType)}</span>
                  <StatusBadge label={labelize(log.approvalStatus)} tone="warning" />
                </div>
                <p className="mt-2 leading-6">{log.purpose}</p>
              </button>
            ))}
          </div>
        </SectionPanel>
      </section>
    </>
  );
}

function Toolbar({ label, disabled = false }: { label: string; disabled?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" className="grid h-9 w-9 place-items-center rounded-md border border-aim-line bg-white text-slate-700 hover:bg-aim-field" title="Search">
        <Search aria-hidden size={16} />
      </button>
      <button type="button" className="grid h-9 w-9 place-items-center rounded-md border border-aim-line bg-white text-slate-700 hover:bg-aim-field" title="Filter">
        <Filter aria-hidden size={16} />
      </button>
      <button
        type="button"
        disabled={disabled}
        className="flex h-9 items-center gap-2 rounded-md border border-aim-line bg-white px-3 text-sm font-medium text-aim-action disabled:cursor-not-allowed disabled:bg-aim-field disabled:text-slate-500"
        title={disabled ? 'Pending backend/RBAC review' : label}
      >
        <Eye aria-hidden size={16} />
        {label}
      </button>
    </div>
  );
}




