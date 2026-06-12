#!/usr/bin/env node
/**
 * Guard the supported public export surface against accidental removals.
 *
 * Usage:
 *   node scripts/check-public-api-surface.mjs --check
 *   node scripts/check-public-api-surface.mjs --update
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const SNAPSHOT_PATH = path.join(__dirname, 'public-api-surface.snapshot.json');
const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
const DIST_COMPONENTS_PATH = path.join(__dirname, '../dist/components');
const RELEASED_COMPONENTS = require('./RELEASED_COMPONENTS.cjs');

const STATIC_EXPORTS = [
  '.',
  './themes/default.css',
  './themes/baremetal.css',
  './themes/tailwind-presets/default.js'
];

const isCheck = process.argv.includes('--check');
const isUpdate = process.argv.includes('--update');

if (!isCheck && !isUpdate) {
  console.error('Pass --check or --update');
  process.exit(1);
}

function getExpectedExportPaths() {
  return [
    ...STATIC_EXPORTS,
    ...RELEASED_COMPONENTS.map((name) => `./${name}`)
  ].sort();
}

function readPackageExportPaths() {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return Object.keys(pkg.exports ?? {}).sort();
}

function readSnapshot() {
  if (!fs.existsSync(SNAPSHOT_PATH)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
}

function writeSnapshot(snapshot) {
  fs.writeFileSync(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
}

function diffLists(previous, current) {
  const previousSet = new Set(previous);
  const currentSet = new Set(current);

  return {
    removed: previous.filter((item) => !currentSet.has(item)),
    added: current.filter((item) => !previousSet.has(item))
  };
}

function verifyDeclarationFiles() {
  if (!fs.existsSync(DIST_COMPONENTS_PATH)) {
    console.warn('Skipping .d.ts verification: dist/components not found. Run npm run build:rollup first.');
    return;
  }

  const missing = RELEASED_COMPONENTS.filter((name) => {
    const declarationPath = path.join(DIST_COMPONENTS_PATH, `${name}.d.ts`);
    return !fs.existsSync(declarationPath);
  });

  if (missing.length > 0) {
    console.error('Missing generated declaration files for released components:');
    missing.forEach((name) => console.error(`  - dist/components/${name}.d.ts`));
    process.exit(1);
  }
}

const expectedExportPaths = getExpectedExportPaths();

function verifyPackageExportsIfBuilt() {
  const packageExportPaths = readPackageExportPaths();
  const hasComponentExports = packageExportPaths.some(
    (entry) => entry !== '.' && !entry.startsWith('./themes/')
  );

  if (!hasComponentExports) {
    return;
  }

  const packageDiff = diffLists(expectedExportPaths, packageExportPaths);

  if (packageDiff.removed.length > 0 || packageDiff.added.length > 0) {
    console.error('package.json exports do not match RELEASED_COMPONENTS + static theme exports.');

    if (packageDiff.removed.length > 0) {
      console.error('Missing export paths:');
      packageDiff.removed.forEach((item) => console.error(`  - ${item}`));
    }

    if (packageDiff.added.length > 0) {
      console.error('Unexpected export paths (run build:generate-exports):');
      packageDiff.added.forEach((item) => console.error(`  - ${item}`));
    }

    process.exit(1);
  }
}

const snapshot = {
  exportPaths: expectedExportPaths,
  releasedComponents: [...RELEASED_COMPONENTS].sort()
};

if (isUpdate) {
  writeSnapshot(snapshot);
  console.log(`Updated ${path.relative(process.cwd(), SNAPSHOT_PATH)}`);
  process.exit(0);
}

const previousSnapshot = readSnapshot();

if (!previousSnapshot) {
  console.error(`Snapshot missing at ${SNAPSHOT_PATH}. Run with --update to create it.`);
  process.exit(1);
}

const exportDiff = diffLists(previousSnapshot.exportPaths ?? [], snapshot.exportPaths);
const componentDiff = diffLists(previousSnapshot.releasedComponents ?? [], snapshot.releasedComponents);

if (exportDiff.removed.length > 0 || componentDiff.removed.length > 0) {
  console.error('Public API surface shrank without updating the snapshot.');

  if (exportDiff.removed.length > 0) {
    console.error('Removed export paths:');
    exportDiff.removed.forEach((item) => console.error(`  - ${item}`));
  }

  if (componentDiff.removed.length > 0) {
    console.error('Removed released components:');
    componentDiff.removed.forEach((item) => console.error(`  - ${item}`));
  }

  console.error('If this removal is intentional, run:');
  console.error('  node scripts/check-public-api-surface.mjs --update');
  console.error('and include a major changeset with migration notes.');
  process.exit(1);
}

if (exportDiff.added.length > 0 || componentDiff.added.length > 0) {
  console.warn('Public API surface grew. Update the snapshot when the release is intentional:');
  console.warn('  node scripts/check-public-api-surface.mjs --update');
}

verifyPackageExportsIfBuilt();
verifyDeclarationFiles();
console.log('✅ Public API surface check passed.');
