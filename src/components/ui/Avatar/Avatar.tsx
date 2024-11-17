import React from 'react';

import AvatarPrimitive from '~/core/primitives/Avatar';

const COMPONENT_NAME = 'Avatar';

export type AvatarProps = {

    customRootClass?: string,
    fallback?: string,
    className?: string,
    src?: string,
    alt?: string,
    props?: Record<string, any>[]
}

const Avatar = ({ customRootClass = '', fallback, className, src, alt, ...props }: AvatarProps) => {
    return (
        <AvatarPrimitive.Root src={src} customRootClass={customRootClass} {...props}>
            <AvatarPrimitive.Image
                src={src}
                alt={alt}
                className={className}
            />
            <AvatarPrimitive.Fallback>
                {fallback}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
};

Avatar.displayName = COMPONENT_NAME;
Avatar.Root = AvatarPrimitive.Root;
Avatar.Image = AvatarPrimitive.Image;
Avatar.Fallback = AvatarPrimitive.Fallback;

export default Avatar;
