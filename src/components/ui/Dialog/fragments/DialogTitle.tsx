'use client';

import React, { useContext } from 'react';
import { DialogContext } from '../context/DialogContext';

import Primitive from '~/core/primitives/Primitive';

type DialogTitleProps = {
    children: React.ReactNode;
    className?: string;
}

const DialogTitle = ({ children, className = '' }: DialogTitleProps) => {
    const { rootClass } = useContext(DialogContext);
    return <Primitive.h2 className={`${rootClass}-title ${className}`}>{children}</Primitive.h2>;
};

export default DialogTitle;
