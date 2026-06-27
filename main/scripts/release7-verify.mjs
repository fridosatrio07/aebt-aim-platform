import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const repo = join(root, '..');
function readRepo(file) { return readFileSync(join(repo, file), 'utf8'); }
function existsRepo(file) { return existsSync(join(repo, file)); }
function fail(message) { console.error(message); process.exit(1); }

// Strip BOM if present
function readJson(file) { return JSON.parse(readFileSync(join(root, file), 'utf8').replace(/^\uFEFF/, '')); }
const packageJson = readJson('package.json');
if (packageJson.version !== '0.0.0-release-7') fail(`Expected package version 0.0.0-release-7, got ${packageJson.version}`);
for (const script of ['release5:verify', 'release6:verify', 'release7:verify']) {
  if (!packageJson.scripts?.[script]) fail(`Missing package script: ${script}`);
}

const required = [
  'docs/ai-context/18_RELEASE_PLAN_R7_UI_UX_DESIGN_SYSTEM_COMPLIANCE.md',
  'docs/tasks/release-7/README_RELEASE_7.md',
  'docs/handoff/RELEASE_7_HANDOFF.md',
  'docs/frontend/DESIGN_SYSTEM_COMPLIANCE_SPEC.md',
  'docs/frontend/DESIGN_TOKENS_THEME_CONTRACT.md',
  'docs/frontend/COMPONENT_VISUAL_CONTRACT.md',
  'docs/frontend/APP_SHELL_HARDENING_SPEC.md',
  'docs/frontend/FRONTEND_ACCEPTANCE_CHECKLIST.md'
];
const missing = required.filter((file) => !existsRepo(file));
if (missing.length > 0) fail(`Missing Release 7 artifact(s):\n${missing.join('\n')}`);

const combined = required.map(readRepo).join('\n');
for (const keyword of ['Industrial Integrity Command Console', 'AEBT Precision Light', 'AEBT Control Room Dark', 'semantic token', 'shadcn/ui', 'draft/preliminary', 'ExportWarningPanel', 'Accessibility']) {
  if (!combined.includes(keyword)) fail(`Release 7 docs missing keyword: ${keyword}`);
}

const handoff = readRepo('docs/handoff/RELEASE_7_HANDOFF.md');
if (!/## Schema Changes\s+None/i.test(handoff)) fail('Release 7 handoff must state Schema Changes: None');
if (!/## API Changes\s+None/i.test(handoff)) fail('Release 7 handoff must state API Changes: None');
for (const unsupported of [/schema changes implemented/i, /api changes implemented/i, /backend implementation/i, /persistence implemented/i]) {
  if (unsupported.test(handoff)) fail(`Release 7 handoff contains unsupported implementation claim: ${unsupported}`);
}

console.log('Release 7 verification checks passed');
