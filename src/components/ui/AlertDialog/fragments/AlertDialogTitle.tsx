'use client';

import React, { forwardRef, useContext } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Primitive from '~/core/primitives/Primitive';

type AlertDialogTitleElement = React.ElementRef<typeof Primitive.h2>;
type PrimitiveH2Props = React.ComponentPropsWithoutRef<typeof Primitive.h2>;

export type AlertDialogTitleProps = PrimitiveH2Props & {
    className?: string;
};

const AlertDialogTitle = forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    return <Primitive.h2 ref={ref} className={`${rootClass}-title ${className}`} {...props}>{children}</Primitive.h2>;
});

AlertDialogTitle.displayName = 'AlertDialogTitle';

export default AlertDialogTitle;
