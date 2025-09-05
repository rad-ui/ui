'use client';

import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Primitive from '~/core/primitives/Primitive';

const AlertDialogDescription = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const { rootClass } = useContext(AlertDialogContext);
    return <Primitive.p className={`${rootClass}-description ${className}`}>{children}</Primitive.p>;
};

export default AlertDialogDescription;
