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

// Tailwind v4 creates utilities from @theme variable namespaces. When a new Rad
// UI token should support a new Tailwind utility class family, add the token
// source and matching Tailwind namespace here after checking Tailwind's theme
// variable namespace docs. Tokens omitted here remain available as Rad UI CSS
// variables, but they will not create Tailwind utility classes.
const TAILWIND_V4_THEME_TOKEN_MAP = [
    { source: 'colors', namespace: 'color' },
    { source: 'fontFamily', namespace: 'font' },
    { source: 'fontSize', namespace: 'text' },
    { source: 'fontWeight', namespace: 'font-weight' },
    { source: 'lineHeight', namespace: 'leading' },
    { source: 'letterSpacing', namespace: 'tracking' },
    { source: 'spacing', namespace: 'spacing' },
    { source: 'radius', namespace: 'radius' },
    { source: 'shadows', namespace: 'shadow' },
    { source: 'blur', namespace: 'blur' },
    { source: 'aspectRatio', namespace: 'aspect' },
    { source: 'easing', namespace: 'ease' }
];

const normalizeTailwindThemeKey = (key) => String(key).replace(/\./g, '-');

const flattenTailwindV4Tokens = (value, pathParts = []) => {
    if (typeof value === 'string') {
        return [[pathParts.map(normalizeTailwindThemeKey).join('-'), value]];
    }

    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return [];
    }

    return Object.entries(value).flatMap(([key, entryValue]) => flattenTailwindV4Tokens(entryValue, [...pathParts, key]));
};

const formatTailwindV4ThemeCss = (colors, atomicTokens) => {
    const tokenSources = {
        colors,
        ...atomicTokens
    };

    const themeVariables = TAILWIND_V4_THEME_TOKEN_MAP.flatMap(({ source, namespace }) => {
        const sourceTokens = tokenSources[source];

        if (!sourceTokens) {
            return [];
        }

        return flattenTailwindV4Tokens(sourceTokens).map(([key, value]) => `    --${namespace}-${key}: ${value};`);
    });

    return `@theme inline {\n${themeVariables.join('\n')}\n}\n`;
};

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

    const tailwindV4FilePath = path.resolve('styles', 'cssTokens', '_tailwind-v4.tokens.scss');
    fs.writeFileSync(tailwindV4FilePath, formatTailwindV4ThemeCss(jsVariables, atomicJSTokens), 'utf-8');
    console.log('Tailwind v4 token partial saved as _tailwind-v4.tokens.scss');
} catch (error) {
    console.error('An error occurred:', error);
}
