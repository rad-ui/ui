// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import path from 'path';
import fs from 'fs';
import banner2 from 'rollup-plugin-banner2';

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

const typescriptPluginInstance = typescript({
    tsconfig: './tsconfig.json',
    sourceMap: false,
    declaration: true,
    declarationDir: './dist'
});

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

const terserPluginInstance = terser({
    // Enable better tree-shaking with these options
    compress: {
        pure_getters: true,
        top_retain: null,
        side_effects: true
    },
    mangle: {
        toplevel: true
    },
    format: {
        comments: false
    }
});

const resolvePluginInstance = resolve({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // This helps with better tree-shaking
    modulesOnly: true
});

const bannerPluginInstance = banner2(() => '\'use client\';');

// Create a bundle configuration for each component
const componentConfigs = components.map((component) => {
    const tsxFilePath = `src/components/ui/${component}/${component}.tsx`;
    return {
        input: tsxFilePath,
        output: [
            {
                file: `dist/components/${component}.js`,
                format: 'es',
                sourcemap: false,
                // This preserves the names of exports which helps with tree-shaking
                preserveModules: false
            },
            {
                file: `dist/components/${component}.cjs`,
                format: 'cjs',
                sourcemap: false,
                exports: 'named'
            }
        ],
        // Mark these packages as external so they won't be bundled
        external: ['react', 'react-dom', 'react/jsx-runtime', 'clsx', '@floating-ui/react'],
        plugins: [
            aliasPluginInstance,
            babelPluginInstance,
            typescriptPluginInstance,
            resolvePluginInstance,
            terserPluginInstance,
            bannerPluginInstance
        ],
        // This helps with tree-shaking by removing side-effect free modules
        treeshake: {
            moduleSideEffects: false,
            propertyReadSideEffects: false,
            tryCatchDeoptimization: false
        }
    };
});

// Add an index.js bundle that re-exports all components
const indexConfig = {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'es',
            sourcemap: false
        },
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            sourcemap: false,
            exports: 'named'
        }
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime', 'clsx', '@floating-ui/react'],
    plugins: [
        aliasPluginInstance,
        babelPluginInstance,
        typescriptPluginInstance,
        resolvePluginInstance,
        terserPluginInstance,
        bannerPluginInstance
    ],
    treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
    }
};

export default [...componentConfigs, indexConfig];
