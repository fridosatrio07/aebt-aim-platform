import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const execPath = process.env.npm_execpath;
const env = {
  ...process.env,
  DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://aim_app:aim_dev_password@localhost:5432/aim_platform?schema=public'
};

function run(script) {
  const result = execPath
    ? spawnSync(process.execPath, [execPath, 'run', script], { stdio: 'inherit', env })
    : spawnSync('pnpm', ['run', script], { stdio: 'inherit', env, shell: true });
  if ((result.status ?? 1) !== 0) process.exit(result.status ?? 1);
}

for (const script of ['lint', 'typecheck', 'test', 'build', 'migration:check', 'analytics:check']) {
  run(script);
}

const verify = spawnSync(process.execPath, [fileURLToPath(new URL('./verify-release-4.mjs', import.meta.url))], { stdio: 'inherit', env });
if ((verify.status ?? 1) !== 0) process.exit(verify.status ?? 1);