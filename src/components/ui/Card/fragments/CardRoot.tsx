import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';
const COMPONENT_NAME = 'Card';
export type CardRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    variant?: string;
    size?: string;
    className?: string;
    props?: any;
};

const CardRoot = ({ children, customRootClass, className = '', variant = '', size = '', ...props }: CardRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = useCreateDataAttribute('card', { variant, size });

    return (
        <div className={clsx(rootClass, className)} {...dataAttributes()} {...props} >
            {children}
        </div>
    );
};

CardRoot.displayName = COMPONENT_NAME;

export default CardRoot;
