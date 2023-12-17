'use client';
const COMPONENT_NAME = 'Avatar';

import React, {useEffect, useState} from 'react';

import AvatarRoot from './shards/AvatarRoot';
import AvatarImage from './shards/AvatarImage';
import AvatarFallback from './shards/AvatarFallback';

const Avatar = ({children, customRootClass = '', fallback='', onImageLoadFailure=() => {}, onImageLoadSuccess=() => {}, className = '', src='', alt, ...props}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(src.length?true:false);

    const handleImageLoaded = () => {
        onImageLoadSuccess(src);
        setIsImageLoaded(true);
    };

    const handleImageError = () => {
        setIsImageLoaded(false);
        onImageLoadFailure(src);
    };

    return (
        <AvatarRoot customRootClass={customRootClass}>
            {isImageLoaded && <AvatarImage src={src} alt={alt} className={className} customRootClass={customRootClass} onError={handleImageError}
                onLoad={handleImageLoaded}
                {...props} />}
            {!isImageLoaded && <AvatarFallback customRootClass={customRootClass} fallback={fallback}/>}
        </AvatarRoot>
    );
};

Avatar.displayName = COMPONENT_NAME;
Avatar.Root = AvatarRoot;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export default Avatar;
