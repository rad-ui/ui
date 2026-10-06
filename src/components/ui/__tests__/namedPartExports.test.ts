import fs from 'fs';
import path from 'path';

// React Server Components cannot read properties off a client component's default export
// (`Dialog.Root` is undefined across the boundary), so every compound part must also be a
// named export usable as `import * as Dialog from '@radui/ui/Dialog'`.
const UI_DIR = path.resolve(__dirname, '..');

const componentEntries = fs.readdirSync(UI_DIR)
    .filter((name) => /^[A-Z]/.test(name))
    .map((name) => ({ name, file: path.join(UI_DIR, name, `${name}.tsx`) }))
    .filter(({ file }) => fs.existsSync(file));

describe('compound components expose named part exports', () => {
    test.each(componentEntries.map(({ name }) => name))('%s', (name) => {
        const mod = require(path.join(UI_DIR, name, name));
        const defaultExport = mod.default;
        if (!defaultExport || (typeof defaultExport !== 'object' && typeof defaultExport !== 'function')) return;

        const parts = Object.keys(defaultExport).filter((key) => /^[A-Z]/.test(key));
        parts.forEach((part) => {
            expect({ part, exported: mod[part] === defaultExport[part] }).toEqual({ part, exported: true });
        });
    });
});
