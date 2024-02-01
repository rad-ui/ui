import React from 'react';

import {customClassSwitcher} from '~/core';

import {ProgressProps, COMPONENT_NAME} from '../Progress';

interface ProgressRootProps extends Pick<ProgressProps, 'children' | 'customRootClass'>{

}

export default function ProgressRoot({children, customRootClass}: ProgressRootProps) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <div className={`${rootClass}-root`}>
            {children}
        </div>
    );
}
