import React from 'react';
import Primitive from '../../Primitive';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { useDirection } from '~/core/hooks/useDirection';

export type RadioGroupPrimitiveRootElement = React.ElementRef<typeof Primitive.div>;

export type RadioGroupPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    /** Show the selection without letting the user change it. Radios stay focusable. */
    readOnly?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    dir?: 'ltr' | 'rtl';
    /** `id` of a `<form>` elsewhere in the page that the value submits with. */
    form?: string;
    /** Ref to the hidden input that holds the value for forms (rendered with `name`). */
    inputRef?: React.Ref<HTMLInputElement>;
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
    ({ value, defaultValue = '', onValueChange, children, disabled: groupDisabled = false, readOnly = false, required = false, name = '', orientation = 'horizontal', loop = true, dir: dirProp, onKeyDownCapture, onKeyUpCapture, form, inputRef, ...props }, ref) => {
        const dir = useDirection(dirProp) ?? 'ltr';
        const [selectedValue, setSelectedValue] = useControllableState(
            value,
            defaultValue,
            onValueChange
        );
        const isNavigatingWithKeyboardRef = React.useRef(false);
        const formInputRef = React.useRef<HTMLInputElement | null>(null);
        const setNamedInput = React.useCallback((node: HTMLInputElement | null) => {
            formInputRef.current = node;
            if (typeof inputRef === 'function') inputRef(node);
            else if (inputRef) (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }, [inputRef]);
        const defaultValueRef = React.useRef(defaultValue);

        // Native radios return to their default selection when their form resets.
        React.useEffect(() => {
            const owner = formInputRef.current?.form;
            if (!owner) return;
            const handleReset = () => setSelectedValue(defaultValueRef.current);
            owner.addEventListener('reset', handleReset);
            return () => owner.removeEventListener('reset', handleReset);
        }, [setSelectedValue, name, required, form]);

        const sendItems = {
            selectedValue,
            setSelectedValue,
            groupDisabled,
            readOnly,
            isNavigatingWithKeyboardRef
        };

        const isEmpty = selectedValue === '' || selectedValue == null;

        // The roving-focus group merges onto the radiogroup element itself, so the radios are its
        // direct children: no extra wrapper to break the root's grid or flex layout, and no `group`
        // nested inside the `radiogroup` (rad-ui/ui#2336).
        return (
            <RovingFocusGroup.Root dir={dir} orientation="both" loop={loop} asChild>
                {/* Radio groups move with all four arrow keys whatever their visual
                    orientation (WAI-ARIA APG radio pattern). `orientation` still sets
                    aria-orientation below. */}
                <RovingFocusGroup.Group asChild role='radiogroup'>
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
                        aria-readonly={readOnly || undefined}
                        data-readonly={readOnly ? '' : undefined}
                        role='radiogroup'
                        aria-orientation={orientation === 'both' ? undefined : orientation}
                        aria-disabled={groupDisabled}
                        data-disabled={groupDisabled ? '' : undefined}
                    >
                        <RadioGroupContext.Provider value={sendItems}>
                            {children}
                        </RadioGroupContext.Provider>
                {name && (
                    <input
                        ref={setNamedInput}
                        type='hidden'
                        name={name}
                        form={form}
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
                        form={form}
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
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
    }
);

RadioGroupPrimitiveRoot.displayName = 'RadioGroupPrimitiveRoot';

export default RadioGroupPrimitiveRoot;
