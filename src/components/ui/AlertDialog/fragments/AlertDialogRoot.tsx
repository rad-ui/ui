'use client';
import React, { forwardRef, useState } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import clsx from 'clsx';
import { useControllableState } from '~/core/hooks/useControllableState';

import DialogPrimitive from '~/core/primitives/Dialog';
import { callOpenChange, type OpenChangeDetails } from '~/core/utils/openChangeDetails';

const noop = () => {};

type AlertDialogRootElement = React.ElementRef<typeof DialogPrimitive.Root>;
type DialogPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export type AlertDialogRootProps = Omit<DialogPrimitiveRootProps, 'open' | 'onOpenChange'> & {
    customRootClass?: string;
    className?: string;
    defaultOpen?: boolean;
    open?: boolean;
    /** Called with the next open state and details (`reason`, `event`, `cancel()`). */
    onOpenChange?: (open: boolean, details: OpenChangeDetails) => void;
};

const COMPONENT_NAME = 'AlertDialog';

const AlertDialogRoot = forwardRef<AlertDialogRootElement, AlertDialogRootProps>(({
    children,
    className = '',
    customRootClass = '',
    defaultOpen = false,
    open,
    onOpenChange,
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, noop);
    // The primitive is controlled by this state, so apply the change here.
    const handlePrimitiveOpenChange = (nextOpen: boolean, details: OpenChangeDetails) => {
        callOpenChange(onOpenChange, nextOpen, details);
        if (!details.isCanceled) setIsOpen(nextOpen);
    };
    const [titleId, setTitleId] = useState<string | undefined>(undefined);
    const [descriptionId, setDescriptionId] = useState<string | undefined>(undefined);

    const contextProps = {
        rootClass,
        isOpen,
        setIsOpen,
        titleId,
        descriptionId,
        setTitleId,
        setDescriptionId
    };

    // Per the WAI-ARIA APG alertdialog pattern, pressing outside (including the
    // overlay) does not dismiss an alert dialog; Escape, Cancel and Action do.
    // Pass `dismissOnOutsidePress` to opt back in.
    return (
        <DialogPrimitive.Root
            ref={ref}
            open={isOpen}
            onOpenChange={handlePrimitiveOpenChange}
            className={clsx(rootClass, className)}
            dismissOnOutsidePress={false}
            {...props}
        >
            {typeof children === 'function'
                ? (state: { payload: unknown }) => (
                    <AlertDialogContext.Provider value={contextProps}>{children(state)}</AlertDialogContext.Provider>
                )
                : <AlertDialogContext.Provider value={contextProps}>{children}</AlertDialogContext.Provider>}
        </DialogPrimitive.Root>
    );
});

AlertDialogRoot.displayName = COMPONENT_NAME;
export default AlertDialogRoot;
