'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveRoot from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';
import { useCreateDataAccentColorAttribute, useComposeAttributes } from '~/core/hooks/createDataAttribute';

const AvatarGroupItem = ({ color = '', children }: { color?: string, children: React.ReactNode }) => {
    const { rootClass } = useContext(AvatarGroupContext);

    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(accentAttributes());

    return <AvatarPrimitiveRoot className={`${rootClass}-item`} {...composedAttributes()}>
        {children}
    </AvatarPrimitiveRoot>;
};

export default AvatarGroupItem;
