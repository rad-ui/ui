import React from 'react';
import { clsx } from 'clsx';
/**
 * Shards
*/
import CalloutRoot from './fragments/CalloutRoot';

export type CalloutProps = {
    children?: React.ReactNode;
    className?: string ;
    color?: string;
    variant?: string;
    size?: string;
    customRootClass?: string;
    props?: object[]
}

const COMPONENT_NAME = 'Callout';
const Callout = ({ children, className = '', color, variant='', size='', customRootClass, ...props }: CalloutProps) => {
    return (
    <CalloutRoot customRootClass={customRootClass} className={clsx(className)} color={color ?? undefined} variant={variant} size={size} {...props}>
        {children}
    </CalloutRoot>);
};

Callout.displayName = COMPONENT_NAME;

// Callout Exports
Callout.Root = CalloutRoot;
export default Callout;
