'use client';

import React, { useContext } from 'react';
import { DialogContext } from '../context/DialogContext';

import Primitive from '~/core/primitives/Primitive';

const DialogDescription = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const { rootClass } = useContext(DialogContext);
    return <Primitive.p className={`${rootClass}-description ${className}`}>{children}</Primitive.p>;
};

export default DialogDescription;
