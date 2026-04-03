const fs = require('fs');
const path = require('path');

function getComponentsDir() {
    if (process.env.COMPONENTS_DIR) {
        return path.resolve(process.env.COMPONENTS_DIR);
    }
    return path.resolve(__dirname);
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Remove any 950 shade tokens, rounding up to 1000 (only inside --rad-ui-color-* names / var() refs)
    content = content.replace(
        /(?<=--rad-ui-color-(?:gray|accent|[\w]+)-)950(?=\)|:|,)/g,
        '1000',
    );

    // Rule: color: only (not *-color:); replace 600 -> 700, 800 -> 900
    content = content.replace(
        /(?<![\w-])(color:\s*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)600(?=\))/g,
        (_, prefix) => `${prefix}700`,
    );
    content = content.replace(
        /(?<![\w-])(color:\s*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)800(?=\))/g,
        (_, prefix) => `${prefix}900`,
    );

    // Rule: background-color: (if 500 or 600 or 900 => 800)
    content = content.replace(/(?<=background(?:-color)?:\s*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)(500|600|900)(?=\))/g, '800');

    // Rule: border-color, border, border-..., box-shadow
    // If it's a border mapping, 300,400 -> 500, 700,800,900 -> 600
    content = content.replace(/(?<=(?:border|border-[a-z]+|box-shadow)[^;]*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)(300|400)(?=\))/g, '500');
    content = content.replace(/(?<=(?:border|border-[a-z]+|box-shadow)[^;]*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)(700|800|900)(?=\))/g, '600');

    // Avatar base has `background-color: var(--rad-ui-color-gray-200);` which is hover. Muted surface without interaction is 100.
    if (filePath.includes('_avatar-base.scss')) {
        content = content.replace(
            /(?<=background-color:\s*var\(--rad-ui-color-gray-)200(?=\))/g,
            '100',
        );
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', path.basename(filePath));
    }
}

function walk(currentDir) {
    for (const f of fs.readdirSync(currentDir)) {
        const full = path.join(currentDir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.scss')) processFile(full);
    }
}

function run() {
    walk(getComponentsDir());
}

module.exports = { getComponentsDir, run, walk, processFile };

if (require.main === module) {
    run();
}
