#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const componentsPath = path.join(repoRoot, 'dist', 'components');

function run(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            cwd: repoRoot,
            stdio: 'inherit',
            shell: true,
            ...options
        });

        child.on('error', reject);
        child.on('exit', (code, signal) => {
            if (code === 0) {
                resolve();
                return;
            }

            if (signal) {
                reject(new Error(`${command} ${args.join(' ')} terminated with signal ${signal}`));
                return;
            }

            reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
        });
    });
}

async function runParallel(commands) {
    const running = commands.map(([command, args]) => run(command, args));
    await Promise.all(running);
}

async function main() {
    await run('npm', ['run', 'clean']);
    await runParallel([
        ['npm', ['run', 'build:css']],
        ['npm', ['run', 'build:components']]
    ]);

    if (!fs.existsSync(componentsPath)) {
        throw new Error(`Expected built components at ${componentsPath}, but the directory was not created.`);
    }

    const componentFiles = fs.readdirSync(componentsPath).filter((file) => file.endsWith('.js'));
    if (componentFiles.length === 0) {
        throw new Error(`Expected component bundles in ${componentsPath}, but no .js files were found.`);
    }

    await run('npm', ['run', 'build:generate-exports']);
}

main().catch((error) => {
    console.error(`❌ build:rollup:process failed: ${error.message}`);
    process.exit(1);
});
