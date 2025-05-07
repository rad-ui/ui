'use client';

import React, { useContext } from 'react';

import AvatarPrimitiveFallback, { AvatarPrimitiveFallbackProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';
import { AvatarContext } from '../contexts/AvatarContext';
import { clsx } from 'clsx';

const AvatarFallback = ({ children, ...props }: AvatarPrimitiveFallbackProps) => {
    const { size, variant, color, fallback, src, alt, rootClass } = useContext(AvatarContext);
    return <AvatarPrimitiveFallback className={clsx(`${rootClass}-fallback`)} {...props}>{children}</AvatarPrimitiveFallback>;
};

export default AvatarFallback;
