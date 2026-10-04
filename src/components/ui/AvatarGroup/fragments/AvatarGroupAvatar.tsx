'use client';

import React, { useContext } from 'react';
import clsx from 'clsx';
import AvatarPrimitiveImage, { AvatarRootImageProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';

export type AvatarGroupAvatarProps = AvatarRootImageProps;

const AvatarGroupAvatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitiveImage>, AvatarGroupAvatarProps>(({ src, alt, className, ...props }, ref) => {
    const { rootClass } = useContext(AvatarGroupContext);
    const mergedClassName = clsx(rootClass && `${rootClass}-avatar`, className) || undefined;
    return <AvatarPrimitiveImage ref={ref} className={mergedClassName} src={src} alt={alt} {...props} />;
});

AvatarGroupAvatar.displayName = 'AvatarGroupAvatar';

export default AvatarGroupAvatar;
