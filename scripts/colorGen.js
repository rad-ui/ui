import fs from "fs"

import colors from '../src/colors/index.js';

const COLOR_PREFIX = '--rad-ui-color-';
let jsVariables = {};

let accentColor = colors.tomato;


// Function to generate CSS variables based on the theme
function generateCssVariables(theme) {
    const cssVariables = [];
   
    
    // Loop through the colors
    for (const [colorName, colorShades] of Object.entries(colors)) {
      // Loop through the shades
      for (const [shadeName, shadeValue] of Object.entries(colorShades[theme])) {
        // Create the CSS variable name
        const cssVariableName = `${COLOR_PREFIX}${colorName}-${shadeName}`;
        // Add the CSS variable to the array
        cssVariables.push(`${cssVariableName}: ${shadeValue};`);

        // Create the JS variable name
        const jsVariableName = `${colorName}`;
        // Add the JS variable to the object
        jsVariables[jsVariableName] = jsVariables[jsVariableName] || {};
        jsVariables[jsVariableName][shadeName] = `var(${cssVariableName})`;

      }
    }



    // Return the CSS variables as a string
    return cssVariables.join("\n");
  }


  const generateAccentColors = (theme)=>{
    const cssVariables = [];
    const color = accentColor;

    // Loop through the shades
    for (const [shadeName, shadeValue] of Object.entries(color[theme])) {
      // Create the CSS variable name
      const cssVariableName = `${COLOR_PREFIX}accent-${shadeName}`;
      // Add the CSS variable to the array
      cssVariables.push(`${cssVariableName}: ${shadeValue};`);

      // Create the JS variable name
      const jsVariableName = `accent`;
      // Add the JS variable to the object
      jsVariables[jsVariableName] = jsVariables[jsVariableName] || {};
      jsVariables[jsVariableName][shadeName] = `var(${cssVariableName})`;
    }

    // Return the CSS variables as a string
    return cssVariables.join("\n");
  }

  console.log(generateAccentColors("light"))
  

// Generate CSS variables for the light theme
const lightThemeCss = generateCssVariables("light");

// Generate CSS variables for the dark theme
const darkThemeCss = generateCssVariables("dark");

const accentLightCss = generateAccentColors("light");
const accentDarkCss = generateAccentColors("dark");

// Combine light and dark theme CSS
const combinedCss = `
  :root {
    ${lightThemeCss}
    ${accentLightCss}
  }

  .rad-ui-dark-theme {
    ${darkThemeCss}
    ${accentDarkCss}
  }
`;

// Save the CSS to a file
fs.writeFileSync('styles/cssTokens/base.tokens.css', combinedCss, 'utf-8');

// write the JS variables to a js file
// format json
jsVariables = JSON.stringify(jsVariables);
fs.writeFileSync('styles/jsTokens/base.tokens.js', `export default ${jsVariables}`, 'utf-8');

console.log('CSS file saved as theme.css');
