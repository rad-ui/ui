import React from 'react';

import {customClassSwitcher} from '~/core';

import {ProgressProps, COMPONENT_NAME} from '../Progress';

export default function ProgressRoot({children, customRootClass}: ProgressProps) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (<div className={rootClass}>{children}</div>);
}
