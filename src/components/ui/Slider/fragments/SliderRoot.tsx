'use client';
import React from 'react';
import clsx from 'clsx';

import { customClassSwitcher } from '~/core/customClassSwitcher';
import { SliderContext } from '../context/SliderContext';

const COMPONENT_NAME = 'Slider';

type SliderRootProps = {
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
};

const SliderRoot = ({ children, className = '', customRootClass = '', defaultValue = 0, min = 0, max = 100, step = 1, disabled = false, readOnly = false, orientation = 'horizontal', valueLabelDisplay = 'auto' }: SliderRootProps) => {
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
    return <SliderContext.Provider value={contextValues}>
        <div className={clsx(rootClass, className)}>{children}</div>
    </SliderContext.Provider>;
};

export default SliderRoot;
