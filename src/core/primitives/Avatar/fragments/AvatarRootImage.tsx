import React, { useState } from 'react';

export interface AvatarRootImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    className?: string;
    fallback?: React.ReactNode;
    onError?: () => void;
    onLoad?: () => void;
}

const AvatarRootImage = ({
    src,
    alt = 'Avatar',
    className = '',
    fallback,
    onError,
    onLoad,
    ...props
}: AvatarRootImageProps) => {
    const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    const handleImageLoaded = () => {
        setImageStatus('loaded');
        onLoad?.();
    };

    const handleImageError = () => {
        setImageStatus('error');
        onError?.();
    };

    if (imageStatus === 'error' || !src) {
        return fallback || null;
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={handleImageError}
            onLoad={handleImageLoaded}
            className={className}
            {...props}
        />
    );
};

export default AvatarRootImage;
