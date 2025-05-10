'use client';

import React from 'react';
import AvatarPrimitiveImage from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';

const AvatarGroupAvatar = ({ src, alt }: { src: string, alt: string }) => {
    return <AvatarPrimitiveImage src={src} alt={alt} />;
};

export default AvatarGroupAvatar;
