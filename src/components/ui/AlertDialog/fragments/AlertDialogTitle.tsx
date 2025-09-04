'use client';

import React, { useContext, forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Primitive from '~/core/primitives/Primitive';

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<'h2'> & {
    className?: string;
};

const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return <Primitive.h2 ref={ref} className={clsx(`${rootClass}-title`, className)} {...props}>{children}</Primitive.h2>;
});

AlertDialogTitle.displayName = 'AlertDialogTitle';

export default AlertDialogTitle;
