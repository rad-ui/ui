// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
// import postcss from 'rollup-plugin-postcss';

import preserveDirectives from 'rollup-plugin-preserve-directives';

import banner2 from 'rollup-plugin-banner2';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'es',

        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            exports: 'named',
        },
    ],
    external: ['react', 'react-dom'],
    plugins: [
        // postcss({
        //   plugins: [],
        //   minimize: true,
        // }),
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
          warning.message.includes(`use client`)
        ) {
            // Ignore this warning
            return;
        }
        warn(warning);
    },
};
