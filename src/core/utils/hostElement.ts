import type React from 'react';

/**
 * Whether a state-only Root (Dialog, Popover, Tooltip) should render a host `<div>`.
 *
 * A Root holds state and renders no element of its own, so it never changes the layout of its parent
 * (a flex `gap`, a `space-y` stack, `:last-child`). It renders a wrapping `<div>` only when it is given
 * something that needs an element: a ref, a className or style, or any other HTML attribute. That keeps
 * existing code that styles or measures a Root working.
 */
export function needsHostElement(ref: React.Ref<unknown> | null | undefined, props: Record<string, unknown>): boolean {
    if (ref) return true;
    return Object.entries(props).some(([key, value]) => {
        if (value === undefined || value === null || value === false) return false;
        if (key === 'data-slot') return false;
        if (key === 'className' || key === 'style') return value !== '';
        return true;
    });
}
