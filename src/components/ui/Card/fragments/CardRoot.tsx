import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
const COMPONENT_NAME = 'Card';
export type CardRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
};

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(({ children, customRootClass, className = '', variant = '', size = '', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = createDataAttributes('card', { variant, size });

    return (
        <div ref={ref} className={clsx(rootClass, className)} {...dataAttributes} {...props} >
            {children}
        </div>
    );
});

CardRoot.displayName = COMPONENT_NAME;

export default CardRoot;
