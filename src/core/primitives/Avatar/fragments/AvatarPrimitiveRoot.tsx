import React, { useState, useEffect } from 'react';

import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import { customClassSwitcher } from '~/core/customClassSwitcher';

export interface AvatarPrimitiveRootProps {
    customRootClass?: string | '';
    children: React.ReactNode;
    src?: string;
    className?: string | '';
}

const AvatarPrimitiveRoot = ({ children, className = '', customRootClass = '', src, ...props }: AvatarPrimitiveRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, 'Avatar');
    const fallBackRootClass = customClassSwitcher(customRootClass, 'Fallback');
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
        rootClass,
        fallBackRootClass,
        isImageLoaded,
        hasError,
        setHasError,
        handleLoadImage,
        handleErrorImage,
        src
    };

    return <AvatarPrimitiveContext.Provider value={values} >
        <span className={`${rootClass} ${className}`} {...props}>{children}</span>
    </AvatarPrimitiveContext.Provider>;
};

export default AvatarPrimitiveRoot;
