const typography = {
    fontFamily: {
        sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, monospace'
    },
    fontSize: {
        1: '0.75rem',
        2: '0.875rem',
        3: '1rem',
        4: '1.125rem',
        5: '1.25rem'
    },
    lineHeight: {
        1: '1',
        2: '1.25',
        3: '1.5',
        4: '1.75'
    },
    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
    },
    letterSpacing: {
        tight: '-0.01em',
        normal: '0',
        wide: '0.02em'
    }
} as const;

export default typography;
