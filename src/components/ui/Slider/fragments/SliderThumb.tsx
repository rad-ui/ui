'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';
import Primitive from '~/core/primitives/Primitive';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { mergeRefs } from '~/core/utils/mergeRefs';
import clsx from 'clsx';
import { clampValue, moveThumb, roundToStepPrecision } from '../utils/sliderMath';
import { useDirection } from '~/core/hooks/useDirection';
import { stateData } from '~/core/utils/stateAttributes';

const COMPONENT_NAME = 'SliderThumb';

export type SliderThumbElement = ElementRef<typeof Primitive.div>;
export type SliderThumbProps = {
    children?: React.ReactNode;
    asChild?: boolean;
    index?: number;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    /** Accessible name from the thumb's index, for multi-thumb sliders ("Minimum", "Maximum"). */
    getAriaLabel?: (index: number) => string;
    /** Text screen readers announce for the value. Gets the formatted value, the number and the index. */
    getAriaValueText?: (formattedValue: string, value: number, index: number) => string;
    /** Ref to the hidden input that holds this thumb's value for forms. */
    inputRef?: React.Ref<HTMLInputElement>;
} & ComponentPropsWithoutRef<'div'>;

const SliderThumb = React.memo(forwardRef<SliderThumbElement, SliderThumbProps>(({ children, asChild = false, index = 0, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, getAriaLabel, getAriaValueText, inputRef, className, style, onKeyDown, onPointerDown, onPointerUp, onFocus, onBlur, ...props }, ref) => {
    const { rootClass, value, minValue, maxValue, step, setValue, commitValue, name, isDragging, setDragging, disabled, orientation, isRtl: rootIsRtl, thumbAlignment, pageStepMultiplier, minStepsBetweenValues, formatValue, registerThumbRef, thumbCollisionBehavior = 'none', form, focusThumb } = React.useContext(SliderContext);
    const contextDir = useDirection();
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
        const isRtl = contextDir ? contextDir === 'rtl' : rootIsRtl || Boolean((e.currentTarget as HTMLElement).closest('[dir="rtl"]'));
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

        const target = roundToStepPrecision(newValue, step, minValue);
        let nextValue: number | number[];
        if (Array.isArray(value)) {
            // Neighbours stop, get pushed along, or swap places, per thumbCollisionBehavior.
            const moved = moveThumb(value, index, target, minValue, maxValue, minStepsBetweenValues * step, thumbCollisionBehavior);
            if (moved.values.every((entry, i) => entry === value[i])) return;
            nextValue = moved.values;
            if (moved.index !== index) {
                // The value now belongs to another thumb: focus follows it.
                const movedTo = moved.index;
                setTimeout(() => focusThumb?.(movedTo), 0);
            }
        } else {
            nextValue = clampValue(target, minValue, maxValue);
            if (nextValue === currentValue) return;
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
            aria-valuetext={getAriaValueText
                ? getAriaValueText(formatValue ? formatValue(currentValue) : String(currentValue), currentValue, index)
                : formatValue ? formatValue(currentValue) : undefined}
            aria-orientation={orientation}
            aria-label={ariaLabel ?? getAriaLabel?.(index)}
            aria-labelledby={ariaLabelledby}
            aria-disabled={disabled || undefined}
            {...stateData(state)}
            data-disabled={disabled}
            data-index={index}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onFocus={(e: React.FocusEvent<HTMLDivElement>) => { onFocus?.(e); setFocused(true); }}
            onBlur={(e: React.FocusEvent<HTMLDivElement>) => { onBlur?.(e); setFocused(false); }}
            style={{
                ...style,
                ...(() => {
                    // Mirror first in right-to-left, then keep the thumb inside the track for edge alignment.
                    const visual = orientation !== 'vertical' && rootIsRtl ? 100 - percent : percent;
                    const offset = thumbAlignment === 'edge'
                        ? `var(--rad-slider-thumb-size, 20px) * ${visual / 100}`
                        : '10px';
                    return orientation === 'vertical'
                        ? { top: `calc(${visual}% - ${offset})` }
                        : { left: `calc(${visual}% - ${offset})` };
                })()
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
                <input ref={inputRef} type="hidden" form={form} value={currentValue} name={Array.isArray(value) ? `${name}[${index}]` : name} disabled={disabled} />
            )}
        </>
    );
}));

SliderThumb.displayName = COMPONENT_NAME;

export default SliderThumb;
