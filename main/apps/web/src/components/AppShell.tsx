import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Filter,
  Inbox,
  Layers3,
  ListChecks,
  LockKeyhole,
  Search,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import {
  decisionBoundaryNotice,
  defaultTenantScope,
  release0PlatformAdmin,
  Release3BusinessFoundation,
  Release4IntegrityFoundation,
  type BusinessKpiCard,
  type CertificationRecord,
  type EvidenceChecklistRecord,
  type EvidencePackRecord,
  type InspectionDueRecord,
  type RbiAssessmentRecord,
  type RbiCandidateRecord,
  type RiskRegisterItemRecord,
  type WorkpackRecord
} from '@aim-platform/shared';
import type { ReactNode } from 'react';

const business = new Release3BusinessFoundation();
const integrity = new Release4IntegrityFoundation();
const inspections = business.listInspectionDue(release0PlatformAdmin, defaultTenantScope, { pageSize: 25 }).data;
const workpacks = business.listWorkpacks(release0PlatformAdmin, defaultTenantScope, { pageSize: 25 }).data;
const certifications = business.listCertificationRegister(release0PlatformAdmin, defaultTenantScope, { pageSize: 25 }).data;
const checklists = business.listEvidenceChecklists(release0PlatformAdmin, defaultTenantScope, { pageSize: 25 }).data;
const packs = business.listEvidencePacks(release0PlatformAdmin, defaultTenantScope, { pageSize: 25 }).data;
const kpis = business.listBusinessKpis(release0PlatformAdmin, defaultTenantScope).data;
const rbiCandidates = integrity.listRbiCandidates(release0PlatformAdmin, defaultTenantScope, { pageSize: 25 }).data;
const assessments = integrity.listAssessments(release0PlatformAdmin, defaultTenantScope, { pageSize: 25 }).data;
const firstAssessmentId = assessments[0]?.id;
const operatingData = firstAssessmentId ? integrity.listOperatingData(release0PlatformAdmin, defaultTenantScope, firstAssessmentId).data : [];
const damageMechanisms = firstAssessmentId ? integrity.listDamageMechanisms(release0PlatformAdmin, defaultTenantScope, firstAssessmentId).data : [];
const pofCof = firstAssessmentId ? integrity.getPofCofHelper(release0PlatformAdmin, defaultTenantScope, firstAssessmentId).data : null;
const riskRanking = firstAssessmentId ? integrity.getRiskRanking(release0PlatformAdmin, defaultTenantScope, firstAssessmentId).data : null;
const riskRegisterItems = firstAssessmentId ? integrity.listRiskRegisterItems(release0PlatformAdmin, defaultTenantScope, firstAssessmentId).data : [];
const selectedInspection = inspections[0];
const selectedWorkpack = workpacks[0];
const selectedPack = packs[0];

const navigation = [
  { label: 'Inspection Due', status: `${inspections.length} tracked`, icon: Clock3 },
  { label: 'Workpack', status: `${workpacks.length} skeletons`, icon: Layers3 },
  { label: 'Certification Register', status: `${certifications.length} rows`, icon: ShieldCheck },
  { label: 'Evidence Pack', status: `${packs.length} previews`, icon: FileText },
  { label: 'Dashboard KPI', status: `${kpis.length} cards`, icon: ListChecks },
  { label: 'Review Queue Link', status: 'R2 reused', icon: UserCheck },
  { label: 'RBI Candidates', status: `${rbiCandidates.length} routed`, icon: BarChart3 },
  { label: 'RBI Assessment', status: `${assessments.length} shells`, icon: Layers3 },
  { label: 'Risk Register', status: `${riskRegisterItems.length} items`, icon: ShieldCheck },
  { label: 'Integrity Dashboard', status: `${assessments.length} active`, icon: ListChecks }
];

