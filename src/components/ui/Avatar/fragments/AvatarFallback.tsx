'use client';

import React, { useContext } from 'react';

import AvatarPrimitiveFallback, { AvatarPrimitiveFallbackProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';
import { AvatarContext } from '../contexts/AvatarContext';
import clsx from 'clsx';

type AvatarFallbackProps = AvatarPrimitiveFallbackProps & {
    className?: string;
}

const AvatarFallback = ({ children, className = '', ...props }: AvatarFallbackProps) => {
    const { rootClass } = useContext(AvatarContext);
    return <AvatarPrimitiveFallback className={clsx(`${rootClass}-fallback`, className)} {...props}>{children}</AvatarPrimitiveFallback>;
};

export default AvatarFallback;
