'use client';

import React, { forwardRef, useContext } from 'react';

import AvatarPrimitiveFallback from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';
import { AvatarContext } from '../contexts/AvatarContext';
import { clsx } from 'clsx';

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitiveFallback> & {
    className?: string;
};

const AvatarFallback = forwardRef<
    React.ElementRef<typeof AvatarPrimitiveFallback>,
    AvatarFallbackProps
>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AvatarContext);
    return <AvatarPrimitiveFallback ref={ref} className={clsx(`${rootClass}-fallback`, className)} {...props}>{children}</AvatarPrimitiveFallback>;
});

AvatarFallback.displayName = 'AvatarFallback';

export default AvatarFallback;
