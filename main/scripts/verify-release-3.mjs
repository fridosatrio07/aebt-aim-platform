import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const required = [
  'packages/shared/src/release-3.ts',
  'packages/shared/tests/release-3.test.ts',
  'apps/api/src/business-foundation/business-foundation.module.ts',
  'apps/api/src/business-foundation/business-foundation.controller.ts',
  'apps/api/src/business-foundation/business-foundation.service.ts',
  'apps/web/src/components/AppShell.tsx',
  'packages/database/prisma/schema.prisma',
  'seed/release-3-business-foundation.json'
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required Release 3 files:\n${missing.join('\n')}`);
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
for (const script of ['lint', 'typecheck', 'test', 'build', 'migration:check', 'analytics:check', 'release3:verify']) {
  if (!packageJson.scripts?.[script]) {
    console.error(`Missing package script: ${script}`);
    process.exit(1);
  }
}

const release3 = readFileSync(join(root, 'packages/shared/src/release-3.ts'), 'utf8');
for (const phrase of ['inspection_due', 'certification_register', 'evidence_pack', 'draft_preliminary_only', 'buildEvidencePack', 'business_kpi']) {
  if (!release3.includes(phrase)) {
    console.error(`Release 3 shared guardrail is missing phrase: ${phrase}`);
    process.exit(1);
  }
}

const appModule = readFileSync(join(root, 'apps/api/src/app.module.ts'), 'utf8');
if (!appModule.includes('BusinessFoundationModule')) {
  console.error('Release 3 API module must be registered in AppModule.');
  process.exit(1);
}

const web = readFileSync(join(root, 'apps/web/src/components/AppShell.tsx'), 'utf8');
for (const label of ['Inspection Due', 'Workpack', 'Certification Register', 'Evidence Pack', 'Decision Boundary']) {
  if (!web.includes(label)) {
    console.error(`Release 3 UI missing required surface: ${label}`);
    process.exit(1);
  }
}

const prohibited = [/declare asset safe/i, /fit for operation/i, /layak operasi/i, /final RBI/i, /RLA final/i, /FFS final/i, /issue certificate/i];
for (const pattern of prohibited) {
  if (pattern.test(release3) || pattern.test(web)) {
    console.error(`Release 3 contains unsupported final decision wording: ${pattern}`);
    process.exit(1);
  }
}

console.log('Release 3 verification checks passed');
