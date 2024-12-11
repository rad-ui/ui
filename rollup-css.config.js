import postcss from 'rollup-plugin-postcss';

export default {
    input: 'styles/themes/default.scss',
    output: {
        file: 'dist/themes/default.css'
    },
    plugins: [
        postcss({
            extract: true,
            minimize: true,
            use: ['sass']
        })
    ]
};
