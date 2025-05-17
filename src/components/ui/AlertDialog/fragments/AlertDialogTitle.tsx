'use client';

import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Primitive from '~/core/primitives/Primitive';

type AlertDialogTitleProps = {
    children: React.ReactNode;
    className?: string;
}

const AlertDialogTitle = ({ children, className = '' }: AlertDialogTitleProps) => {
    const { rootClass } = useContext(AlertDialogContext);
    return <Primitive.h2 className={`${rootClass}-title ${className}`}>{children}</Primitive.h2>;
};

export default AlertDialogTitle;
