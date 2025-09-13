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
    ...props
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [value, setValue] = useControllableState<number>(valueProp, defaultValue, onValueChange);
    const [isDragging, setDragging] = React.useState(false);

    const clamp = (val: number) => Math.min(max, Math.max(min, val));

    const setFromPosition = (e: React.PointerEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relative = (e.clientX - rect.left) / rect.width;
        const newValue = clamp(min + relative * (max - min));
        setValue(newValue);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.stopPropagation();
        setDragging(true);
        setFromPosition(e);
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
        disabled
    };

    return (
        <SliderContext.Provider value={contextValues}>
            <div
                ref={ref}
                className={clsx(rootClass, className)}
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
