import React from 'react';


/**
 * Shards
*/
import CalloutRoot from './shards/CalloutRoot';


type CalloutProps = {
    children?: React.ReactNode;
    className?: string ;
    color?: string;
    customRootClass?: string;
    props?: Record<any, any>[]
}


const COMPONENT_NAME = 'Callout';
const Callout = ({children, className='', color, customRootClass, ...props}: CalloutProps) => {
    console.log('Callout', className);
    return (<CalloutRoot customRootClass={customRootClass} className={`${className}`} color={color ?? undefined} {...props}>
        {children}
    </CalloutRoot>);
};

Callout.displayName = COMPONENT_NAME;


Callout.Root = CalloutRoot;
export default Callout;
