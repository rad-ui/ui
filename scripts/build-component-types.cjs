#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const componentsPath = path.join(repoRoot, 'src/components/ui');
const outDir = path.join(repoRoot, 'dist/temp-cleanup');
const tempTypesDir = path.join(repoRoot, 'dist/.temp-types');
const tmpTsconfigDir = path.join(repoRoot, 'dist/.tmp-tsconfigs');
const tscBin = require.resolve('typescript/bin/tsc');
const CONCURRENCY = 4;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(tmpTsconfigDir)) fs.mkdirSync(tmpTsconfigDir, { recursive: true });
if (!fs.existsSync(tempTypesDir)) fs.mkdirSync(tempTypesDir, { recursive: true });

const components = fs
    .readdirSync(componentsPath)
    .filter((file) => fs.statSync(path.join(componentsPath, file)).isDirectory())
    .filter((component) => fs.existsSync(path.join(componentsPath, component, `${component}.tsx`)));

function runTsc(tmpTsconfigPath) {
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [tscBin, '--project', tmpTsconfigPath, '--pretty', 'false'], {
            cwd: repoRoot,
            stdio: 'inherit',
            env: {
                ...process.env,
                NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=4096'
            }
        });

        child.on('error', reject);
        child.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`tsc failed for ${path.basename(tmpTsconfigPath, '.json')} (exit ${code})`));
        });
    });
}

async function runPool(tasks, concurrency) {
    const executing = new Set();

    for (const task of tasks) {
        const promise = task().finally(() => executing.delete(promise));
        executing.add(promise);

        if (executing.size >= concurrency) {
            await Promise.race(executing);
        }
    }

    await Promise.all(executing);
}

function cleanupTempDirs() {
    for (const dir of [tempTypesDir, tmpTsconfigDir]) {
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
        }
    }
}

async function main() {
    const tasks = components.map((component) => async () => {
        const entry = path.join(componentsPath, component, `${component}.tsx`);
        const tmpTsconfigPath = path.join(tmpTsconfigDir, `${component}.json`);
        const tmpTsconfig = {
            extends: path.relative(tmpTsconfigDir, path.join(repoRoot, 'tsconfig.json')),
            compilerOptions: {
                declaration: true,
                emitDeclarationOnly: true,
                declarationMap: false,
                sourceMap: false,
                rootDir: path.relative(tmpTsconfigDir, path.join(repoRoot, 'src')),
                outDir: path.relative(tmpTsconfigDir, tempTypesDir)
            },
            files: [path.relative(tmpTsconfigDir, entry)],
            include: [],
            exclude: []
        };

        fs.writeFileSync(tmpTsconfigPath, JSON.stringify(tmpTsconfig, null, 2));
        await runTsc(tmpTsconfigPath);

        const builtDtsPath = path.join(tempTypesDir, 'components/ui', component, `${component}.d.ts`);
        const finalDtsPath = path.join(outDir, `${component}.d.ts`);

        if (!fs.existsSync(builtDtsPath)) {
            throw new Error(`Missing emitted types for ${component}: ${builtDtsPath}`);
        }

        fs.copyFileSync(builtDtsPath, finalDtsPath);
    });

    try {
        await runPool(tasks, CONCURRENCY);
        console.log(`All ${components.length} component types built with tsc!`);
    } finally {
        cleanupTempDirs();
    }
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
