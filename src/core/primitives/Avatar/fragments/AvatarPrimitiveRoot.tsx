import React, { useState } from 'react';
import { clsx } from 'clsx';

import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import Primitive from '~/core/primitives/Primitive';

export interface AvatarPrimitiveRootProps {
    customRootClass?: string | '';
    children: React.ReactNode;
    src?: string;
    className?: string | '';
    asChild?: boolean;
}

const AvatarPrimitiveRoot = ({ children, className = '', customRootClass = '', asChild = false, src, ...props }: AvatarPrimitiveRootProps) => {
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
        <Primitive.span className={clsx(rootClass, className)} asChild={asChild} {...props}>{children}</Primitive.span>
    </AvatarPrimitiveContext.Provider>;
};

export default AvatarPrimitiveRoot;
