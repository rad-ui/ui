import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * A hook for managing controlled and uncontrolled state
 *
 * This hook handles the common pattern of having a component that can be either
 * controlled (where the state is managed by the parent component) or uncontrolled
 * (where the state is managed internally by the component).
 *
 * @param controlledValue - The value provided by the parent (controlled mode)
 * @param defaultValue - The initial value to use in uncontrolled mode
 * @param onChange - Optional callback when the value changes
 * @returns [value, setValue] - Current value and setter function
 */
export function useControllableState<T>(
    controlledValue: T | undefined,
    defaultValue: T,
    onChange?: (value: T) => void
): [T, (newValue: T | ((prevValue: T) => T)) => void] {
    const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    const previousIsControlled = useRef(isControlled);
    const previousControlledValue = useRef(controlledValue);

    // Warn if component switches from controlled to uncontrolled or vice versa
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            if (previousIsControlled.current !== isControlled) {
                console.warn(
                    `Component changed from ${
                        previousIsControlled.current ? 'controlled' : 'uncontrolled'
                    } to ${isControlled ? 'controlled' : 'uncontrolled'}.`
                );
            }
            previousIsControlled.current = isControlled;
        }
    }, [isControlled]);

    // Warn if controlled value changes without onChange handler
    useEffect(() => {
        if (
            process.env.NODE_ENV !== 'production' &&
      isControlled &&
      !onChange &&
      controlledValue !== previousControlledValue.current
        ) {
            console.warn(
                'A component is changing a controlled value without an onChange handler. ' +
          'This will render a controlled component as uncontrolled.'
            );
        }
        previousControlledValue.current = controlledValue;
    }, [controlledValue, isControlled, onChange]);

    const setValue = useCallback(
        (newValueOrUpdater: T | ((prevValue: T) => T)) => {
            // Get the new value
            const newValue =
        typeof newValueOrUpdater === 'function'
            ? (newValueOrUpdater as (prevValue: T) => T)(value)
            : newValueOrUpdater;

            // In uncontrolled mode, update internal state
            if (!isControlled) {
                setUncontrolledValue(newValue);
            }

            // Call the onChange callback if provided
            if (onChange) {
                onChange(newValue);
            }
        },
        [isControlled, onChange, value]
    );

    return [value, setValue];
}

export default useControllableState;
