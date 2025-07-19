'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveFallback from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';

export type AvatarGroupFallbackProps = {
    children: React.ReactNode
    fallback?: string
}

const AvatarGroupFallback = ({ children }: AvatarGroupFallbackProps) => {
    const { rootClass } = useContext(AvatarGroupContext);
    return <AvatarPrimitiveFallback className={`${rootClass}-fallback`}>
        {children}
    </AvatarPrimitiveFallback>;
};

export default AvatarGroupFallback;
