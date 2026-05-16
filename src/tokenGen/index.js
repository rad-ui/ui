import fs from 'fs';
import path from 'path';

import tokens from '~/design-systems/clarity/tokens';
import generateCSSTokens from './transformers/generateCSSTokens.js';
import generateAccentTokens from './transformers/generateAccentTokens.js';
import generateAtomicTokens from './transformers/generateAtomicTokens.js';

const INDENT = '    ';

const formatString = (value) => `'${String(value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')}'`;

const formatKey = (key) => (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : formatString(key));

const formatJsValue = (value, indentLevel = 0) => {
    if (Array.isArray(value)) {
        if (value.length === 0) {
            return '[]';
        }

        const nextIndent = INDENT.repeat(indentLevel + 1);
        const currentIndent = INDENT.repeat(indentLevel);
        return `[\n${value.map((item) => `${nextIndent}${formatJsValue(item, indentLevel + 1)}`).join(',\n')}\n${currentIndent}]`;
    }

    if (value && typeof value === 'object') {
        const entries = Object.entries(value);
        if (entries.length === 0) {
            return '{}';
        }

        const nextIndent = INDENT.repeat(indentLevel + 1);
        const currentIndent = INDENT.repeat(indentLevel);
        return `{\n${entries
            .map(([key, entryValue]) => `${nextIndent}${formatKey(key)}: ${formatJsValue(entryValue, indentLevel + 1)}`)
            .join(',\n')}\n${currentIndent}}`;
    }

    if (typeof value === 'string') {
        return formatString(value);
    }

    return String(value);
};

const formatJsModuleExport = (value) => `export default ${formatJsValue(value, 0)};\n`;

try {
    const { colors, ...atomicTokens } = tokens;

    // Generate CSS variables for the light theme
    let jsVariables = {};
    const { cssVariables: lightThemeCss, jsVariables: lightThemeJSTokens } = generateCSSTokens('light');
    jsVariables = { ...jsVariables, ...lightThemeJSTokens };

    // Generate CSS variables for the dark theme
    const { cssVariables: darkThemeCss, jsVariables: darkThemeJSTokens } = generateCSSTokens('dark');
    jsVariables = { ...jsVariables, ...darkThemeJSTokens };

    // Generate accent colors css
    const accentTokens = generateAccentTokens('light');
    const { cssVariables: atomicCss, darkCssVariables: atomicDarkCss, jsVariables: atomicJSTokens } = generateAtomicTokens(atomicTokens);

    // Combine light and dark theme CSS
    const combinedCss = `
    :root {
      ${lightThemeCss}
      ${atomicCss}
    }

    ${accentTokens}

    [data-rad-ui-theme="dark"] {
      ${darkThemeCss}
      ${atomicDarkCss}
    }
  `;

    // Save the CSS to a file
    const cssFilePath = path.resolve('styles', 'cssTokens', 'base.tokens.css');
    fs.writeFileSync(cssFilePath, combinedCss, 'utf-8');
    console.log('CSS file saved as base.tokens.css');

    // Write the JS variables to js files
    const colorJsFilePath = path.resolve('styles', 'jsTokens', 'colors.tokens.js');
    fs.writeFileSync(colorJsFilePath, formatJsModuleExport(jsVariables), 'utf-8');
    console.log('JS file saved as colors.tokens.js');

    const atomicJsFilePath = path.resolve('styles', 'jsTokens', 'atomic.tokens.js');
    fs.writeFileSync(atomicJsFilePath, formatJsModuleExport(atomicJSTokens), 'utf-8');
    console.log('JS file saved as atomic.tokens.js');
} catch (error) {
    console.error('An error occurred:', error);
}
