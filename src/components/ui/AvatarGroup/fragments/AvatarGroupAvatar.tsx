'use client';

import React from 'react';
import AvatarPrimitiveImage from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';

export type AvatarGroupAvatarProps = {
    src: string;
    alt: string;
}

const AvatarGroupAvatar = ({ src, alt }: AvatarGroupAvatarProps) => {
    return <AvatarPrimitiveImage src={src} alt={alt} />;
};

export default AvatarGroupAvatar;
