// rollup.config.js
import esbuild from 'rollup-plugin-esbuild';
import resolve from '@rollup/plugin-node-resolve';

import terser from '@rollup/plugin-terser';

import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import path from 'path';
import fs from 'fs';

import banner2 from 'rollup-plugin-banner2';
import fg from 'fast-glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Async function to get all component directories in the 'src/components/ui' folder
async function getComponentDirectories() {
    const componentsPath = 'src/components/ui/*/';
    const dirs = await fg(componentsPath, { onlyDirectories: true, deep: 1 });
    return dirs
      .map(dir => dir.split('/').slice(-2, -1)[0])
      .filter(name => name && name !== 'ui');
}

const aliasPluginInstance = alias({
    entries: [
        { find: '~/core', replacement: path.resolve(__dirname, 'src/core') }
    ]
});

/**
 * Note: Using an instance of a plugin avoids Javascript Heap Out of Memory error
 * More explanation here by sahithyandev at https://github.com/sahithyandev/rollup-issue-reproduction
 *
 * Using it this way not only avoids the Javascript Heap Out of Memory error but also speeds up the build process
 */

const terserPluginInstance = terser();
const resolvePluginInstance = resolve();
const bannerPluginInstance = banner2(() => '\'use client\';');

// Export a function for Rollup to support async config and cache
export default async () => {
    const components = await getComponentDirectories();
    return components.map((component) => {
        const tsxFilePath = `src/components/ui/${component}/${component}.tsx`;
        return {
            input: tsxFilePath,
            output: [
                {
                    file: `dist/temp-cleanup/${component}.js`,
                    format: 'es',
                    sourcemap: false,
                    // Enable Rollup output cache
                    cache: true
                }
            ],
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            plugins: [
                aliasPluginInstance,
                esbuild({
                    minify: true,
                    jsx: 'automatic',
                    target: 'es2018',
                    tsconfig: './tsconfig.json',
                }),
                resolvePluginInstance,
                terserPluginInstance,
                bannerPluginInstance
            ],
            // Enable Rollup cache for incremental builds
            cache: true
        };
    });
};
