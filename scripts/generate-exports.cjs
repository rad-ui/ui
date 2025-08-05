const fs = require('fs');
const path = require('path');

// Component exports
const distPath = path.resolve(__dirname, '../dist/components');
const files = fs.readdirSync(distPath);

const exportsMap = {};

// Add theme exports
exportsMap['./themes/default.css'] = './dist/themes/default.css';
exportsMap['./themes/tailwind-presets/default.js'] = './dist/themes/tailwind-presets/default.js';

// Add component exports
files.forEach(file => {
    const match = file.match(/^(.+)\.js$/);
    if (match) {
        const name = match[1];
        exportsMap[`./${name}`] = {
            import: `./dist/components/${name}.js`,
            types: `./dist/components/${name}.d.ts`
        };
    }
});

const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.exports = exportsMap;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('✅ package.json exports updated!');
