import { createContext, RefObject } from 'react';

type SliderContextType = {
    rootClass: string;
    value: number | number[];
    setValue: (value: number | number[]) => void;
    commitValue: (value?: number | number[]) => void;
    minValue: number;
    maxValue: number;
    step: number;
    name?: string;
    isDragging: boolean;
    setDragging: (dragging: boolean) => void;
    disabled: boolean;
    orientation: 'horizontal' | 'vertical';
    /** True when the slider lays out right-to-left, so horizontal positions are mirrored. */
    isRtl: boolean;
    /** `edge` keeps thumbs inside the track at the ends. */
    thumbAlignment: 'center' | 'edge';
    pageStepMultiplier: number;
    /** Smallest gap between neighbouring thumbs, in steps. */
    minStepsBetweenValues: number;
    showStepMarks: boolean;
    formatValue?: (value: number) => string;
    rootRef: RefObject<HTMLDivElement>;
    thumbRefs?: RefObject<HTMLDivElement>[];
    registerThumbRef?: (index: number, thumbRef: RefObject<HTMLDivElement>) => void;
};

export const SliderContext = createContext<SliderContextType>({
    rootClass: '',
    value: 0,
    setValue: () => {},
    commitValue: () => {},
    minValue: 0,
    maxValue: 100,
    step: 1,
    name: undefined,
    isDragging: false,
    setDragging: () => {},
    disabled: false,
    orientation: 'horizontal',
    isRtl: false,
    thumbAlignment: 'center',
    pageStepMultiplier: 10,
    minStepsBetweenValues: 0,
    showStepMarks: false,
    formatValue: undefined,
    rootRef: { current: null },
    thumbRefs: undefined,
    registerThumbRef: undefined
});
