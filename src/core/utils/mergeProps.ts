import React from 'react';

// Generic “props object” type. We use this because mergeProps is meant to work with any React props shape.
type AnyProps = Record<string, any>;

// Matches React event handler prop names like onClick, onKeyDown, onPointerMove, etc.
const EVENT_HANDLER_REGEX = /^on[A-Z]/;

/**
 * composeRefs
 * React only accepts one `ref` prop, but components often need multiple refs:
 * internal ref (for focus/measure) + forwarded ref (for consumers) + child ref (asChild/Slot patterns).
 * This returns one callback ref that “fans out” the DOM node to all provided refs.
 */
export const composeRefs = <T>(...refs: Array<React.Ref<T> | undefined>) => {
    // If nobody provided a ref, return undefined so React doesn’t attach a no-op ref.
    if (refs.every(ref => ref == null)) {
        return undefined;
    }

    // React calls callback refs with the node on mount, and with null on unmount.
    // We forward that node to every ref we were given.
    return (node: T) => {
        for (const ref of refs) {
            // Skip empty refs (common when forwardedRef is undefined).
            if (!ref) continue;

            // Support function refs: ref(node)
            if (typeof ref === 'function') ref(node);
            // Support object refs: ref.current = node
            else (ref as React.MutableRefObject<T | null>).current = node;
        }
    };
};

/**
 * mergeProps
 * Used in Slot / asChild patterns where a wrapper component injects props into a child element.
 * A naive {...slotProps, ...childProps} overwrites handlers/styles/classes, so we merge “smartly”.
 *
 * Rules:
 * - Child props win by default (spread order).
 * - Event handlers are composed: child runs first; if it calls preventDefault, slot handler is skipped.
 * - className is concatenated (slot + child).
 * - style objects are shallow-merged (child overrides conflicts).
 */
export const mergeProps = <T extends AnyProps, U extends AnyProps>(slotProps: T, childProps: U): T & U => {
    // Start with a simple merge where childProps override slotProps by default.
    const mergedProps: AnyProps = { ...slotProps, ...childProps };

    // We iterate child props because those are the ones that would otherwise overwrite slot props.
    for (const propName of Object.keys(childProps)) {
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];

        // If both sides define the same event handler (onClick etc), compose them instead of overwriting.
        if (
            EVENT_HANDLER_REGEX.test(propName) &&
            typeof slotPropValue === 'function' &&
            typeof childPropValue === 'function'
        ) {
            mergedProps[propName] = (...args: unknown[]) => {
                // Run the child handler first so the child has priority.
                childPropValue(...args);

                // If child calls event.preventDefault(), treat it as “cancel parent behavior”.
                const event = args[0] as { defaultPrevented?: boolean } | undefined;
                if (!event || event.defaultPrevented !== true) {
                    slotPropValue(...args);
                }
            };
            continue;
        }

        // Merge className by concatenating so both slot styling and child styling apply.
        // Child classes come later, so they tend to win in CSS conflicts.
        if (propName === 'className' && slotPropValue && childPropValue) {
            mergedProps[propName] = `${slotPropValue} ${childPropValue}`;
            continue;
        }

        // Merge style objects so we don’t lose either side’s inline styles.
        // Child styles spread last, so child overrides conflicts.
        if (propName === 'style' && slotPropValue && childPropValue) {
            mergedProps[propName] = { ...slotPropValue, ...childPropValue };
        }
    }

    // Cast back to T & U so callers get a typed “combined props” result.
    return mergedProps as T & U;
};
