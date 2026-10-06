import React from 'react';

// Generic “props object” type. We use this because mergeProps is meant to work with any React props shape.
type AnyProps = Record<string, any>;

// Matches React event handler prop names like onClick, onKeyDown, onPointerMove, etc.
const EVENT_HANDLER_REGEX = /^on[A-Z]/;

/**
 * Which of the two places a ref lives on is version dependent, and reading the wrong one
 * logs a warning on either major:
 * - React 18 keeps `ref` off `props` (reading `props.ref` warns) and exposes it as `element.ref`.
 * - React 19 moved `ref` onto `props` and left `element.ref` behind as a deprecation getter
 *   (reading it warns with "Accessing element.ref was removed in React 19").
 * So branch on the major version before touching either one.
 */
const REF_IS_A_PROP = (() => {
    const major = parseInt(React.version, 10);
    return Number.isNaN(major) ? false : major >= 19;
})();

/**
 * composeRefs
 * React only accepts one `ref` prop, but components often need multiple refs:
 * internal ref (for focus/measure) + forwarded ref (for consumers) + child ref (asChild/Slot patterns).
 * This returns one callback ref that “fans out” the DOM node to all provided refs.
 */
export const composeRefs = <T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> | undefined => {
    // If nobody provided a ref, return undefined so React doesn’t attach a no-op ref.
    if (refs.every(ref => ref == null)) {
        return undefined;
    }

    // React 18 has no way to detach a callback ref other than calling it with null,
    // so fan the node out and stop there.
    if (!REF_IS_A_PROP) {
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
    }

    // React 19 additionally lets a callback ref return a teardown function, which React then
    // calls *instead of* invoking the ref with null. A composed ref that returns nothing would
    // swallow every teardown an inner ref registered, so retain them and replay them on detach.
    return (node: T) => {
        // Indexed by ref so a teardown stays paired with the ref that produced it.
        const teardowns = refs.map<(() => void) | null>(() => null);

        refs.forEach((ref, index) => {
            if (!ref) return;

            if (typeof ref === 'function') {
                const teardown = ref(node);
                if (typeof teardown === 'function') teardowns[index] = teardown;
            } else {
                (ref as React.MutableRefObject<T | null>).current = node;
            }
        });

        return () => {
            refs.forEach((ref, index) => {
                if (!ref) return;

                if (typeof ref === 'function') {
                    const teardown = teardowns[index];
                    // Prefer the ref’s own teardown; otherwise do what React would have done.
                    if (teardown) teardown();
                    else ref(null);
                } else {
                    (ref as React.MutableRefObject<T | null>).current = null;
                }
            });
        };
    };
};

/**
 * getElementRef
 * Safely reads the ref a consumer attached to an element on both React 18 and React 19,
 * without triggering either version's warning. Returns undefined for anything that isn't
 * a React element (e.g. a string or an array child), since `asChild` may receive either.
 */
export const getElementRef = (element: unknown): React.Ref<unknown> | undefined => {
    if (!React.isValidElement(element)) return undefined;

    const ref = REF_IS_A_PROP
        ? (element.props as { ref?: React.Ref<unknown> }).ref
        : (element as unknown as { ref?: React.Ref<unknown> }).ref;

    // React 18 stores "no ref" as null, so normalise it away to keep the return type honest.
    return ref ?? undefined;
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
