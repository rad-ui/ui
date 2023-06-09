// rollup.config.js
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/rad-ui.js',
        format: 'umd',
        name: 'RadUI',
        globals: {
          react: 'React',
        },
      }
    ],
    external: [
      'react',
      'react-dom',
      // Add other external dependencies here
    ],
    plugins: [
        babel({
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
          presets: ['@babel/preset-react'], // Add this line
        }),
      ],
      treeshake: {
        moduleSideEffects: false,
      },
  };
  