import React from 'react';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Card';
export type CardRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    props?: any;
};

const CardRoot = ({ children, customRootClass, className = '', ...props }: CardRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <div className={`${rootClass} ${className}`} {...props} >
            {children}
        </div>
    );
};

CardRoot.displayName = COMPONENT_NAME;

export default CardRoot;
