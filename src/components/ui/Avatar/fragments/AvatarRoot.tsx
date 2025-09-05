'use client';
import React from 'react';
import AvatarPrimitiveRoot, { AvatarPrimitiveRootProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AvatarContext } from '../contexts/AvatarContext';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
const COMPONENT_NAME = 'Avatar';

export type AvatarRootProps = AvatarPrimitiveRootProps & {
    customRootClass?: string;
    className?: string;
    size?: string;
    variant?: string;
    color?: string;
};

type AvatarRootElement = React.ElementRef<typeof AvatarPrimitiveRoot>;

const AvatarRoot = React.forwardRef<AvatarRootElement, AvatarRootProps>(({ children, customRootClass = '', className = '', size = '', variant = '', color = '', ...props }, ref) => {
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
