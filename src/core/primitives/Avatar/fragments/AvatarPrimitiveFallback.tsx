import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AvatarPrimitiveFallback = ({ children, asChild = false, className = '', ...props }: AvatarPrimitiveFallbackProps) => {
    const { isImageLoaded } = useContext(AvatarPrimitiveContext);
    if (isImageLoaded) return null;
    return <Primitive.span asChild={asChild} className={className} {...props}>{children}</Primitive.span>;
};

export default AvatarPrimitiveFallback;
