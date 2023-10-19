import fs from "fs"

import colors from '../../src/colors/index.js';

import generateCSSTokens from "./generateCSSTokens.js"
import generateAccentTokens from "./generateAccentTokens.js"

// Generate CSS variables for the light theme

let jsVariables = {};


const {cssVariables: lightThemeCss, jsVariables:lightThemeJSTokens} = generateCSSTokens("light");
jsVariables = {...jsVariables, ...lightThemeJSTokens}



// Generate CSS variables for the dark theme
const {cssVariables: DarkThemeCss, jsVariables:DarkThemeJSTokens} = generateCSSTokens("dark");
jsVariables = {...jsVariables, ...DarkThemeJSTokens}

// Generate accent colors css

const accentTokens= generateAccentTokens("light");


// Combine light and dark theme CSS
const combinedCss = `
  :root {
    ${lightThemeCss}
   
  }

  ${accentTokens}

  .rad-ui-dark-theme {
    ${DarkThemeCss}
  }
`;

// Save the CSS to a file
fs.writeFileSync('styles/cssTokens/base.tokens.css', combinedCss, 'utf-8');

// write the JS variables to a js file
// format json
jsVariables = JSON.stringify(jsVariables);
fs.writeFileSync('styles/jsTokens/base.tokens.js', `export default ${jsVariables}`, 'utf-8');

console.log('CSS file saved as theme.css');
