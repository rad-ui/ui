import React, { useContext, useRef, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import NumberFieldContext, { getStepType } from '../contexts/NumberFieldContext';
import Primitive from '~/core/primitives/Primitive';

export type NumberFieldScrubAreaElement = ElementRef<typeof Primitive.span>;
export type NumberFieldScrubAreaProps = ComponentPropsWithoutRef<typeof Primitive.span> & {
    /** Which pointer movement changes the value. Up and right increment. Defaults to `'horizontal'`. */
    direction?: 'horizontal' | 'vertical';
    /** Pixels the pointer must travel for each step. Defaults to 2. */
    pixelSensitivity?: number;
};

/**
 * Drag over this area (often the field's label) to change the value, like the
 * scrubbable inputs in design tools. Holding Shift uses `largeStep`.
 */
const NumberFieldScrubArea = forwardRef<NumberFieldScrubAreaElement, NumberFieldScrubAreaProps>(({
    children,
    className,
    direction = 'horizontal',
    pixelSensitivity = 2,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    ...props
}, ref) => {
    const context = useContext(NumberFieldContext);
    const [scrubbing, setScrubbing] = useState(false);
    const lastPointRef = useRef<number | null>(null);
    const remainderRef = useRef(0);

    if (!context) {
        console.error('NumberFieldScrubArea must be used within a NumberField');
        return null;
    }
    const { rootClass, handleStep, disabled, readOnly, notifyCommit } = context;
    const sensitivity = pixelSensitivity > 0 ? pixelSensitivity : 2;
    const pointFor = (event: React.PointerEvent) => direction === 'vertical' ? event.clientY : event.clientX;

    const stop = (event: React.PointerEvent) => {
        if (!scrubbing) return;
        setScrubbing(false);
        notifyCommit();
        lastPointRef.current = null;
        remainderRef.current = 0;
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    return (
        <Primitive.span
            ref={ref}
            className={clsx(rootClass && `${rootClass}-scrub-area`, className)}
            {...props}
            data-slot="number-field-scrub-area"
            data-direction={direction}
            data-scrubbing={scrubbing ? '' : undefined}
            data-disabled={disabled ? '' : undefined}
            onPointerDown={(event) => {
                onPointerDown?.(event);
                if (event.defaultPrevented || disabled || readOnly || event.button !== 0) return;
                // Stop the drag from selecting text.
                event.preventDefault();
                event.currentTarget.setPointerCapture?.(event.pointerId);
                lastPointRef.current = pointFor(event);
                remainderRef.current = 0;
                setScrubbing(true);
            }}
            onPointerMove={(event) => {
                onPointerMove?.(event);
                const last = lastPointRef.current;
                if (!scrubbing || last === null) return;
                const point = pointFor(event);
                lastPointRef.current = point;
                // Screen y grows downward, so moving up increments.
                const delta = direction === 'vertical' ? last - point : point - last;
                remainderRef.current += delta;
                const steps = Math.trunc(remainderRef.current / sensitivity);
                if (steps === 0) return;
                remainderRef.current -= steps * sensitivity;
                const type = getStepType(event);
                const stepDirection = steps > 0 ? 'increment' : 'decrement';
                for (let i = 0; i < Math.abs(steps); i++) {
                    if (!handleStep({ direction: stepDirection, type })) break;
                }
            }}
            onPointerUp={(event) => {
                onPointerUp?.(event);
                stop(event);
            }}
            onPointerCancel={(event) => {
                onPointerCancel?.(event);
                stop(event);
            }}
        >
            {children}
        </Primitive.span>
    );
});

NumberFieldScrubArea.displayName = 'NumberFieldScrubArea';

export default NumberFieldScrubArea;
