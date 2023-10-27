// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
// import postcss from 'rollup-plugin-postcss';

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
    external: ['react'],
    plugins: [
        // postcss({
        //   plugins: [],
        //   minimize: true,
        // }),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
        external(),
        resolve(),
        // terser(),
    ],
};
