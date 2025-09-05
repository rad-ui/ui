'use client';
import React, { useContext } from 'react';

import { clsx } from 'clsx';
import { ProgressContext } from '../contexts/ProgressContext';
import Primitive from '~/core/primitives/Primitive';

interface IndicatorProps {
    asChild?: boolean;
}

export default function ProgressIndicator({ asChild }: IndicatorProps) {
    const { value, minValue, maxValue, rootClass, state } = useContext(ProgressContext);
    // Ensure value stays within bounds in production, use 0 if value is null
    const boundedValue = Math.min(Math.max(value ?? 0, minValue), maxValue);

    // Calculate the percentage of completion
    const percentage = ((boundedValue - minValue) / (maxValue - minValue)) * 100;

    const data_attributes: Record<string, string> = {};

    return (
        <Primitive.div
            role="progressbar"
            className={clsx(`${rootClass}-indicator`)}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
            aria-valuenow={boundedValue}
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
            data-state={state}
            data-value={boundedValue}
            data-max={maxValue}
            data-min={minValue}
            asChild={asChild}
            {...data_attributes}
        >

        </Primitive.div>
    );
}
