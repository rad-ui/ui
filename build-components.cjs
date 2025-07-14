// build-components.js
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const componentsPath = path.resolve(__dirname, 'src/components/ui');
const outDir = path.resolve(__dirname, 'dist/temp-cleanup');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const components = fs.readdirSync(componentsPath)
  .filter((file) => fs.statSync(path.join(componentsPath, file)).isDirectory());

Promise.all(components.map(component => {
  const entry = path.join(componentsPath, component, `${component}.tsx`);
  const outfile = path.join(outDir, `${component}.js`);
  return esbuild.build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    format: 'esm',
    minify: true,
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    banner: { js: `'use client';` },
    sourcemap: false,
    // Add more esbuild options as needed
  });
})).then(() => {
  console.log('All components built with esbuild!');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});