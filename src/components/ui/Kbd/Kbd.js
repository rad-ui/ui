'use client';
import React from 'react';
import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'Kbd';

const Kbd = ({children, customRootClass = '', className = '', ...rest}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <kbd className={`${rootClass} ${className}`} {...rest}>{children}</kbd>;
};

export default Kbd;
