'use client';

import React from 'react';
import AvatarPrimitiveFallback from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';

const AvatarGroupFallback = ({ children }: { fallback?: string, children: React.ReactNode }) => {
    return <AvatarPrimitiveFallback>
        {children}
    </AvatarPrimitiveFallback>;
};

export default AvatarGroupFallback;
