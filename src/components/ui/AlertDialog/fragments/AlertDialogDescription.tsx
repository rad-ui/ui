'use client';

import React, { forwardRef, useContext, useEffect, useRef } from 'react';
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
    id,
    ...props
}, ref) => {
    const { rootClass, setDescriptionId, descriptionId: currentDescriptionId } = useContext(AlertDialogContext);
    const descriptionId = id ?? Floater.useId();
    const descriptionIdRef = useRef(descriptionId);

    useEffect(() => {
        descriptionIdRef.current = descriptionId;
        if (descriptionId) {
            setDescriptionId(descriptionId);
        }

        // Cleanup: clear the descriptionId when this component unmounts
        // Only clear if the stored id still matches to avoid clobbering other instances
        return () => {
            if (currentDescriptionId === descriptionIdRef.current) {
                setDescriptionId(undefined);
            }
        };
    }, [descriptionId, setDescriptionId, currentDescriptionId]);

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
