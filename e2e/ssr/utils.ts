import { build } from 'esbuild';
import path from 'path';

export async function bundleForSSR(componentName: string) {
  const entry = `import React from 'react';\nimport { hydrateRoot } from 'react-dom/client';\nimport { ${componentName} } from './ssr-components';\nhydrateRoot(document.getElementById('root')!, React.createElement(${componentName}));\nwindow.__HYDRATED__ = true;`;

  const result = await build({
    stdin: {
      contents: entry,
      resolveDir: __dirname,
      loader: 'tsx',
      sourcefile: 'entry.tsx'
    },
    bundle: true,
    format: 'esm',
    write: false,
    platform: 'browser',
    jsx: 'automatic',
    tsconfig: path.resolve(__dirname, '../../tsconfig.json')
  });

  return result.outputFiles[0].text;
}
