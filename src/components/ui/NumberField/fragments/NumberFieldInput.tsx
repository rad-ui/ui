import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';

export type NumberFieldInputElement = ElementRef<'input'>;
export type NumberFieldInputProps = ComponentPropsWithoutRef<'input'>;

const NumberFieldInput = forwardRef<NumberFieldInputElement, NumberFieldInputProps>(({ className, onKeyDown, onChange, onBlur, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    const context = useContext(NumberFieldContext);
    if (!context) {
        console.error('NumberFieldInput must be used within a NumberField');
        return null;
    }
    const {
        inputValue,
        handleOnChange,
        handleStep,
        commitValue,
        setToBound,
        id,
        name,
        min,
        max,
        step,
        disabled,
        readOnly,
        required,
        invalid,
        rootClass
    } = context;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;

        switch (event.key) {
        case KEYBOARD_KEYS.ARROW_UP:
            event.preventDefault();
            handleStep({ direction: 'increment', type: event.shiftKey ? 'large' : 'small' });
            break;
        case KEYBOARD_KEYS.ARROW_DOWN:
            event.preventDefault();
            handleStep({ direction: 'decrement', type: event.shiftKey ? 'large' : 'small' });
            break;
        case 'PageUp':
            event.preventDefault();
            handleStep({ direction: 'increment', type: 'large' });
            break;
        case 'PageDown':
            event.preventDefault();
            handleStep({ direction: 'decrement', type: 'large' });
            break;
        case 'Home':
            if (min !== undefined) {
                event.preventDefault();
                setToBound('min');
            }
            break;
        case 'End':
            if (max !== undefined) {
                event.preventDefault();
                setToBound('max');
            }
            break;
        case 'Enter':
            // Clamp before an implicit form submission; do not prevent submission.
            commitValue();
            break;
        }
    };

    return (
        <input
            ref={ref}
            type="number"
            id={id}
            name={name}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            {...props}
            aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
            data-slot="number-field-input"
            data-disabled={disabled ? '' : undefined}
            data-readonly={readOnly ? '' : undefined}
            data-required={required ? '' : undefined}
            data-invalid={invalid ? '' : undefined}
            value={inputValue === '' ? '' : inputValue}
            onKeyDown={handleKeyDown}
            onChange={(event) => {
                onChange?.(event);
                const val = event.target.value;
                handleOnChange(val === '' ? '' : Number(val));
            }}
            onBlur={(event) => {
                commitValue();
                onBlur?.(event);
            }}
            className={clsx(rootClass && `${rootClass}-input`, className)}
        />
    );
});

NumberFieldInput.displayName = 'NumberFieldInput';

export default NumberFieldInput;
