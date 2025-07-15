// build.rollup.mjs
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import banner2 from 'rollup-plugin-banner2';

import path from 'path';
import fs from 'fs';
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get all component directories
function getComponentDirectories() {
  const componentsPath = 'src/components/ui';
  return fs.readdirSync(componentsPath).filter(file =>
    fs.statSync(path.join(componentsPath, file)).isDirectory()
  );
}

const components = getComponentDirectories();

// Create plugin instances (outside loop to avoid memory issues)
const typescriptPluginInstance = typescript({ tsconfig: './tsconfig.json', sourceMap: false });
const aliasPluginInstance = alias({
  entries: [{ find: '~/core', replacement: path.resolve(__dirname, 'src/core') }]
});
const babelPluginInstance = babel({
  exclude: 'node_modules/**',
  presets: ['@babel/preset-react']
});
const terserPluginInstance = terser();
const resolvePluginInstance = resolve();
const bannerPluginInstance = banner2(() => `'use client';`);

const configs = components.map((component) => {
  const tsxFilePath = `src/components/ui/${component}/${component}.tsx`;
  return {
    input: tsxFilePath,
    output: [{ file: `dist/temp-cleanup/${component}.js`, format: 'es' }],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    plugins: [
      aliasPluginInstance,
      babelPluginInstance,
      typescriptPluginInstance,
      resolvePluginInstance,
      terserPluginInstance,
      bannerPluginInstance
    ]
  };
});

// Build all in parallel
async function buildAll() {
  await Promise.all(
    configs.map(async (config) => {
      const bundle = await rollup(config);
      for (const output of config.output) {
        await bundle.write(output);
      }
    })
  );
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
