const COMPONENT_NAME = 'Avatar';

import React from 'react';

import AvatarRoot from './shards/AvatarRoot';
import AvatarImage from './shards/AvatarImage';
import AvatarFallback from './shards/AvatarFallback';

export interface AvatarProps {
    children?: React.ReactNode;
    customRootClass?: string;
    fallback?: string;
    className?: string;
    src?: string;
    alt?: string;
    Root?: React.FC<AvatarRootProps>;
    Image?: React.FC<AvatarImageProps>;
    Fallback?: React.FC<AvatarFallbackProps>;
}


const Avatar: React.FC<AvatarProps> = ({children, customRootClass = '', fallback='', className = '', src='', alt, ...props}) => {
    return (
        <AvatarRoot customRootClass={customRootClass}>
            <AvatarImage
                src={src}
                alt={alt}
                className={className}
                customRootClass={customRootClass}
                {...props}
            />
            <AvatarFallback customRootClass={customRootClass} fallback={fallback}/>
        </AvatarRoot>
    );
};

Avatar.displayName = COMPONENT_NAME;
Avatar.Root = AvatarRoot;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export default Avatar;
