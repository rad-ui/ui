#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');

const requiredPaths = [
    'components',
    'themes/default.css',
    'themes/baremetal.css',
    'themes/tailwind-presets/default.js'
];

const missingPaths = requiredPaths.filter((relativePath) => !fs.existsSync(path.join(distPath, relativePath)));

if (missingPaths.length > 0) {
    console.error('❌ Build artifact validation failed.');
    missingPaths.forEach((relativePath) => console.error(`   Missing: dist/${relativePath}`));
    process.exit(1);
}

const componentFiles = fs.readdirSync(path.join(distPath, 'components'));
const hasComponentJs = componentFiles.some((file) => file.endsWith('.js'));
const hasComponentTypes = componentFiles.some((file) => file.endsWith('.d.ts'));

if (!hasComponentJs || !hasComponentTypes) {
    console.error('❌ Build artifact validation failed.');
    if (!hasComponentJs) console.error('   Missing compiled component .js files in dist/components');
    if (!hasComponentTypes) console.error('   Missing component type declarations (.d.ts) in dist/components');
    process.exit(1);
}

console.log('✅ Build artifacts are complete.');
