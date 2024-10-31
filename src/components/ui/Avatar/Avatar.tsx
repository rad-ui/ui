import React from 'react';

import AvatarPrimitive from '~/core/primitives/Avatar';

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
        <AvatarPrimitive.Root src={src} customRootClass={customRootClass}>
            <AvatarPrimitive.Image
                src={src}
                alt={alt}
                className={className}
                {...props}
            />
            <AvatarPrimitive.Fallback>
                {fallback}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
};

Avatar.displayName = COMPONENT_NAME;
Avatar.Root = AvatarRoot;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export default Avatar;
