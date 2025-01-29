'use client';
import React, { useContext } from 'react';
import { COMPONENT_NAME } from '../Progress';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { ProgressContext } from '../contexts/ProgressContext';

interface IndicatorProps {
    customRootClass?: string;
    color?:string;
    renderLabel?(value: number): JSX.Element;
}

export default function ProgressIndicator({
    customRootClass,
    renderLabel,
    color = ''
}: IndicatorProps) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const { value, minValue, maxValue } = useContext(ProgressContext);
    // Ensure value stays within bounds in production
    const boundedValue = Math.min(Math.max(value, minValue), maxValue);

    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return (
        <div
            role="progressbar"
            className={clsx(`${rootClass}-indicator`)}
            style={{ transform: `translateX(-${maxValue - boundedValue}%)` }}
            aria-valuenow={boundedValue}
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
            {...data_attributes}
        >
            {renderLabel?.(value)}
        </div>
    );
}
