import shadows from './shadows';

const elevation = {
    light: {
        xs: {
            shadow: shadows.light.xs,
            border: 'rgba(0, 0, 0, 0.05)',
            background: 'rgba(255, 255, 255, 0.88)'
        },
        sm: {
            shadow: shadows.light.sm,
            border: 'rgba(0, 0, 0, 0.06)',
            background: 'rgba(255, 255, 255, 0.92)'
        },
        md: {
            shadow: shadows.light.md,
            border: 'rgba(0, 0, 0, 0.08)',
            background: 'rgba(255, 255, 255, 0.96)'
        },
        lg: {
            shadow: shadows.light.lg,
            border: 'rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 1)'
        }
    },
    dark: {
        xs: {
            shadow: shadows.dark.xs,
            border: 'rgba(255, 255, 255, 0.04)',
            background: 'rgba(24, 24, 27, 0.82)'
        },
        sm: {
            shadow: shadows.dark.sm,
            border: 'rgba(255, 255, 255, 0.05)',
            background: 'rgba(28, 28, 32, 0.86)'
        },
        md: {
            shadow: shadows.dark.md,
            border: 'rgba(255, 255, 255, 0.06)',
            background: 'rgba(32, 32, 36, 0.92)'
        },
        lg: {
            shadow: shadows.dark.lg,
            border: 'rgba(255, 255, 255, 0.08)',
            background: 'rgba(36, 36, 40, 0.96)'
        }
    }
} as const;

export default elevation;
