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

const { styled, createTheme } = createStitches({
    theme: {
        colors: {
            ...gray,
            ...blue,
            ...red,
            ...green,
        },
    },
});

const darkTheme = createTheme({
    colors: {
        ...grayDark,
        ...blueDark,
        ...redDark,
        ...greenDark,
    },
});

export { styled, darkTheme };