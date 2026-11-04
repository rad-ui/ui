import type * as React from 'react';

/**
 * Where focus goes when a popup closes: `true` its trigger (default), `false` nowhere,
 * a ref, or a function returning an element (or `true`/`false`), read at close time.
 */
export type FinalFocus = boolean | React.RefObject<HTMLElement | null> | (() => HTMLElement | boolean | null | void);

/** For floating-ui's `returnFocus`: a boolean, or a ref whose `current` is resolved when read. */
export const toReturnFocus = (finalFocus: FinalFocus | undefined, fallback = true): boolean | React.MutableRefObject<HTMLElement | null> => {
    if (finalFocus === undefined) return fallback;
    if (typeof finalFocus === 'boolean') return finalFocus;
    if (typeof finalFocus === 'function') {
        return {
            get current() {
                const result = finalFocus();
                return result instanceof HTMLElement ? result : null;
            },
            set current(_value) {}
        } as React.MutableRefObject<HTMLElement | null>;
    }
    return finalFocus as React.MutableRefObject<HTMLElement | null>;
};

/** Moves focus to `finalFocus` now; returns false when it says to leave focus alone. */
export const focusFinal = (finalFocus: FinalFocus | undefined, trigger: HTMLElement | null | undefined): void => {
    if (finalFocus === false) return;
    if (finalFocus === undefined || finalFocus === true) {
        trigger?.focus();
        return;
    }
    if (typeof finalFocus === 'function') {
        const result = finalFocus();
        if (result === false) return;
        (result instanceof HTMLElement ? result : trigger)?.focus();
        return;
    }
    (finalFocus.current ?? trigger)?.focus();
};
