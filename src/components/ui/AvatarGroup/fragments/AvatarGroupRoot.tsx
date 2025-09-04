import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';
import { useCreateDataAttribute, useComposeAttributes } from '~/core/hooks/createDataAttribute';

export type AvatarGroupRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string | '';
    size?: string;
    variant?: string;
};

const COMPONENT_NAME = 'AvatarGroup';

const AvatarGroupRoot = React.forwardRef<HTMLDivElement, AvatarGroupRootProps>(({ customRootClass = '', size = '', variant = '', children, className = '', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = useCreateDataAttribute('avatar', { variant, size });
    const composedAttributes = useComposeAttributes(dataAttributes());

    return (
        <AvatarGroupContext.Provider value={{ size, variant, rootClass }}>
            <div ref={ref} className={clsx(rootClass, className)} {...composedAttributes()} {...props}>
                {children}
            </div>
        </AvatarGroupContext.Provider>
    );
});

AvatarGroupRoot.displayName = COMPONENT_NAME;

export default AvatarGroupRoot;
