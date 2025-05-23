const red = {
    light: {
        50: 'oklch(0.99 0.004 15)',
        100: 'oklch(0.98 0.01 16)',
        200: 'oklch(0.97 0.023 16)',
        300: 'oklch(0.94 0.041 16)',
        400: 'oklch(0.91 0.06 16)',
        500: 'oklch(0.87 0.075 16)',
        600: 'oklch(0.81 0.094 15)',
        700: 'oklch(0.75 0.114 15)',
        800: 'oklch(0.61 0.17 14)',
        900: 'oklch(0.56 0.17 14)',
        950: 'oklch(0.5 0.17 14)',
        1000: 'oklch(0.3 0.093 10)'
    },
    dark: {
        50: 'oklch(0.13 0.023 13)',
        100: 'oklch(0.15 0.047 14)',
        200: 'oklch(0.19 0.077 13)',
        300: 'oklch(0.22 0.092 13)',
        400: 'oklch(0.25 0.105 13)',
        500: 'oklch(0.3 0.125 13)',
        600: 'oklch(0.37 0.15 14)',
        700: 'oklch(0.5 0.19 14)',
        800: 'oklch(0.61 0.17 14)',
        900: 'oklch(0.69 0.175 15)',
        950: 'oklch(0.76 0.17 14)',
        1000: 'oklch(0.9 0.058 10)'
    }
} as const;

export default red;
