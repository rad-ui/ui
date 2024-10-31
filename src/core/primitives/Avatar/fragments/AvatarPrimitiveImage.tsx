import React, { useContext } from 'react';

import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarRootImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    className?: string;
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
    if (!src || hasError) {
        return null;
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={handleErrorImage}
            onLoad={handleLoadImage}
            className={className}
            {...props}
        />
    );
};

export default AvatarPrimitiveImage;
