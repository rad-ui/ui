import React from 'react';
import { clsx } from 'clsx';
import AvatarPrimitive from '~/core/primitives/Avatar';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Avatar';

export type AvatarProps = {

    customRootClass?: string,
    fallback?: string,
    className?: string,
    variant?: string;
    size?:string;
    src?: string,
    alt?: string,
    color?:string,
    asChild?: boolean,
    props?: Record<string, any>[]
}

const Avatar = ({ customRootClass = '', fallback, className, src, alt, variant = '', size = '', asChild = false, color = '', ...props }: AvatarProps) => {
    const dataAttributes = useCreateDataAttribute('avatar', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());
    return (
        <AvatarPrimitive.Root customRootClass={customRootClass} asChild={asChild} {...composedAttributes()}>
            <AvatarPrimitive.Image
                src={src}
                alt={alt}
                className={clsx(className)}
                {...props}
            />
            <AvatarPrimitive.Fallback color={color}>
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
