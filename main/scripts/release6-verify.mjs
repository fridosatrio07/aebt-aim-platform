import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const repo = join(root, '..');
const required = [
  'docs/handoff/RELEASE_6_HANDOFF.md',
  'docs/tasks/release-6/README_RELEASE_6.md',
  'docs/ai-context/17_RELEASE_PLAN_R6_APP_SHELL_NAVIGATION.md',
  'docs/frontend/APP_SHELL_NAVIGATION_SPEC.md',
  'apps/web/src/components/AppShell.tsx',
  'apps/web/src/components/RoutePageShell.tsx',
  'apps/web/src/components/app-routes.ts',
  'apps/web/src/components/navigation-items.ts',
  'apps/web/src/components/app-shell-chrome.tsx',
  'apps/web/app/dashboard/page.tsx',
  'apps/web/app/assets/page.tsx',
  'apps/web/app/assets/[assetId]/page.tsx',
  'apps/web/app/integrity/rbi/page.tsx',
  'apps/web/app/integrity/rbi/[assessmentId]/page.tsx',
  'apps/web/app/risk-register/page.tsx',
  'apps/web/app/state-matrix/page.tsx'
];
const missing = required.filter((file) => !existsSync(join(file.startsWith('apps/') ? root : repo, file)));
if (missing.length > 0) {
  console.error(`Missing Release 6 maturity artifact(s):\n${missing.join('\n')}`);
  process.exit(1);
}
console.log('Release 6 maturity verification checks passed');
