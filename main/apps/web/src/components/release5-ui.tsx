import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'review' | 'draft';

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

const badgeToneClasses: Record<BadgeTone, string> = {
  neutral: 'border-aim-line bg-aim-field text-slate-700',
  info: 'border-sky-200 bg-sky-50 text-sky-800',
  success: 'border-teal-200 bg-teal-50 text-teal-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  danger: 'border-rose-200 bg-rose-50 text-rose-800',
  review: 'border-violet-200 bg-violet-50 text-violet-800',
  draft: 'border-slate-200 bg-white text-slate-700'
};

export function labelize(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return 'TBD';
  return String(value)
    .replace(/-/g, '_')
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatDate(value: string | undefined): string {
  if (!value) return 'TBD';
  return value.slice(0, 10);
}

export function toneForStatus(value: string | undefined): BadgeTone {
  const normalized = value ?? '';
  if (normalized.includes('overdue') || normalized.includes('expired') || normalized.includes('rejected') || normalized.includes('error')) return 'danger';
  if (normalized.includes('gap') || normalized.includes('missing') || normalized.includes('due_soon') || normalized.includes('pending_validation') || normalized.includes('revision')) return 'warning';
  if (normalized.includes('pending_review') || normalized.includes('review') || normalized.includes('tbd') || normalized.includes('preliminary')) return 'review';
  if (normalized.includes('approved') || normalized.includes('controlled') || normalized.includes('validated') || normalized.includes('available') || normalized.includes('active')) return 'success';
  if (normalized.includes('draft') || normalized.includes('mock') || normalized.includes('static')) return 'draft';
  return 'neutral';
}

export function StatusBadge({ label, tone, title }: { label: string; tone?: BadgeTone; title?: string }) {
  return (
    <span title={title} className={`inline-flex max-w-full items-center rounded-md border px-2 py-1 text-xs font-medium ${badgeToneClasses[tone ?? toneForStatus(label.toLowerCase())]}`}>
      <span className="truncate">{label}</span>
    </span>
  );
}

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <header className="border-b border-aim-line bg-white px-5 py-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-aim-action">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-semibold text-aim-ink">{title}</h1>
          <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
        {children ? <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div> : null}
      </div>
    </header>
  );
}

export function SectionPanel({ title, kicker, actions, children }: { title: string; kicker?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="border border-aim-line bg-white">
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-aim-line px-4 py-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-aim-ink">{title}</h2>
          {kicker ? <p className="mt-0.5 text-xs text-slate-500">{kicker}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function DataTable<T extends { id: string }>({ columns, rows, emptyLabel, onOpen }: { columns: TableColumn<T>[]; rows: T[]; emptyLabel: string; onOpen?: (row: T) => void }) {
  if (rows.length === 0) return <EmptyState title={emptyLabel} detail="No mock/API-ready records are available for this scope." />;
  return (
    <div className="overflow-x-auto border border-aim-line bg-white">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead className="bg-aim-field text-xs uppercase text-slate-600">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={`px-3 py-3 font-semibold ${column.className ?? ''}`}>{column.header}</th>
            ))}
            {onOpen ? <th className="w-24 px-3 py-3 text-right font-semibold">Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-aim-line hover:bg-aim-field">
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`} className={`px-3 py-3 align-top text-slate-700 ${column.className ?? ''}`}>{column.render(row)}</td>
              ))}
              {onOpen ? (
                <td className="px-3 py-3 text-right align-top">
                  <button type="button" onClick={() => onOpen(row)} className="rounded-md border border-aim-line bg-white px-2 py-1 text-xs font-medium text-aim-action hover:bg-aim-field">
                    Open
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MetricCard({ label, value, detail, tone, onClick }: { label: string; value: string | number; detail: string; tone: BadgeTone; onClick?: () => void }) {
  const content = (
    <>
      <span className="block text-xs font-semibold uppercase text-slate-500">{label}</span>
      <span className="mt-2 flex items-end justify-between gap-3">
        <span className="text-2xl font-semibold text-aim-ink">{value}</span>
        <StatusBadge label={labelize(tone)} tone={tone} />
      </span>
      <span className="mt-2 block text-xs leading-5 text-slate-600">{detail}</span>
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="min-h-28 border border-aim-line bg-white px-4 py-3 text-left hover:bg-aim-field focus:outline-none focus:ring-2 focus:ring-aim-action">
        {content}
      </button>
    );
  }
  return <div className="min-h-28 border border-aim-line bg-white px-4 py-3">{content}</div>;
}

export function FilterChips({ chips }: { chips: string[] }) {
  return (
    <div className="mb-3 flex flex-wrap gap-2" aria-label="Saved views and active filters">
      {chips.map((chip) => (
        <span key={chip} className="rounded-md border border-aim-line bg-aim-field px-2 py-1 text-xs font-medium text-slate-700">{chip}</span>
      ))}
    </div>
  );
}

export function BoundaryBanner({ children }: { children: ReactNode }) {
  return (
    <div className="border border-amber-300 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950" role="note">
      {children}
    </div>
  );
}

export function DrawerShell({ title, subtitle, open, onClose, children }: { title: string; subtitle: string; open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) {
    return (
      <aside className="border border-aim-line bg-white p-4">
        <button type="button" onClick={onClose} className="w-full rounded-md border border-aim-line bg-aim-field px-3 py-2 text-sm font-medium text-aim-ink">
          Open detail drawer
        </button>
      </aside>
    );
  }
  return (
    <aside className="border border-aim-line bg-white">
      <div className="flex items-start justify-between gap-3 border-b border-aim-line px-4 py-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-aim-ink">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-md border border-aim-line px-2 py-1 text-xs font-medium text-slate-700 hover:bg-aim-field">
          Close
        </button>
      </div>
      <div className="space-y-4 p-4">{children}</div>
    </aside>
  );
}

export function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-aim-line py-2 text-sm last:border-b-0">
      <span className="text-slate-500">{label}</span>
      <span className="max-w-[62%] text-right font-medium text-slate-800">{value}</span>
    </div>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="border border-dashed border-aim-line bg-aim-field px-4 py-6 text-sm">
      <p className="font-semibold text-aim-ink">{title}</p>
      <p className="mt-1 text-slate-600">{detail}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="space-y-2" aria-busy="true">
      <div className="h-3 w-2/3 bg-aim-field" />
      <div className="h-3 w-full bg-aim-field" />
      <div className="h-3 w-5/6 bg-aim-field" />
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900" role="alert">
      API-ready state. Retry and helpdesk routing are available when backend integration is approved.
    </div>
  );
}

export function AccessDeniedState() {
  return (
    <div className="border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700">
      Permission-limited state. Final role visibility remains Needs RBAC Review and no restricted data is displayed.
    </div>
  );
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="flex justify-between gap-3 text-xs text-slate-500">
        <span>{label}</span>
        <span>{clamped}%</span>
      </div>
      <div className="mt-1 h-2 bg-aim-field">
        <div className="h-2 bg-aim-action" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
