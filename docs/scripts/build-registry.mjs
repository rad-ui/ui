// Builds the shadcn-compatible registry served from rad-ui.com/r/.
//
//   registry/registry.json (sources)  →  public/r/registry.json (index)
//                                      →  public/r/<name>.json   (one item, file contents inlined)
//
// Install with: npx shadcn@latest add https://www.rad-ui.com/r/<name>.json
// Runs in `prebuild`; run `pnpm registry:build` after editing anything in registry/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(docsRoot, 'public', 'r');
const ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

const registry = JSON.parse(fs.readFileSync(path.join(docsRoot, 'registry', 'registry.json'), 'utf8'));

fs.mkdirSync(outDir, { recursive: true });

const names = new Set();
for (const item of registry.items) {
    if (names.has(item.name)) throw new Error(`Duplicate registry item: ${item.name}`);
    names.add(item.name);

    const files = item.files.map((file) => {
        const source = path.join(docsRoot, file.path);
        if (!source.startsWith(path.join(docsRoot, 'registry') + path.sep)) {
            throw new Error(`${item.name}: ${file.path} must live in docs/registry/`);
        }
        return { ...file, content: fs.readFileSync(source, 'utf8') };
    });

    const output = { $schema: ITEM_SCHEMA, ...item, files };
    fs.writeFileSync(path.join(outDir, `${item.name}.json`), JSON.stringify(output, null, 2) + '\n');
}

fs.writeFileSync(path.join(outDir, 'registry.json'), JSON.stringify(registry, null, 2) + '\n');
console.log(`Built ${registry.items.length} registry items into public/r/`);
