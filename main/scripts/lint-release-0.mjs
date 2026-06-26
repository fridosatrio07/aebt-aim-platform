import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const required = [
  'package.json', '.env.example', 'README.md',
  'apps/web/app/page.tsx', 'apps/web/src/components/AppShell.tsx',
  'apps/api/src/foundation/foundation.controller.ts',
  'packages/shared/src/rbac.ts', 'packages/shared/src/audit.ts', 'packages/shared/src/tenant-context.ts',
  'packages/database/prisma/schema.prisma', 'services/analytics/app/main.py',
  'infra/docker-compose.yml', 'seed/spm-01.json'
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required Release 0 files:\n${missing.join('\n')}`);
  process.exit(1);
}

const seed = readFileSync(join(root, 'seed/spm-01.json'), 'utf8');
if (!seed.includes('dummy_for_release_0_only') || !seed.includes('No real asset')) {
  console.error('Seed SPM-01 must remain explicitly dummy and non-decisional.');
  process.exit(1);
}

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const full = join(dir, name);
  const stat = statSync(full);
  if (stat.isDirectory() && !['node_modules', '.next', 'dist', 'coverage'].includes(name)) return walk(full);
  return stat.isFile() ? [full] : [];
});

for (const file of walk(root).filter((file) => /\.(ts|tsx|mjs|py|prisma|md|json|yml)$/.test(file))) {
  const text = readFileSync(file, 'utf8');
  if (/automatically\s+(declares?|approves?|issues?)\s+(fit for operation|layak operasi|certificate|final RBI)/i.test(text)) {
    console.error(`Potential unsupported final decision wording in ${file}`);
    process.exit(1);
  }
}

console.log('Release 0 lint checks passed');
