'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveRoot from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';
import { useCreateDataAccentColorAttribute, useComposeAttributes } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

export type AvatarGroupItemProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot> & {
    color?: string;
};

const AvatarGroupItem = React.forwardRef<React.ElementRef<typeof AvatarPrimitiveRoot>, AvatarGroupItemProps>(({ color = '', children, className, ...props }, ref) => {
    const { rootClass } = useContext(AvatarGroupContext);

    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(accentAttributes());

    return <AvatarPrimitiveRoot ref={ref} className={clsx(`${rootClass}-item`, className)} {...composedAttributes()} {...props}>
        {children}
    </AvatarPrimitiveRoot>;
});

AvatarGroupItem.displayName = 'AvatarGroupItem';

export default AvatarGroupItem;
