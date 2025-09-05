'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import SliderRoot from './fragments/SliderRoot';
import SliderTrack from './fragments/SliderTrack';
import SliderThumb from './fragments/SliderThumb';
import SliderRange from './fragments/SliderRange';

export type SliderElement = ElementRef<'div'>;
export type SliderProps = ComponentPropsWithoutRef<'div'>;

type SliderComponent = ForwardRefExoticComponent<SliderProps & RefAttributes<SliderElement>> & {
    Root: typeof SliderRoot;
    Track: typeof SliderTrack;
    Range: typeof SliderRange;
    Thumb: typeof SliderThumb;
};

const Slider = forwardRef<SliderElement, SliderProps>((_props, _ref) => {
    console.warn('Direct usage of Slider is not supported. Please use Slider.Root, Slider.Track, etc. instead.');
    return null;
}) as SliderComponent;

Slider.displayName = 'Slider';

Slider.Root = SliderRoot;
Slider.Track = SliderTrack;
Slider.Range = SliderRange;
Slider.Thumb = SliderThumb;

export default Slider;
