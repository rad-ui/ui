'use client';
import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import { customClassSwitcher } from '~/core/customClassSwitcher';
import { SliderContext } from '../context/SliderContext';
import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Slider';

export type SliderRootElement = ElementRef<'div'>;
export type SliderRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    defaultValue?: number;
    value?: number;
    onValueChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    pageStepMultiplier?: number;
    showStepMarks?: boolean;
    formatValue?: (value: number) => string;
} & ComponentPropsWithoutRef<'div'>;

const SliderRoot = forwardRef<SliderRootElement, SliderRootProps>(({
    children,
    className = '',
    customRootClass = '',
    defaultValue = 0,
    value: valueProp,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    name,
    orientation = 'horizontal',
    pageStepMultiplier = 10,
    showStepMarks = false,
    formatValue,
    ...props
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [value, setValue] = useControllableState<number>(valueProp, defaultValue, onValueChange);
    const [isDragging, setDragging] = React.useState(false);
    const lastUpdateTime = React.useRef(0);

    const clamp = (val: number) => Math.min(max, Math.max(min, val));

    const setFromPosition = (e: React.PointerEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        let relative: number;

        if (orientation === 'vertical') {
            relative = (rect.bottom - e.clientY) / rect.height;
        } else {
            relative = (e.clientX - rect.left) / rect.width;
        }

        const rawValue = min + relative * (max - min);
        // Snap to step
        const steppedValue = Math.round(rawValue / step) * step;
        const newValue = clamp(steppedValue);
        setValue(newValue);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.stopPropagation();
        setDragging(true);
        setFromPosition(e);

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

            const rawValue = min + relative * (max - min);
            const steppedValue = Math.round(rawValue / step) * step;
            const newValue = clamp(steppedValue);

            // Throttle updates to 60fps for smooth dragging
            const now = performance.now();
            if (now - lastUpdateTime.current > 16) { // ~60fps
                setValue(newValue);
                lastUpdateTime.current = now;
            }
        };

        const handleGlobalPointerUp = () => {
            setDragging(false);
            document.removeEventListener('pointermove', handleGlobalPointerMove);
            document.removeEventListener('pointerup', handleGlobalPointerUp);
        };

        document.addEventListener('pointermove', handleGlobalPointerMove);
        document.addEventListener('pointerup', handleGlobalPointerUp);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();
        setFromPosition(e);
    };

    const handlePointerUp = () => {
        setDragging(false);
    };

    const contextValues = {
        rootClass,
        value,
        setValue,
        minValue: min,
        maxValue: max,
        step,
        name,
        isDragging,
        setDragging,
        disabled,
        orientation,
        pageStepMultiplier,
        showStepMarks,
        formatValue
    };

    return (
        <SliderContext.Provider value={contextValues}>
            <div
                ref={ref}
                className={clsx(rootClass, className)}
                data-slider-root={rootClass}
                data-disabled={disabled}
                data-orientation={orientation}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                {...props}
            >
                {children}
            </div>
        </SliderContext.Provider>
    );
});

SliderRoot.displayName = COMPONENT_NAME;

export default SliderRoot;
