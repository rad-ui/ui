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

const DEFAULT_ACCENT = 'gray';

const generateAccentTokens = (theme) => {
    let accentStyleSheet = '';

    // Default accent: a Theme with no accentColor still needs the accent scale
    // defined, or every accent-based border and fill disappears. The named
    // blocks below share this zero specificity and come later in the source,
    // so any explicit accent colour on the same element wins.
    const defaultAccent = colors[DEFAULT_ACCENT]?.[theme];
    if (defaultAccent && typeof defaultAccent === 'object' && !Array.isArray(defaultAccent)) {
        accentStyleSheet += ':where([data-rad-ui-theme]){\n';
        for (const [shadeName] of Object.entries(defaultAccent)) {
            accentStyleSheet += `${COLOR_PREFIX}accent-${shadeName}: var(${COLOR_PREFIX}${DEFAULT_ACCENT}-${shadeName});\n`;
        }
        accentStyleSheet += '}\n';
    }

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
