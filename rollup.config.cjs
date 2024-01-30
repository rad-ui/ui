// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
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

export default components.map((component) => {
    const tsxFilePath = `src/components/ui/${component}/${component}.tsx`;
    return {
        input: tsxFilePath,
        output: [
            {
                file: `dist/components/${component}.js`,
                format: 'es',
            },
        ],
        external: ['react', 'react-dom'],
        plugins: [
            alias({
                entries: [
                    {find: '~/core', replacement: path.resolve(__dirname, 'src/core')},
                ],
            }),
            postcss({
                plugins: [],
                minimize: true,
            }),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
            }),
            typescript({tsconfig: './tsconfig.json'}),
            resolve(),
            terser(),
            banner2(() => '\'use client\';'),
        ],
    };
},

);
