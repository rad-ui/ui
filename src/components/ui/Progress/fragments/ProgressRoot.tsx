'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { ProgressContext } from '../contexts/ProgressContext';

import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Progress';

type ProgressRootProps = {
    value: number;
    minValue: number;
    maxValue: number;
    children: React.ReactNode;
    customRootClass?: string;
}

const ProgressRoot = ({ value = 0, minValue = 0, maxValue = 100, children, customRootClass }: ProgressRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const sendValues = {
        value,
        minValue,
        maxValue,
        rootClass
    };

    return (
        <ProgressContext.Provider value={sendValues}>
            <Primitive.div className={clsx(rootClass)}>{children}</Primitive.div>
        </ProgressContext.Provider>
    );
};

export default ProgressRoot;
