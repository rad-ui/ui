import React from 'react';

/**
 * Runs `onReset` after the form returned by `getForm` resets, so a control can return to its
 * default value the way a native input does.
 *
 * The form's `reset` event is cancelable: a page that calls `event.preventDefault()` (for example
 * through a React `onReset` on the form) keeps every native control as it is. React's handler runs
 * at the root, after this target-phase listener, so `defaultPrevented` is only final once the
 * event has finished dispatching. The restore is therefore deferred to a macrotask, which also
 * runs after the browser has restored the native controls, and skipped for a cancelled reset.
 *
 * `getForm` is read inside the effect, so it may look up refs. `deps` re-runs the lookup, like
 * the dependency list of the `useEffect` it replaces.
 */
export function useFormReset(
    getForm: () => HTMLFormElement | null | undefined,
    onReset: () => void,
    deps: React.DependencyList
) {
    const onResetRef = React.useRef(onReset);
    React.useEffect(() => {
        onResetRef.current = onReset;
    });

    React.useEffect(() => {
        const form = getForm();
        if (!form) return;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const handleReset = (event: Event) => {
            if (timer !== undefined) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
                if (event.defaultPrevented) return;
                onResetRef.current();
            });
        };
        form.addEventListener('reset', handleReset);
        return () => {
            form.removeEventListener('reset', handleReset);
            if (timer !== undefined) clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

export default useFormReset;
