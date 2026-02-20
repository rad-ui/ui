/**
 * Generate Exports Script for Rad UI
 *
 * WHAT THIS SCRIPT DOES:
 * This script automatically generates the "exports" field in package.json based on
 * the built components and theme files in the dist/ directory. It creates proper
 * import paths for both JavaScript and TypeScript users.
 *
 * WHY IT'S REQUIRED:
 * 1. Manual Maintenance: Without this script, we'd have to manually update package.json
 *    exports every time we add/remove components, which is error-prone and time-consuming.
 *
 * 2. TypeScript Support: Generates proper "types" field for each component, enabling
 *    TypeScript users to get proper type checking and IntelliSense.
 *
 * 3. Tree Shaking: Enables users to import individual components instead of the entire
 *    library, reducing bundle sizes significantly.
 *
 * 4. Theme Exports: Ensures theme files (CSS and Tailwind presets) are properly
 *    exported for styling support.
 *
 * 5. Consistency: Guarantees that all built components are automatically available
 *    for import without manual configuration.
 *
 * USAGE:
 * This script runs automatically as part of the build process via:
 * npm run build:generate-exports
 *
 * OUTPUT:
 * Updates package.json with exports like:
 * {
 *   "./Button": {
 *     "import": "./dist/components/Button.js",
 *     "types": "./dist/components/Button.d.ts"
 *   },
 *   "./themes/default.css": "./dist/themes/default.css"
 * }
 */

const fs = require('fs');
const path = require('path');
const RELEASED_COMPONENTS = require('./RELEASED_COMPONENTS.cjs');
const isCheck = process.argv.includes('--check');

// Component exports
const distPath = path.resolve(__dirname, '../dist/components');
let files = [];
try {
    files = fs.readdirSync(distPath);
} catch (error) {
    console.warn(`Warning: ${distPath} not found. No components will be exported.`);
    files = [];
}

const exportsMap = {};

// Root export
exportsMap['.'] = {
    import: './dist/index.js',
    require: './dist/index.cjs',
    types: './dist/index.d.ts'
};

// Add theme exports
exportsMap['./themes/default.css'] = './dist/themes/default.css';
exportsMap['./themes/tailwind-presets/default.js'] = './dist/themes/tailwind-presets/default.js';

const notReleasedComponents = [];

// Add component exports
files.forEach(file => {
    const match = file.match(/^(.+)\.js$/);
    if (match) {
        const name = match[1];

        if (!RELEASED_COMPONENTS.includes(name)) {
            notReleasedComponents.push(name);
            return;
        }

        exportsMap[`./${name}`] = {
            import: `./dist/components/${name}.js`,
            require: `./dist/components/${name}.cjs`,
            types: `./dist/components/${name}.d.ts`
        };
    }
});

if (notReleasedComponents.length > 0) {
    console.log(`Not released components: ${notReleasedComponents.join(', ')}`);
}

const pkgPath = path.resolve(__dirname, '../package.json');

try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    if (isCheck) {
        const current = JSON.stringify(pkg.exports, null, 2);
        const expected = JSON.stringify(exportsMap, null, 2);
        if (current !== expected) {
            console.error('❌ package.json exports are out of date. Run npm run build:generate-exports to update.');
            process.exit(1);
        }
        console.log('✅ package.json exports are up to date.');
    } else {
        pkg.exports = exportsMap;
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        console.log('✅ package.json exports updated!');
    }
} catch (error) {
    console.error('❌ Failed to update package.json exports:', error.message);
    process.exit(1);
}
