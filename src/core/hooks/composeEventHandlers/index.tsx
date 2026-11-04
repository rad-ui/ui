/**
 * Composes a consumer's handler with ours. This is the single rule for merging
 * handlers in Rad UI (`mergeProps` and `asChild` use it too):
 *
 * - the consumer's handler runs first;
 * - ours is skipped when the consumer called `event.preventDefault()`
 *   (unless `checkForDefaultPrevented` is false);
 * - every argument is forwarded, so callbacks like `onValueChange(value, details)`
 *   compose the same way as DOM events.
 */
// Bivariant parameters, like React's own handler types, so a handler for a narrower
// element type (KeyboardEvent<HTMLButtonElement>) composes with a generic one.
type Handler<E, A extends unknown[]> = { bivarianceHack(event: E, ...rest: A): unknown }['bivarianceHack'];

const composeEventHandlers = <E, A extends unknown[] = []>(
    originalEventHandler?: Handler<E, A> | null,
    ourEventHandler?: Handler<E, A> | null,
    { checkForDefaultPrevented = true } = {}
) => {
    return function handleEvent(event: E, ...rest: A) {
        originalEventHandler?.(event, ...rest);
        const prevented = typeof event === 'object' && event !== null &&
            (event as { defaultPrevented?: unknown }).defaultPrevented === true;
        if (checkForDefaultPrevented === false || !prevented) {
            return ourEventHandler?.(event, ...rest);
        }
    };
};

export default composeEventHandlers;
