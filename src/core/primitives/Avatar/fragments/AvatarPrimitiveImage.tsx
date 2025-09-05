import React, { useContext, useEffect } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';

export interface AvatarRootImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
}

type PrimitiveImg = React.ForwardRefExoticComponent<React.ImgHTMLAttributes<HTMLImageElement> & React.RefAttributes<HTMLImageElement>>;
const PrimitiveImg = Primitive.img as PrimitiveImg;

const AvatarPrimitiveImage = React.forwardRef<HTMLImageElement, AvatarRootImageProps>(({ src = '', alt = '', ...props }, ref) => {
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
        <PrimitiveImg ref={ref} src={src} alt={alt} onError={handleErrorImage} onLoad={handleLoadImage} {...props} />
    );
});

AvatarPrimitiveImage.displayName = 'AvatarPrimitiveImage';

export default AvatarPrimitiveImage;
