'use client';
import React from 'react';
import AvatarPrimitiveRoot from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { AvatarContext } from '../contexts/AvatarContext';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
const COMPONENT_NAME = 'Avatar';

export type AvatarRootProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot> & {
    customRootClass?: string;
    className?: string;
    size?: string;
    variant?: string;
    color?: string;
}

const AvatarRoot = React.forwardRef<React.ElementRef<typeof AvatarPrimitiveRoot>, AvatarRootProps>(({ children, customRootClass = '', className = '', size = '', variant = '', color = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const dataAttributes = createDataAttributes('avatar', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    return <AvatarContext.Provider value={{ size, variant, color, rootClass }}>
        <AvatarPrimitiveRoot ref={ref} className={clsx(rootClass, className)} {...composedAttributes} {...props} >{children}</AvatarPrimitiveRoot>
    </AvatarContext.Provider>;
});

AvatarRoot.displayName = COMPONENT_NAME;

export default AvatarRoot;
