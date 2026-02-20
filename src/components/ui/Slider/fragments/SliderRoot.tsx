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
    defaultValue?: number | number[];
    value?: number | number[];
    onValueChange?: (value: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    pageStepMultiplier?: number;
    showStepMarks?: boolean;
    formatValue?: (value: number) => string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'value' | 'defaultValue' | 'onValueChange'>;

const SliderRoot = forwardRef<SliderRootElement, SliderRootProps>(({
    children,
    className = '',
    customRootClass = '',
    defaultValue,
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

    const [value, setValue] = useControllableState<number | number[]>(
        valueProp,
        defaultValue ?? (Array.isArray(valueProp) ? valueProp : 0),
        onValueChange
    );
    const [isDragging, setDragging] = React.useState(false);
    const activeThumbIndexRef = React.useRef<number | null>(null);
    const internalRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = React.useMemo(() => {
        return (node: HTMLDivElement | null) => {
            (internalRef as any).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as any).current = node;
        };
    }, [ref]);

    const clamp = (val: number) => Math.min(max, Math.max(min, val));

    const setFromPosition = (e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
        const rootElement = internalRef.current;
        if (!rootElement) return;

        const rect = rootElement.getBoundingClientRect();
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

        if (Array.isArray(value)) {
            let indexToUpdate = activeThumbIndexRef.current;

            // If no active thumb (e.g. click on track), find the nearest one
            if (indexToUpdate === null) {
                const distances = value.map(v => Math.abs(v - newValue));
                indexToUpdate = distances.indexOf(Math.min(...distances));
                activeThumbIndexRef.current = indexToUpdate;
            }

            const nextValue = value.map((currentValue, origIndex) => ({
                value: currentValue,
                origIndex
            }));
            nextValue[indexToUpdate].value = newValue;
            // Keep values sorted for range logic
            nextValue.sort((a, b) => a.value - b.value);

            // Update the active thumb ref to the new sorted index
            activeThumbIndexRef.current = nextValue.findIndex(item => item.origIndex === indexToUpdate);

            setValue(nextValue.map(item => item.value));
        } else {
            setValue(newValue);
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.stopPropagation();

        // Check if we clicked a thumb
        const target = e.target as HTMLElement;
        const thumbElement = target.closest(`.${rootClass}-thumb`) as HTMLElement | null;

        if (thumbElement && Array.isArray(value)) {
            const index = parseInt(thumbElement.getAttribute('data-index') || '0', 10);
            activeThumbIndexRef.current = index;
            thumbElement.focus();
        } else {
            activeThumbIndexRef.current = null;
            if (!Array.isArray(value)) {
                const singleThumb = internalRef.current?.querySelector<HTMLElement>(`.${rootClass}-thumb`);
                singleThumb?.focus();
            } else {
                internalRef.current?.focus();
            }
        }

        setDragging(true);
        setFromPosition(e);

        const handleGlobalPointerMove = (e: PointerEvent) => {
            e.preventDefault();
            setFromPosition(e);
        };

        const handleGlobalPointerUp = () => {
            setDragging(false);
            activeThumbIndexRef.current = null;
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
        activeThumbIndexRef.current = null;
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
                ref={mergedRef}
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
