import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';
import { useStepperButton } from './useStepperButton';

export type NumberFieldDecrementElement = ElementRef<'button'>;
export type NumberFieldDecrementProps = ComponentPropsWithoutRef<'button'>;

const NumberFieldDecrement = forwardRef<NumberFieldDecrementElement, NumberFieldDecrementProps>(({ children, className, onMouseDown, onPointerDown, onPointerLeave, onClick, disabled: disabledProp, ...props }, ref) => {
    const context = useContext(NumberFieldContext);
    const enabled = !!context && !disabledProp && context.canDecrement;
    const stepper = useStepperButton('decrement', context ? context.handleStep : () => false, enabled);
    if (!context) {
        console.error('NumberFieldDecrement must be used within a NumberField');
        return null;
    }
    const { rootClass } = context;
    const isDisabled = !enabled;

    return (
        <button
            ref={ref}
            type="button"
            className={clsx(rootClass && `${rootClass}-decrement`, className)}
            disabled={isDisabled}
            {...props}
            data-slot="number-field-decrement"
            data-disabled={isDisabled ? '' : undefined}
            tabIndex={-1}
            onPointerDown={(event) => {
                onPointerDown?.(event);
                if (!event.defaultPrevented) stepper.onPointerDown(event);
            }}
            onPointerLeave={(event) => {
                onPointerLeave?.(event);
                stepper.onPointerLeave();
            }}
            onClick={(event) => {
                onClick?.(event);
                if (!event.defaultPrevented) stepper.onClick(event);
            }}
            onMouseDown={(event) => {
                onMouseDown?.(event);
                // Keep focus on the input while using the stepper buttons.
                if (!event.defaultPrevented) {
                    event.preventDefault();
                }
            }}>
            {children}
        </button>
    );
});

NumberFieldDecrement.displayName = 'NumberFieldDecrement';

export default NumberFieldDecrement;
