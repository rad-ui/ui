import fs from 'fs';
import path from 'path';

import tokens from '~/design-systems/clarity/tokens';
import generateCSSTokens from './transformers/generateCSSTokens.js';
import generateAccentTokens from './transformers/generateAccentTokens.js';
import generateAtomicTokens from './transformers/generateAtomicTokens.js';

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
    fs.writeFileSync(colorJsFilePath, `export default ${JSON.stringify(jsVariables, null, 2)}`, 'utf-8');
    console.log('JS file saved as colors.tokens.js');

    const atomicJsFilePath = path.resolve('styles', 'jsTokens', 'atomic.tokens.js');
    fs.writeFileSync(atomicJsFilePath, `export default ${JSON.stringify(atomicJSTokens, null, 2)}`, 'utf-8');
    console.log('JS file saved as atomic.tokens.js');
} catch (error) {
    console.error('An error occurred:', error);
}
