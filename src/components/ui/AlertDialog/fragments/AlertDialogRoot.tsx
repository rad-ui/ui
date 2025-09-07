'use client';
import React, { forwardRef, useState } from 'react';
import { customClassSwitcher } from '~/core';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';
import { useControllableState } from '~/core/hooks/useControllableState';

import DialogPrimitive from '~/core/primitives/Dialog';

type AlertDialogRootElement = React.ElementRef<typeof DialogPrimitive.Root>;
type DialogPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export type AlertDialogRootProps = Omit<DialogPrimitiveRootProps, 'open' | 'onOpenChange'> & {
    customRootClass?: string;
    className?: string;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
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
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, onOpenChange);
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

    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen} className={clsx(rootClass, className)} {...props}>
            <AlertDialogContext.Provider value={contextProps}>
                <div ref={ref} className={clsx(rootClass, className)}>
                    {children}
                </div>
            </AlertDialogContext.Provider>
        </DialogPrimitive.Root>
    );
});

AlertDialogRoot.displayName = COMPONENT_NAME;
export default AlertDialogRoot;
