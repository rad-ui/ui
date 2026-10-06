// Steps 1.5 and 2.5 are the two dense UI text sizes that the original
// 12/14/16/18/20 scale skipped over. Both were in wide use as literals across
// components, so they are named here rather than left as one-off values.
const fontSize = {
    1: '0.75rem',
    1.5: '0.8125rem',
    2: '0.875rem',
    2.5: '0.9375rem',
    3: '1rem',
    4: '1.125rem',
    5: '1.25rem'
} as const;

export default fontSize;
