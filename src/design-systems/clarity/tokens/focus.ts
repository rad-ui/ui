import outlineOffset from './outlineOffset';

const focus = {
    ringWidth: {
        sm: '1px',
        md: '2px',
        lg: '3px'
    },
    ringOffset: outlineOffset,
    ringStyle: {
        solid: 'solid',
        dashed: 'dashed',
        dotted: 'dotted'
    }
} as const;

export default focus;
