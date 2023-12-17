'use client';
import React, {useState, useRef} from 'react';
const COMPONENT_NAME = 'Avatar';

import AvatarRoot from './shards/AvatarRoot';
import AvatarImage from './shards/AvatarImage';
import AvatarFallback from './shards/AvatarFallback';

const Avatar = ({children, customRootClass = '', fallback='', className = '', src, alt, ...props}) => {
    const imageRef = useRef(null);
    const [isImageLoaded, setIsImageLoaded] = useState(true);
    const handleImageLoaded = () => {
        setIsImageLoaded(true);
    };
    const handleImageError = () => {
        setIsImageLoaded(false);
    };
    return (
        <AvatarRoot customRootClass={customRootClass}>
            {isImageLoaded && <AvatarImage ref={imageRef} src={src} alt={alt} className={className} customRootClass={customRootClass} onError={handleImageError}
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
