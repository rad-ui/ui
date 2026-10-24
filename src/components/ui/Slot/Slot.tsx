'use client';

import React from 'react';
import { composeRefs as composeRefsInternal, getElementRef, mergeProps as mergePropsInternal } from '~/core/utils/mergeProps';

type AnyProps = Record<string, any>;

/**
 * Merges props for building your own components on top of Rad UI. Later
 * objects win, except that `className`s are joined, `style`s are merged and
 * event handlers are chained: the rightmost runs first, and calling
 * `event.preventDefault()` there skips the ones to its left.
 */
export function mergeProps<T extends AnyProps[]>(...propsList: T): AnyProps {
    return propsList.reduce<AnyProps>((merged, next) => (next ? mergePropsInternal(merged, next) : merged), {});
}

/** Combines several refs (callback or object) into one callback ref. */
export const composeRefs = <T, >(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> | undefined => composeRefsInternal(...refs);

export type SlotProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
};

/**
 * Renders its only child and merges its own props and ref onto it, the same
 * way Rad UI parts do with `asChild`.
 */
const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, ...slotProps }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const child = childrenArray[0];
    if (childrenArray.length !== 1 || !React.isValidElement(child) || child.type === React.Fragment) {
        console.warn('Slot requires exactly one child element.');
        return <>{children}</>;
    }
    const mergedRef = composeRefsInternal(ref, getElementRef(child) as React.Ref<HTMLElement>);
    return React.cloneElement(child, {
        ...mergePropsInternal(slotProps, child.props as AnyProps),
        ...(mergedRef ? { ref: mergedRef } : {})
    } as AnyProps);
});

Slot.displayName = 'Slot';

export default Slot;
