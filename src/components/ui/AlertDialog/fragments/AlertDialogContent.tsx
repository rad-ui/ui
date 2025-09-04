'use client';
import React, { useContext, forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import { useMergeRefs } from '@floating-ui/react';

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<'div'> & {
    className?: string;
};

const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AlertDialogContext);
    const { isOpen, getFloatingProps, floaterContext, refs } = useContext(DialogPrimitiveContext);
    const mergedRef = useMergeRefs([refs.setFloating as any, ref]);

    if (!isOpen) return null;

    return (
        <Floater.FocusManager context={floaterContext} returnFocus={true}>
            <div ref={mergedRef} className={clsx(`${rootClass}-content`, className)} {...getFloatingProps()} {...props}>
                {children}
            </div>
        </Floater.FocusManager>
    );
});

AlertDialogContent.displayName = 'AlertDialogContent';

export default AlertDialogContent;
