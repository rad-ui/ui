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
    const generatedId = Floater.useId();
    const descriptionId = id ?? generatedId;
    const descriptionIdRef = useRef(descriptionId);
    const latestCurrentDescriptionIdRef = useRef(currentDescriptionId);

    // Update the latest current description ID ref whenever it changes
    useEffect(() => {
        latestCurrentDescriptionIdRef.current = currentDescriptionId;
    }, [currentDescriptionId]);

    useEffect(() => {
        descriptionIdRef.current = descriptionId;
        if (descriptionId) {
            setDescriptionId(descriptionId);
        }

        // Cleanup: clear the descriptionId when this component unmounts
        // Only clear if the stored id still matches to avoid clobbering other instances
        return () => {
            if (latestCurrentDescriptionIdRef.current === descriptionIdRef.current) {
                setDescriptionId(undefined);
            }
        };
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
