import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const tarballArg = process.argv[2];

if (!tarballArg) {
    console.error('Usage: node scripts/consumer-compat/run-node-smoke.mjs <package-tarball>');
    process.exit(1);
}

const tarballPath = resolve(tarballArg);
const workspace = mkdtempSync(join(tmpdir(), 'rad-ui-consumer-smoke-'));

const run = (command, args, options = {}) => execFileSync(command, args, {
    cwd: workspace,
    stdio: 'inherit',
    ...options
});

try {
    writeFileSync(join(workspace, 'package.json'), JSON.stringify({
        name: 'rad-ui-consumer-smoke',
        private: true,
        type: 'module'
    }, null, 2));

    writeFileSync(join(workspace, 'esm-smoke.mjs'), `import { Button } from '@radui/ui';
import ButtonSubpath from '@radui/ui/Button';

if (typeof Button !== 'function') {
  throw new Error('Expected named Button export to resolve as a function.');
}

if (typeof ButtonSubpath !== 'function') {
  throw new Error('Expected Button subpath export to resolve as a function.');
}

console.log('esm-smoke-ok');
`);

    writeFileSync(join(workspace, 'cjs-smoke.cjs'), `const { Button } = require('@radui/ui');
const ButtonSubpath = require('@radui/ui/Button');

if (typeof Button !== 'function') {
  throw new Error('Expected named Button export to resolve as a function.');
}

const resolvedSubpath = ButtonSubpath && ButtonSubpath.default ? ButtonSubpath.default : ButtonSubpath;

if (typeof resolvedSubpath !== 'function') {
  throw new Error('Expected Button subpath export to resolve as a function.');
}

console.log('cjs-smoke-ok');
`);

    run('npm', ['install', '--no-package-lock', tarballPath]);
    run('node', ['esm-smoke.mjs']);
    run('node', ['cjs-smoke.cjs']);
} finally {
    rmSync(workspace, { recursive:true, force:true });
}
