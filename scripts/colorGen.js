import fs from "fs"

import colors from '../src/colors/index.js';

// Function to generate CSS variables based on the theme
function generateCssVariables(theme) {
    const cssVariables = [];
    const themeColors = colors.gray[theme];
  
    for (const key in themeColors) {
      const colorName = `gray${key.replace('gray', '')}`;
      const colorValue = themeColors[key];
      cssVariables.push(`--${colorName}: ${colorValue};`);
    }
  
    return cssVariables.join("\n");
  }
  

// Generate CSS variables for the light theme
const lightThemeCss = generateCssVariables("light", "light-");

// Generate CSS variables for the dark theme
const darkThemeCss = generateCssVariables("dark", "dark-");

// Combine light and dark theme CSS
const combinedCss = `
  :root {
    ${lightThemeCss}
  }

  .dark-theme {
    ${darkThemeCss}
  }
`;

// Save the CSS to a file
fs.writeFileSync('scripts/output/theme.css', combinedCss, 'utf-8');

console.log('CSS file saved as theme.css');
