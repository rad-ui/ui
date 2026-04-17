#!/usr/bin/env node

/**
 * Process Components Script for Rad UI
 *
 * WHAT THIS SCRIPT DOES:
 * This script copies built components from temp-cleanup to the final components
 * directory, handling both .js and .d.ts files in a cross-platform way.
 *
 * WHY IT'S REQUIRED:
 * 1. Cross-Platform Compatibility: Works on all environments (local, CI, different shells)
 * 2. Error Handling: Gracefully handles missing files or directories
 * 3. Reliability: More robust than shell commands with brace expansion
 * 4. CI-Friendly: Works in minimal shell environments
 */

const fs = require('fs');
const path = require('path');

const tempCleanupPath = path.resolve(__dirname, '../dist/temp-cleanup');
const componentsPath = path.resolve(__dirname, '../dist/components');

// Ensure components directory exists
if (!fs.existsSync(componentsPath)) {
    fs.mkdirSync(componentsPath, { recursive: true });
    console.log('📁 Created components directory');
}

// Check if temp-cleanup exists
if (!fs.existsSync(tempCleanupPath)) {
    console.log('⚠️  No temp-cleanup directory found. Skipping component processing.');
    process.exit(0);
}

// Get all files in temp-cleanup
const files = fs.readdirSync(tempCleanupPath);
let copiedFiles = 0;

// Copy .js files
files.forEach(file => {
    if (file.endsWith('.js')) {
        const sourcePath = path.join(tempCleanupPath, file);
        const destPath = path.join(componentsPath, file);
        fs.copyFileSync(sourcePath, destPath);
        copiedFiles++;
        console.log(`📄 Copied: ${file}`);
    }
});

// Copy .d.ts files
files.forEach(file => {
    if (file.endsWith('.d.ts')) {
        const sourcePath = path.join(tempCleanupPath, file);
        const destPath = path.join(componentsPath, file);
        fs.copyFileSync(sourcePath, destPath);
        copiedFiles++;
        console.log(`📄 Copied: ${file}`);
    }
});

// Clean up temp-cleanup directory
if (fs.existsSync(tempCleanupPath)) {
    fs.rmSync(tempCleanupPath, { recursive: true, force: true });
    console.log('🗑️  Cleaned up temp-cleanup directory');
}

console.log(`✅ Processed ${copiedFiles} files successfully!`);
