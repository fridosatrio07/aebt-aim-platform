import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const repo = join(root, '..');
const web = join(root, 'apps', 'web');
const fail = (message) => { console.error(message); process.exit(1); };
const read = (path) => readFileSync(path, 'utf8');
const readRepo = (file) => read(join(repo, file));
const existsRepo = (file) => existsSync(join(repo, file));

const pkg = JSON.parse(read(join(root, 'package.json')));
if (pkg.version !== '0.0.0-release-8') fail(`Expected version 0.0.0-release-8, got ${pkg.version}`);
for (const script of ['release5:verify', 'release6:verify', 'release7:verify', 'release8:verify']) {
  if (!pkg.scripts?.[script]) fail(`Missing package script: ${script}`);
}

const requiredDocs = [
  'docs/ai-context/19_RELEASE_PLAN_R8_UI_RUNTIME_TOKENIZATION_ROUTE_PAGE_SHELL.md',
  'docs/frontend/UI_RUNTIME_TOKENIZATION_IMPLEMENTATION_SPEC.md',
  'docs/frontend/CSS_TAILWIND_TOKEN_MAPPING_PLAN.md',
  'docs/frontend/ROUTE_PAGE_SHELL_INDUSTRIAL_CONSOLE_SPEC.md',
  'docs/frontend/ROUTE_PAGE_SHELL_VISUAL_ACCEPTANCE_CRITERIA.md',
  'docs/frontend/INDUSTRIAL_CONSOLE_UI_COPY_AND_STATUS_RULES.md',
  'docs/frontend/TOKEN_DECISION_LOG.md',
  'docs/tasks/release-8/README_RELEASE_8.md',
  'docs/handoff/RELEASE_8_HANDOFF.md'
];
const missingDocs = requiredDocs.filter((file) => !existsRepo(file));
if (missingDocs.length) fail(`Missing Release 8 artifact(s):\n${missingDocs.join('\n')}`);

const globals = read(join(web, 'app', 'globals.css'));
const tailwind = read(join(web, 'tailwind.config.ts'));
const routeShell = read(join(web, 'src', 'components', 'RoutePageShell.tsx'));
const appChrome = read(join(web, 'src', 'components', 'app-shell-chrome.tsx'));
const releaseUi = read(join(web, 'src', 'components', 'release5-ui.tsx'));

for (const token of [
  '--background', '--foreground', '--surface-1', '--surface-2', '--surface-3', '--border-subtle', '--border-strong',
  '--text-muted', '--text-disabled', '--brand-navy', '--brand-blue', '--intelligence-cyan', '--integrity-teal',
  '--status-success', '--status-warning', '--status-danger', '--status-draft', '--status-pending-review', '--status-approved',
  '--risk-low', '--risk-medium', '--risk-high', '--risk-critical', '--due-normal', '--due-soon', '--due-overdue',
  '--evidence-ready', '--evidence-missing', '--export-ready', '--export-warning'
]) {
  if (!globals.includes(token)) fail(`globals.css missing token ${token}`);
  const tailwindKey = token.slice(2);
  if (!tailwind.includes(`'${tailwindKey}'`) && !tailwind.includes(`${tailwindKey}:`)) fail(`tailwind.config.ts missing semantic key ${tailwindKey}`);
}

if (!globals.includes('.dark')) fail('globals.css must define .dark layered token values');
for (const phrase of ['Industrial Integrity Command Console', 'No final technical decision', 'Draft/preliminary', 'bg-background', 'bg-surface-1']) {
  if (!routeShell.includes(phrase)) fail(`RoutePageShell missing required phrase/class: ${phrase}`);
}
for (const phrase of ['Release 8 Shell', 'border-border-subtle', 'bg-surface-1']) {
  if (!appChrome.includes(phrase)) fail(`app-shell-chrome missing required phrase/class: ${phrase}`);
}
for (const phrase of ['border-status-danger', 'border-export-warning', 'bg-surface-1']) {
  if (!releaseUi.includes(phrase)) fail(`release5-ui missing tokenized primitive class: ${phrase}`);
}
for (const unsupported of [/schema changes implemented/i, /api changes implemented/i, /backend implementation/i, /persistence implemented/i, /final fit-for-operation/i, /final RBI decision logic/i]) {
  if (unsupported.test(readRepo('docs/handoff/RELEASE_8_HANDOFF.md'))) fail(`Release 8 handoff contains unsupported implementation claim: ${unsupported}`);
}

console.log('Release 8 runtime tokenization verification checks passed');
