import React, { useContext } from 'react';
import { clsx } from 'clsx';

import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    className?: string | '';
    color?: string;
}

const AvatarPrimitiveFallback = ({ children, className = '', color = '' }: AvatarPrimitiveFallbackProps) => {
    const { hasError, fallBackRootClass } = useContext(AvatarPrimitiveContext);

    if (!hasError) {
        return null;
    }

    return <span className={clsx(fallBackRootClass, className)} data-accent-color={color} >{children}</span>;
};

export default AvatarPrimitiveFallback;
