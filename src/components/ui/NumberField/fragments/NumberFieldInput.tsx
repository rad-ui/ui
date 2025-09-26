import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';

export type NumberFieldInputElement = ElementRef<'input'>;
export type NumberFieldInputProps = ComponentPropsWithoutRef<'input'>;

const NumberFieldInput = forwardRef<NumberFieldInputElement, NumberFieldInputProps>(({ className, ...props }, ref) => {
    const context = useContext(NumberFieldContext);
    if (!context) {
        console.error('NumberFieldInput must be used within a NumberField');
        return null;
    }
    const {
        inputValue,
        handleOnChange,
        handleStep,
        id,
        name,
        disabled,
        readOnly,
        required,
        locale,
        rootClass
    } = context;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowUp' && !event.shiftKey) {
            event.preventDefault();
            handleStep({ direction: 'increment', type: 'normal' });
        }
        if (event.key === 'ArrowDown' && !event.shiftKey) {
            event.preventDefault();
            handleStep({ direction: 'decrement', type: 'normal' });
        }
        if (event.key === 'ArrowUp' && event.shiftKey) {
            event.preventDefault();
            handleStep({ direction: 'increment', type: 'large' });
        }
        if (event.key === 'ArrowDown' && event.shiftKey) {
            event.preventDefault();
            handleStep({ direction: 'decrement', type: 'large' });
        }
        if (event.key === 'ArrowUp' && event.altKey) {
            event.preventDefault();
            handleStep({ direction: 'increment', type: 'small' });
        }
        if (event.key === 'ArrowDown' && event.altKey) {
            event.preventDefault();
            handleStep({ direction: 'decrement', type: 'small' });
        }
    };
    return (
        <input
            ref={ref}
            type="number"
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={(e) => { const val = e.target.value; handleOnChange(val === '' ? '' : Number(val)); }}
            id={id}
            name={name}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={clsx(`${rootClass}-input`, className)}
            {...props}/>
    );
});

NumberFieldInput.displayName = 'NumberFieldInput';

export default NumberFieldInput;
