'use client';

import React, { forwardRef, useContext, useEffect } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import Floater from '~/core/primitives/Floater';

import Primitive from '~/core/primitives/Primitive';

type AlertDialogTitleElement = React.ElementRef<typeof Primitive.h2>;
type PrimitiveH2Props = React.ComponentPropsWithoutRef<typeof Primitive.h2>;

export type AlertDialogTitleProps = PrimitiveH2Props & {
    className?: string;
    asChild?: boolean;
};

const AlertDialogTitle = forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(({
    children,
    className = '',
    asChild = false,
    ...props
}, ref) => {
    const { rootClass, setTitleId } = useContext(AlertDialogContext);
    const titleId = Floater.useId();

    useEffect(() => {
        if (titleId) {
            setTitleId(titleId);
        }
    }, [titleId, setTitleId]);

    return (
        <Primitive.h2
            ref={ref}
            id={titleId}
            className={`${rootClass}-title ${className}`}
            asChild={asChild}
            {...props}
        >
            {children}
        </Primitive.h2>
    );
});

AlertDialogTitle.displayName = 'AlertDialogTitle';

export default AlertDialogTitle;
