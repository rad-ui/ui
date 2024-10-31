import React from 'react';

export interface AvatarPrimitiveRootProps {
    children: React.ReactNode;
    className?: string;
}

const AvatarPrimitiveRoot = ({ children, className = '' }: AvatarPrimitiveRootProps) => {
    return <div className={className}>{children}</div>;
};

export default AvatarPrimitiveRoot;
