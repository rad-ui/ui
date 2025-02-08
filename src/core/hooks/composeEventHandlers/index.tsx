type EventHandler<E = React.SyntheticEvent> = (event: E) => void;

function composeEventHandlers<E extends React.SyntheticEvent>(
    originalEventHandler?: EventHandler<E>,
    ourEventHandler?: EventHandler<E>,
    { checkForDefaultPrevented = true } = {}
) {
    // Returns a function that handles the event
    return function handleEvent(event: E) {
        // If the original event handler is defined, call it
        if (typeof originalEventHandler === 'function') {
            originalEventHandler(event);
        }

        // If the default prevented flag is false or the event is not prevented, call our event handler
        if (checkForDefaultPrevented === false || !event.defaultPrevented) {
            return ourEventHandler?.(event);
        }
    };
}

export default composeEventHandlers;
