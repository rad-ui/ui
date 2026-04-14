const fs = require('fs');
const path = require('path');

// Read the base tokens CSS file
const baseTokensPath = path.resolve(__dirname, '../styles/cssTokens/base.tokens.css');
const baseTokens = fs.readFileSync(baseTokensPath, 'utf-8');

// Extract color definitions from :root
const rootMatch = baseTokens.match(/:root\s*\{([^}]+)\}/s);
if (!rootMatch) {
    console.error('Could not find :root block in base.tokens.css');
    process.exit(1);
}

const colorVars = rootMatch[1].trim();

// Convert rad-ui color variables to Tailwind v4 @theme format
const lines = colorVars.split('\n').filter(line => line.trim());
const themeColors = [];

lines.forEach(line => {
    const match = line.match(/--rad-ui-color-(\w+)-(\d+):\s*(.+);/);
    if (match) {
        const [, colorName, shade, value] = match;
        themeColors.push(`  --color-${colorName}-${shade}: ${value.trim()};`);
    }
});

// Generate the v4 preset CSS file
const v4PresetContent = `/* Tailwind CSS v4 Preset for @radui/ui */
/* This file provides Tailwind v4 compatible theme configuration */
/* Import this in your CSS: @import "@radui/ui/themes/tailwind-presets/default-v4.css"; */

@theme {
${themeColors.join('\n')}
}
`;

// Write the v4 preset file
const outputPath = path.resolve(__dirname, '../styles/tailwind-presets/default-v4.css');
fs.writeFileSync(outputPath, v4PresetContent, 'utf-8');

console.log('✅ Generated Tailwind v4 preset at:', outputPath);
console.log(`📦 Exported ${themeColors.length} color variables`);
