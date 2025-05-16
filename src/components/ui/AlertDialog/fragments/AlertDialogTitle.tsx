'use client';

import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Primitive from '~/core/primitives/Primitive';

const AlertDialogTitle = ({ children }: { children: React.ReactNode }) => {
    const { rootClass } = useContext(AlertDialogContext);
    return <Primitive.h2 className={`${rootClass}-title`}>{children}</Primitive.h2>;
};

export default AlertDialogTitle;
