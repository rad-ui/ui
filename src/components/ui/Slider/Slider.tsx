'use client';

import SliderRoot from './fragments/SliderRoot';
import SliderTrack from './fragments/SliderTrack';
import SliderThumb from './fragments/SliderThumb';
import SliderRange from './fragments/SliderRange';

const Slider = () => {
    console.warn('Direct usage of Slider is not supported. Please use Slider.Root, Slider.Track, etc. instead.');
    return null;
};

Slider.Root = SliderRoot;
Slider.Track = SliderTrack;
Slider.Range = SliderRange;
Slider.Thumb = SliderThumb;

export default Slider;
