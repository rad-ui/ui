import colors from '../../src/colors/index.js';
const COLOR_PREFIX = '--rad-ui-color-';

let accentColor = colors.tomato;
let jsVariables = {};
const generateAccentTokens = (theme) => {
    let cssVariables = [];
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
    cssVariables= cssVariables.join("\n");

    return {cssVariables, jsVariables}
}


export default generateAccentTokens;