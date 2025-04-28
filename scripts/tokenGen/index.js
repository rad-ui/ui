import fs from 'fs';
import path from 'path';

import generateCSSTokens from './generateCSSTokens.js';
import generateAccentTokens from './generateAccentTokens.js';

try {
    // Generate CSS variables for the light theme
    let jsVariables = {};
    const { cssVariables: lightThemeCss, jsVariables: lightThemeJSTokens } = generateCSSTokens('light');
    jsVariables = { ...jsVariables, ...lightThemeJSTokens };

    // Generate CSS variables for the dark theme
    const { cssVariables: darkThemeCss, jsVariables: darkThemeJSTokens } = generateCSSTokens('dark');
    jsVariables = { ...jsVariables, ...darkThemeJSTokens };

    // Generate accent colors css
    const accentTokens = generateAccentTokens('light');

    // Combine light and dark theme CSS
    const combinedCss = `
    :root {
      ${lightThemeCss}
    }

    ${accentTokens}

    [data-rad-ui-theme="dark"] {
      ${darkThemeCss}
    }
  `;

    // Save the CSS to a file
    const cssFilePath = path.resolve('styles', 'cssTokens', 'base.tokens.css');
    fs.writeFileSync(cssFilePath, combinedCss, 'utf-8');
    console.log('CSS file saved as base.tokens.css');

    // Write the JS variables to a js file
    const jsFilePath = path.resolve('styles', 'jsTokens', 'colors.tokens.js');
    fs.writeFileSync(jsFilePath, `export default ${JSON.stringify(jsVariables, null, 2)}`, 'utf-8');
    console.log('JS file saved as colors.tokens.js');
} catch (error) {
    console.error('An error occurred:', error);
}
