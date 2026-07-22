#!/usr/bin/env node

/**
 * Validate the exact npm publish artifact before upload.
 *
 * Runs `npm pack`, inspects the tarball contents, and ensures every shipped
 * export path exists in the package consumers would install.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const RELEASED_COMPONENTS = require('./RELEASED_COMPONENTS.cjs');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));

const REQUIRED_THEME_FILES = [
    'dist/themes/default.css',
    'dist/themes/baremetal.css',
    'dist/themes/tailwind-presets/default.js'
];

const MIN_CSS_BYTES = 1024;

function collectExportPaths(exportsField) {
    const required = new Set();
    const optional = new Set();

    for (const [entry, value] of Object.entries(exportsField)) {
        if (typeof value === 'string') {
            required.add(value.replace(/^\.\//, ''));
            continue;
        }

        if (typeof value !== 'object' || value === null) continue;

        for (const [condition, target] of Object.entries(value)) {
            if (typeof target !== 'string' || !target.startsWith('./')) continue;

            const normalized = target.replace(/^\.\//, '');
            if (condition === 'require' || entry === '.') {
                optional.add(normalized);
            } else {
                required.add(normalized);
            }
        }
    }

    return { required: [...required], optional: [...optional] };
}

function listTarballFiles(tarballPath) {
    const output = execSync(`tar -tzf "${tarballPath}"`, {
        cwd: repoRoot,
        encoding: 'utf8'
    });

    return output
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}

function toPackagePath(relativePath) {
    return `package/${relativePath}`;
}

function fail(messages) {
    console.error('❌ Publish package validation failed.');
    messages.forEach((message) => console.error(`   ${message}`));
    process.exit(1);
}

if (!fs.existsSync(path.join(repoRoot, 'dist'))) {
    fail(['dist/ not found. Run npm run build:rollup before validating the publish artifact.']);
}

let tarballPath = '';

try {
    tarballPath = execSync('npm pack --ignore-scripts --silent', {
        cwd: repoRoot,
        encoding: 'utf8'
    })
        .trim()
        .split('\n')
        .pop();

    if (!tarballPath || !fs.existsSync(path.join(repoRoot, tarballPath))) {
        fail([`Could not create npm pack tarball (got: ${tarballPath || 'empty output'})`]);
    }

    const tarballFiles = new Set(listTarballFiles(tarballPath));
    const errors = [];
    const warnings = [];

    for (const relativePath of REQUIRED_THEME_FILES) {
        const packagePath = toPackagePath(relativePath);
        if (!tarballFiles.has(packagePath)) {
            errors.push(`Missing required theme file in tarball: ${packagePath}`);
            continue;
        }

        if (relativePath.endsWith('.css')) {
            const bytes = fs.statSync(path.join(repoRoot, relativePath)).size;
            if (bytes < MIN_CSS_BYTES) {
                errors.push(`Theme CSS file is too small (${bytes} bytes): ${relativePath}`);
            }
        }
    }

    const { required, optional } = collectExportPaths(pkg.exports);

    for (const relativePath of required) {
        const packagePath = toPackagePath(relativePath);
        if (!tarballFiles.has(packagePath)) {
            errors.push(`Missing export target in tarball: ${packagePath}`);
        }
    }

    for (const relativePath of optional) {
        const packagePath = toPackagePath(relativePath);
        if (!tarballFiles.has(packagePath)) {
            warnings.push(`Optional export target missing from tarball: ${packagePath}`);
        }
    }

    for (const component of RELEASED_COMPONENTS) {
        for (const ext of ['.js', '.d.ts']) {
            const packagePath = toPackagePath(`dist/components/${component}${ext}`);
            if (!tarballFiles.has(packagePath)) {
                errors.push(`Missing released component in tarball: ${packagePath}`);
            }
        }
    }

    const shippedComponentJs = [...tarballFiles].filter((file) =>
        /^package\/dist\/components\/[A-Z][A-Za-z0-9]+\.js$/.test(file)
    ).length;

    if (shippedComponentJs < RELEASED_COMPONENTS.length) {
        errors.push(
            `Expected at least ${RELEASED_COMPONENTS.length} component bundles, found ${shippedComponentJs}`
        );
    }

    if (warnings.length > 0) {
        console.warn(`⚠️  Publish package warnings (${warnings.length} optional export targets not shipped).`);
        if (warnings.length <= 5) {
            warnings.forEach((message) => console.warn(`   ${message}`));
        } else {
            warnings.slice(0, 3).forEach((message) => console.warn(`   ${message}`));
            console.warn(`   ...and ${warnings.length - 3} more optional export targets`);
        }
    }

    if (errors.length > 0) {
        fail(errors);
    }

    console.log(`✅ Publish package validation passed (${tarballPath}).`);
    console.log(`   ${tarballFiles.size} files in tarball`);
    console.log(`   ${REQUIRED_THEME_FILES.length} theme files present`);
    console.log(`   ${RELEASED_COMPONENTS.length} released components present`);
} finally {
    if (tarballPath) {
        const absoluteTarballPath = path.join(repoRoot, tarballPath);
        if (fs.existsSync(absoluteTarballPath)) {
            fs.unlinkSync(absoluteTarballPath);
        }
    }
}