const stateChecks = [
  { label: 'Empty', value: 'defined' },
  { label: 'Loading', value: 'defined' },
  { label: 'Error', value: 'defined' },
  { label: 'Access Denied', value: 'defined' }
];

export function AppShell() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-aim-ink">
      <div className="grid min-h-screen grid-cols-[280px_1fr] max-lg:grid-cols-1">
        <aside className="border-r border-aim-line bg-white px-4 py-5 max-lg:border-b max-lg:border-r-0">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aim-action">AIM Platform</p>
            <h1 className="mt-1 text-xl font-semibold">Release 3 Business Workbench</h1>
          </div>

          <div className="space-y-3 rounded-md border border-aim-line bg-aim-field p-3">
            <ScopedSelect id="tenant" label="Tenant" value={defaultTenantScope.tenantId} display="SBU AEBT Demo Tenant" />
            <ScopedSelect id="project" label="Project" value={defaultTenantScope.projectId} display="SPM-01 Demo Project" />
            <ScopedSelect id="site" label="Site" value={defaultTenantScope.siteId} display="SPM-01 Demo Site" />
          </div>

          <nav className="mt-5 space-y-1" aria-label="Release 3 navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm hover:bg-aim-field">
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon aria-hidden size={17} />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="ml-2 shrink-0 text-xs text-slate-500">{item.status}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 px-6 py-5">
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-aim-line pb-4">
            <div>
              <p className="text-sm font-medium text-slate-600">{release0PlatformAdmin.displayName}</p>
              <h2 className="text-2xl font-semibold">First Business Modules</h2>
            </div>
            <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              <AlertTriangle aria-hidden className="mr-2 inline" size={16} />
              Draft/preliminary boundary active
            </div>
          </header>

          <KpiCards cards={kpis} />

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
            <div className="min-w-0 space-y-4">
              <Panel title="Inspection Due" icon={<Clock3 aria-hidden size={18} />} actions={<ToolbarActions primary="Open" />}>
                <FilterBar chips={['Overdue', 'Due soon', 'Scheduled', 'Pending review']} />
                <InspectionTable items={inspections} />
              </Panel>

              <Panel title="Certification Register" icon={<ShieldCheck aria-hidden size={18} />} actions={<ToolbarActions primary="Review" />}>
                <FilterBar chips={['Due', 'Evidence gap', 'Readiness', 'Submission log']} />
                <CertificationTable items={certifications} />
              </Panel>

              <Panel title="Evidence Checklist" icon={<FileText aria-hidden size={18} />} actions={<ToolbarActions primary="Build" />}>
                <FilterBar chips={['Required evidence', 'Reusable documents', 'Gap found', 'Reviewer route']} />
                <EvidenceChecklistTable items={checklists} />
              </Panel>

              <section className="grid gap-3 md:grid-cols-4">
                {stateChecks.map((state) => (
                  <div key={state.label} className="rounded-md border border-aim-line bg-white px-3 py-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{state.label}</span>
                      <CheckCircle2 aria-hidden size={16} className="text-teal-700" />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{state.value}</p>
                  </div>
                ))}
              </section>
            </div>

            <aside className="space-y-4">
              <Panel title="Workpack Drawer" icon={<Eye aria-hidden size={18} />}>
                <WorkpackDrawer inspection={selectedInspection} workpack={selectedWorkpack} />
              </Panel>

              <Panel title="Evidence Pack" icon={<FileText aria-hidden size={18} />}>
                <EvidencePackSummary pack={selectedPack} />
              </Panel>

              <Panel title="Decision Boundary" icon={<LockKeyhole aria-hidden size={18} />}>
                <p className="text-sm leading-6 text-slate-700">{decisionBoundaryNotice}</p>
                <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  Release 3 shows tracking, readiness, completeness, and review routing only. Authorized people make final technical and certification decisions outside automation.
                </div>
              </Panel>
            </aside>
          </section>
        </section>
      </div>
    </main>
  );
}

