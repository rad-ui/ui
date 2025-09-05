'use client';
import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import { customClassSwitcher } from '~/core/customClassSwitcher';
import { SliderContext } from '../context/SliderContext';

const COMPONENT_NAME = 'Slider';

export type SliderRootElement = ElementRef<'div'>;
export type SliderRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    readOnly?: boolean;
    orientation?: 'horizontal' | 'vertical';
    valueLabelDisplay?: 'auto' | 'on' | 'off';
} & ComponentPropsWithoutRef<'div'>;

const SliderRoot = forwardRef<SliderRootElement, SliderRootProps>(({
    children,
    className = '',
    customRootClass = '',
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    readOnly = false,
    orientation = 'horizontal',
    valueLabelDisplay = 'auto',
    ...props
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [value, setValue] = React.useState(defaultValue);
    const [minValue, setMinValue] = React.useState(min);
    const [maxValue, setMaxValue] = React.useState(max);
    // const [step, setStep] = React.useState(1);
    // const [disabled, setDisabled] = React.useState(false);
    // const [readOnly, setReadOnly] = React.useState(false);
    // const [orientation, setOrientation] = React.useState('horizontal');
    // const [valueLabelDisplay, setValueLabelDisplay] = React.useState('auto');

    const contextValues = {
        rootClass,
        value,
        setValue,
        minValue,
        setMinValue,
        maxValue,
        setMaxValue
        // step,
        // disabled,
        // readOnly,
        // orientation,
        // valueLabelDisplay
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSliderValue(e);
    };

    const setSliderValue = (e: React.MouseEvent<HTMLDivElement>) => {
        // Get the bounding rectangle of the track element
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate the relative X position within the element
        const relativeX = e.clientX - rect.left;
        // Get percentage of the click (clamped between 0 and 100)
        const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));

        setValue(percentage);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation();

        // Get the bounding rectangle of the track element
        // const rect = e.currentTarget.getBoundingClientRect();
        setSliderValue(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        target.setPointerCapture(e.pointerId);
        e.stopPropagation();

        // Get the bounding rectangle of the track element
        // const rect = e.currentTarget.getBoundingClientRect();

        target.focus();
        e.preventDefault();

        setSliderValue(e);

        console.log('moving');
    };

    return <SliderContext.Provider value={contextValues}>
        <div ref={ref} className={clsx(rootClass, className)} onClick={handleClick} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} {...props}>{children}</div>
    </SliderContext.Provider>;
});

SliderRoot.displayName = COMPONENT_NAME;

export default SliderRoot;
