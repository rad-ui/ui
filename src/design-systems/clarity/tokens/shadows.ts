const shadows = {
    light: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 12px rgba(0, 0, 0, 0.08)',
        lg: '0 10px 30px rgba(0, 0, 0, 0.12)'
    },
    dark: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.03)',
        sm: '0 2px 6px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        md: '0 8px 18px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        lg: '0 18px 40px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.06)'
    }
} as const;

export default shadows;
