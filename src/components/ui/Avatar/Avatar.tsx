import React from 'react';

import AvatarRoot from './shards/AvatarRoot';
import AvatarImage from './shards/AvatarImage';
import AvatarFallback from './shards/AvatarFallback';

const COMPONENT_NAME = 'Avatar';

export type AvatarProps = {
    children?: React.ReactNode,
    customRootClass?: string,
    fallback?: string,
    className?: string,
    src?: string,
    alt?: string,
    props?: Record<string, any>[]
}

const Avatar = ({ children, customRootClass, fallback, className, src, alt, ...props }: AvatarProps) => {
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
