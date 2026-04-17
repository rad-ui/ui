type EventHandler<E = React.SyntheticEvent> = (event: E) => void;

// From Radix UI - packages/core/primitive/src/primitive.tsx

const composeEventHandlers = <E extends React.SyntheticEvent>(
    originalEventHandler?: EventHandler<E>,
    ourEventHandler?: EventHandler<E>,
    { checkForDefaultPrevented = true } = {}
) => {
    // Returns a function that handles the event
    return function handleEvent(event: E) {
        // Call the original handler if it exists
        originalEventHandler?.(event);

        // Only call our handler if default hasn't been prevented
        if (checkForDefaultPrevented === false || !event.defaultPrevented) {
            return ourEventHandler?.(event);
        }
    };
};

export default composeEventHandlers;
