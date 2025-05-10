'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveImage, { AvatarRootImageProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';
import { AvatarContext } from '../contexts/AvatarContext';
import { clsx } from 'clsx';

type AvatarImageProps = AvatarRootImageProps & {
    src?: string;
    alt?: string;
}

const AvatarImage = ({ src = '', alt = '', ...props }: AvatarImageProps) => {
    const { rootClass } = useContext(AvatarContext);
    return <AvatarPrimitiveImage className={clsx(`${rootClass}-image`)} src={src} alt={alt} {...props} />;
};

export default AvatarImage;
