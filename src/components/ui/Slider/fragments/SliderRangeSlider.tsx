'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'SliderRangeSlider';

export type SliderRangeSliderElement = ElementRef<'div'>;
export type SliderRangeSliderProps = {
    children?: React.ReactNode;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    defaultValue?: [number, number];
    value?: [number, number];
    onValueChange?: (value: [number, number]) => void;
} & ComponentPropsWithoutRef<'div'>;

const SliderRangeSlider = forwardRef<SliderRangeSliderElement, SliderRangeSliderProps>(({
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    defaultValue = [25, 75],
    value: valueProp,
    onValueChange,
    ...props
}, ref) => {
    const { rootClass, minValue, maxValue, step, disabled, orientation } = React.useContext(SliderContext);

    const [value, setValue] = React.useState<[number, number]>(valueProp || defaultValue);
    const [isDragging, setIsDragging] = React.useState<'lower' | 'upper' | null>(null);
    const [focused, setFocused] = React.useState<'lower' | 'upper' | null>(null);
    const lastUpdateTime = React.useRef(0);

    const clamp = (val: number) => Math.min(maxValue, Math.max(minValue, val));

    const handleValueChange = (newValue: [number, number]) => {
        setValue(newValue);
        onValueChange?.(newValue);
    };

    const percent1 = maxValue === minValue ? 0 : ((value[0] - minValue) / (maxValue - minValue)) * 100;
    const percent2 = maxValue === minValue ? 0 : ((value[1] - minValue) / (maxValue - minValue)) * 100;

    const setFromPosition = (e: React.PointerEvent<HTMLDivElement>, thumb: 'lower' | 'upper') => {
        const rect = e.currentTarget.getBoundingClientRect();
        let relative: number;

        if (orientation === 'vertical') {
            relative = (rect.bottom - e.clientY) / rect.height;
        } else {
            relative = (e.clientX - rect.left) / rect.width;
        }

        const rawValue = minValue + relative * (maxValue - minValue);
        const steppedValue = Math.round(rawValue / step) * step;
        const newValue = clamp(steppedValue);

        const newValues = [...value] as [number, number];
        newValues[thumb === 'lower' ? 0 : 1] = newValue;

        // Ensure lower <= upper
        if (thumb === 'lower') {
            newValues[0] = Math.min(newValues[0], value[1]);
        } else {
            newValues[1] = Math.max(newValues[1], value[0]);
        }

        handleValueChange(newValues);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, thumb: 'lower' | 'upper') => {
        if (disabled) return;
        e.stopPropagation();
        setIsDragging(thumb);
        setFromPosition(e, thumb);

        // Add global listeners immediately for smooth dragging
        const handleGlobalPointerMove = (e: PointerEvent) => {
            e.preventDefault();
            const rootElement = document.querySelector(`[data-slider-root="${rootClass}"]`) as HTMLDivElement;
            if (!rootElement) return;

            const rect = rootElement.getBoundingClientRect();
            let relative: number;

            if (orientation === 'vertical') {
                relative = (rect.bottom - e.clientY) / rect.height;
            } else {
                relative = (e.clientX - rect.left) / rect.width;
            }

            const rawValue = minValue + relative * (maxValue - minValue);
            const steppedValue = Math.round(rawValue / step) * step;
            const newValue = clamp(steppedValue);

            const newValues = [...value] as [number, number];
            newValues[thumb === 'lower' ? 0 : 1] = newValue;

            // Ensure lower <= upper
            if (thumb === 'lower') {
                newValues[0] = Math.min(newValues[0], value[1]);
            } else {
                newValues[1] = Math.max(newValues[1], value[0]);
            }

            // Throttle updates to 60fps for smooth dragging
            const now = performance.now();
            if (now - lastUpdateTime.current > 16) { // ~60fps
                handleValueChange(newValues);
                lastUpdateTime.current = now;
            }
        };

        const handleGlobalPointerUp = () => {
            setIsDragging(null);
            document.removeEventListener('pointermove', handleGlobalPointerMove);
            document.removeEventListener('pointerup', handleGlobalPointerUp);
        };

        document.addEventListener('pointermove', handleGlobalPointerMove);
        document.addEventListener('pointerup', handleGlobalPointerUp);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, thumb: 'lower' | 'upper') => {
        if (!isDragging || isDragging !== thumb) return;
        e.preventDefault();
        setFromPosition(e, thumb);
    };

    const handlePointerUp = () => {
        setIsDragging(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, thumb: 'lower' | 'upper') => {
        if (disabled) return;

        const newValue = [...value] as [number, number];
        const isRtl = Boolean((e.currentTarget as HTMLElement).closest('[dir="rtl"]'));

        switch (e.key) {
        case 'ArrowRight':
            newValue[thumb === 'lower' ? 0 : 1] = isRtl
                ? value[thumb === 'lower' ? 0 : 1] - step
                : value[thumb === 'lower' ? 0 : 1] + step;
            break;
        case 'ArrowLeft':
            newValue[thumb === 'lower' ? 0 : 1] = isRtl
                ? value[thumb === 'lower' ? 0 : 1] + step
                : value[thumb === 'lower' ? 0 : 1] - step;
            break;
        case 'ArrowUp':
            newValue[thumb === 'lower' ? 0 : 1] = value[thumb === 'lower' ? 0 : 1] + step;
            break;
        case 'ArrowDown':
            newValue[thumb === 'lower' ? 0 : 1] = value[thumb === 'lower' ? 0 : 1] - step;
            break;
        case 'Home':
            newValue[thumb === 'lower' ? 0 : 1] = minValue;
            break;
        case 'End':
            newValue[thumb === 'lower' ? 0 : 1] = maxValue;
            break;
        default:
            return;
        }

        e.preventDefault();

        // Ensure lower <= upper
        if (thumb === 'lower') {
            newValue[0] = Math.min(newValue[0], value[1]);
        } else {
            newValue[1] = Math.max(newValue[1], value[0]);
        }

        newValue[0] = clamp(newValue[0]);
        newValue[1] = clamp(newValue[1]);

        handleValueChange(newValue);
    };

    return (
        <div ref={ref} className={`${rootClass}-range-slider`} {...props}>
            {/* Lower thumb */}
            <Primitive.div
                className={`${rootClass}-thumb ${rootClass}-thumb-lower`}
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-valuemin={minValue}
                aria-valuemax={maxValue}
                aria-valuenow={value[0]}
                aria-orientation={orientation}
                aria-label={ariaLabel ? `${ariaLabel} minimum` : 'Minimum value'}
                aria-labelledby={ariaLabelledby}
                data-state={isDragging === 'lower' ? 'dragging' : focused === 'lower' ? 'active' : 'inactive'}
                data-disabled={disabled}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, 'lower')}
                onFocus={() => setFocused('lower')}
                onBlur={() => setFocused(null)}
                onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => handlePointerDown(e, 'lower')}
                onPointerMove={(e: React.PointerEvent<HTMLDivElement>) => handlePointerMove(e, 'lower')}
                onPointerUp={handlePointerUp}
                style={orientation === 'vertical'
                    ? { bottom: `calc(${percent1}% - 12px)` }
                    : { left: `calc(${percent1}% - 12px)` }
                }
            />

            {/* Upper thumb */}
            <Primitive.div
                className={`${rootClass}-thumb ${rootClass}-thumb-upper`}
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-valuemin={minValue}
                aria-valuemax={maxValue}
                aria-valuenow={value[1]}
                aria-orientation={orientation}
                aria-label={ariaLabel ? `${ariaLabel} maximum` : 'Maximum value'}
                aria-labelledby={ariaLabelledby}
                data-state={isDragging === 'upper' ? 'dragging' : focused === 'upper' ? 'active' : 'inactive'}
                data-disabled={disabled}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, 'upper')}
                onFocus={() => setFocused('upper')}
                onBlur={() => setFocused(null)}
                onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => handlePointerDown(e, 'upper')}
                onPointerMove={(e: React.PointerEvent<HTMLDivElement>) => handlePointerMove(e, 'upper')}
                onPointerUp={handlePointerUp}
                style={orientation === 'vertical'
                    ? { bottom: `calc(${percent2}% - 12px)` }
                    : { left: `calc(${percent2}% - 12px)` }
                }
            />

            {/* Range fill between thumbs */}
            <div
                className={`${rootClass}-range-fill`}
                style={orientation === 'vertical'
                    ? {
                        bottom: `${Math.min(percent1, percent2)}%`,
                        height: `${Math.abs(percent2 - percent1)}%`,
                        left: 0,
                        right: 0
                    }
                    : {
                        left: `${Math.min(percent1, percent2)}%`,
                        width: `${Math.abs(percent2 - percent1)}%`,
                        top: 0,
                        bottom: 0
                    }
                }
            />

            {children}
        </div>
    );
});

SliderRangeSlider.displayName = COMPONENT_NAME;

export default SliderRangeSlider;
