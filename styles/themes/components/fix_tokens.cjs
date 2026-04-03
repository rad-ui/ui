const fs = require('fs');
const path = require('path');

const dir = '/Users/pranaykothapalli/Desktop/dev/hobby/ui/styles/themes/components';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Remove any 950 uses, rounding up to 1000
    content = content.replace(/-950/g, '-1000');

    // Rule: color: (replace 600 -> 700, 800 -> 900)
    content = content.replace(/(?<=color:\s*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)600(?=\))/g, '700');
    content = content.replace(/(?<=color:\s*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)800(?=\))/g, '900');

    // Rule: background-color: (if 500 or 600 or 900 => 800)
    content = content.replace(/(?<=background(?:-color)?:\s*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)(500|600|900)(?=\))/g, '800');

    // Rule: border-color, border, border-..., box-shadow
    // If it's a border mapping, 300,400 -> 500, 700,800,900 -> 600
    content = content.replace(/(?<=(?:border|border-[a-z]+|box-shadow)[^;]*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)(300|400)(?=\))/g, '500');
    content = content.replace(/(?<=(?:border|border-[a-z]+|box-shadow)[^;]*var\(--rad-ui-color-(?:gray|accent|[\w]+)-)(700|800|900)(?=\))/g, '600');

    // Avatar base has `background-color: var(--rad-ui-color-gray-200);` which is hover. Muted surface without interaction is 100.
    if (filePath.includes('_avatar-base.scss')) {
        content = content.replace(/gray-200/g, 'gray-100');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', path.basename(filePath));
    }
}

function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.scss')) processFile(full);
    }
}

walk(dir);
