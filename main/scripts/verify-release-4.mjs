import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const required = [
  'packages/shared/src/release-4.ts',
  'packages/shared/tests/release-4.test.ts',
  'apps/api/src/integrity-foundation/integrity-foundation.module.ts',
  'apps/api/src/integrity-foundation/integrity-foundation.controller.ts',
  'apps/api/src/integrity-foundation/integrity-foundation.service.ts',
  'apps/web/src/components/AppShell.tsx',
  'packages/database/prisma/schema.prisma',
  'seed/release-4-integrity-foundation.json'
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required Release 4 files:\n${missing.join('\n')}`);
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
for (const script of ['lint', 'typecheck', 'test', 'build', 'migration:check', 'analytics:check', 'release4:verify']) {
  if (!packageJson.scripts?.[script]) {
    console.error(`Missing package script: ${script}`);
    process.exit(1);
  }
}

const release4 = readFileSync(join(root, 'packages/shared/src/release-4.ts'), 'utf8');
for (const phrase of ['rbi_candidate', 'rbi_assessment', 'operating_data', 'damage_mechanism', 'pof_cof', 'risk_ranking', 'risk_register', 'draft_preliminary_only', 'Release4IntegrityFoundation']) {
  if (!release4.includes(phrase)) {
    console.error(`Release 4 shared guardrail is missing phrase: ${phrase}`);
    process.exit(1);
  }
}

const schema = readFileSync(join(root, 'packages/database/prisma/schema.prisma'), 'utf8');
for (const model of ['RbiCandidate', 'RbiAssessment', 'RbiOperatingData', 'RbiDamageMechanism', 'RbiPofCofHelper', 'RbiRiskRanking', 'RbiRiskRegisterItem']) {
  if (!new RegExp(`model\\s+${model}\\b`).test(schema)) {
    console.error(`Release 4 schema missing model: ${model}`);
    process.exit(1);
  }
}

const appModule = readFileSync(join(root, 'apps/api/src/app.module.ts'), 'utf8');
if (!appModule.includes('IntegrityFoundationModule')) {
  console.error('Release 4 API module must be registered in AppModule.');
  process.exit(1);
}

const web = readFileSync(join(root, 'apps/web/src/components/AppShell.tsx'), 'utf8');
for (const label of ['Release 4 Integrity Workbench', 'RBI Candidates', 'RBI Assessment', 'Operating Data', 'Damage Mechanism', 'PoF/CoF Helper', 'Preliminary Risk Ranking', 'Risk Register', 'Integrity Dashboard']) {
  if (!web.includes(label)) {
    console.error(`Release 4 UI missing required surface: ${label}`);
    process.exit(1);
  }
}

const prohibited = [/declare asset safe/i, /final RBI approval/i, /RLA final/i, /FFS final/i, /issue certificate/i, /automatic PoF/i, /automatic CoF/i];
for (const pattern of prohibited) {
  if (pattern.test(release4) || pattern.test(web)) {
    console.error(`Release 4 contains unsupported final decision wording: ${pattern}`);
    process.exit(1);
  }
}

console.log('Release 4 verification checks passed');
