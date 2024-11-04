import React from 'react';

/**
 * Shards
*/
import CalloutRoot from './fragments/CalloutRoot';

export type CalloutProps = {
    children?: React.ReactNode;
    className?: string ;
    color?: string;
    customRootClass?: string;
    props?: object[]
}

const COMPONENT_NAME = 'Callout';
const Callout = ({ children, className = '', color, customRootClass, ...props }: CalloutProps) => {
    return (<CalloutRoot customRootClass={customRootClass} className={`${className}`} color={color ?? undefined} {...props}>
        {children}
    </CalloutRoot>);
};

Callout.displayName = COMPONENT_NAME;

// Callout Exports
Callout.Root = CalloutRoot;
export default Callout;
