'use client';

import React from 'react';
import AvatarPrimitiveImage, { AvatarRootImageProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';

export type AvatarGroupAvatarProps = AvatarRootImageProps;

const AvatarGroupAvatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitiveImage>, AvatarGroupAvatarProps>(({ src, alt, ...props }, ref) => {
    return <AvatarPrimitiveImage ref={ref} src={src} alt={alt} {...props} />;
});

AvatarGroupAvatar.displayName = 'AvatarGroupAvatar';

export default AvatarGroupAvatar;
