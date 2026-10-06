#!/usr/bin/env node

/**
 * Validates the exact npm publish artifact before upload.
 *
 * `check:exports` checks export targets against dist/. This checks them
 * against the tarball consumers install, so a `files` or .npmignore change
 * that drops part of dist/ fails here instead of after publishing.
 *
 * Runs `npm pack`, then requires every export target (all conditions,
 * wildcards included) and every released component to be in the tarball,
 * and the theme stylesheets to be non-trivial.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const RELEASED_COMPONENTS = require('./RELEASED_COMPONENTS.cjs');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));

const THEME_STYLESHEETS = ['dist/themes/default.css', 'dist/themes/baremetal.css'];
const MIN_CSS_BYTES = 1024;

function fail(messages) {
    console.error('❌ Publish package validation failed.');
    messages.forEach((message) => console.error(`   ${message}`));
    process.exit(1);
}

function collectExportTargets(exportsField) {
    const targets = new Set();
    const visit = (value) => {
        if (typeof value === 'string') {
            if (value.startsWith('./')) targets.add(value.slice(2));
        } else if (value && typeof value === 'object') {
            Object.values(value).forEach(visit);
        }
    };
    visit(exportsField);
    return [...targets];
}

if (!fs.existsSync(path.join(repoRoot, 'dist'))) {
    fail(['dist/ not found. Run npm run build:rollup first.']);
}

const packDir = fs.mkdtempSync(path.join(os.tmpdir(), 'radui-pack-'));

try {
    const [packed] = JSON.parse(execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', packDir], {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit']
    }));
    const files = new Map(packed.files.map((file) => [file.path, file.size]));
    const errors = [];

    for (const target of collectExportTargets(pkg.exports)) {
        if (target.includes('*')) {
            const [prefix, suffix] = target.split('*');
            const matches = [...files.keys()].some((file) => file.startsWith(prefix) && file.endsWith(suffix));
            if (!matches) errors.push(`No files in tarball match export target: ${target}`);
        } else if (!files.has(target)) {
            errors.push(`Missing export target in tarball: ${target}`);
        }
    }

    for (const component of RELEASED_COMPONENTS) {
        for (const ext of ['.js', '.cjs', '.d.ts']) {
            const file = `dist/components/${component}${ext}`;
            if (!files.has(file)) errors.push(`Missing released component in tarball: ${file}`);
        }
    }

    for (const file of THEME_STYLESHEETS) {
        if (files.has(file) && files.get(file) < MIN_CSS_BYTES) {
            errors.push(`Theme stylesheet is suspiciously small (${files.get(file)} bytes): ${file}`);
        }
    }

    if (errors.length > 0) fail(errors);

    console.log(`✅ Publish package validation passed (${packed.filename}).`);
    console.log(`   ${files.size} files, ${(packed.unpackedSize / 1024 / 1024).toFixed(1)} MB unpacked`);
    console.log(`   ${RELEASED_COMPONENTS.length} released components with .js, .cjs and .d.ts`);
} finally {
    fs.rmSync(packDir, { recursive: true, force: true });
}
