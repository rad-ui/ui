#!/usr/bin/env node
/**
 * Validate docs copy-paste snippets against the supported public package surface.
 *
 * Usage: node scripts/check-docs-snippets.mjs
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const DOCS_ROOT = path.resolve(__dirname, '../docs');
const SOURCE_COMPONENTS_ROOT = path.resolve(__dirname, '../src/components/ui');
const PACKAGE_NAME = '@radui/ui';
const RELEASED_COMPONENTS = new Set(require('./RELEASED_COMPONENTS.cjs'));

const SOURCE_COMPONENTS = new Set(
  fs
    .readdirSync(SOURCE_COMPONENTS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
);

const ALLOWED_SUBPATHS = new Set([
  'themes/default.css',
  'themes/baremetal.css',
  'themes/tailwind-presets/default.js'
]);

const SCANNED_EXTENSIONS = new Set(['.mdx', '.md', '.tsx', '.ts', '.js', '.jsx']);
const IGNORED_DIRS = new Set(['node_modules', '.next', 'dist', '.git']);

const IMPORT_PATTERN = /@radui\/ui(?:\/([^'"\s]+))?/g;
const INSTALL_PATTERN = /(?:npm install|pnpm add|yarn add|bun add)(?:\s+[-\w]+)*\s+(@[^\s;]+)/g;

const errors = [];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (SCANNED_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function recordError(file, line, message) {
  const relativeFile = path.relative(process.cwd(), file);
  errors.push(`${relativeFile}:${line}: ${message}`);
}

function validateImport(file, lineNumber, subpath) {
  if (!subpath) {
    return;
  }

  if (ALLOWED_SUBPATHS.has(subpath)) {
    return;
  }

  if (RELEASED_COMPONENTS.has(subpath) || SOURCE_COMPONENTS.has(subpath)) {
    return;
  }

  recordError(
    file,
    lineNumber,
    `unknown @radui/ui subpath "${subpath}" — use a released component or documented theme export`
  );
}

function validateInstall(file, lineNumber, packageName) {
  const normalized = packageName.replace(/['",;]+$/, '');

  if (normalized !== PACKAGE_NAME && !normalized.startsWith(`${PACKAGE_NAME}@`)) {
    recordError(
      file,
      lineNumber,
      `unexpected install package "${normalized}" — expected ${PACKAGE_NAME}`
    );
  }
}

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    for (const match of line.matchAll(IMPORT_PATTERN)) {
      validateImport(file, lineNumber, match[1]);
    }

    for (const match of line.matchAll(INSTALL_PATTERN)) {
      validateInstall(file, lineNumber, match[1]);
    }
  });
}

if (!fs.existsSync(DOCS_ROOT)) {
  console.error(`Docs directory not found: ${DOCS_ROOT}`);
  process.exit(1);
}

const files = walk(DOCS_ROOT);
files.forEach(scanFile);

if (errors.length > 0) {
  console.error('Docs snippet consistency check failed:\n');
  errors.forEach((error) => console.error(`  ${error}`));
  process.exit(1);
}

console.log(`✅ Docs snippet consistency check passed (${files.length} files scanned).`);
