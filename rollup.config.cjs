const resolve = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const alias = require('@rollup/plugin-alias');
const path = require('path');
const fs = require('fs');
const banner2 = require('rollup-plugin-banner2');
const { dts } = require('rollup-plugin-dts');

// Function to dynamically get all component directories in the 'src/components' folder
function getComponentDirectories() {
    const componentsPath = 'src/components/ui';
    return fs.readdirSync(componentsPath)
        .filter((file) => fs.statSync(path.join(componentsPath, file)).isDirectory());
}

const components = getComponentDirectories();

/**
 * Note: Using an instance of a plugin avoids Javascript Heap Out of Memory error
 * More explanation here by sahithyandev at https://github.com/sahithyandev/rollup-issue-reproduction
 *
 * Using it this way not only avoids the Javascript Heap Out of Memory error but also speeds up the build process
 */

// Shared plugin instances
const typescriptPluginInstance = typescript({
    tsconfig: './tsconfig.json',
    sourceMap: false,
    outDir: 'dist/temp-cleanup' // Match Rollup's output directory
});
const aliasPluginInstance = alias({
    entries: [
        { find: '~/core', replacement: path.resolve(__dirname, 'src/core') }
    ]
});
const terserPluginInstance = terser();
const resolvePluginInstance = resolve();
const bannerPluginInstance = banner2(() => '\'use client\';');

// Create input object for parallel processing
const componentInputs = {};
components.forEach((component) => {
    componentInputs[component] = `src/components/ui/${component}/${component}.tsx`;
});

// JS builds with bundled fragments
const jsBundles = {
    input: componentInputs,
    onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
    },
    output: {
        dir: 'dist/temp-cleanup',
        format: 'es',
        entryFileNames: '[name].js',
        preserveModules: false
    },
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    plugins: [
        aliasPluginInstance,
        typescriptPluginInstance,
        resolvePluginInstance,
        terserPluginInstance,
        bannerPluginInstance
    ]
};

// Type declarations builds (keep separate for dts plugin)
const dtsBundles = components.map((component) => {
    const entry = `src/components/ui/${component}/${component}.tsx`;
    return {
        input: entry,
        output: {
            file: `dist/temp-cleanup/${component}.d.ts`,
            format: 'es'
        },
        plugins: [dts()],
        external: ['react', 'react-dom']
    };
});

module.exports = [jsBundles, ...dtsBundles];
