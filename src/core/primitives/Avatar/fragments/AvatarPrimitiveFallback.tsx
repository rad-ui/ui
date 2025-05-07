import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { AvatarGroupContext } from '~/components/ui/AvatarGroup/contexts/AvatarGroupContext';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

const AvatarPrimitiveFallback = ({ children, asChild = false, className = '', ...props }: AvatarPrimitiveFallbackProps) => {
    const { hasError } = useContext(AvatarGroupContext);
    if (!hasError) return null;
    return <Primitive.span asChild={asChild} className={className} {...props}>{children}</Primitive.span>;
};

export default AvatarPrimitiveFallback;
