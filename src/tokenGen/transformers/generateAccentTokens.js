import colors from '~/design-systems/clarity/tokens/colors';
const COLOR_PREFIX = '--rad-ui-color-';

/**
 * This file generates base css files for accent colors like this
 * :where([data-rad-ui-accent-color=purple], [data-color=purple]){
    --rad-ui-color-accent-50: var(--rad-ui-color-purple-50);
    --rad-ui-color-accent-100: var(--rad-ui-color-purple-100);
    ...
}
 */

const generateAccentTokens = (theme) => {
    let accentStyleSheet = '';

    for (const colorObj in colors) {
        const colorName = colorObj;
        const accentColors = colors[colorObj][theme];

        if (!accentColors || typeof accentColors !== 'object' || Array.isArray(accentColors)) {
            continue;
        }

        // Theme uses data-rad-ui-accent-color; components expose the public data-color contract.
        let cssVariableName = `:where([data-rad-ui-accent-color=${colorObj}], [data-color=${colorObj}]){`;
        cssVariableName += '\n';
        for (const [shadeName] of Object.entries(accentColors)) {
            cssVariableName += `${COLOR_PREFIX}accent-${shadeName}: var(${COLOR_PREFIX}${colorName}-${shadeName});`;
            cssVariableName += '\n';
        }

        cssVariableName += '}';
        cssVariableName += '\n';
        accentStyleSheet += cssVariableName;
    }

    return accentStyleSheet;
};

export default generateAccentTokens;
