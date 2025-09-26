import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';

export type NumberFieldDecrementElement = ElementRef<'button'>;
export type NumberFieldDecrementProps = ComponentPropsWithoutRef<'button'>;

const NumberFieldDecrement = forwardRef<NumberFieldDecrementElement, NumberFieldDecrementProps>(({ children, className, ...props }, ref) => {
    const context = useContext(NumberFieldContext);
    if (!context) {
        console.error('NumberFieldDecrement must be used within a NumberField');
        return null;
    }
    const { handleStep, rootClass, disabled, readOnly } = context;
    return (
        <button
            ref={ref}
            onClick={() => handleStep({ direction: 'decrement', type: 'normal' })}
            className={clsx(`${rootClass}-decrement`, className)}
            disabled={disabled || readOnly}
            type="button"
            {...props}>
            {children}
        </button>
    );
});

NumberFieldDecrement.displayName = 'NumberFieldDecrement';

export default NumberFieldDecrement;
