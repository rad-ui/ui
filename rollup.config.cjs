// rollup.config.cjs
const resolve = require('@rollup/plugin-node-resolve').default;
const terser = require('@rollup/plugin-terser').default;
const alias = require('@rollup/plugin-alias');
const path = require('path');
const fs = require('fs');
const banner2 = require('rollup-plugin-banner2');
const esbuild = require('rollup-plugin-esbuild');

// Function to dynamically get all component directories in the 'src/components/ui' folder
function getComponentDirectories() {
    const componentsPath = path.join(__dirname, 'src/components/ui');
    if (!fs.existsSync(componentsPath)) return [];
    return fs.readdirSync(componentsPath)
        .filter((file) => fs.statSync(path.join(componentsPath, file)).isDirectory());
}

const components = getComponentDirectories();

const aliasPluginInstance = alias({
    entries: [
        { find: '~/core', replacement: path.resolve(__dirname, 'src/core') }
    ]
});
const terserPluginInstance = terser();
const resolvePluginInstance = resolve();
const bannerPluginInstance = banner2(() => `'use client';`);
const esbuildPluginInstance = esbuild.default ? esbuild.default({
    include: /\.[jt]sx?$/,
    exclude: /node_modules/,
    sourceMap: false,
    minify: false,
    target: 'esnext',
    jsx: 'automatic',
    tsconfig: 'tsconfig.json',
}) : esbuild({
    include: /\.[jt]sx?$/,
    exclude: /node_modules/,
    sourceMap: false,
    minify: false,
    target: 'esnext',
    jsx: 'automatic',
    tsconfig: 'tsconfig.json',
});

module.exports = components.map((component) => {
    const tsxFilePath = path.join('src/components/ui', component, `${component}.tsx`);
    return {
        input: tsxFilePath,
        output: [
            {
                file: `dist/temp-cleanup/${component}.js`,
                format: 'es'
            }
        ],
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        plugins: [
            aliasPluginInstance,
            esbuildPluginInstance,
            resolvePluginInstance,
            terserPluginInstance,
            bannerPluginInstance
        ]
    };
});
