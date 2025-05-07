'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveFallback from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';

const AvatarGroupFallback = ({ children }: { fallback?: string, children: React.ReactNode }) => {
    const { rootClass } = useContext(AvatarGroupContext);
    return <AvatarPrimitiveFallback className={`${rootClass}-fallback`}>
        {children}
    </AvatarPrimitiveFallback>;
};

export default AvatarGroupFallback;
