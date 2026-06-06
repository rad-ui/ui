#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const componentsPath = path.join(repoRoot, 'src/components/ui');
const outDir = path.join(repoRoot, 'dist/temp-cleanup');
const tempTypesDir = path.join(repoRoot, 'dist/.temp-types');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const components = fs
    .readdirSync(componentsPath)
    .filter((file) => fs.statSync(path.join(componentsPath, file)).isDirectory())
    .filter((component) => fs.existsSync(path.join(componentsPath, component, `${component}.tsx`)));

const tscBin = require.resolve('typescript/bin/tsc');
const tmpTsconfigDir = path.join(repoRoot, 'dist/.tmp-tsconfigs');
if (!fs.existsSync(tmpTsconfigDir)) fs.mkdirSync(tmpTsconfigDir, { recursive: true });
if (!fs.existsSync(tempTypesDir)) fs.mkdirSync(tempTypesDir, { recursive: true });

let failed = false;

for (const component of components) {
    const entry = path.join(componentsPath, component, `${component}.tsx`);

    // Emit a single top-level declaration file for the component entry.
    // We intentionally compile per-component to keep memory stable.
    //
    // Note: `tsc -p` cannot be mixed with source files on the CLI, so we generate
    // a tiny per-component tsconfig that extends the root config and pins `files`.
    const tmpTsconfigPath = path.join(tmpTsconfigDir, `${component}.json`);
    const tmpTsconfig = {
        extends: path.relative(tmpTsconfigDir, path.join(repoRoot, 'tsconfig.json')),
        compilerOptions: {
            declaration: true,
            emitDeclarationOnly: true,
            declarationMap: false,
            sourceMap: false,
            // Root must include transitive deps outside the component folder.
            rootDir: path.relative(tmpTsconfigDir, path.join(repoRoot, 'src')),
            outDir: path.relative(tmpTsconfigDir, tempTypesDir)
        },
        files: [path.relative(tmpTsconfigDir, entry)],
        include: [],
        exclude: []
    };

    fs.writeFileSync(tmpTsconfigPath, JSON.stringify(tmpTsconfig, null, 2));

    const args = [tscBin, '--project', tmpTsconfigPath, '--pretty', 'false'];

    const res = spawnSync(process.execPath, args, {
        cwd: repoRoot,
        stdio: 'inherit',
        env: {
            ...process.env,
            // Give TypeScript enough headroom but keep it bounded.
            NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=4096'
        }
    });

    if (res.status !== 0) {
        failed = true;
        break;
    }

    const builtDtsPath = path.join(
        tempTypesDir,
        'components/ui',
        component,
        `${component}.d.ts`
    );
    const finalDtsPath = path.join(outDir, `${component}.d.ts`);
    if (!fs.existsSync(builtDtsPath)) {
        console.error(`❌ Failed to find emitted types for ${component}`);
        console.error(`   Expected: ${builtDtsPath}`);
        failed = true;
        break;
    }
    fs.copyFileSync(builtDtsPath, finalDtsPath);
}

if (failed) {
    process.exit(1);
}

console.log('All component types built with tsc!');

