import React, { forwardRef, useContext, useEffect } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';

const PrimitiveImg = Primitive.img as React.ForwardRefExoticComponent<
    React.ImgHTMLAttributes<HTMLImageElement> & React.RefAttributes<HTMLImageElement>
>;

export type AvatarRootImageProps = React.ComponentPropsWithoutRef<typeof PrimitiveImg> & {
    src?: string;
    alt?: string;
};

const AvatarPrimitiveImage = forwardRef<
    React.ElementRef<typeof PrimitiveImg>,
    AvatarRootImageProps
>(({ src = '', alt = '', ...props }, ref) => {
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
        <PrimitiveImg
            ref={ref}
            src={src}
            alt={alt}
            onError={handleErrorImage}
            onLoad={handleLoadImage}
            {...props}
        />
    );
});

AvatarPrimitiveImage.displayName = 'AvatarPrimitiveImage';

export default AvatarPrimitiveImage;
