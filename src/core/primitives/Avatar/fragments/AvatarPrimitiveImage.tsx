import React, { useContext, useEffect } from 'react';
import { clsx } from 'clsx';

import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarRootImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    className?: string | '';
    status?: 'loading' | 'loaded' | 'error';
}

const AvatarPrimitiveImage = ({
    src,
    alt = 'Avatar',
    className = '',
    ...props
}: AvatarRootImageProps) => {
    const { handleErrorImage, handleLoadImage, hasError } = useContext(AvatarPrimitiveContext);

    // If there's no src or there's an error, render nothing
    if (hasError) {
        return null;
    }
    useEffect(() => {
        if (!src && !hasError) {
            handleErrorImage();
        }
    }, [src, handleErrorImage, hasError]);

    return (
        <img
            src={src}
            alt={alt}
            onError={handleErrorImage}
            onLoad={handleLoadImage}
            className={clsx(className)}
            {...props}
        />
    );
};

export default AvatarPrimitiveImage;
