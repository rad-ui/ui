'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveRoot from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';

const AvatarGroupItem = ({ children }: { children: React.ReactNode }) => {
    const { rootClass } = useContext(AvatarGroupContext);
    return <AvatarPrimitiveRoot className={`${rootClass}-item`}>
        {children}
    </AvatarPrimitiveRoot>;
};

export default AvatarGroupItem;
