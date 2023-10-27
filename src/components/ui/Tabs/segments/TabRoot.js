
'use client';
import {customClassSwitcher} from '@/core';

const COMPONENT_NAME = 'TabRoot';
const TabRoot = ({children, customRootClass='', className=''}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <div className={`${rootClass} ${className}`}>
            {children}
        </div>
    );
};

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
