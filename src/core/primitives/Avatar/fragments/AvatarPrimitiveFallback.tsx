import React from 'react';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    className?: string;
}

const AvatarPrimitiveFallback = ({ children, className = '' }: AvatarPrimitiveFallbackProps) => {
    return <div className={className}>{children}</div>;
};

export default AvatarPrimitiveFallback;
