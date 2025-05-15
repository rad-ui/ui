'use client';

import React, { useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Primitive from '~/core/primitives/Primitive';

const AlertDialogDescription = ({ children }: { children: React.ReactNode }) => {
    const { rootClass } = useContext(AlertDialogContext);
    return <Primitive.p className={`${rootClass}-description`}>{children}</Primitive.p>;
};

export default AlertDialogDescription;
