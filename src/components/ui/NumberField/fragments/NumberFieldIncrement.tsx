import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';
import { useStepperButton } from './useStepperButton';

export type NumberFieldIncrementElement = ElementRef<'button'>;
export type NumberFieldIncrementProps = ComponentPropsWithoutRef<'button'>;

const NumberFieldIncrement = forwardRef<NumberFieldIncrementElement, NumberFieldIncrementProps>(({ children, className, onMouseDown, onPointerDown, onPointerLeave, onClick, disabled: disabledProp, ...props }, ref) => {
    const context = useContext(NumberFieldContext);
    const enabled = !!context && !disabledProp && context.canIncrement;
    const stepper = useStepperButton('increment', context ? context.handleStep : () => false, enabled);
    if (!context) {
        console.error('NumberFieldIncrement must be used within a NumberField');
        return null;
    }
    const { rootClass } = context;
    const isDisabled = !enabled;

    return (
        <button
            ref={ref}
            type="button"
            className={clsx(rootClass && `${rootClass}-increment`, className)}
            disabled={isDisabled}
            {...props}
            data-slot="number-field-increment"
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

NumberFieldIncrement.displayName = 'NumberFieldIncrement';

export default NumberFieldIncrement;
