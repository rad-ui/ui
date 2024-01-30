import terser from '@rollup/plugin-terser';

export default {
    input: 'styles/jsTokens/base.tokens.js',
    output: {
        file: 'dist/themes/rad-ui-tokens.js',
    },
    plugins: [
        terser(),
    ],
};


