'use client';
import {customClassSwitcher} from '@/core';

const COMPONENT_NAME = 'Text';

const Text = ({children, customRootClass = '', className = '', ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <p className={`${rootClass} ${className}`} {...props}>{children}</p>;
};

Text.displayName = COMPONENT_NAME;

export default Text;
