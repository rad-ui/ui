import terser from '@rollup/plugin-terser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
    // v3 preset (JavaScript)
    {
        input: 'styles/tailwind-presets/default.js',
        output: {
            file: 'dist/themes/tailwind-presets/default.js'
        },
        plugins: [
            terser(),
            {
                name: 'copy-v4-preset',
                buildEnd() {
                    // Copy v4 CSS preset to dist
                    const source = path.resolve(__dirname, 'styles/tailwind-presets/default-v4.css');
                    const dest = path.resolve(__dirname, 'dist/themes/tailwind-presets/default-v4.css');
                    
                    // Ensure directory exists
                    const destDir = path.dirname(dest);
                    if (!fs.existsSync(destDir)) {
                        fs.mkdirSync(destDir, { recursive: true });
                    }
                    
                    // Copy file
                    fs.copyFileSync(source, dest);
                    console.log('✅ Copied v4 preset to dist');
                }
            }
        ]
    }
];
