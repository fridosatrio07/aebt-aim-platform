import { Bell, ChevronLeft, ChevronRight, Search, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { release5Scenario } from './release5-data';
import { routeById, type AppRouteDefinition, type AppRouteId } from './app-routes';
import { navigationGroups, navigationItems, plannedRouteCount, type NavigationItem } from './navigation-items';
import { BoundaryBanner, StatusBadge, toneForStatus } from './release5-ui';

export function AppSidebar({ activeTab, activeRouteId, collapsed, onToggleCollapsed, onSelectTab }: { activeTab?: string; activeRouteId?: AppRouteId; collapsed: boolean; onToggleCollapsed: () => void; onSelectTab?: (tab: NavigationItem['tabId']) => void }) {
  return (
    <aside className="border-r border-border-subtle bg-surface-1 max-xl:border-b max-xl:border-r-0">
      <div className="flex items-start justify-between gap-3 border-b border-border-subtle bg-surface-2 px-4 py-4">
        <div className={collapsed ? 'sr-only' : undefined}>
          <p className="text-xs font-semibold uppercase text-integrity-teal">AIM Platform</p>
          <h1 className="mt-1 text-xl font-semibold text-foreground">Release 8 Shell</h1>
          <p className="mt-1 text-xs leading-5 text-text-muted">Runtime tokenization and route-shell pilot.</p>
        </div>
        <button type="button" onClick={onToggleCollapsed} className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border-subtle bg-surface-1 text-text-muted hover:bg-surface-3" title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight aria-hidden size={16} /> : <ChevronLeft aria-hidden size={16} />}
        </button>
      </div>

      <TenantProjectSiteSelector collapsed={collapsed} />

      <nav className="space-y-4 px-3 py-4" aria-label="AIM Platform planned route navigation">
        {navigationGroups.map((group) => (
          <div key={group} className="space-y-1">
            {!collapsed ? <p className="px-2 text-[11px] font-semibold uppercase text-text-muted">{group}</p> : null}
            {navigationItems.filter((item) => item.group === group).map((item) => {
              const Icon = item.icon;
              const route = routeById(item.routeId);
              const active = activeRouteId ? activeRouteId === item.routeId : Boolean(item.tabId && activeTab === item.tabId);
              const disabled = Boolean(item.disabled || (onSelectTab && !item.tabId));
              const className = `flex min-h-11 w-full items-center justify-between gap-2 rounded-md px-3 text-left text-sm ${active ? 'bg-integrity-teal text-[var(--primary-foreground)]' : 'text-text-muted hover:bg-surface-2 disabled:cursor-not-allowed disabled:text-text-disabled disabled:hover:bg-surface-1'}`;
              const content = (
                <>
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon aria-hidden size={17} />
                    {!collapsed ? <span className="truncate">{item.label}</span> : null}
                  </span>
                  {!collapsed ? <NavStatusBadge label={item.badge} active={active} disabled={disabled} /> : null}
                </>
              );

              if (onSelectTab) {
                return (
                  <button key={item.routeId} type="button" onClick={() => item.tabId && onSelectTab(item.tabId)} disabled={disabled} title={`${item.label} - ${item.badge}`} className={className}>
                    {content}
                  </button>
                );
              }

              return (
                <a key={item.routeId} href={route.path} title={`${item.label} - ${item.badge}`} aria-current={active ? 'page' : undefined} className={className}>
                  {content}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-border-subtle px-4 py-4">
        <AccessBoundaryBanner collapsed={collapsed} />
      </div>
    </aside>
  );
}

export function AppTopbar({ activeRoute, breadcrumbs }: { activeRoute: AppRouteDefinition; breadcrumbs: string[] }) {
  return (
    <div className="border-b border-border-subtle bg-surface-1 px-5 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <BreadcrumbTrail items={breadcrumbs} />
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span>{activeRoute.module}</span>
            <StatusBadge label={activeRoute.status} tone={toneForStatus(activeRoute.status.toLowerCase())} />
            <StatusBadge label={activeRoute.dataStatus} tone={toneForStatus(activeRoute.dataStatus.toLowerCase())} />
            <span className="font-medium text-foreground">{plannedRouteCount} planned routes registered</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RoleScopeIndicator />
          <GlobalSearch />
          <NotificationDigest />
          <QuickActionMenu />
        </div>
      </div>
    </div>
  );
}

export function TenantProjectSiteSelector({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return <div className="border-b border-border-subtle bg-surface-2 px-3 py-3 text-center text-xs font-semibold text-integrity-teal" title="SPM-01 demo scope">SPM-01</div>;
  }

  const scopeRows = [
    { label: 'Tenant', value: release5Scenario.tenant },
    { label: 'Client', value: release5Scenario.client },
    { label: 'Project', value: release5Scenario.project },
    { label: 'Site', value: release5Scenario.site },
    { label: 'Facility', value: 'Pending backend selector' }
  ];

  return (
    <div className="space-y-2 border-b border-border-subtle bg-surface-2 px-4 py-3">
      {scopeRows.map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-3 text-xs">
          <span className="text-text-muted">{row.label}</span>
          <span className="max-w-[170px] text-right font-medium text-foreground">{row.value}</span>
        </div>
      ))}
      <StatusBadge label="Scope placeholder" tone="draft" />
    </div>
  );
}

export function RoleScopeIndicator() {
  return (
    <div className="flex min-h-9 items-center gap-2 rounded-md border border-border-subtle bg-surface-2 px-3 text-xs text-text-muted" title="Role visibility planning only">
      <UserCheck aria-hidden size={15} />
      <span className="font-medium text-foreground">Reviewer scope</span>
      <StatusBadge label="Needs RBAC Review" tone="review" />
    </div>
  );
}

export function BreadcrumbTrail({ items }: { items: string[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-xs text-text-muted" aria-label="Breadcrumb">
      <span>AIM</span>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-1">
          <span>/</span>
          <span className="font-medium text-foreground">{item}</span>
        </span>
      ))}
    </nav>
  );
}

export function NotificationDigest() {
  return (
    <button type="button" disabled className="grid h-9 w-9 place-items-center rounded-md border border-border-subtle bg-surface-2 text-text-muted disabled:cursor-not-allowed" title="Notification digest placeholder - pending backend" aria-label="Notification digest placeholder - pending backend">
      <Bell aria-hidden size={16} />
    </button>
  );
}

export function GlobalSearch() {
  return (
    <button type="button" disabled className="flex h-9 items-center gap-2 rounded-md border border-border-subtle bg-surface-2 px-3 text-xs font-medium text-text-muted disabled:cursor-not-allowed" title="Global search placeholder - API-ready" aria-label="Global search placeholder - API-ready">
      <Search aria-hidden size={15} />
      <span className="max-sm:hidden">Search API-ready</span>
    </button>
  );
}

export function QuickActionMenu() {
  return (
    <button type="button" disabled className="flex h-9 items-center gap-2 rounded-md border border-border-subtle bg-surface-2 px-3 text-xs font-medium text-text-muted disabled:cursor-not-allowed" title="Quick actions are disabled until backend and authority review" aria-label="Quick actions are disabled until backend and authority review">
      <Sparkles aria-hidden size={15} />
      <span className="max-sm:hidden">Actions disabled</span>
    </button>
  );
}

export function NavStatusBadge({ label, active, disabled }: { label: string; active?: boolean; disabled?: boolean }) {
  return <span className={`shrink-0 rounded-md px-2 py-1 text-[11px] ${active ? 'bg-surface-1 text-foreground' : disabled ? 'bg-surface-2 text-text-disabled' : 'bg-surface-2 text-text-muted'}`}>{label}</span>;
}

export function AccessBoundaryBanner({ collapsed }: { collapsed?: boolean }) {
  if (collapsed) {
    return <div className="grid h-9 place-items-center rounded-md border border-border-subtle bg-surface-2 text-integrity-teal" title="Draft/preliminary boundary active"><ShieldCheck aria-hidden size={16} /></div>;
  }

  return <BoundaryBanner>Draft/preliminary boundary active. Mock, API-ready, pending-backend, disabled, and needs-review states are labelled in the shell.</BoundaryBanner>;
}
