import React from 'react';
import { clsx } from 'clsx';
import AvatarGroupRoot from './fragments/AvatarGroupRoot';
import AvatarPrimitiveRoot from '~/core/primitives/Avatar/fragments/AvatarPrimitiveRoot';
import AvatarPrimitiveFallback from '~/core/primitives/Avatar/fragments/AvatarPrimitiveFallback';
import AvatarPrimitiveImage from '~/core/primitives/Avatar/fragments/AvatarPrimitiveImage';

const COMPONENT_NAME = 'AvatarGroup';

// contexts

export type AvatarGroupProps = {
    avatars: { fallback: string, src: string, alt: string }[];
    size: 'sm' | 'md' | 'lg';
    customRootClass?: string;
    className?: string;
    props?: Record<string, any>;
}

const AvatarGroup = ({ avatars = [], size, customRootClass = '', className, ...props }: AvatarGroupProps) => {
    return <AvatarGroupRoot customRootClass={customRootClass} className={clsx(className)} {...props} >
        {avatars.map((avatar, index) => (
            <AvatarPrimitiveRoot key={index}>
                <AvatarPrimitiveImage src={avatar.src} alt={avatar.alt} />
                <AvatarPrimitiveFallback>{avatar.fallback}</AvatarPrimitiveFallback>
            </AvatarPrimitiveRoot>
        ))}
    </AvatarGroupRoot>;
};

AvatarGroup.displayName = COMPONENT_NAME;
AvatarGroup.Root = AvatarGroupRoot;
AvatarGroup.AvatarRoot = AvatarPrimitiveRoot;
AvatarGroup.AvatarImage = AvatarPrimitiveImage;
AvatarGroup.AvatarFallback = AvatarPrimitiveFallback;

export default AvatarGroup;
