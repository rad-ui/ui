import colors from '~/design-systems/clarity/tokens/colors';
const COLOR_PREFIX = '--rad-ui-color-';

// Function to generate CSS variables based on the theme
const jsVariables = {};
const isColorRamp = (value) => value && typeof value === 'object' && !Array.isArray(value);

function generateCSSTokens(theme) {
    let cssVariables = [];

    // Loop through the colors
    for (const [colorName, colorShades] of Object.entries(colors)) {
        const themeValue = colorShades[theme];

        if (isColorRamp(themeValue)) {
            for (const [shadeName, shadeValue] of Object.entries(themeValue)) {
                const cssVariableName = `${COLOR_PREFIX}${colorName}-${shadeName}`;
                cssVariables.push(`${cssVariableName}: ${shadeValue};`);

                const jsVariableName = `${colorName}`;
                jsVariables[jsVariableName] = jsVariables[jsVariableName] || {};
                jsVariables[jsVariableName][shadeName] = `var(${cssVariableName})`;
            }

            continue;
        }

        const cssVariableName = `${COLOR_PREFIX}${colorName}`;
        cssVariables.push(`${cssVariableName}: ${themeValue};`);
        jsVariables[colorName] = `var(${cssVariableName})`;
    }

    // Return the CSS variables as a string
    cssVariables = cssVariables.join('\n');

    return { cssVariables, jsVariables };
}

export default generateCSSTokens;
