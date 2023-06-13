import {
    gray,
    blue,
    red,
    green,
    grayDark,
    blueDark,
    redDark,
    greenDark,
} from '@radix-ui/colors';

// Spread the scales in your light and dark themes
import { createStitches } from '@stitches/react';


const myColors = {
    lightTheme: {
        ...gray,
        ...blue,
        ...red,
        ...green,
    },
    darkTheme: {
        ...grayDark,
        ...blueDark,
        ...redDark,
        ...greenDark,
    },
}


const { styled, createTheme } = createStitches({
    theme: {
        colors: myColors.lightTheme
    },
});

const darkTheme = createTheme('dark-theme',{
    colors: myColors.darkTheme,
});

export { styled, darkTheme };