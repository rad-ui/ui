'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'SliderThumb';

export type SliderThumbElement = ElementRef<typeof Primitive.div>;
export type SliderThumbProps = { children?: React.ReactNode; asChild?: boolean } & ComponentPropsWithoutRef<'div'>;

const SliderThumb = forwardRef<SliderThumbElement, SliderThumbProps>(({ children, asChild = false, ...props }, ref) => {
    const { rootClass, value, minValue, maxValue, step, setValue, name, isDragging, setDragging, disabled } = React.useContext(SliderContext);
    const percent = ((value - minValue) / (maxValue - minValue)) * 100;
    const [focused, setFocused] = React.useState(false);

    const clamp = (val: number) => Math.min(maxValue, Math.max(minValue, val));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        let newValue = value;
        const isRtl = Boolean((e.currentTarget as HTMLElement).closest('[dir="rtl"]'));
        switch (e.key) {
        case 'ArrowRight':
            newValue = isRtl ? value - step : value + step;
            break;
        case 'ArrowLeft':
            newValue = isRtl ? value + step : value - step;
            break;
        case 'ArrowUp':
            newValue = value + step;
            break;
        case 'ArrowDown':
            newValue = value - step;
            break;
        case 'Home':
            newValue = minValue;
            break;
        case 'End':
            newValue = maxValue;
            break;
        default:
            return;
        }
        e.preventDefault();
        setValue(clamp(newValue));
    };

    const handlePointerDown = () => {
        if (disabled) return;
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
            aria-valuenow={value}
            data-state={state}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ left: `calc(${percent}% - 16px)` }}
            {...props}
        >
            {children}
        </Primitive.div>
    );

    return (
        <>
            {thumbNode}
            <input type="hidden" value={value} name={name} />
        </>
    );
});

SliderThumb.displayName = COMPONENT_NAME;

export default SliderThumb;
