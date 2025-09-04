'use client';

import React, { useContext, forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Primitive from '~/core/primitives/Primitive';

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<'p'> & {
    className?: string;
};

const AlertDialogDescription = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return <Primitive.p ref={ref} className={clsx(`${rootClass}-description`, className)} {...props}>{children}</Primitive.p>;
});

AlertDialogDescription.displayName = 'AlertDialogDescription';

export default AlertDialogDescription;
