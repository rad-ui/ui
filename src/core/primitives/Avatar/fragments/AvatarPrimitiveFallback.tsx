import React from 'react';
import Primitive from '~/core/primitives/Primitive';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AvatarPrimitiveFallback = ({ children, asChild = false, className = '', ...props }: AvatarPrimitiveFallbackProps) => {
    return <Primitive.span asChild={asChild} className={className} {...props}>{children}</Primitive.span>;
};

export default AvatarPrimitiveFallback;
