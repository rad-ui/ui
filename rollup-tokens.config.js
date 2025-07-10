import terser from '@rollup/plugin-terser';

export default {
    input: 'styles/tailwind-presets/default.js',
    output: {
        file: 'dist/themes/tailwind-presets/default.js'
    },
    plugins: [
        terser()
    ],
    // Enable Rollup cache for incremental builds
    cache: true
};
