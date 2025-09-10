import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
