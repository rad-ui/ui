import colors from '~/design-systems/clarity/tokens/colors';
const COLOR_PREFIX = '--rad-ui-color-';

// Function to generate CSS variables based on the theme
const jsVariables = {};

function generateCSSTokens(theme) {
    let cssVariables = [];

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
    cssVariables = cssVariables.join('\n');

    return { cssVariables, jsVariables };
}

export default generateCSSTokens;
