'use client';

import React, { useContext } from 'react';
import AvatarPrimitiveImage, { AvatarRootImageProps } from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';
import { AvatarContext } from '../contexts/AvatarContext';
import { clsx } from 'clsx';

export type AvatarImageProps = AvatarRootImageProps & {
    src?: string;
    alt?: string;
};

type AvatarImageElement = React.ElementRef<typeof AvatarPrimitiveImage>;

const AvatarImage = React.forwardRef<AvatarImageElement, AvatarImageProps>(({ src = '', alt = '', ...props }, ref) => {
    const { rootClass } = useContext(AvatarContext);
    return <AvatarPrimitiveImage ref={ref} className={clsx(`${rootClass}-image`)} src={src} alt={alt} {...props} />;
});

AvatarImage.displayName = 'AvatarImage';

export default AvatarImage;
