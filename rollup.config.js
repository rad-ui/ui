// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import path from 'path';
import fs from 'fs';

import preserveDirectives from 'rollup-plugin-preserve-directives';

import banner2 from 'rollup-plugin-banner2';

// Function to dynamically get all component directories in the 'src/components' folder
function getComponentDirectories() {
    const componentsPath = 'src/components/ui';
    return fs.readdirSync(componentsPath)
        .filter((file) => fs.statSync(path.join(componentsPath, file)).isDirectory());
}

const components = getComponentDirectories();

export default components.map((component) => ({
    input: `src/components/ui/${component}/${component}.js`,
    output: [
        {
            file: `dist/ui/${component}.js`,
            format: 'es',
        },
        {
            file: `dist/ui/${component}.es.js`,
            format: 'es',
            exports: 'named',
        },
    ],
    external: ['react', 'react-dom'],
    plugins: [
        postcss({
            plugins: [],
            minimize: true,
        }),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
        resolve(),
        banner2(() => `
      /**
       * rollup-plugin-banner2
       */
      'use client';
    `),
        preserveDirectives(['use client']),
        // terser(),
    ],
    onwarn(warning, warn) {
        if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
      warning.message.includes('use client')
        ) {
            // Ignore this warning
            return;
        }
        warn(warning);
    },
}));
