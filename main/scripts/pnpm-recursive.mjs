import { spawnSync } from 'node:child_process';

const script = process.argv[2];
if (!script) {
  console.error('Usage: node scripts/pnpm-recursive.mjs <script>');
  process.exit(1);
}

const execPath = process.env.npm_execpath;
const env = {
  ...process.env,
  DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://aim_app:aim_dev_password@localhost:5432/aim_platform?schema=public'
};
let command;
let args;
let options = { stdio: 'inherit', env };

if (execPath) {
  command = process.execPath;
  args = [execPath, '-r', '--if-present', 'run', script];
} else {
  command = 'pnpm';
  args = ['-r', '--if-present', 'run', script];
  options = { ...options, shell: true };
}

const result = spawnSync(command, args, options);
process.exit(result.status ?? 1);
