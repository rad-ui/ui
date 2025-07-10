import path from 'path';
import { readdirSync } from 'fs';
import esbuild from 'rollup-plugin-esbuild';
const esbuildPlugin = esbuild.default || esbuild;
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import banner2 from 'rollup-plugin-banner2';

// Auto-generate entry points from `src/components` (if needed)
const componentFiles = readdirSync('src/components')
  .filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))
  .map(f => `src/components/${f}`);

export default {
  input: componentFiles,
  output: {
    dir: 'dist/components',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src/components',
  },
  plugins: [
    alias({
      entries: [
        { find: '~', replacement: path.resolve(__dirname, 'src') },
      ],
    }),
    resolve({
      extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
    }),
    postcss({
      extract: false,
      minimize: true,
    }),
    esbuildPlugin({
      include: /\.[jt]sx?$/, // transpile .ts/.tsx/.js/.jsx
      exclude: /node_modules/,
      sourceMap: true,
      minify: false,
      target: 'esnext',
      jsx: 'automatic', // or 'transform' depending on your JSX runtime
      tsconfig: 'tsconfig.json',
    }),
    terser(),
    banner2(() => `/** @radui/ui build ${new Date().toISOString()} */`)
  ],
  external: ['react', 'react-dom']
};
