'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { useOTPFieldContext } from '../contexts/OTPFieldContext';

export type OTPFieldInputElement = ElementRef<typeof Primitive.input>;
export type OTPFieldInputProps = Omit<ComponentPropsWithoutRef<typeof Primitive.input>, 'value' | 'defaultValue' | 'type'>;

/** One character slot. Render one per character, in order. */
const OTPFieldInput = forwardRef<OTPFieldInputElement, OTPFieldInputProps>(({
    className,
    onChange,
    onKeyDown,
    onFocus,
    onPaste,
    'aria-label': ariaLabel,
    ...props
}, ref) => {
    const context = useOTPFieldContext('Input');
    const { rootClass, value, valueRef, length, validationType, type, inputMode, autoComplete, disabled, readOnly, dir, registerInput, indexOf, focusSlot, insertAt, removeAt } = context;
    const elementRef = React.useRef<HTMLInputElement | null>(null);
    const mergedRef = React.useMemo(() => mergeRefs(ref, elementRef), [ref]);
    const [index, setIndex] = React.useState(-1);

    useLayoutEffect(() => {
        const element = elementRef.current;
        if (!element) return;
        const unregister = registerInput(element);
        setIndex(indexOf(element));
        return unregister;
    }, [registerInput, indexOf]);
    // Siblings can mount after this one; recompute the index once they have.
    React.useEffect(() => {
        setIndex(indexOf(elementRef.current));
    });

    const char = index >= 0 ? value[index] ?? '' : '';

    return (
        <Primitive.input
            ref={mergedRef}
            type={type}
            value={char}
            inputMode={inputMode ?? (validationType === 'numeric' ? 'numeric' : 'text')}
            // Only the first slot offers the SMS code, which some browsers insert all at once.
            autoComplete={index === 0 ? autoComplete : 'off'}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            disabled={disabled}
            readOnly={readOnly}
            aria-label={ariaLabel ?? `Character ${index + 1} of ${length}`}
            className={clsx(rootClass && `${rootClass}-input`, className)}
            {...props}
            data-slot="otp-field-input"
            data-index={index}
            data-filled={char ? '' : undefined}
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                onFocus?.(event);
                // Slots fill in order: focusing past the first empty one moves there.
                const filled = valueRef.current.length;
                if (index > filled) {
                    focusSlot(filled);
                    return;
                }
                event.currentTarget.select();
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange?.(event);
                const raw = event.currentTarget.value;
                if (!raw) {
                    removeAt(index);
                    return;
                }
                // A typed character arrives next to the existing one.
                const typed = char && raw.startsWith(char) ? raw.slice(char.length) : char && raw.endsWith(char) ? raw.slice(0, -char.length) : raw;
                // Writes overwrite slots, so a full code pasted or autofilled here spreads forward.
                insertAt(index, typed);
            }}
            onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
                onPaste?.(event);
                if (event.defaultPrevented) return;
                event.preventDefault();
                insertAt(index, event.clipboardData.getData('text'));
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                onKeyDown?.(event);
                if (event.defaultPrevented) return;
                switch (event.key) {
                case 'Backspace':
                    event.preventDefault();
                    if (char) {
                        removeAt(index);
                    } else if (index > 0) {
                        removeAt(index - 1);
                        focusSlot(index - 1);
                    }
                    break;
                case 'Delete':
                    event.preventDefault();
                    removeAt(index);
                    break;
                case 'ArrowLeft':
                case 'ArrowRight': {
                    event.preventDefault();
                    // "Previous" is the slot before in reading order: to the left, or to the right in RTL.
                    const back = (event.key === 'ArrowLeft') !== (dir === 'rtl');
                    focusSlot(back ? index - 1 : Math.min(index + 1, valueRef.current.length));
                    break;
                }
                case 'Home':
                    event.preventDefault();
                    focusSlot(0);
                    break;
                case 'End':
                    event.preventDefault();
                    focusSlot(Math.min(valueRef.current.length, length - 1));
                    break;
                }
            }}
        />
    );
});

OTPFieldInput.displayName = 'OTPFieldInput';

export default OTPFieldInput;
