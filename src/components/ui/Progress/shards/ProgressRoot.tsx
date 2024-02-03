import React from 'react';

import {customClassSwitcher} from '~/core';

import {ProgressProps, COMPONENT_NAME} from '../Progress';

interface ProgressRootProps extends Partial<ProgressProps> {}

export default function ProgressRoot({children, customRootClass}: ProgressRootProps) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (<div className={rootClass}>{children}</div>);
}
