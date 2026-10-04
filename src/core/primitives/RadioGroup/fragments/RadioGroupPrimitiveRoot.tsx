import React from 'react';
import Primitive from '../../Primitive';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';

export type RadioGroupPrimitiveRootElement = React.ElementRef<typeof Primitive.div>;

export type RadioGroupPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    dir?: 'ltr' | 'rtl';
};

const NAVIGATION_KEYS: string[] = [
    KEYBOARD_KEYS.ARROW_UP,
    KEYBOARD_KEYS.ARROW_DOWN,
    KEYBOARD_KEYS.ARROW_LEFT,
    KEYBOARD_KEYS.ARROW_RIGHT,
    KEYBOARD_KEYS.HOME,
    KEYBOARD_KEYS.END
];

const visuallyHiddenInputStyle: React.CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
    pointerEvents: 'none',
    margin: 0
};

const RadioGroupPrimitiveRoot = React.forwardRef<RadioGroupPrimitiveRootElement, RadioGroupPrimitiveRootProps>(
    ({ value, defaultValue = '', onValueChange, children, disabled: groupDisabled = false, required = false, name = '', orientation = 'horizontal', loop = true, dir = 'ltr', onKeyDownCapture, onKeyUpCapture, ...props }, ref) => {
        const [selectedValue, setSelectedValue] = useControllableState(
            value,
            defaultValue,
            onValueChange
        );
        const isNavigatingWithKeyboardRef = React.useRef(false);
        const formInputRef = React.useRef<HTMLInputElement>(null);
        const defaultValueRef = React.useRef(defaultValue);

        // Native radios return to their default selection when their form resets.
        React.useEffect(() => {
            const form = formInputRef.current?.form;
            if (!form) return;
            const handleReset = () => setSelectedValue(defaultValueRef.current);
            form.addEventListener('reset', handleReset);
            return () => form.removeEventListener('reset', handleReset);
        }, [setSelectedValue, name, required]);

        const sendItems = {
            selectedValue,
            setSelectedValue,
            groupDisabled,
            isNavigatingWithKeyboardRef
        };

        const isEmpty = selectedValue === '' || selectedValue == null;

        return (
            <Primitive.div
                ref={ref}
                {...props}
                onKeyDownCapture={composeEventHandlers(onKeyDownCapture, (event: React.KeyboardEvent<HTMLDivElement>) => {
                    isNavigatingWithKeyboardRef.current = NAVIGATION_KEYS.includes(event.key);
                }, { checkForDefaultPrevented: false })}
                onKeyUpCapture={composeEventHandlers(onKeyUpCapture, () => {
                    isNavigatingWithKeyboardRef.current = false;
                }, { checkForDefaultPrevented: false })}
                aria-required={required}
                role='radiogroup'
                aria-orientation={orientation === 'both' ? undefined : orientation}
                aria-disabled={groupDisabled}
                data-disabled={groupDisabled ? '' : undefined}
            >
                <RovingFocusGroup.Root dir={dir} orientation={orientation} loop={loop} asChild>
                    <RadioGroupContext.Provider value={sendItems}>
                        <RovingFocusGroup.Group>

                            {children}

                        </RovingFocusGroup.Group>
                    </RadioGroupContext.Provider>
                </RovingFocusGroup.Root>
                {name && (
                    <input
                        ref={formInputRef}
                        type='hidden'
                        name={name}
                        value={selectedValue}
                        disabled={groupDisabled}
                    />
                )}
                {required && (
                    // Unnamed so it never adds a FormData entry; it only exists so native
                    // constraint validation blocks submission while nothing is selected.
                    <input
                        ref={name ? undefined : formInputRef}
                        type='radio'
                        checked={!isEmpty}
                        onChange={() => {}}
                        disabled={groupDisabled}
                        required
                        aria-hidden='true'
                        tabIndex={-1}
                        style={visuallyHiddenInputStyle}
                    />
                )}
            </Primitive.div>
        );
    }
);

RadioGroupPrimitiveRoot.displayName = 'RadioGroupPrimitiveRoot';

export default RadioGroupPrimitiveRoot;
