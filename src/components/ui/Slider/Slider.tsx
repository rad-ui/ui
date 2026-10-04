'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import SliderRoot from './fragments/SliderRoot';
import SliderTrack from './fragments/SliderTrack';
import SliderThumb from './fragments/SliderThumb';
import SliderRange from './fragments/SliderRange';
import SliderMarks from './fragments/SliderMarks';
import SliderRangeSlider from './fragments/SliderRangeSlider';

export type SliderElement = ElementRef<'div'>;
export type SliderProps = {
    defaultValue?: number | number[];
    value?: number | number[];
    onValueChange?: (value: number | number[]) => void;
    onValueCommit?: (value: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    pageStepMultiplier?: number;
    showStepMarks?: boolean;
    formatValue?: (value: number) => string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'value' | 'defaultValue' | 'onValueChange'>;

type SliderComponent = ForwardRefExoticComponent<SliderProps & RefAttributes<SliderElement>> & {
    Root: typeof SliderRoot;
    Track: typeof SliderTrack;
    Range: typeof SliderRange;
    Thumb: typeof SliderThumb;
    Marks: typeof SliderMarks;
    RangeSlider: typeof SliderRangeSlider;
};

const Slider = forwardRef<SliderElement, SliderProps>((props, ref) => {
    // Provide a sensible default implementation
    const {
        defaultValue,
        value,
        min = 0,
        max = 100,
        step = 1,
        orientation = 'horizontal',
        formatValue,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        ...restProps
    } = props;
    const resolvedValue = value ?? defaultValue;
    const thumbCount = Array.isArray(resolvedValue) ? resolvedValue.length : 1;

    const getThumbLabel = (index: number) => {
        if (!ariaLabel || thumbCount === 1) return ariaLabel;
        if (thumbCount === 2) return `${ariaLabel} ${index === 0 ? 'minimum' : 'maximum'}`;
        return `${ariaLabel} ${index + 1}`;
    };

    return (
        <Slider.Root
            ref={ref}
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            step={step}
            orientation={orientation}
            formatValue={formatValue}
            {...restProps}
        >
            <Slider.Track>
                <Slider.Range>
                    {Array.from({ length: thumbCount }, (_, index) => (
                        <Slider.Thumb
                            key={index}
                            index={index}
                            aria-label={getThumbLabel(index)}
                            aria-labelledby={ariaLabelledby}
                        />
                    ))}
                </Slider.Range>
            </Slider.Track>
        </Slider.Root>
    );
}) as SliderComponent;

Slider.displayName = 'Slider';

Slider.Root = SliderRoot;
Slider.Track = SliderTrack;
Slider.Range = SliderRange;
Slider.Thumb = SliderThumb;
Slider.Marks = SliderMarks;
Slider.RangeSlider = SliderRangeSlider;

export type { SliderRootProps } from './fragments/SliderRoot';
export type { SliderTrackProps } from './fragments/SliderTrack';
export type { SliderRangeProps } from './fragments/SliderRange';
export type { SliderThumbProps } from './fragments/SliderThumb';
export type { SliderMarksProps } from './fragments/SliderMarks';
export type { SliderRangeSliderProps } from './fragments/SliderRangeSlider';
export default Slider;
