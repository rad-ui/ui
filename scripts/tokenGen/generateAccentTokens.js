import colors from '../../src/colors/index.js';
const COLOR_PREFIX = '--rad-ui-color-';

/**
 * This file generates base css files for accent colors like this
 * [data-accent-color=purple]{
     --rad-ui-color-accent-50: var(--rad-ui-color-purple-50);
    --rad-ui-color-accent-100: var(--rad-ui-color-purple-100);
    --rad-ui-color-accent-200: var(--rad-ui-color-purple-200);
    --rad-ui-color-accent-300: var(--rad-ui-color-purple-300);
    --rad-ui-color-accent-400: var(--rad-ui-color-purple-400);
    --rad-ui-color-accent-500: var(--rad-ui-color-purple-500);
    --rad-ui-color-accent-600: var(--rad-ui-color-purple-600);
    --rad-ui-color-accent-700: var(--rad-ui-color-purple-700);
    --rad-ui-color-accent-800: var(--rad-ui-color-purple-800);
    --rad-ui-color-accent-900: var(--rad-ui-color-purple-900);
    --rad-ui-color-accent-950: var(--rad-ui-color-purple-950);
    --rad-ui-color-accent-1000: var(--rad-ui-color-purple-1000);
}

 */


let accentColor = colors.red;
let jsVariables = {};
const generateAccentTokens = (theme) => {
    let cssVariables = [];
    const color = accentColor;

    let accentStyleSheet = "";
    
    for(const colorObj in colors){
        
        let colorName = colorObj
        let accentColors = colors[colorObj][theme];
        console.log(accentColors)

        //generate data-accent-color css styles
        let cssVariableName = `[data-accent-color=${colorObj}]{`;
        cssVariableName += `\n`;
        // plug in variables here
        for(const [shadeName, shadeValue] of Object.entries(accentColors)){
            cssVariableName += `${COLOR_PREFIX}accent-${shadeName}: var(${COLOR_PREFIX}${colorName}-${shadeName});`;
            cssVariableName += `\n`;

        }

        // close css variable
        cssVariableName += `}`;
        cssVariableName += `\n`;
        console.log(cssVariableName)
        accentStyleSheet += cssVariableName;



    }

    return accentStyleSheet
}


export default generateAccentTokens;