'use client';
import React, { forwardRef } from 'react';
import AvatarPrimitiveRoot from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AvatarContext } from '../contexts/AvatarContext';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
const COMPONENT_NAME = 'Avatar';

export type AvatarRootProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot> & {
    customRootClass?: string;
    className?: string;
    size?: string;
    variant?: string;
    color?: string;
};

const AvatarRoot = forwardRef<
    React.ElementRef<typeof AvatarPrimitiveRoot>,
    AvatarRootProps
>(({ children, customRootClass = '', className = '', size = '', variant = '', color = '', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('avatar', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <AvatarContext.Provider value={{ size, variant, color, rootClass }}>
        <AvatarPrimitiveRoot ref={ref} className={clsx(rootClass, className)} {...composedAttributes()} {...props} >{children}</AvatarPrimitiveRoot>
    </AvatarContext.Provider>;
});

AvatarRoot.displayName = COMPONENT_NAME;

export default AvatarRoot;
