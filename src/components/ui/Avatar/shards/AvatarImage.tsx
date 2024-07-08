import React, {useEffect, useState} from 'react';
import {customClassSwitcher} from '~/core';

type AvatarImageProps = {
    src?: string;
    alt?: string;
    className?: string;
    customRootClass?: string;
    props?: Record<string, any>[]
};

const AvatarImage = ({src, alt, customRootClass, className, ...props}: AvatarImageProps) => {
    const rootClass = customClassSwitcher(customRootClass, 'Avatar');

    const [isBrokenImage, setIsBrokenImage] = useState(false);

    const handleImageLoaded = () => {
        setIsBrokenImage(false);
    };

    const handleImageError = () => {
        setIsBrokenImage(true);
    };

    useEffect(() => {
    }, [isBrokenImage]);

    if (isBrokenImage || !src || src.length===0) {
        return <></>;
    }


    return (
        <img src={src} alt={alt} onError={handleImageError} onLoad={handleImageLoaded} className={`${rootClass} ${className}`} {...props} />
    );
};

export default AvatarImage;