function KpiCards({ cards }: { cards: BusinessKpiCard[] }) {
  const tones: Record<string, string> = {
    inspection_overdue: 'border-rose-500',
    inspection_due_soon: 'border-amber-500',
    certification_due: 'border-sky-500',
    certification_expired: 'border-red-600',
    evidence_gaps: 'border-violet-500',
    workpack_pending_review: 'border-teal-600'
  };
  return (
    <section className="mb-4 grid gap-3 md:grid-cols-3 2xl:grid-cols-6">
      {cards.map((card) => (
        <button key={card.id} className={`rounded-md border border-l-4 ${tones[card.id]} bg-white px-4 py-3 text-left hover:bg-aim-field`}>
          <span className="block text-xs font-semibold uppercase text-slate-500">{card.label}</span>
          <span className="mt-1 flex items-end justify-between gap-2">
            <span className="text-2xl font-semibold">{card.count}</span>
            <span className="text-right text-xs text-slate-500">{labelize(card.severity)}</span>
          </span>
        </button>
      ))}
    </section>
  );
}

function ScopedSelect({ id, label, value, display }: { id: string; label: string; value: string; display: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600" htmlFor={id}>{label}</label>
      <select id={id} className="mt-1 h-9 w-full rounded-md border border-aim-line bg-white px-2 text-sm" defaultValue={value}>
        <option value={value}>{display}</option>
      </select>
    </div>
  );
}

function Panel({ title, icon, actions, children }: { title: string; icon: ReactNode; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-md border border-aim-line bg-white">
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-aim-line px-4 py-3">
        <h3 className="flex min-w-0 items-center gap-2 text-base font-semibold">
          {icon}
          <span className="truncate">{title}</span>
        </h3>
        {actions}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function ToolbarActions({ primary }: { primary: string }) {
  return (
    <div className="flex items-center gap-2">
      <button className="grid h-9 w-9 place-items-center rounded-md border border-aim-line bg-white text-slate-700 hover:bg-aim-field" title="Search">
        <Search aria-hidden size={16} />
      </button>
      <button className="grid h-9 w-9 place-items-center rounded-md border border-aim-line bg-white text-slate-700 hover:bg-aim-field" title="Filter">
        <Filter aria-hidden size={16} />
      </button>
      <button className="flex h-9 items-center gap-2 rounded-md bg-aim-action px-3 text-sm font-medium text-white hover:bg-teal-800">
        <Eye aria-hidden size={16} />
        {primary}
      </button>
    </div>
  );
}

function FilterBar({ chips }: { chips: string[] }) {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span key={chip} className="rounded-md border border-aim-line bg-aim-field px-2 py-1 text-xs font-medium text-slate-700">{chip}</span>
      ))}
    </div>
  );
}

function InspectionTable({ items }: { items: InspectionDueRecord[] }) {
  return <DataTable headers={['Priority', 'Equipment', 'Due', 'Due Status', 'Inspection Status', 'Next Action']} rows={items.map((item) => [labelize(item.priority), item.equipmentTag, item.dueDate.slice(0, 10), labelize(item.dueStatus), labelize(item.inspectionStatus), item.nextAction])} rowKey={(row) => row[1] ?? 'inspection'} />;
}

function CertificationTable({ items }: { items: CertificationRecord[] }) {
  return <DataTable headers={['Certificate', 'Equipment', 'Renewal Due', 'Status', 'Readiness', 'Evidence']} rows={items.map((item) => [item.certificateCode, item.equipmentTag, item.renewalDueDate.slice(0, 10), labelize(item.certificationStatus), labelize(item.readinessStatus), `${item.availableEvidenceCount}/${item.requiredEvidenceCount}`])} rowKey={(row) => row[0] ?? 'certification'} />;
}

