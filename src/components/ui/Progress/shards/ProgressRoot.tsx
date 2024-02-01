import React from 'react';

import {customClassSwitcher} from '~/core';

import {ProgressProps, COMPONENT_NAME} from '../Progress';

// Removed empty interface declaration for clarity

export default function ProgressRoot({children, customRootClass}: ProgressProps) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <div className={`${rootClass}-root`}>
            {children}
        </div>
    );
}
