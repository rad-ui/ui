'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { ProgressContext } from '../contexts/ProgressContext';

import Primitive from '~/core/primitives/Primitive';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Progress';

type ProgressRootProps = {
    value: number;
    size?: string;
    minValue: number;
    maxValue: number;
    children: React.ReactNode;
    customRootClass?: string;
}

const ProgressRoot = ({ value = 0, minValue = 0, maxValue = 100,size='', children, customRootClass }: ProgressRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = useCreateDataAttribute(COMPONENT_NAME.toLowerCase(), { size });
    const sendValues = {
        value,
        minValue,
        maxValue,
        size,
        rootClass
    };

    return (
      <ProgressContext.Provider value={sendValues}>
        <Primitive.div
          className={clsx(rootClass)}
          data-testid={`${COMPONENT_NAME.toLowerCase()}-bar-component`}
          {...dataAttributes()}
        >
          {children}
        </Primitive.div>
      </ProgressContext.Provider>
    );
};

export default ProgressRoot;
