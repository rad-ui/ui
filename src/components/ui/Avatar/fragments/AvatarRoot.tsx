'use client';
import React from 'react';
import AvatarPrimitiveRoot, { AvatarPrimitiveRootProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AvatarContext } from '../contexts/AvatarContext';

const COMPONENT_NAME = 'Avatar';

export type AvatarRootProps = AvatarPrimitiveRootProps & {
    customRootClass?: string;
    className?: string;
    size?: string;
    variant?: string;
    color?: string;
    fallback?: string;
    src?: string;
    alt?: string;
}

const AvatarRoot = ({ children, customRootClass = '', className = '', size = '', variant = '', color = '', fallback = '', src = '', alt = '', ...props }: AvatarRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <AvatarContext.Provider value={{ size, variant, color, fallback, src, alt, rootClass }}>
        <AvatarPrimitiveRoot className={clsx(rootClass, className)} {...props} >{children}</AvatarPrimitiveRoot>
    </AvatarContext.Provider>;
};

export default AvatarRoot;
