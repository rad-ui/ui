import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Callout';

type CalloutRootProps = {
    children?: React.ReactNode;
    className?: string | '' ;
    color?: string;
    variant?: string;
    size?: string;
    customRootClass?: string;
    props?: Record<any, any>[]
}

const CalloutRoot = ({ children, className, color, variant = '', size = '', customRootClass, ...props }: CalloutRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const data_attributes: Record<string, string> = {};

    if (variant) {
        data_attributes['data-callout-variant'] = variant;
    }

    if (size) {
        data_attributes['data-callout-size'] = size;
    }

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return <div className={clsx(rootClass, className)} data-accent-color={color ?? undefined} {...data_attributes} {...props}>
        {children}
    </div>;
};

CalloutRoot.displayName = COMPONENT_NAME;

export default CalloutRoot;
