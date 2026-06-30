import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';
import { createDataAttributes, composeAttributes } from '~/core/hooks/createDataAttribute';
import Primitive from '~/core/primitives/Primitive';

export type AvatarGroupRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    customRootClass?: string | '';
    size?: string;
    variant?: string;
};

const COMPONENT_NAME = 'AvatarGroup';

const AvatarGroupRoot = React.forwardRef<React.ElementRef<typeof Primitive.div>, AvatarGroupRootProps>(({ customRootClass = '', size = '', variant = '', children, className = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const dataAttributes = createDataAttributes('avatar', { variant, size });
    const composedAttributes = composeAttributes(dataAttributes);

    return (
        <AvatarGroupContext.Provider value={{ size, variant, rootClass }}>
            <Primitive.div ref={ref} className={clsx(rootClass, className)} {...composedAttributes} {...props}>
                {children}
            </Primitive.div>
        </AvatarGroupContext.Provider>
    );
});

AvatarGroupRoot.displayName = COMPONENT_NAME;

export default AvatarGroupRoot;
