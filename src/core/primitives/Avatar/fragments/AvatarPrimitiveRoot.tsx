import React, { useState, useEffect } from 'react';

import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarPrimitiveRootProps {
    children: React.ReactNode;
    src?: string;
    className?: string;
}

const AvatarPrimitiveRoot = ({ children, className = '', src, ...props }: AvatarPrimitiveRootProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(!src);

    const handleLoadImage = () => {
        setIsImageLoaded(true);
        setHasError(false);
    };

    const handleErrorImage = () => {
        setIsImageLoaded(false);
        setHasError(true);
    };

    const values = {
        isImageLoaded,
        hasError,
        setHasError,
        handleLoadImage,
        handleErrorImage,
        src
    };

    return <AvatarPrimitiveContext.Provider value={values}>
        <span className={className} {...props}>{children}</span>
    </AvatarPrimitiveContext.Provider>;
};

export default AvatarPrimitiveRoot;
