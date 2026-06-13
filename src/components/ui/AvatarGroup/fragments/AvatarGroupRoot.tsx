import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';
import { createDataAttributes, composeAttributes } from '~/core/hooks/createDataAttribute';

export type AvatarGroupRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string | '';
    size?: string;
    variant?: string;
};

const COMPONENT_NAME = 'AvatarGroup';

const AvatarGroupRoot = React.forwardRef<HTMLDivElement, AvatarGroupRootProps>(({ customRootClass = '', size = '', variant = '', children, className = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const dataAttributes = createDataAttributes('avatar', { variant, size });
    const composedAttributes = composeAttributes(dataAttributes);

    return (
        <AvatarGroupContext.Provider value={{ size, variant, rootClass }}>
            <div ref={ref} className={clsx(rootClass, className)} {...composedAttributes} {...props}>
                {children}
            </div>
        </AvatarGroupContext.Provider>
    );
});

AvatarGroupRoot.displayName = COMPONENT_NAME;

export default AvatarGroupRoot;
