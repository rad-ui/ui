'use client';

import React, { useContext } from 'react';

import AvatarPrimitiveFallback, { AvatarPrimitiveFallbackProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';
import { AvatarContext } from '../contexts/AvatarContext';
import { clsx } from 'clsx';

type AvatarFallbackProps = AvatarPrimitiveFallbackProps & {
    className?: string;
};

type AvatarFallbackElement = React.ElementRef<typeof AvatarPrimitiveFallback>;

const AvatarFallback = React.forwardRef<AvatarFallbackElement, AvatarFallbackProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AvatarContext);
    return <AvatarPrimitiveFallback ref={ref} className={clsx(`${rootClass}-fallback`, className)} {...props}>{children}</AvatarPrimitiveFallback>;
});

AvatarFallback.displayName = 'AvatarFallback';

export default AvatarFallback;
