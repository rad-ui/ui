import React, { PropsWithChildren, useState } from 'react';

import ProgressRoot from './fragments/ProgressRoot';
import ProgressIndicator from './fragments/ProgressIndicator';

export const COMPONENT_NAME = 'Progress';

export interface ProgressProps extends PropsWithChildren {
    value: number;
    minValue?: number,
    maxValue?: number;
    customRootClass?: string
    renderLabel?(value: number): JSX.Element
  }

function Progress({ value = 0, maxValue = 100, minValue = 0, customRootClass, ...indicatorProps }: ProgressProps) {
    return (
        <ProgressRoot value={value} maxValue={maxValue} minValue={minValue} customRootClass={customRootClass}>
            <ProgressIndicator customRootClass={customRootClass} {...indicatorProps}/>
        </ProgressRoot>
    );
}

Progress.Root = ProgressRoot;
Progress.Indicator = ProgressIndicator;

Progress.displayName = COMPONENT_NAME;
export default Progress;
