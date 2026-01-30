'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'SliderThumb';

export type SliderThumbElement = ElementRef<typeof Primitive.div>;
export type SliderThumbProps = {
    children?: React.ReactNode;
    asChild?: boolean;
    index?: number;
    'aria-label'?: string;
    'aria-labelledby'?: string;
} & ComponentPropsWithoutRef<'div'>;

const SliderThumb = React.memo(forwardRef<SliderThumbElement, SliderThumbProps>(({ children, asChild = false, index = 0, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...props }, ref) => {
    const { rootClass, value, minValue, maxValue, step, setValue, name, isDragging, setDragging, disabled, orientation, pageStepMultiplier, formatValue } = React.useContext(SliderContext);
    // Extract individual value if it's an array
    const rawValue = Array.isArray(value) && index >= 0 && index < value.length
        ? value[index]
        : typeof value === 'number'
            ? value
            : minValue;
    const safeValue = Number.isFinite(rawValue) ? rawValue : minValue;
    const currentValue = Math.min(maxValue, Math.max(minValue, safeValue));
    const percent = maxValue === minValue ? 0 : ((currentValue - minValue) / (maxValue - minValue)) * 100;
    const [focused, setFocused] = React.useState(false);

    const clamp = (val: number) => Math.min(maxValue, Math.max(minValue, val));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        let newValue = currentValue;
        const isRtl = Boolean((e.currentTarget as HTMLElement).closest('[dir="rtl"]'));
        switch (e.key) {
        case 'ArrowRight':
            newValue = isRtl ? currentValue - step : currentValue + step;
            break;
        case 'ArrowLeft':
            newValue = isRtl ? currentValue + step : currentValue - step;
            break;
        case 'ArrowUp':
            newValue = currentValue + step;
            break;
        case 'ArrowDown':
            newValue = currentValue - step;
            break;
        case 'Home':
            newValue = minValue;
            break;
        case 'End':
            newValue = maxValue;
            break;
        case 'PageUp':
            newValue = currentValue + step * pageStepMultiplier;
            break;
        case 'PageDown':
            newValue = currentValue - step * pageStepMultiplier;
            break;
        default:
            return;
        }
        e.preventDefault();
        const clampedValue = clamp(newValue);

        if (Array.isArray(value)) {
            const nextValue = [...value];
            nextValue[index] = clampedValue;
            // Note: We don't sort here on keyboard to avoid thumb hopping,
            // but we might want to prevent crossing depending on design.
            setValue(nextValue);
        } else {
            setValue(clampedValue);
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.currentTarget.focus();
        setDragging(true);
    };

    const handlePointerUp = () => {
        setDragging(false);
    };

    const state = isDragging ? 'dragging' : focused ? 'active' : 'inactive';

    const thumbNode = (
        <Primitive.div
            ref={ref}
            asChild={asChild}
            className={`${rootClass}-thumb`}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-valuenow={currentValue}
            aria-valuetext={formatValue ? formatValue(currentValue) : undefined}
            aria-orientation={orientation}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            data-state={state}
            data-disabled={disabled}
            data-index={index}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={orientation === 'vertical'
                ? { bottom: `calc(${percent}% - 12px)` }
                : { left: `calc(${percent}% - 12px)` }
            }
            {...props}
        >
            {children}
        </Primitive.div>
    );

    return (
        <>
            {thumbNode}
            <input type="hidden" value={currentValue} name={Array.isArray(value) ? `${name}[${index}]` : name} />
        </>
    );
}));

SliderThumb.displayName = COMPONENT_NAME;

export default SliderThumb;
