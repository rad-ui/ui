import React from 'react';
import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'Callout';

type CalloutRootProps = {
    children?: React.ReactNode;
    className?: string | '' ;
    color?: string;
    customRootClass?: string;
    props?: Record<any, any>[]
}

const CalloutRoot = ({children, className, color, customRootClass, ...props}: CalloutRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <div className={`${rootClass} ${className}`} data-accent-color={color ?? undefined} {...props}>
        {children}
    </div>;
};

CalloutRoot.displayName = COMPONENT_NAME;

export default CalloutRoot;
