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


const typescriptPluginInstance = typescript({tsconfig: './tsconfig.json', sourceMap: false});
const aliasPluginInstance = alias({
    entries: [
        {find: '~/core', replacement: path.resolve(__dirname, 'src/core')},
    ],
});
const babelPluginInstance = babel({
    exclude: 'node_modules/**',
    presets: ['@babel/preset-react'],
});
const terserPluginInstance = terser();
const resolvePluginInstance = resolve();
const bannerPluginInstance = banner2(() => '\'use client\';');

export default components.map((component) => {
    const tsxFilePath = `src/components/ui/${component}/${component}.tsx`;
    return {
        input: tsxFilePath,
        output: [
            {
                file: `dist/temp-cleanup/${component}.js`,
                format: 'es',
            },
        ],
        external: ['react', 'react-dom'],
        plugins: [
            aliasPluginInstance,
            babelPluginInstance,
            typescriptPluginInstance,
            resolvePluginInstance,
            terserPluginInstance,
            bannerPluginInstance,
        ],
    };
},

);
