import terser from '@rollup/plugin-terser';

export default {
    input: 'styles/jsTokens/index.js',
    output: {
        file: 'dist/themes/tailwind-presets/default.js',
    },
    plugins: [
        terser(),
    ],
};


