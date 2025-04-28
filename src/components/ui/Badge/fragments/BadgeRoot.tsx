import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Badge';

type BadgeRootProps = {
     children: React.ReactNode;
     customRootClass?: string;
     color?: string;
     variant?: string;
     size?: string;
     className?: string;
     props?: Record<string, any>[]
}

const BadgeRoot = ({ children, customRootClass, className, variant = '', size = '', color = '', ...props }:BadgeRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const data_attributes: Record<string, string> = {};

    if (variant) {
        data_attributes['data-badge-variant'] = variant;
    }

    if (size) {
        data_attributes['data-badge-size'] = size;
    }

    if (color) {
        data_attributes['data-rad-ui-accent-color'] = color;
    }

    return (
        <span className={clsx(rootClass, className)} {...data_attributes} {...props}>
            {children}
        </span>
    );
};

BadgeRoot.displayName = COMPONENT_NAME;

export default BadgeRoot;
