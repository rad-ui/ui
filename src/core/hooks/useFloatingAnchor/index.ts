import * as React from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { FloatingAnchor, resolveAnchor } from '~/core/utils/placement';

/**
 * Keeps a function `anchor` stable across renders, so passing an inline
 * function doesn't re-position on every render.
 */
export const useStableAnchor = (anchor: FloatingAnchor | undefined): FloatingAnchor | undefined => {
    const latest = React.useRef(anchor);
    latest.current = anchor;
    const stable = React.useCallback(() => {
        const current = latest.current;
        return typeof current === 'function' ? current() : null;
    }, []);
    return typeof anchor === 'function' ? stable : anchor;
};

/**
 * Positions the floating element against `anchor` instead of its trigger.
 * Refs and functions are resolved when the anchor changes and each time the
 * popup opens. Removing `anchor` goes back to the trigger.
 */
export const useFloatingAnchor = (
    anchor: FloatingAnchor | undefined,
    setPositionReference: (node: any) => void,
    open: boolean
) => {
    const applied = React.useRef<unknown>(null);
    useLayoutEffect(() => {
        const element = resolveAnchor(anchor) ?? null;
        if (element === applied.current) return;
        setPositionReference(element);
        applied.current = element;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchor, open]);
};
