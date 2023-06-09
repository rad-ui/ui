// rollup.config.js
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.js',
    output: {
      file: 'dist/rad-ui.js',
      format: 'umd',
      name: 'RadUI',
      globals: {
        react: 'React',
      },
    },
    external: ['react'],
    plugins: [
        babel({
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
          presets: ['@babel/preset-react'], // Add this line
        }),
      ],
  };
  