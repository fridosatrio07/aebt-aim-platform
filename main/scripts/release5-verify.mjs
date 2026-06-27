import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const repo = join(root, '..');
const required = [
  'docs/handoff/RELEASE_5_HANDOFF.md',
  'docs/tasks/release-5/README_RELEASE_5.md',
  'docs/frontend/FRONTEND_PAGE_BUILD_SPEC.md',
  'docs/frontend/ROUTE_NAVIGATION_MATRIX.md',
  'docs/frontend/REUSABLE_COMPONENT_CONTRACT.md',
  'docs/frontend/MOCK_DATA_SCENARIO_CONTRACT.md',
  'docs/frontend/UI_INTERACTION_STATE_MATRIX.md',
  'docs/frontend/FUNCTIONAL_BOUNDARY_MAP.md',
  'docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md',
  'apps/web/src/components/AppShell.tsx',
  'apps/web/src/components/release5-data.ts',
  'apps/web/src/components/release5-ui.tsx'
];
const missing = required.filter((file) => !existsSync(join(file.startsWith('apps/') ? root : repo, file)));
if (missing.length > 0) {
  console.error(`Missing Release 5 maturity artifact(s):\n${missing.join('\n')}`);
  process.exit(1);
}
console.log('Release 5 maturity verification checks passed');
