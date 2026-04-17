import { createContext, RefObject } from 'react';

type SliderContextType = {
    rootClass: string;
    value: number | number[];
    setValue: (value: number | number[]) => void;
    minValue: number;
    maxValue: number;
    step: number;
    name?: string;
    isDragging: boolean;
    setDragging: (dragging: boolean) => void;
    disabled: boolean;
    orientation: 'horizontal' | 'vertical';
    pageStepMultiplier: number;
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
    minValue: 0,
    maxValue: 100,
    step: 1,
    name: undefined,
    isDragging: false,
    setDragging: () => {},
    disabled: false,
    orientation: 'horizontal',
    pageStepMultiplier: 10,
    showStepMarks: false,
    formatValue: undefined,
    rootRef: { current: null },
    thumbRefs: undefined,
    registerThumbRef: undefined
});
