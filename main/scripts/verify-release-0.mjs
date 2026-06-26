import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
for (const script of ['lint', 'typecheck', 'test', 'build', 'migration:check', 'release0:verify']) {
  if (!packageJson.scripts?.[script]) {
    console.error(`Missing package script: ${script}`);
    process.exit(1);
  }
}

const rbac = readFileSync('packages/shared/src/rbac.ts', 'utf8');
if (!rbac.includes('assertSameTenant') || !rbac.includes('isProhibitedFinalDecision')) {
  console.error('RBAC foundation must enforce tenant scope and final-decision guardrails.');
  process.exit(1);
}

const audit = readFileSync('packages/shared/src/audit.ts', 'utf8');
if (!audit.includes('draft_preliminary_only')) {
  console.error('Audit foundation must tag decision boundary as draft/preliminary only.');
  process.exit(1);
}

console.log('Release 0 verification checks passed');
