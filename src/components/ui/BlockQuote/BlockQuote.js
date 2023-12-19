'use client';
import React from 'react';

import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'BlockQuote';
const BlockQuote = ({children, customRootClass = '', className = '', ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <blockquote className={`${rootClass} ${className}`} {...props}>{children}</blockquote>;
};

BlockQuote.displayName = COMPONENT_NAME;

export default BlockQuote;
