import React, { useContext, useEffect } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';

export interface AvatarRootImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
}

const AvatarPrimitiveImage = ({
    src = '',
    alt = '',
    ...props
}: AvatarRootImageProps) => {
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
        <Primitive.img src={src} alt={alt} onError={handleErrorImage} onLoad={handleLoadImage} {...props} />
    );
};

export default AvatarPrimitiveImage;
