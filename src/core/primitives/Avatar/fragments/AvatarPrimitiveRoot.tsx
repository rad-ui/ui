import React, { useState, useEffect } from 'react';

import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarPrimitiveRootProps {
    children: React.ReactNode;
    className?: string;
}

const AvatarPrimitiveRoot = ({ children, className = '' }: AvatarPrimitiveRootProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

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
        handleLoadImage,
        handleErrorImage
    };
    useEffect(() => {
    }, [isImageLoaded, hasError]);

    return <AvatarPrimitiveContext.Provider value={values}>
        <div className={className}>{children}</div>
    </AvatarPrimitiveContext.Provider>;
};

export default AvatarPrimitiveRoot;
