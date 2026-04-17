const grid = {
    columns: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        6: '6',
        12: '12',
        24: '24'
    },
    gutter: {
        none: '0',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem'
    },
    container: {
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem'
    }
} as const;

export default grid;
