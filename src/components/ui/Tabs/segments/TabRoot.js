
'use client';
import {customClassSwitcher} from '@/core';

const COMPONENT_NAME = 'TabRoot';
const TabRoot = ({children, customRootClass='', className='', color=undefined, ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    if (color) {
        props['data-accent-color'] = color;
    }
    return (
        <div className={`${rootClass} ${className}`} {...props} >
            {children}
        </div>
    );
};

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
