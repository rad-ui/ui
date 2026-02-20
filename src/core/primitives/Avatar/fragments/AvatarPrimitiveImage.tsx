import React, { useContext, useEffect } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';

export type AvatarRootImageProps = React.ComponentPropsWithoutRef<typeof Primitive.img> & {
    src?: string;
    alt?: string;
};

const AvatarPrimitiveImage = React.forwardRef<React.ElementRef<typeof Primitive.img>, AvatarRootImageProps>(({ src = '', alt = '', ...props }, ref) => {
    const { handleErrorImage, handleLoadImage, hasError } = useContext(AvatarPrimitiveContext);
    if (hasError) {
        return null;
    }
    useEffect(() => {
        if (!src) {
            handleErrorImage();
        }
    }, [src, handleErrorImage, hasError]);

    return (
        // @ts-ignore
        <Primitive.img ref={ref} src={src} alt={alt} onError={handleErrorImage} onLoad={handleLoadImage} {...props} />
    );
});

AvatarPrimitiveImage.displayName = 'AvatarPrimitiveImage';

export default AvatarPrimitiveImage;
