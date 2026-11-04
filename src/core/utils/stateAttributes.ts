/**
 * Boolean companions for `data-state` values, so styles can target a state with a
 * plain attribute selector (`[data-open]`, `[data-checked]`) or a Tailwind variant
 * (`data-open:`) as well as `[data-state="open"]`.
 */
const STATE_ATTRIBUTES: Record<string, string> = {
    open: 'data-open',
    closed: 'data-closed',
    checked: 'data-checked',
    unchecked: 'data-unchecked',
    indeterminate: 'data-indeterminate',
    on: 'data-pressed',
    complete: 'data-complete',
    dragging: 'data-dragging',
    loading: 'data-loading'
};

/** Adds the boolean attribute for a known `data-state` value, unless it's already set. */
export const withStateAttributes = <P extends Record<string, unknown>>(props: P): P => {
    const state = props['data-state'];
    if (typeof state !== 'string') return props;
    const attribute = STATE_ATTRIBUTES[state];
    if (!attribute || attribute in props) return props;
    return { ...props, [attribute]: '' };
};

/** `data-state` plus its boolean companion, to spread on an element: `{...stateData('open')}`. */
export const stateData = (state: string | undefined): Record<string, string> => {
    if (state === undefined) return {};
    const attribute = STATE_ATTRIBUTES[state];
    return attribute ? { 'data-state': state, [attribute]: '' } : { 'data-state': state };
};
