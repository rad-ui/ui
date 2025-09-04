'use client';

import React, { forwardRef, useContext } from 'react';
import AvatarPrimitiveImage from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';
import { AvatarContext } from '../contexts/AvatarContext';
import { clsx } from 'clsx';

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitiveImage>;

const AvatarImage = forwardRef<
    React.ElementRef<typeof AvatarPrimitiveImage>,
    AvatarImageProps
>(({ src = '', alt = '', ...props }, ref) => {
    const { rootClass } = useContext(AvatarContext);
    return <AvatarPrimitiveImage ref={ref} className={clsx(`${rootClass}-image`)} src={src} alt={alt} {...props} />;
});

AvatarImage.displayName = 'AvatarImage';

export default AvatarImage;
