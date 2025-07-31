// rollup.config.cjs
const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const alias = require('@rollup/plugin-alias');
const path = require('path');
const fs = require('fs');
const banner2 = require('rollup-plugin-banner2');

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

const typescriptPluginInstance = typescript({ tsconfig: './tsconfig.json', sourceMap: false });
const aliasPluginInstance = alias({
    entries: [
        { find: '~/core', replacement: path.resolve(__dirname, 'src/core') }
    ]
});
const babelPluginInstance = babel({
    exclude: 'node_modules/**',
    presets: ['@babel/preset-react'],
    babelHelpers: 'bundled'
});
const terserPluginInstance = terser();
const resolvePluginInstance = resolve();
const bannerPluginInstance = banner2(() => '\'use client\';');

module.exports = components.map((component) => {
    const tsxFilePath = `src/components/ui/${component}/${component}.tsx`;
    return {
        input: tsxFilePath,
        onwarn(warning, warn) {
            // Suppress expected warnings
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                return;
            }
            warn(warning);
        },
        output: [
            {
                file: `dist/temp-cleanup/${component}.js`,
                format: 'es'
            }
        ],
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        plugins: [
            aliasPluginInstance,
            babelPluginInstance,
            typescriptPluginInstance,
            resolvePluginInstance,
            terserPluginInstance,
            bannerPluginInstance
        ]
    };
}

);
