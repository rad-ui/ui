import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import CalloutContext from '../contexts/CalloutContext';
import Primitive from '~/core/primitives/Primitive';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

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

const CalloutRoot = ({ children, asChild = false, className = '', color = '', variant = '', size = '', customRootClass = '', ...props }: CalloutRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = useCreateDataAttribute(COMPONENT_NAME, { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return (
        <CalloutContext.Provider value={{ rootClass }}>
            <Primitive.div asChild={asChild} className={clsx(rootClass, className)} {...composedAttributes()} {...props}>
                {children}
            </Primitive.div>
        </CalloutContext.Provider>
    );
};

CalloutRoot.displayName = COMPONENT_NAME;

export default CalloutRoot;
