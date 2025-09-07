'use client';

import React, { forwardRef, useContext, useEffect, useRef } from 'react';
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
    id,
    ...props
}, ref) => {
    const { rootClass, setTitleId, titleId: currentTitleId } = useContext(AlertDialogContext);
    const titleId = id ?? Floater.useId();
    const titleIdRef = useRef(titleId);

    useEffect(() => {
        titleIdRef.current = titleId;
        if (titleId) {
            setTitleId(titleId);
        }

        // Cleanup: clear the titleId when this component unmounts
        // Only clear if the stored id still matches to avoid clobbering other instances
        return () => {
            if (currentTitleId === titleIdRef.current) {
                setTitleId(undefined);
            }
        };
    }, [titleId, setTitleId, currentTitleId]);

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
