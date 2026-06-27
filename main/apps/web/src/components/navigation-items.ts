import { BarChart3, Database, FileText, Inbox, LayoutDashboard, LifeBuoy, ListChecks, Settings, type LucideIcon } from 'lucide-react';
import { appRoutes, routeById, type AppRouteId, type RouteFunctionalStatus, type WorkbenchTabId } from './app-routes';

export interface NavigationItem {
  routeId: AppRouteId;
  label: string;
  group: 'Command Center' | 'Data Foundation' | 'Business Modules' | 'Integrity & Risk' | 'Governance & Support';
  icon: LucideIcon;
  badge: RouteFunctionalStatus;
  tabId?: WorkbenchTabId | undefined;
  disabled?: boolean | undefined;
}

const navConfig: Array<{ routeId: AppRouteId; group: NavigationItem['group']; icon: LucideIcon; disabled?: boolean }> = [
  { routeId: 'dashboard', group: 'Command Center', icon: LayoutDashboard },
  { routeId: 'my-work', group: 'Command Center', icon: Inbox },
  { routeId: 'reviewer-queue', group: 'Command Center', icon: ListChecks },
  { routeId: 'projects', group: 'Data Foundation', icon: Database },
  { routeId: 'assets', group: 'Data Foundation', icon: Database },
  { routeId: 'documents', group: 'Data Foundation', icon: FileText },
  { routeId: 'validation', group: 'Data Foundation', icon: ListChecks },
  { routeId: 'inspections', group: 'Business Modules', icon: FileText },
  { routeId: 'certification', group: 'Business Modules', icon: FileText },
  { routeId: 'evidence-packs', group: 'Business Modules', icon: FileText },
  { routeId: 'integrity', group: 'Integrity & Risk', icon: BarChart3 },
  { routeId: 'integrity-rbi', group: 'Integrity & Risk', icon: BarChart3 },
  { routeId: 'risk-register', group: 'Integrity & Risk', icon: BarChart3 },
  { routeId: 'state-matrix', group: 'Governance & Support', icon: ListChecks },
  { routeId: 'administration', group: 'Governance & Support', icon: Settings },
  { routeId: 'helpdesk', group: 'Governance & Support', icon: LifeBuoy }
];

export const navigationItems: NavigationItem[] = navConfig.map((item) => {
  const route = routeById(item.routeId);
  return {
    ...item,
    label: route.label,
    badge: route.status,
    tabId: route.workbenchTab,
    disabled: item.disabled || route.status === 'Disabled'
  };
});

export const navigationGroups = Array.from(new Set(navigationItems.map((item) => item.group)));

export const plannedRouteCount = appRoutes.length;


