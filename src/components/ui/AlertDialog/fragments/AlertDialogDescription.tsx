'use client';

import React, { forwardRef, useContext, useEffect } from 'react';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import Floater from '~/core/primitives/Floater';

import Primitive from '~/core/primitives/Primitive';

type AlertDialogDescriptionElement = React.ElementRef<typeof Primitive.p>;
type PrimitivePProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

export type AlertDialogDescriptionProps = PrimitivePProps & {
    className?: string;
    asChild?: boolean;
};

const AlertDialogDescription = forwardRef<AlertDialogDescriptionElement, AlertDialogDescriptionProps>(({
    children,
    className = '',
    asChild = false,
    ...props
}, ref) => {
    const { rootClass, setDescriptionId } = useContext(AlertDialogContext);
    const descriptionId = Floater.useId();

    useEffect(() => {
        if (descriptionId) {
            setDescriptionId(descriptionId);
        }
    }, [descriptionId, setDescriptionId]);

    return (
        <Primitive.p
            ref={ref}
            id={descriptionId}
            className={`${rootClass}-description ${className}`}
            asChild={asChild}
            {...props}
        >
            {children}
        </Primitive.p>
    );
});

AlertDialogDescription.displayName = 'AlertDialogDescription';

export default AlertDialogDescription;
