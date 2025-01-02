'use client';
import React, { useContext } from 'react';
import { COMPONENT_NAME } from '../Progress';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { ProgressContext } from '../contexts/ProgressContext';

interface IndicatorProps {
    customRootClass?: string;
    renderLabel?(value: number): JSX.Element;
}

export default function ProgressIndicator({
    customRootClass,
    renderLabel
}: IndicatorProps) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const { value, minValue, maxValue } = useContext(ProgressContext);
    // Ensure value stays within bounds in production
    const boundedValue = Math.min(Math.max(value, minValue), maxValue);

    return (
        <div
            role="progressbar"
            className={clsx(`${rootClass}-indicator`)}
            style={{ transform: `translateX(-${maxValue - boundedValue}%)` }}
            aria-valuenow={boundedValue}
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
        >
            {renderLabel?.(value)}
        </div>
    );
}
