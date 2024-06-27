import React, {useEffect} from 'react';
import {ProgressProps, COMPONENT_NAME} from '../Progress';
import {customClassSwitcher} from '~/core';

interface IndicatorProps
  extends Pick<
    ProgressProps,
    'value' | 'minValue' | 'maxValue' | 'customRootClass' | 'renderLabel'
  > {
  renderLabel?(value: number): JSX.Element
}

export default function ProgressIndicator({
    value,
    minValue = 0,
    maxValue = 100,
    customRootClass,
    renderLabel,
}: IndicatorProps) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    if (value < minValue || value > maxValue) {
        throw new Error(
            `value should be greater than or equal to ${minValue} and less than or equal to ${maxValue}`,
        );
    }

    return (
        <div
            role="progressbar"
            className={`${rootClass}-indicator`}
            style={{transform: `translateX(-${maxValue - value}%)`}}
            aria-valuenow={value}
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
        >
            {renderLabel && renderLabel(value)}
        </div>
    );
}
