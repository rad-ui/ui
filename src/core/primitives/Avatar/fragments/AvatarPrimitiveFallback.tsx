import React, { useContext } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    className?: string | '';
}

const AvatarPrimitiveFallback = ({ children, className = '' }: AvatarPrimitiveFallbackProps) => {
    const { hasError, fallBackRootClass } = useContext(AvatarPrimitiveContext);

    if (!hasError) {
        return null;
    }

    return <span className={`${fallBackRootClass} ${className}`}>{children}</span>;
};

export default AvatarPrimitiveFallback;
