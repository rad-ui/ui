'use client';

import React, { forwardRef, useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Primitive from '~/core/primitives/Primitive';

type AlertDialogDescriptionElement = React.ElementRef<typeof Primitive.p>;
type PrimitivePProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

export type AlertDialogDescriptionProps = PrimitivePProps & { className?: string };

const AlertDialogDescription = forwardRef<AlertDialogDescriptionElement, AlertDialogDescriptionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return <Primitive.p ref={ref} className={`${rootClass}-description ${className}`} {...props}>{children}</Primitive.p>;
});

export default AlertDialogDescription;
