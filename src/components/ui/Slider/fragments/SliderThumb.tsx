'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';
import Primitive from '~/core/primitives/Primitive';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { mergeRefs } from '~/core/utils/mergeRefs';
import clsx from 'clsx';
import { clampValue, getThumbBounds, roundToStepPrecision } from '../utils/sliderMath';

const COMPONENT_NAME = 'SliderThumb';

export type SliderThumbElement = ElementRef<typeof Primitive.div>;
export type SliderThumbProps = {
    children?: React.ReactNode;
    asChild?: boolean;
    index?: number;
    'aria-label'?: string;
    'aria-labelledby'?: string;
} & ComponentPropsWithoutRef<'div'>;

const SliderThumb = React.memo(forwardRef<SliderThumbElement, SliderThumbProps>(({ children, asChild = false, index = 0, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, className, style, onKeyDown, onPointerDown, onPointerUp, onFocus, onBlur, ...props }, ref) => {
    const { rootClass, value, minValue, maxValue, step, setValue, commitValue, name, isDragging, setDragging, disabled, orientation, pageStepMultiplier, formatValue, registerThumbRef } = React.useContext(SliderContext);
    const thumbRef = React.useRef<HTMLDivElement>(null);
    
    // Register this thumb ref with the slider root
    React.useEffect(() => {
        if (registerThumbRef && thumbRef.current) {
            registerThumbRef(index, thumbRef);
        }
    }, [index, registerThumbRef]);
    
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(e);
        if (disabled || e.defaultPrevented) return;
        let newValue = currentValue;
        const isRtl = Boolean((e.currentTarget as HTMLElement).closest('[dir="rtl"]'));
        switch (e.key) {
        case KEYBOARD_KEYS.ARROW_RIGHT:
            newValue = isRtl ? currentValue - step : currentValue + step;
            break;
        case KEYBOARD_KEYS.ARROW_LEFT:
            newValue = isRtl ? currentValue + step : currentValue - step;
            break;
        case KEYBOARD_KEYS.ARROW_UP:
            newValue = currentValue + step;
            break;
        case KEYBOARD_KEYS.ARROW_DOWN:
            newValue = currentValue - step;
            break;
        case KEYBOARD_KEYS.HOME:
            newValue = minValue;
            break;
        case KEYBOARD_KEYS.END:
            newValue = maxValue;
            break;
        case KEYBOARD_KEYS.PAGE_UP:
            newValue = currentValue + step * pageStepMultiplier;
            break;
        case KEYBOARD_KEYS.PAGE_DOWN:
            newValue = currentValue - step * pageStepMultiplier;
            break;
        default:
            return;
        }
        e.preventDefault();

        // In multi-thumb sliders a thumb cannot move past its neighbours.
        const bounds = Array.isArray(value)
            ? getThumbBounds(value, index, minValue, maxValue)
            : { lower: minValue, upper: maxValue };
        const nextThumbValue = clampValue(
            roundToStepPrecision(newValue, step, minValue),
            bounds.lower,
            bounds.upper
        );
        if (nextThumbValue === currentValue) return;

        let nextValue: number | number[];
        if (Array.isArray(value)) {
            const next = [...value];
            next[index] = nextThumbValue;
            nextValue = next;
        } else {
            nextValue = nextThumbValue;
        }
        setValue(nextValue);
        commitValue(nextValue);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        onPointerDown?.(e);
        if (disabled || e.defaultPrevented) return;
        e.currentTarget.focus();
        setDragging(true);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        onPointerUp?.(e);
        setDragging(false);
    };

    const state = isDragging ? 'dragging' : focused ? 'active' : 'inactive';

    const thumbNode = (
        <Primitive.div
            ref={mergeRefs(thumbRef, ref)}
            asChild={asChild}
            className={clsx(rootClass ? `${rootClass}-thumb` : undefined, className) || undefined}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-valuenow={currentValue}
            aria-valuetext={formatValue ? formatValue(currentValue) : undefined}
            aria-orientation={orientation}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-disabled={disabled || undefined}
            data-state={state}
            data-disabled={disabled}
            data-index={index}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onFocus={(e: React.FocusEvent<HTMLDivElement>) => { onFocus?.(e); setFocused(true); }}
            onBlur={(e: React.FocusEvent<HTMLDivElement>) => { onBlur?.(e); setFocused(false); }}
            style={{
                ...style,
                ...(orientation === 'vertical'
                    ? { top: `calc(${percent}% - 10px)` }
                    : { left: `calc(${percent}% - 10px)` })
            }}
            {...props}
        >
            {children}
        </Primitive.div>
    );

    return (
        <>
            {thumbNode}
            {name !== undefined && (
                <input type="hidden" value={currentValue} name={Array.isArray(value) ? `${name}[${index}]` : name} disabled={disabled} />
            )}
        </>
    );
}));

SliderThumb.displayName = COMPONENT_NAME;

export default SliderThumb;
