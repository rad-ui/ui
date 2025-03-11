import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Card';
export type CardRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    variant?: string;
    size?: string;
    className?: string;
    props?: any;
};

const CardRoot = ({ children, customRootClass, className = '', variant='', size='', ...props }: CardRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const data_attributes: Record<string, string> = {};

    if (variant) {
        data_attributes['data-card-variant'] = variant;
    }

    if (size) {
        data_attributes['data-card-size'] = size;
    }
    
    return (
        <div className={clsx(rootClass, className)} {...data_attributes} {...props} >
            {children}
        </div>
    );
};

CardRoot.displayName = COMPONENT_NAME;

export default CardRoot;
