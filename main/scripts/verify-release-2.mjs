import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const required = [
  'packages/shared/src/release-2.ts',
  'packages/shared/tests/release-2.test.ts',
  'apps/api/src/workflow-foundation/workflow-foundation.module.ts',
  'apps/api/src/workflow-foundation/workflow-foundation.controller.ts',
  'apps/api/src/workflow-foundation/workflow-foundation.service.ts',
  'apps/web/src/components/AppShell.tsx',
  'packages/database/prisma/schema.prisma',
  'seed/release-2-workflow-foundation.json'
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required Release 2 files:\n${missing.join('\n')}`);
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
for (const script of ['lint', 'typecheck', 'test', 'build', 'migration:check', 'analytics:check', 'release2:verify']) {
  if (!packageJson.scripts?.[script]) {
    console.error(`Missing package script: ${script}`);
    process.exit(1);
  }
}

const release2 = readFileSync(join(root, 'packages/shared/src/release-2.ts'), 'utf8');
for (const phrase of ['approved_for_next_step', 'draft_preliminary_only', 'notification_digest', 'export_log', 'createExportLog']) {
  if (!release2.includes(phrase)) {
    console.error(`Release 2 shared guardrail is missing phrase: ${phrase}`);
    process.exit(1);
  }
}

const appModule = readFileSync(join(root, 'apps/api/src/app.module.ts'), 'utf8');
if (!appModule.includes('WorkflowFoundationModule')) {
  console.error('Release 2 API module must be registered in AppModule.');
  process.exit(1);
}

const web = readFileSync(join(root, 'apps/web/src/components/AppShell.tsx'), 'utf8');
for (const label of ['My Work', 'Reviewer Work Queue', 'Notification Digest', 'Export Log', 'Decision Boundary']) {
  if (!web.includes(label)) {
    console.error(`Release 2 UI missing required surface: ${label}`);
    process.exit(1);
  }
}

console.log('Release 2 verification checks passed');
