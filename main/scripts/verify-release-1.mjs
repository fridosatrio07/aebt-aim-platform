import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const required = [
  'packages/shared/src/release-1.ts',
  'packages/shared/tests/release-1.test.ts',
  'apps/api/src/data-foundation/data-foundation.module.ts',
  'apps/api/src/data-foundation/data-foundation.controller.ts',
  'apps/api/src/data-foundation/data-foundation.service.ts',
  'apps/web/src/components/AppShell.tsx',
  'packages/database/prisma/schema.prisma',
  'seed/release-1-data-foundation.json'
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required Release 1 files:\n${missing.join('\n')}`);
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
for (const script of ['lint', 'typecheck', 'test', 'build', 'migration:check', 'analytics:check', 'release1:verify']) {
  if (!packageJson.scripts?.[script]) {
    console.error(`Missing package script: ${script}`);
    process.exit(1);
  }
}

const release1 = readFileSync(join(root, 'packages/shared/src/release-1.ts'), 'utf8');
for (const phrase of ['baselineWriteBlocked: true', 'draft_preliminary_only', 'validation_failed', 'duplicate_candidate']) {
  if (!release1.includes(phrase)) {
    console.error(`Release 1 shared guardrail is missing phrase: ${phrase}`);
    process.exit(1);
  }
}

const appModule = readFileSync(join(root, 'apps/api/src/app.module.ts'), 'utf8');
if (!appModule.includes('DataFoundationModule')) {
  console.error('Release 1 API module must be registered in AppModule.');
  process.exit(1);
}

const web = readFileSync(join(root, 'apps/web/src/components/AppShell.tsx'), 'utf8');
for (const label of ['Asset Registry', 'Document Repository', 'Validation Queue', 'Decision Boundary']) {
  if (!web.includes(label)) {
    console.error(`Release 1 UI missing required surface: ${label}`);
    process.exit(1);
  }
}

console.log('Release 1 verification checks passed');
