import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import NumberFieldContext, { getStepType } from '../contexts/NumberFieldContext';
import clsx from 'clsx';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { formatNumber, parseFormattedNumber } from '../utils/numberFormat';
import FieldContext from '~/components/ui/Field/contexts/FieldContext';
import { mergeRefs } from '~/core/utils/mergeRefs';

export type NumberFieldInputElement = ElementRef<'input'>;
export type NumberFieldInputProps = ComponentPropsWithoutRef<'input'>;

const NumberFieldInput = forwardRef<NumberFieldInputElement, NumberFieldInputProps>(({ className, onKeyDown, onChange, onBlur, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    const context = useContext(NumberFieldContext);
    // With `format`, the text the user is typing, shown until they leave the field.
    const [draft, setDraft] = React.useState<string | null>(null);
    const field = useContext(FieldContext);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const mergedRef = React.useMemo(() => mergeRefs(ref, inputRef), [ref]);
    const handleStepRef = React.useRef(context?.handleStep);
    handleStepRef.current = context?.handleStep;
    const wheelEnabled = Boolean(context?.allowWheelScrub);

    // The wheel steps the value only while the input is focused, so scrolling the
    // page past it doesn't change anything. A non-passive listener can stop the
    // page from scrolling at the same time.
    React.useEffect(() => {
        const input = inputRef.current;
        if (!input || !wheelEnabled) return;
        const handleWheel = (event: WheelEvent) => {
            if (document.activeElement !== input || event.deltaY === 0) return;
            event.preventDefault();
            handleStepRef.current?.({ direction: event.deltaY < 0 ? 'increment' : 'decrement', type: event.shiftKey ? 'large' : 'small' });
        };
        input.addEventListener('wheel', handleWheel, { passive: false });
        return () => input.removeEventListener('wheel', handleWheel);
    }, [wheelEnabled]);
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
        rootClass,
        format,
        locale,
        allowWheelScrub
    } = context;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        // Keys that change the value show the newly formatted value.
        if (format && [KEYBOARD_KEYS.ARROW_UP, KEYBOARD_KEYS.ARROW_DOWN, 'PageUp', 'PageDown', 'Home', 'End', 'Enter'].includes(event.key)) {
            setDraft(null);
        }

        switch (event.key) {
        case KEYBOARD_KEYS.ARROW_UP:
            event.preventDefault();
            handleStep({ direction: 'increment', type: getStepType(event) });
            break;
        case KEYBOARD_KEYS.ARROW_DOWN:
            event.preventDefault();
            handleStep({ direction: 'decrement', type: getStepType(event) });
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

    const sharedAttributes = {
        'aria-invalid': ariaInvalid ?? (invalid ? true : undefined),
        'aria-describedby': [props['aria-describedby'], field?.describedBy].filter(Boolean).join(' ') || undefined,
        'data-slot': 'number-field-input',
        'data-disabled': disabled ? '' : undefined,
        'data-readonly': readOnly ? '' : undefined,
        'data-required': required ? '' : undefined,
        'data-invalid': invalid ? '' : undefined,
        className: clsx(rootClass && `${rootClass}-input`, className)
    };

    if (format) {
        const formatted = formatNumber(inputValue, locale, format);
        return (
            <>
                <input
                    ref={mergedRef}
                    type="text"
                    role="spinbutton"
                    inputMode={format.maximumFractionDigits === 0 ? 'numeric' : 'decimal'}
                    autoComplete="off"
                    id={id}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    aria-valuenow={inputValue === '' ? undefined : inputValue}
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuetext={formatted || undefined}
                    {...props}
                    {...sharedAttributes}
                    value={draft ?? formatted}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => {
                        onChange?.(event);
                        const text = event.target.value;
                        setDraft(text);
                        const parsed = parseFormattedNumber(text, locale, format);
                        if (parsed !== null) handleOnChange(parsed);
                    }}
                    onBlur={(event) => {
                        commitValue();
                        setDraft(null);
                        onBlur?.(event);
                    }}
                />
                {/* The visible text is formatted; forms submit the plain number. */}
                {name && <input type="hidden" name={name} value={inputValue} disabled={disabled} />}
            </>
        );
    }

    return (
        <input
            ref={mergedRef}
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
            aria-describedby={[props['aria-describedby'], field?.describedBy].filter(Boolean).join(' ') || undefined}
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
