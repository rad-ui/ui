'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveFallback from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';
import { clsx } from 'clsx';

export type AvatarGroupFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitiveFallback>;

const AvatarGroupFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitiveFallback>, AvatarGroupFallbackProps>(({ children, className, ...props }, ref) => {
    const { rootClass } = useContext(AvatarGroupContext);
    return <AvatarPrimitiveFallback ref={ref} className={clsx(`${rootClass}-fallback`, className)} {...props}>
        {children}
    </AvatarPrimitiveFallback>;
});

AvatarGroupFallback.displayName = 'AvatarGroupFallback';

export default AvatarGroupFallback;
