import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';

export type NumberFieldIncrementElement = ElementRef<'button'>;
export type NumberFieldIncrementProps = ComponentPropsWithoutRef<'button'>;

const NumberFieldIncrement = forwardRef<NumberFieldIncrementElement, NumberFieldIncrementProps>(({ children, className, ...props }, ref) => {
    const context = useContext(NumberFieldContext);
    if (!context) {
        console.error('NumberFieldIncrement must be used within a NumberField');
        return null;
    }
    const { handleStep, rootClass, disabled, readOnly } = context;

    return (
        <button
            ref={ref}
            onClick={() => handleStep({ direction: 'increment', type: 'small' })}
            className={clsx(`${rootClass}-increment`, className)}
            disabled={disabled || readOnly}
            type="button"
            {...props}>
            {children}
        </button>
    );
});

NumberFieldIncrement.displayName = 'NumberFieldIncrement';

export default NumberFieldIncrement;
