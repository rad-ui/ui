import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Badge';

type BadgeRootProps = {
     children: React.ReactNode;
     customRootClass?: string;
     color?: string;
     className?: string;
     props?: Record<string, any>[]
}

const BadgeRoot = ({ children, customRootClass, className, color, ...props }:BadgeRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <span className={clsx(rootClass, className)} data-accent-color={color ?? undefined} {...props}>
            {children}
        </span>
    );
};

BadgeRoot.displayName = COMPONENT_NAME;

export default BadgeRoot;
