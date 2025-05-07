import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import CalloutContext from '../contexts/CalloutContext';
import Primitive from '~/core/primitives/Primitive';
const COMPONENT_NAME = 'Callout';

type CalloutRootProps = {
    children?: React.ReactNode;
    className?: string | '' ;
    color?: string;
    variant?: string;
    size?: string;
    customRootClass?: string;
    asChild?: boolean
    props?: Record<any, any>[]
}

const CalloutRoot = ({ children, asChild=false, className, color, variant = '', size = '', customRootClass, ...props }: CalloutRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const data_attributes: Record<string, string> = {};

    if (variant) {
        data_attributes['data-callout-variant'] = variant;
    }

    if (size) {
        data_attributes['data-callout-size'] = size;
    }

    if (color) {
        data_attributes['data-rad-ui-accent-color'] = color;
    }

    return (
        <CalloutContext.Provider value={{ rootClass }}>
        <Primitive.div asChild className={clsx(rootClass, className)} data-rad-ui-accent-color={color ?? undefined} {...data_attributes} {...props}>
        {children}
    </Primitive.div>
    </CalloutContext.Provider>
    )
    
};

CalloutRoot.displayName = COMPONENT_NAME;

export default CalloutRoot;