function EvidenceChecklistTable({ items }: { items: EvidenceChecklistRecord[] }) {
  return <DataTable headers={['Context', 'Checklist', 'Status', 'Required', 'Available', 'Gaps']} rows={items.map((item) => [labelize(item.contextType), item.title, labelize(item.status), `${item.requiredCount}`, `${item.availableCount}`, `${item.gapCount}`])} rowKey={(row) => `${row[0]}-${row[1]}`} />;
}

function DataTable({ headers, rows, rowKey }: { headers: string[]; rows: string[][]; rowKey: (row: string[]) => string }) {
  return (
    <div className="overflow-x-auto rounded-md border border-aim-line">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead className="bg-aim-field text-xs uppercase text-slate-600">
          <tr>{headers.map((header) => <th key={header} className="px-3 py-3 font-semibold">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-t border-aim-line">
              {row.map((cell, index) => (
                <td key={`${rowKey(row)}-${index}`} className={`px-3 py-3 align-top ${index === 1 ? 'font-medium text-slate-900' : 'text-slate-700'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WorkpackDrawer({ inspection, workpack }: { inspection: InspectionDueRecord | undefined; workpack: WorkpackRecord | undefined }) {
  if (!inspection || !workpack) return <p className="text-sm text-slate-600">No workpack selected.</p>;
  return (
    <div>
      <div className="rounded-md border border-aim-line bg-aim-field p-3">
        <p className="text-xs font-semibold uppercase text-slate-500">{workpack.workpackCode}</p>
        <h4 className="mt-1 text-lg font-semibold">{workpack.title}</h4>
        <p className="mt-1 text-sm text-slate-700">{workpack.scopeSummary}</p>
      </div>
      <div className="mt-4 space-y-3">
        <DetailRow label="Equipment" value={`${inspection.equipmentTag} / ${inspection.equipmentType}`} />
        <DetailRow label="Due status" value={labelize(inspection.dueStatus)} />
        <DetailRow label="Workpack status" value={labelize(workpack.status)} />
        <DetailRow label="Reviewer" value={labelize(workpack.reviewerRole)} />
      </div>
      <div className="mt-4 border-t border-aim-line pt-4">
        <h5 className="text-sm font-semibold">Workflow Steps</h5>
        <div className="mt-2 space-y-2">
          {workpack.steps.map((step) => (
            <div key={step.id} className="flex items-center justify-between gap-3 border-b border-aim-line py-2 text-sm last:border-b-0">
              <span>{step.label}</span>
              <span className="rounded-md bg-aim-field px-2 py-1 text-xs font-medium text-slate-700">{labelize(step.status)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="flex h-9 items-center justify-center gap-2 rounded-md border border-aim-line text-sm font-medium hover:bg-aim-field">
          <Inbox aria-hidden size={15} />Queue
        </button>
        <button className="flex h-9 items-center justify-center gap-2 rounded-md border border-aim-line text-sm font-medium hover:bg-aim-field">
          <ListChecks aria-hidden size={15} />Checklist
        </button>
      </div>
    </div>
  );
}

function EvidencePackSummary({ pack }: { pack: EvidencePackRecord | undefined }) {
  if (!pack) return <p className="text-sm text-slate-600">No evidence pack preview selected.</p>;
  return (
    <div className="space-y-3 text-sm">
      <DetailRow label="Pack" value={pack.packCode} />
      <DetailRow label="Context" value={labelize(pack.contextType)} />
      <DetailRow label="Completeness" value={`${pack.completenessPercent}%`} />
      <DetailRow label="Missing" value={`${pack.missingItemCount}`} />
      <DetailRow label="Review" value={labelize(pack.reviewStatus)} />
      <DetailRow label="Export" value={labelize(pack.exportReadyStatus)} />
      <div className="rounded-md border border-aim-line px-3 py-2 text-xs text-slate-600">
        Evidence pack builder reuses document references and records completeness only. Export readiness is a review state, not a final acceptance.
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-800">{value}</span>
    </div>
  );
}

function labelize(value: string) {
  return value.split('_').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}
