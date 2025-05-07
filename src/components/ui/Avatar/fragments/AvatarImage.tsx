'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveImage, { AvatarRootImageProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';
import { AvatarContext } from '../contexts/AvatarContext';
import { clsx } from 'clsx';
const AvatarImage = ({ children, ...props }: AvatarRootImageProps) => {
    const { size, variant, color, fallback, src, alt, rootClass } = useContext(AvatarContext);
    return <AvatarPrimitiveImage className={clsx(`${rootClass}-image`)} {...props} />;
};

export default AvatarImage;
