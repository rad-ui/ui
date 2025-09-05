import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AvatarPrimitiveFallback = React.forwardRef<HTMLSpanElement, AvatarPrimitiveFallbackProps>(({ children, asChild = false, className = '', ...props }, ref) => {
    const { isImageLoaded } = useContext(AvatarPrimitiveContext);
    if (isImageLoaded) return null;
    return <Primitive.span ref={ref} asChild={asChild} className={className} {...props}>{children}</Primitive.span>;
});

AvatarPrimitiveFallback.displayName = 'AvatarPrimitiveFallback';

export default AvatarPrimitiveFallback;
