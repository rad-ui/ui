'use client';
import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { ProgressContext } from '../contexts/ProgressContext';

import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Progress';

type ProgressRootProps = {
    asChild?: boolean;
    value: number | null;
    minValue: number;
    maxValue: number;
    getValueLabel?: (value: number, minValue: number, maxValue: number) => string;
    children: React.ReactNode;
    customRootClass?: string;
}

const STATE_ENUMS = {
    LOADING: 'loading', // a progress is loading when the value is not null and not equal to the maxValue
    COMPLETE: 'complete', // a progress is complete when the value is equal to the maxValue
    INDETERMINATE: 'indeterminate' // a progress is indeterminate when the value is null, by default it's 0
} as const;

const ProgressRoot = ({ value = 0, minValue = 0, maxValue = 100, children, customRootClass, asChild, getValueLabel }: ProgressRootProps) => {
    const [state, setState] = useState<typeof STATE_ENUMS[keyof typeof STATE_ENUMS]>(STATE_ENUMS.LOADING);

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const ariaLabel = getValueLabel?.(value ?? 0, minValue, maxValue) ?? '';

    useEffect(() => {
        setState(value === null ? STATE_ENUMS.INDETERMINATE : value === maxValue ? STATE_ENUMS.COMPLETE : STATE_ENUMS.LOADING);
    }, [value, maxValue]);

    const sendValues = {
        value,
        minValue,
        maxValue,
        rootClass,
        getValueLabel,
        ariaLabel,
        state
    };
    return (
        <ProgressContext.Provider value={sendValues}>
            <Primitive.div
                role="progressbar"
                aria-label={ariaLabel}
                aria-valuetext={ariaLabel}
                aria-valuenow={value ?? 0}
                aria-valuemin={minValue}
                aria-valuemax={maxValue}
                data-state={state}
                data-value={value ?? 0}
                data-max={maxValue}
                data-min={minValue}
                className={clsx(rootClass)}
                asChild={asChild}
            >{children}</Primitive.div>
        </ProgressContext.Provider>
    );
};

export default ProgressRoot;
