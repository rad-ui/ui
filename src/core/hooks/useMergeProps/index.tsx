import React from 'react';

/**
 * Merge props from a primitive component with those of a single child element.
 *
 * This hook powers the "asChild" pattern where a component forwards its props
 * to a custom element supplied by the consumer. It produces an object where:
 *
 * - Child props override conflicting keys from `elementProps`.
 * - `className` values from parent and child are concatenated.
 * - Refs from both sides are composed into one callback ref.
 *
 * **Usage guidelines**
 * - Use only when forwarding props to exactly one React element.
 * - Ensure the child is a valid React element (not a string or fragment).
 * - This performs a shallow merge; event handlers and other functions are not
 *   composed. For events, consider `composeEventHandlers` instead.
 *
 * **Pitfalls & risks**
 * - Passing multiple children or non-element nodes will throw at runtime.
 * - Because handlers are overwritten, you may unintentionally drop behavior
 *   defined on the primitive or child.
 *
 * @param elementProps - Props supplied by the primitive/component.
 * @param child - The child element being cloned.
 * @param ref - Optional ref from the primitive; merged with the child's ref.
 * @returns Merged props to spread onto the cloned child element.
 */
function useMergeProps<T extends Record<string, any>>(
    elementProps: T,
    child: React.ReactElement,
    ref?: React.Ref<any>
) {
    const childProps = child.props as T;
    const childRef = (child as any).ref;

    const mergedRef = React.useCallback(
        (node: any) => {
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<any>).current = node;

            if (typeof childRef === 'function') childRef(node);
            else if (childRef) (childRef as React.MutableRefObject<any>).current = node;
        },
        [ref, childRef]
    );

    return React.useMemo(() => {
        const finalProps: any = {
            ...elementProps,
            ...childProps,
            ...(ref || childRef ? { ref: mergedRef } : {})
        };

        if (elementProps.className || (childProps as any).className) {
            finalProps.className = [elementProps.className, (childProps as any).className]
                .filter(Boolean)
                .join(' ');
        }

        return finalProps;
    }, [elementProps, childProps, mergedRef, ref, childRef]);
}

export default useMergeProps;
