'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { ProgressContext } from '../contexts/ProgressContext';

import { ProgressProps, COMPONENT_NAME } from '../Progress';

interface ProgressRootProps extends Partial<ProgressProps> {}

const ProgressRoot = ({ value = 0, minValue = 0, maxValue = 100, children, customRootClass }: ProgressRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const sendValues = {
        value,
        minValue,
        maxValue
    };

    return (
        <ProgressContext.Provider value={sendValues}>
            <div className={clsx(rootClass)}>{children}</div>
        </ProgressContext.Provider>
    );
};

export default ProgressRoot;
