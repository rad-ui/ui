import React, { useState } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';

export interface AvatarPrimitiveRootProps {
    children: React.ReactNode;
    asChild?: boolean;
}

const AvatarPrimitiveRoot = React.forwardRef<HTMLSpanElement, AvatarPrimitiveRootProps>(({ children, asChild = false, ...props }, ref) => {
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
        setHasError,
        handleLoadImage,
        handleErrorImage
    };

    return <AvatarPrimitiveContext.Provider value={values} >
        <Primitive.span ref={ref} asChild={asChild} {...props}>{children}</Primitive.span>
    </AvatarPrimitiveContext.Provider>;
});

AvatarPrimitiveRoot.displayName = 'AvatarPrimitiveRoot';

export default AvatarPrimitiveRoot;
