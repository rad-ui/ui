import React, { useContext } from 'react';
import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    className?: string;
}

const AvatarPrimitiveFallback = ({ children, className = '' }: AvatarPrimitiveFallbackProps) => {
    const { hasError } = useContext(AvatarPrimitiveContext);

    if (!hasError) {
        return null;
    }

    return <div className={className}>{children}</div>;
};

export default AvatarPrimitiveFallback;
