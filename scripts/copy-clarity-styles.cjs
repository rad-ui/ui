#!/usr/bin/env node

/**
 * Copy Clarity Styles Script for Rad UI
 *
 * WHAT THIS SCRIPT DOES:
 * Copies every component's Clarity style source
 * (src/components/ui/<Component>/*.clarity.scss) into
 * dist/styles/clarity/<Component>/, keeping the folder structure.
 *
 * WHY IT'S REQUIRED:
 * 1. Published source of truth: the package exports these files as
 *    `@radui/ui/styles/clarity/*`, so the docs show the exact styles that ship
 *    in the version they render, instead of fetching `main` from GitHub.
 * 2. Consumers can read or compile a single component's styles.
 * 3. Folder structure is preserved so relative `@use` imports between
 *    components (e.g. `@use '../Button/button.clarity'`) keep resolving.
 */

const fs = require('fs');
const path = require('path');

const componentsRoot = path.resolve(__dirname, '../src/components/ui');
const outputRoot = path.resolve(__dirname, '../dist/styles/clarity');

let copied = 0;

for (const componentDir of fs.readdirSync(componentsRoot, { withFileTypes: true })) {
    if (!componentDir.isDirectory()) continue;

    const sourceDir = path.join(componentsRoot, componentDir.name);
    const styleFiles = fs.readdirSync(sourceDir).filter((file) => file.endsWith('.clarity.scss'));
    if (styleFiles.length === 0) continue;

    const targetDir = path.join(outputRoot, componentDir.name);
    fs.mkdirSync(targetDir, { recursive: true });

    for (const file of styleFiles) {
        fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
        copied++;
    }
}

if (copied === 0) {
    console.error('❌ No *.clarity.scss files found under src/components/ui');
    process.exit(1);
}

console.log(`✅ Copied ${copied} Clarity style files to dist/styles/clarity`);
