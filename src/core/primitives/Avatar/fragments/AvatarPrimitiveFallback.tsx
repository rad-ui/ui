import React, { useContext } from 'react';
import { clsx } from 'clsx';

import { AvatarPrimitiveContext } from '../contexts/AvatarPrimitiveContext';
import Primitive from '~/core/primitives/Primitive';

export interface AvatarPrimitiveFallbackProps {
    children: React.ReactNode;
    className?: string | '';
    color?: string;
    asChild?: boolean;
}

const AvatarPrimitiveFallback = ({ children, className = '', color = '',asChild = false }: AvatarPrimitiveFallbackProps) => {
    const { hasError, fallBackRootClass } = useContext(AvatarPrimitiveContext);

    if (!hasError) {
        return null;
    }

    return <Primitive.span className={clsx(fallBackRootClass, className)} data-accent-color={color} asChild={asChild}>{children}</Primitive.span>;
};

export default AvatarPrimitiveFallback;
